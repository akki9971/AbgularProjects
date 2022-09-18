import { Component, OnInit } from '@angular/core';
import { NotificationService } from 'app/shared/services/notification.service';
import { AuthService } from 'app/shared/auth/auth.service';
import { User } from 'app/models/user.model';

@Component({
  selector: 'app-notification-list',
  templateUrl: './notification-list.component.html'
})
export class NotificationListComponent implements OnInit {

  notifications: Notification[] = [];
  unreadCount = 0;
  isLoading = false;
  user: User;

  constructor(
    private notificationService: NotificationService,
    private authService: AuthService
  ) {
    this.notificationService.currentUnreadCount.subscribe(count => this.unreadCount = count);
  }

  ngOnInit() {
    this.user = this.authService.getUser();
    this.getMyNotifications();
  }

  getMyNotifications() {
    this.isLoading = true;
    this.notificationService.getNotifications({}).subscribe((resp) => {
      this.isLoading = false;
      this.notifications = resp['notifications'];
      this.notificationService.updateUnreadCount(resp['unreadCount']);
      this.markRead(); // TODO: mark individual on user action
    });
  }

  markRead() {
    const notifIds = this.getNotifsList();
    this.notificationService.markNotificationsRead(notifIds).subscribe((resp) => {
      this.notificationService.updateUnreadCount(0); // TODO: get the latest unread count
    });
  }

  getNotifsList() {
    const list = [];
    for (let i = 0; i < this.notifications.length; i++) {
      list.push(this.notifications[i]['notificationId']);
    }
    return list;
  }

}
