import { Component, OnInit } from '@angular/core';
import { Productdetail } from 'src/app/models/productdetail';
import { fetchApiService } from 'src/app/services/fetch-api.service';
import { ProductService } from 'src/app/services/product.service';
@Component({
  selector: 'app-productslide',
  templateUrl: './productslide.component.html',
  styleUrls: ['./productslide.component.css']
})
export class ProductslideComponent implements OnInit {
  Products:any
  constructor(
  private api: fetchApiService 
  ){ }

  ngOnInit(){
    
    this.api.getAll().subscribe((data)=>{
      // console.log('data arrived',data);
      this.Products=data;
      
      this.Products.forEach( (a: any)=> {
        Object.assign(a, {quantity:1, total:a.price});
      });
  })
 }


}
