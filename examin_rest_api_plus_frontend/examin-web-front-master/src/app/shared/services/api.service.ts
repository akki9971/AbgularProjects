import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { map } from 'rxjs/operators';
import { TOKEN_NAME } from 'app/shared/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiBaseUrl = environment.API_BASE_URL;

  constructor(private http: HttpClient) { }

  getToken(): string {
    return localStorage.getItem(TOKEN_NAME);
  }

  /**
  * POST Function
  */
  post(path: string, body: any) {
    return this.http.post(this.apiBaseUrl + path, body)
      .pipe(map(res => res));
  }

  /**
   * PUT Function
   */
  put(path: string, body: any) {
    return this.http.patch(this.apiBaseUrl + path, body)
      .pipe(map(res => res));
  }

  /**
   * GET Function
   */
  get(path: string) {
    return this.http.get(this.apiBaseUrl + path)
      .pipe(map(res => res));
  }

  /**
   * GET with params
   * @param path 
   */
  getWithParams(endpoint: string, data: Object = {}) {
    if (data) {
      endpoint += '?' + this.buildParams(data);
    }
    return this.http.get(this.apiBaseUrl + endpoint)
      .pipe(map(res => res));
  }
  

  /**
   * DELETE Function
   */
  delete(path: string) {
    return this.http.delete(this.apiBaseUrl + path)
      .pipe(map(res => res));
  }

  /**
   * helper function for GET request
   * @param object 
   */
  private buildParams(object: Object) {
    return Object.keys(object)
      .map(k => {
        return encodeURIComponent(k) + '=' + encodeURIComponent(object[k]);
      }).join('&');
  }

  /**
   * helper function for all requests to bind options
   */
  private buildOptions(options: any, withCredentials: boolean = false) {
    // const XSRF_TOKEN = this.cookie.get('XSRF-TOKEN') || '';

    // const headers = {
    //   'X-XSRF-TOKEN': XSRF_TOKEN,
    //   'X-VERSION': environment.version,
    //   'Content-Type': 'application/json',
    // };

    // const builtOptions = {
    //   headers: new HttpHeaders(headers),
    //   cache: true,
    // };

    // if (withCredentials) {
    //   builtOptions['withCredentials'] = true;
    // }

    // return Object.assign(options, builtOptions);
  }

}
