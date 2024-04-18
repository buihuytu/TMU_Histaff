import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CorePageListComponent, CorePageEditComponent } from 'ngx-histaff-alpha';
import { FunctionIgnoreRoutingModule } from './function-ignore-routing.module';



@NgModule({
  declarations: [

  ],
  imports: [
    CommonModule,
    FunctionIgnoreRoutingModule,
    CorePageListComponent,
    CorePageEditComponent,
  ]
})
export class FunctionIgnoreModule { }
