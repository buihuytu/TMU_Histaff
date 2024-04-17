import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AppLayoutCompnent } from './applayout.component';
import { AuthProfileModule } from '../../auth/auth-profile/auth-profile.module'
import { 
    CoreConfirmDialogComponent, 
    CoreNavigationTrackerComponent, 
    CoreReducerIconComponent, 
    CoreRoutingHistoryComponent, 
    DialogStateComponent, 
    LanguageChangerComponent, 
    NavigatorComponent, 
    TooltipDirective, 
    TranslatePipe, 
    UserActivityComponent 
} from 'ngx-histaff-alpha';
import { NotificationHeaderComponent } from '../../common/notification-header/notification-header.component';

@NgModule({
    declarations: [
        AppLayoutCompnent,
    ],
    imports: [
        RouterModule,
        CommonModule,
        DialogStateComponent,
        TranslatePipe,
        NavigatorComponent,
        UserActivityComponent,
        FormsModule,
        LanguageChangerComponent,
        CoreReducerIconComponent,
        CoreNavigationTrackerComponent,
        CoreRoutingHistoryComponent,
        AuthProfileModule,
        CoreConfirmDialogComponent,
        NotificationHeaderComponent,
        TooltipDirective
    ],
    exports: [
        AppLayoutCompnent,
    ]
})
export class AppLayoutModule {}
