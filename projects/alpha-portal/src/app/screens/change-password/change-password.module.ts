import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CorePageEditComponent } from 'ngx-histaff-alpha';
import { ChangePasswordRoutingModule } from './change-password-routing.module';
import { ChangePasswordComponent } from './change-password.component';


@NgModule({
  declarations: [
    ChangePasswordComponent
  ],
  imports: [
    CommonModule,
    ChangePasswordRoutingModule,
    CorePageEditComponent
  ]
})
export class ChangePasswordModule { }
