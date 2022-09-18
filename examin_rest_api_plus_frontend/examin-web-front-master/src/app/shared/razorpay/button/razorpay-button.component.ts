import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { WindowRefService } from '../../services/window-ref.service';

import { Exam } from 'app/models/exam.model';
import { environment } from 'environments/environment';
import { ApiService } from 'app/shared/services/api.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-razorpay-button',
  templateUrl: './razorpay-button.component.html'
})
export class RazorpayButtonComponent implements OnInit {

  @Input() user: any;
  @Input() exam: Exam;
  @Output() paid: EventEmitter<any> = new EventEmitter();

  constructor(
    private winRef: WindowRefService,
    private apiService: ApiService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
  }

  createOrder() {
    const payload = {
      examId: this.exam.examId,
      userId: this.user.userId
    }
    this.initPayment(payload);
  }

  /**
   * create payment request save it to DB and get the order id
   * @param payload
   */
  initPayment(payload) {
    this.apiService.post('payment/razorpay/initiate', payload)
      .subscribe((response) => {
        if (response && response['status'] === 'success') {
          this.payWithRazor(response['data']);
        } else {
          this.toastr.error('Something went wrong!');
        }
      });
  }

  /**
   * udpate payment status after trnsaction completed
   * @param data 
   */
  udpatePaymentStatus(data) {
    this.apiService.post('payment/razorpay/update', data)
      .subscribe((response) => {
        // console.log('razorpay udpate', response);
        if (response && response['status'] === 'success') {
          this.toastr.success('Payment successful!');
          this.paid.emit(data['payment']);
        } else {
          this.toastr.error('Payment unsuccessful!');
        }
      });
  }

  payWithRazor(data) {

    let razorPayKey;
    if (this.exam.institute.uniqueName === 'mvsu') {
      razorPayKey = environment.keys.RAZORPAY_KEY_MVSU;
    } else {
      razorPayKey = environment.keys.RAZORPAY_KEY_EXAMIN;
    }

    const options: any = {
      key: razorPayKey,
      amount: data['amount_due'], // amount should be in paise format to display Rs 1255 without decimal point
      currency: data['currency'],
      name: 'ExamIn', // company name or product name
      description: '',  // product description
      // image: './assets/logo.png', // company logo or product image
      order_id: data.id, // order_id created by you in backend
      modal: {
        // We should prevent closing of the form when esc key is pressed.
        escape: false,
      },
      notes: {
        // include notes if any
      },
      theme: {
        color: '#FF8D60'
      }
    };
    options.handler = ((response, error) => {
      options.response = response;
      // console.log(response);
      this.udpatePaymentStatus(response);
      // console.log(options);
      // call your backend api to verify payment signature & capture transaction
    });
    options.modal.ondismiss = (() => {
      // handle the case when user closes the form while transaction is in progress
      console.log('Transaction cancelled.');
    });
    const rzp = new this.winRef.nativeWindow.Razorpay(options);
    rzp.open();
  }

}
