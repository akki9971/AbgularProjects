import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { LogUsers, Users } from '../models/user';
import { ApidetailsService } from '../service/apidetails.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  usersModal = new Users();
  logUserModel = new LogUsers();

  emailerror: boolean = false;
  psderror: boolean = false;

  emailmsg: string = '';
  psdmsg: string = '';

  err = '^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$'
  constructor(public services: ApidetailsService, public route: Router) { }

  register(r: NgForm) {
    console.log();
    
    this.services.postapi({
      name:r.value.name,
      email:r.value.email,
      password:r.value.password
    }).subscribe(() => {
      alert("Registration Successfully")
      r.resetForm();
    })
  }
  login(logindata: any) {

    this.services.getapi().subscribe((data: any) => {
      let filterdata = data.filter((regdata: any) => {
        let a = regdata.email === logindata.value.email
        let b = regdata.password === logindata.value.password
        return a && b
      })
      // console.log(filterdata); check login data
      if (filterdata.length > 0) {
        this.services.setuser(filterdata[0])
        this.route.navigate(['/home'])
      }
      else {
        this.emailerror = true;
        this.psderror = true;
        // alert("doesnt exist");
      }

    })

    // if (logindata.email.length > 0 && logindata.password.length > 0) {
    //   if (logindata.email.match(this.err)) {
    //     this.services.getapi().subscribe((data: any) => {
    //       let filterdata = data.filter((regdata: any) => {
    //         let a = regdata.email === logindata.email
    //         let b = regdata.password === logindata.password
    //         return a && b
    //       })
    //       // console.log(filterdata); check login data
    //       if (filterdata.length > 0) {
    //         this.services.setuser(filterdata[0])
    //         this.route.navigate(['/home'])
    //       }
    //       else {
    //         this.emailerror = true;
    //         this.psderror = true;
    //         // alert("doesnt exist");
    //       }

    //     })

    //   } else {
    //     this.emailerror = true;
    //     this.emailmsg = 'Email should be Valid';
    //   }
    // } else {
    //   this.emailerror = true;
    //   this.psderror = true;
    //   this.emailmsg = "This feild can't be empty";
    //   this.psdmsg = "This feild can't be empty";
    // }

  }
  ngOnInit(): void {
  }

}
