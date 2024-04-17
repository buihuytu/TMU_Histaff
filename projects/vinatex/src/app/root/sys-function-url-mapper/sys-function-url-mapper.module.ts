import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SysFunctionUrlMapperRoutingModule } from './sys-function-url-mapper-routing.module';
import { CorePageEditComponent } from 'ngx-histaff-alpha';


@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    SysFunctionUrlMapperRoutingModule,
    CorePageEditComponent,
  ]
})
export class SysFunctionUrlMapperModule { }
