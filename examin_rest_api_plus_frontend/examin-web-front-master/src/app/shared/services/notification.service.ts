import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private endpoint = 'notification';

  private unreadCount = new BehaviorSubject(0);
  currentUnreadCount = this.unreadCount.asObservable();

  constructor(
    private apiService: ApiService
  ) { }

  /**
   * get notifications for logged in user
   */
  getNotifications(params: object) {
    return this.apiService.getWithParams(`${this.endpoint}`, params);
  }

  markNotificationsRead(notificationIds: any[]) {
    return this.apiService.post(`${this.endpoint}/read`, { notificationIds: notificationIds });
  }

  updateUnreadCount(count: number) {
    this.unreadCount.next(count);
  }
}
