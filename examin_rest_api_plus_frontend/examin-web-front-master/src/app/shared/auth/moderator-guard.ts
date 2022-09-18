import { CanActivate } from '@angular/router';
import { Injectable } from '@angular/core';
import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

// services
import { AuthService } from './auth.service';

@Injectable()
export class ModeratorGuard implements CanActivate {

  constructor(
    private authService: AuthService
  ) { }

  /**
   * if return value is true then continue else block
   */
  canActivate() {
    return this.authService.isModerator().pipe(
      map(isModerator => {
        if (isModerator) {
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
