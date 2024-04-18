import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WorkingHistoryRoutingModule } from './working-history-routing.module';
import { WorkingHistoryComponent } from './working-history.component';
import { CoreTabsComponent } from 'ngx-histaff-alpha';
import { InsideCompanyModule } from './inside-company/inside-company.module';
import { OutsideCompanyModule } from './outside-company/outside-company.module';

@NgModule({
  declarations: [
    WorkingHistoryComponent,
  ],
  imports: [
    CommonModule,
    WorkingHistoryRoutingModule,
    InsideCompanyModule,
    OutsideCompanyModule,
    CoreTabsComponent,
  ]
})
export class WorkingHistoryModule { }
