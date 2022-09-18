import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  public totalItem: number = 0;

  constructor(private cart: CartService) { }

    ngOnInit(){

      this.cart.getProducts()
     .subscribe(data=> {
      this.totalItem = data.length;
})
    }

}
