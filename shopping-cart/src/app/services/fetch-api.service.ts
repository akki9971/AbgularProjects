
import { Injectable } from '@angular/core';
 
import { HttpClient } from '@angular/common/http';
 
 
@Injectable()
export class fetchApiService {
 
  baseURL: string = 'https://fakestoreapi.com/products';
 
  constructor(private http: HttpClient) {
  }
 
  getAll() {
    return this.http.get(this.baseURL)
  }
 
}