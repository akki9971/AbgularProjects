import { Component, Input, OnInit } from '@angular/core';
import { Productdetail } from 'src/app/models/productdetail';
import { CartService } from 'src/app/services/cart.service';
import { fetchApiService } from 'src/app/services/fetch-api.service';
import { MessangerService } from 'src/app/services/messanger.service';
import { ProductService } from 'src/app/services/product.service';
import { ProductslideComponent } from '../productslide.component';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.css']
})
export class ProductItemComponent implements OnInit {
  public showMe: boolean = true;
 @Input()
 Item: any
 
  constructor(private msg: MessangerService, private cart: CartService) { }

  ngOnInit() {
 
  }

  addtocart(Item: any){
    this.cart.addtoCart(Item);
    this.showMe=false;
  }
}
