import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InsideCompanyRoutingModule } from './inside-company-routing.module';
import { InsideCompanyComponent } from './inside-company.component';
import { TranslatePipe } from 'ngx-histaff-alpha';


@NgModule({
  declarations: [
    InsideCompanyComponent
  ],
  imports: [
    CommonModule,
    TranslatePipe,
    InsideCompanyRoutingModule,
  ],
  exports: [ InsideCompanyComponent ]
})
export class InsideCompanyModule { }
