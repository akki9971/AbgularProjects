import { CanActivate } from '@angular/router';
import { Injectable } from '@angular/core';
import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

// services
import { AuthService } from './auth.service';

@Injectable()
export class AdminGuard implements CanActivate {

  constructor(
    private authService: AuthService
  ) { }

  /**
   * if return value is true then continue else block
   */
  canActivate() {
    return this.authService.isAdmin().pipe(
      map(isAdmin => {
        if (isAdmin) {
          return true;
        }
        return false;
      }),
      catchError(() => {
        return of(false);
      })
    );
  }
}
