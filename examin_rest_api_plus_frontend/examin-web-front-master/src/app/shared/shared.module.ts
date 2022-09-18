import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { ImageCropperModule } from 'ngx-image-cropper';

// services
import { WindowRefService } from './services/window-ref.service';
import { MomentDateFormatter } from './services/date-parser.service';

// DIRECTIVES
import { EXAMIN_DIRECTIVES } from './directives/directives';

// PIPES
import { EXAMIN_PIPES } from './pipes/pipes';

// COMPONENTS
import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { NavbarOfflineComponent } from './navbar-offline/navbar-offline.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NotificationSidebarComponent } from './notification-sidebar/notification-sidebar.component';
import { ImageCropperComponent } from './image-cropper/image-cropper.component';
import { ContentPrivacyComponent } from './components/content-privacy/content-privacy.component';
import { ContentTermsComponent } from './components/content-terms/content-terms.component';
import { ContentPrivacyMobileComponent } from './components/content-privacy-mobile/content-privacy-mobile.component';
import { RazorpayButtonComponent } from './razorpay/button/razorpay-button.component';
import { ExamCardComponent } from './components/exam/card/exam-card.component';
import { NotificationCardComponent } from './components/notification/card/notification-card.component';
import { InstituteBlockComponent } from './components/institute/block/institute-block.component';
import { UserCardComponent } from './components/user/card/user-card.component';
import { InstituteSelectorComponent } from './components/institute-selector/institute-selector.component';
import { ExamWebcamComponent } from './components/exam-webcam/exam-webcam.component';

@NgModule({
    exports: [
        CommonModule,
        FooterComponent,
        NavbarComponent,
        NavbarOfflineComponent,
        SidebarComponent,
        NotificationSidebarComponent,
        NgbModule,
        TranslateModule,
        ImageCropperComponent,
        ContentPrivacyComponent,
        ContentTermsComponent,
        ContentPrivacyMobileComponent,
        RazorpayButtonComponent,
        ExamCardComponent,
        NotificationCardComponent,
        InstituteBlockComponent,
        UserCardComponent,
        InstituteSelectorComponent,
        ExamWebcamComponent,
        EXAMIN_PIPES,
        EXAMIN_DIRECTIVES
    ],
    imports: [
        RouterModule,
        CommonModule,
        NgbModule,
        TranslateModule,
        PerfectScrollbarModule,
        ImageCropperModule,
        FormsModule,
        ReactiveFormsModule
    ],
    declarations: [
        FooterComponent,
        NavbarComponent,
        NavbarOfflineComponent,
        SidebarComponent,
        NotificationSidebarComponent,
        ImageCropperComponent,
        ContentPrivacyComponent,
        ContentTermsComponent,
        ContentPrivacyMobileComponent,
        RazorpayButtonComponent,
        ExamCardComponent,
        NotificationCardComponent,
        InstituteBlockComponent,
        UserCardComponent,
        InstituteSelectorComponent,
        ExamWebcamComponent,
        EXAMIN_PIPES,
        EXAMIN_DIRECTIVES
    ],
    providers: [
        WindowRefService,
        {
          provide: NgbDateParserFormatter, useClass: MomentDateFormatter
        }
    ]
})
export class SharedModule { }
