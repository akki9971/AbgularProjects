import { Component, ViewContainerRef, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { filter } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})
export class AppComponent implements OnInit, OnDestroy {

    subscription: Subscription;

    constructor(
        private toastr: ToastrService,
        private router: Router,
        private route: ActivatedRoute
    ) {
        this.route.queryParams.subscribe(params => {
            if (params['action'] === 'payment') {
                if (params['status'] === 'success') {
                    this.toastr.success('Payment successful!');
                } else if (params['status'] === 'fail') {
                    this.toastr.error('Payment unsuccessful!');
                }
            }
        });
    }

    ngOnInit() {
        this.subscription = this.router.events
            .pipe(filter(event => event instanceof NavigationEnd))
            .subscribe(() => window.scrollTo(0, 0));
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }

}
