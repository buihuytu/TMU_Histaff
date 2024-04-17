import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MenuRoutingModule } from './menu-routing.module';
import { CorePageEditComponent, CorePageHeaderComponent, CoreTreeGridComponent } from 'ngx-histaff-alpha';

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    RouterModule,
    MenuRoutingModule,
    CorePageHeaderComponent,
    CoreTreeGridComponent,
    CorePageEditComponent,
  ],
})
export class MenuModule { }
