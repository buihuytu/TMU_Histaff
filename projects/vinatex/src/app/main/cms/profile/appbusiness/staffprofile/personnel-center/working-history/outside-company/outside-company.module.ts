import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OutsideCompanyRoutingModule } from './outside-company-routing.module';
import { OutsideCompanyComponent } from './outside-company.component';
import { TranslatePipe } from 'ngx-histaff-alpha';


@NgModule({
  declarations: [
    OutsideCompanyComponent
  ],
  imports: [
    CommonModule,
    OutsideCompanyRoutingModule,
    TranslatePipe,
  ],
  exports: [OutsideCompanyComponent]
})
export class OutsideCompanyModule { }
