/**
 * Sessions
 */
import { EventEmitter } from '@angular/core';
import { StorageService } from './storage.sevice';

export class SessionService {
  loggedinEmitter: EventEmitter<any> = new EventEmitter();
  userEmitter: EventEmitter<any> = new EventEmitter();
  user: any;

  static _(storage: StorageService) {
    return new SessionService(storage);
  }

  constructor(
    private storage: StorageService
  ) {
    // check if user is logged in
    this.user = this.storage.get('user');
    if (this.user) {
      this.inject(JSON.parse(this.user));
      this.loggedinEmitter.next(true);
    }
  }

  /**
   * Return if loggedin, with an optional listener
   */
  isLoggedIn(observe: any = null) {
    if (observe) {
      this.loggedinEmitter.subscribe({
        next: is => {
          if (is) observe(true);
          else observe(false);
        },
      });
    }

    if (window.ExamIn.LoggedIn) return true;

    return false;
  }

  isAdmin() {
    if (!this.isLoggedIn) return false;
    if (window.ExamIn.Admin) return true;

    return false;
  }

  isModerator() {
    if (!this.isLoggedIn) return false;
    if (window.ExamIn.Moderator) return true;

    return false;
  }

  /**
   * Get the loggedin user
   */
  getLoggedInUser(observe: any = null) {
    if (observe) {
      this.userEmitter.subscribe({
        next: user => {
          observe(user);
        },
      });
    }

    if (window.ExamIn.user) {
      // Attach user_guid to debug logs
      return window.ExamIn.user;
    }

    return false;
  }

  inject(user: any = null) {
    console.log('SessionService.inject()');
    // Clear stale localStorage
    this.storage.clear();

    // Emit new user info
    this.userEmitter.next(user);

    // Set user to the localStorage
    this.storage.set('user', JSON.stringify(user));

    // Set globals
    window.ExamIn.LoggedIn = true;
    window.ExamIn.user = user;
    console.log('window.ExamIn', window.ExamIn);

    if (user.admin === true) {
      window.ExamIn.Admin = true;
    }
  }

  /**
   * Inject user and emit login event
   */
  login(user: any = null) {
    console.log('SessionService.login()');
    this.inject(user);
    this.loggedinEmitter.next(true);
  }

  /**
   * Emit logout event
   */
  logout() {
    this.userEmitter.next(null);
    delete window.ExamIn.user;
    window.ExamIn.LoggedIn = false;
    window.ExamIn.Admin = false;
    window.localStorage.clear();
    this.loggedinEmitter.next(false);
  }
}
