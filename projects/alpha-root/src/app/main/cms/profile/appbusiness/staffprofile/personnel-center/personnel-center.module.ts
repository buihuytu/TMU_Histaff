import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { PersonnelCenterRoutingModule } from './personnel-center-routing.module';
import { PersonnelCenterComponent } from './personnel-center.component';
import { CorePageHeaderComponent, CoreTabsComponent, TranslatePipe } from 'ngx-histaff-alpha';
import { PersonnelLeftMenuModule } from './personnel-left-menu/personnel-left-menu.module';

@NgModule({
    declarations: [
        PersonnelCenterComponent,
    ],
    imports: [
        CommonModule,
        RouterModule,
        TranslatePipe,
        PersonnelCenterRoutingModule,
        CorePageHeaderComponent,
        CoreTabsComponent,
        PersonnelLeftMenuModule,
    ]
})
export class PersonnelCenterModule { }
