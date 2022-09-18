import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { HttpClient, HttpEventType, HttpBackend, HttpHeaders } from '@angular/common/http';
import { environment } from 'environments/environment';
import { map } from 'rxjs/operators';
import { TOKEN_NAME } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class FileService {
  private apiBaseUrl = environment.API_BASE_URL;

  private http: HttpClient;

  constructor(
    private handler: HttpBackend
  ) {
    this.http = new HttpClient(handler);
  }

  public upload(endpoint: string, data: any) {
    const fileHttpHeaders = new HttpHeaders({
      'auth': `${localStorage.getItem(TOKEN_NAME)}`
    });

    return this.http.post(this.apiBaseUrl + endpoint, data, {
      headers: fileHttpHeaders,
      reportProgress: true,
      observe: 'events'
    }).pipe(map((event) => {
      switch (event.type) {
        case HttpEventType.UploadProgress:
          const progress = Math.round(100 * event.loaded / event.total);
          return { status: 'progress', progress: progress };
        case HttpEventType.Response:
          return event.body;
        default:
          return `Unhandled event: ${event.type}`;
      }
    }));
  }

}
