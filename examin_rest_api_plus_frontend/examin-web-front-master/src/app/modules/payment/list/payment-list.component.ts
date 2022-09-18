import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

import { AuthService } from 'app/shared/auth/auth.service';
import { Payment } from 'app/models/payment.model';
import { PaymentService } from 'app/shared/services/payment.service';

@Component({
  selector: 'app-payment-list',
  templateUrl: './payment-list.component.html'
})
export class PaymentListComponent implements OnInit {

  payments: Payment[];
  inProgress = false;
  isAdmin = false;
  paymentParams: {
    instituteId: number | string,
    examId: number | string,
    offset: number | string,
    limit: number
  };

  constructor(
    private paymentService: PaymentService,
    private toastr: ToastrService,
    private authService: AuthService
  ) {
    this.authService.isAdmin().subscribe((isAdmin) => {
      this.isAdmin = isAdmin;
    });
    this.resetParams();
  }

  ngOnInit() {
    this.getPayments();
  }

  setParams(type: string, value: any) {
    this.paymentParams[type] = value;
    this.getPayments();
  }

  getPayments(refresh: boolean = true) {
    if (this.inProgress && !refresh) { return; }
    this.inProgress = true;
    this.paymentService.get(this.paymentParams).subscribe((data) => {
      this.inProgress = false;  
      if (refresh) {
        this.resetPayments();
      }
      this.payments.push(...(data['payments'] || []));
    }, (error) => {
      this.inProgress = false;
      this.toastr.error(error['error']['message']);
    });
  }

  resetPayments() {
    this.payments = [];
  }

  resetParams() {
    this.paymentParams = {
      limit: 2000,
      offset: 0,
      examId: '',
      instituteId: ''
    };
  }

}
