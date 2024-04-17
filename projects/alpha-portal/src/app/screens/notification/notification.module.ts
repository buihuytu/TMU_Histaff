import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotificationRoutingModule } from './notification-routing.module';
import { NotificationComponent } from './notification/notification.component';
import { CoreAccordionComponent, TableCellPipe, TranslatePipe } from 'ngx-histaff-alpha';


@NgModule({
    declarations: [
        NotificationComponent
    ],
    imports: [
        CommonModule,
        NotificationRoutingModule,
        CoreAccordionComponent,
        TranslatePipe,
        TableCellPipe,
    ]
})
export class NotificationModule { }
