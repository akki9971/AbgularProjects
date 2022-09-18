import { Component, OnInit } from '@angular/core';
import { ApiService } from 'app/shared/services/api.service';

import { environment } from 'environments/environment';
import { User } from 'app/models/user.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-view-basic',
  templateUrl: './user-view-basic.component.html',
  styleUrls: ['./user-view-basic.component.scss']
})
export class UserViewBasicComponent implements OnInit {

  user: User;
  userId: number;
  public imageBaseUrl = environment.FILES_BASE_URL;

  constructor(
    private apiService: ApiService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.userId = params['userId'];
      this.getUser(this.userId);
    });
  }

  getUser(userId) {
    this.apiService.get('user/' + userId).subscribe((data) => {
      if (data['user']) {
        this.user = data['user'];
      }
    });
  }

}
