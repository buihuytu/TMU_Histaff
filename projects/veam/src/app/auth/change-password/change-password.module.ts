import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { RouterModule } from '@angular/router';
import { CorePageEditComponent } from 'ngx-histaff-alpha';

const routes = [
  {
      path: ':id',
      component: ChangePasswordComponent
  },
];

@NgModule({
  declarations: [
    ChangePasswordComponent,
  ],
  imports: [
    CommonModule,
    CorePageEditComponent,
    RouterModule.forChild(routes),
  ],
  exports: [
    ChangePasswordComponent
  ]
})
export class ChangePasswordModule { }
