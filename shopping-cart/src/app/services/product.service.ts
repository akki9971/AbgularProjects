import { Injectable } from '@angular/core';
import { Productdetail } from '../models/productdetail';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  products: Productdetail[] = [
    new Productdetail(1, 'This is product 1 description this product is so cool!', 100),
    new Productdetail(2, 'This is product 2 description this product is so cool!', 200),
    new Productdetail(3, 'This is product 3 description this product is so cool!', 300),
    new Productdetail(4, 'This is product 4 description this product is so cool!', 400),
    new Productdetail(5, 'This is product 5 description this product is so cool!', 500),
    new Productdetail(6, 'This is product 6 description this product is so cool!', 600),
    new Productdetail(7, 'This is product 6 description this product is so cool!', 700)
]

constructor() { }

 getProducts(): Productdetail[]{
 return this.products
 }

}
