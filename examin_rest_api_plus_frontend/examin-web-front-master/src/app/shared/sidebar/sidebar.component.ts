import { Component, OnInit, ViewChild, ElementRef, Renderer2, AfterViewInit, Input } from '@angular/core';

import { USER_ROUTES } from './user-routes.config';
import { ADMIN_ROUTES } from './admin-routes.config';
import { Router, ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { customAnimations } from '../animations/custom-animations';
import { ConfigService } from '../services/config.service';
import { RouteInfo } from './sidebar.metadata';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  animations: customAnimations
})
export class SidebarComponent implements OnInit, AfterViewInit {

  @ViewChild('toggleIcon', { static: true }) toggleIcon: ElementRef;
  @Input() isAdmin = false;
  public menuItems: any[];
  depth: number;
  activeTitle: string;
  activeTitles: string[] = [];
  expanded: boolean;
  navCollapsedOpen = false;
  logoUrl = 'assets/img/logo.png';
  public config: any = {};
  user: any;

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2,
    private router: Router,
    private route: ActivatedRoute,
    public translate: TranslateService,
    private configService: ConfigService,
    private authService: AuthService
  ) {
    if (this.depth === undefined) {
      this.depth = 0;
      this.expanded = false;
    }
  }

  ngOnInit() {
    this.user = this.authService.getUser();
    this.config = this.configService.templateConf;
    if (this.isAdmin) {
      this.menuItems = this.parseRoutes(ADMIN_ROUTES);
    } else {
      this.menuItems = this.parseRoutes(USER_ROUTES);
    }
    if (this.config.layout.sidebar.backgroundColor === 'white') {
      this.logoUrl = 'assets/img/logo-dark.png';
    } else {
      this.logoUrl = 'assets/img/logo.png';
    }
  }

  parseRoutes(routes: RouteInfo[]) {
    for (let i = 0; i < routes.length; i++) {
      routes[i].path = routes[i].path.replace(':userId', this.user.userId);
      for (let j = 0; j < routes[i].submenu.length; j++) {
        routes[i].submenu[j].path = routes[i].submenu[j].path.replace(':userId', this.user.userId);
      }
    }
    return routes;
  }

  ngAfterViewInit() {
    setTimeout(() => {
      if (this.config.layout.sidebar.collapsed !== undefined) {
        if (this.config.layout.sidebar.collapsed === true) {
          this.expanded = false;
          this.renderer.addClass(this.toggleIcon.nativeElement, 'ft-toggle-left');
          this.renderer.removeClass(this.toggleIcon.nativeElement, 'ft-toggle-right');
          this.navCollapsedOpen = true;
        } else if (this.config.layout.sidebar.collapsed === false) {
          this.expanded = true;
          this.renderer.removeClass(this.toggleIcon.nativeElement, 'ft-toggle-left');
          this.renderer.addClass(this.toggleIcon.nativeElement, 'ft-toggle-right');
          this.navCollapsedOpen = false;
        }
      }
    }, 0);
  }

  toggleSlideInOut() {
    this.expanded = !this.expanded;
  }

  handleToggle(titles) {
    this.activeTitles = titles;
  }

  // NGX Wizard - skip url change
  ngxWizardFunction(path: string) {
    if (path.indexOf('forms/ngx') !== -1) {
      this.router.navigate(['forms/ngx/wizard'], { skipLocationChange: false });
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
