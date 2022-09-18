import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar-offline',
  templateUrl: './navbar-offline.component.html',
  styleUrls: ['./navbar-offline.component.scss']
})
export class NavbarOfflineComponent implements OnInit {
  
  constructor(
    private router: Router
  ) { }

  ngOnInit() { }

  navigateByUrl(url: string) {
    this.router.navigateByUrl(url);
  }
}
