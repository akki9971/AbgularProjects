import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public totalItem = this.cart.totalItem;

  constructor(private cart: CartService) { }

  // check() {
  //   console.log(this.totalItem, this.cart.totalItem);
  // }
  ngOnInit() {
    this.cart.getProducts()
      .subscribe(data => {
        this.totalItem = data.length;
      })
  }

  // constructor(private cart: CartService) { }

  // public totalItem:number = 0;

  // ngOnInit() {

  //   this.cart.getProducts()
  //     .subscribe(data => {
  //       this.totalItem = data.length;

  //     })

  // }

}
