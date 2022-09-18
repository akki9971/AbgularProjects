import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { map } from 'rxjs/operators';
import { User } from 'app/models/user.model';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiBaseUrl = environment.API_BASE_URL;
    
  endpoint = 'user';

  constructor(
    private http: HttpClient,
    private apiService: ApiService
  ) { }
  
  /**
   * get users
   * @params request params
   */
  get(params: object) {
    return this.apiService.getWithParams(this.endpoint, params);
  }
  
  /**
   * delete user
   * @params request params
   */
  delete(userId: any) {
    return this.apiService.delete(`${this.endpoint}/${userId}`);
  }

  /**
   * get all users
   */
  getUsers() {
    return this.http.get(this.apiBaseUrl + 'user')
      .pipe(
        map(res => {
          return res;
        })
      );
  }

  /**
   * get user by ID
   * @params: userId
   */
  getUser(userId: any) {
    return this.http.get(this.apiBaseUrl + 'user/' + userId);
  }
}

// TODO: rmeove user service if not in use
