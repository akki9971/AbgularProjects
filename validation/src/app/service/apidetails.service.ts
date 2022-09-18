import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApidetailsService {

  api = " http://localhost:3000/user"

  user : any;

  constructor(public http : HttpClient) { }

  getapi(){
    return this.http.get(this.api)
  }

  postapi(register : any){
    return this.http.post(this.api, register)
  }

  setuser(filter : any){
this.user=filter
return filter
  }

  getuser(){
return this.user
  }
}
