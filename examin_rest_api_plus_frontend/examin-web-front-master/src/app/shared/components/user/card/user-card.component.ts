import { Component, OnInit, Input } from '@angular/core';

import { environment } from 'environments/environment';
import { User } from 'app/models/user.model';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html'
})
export class UserCardComponent implements OnInit {

  public imageBaseUrl = environment.FILES_BASE_URL;
  @Input() user: User;

  constructor() { }

  ngOnInit() {
  }

}
