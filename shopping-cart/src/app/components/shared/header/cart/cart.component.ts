import { Component, OnInit } from '@angular/core';
// import { Subject } from 'rxjs';
import { CartService } from 'src/app/services/cart.service';
// import { MessangerService } from 'src/app/services/messanger.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  qty: number = 1;
  cartItem: any

  constructor(private cart: CartService) { }

  public products: any = [];
  public grandTotal !: number;
  public totalItem = this.cart.totalItem;

  ngOnInit() {
    this.cart.getProducts()
      .subscribe(data => {
        this.products = data;
        this.grandTotal = this.cart.getTotalPrice();
      })

    this.cart.getProducts()
      .subscribe(data => {
        this.totalItem = data.length;
        console.log(this.totalItem);
        
      })
  }

  removeItem(Item: any) {
    this.cart.removeCartItem(Item)
    this.totalItem = this.totalItem - 1;
    this.grandTotal = this.grandTotal - (Item.price* Item.quantity);
    console.log(this.totalItem)
  }

  emptycart() {
    this.cart.removeAllCart();
  }

  increment(qty: any) {
    qty.quantity = qty.quantity + 1
    this.totalItem = this.totalItem + 1;
    this.grandTotal= this.grandTotal + qty.price


  }
  decrement(qty: any) {
    if (qty.quantity !== 1) {
      qty.quantity = qty.quantity - 1
      this.totalItem = this.totalItem - 1;
    this.grandTotal= this.grandTotal - qty.price

      
    }
    else {
      qty.quantity = 1;
      this.cart.removeCartItem(qty)
      this.totalItem = this.totalItem - 1;
    this.grandTotal = this.grandTotal - qty.price;

    }

    
  }
}



