import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessangerService {

  subject = new Subject()

  constructor() { }

  send(products: any){
this.subject.next(products)
  }
  get(){
    return this.subject.asObservable()
  }
}
