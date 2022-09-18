import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  canActivate() {
    if (!this.authService.isAuthenticated()) {
      return true;
    }

    this.router.navigate(['/auth/login']);
    return false;

    // TODO: check for the valid token by making an API request
    // if (!this.authService.isTokenExpired()) {
    //   return true;
    // }

    // this.router.navigate(['/login']);
    // return false;
  }
}
