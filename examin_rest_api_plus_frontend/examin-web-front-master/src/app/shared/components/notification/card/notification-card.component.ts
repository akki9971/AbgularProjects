import { Component, OnInit, Input } from '@angular/core';
import { Notification } from 'app/models/notification.model';

@Component({
  selector: 'app-notification-card',
  templateUrl: './notification-card.component.html'
})
export class NotificationCardComponent implements OnInit {

  @Input() notification: Notification;

  constructor() { }

  ngOnInit() {
  }

}
