import { Component, OnInit } from '@angular/core';
import { ApidetailsService } from '../service/apidetails.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  user  : any;

  constructor(public service: ApidetailsService) { }

  ngOnInit(): void {

  this.user=this.service.getuser()
  }

  

}
