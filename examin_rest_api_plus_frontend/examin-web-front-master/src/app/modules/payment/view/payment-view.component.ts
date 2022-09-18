import { Component, OnInit } from '@angular/core';
import { ApiService } from 'app/shared/services/api.service';
import { ActivatedRoute } from '@angular/router';

import { environment } from 'environments/environment';
import { User } from 'app/models/user.model';

@Component({
  selector: 'app-payment-view',
  templateUrl: './payment-view.component.html'
})
export class PaymentViewComponent implements OnInit {

  paymentId: number;
  user: User;
  payment: any;
  institute: any;
  imageBaseUrl = environment.APP_BASE_URL;
  
  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.getPaymentId();
  }

  getPaymentId() {
    this.route.params.subscribe(params => {
      this.paymentId = params['paymentId'];
      if (!isNaN(this.paymentId)) {
        this.getPaymentDetails();
      }
    });
  }

  getPaymentDetails() {
    this.apiService.get(`payment/${this.paymentId}`).subscribe((data) => {
      this.payment = data['payment'];
      this.user = data['user'];
      this.institute = data['institute'];
    });
  }

  // TODO: @Abhijeet, load payment details from the API and load into the template

  printInvoice() {
    this.hideElements('app-navbar, .app-sidebar, #print-invoice-btn');
    window.print();
    this.restoreElements('app-navbar, .app-sidebar, #print-invoice-btn');
  }

  hideElements(list: string) {
    const hideList = document.querySelectorAll(list);
    for (let i = 0; i < hideList.length; i++) {
      (<HTMLElement>hideList[i]).style.display = 'none';
    }
  }

  restoreElements(list: string) {
    const hideList = document.querySelectorAll(list);
    for (let i = 0; i < hideList.length; i++) {
      (<HTMLElement>hideList[i]).style.display = 'initial';
    }
  }

}
