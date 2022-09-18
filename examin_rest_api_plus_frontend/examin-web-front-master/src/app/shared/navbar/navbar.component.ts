import { Component, Output, EventEmitter, OnInit, AfterViewInit, Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { LayoutService } from '../services/layout.service';
import { ConfigService } from '../services/config.service';
import { NotificationService } from '../services/notification.service';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, AfterViewInit {
  currentLang = 'en';
  toggleClass = 'ft-maximize';
  placement = 'bottom-right';
  public isCollapsed = true;
  @Input() isAdmin = false;
  @Output()
  toggleHideSidebar = new EventEmitter<Object>();

  public config: any = {};
  unreadCount = 0;
  notifications: Notification[];
  user: any;

  constructor(
    public translate: TranslateService,
    private layoutService: LayoutService,
    private configService: ConfigService,
    private notificationService: NotificationService,
    private authService: AuthService,
    private router: Router
  ) {
    const browserLang: string = translate.getBrowserLang();
    translate.use(browserLang.match(/en|es|pt|de/) ? browserLang : 'en');

    this.notificationService.currentUnreadCount.subscribe(count => this.unreadCount = count);
  }

  ngOnInit() {
    this.config = this.configService.templateConf;
    this.user = this.authService.getUser();
    this.getMyNotifications();
  }

  getMyNotifications() {
    this.notificationService.getNotifications({}).subscribe((resp) => {
      this.notifications = resp['notifications'];
      this.notificationService.updateUnreadCount(resp['unreadCount']);
    });
  }

  ngAfterViewInit() {
    if (this.config.layout.dir) {
      const dir = this.config.layout.dir;
      if (dir === 'rtl') {
        this.placement = 'bottom-left';
      } else if (dir === 'ltr') {
        this.placement = 'bottom-right';
      }
    }
  }

  ChangeLanguage(language: string) {
    this.translate.use(language);
  }

  ToggleClass() {
    if (this.toggleClass === 'ft-maximize') {
      this.toggleClass = 'ft-minimize';
    } else {
      this.toggleClass = 'ft-maximize';
    }
  }

  toggleNotificationSidebar() {
    this.layoutService.emitChange(true);
  }

  toggleSidebar() {
    const appSidebar = document.getElementsByClassName('app-sidebar')[0];
    if (appSidebar.classList.contains('hide-sidebar')) {
      this.toggleHideSidebar.emit(false);
    } else {
      this.toggleHideSidebar.emit(true);
    }
  }

  navigateHome() {
    if (this.isAdmin) {
      this.router.navigate(['/admin']);
    } else {
      this.router.navigate(['/home']);
    }
  }
}
