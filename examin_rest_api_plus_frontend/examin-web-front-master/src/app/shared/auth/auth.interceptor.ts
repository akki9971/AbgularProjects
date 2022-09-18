import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { TOKEN_NAME } from './auth.service';
import { retry, tap, map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private router: Router) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        req = req.clone({
            setHeaders: {
                'Content-Type': 'application/json; charset=utf-8',
                'Accept': 'application/json',
                'auth': `${localStorage.getItem(TOKEN_NAME)}`, // TODO: import auth token from token service file
            },
        });

        return next.handle(req).pipe(
            retry(1),
            tap(
            // success response
            (event: HttpEvent<any>) => { },
            // error response
            (error: any) => {
                if (error instanceof HttpErrorResponse) {
                    if (error.status === 401) { // invalid token
                        // TODO: @abhijeet user wont logout, he should get a refresh token instead
                        // window.localStorage.clear();
                        // this.router.navigate(['/auth/logout']);
                    }
                }
            }
        ));
    }
}
