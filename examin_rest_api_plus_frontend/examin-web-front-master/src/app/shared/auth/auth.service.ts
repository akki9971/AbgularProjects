import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { User } from 'app/models/user.model';

export const TOKEN_NAME = 'jwtToken';

@Injectable()
export class AuthService {
  private apiBaseUrl = environment.API_BASE_URL;

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  getUser() {
    let data = localStorage.getItem('loggedInUser') || null;
    let user: User;
    if (data) {
      user = JSON.parse(data);
    }
    return user;
  }

  isAdmin(): Observable<boolean> {
    let user = localStorage.getItem('loggedInUser');
    if (user) {
      user = JSON.parse(user);
      if (user['role'] && user['role'].toUpperCase() === environment.roles.admin) {
        // console.log('isAdmin:TRUE');
        return of(true);
      }
    }
    // console.log('isAdmin:FALSE');
    return of(false);
  }

  isModerator(): Observable<boolean> {
    let user = localStorage.getItem('loggedInUser');
    if (user) {
      user = JSON.parse(user);
      if (user['role'] && user['role'].toUpperCase() === environment.roles.moderator) {
        // console.log('isModerator:TRUE');
        return of(true);
      }
    }
    // console.log('isModerator:FALSE');
    return of(false);
  }

  resendOtp(payload: any) {
    return this.http.post(this.apiBaseUrl + 'auth/forgot-password/resend-otp', payload)
      .pipe(map(res => res));
  }

  forgotPasswordNewPassword(payload: any) {
    return this.http.post(this.apiBaseUrl + 'auth/forgot-password/new-password', payload)
      .pipe(map(res => res));
  }

  forgotPasswordMobile(mobile: any) {
    return this.http.post(this.apiBaseUrl + 'auth/forgot-password/mobile', mobile)
      .pipe(map(res => res));
  }

  forgotPasswordSubmitOTP(otpData: any) {
    return this.http.post(this.apiBaseUrl + 'auth/forgot-password/verify/mobile', otpData)
      .pipe(map(res => res));
  }

  submitOTP(otp: string) {
    const formData = {
      otp: otp,
      type: 'mobile',
      userId: JSON.parse(localStorage.getItem('registeredUser')).userId
    }
    return this.http.post(this.apiBaseUrl + 'auth/verify/mobile', formData)
      .pipe(
        map(res => {
          // If request fails, throw an Error that will be caught
          if (res['status'] && (res['status'] < 200 || res['status'] >= 300)) {
            throw new Error('This request has failed ' + res['status']);
          } else {
            localStorage.setItem(TOKEN_NAME, res['token']);
            localStorage.setItem('loggedInUser', JSON.stringify(res['user']));
            return res;
          }
        }));
  }

  register(formData: any): Observable<any> {
    return this.http.post(this.apiBaseUrl + 'user', formData)
      .pipe(
        map(res => {
          // If request fails, throw an Error that will be caught
          if (res['status'] && (res['status'] < 200 || res['status'] >= 300)) {
            throw new Error('This request has failed ' + res['status']);
          } else {
            localStorage.setItem('registeredUser', JSON.stringify(res['user']));
            return res;
          }
        }));
  }

  login(formData: any) {
    return this.http.post(this.apiBaseUrl + 'auth/login', formData)
      .pipe(
        map(res => {
          // If request fails, throw an Error that will be caught
          if (res['status'] && (res['status'] < 200 || res['status'] >= 300)) {
            throw new Error('This request has failed ' + res['status']);
          } else {
            localStorage.setItem(TOKEN_NAME, res['token']);
            localStorage.setItem('loggedInUser', JSON.stringify(res['user']));
            return res;
          }
        }));
  }

  logout() {
    localStorage.removeItem(TOKEN_NAME);
    localStorage.removeItem('loggedInUser');
    return this.router.navigate(['/auth/login']);
  }

  getToken(): string {
    return localStorage.getItem(TOKEN_NAME);
  }

  setToken(token: string): void {
    localStorage.setItem(TOKEN_NAME, token);
  }

  isAuthenticated() {
    // TODO: check for the valid token here
    // console.log(localStorage.getItem(TOKEN_NAME))
    if (!localStorage.getItem(TOKEN_NAME)) {
      return true;
    }
    return false;
  }

  // getTokenExpirationDate(token: string): Date {
  //   const decoded = jwt_decode(token);

  //   if (decoded.exp === undefined) return null;

  //   const date = new Date(0);
  //   date.setUTCSeconds(decoded.exp);
  //   return date;
  // }

  // isTokenExpired(token?: string): boolean {
  //   if(!token) token = this.getToken();
  //   if(!token) return true;

  //   const date = this.getTokenExpirationDate(token);
  //   if(date === undefined) return false;
  //   return !(date.valueOf() > new Date().valueOf());
  // }

  redirectLoggedInUser() {
    if (!this.isAuthenticated()) {
      const user = JSON.parse(localStorage.getItem('loggedInUser'));
      if (user['role'] === environment.roles.admin || user['role'] === environment.roles.moderator) {
        this.router.navigateByUrl('/admin/home');
      } else {
        this.router.navigateByUrl('/home');
      }
    }
  }

}
