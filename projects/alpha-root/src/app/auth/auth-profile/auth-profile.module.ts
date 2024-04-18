import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthProfileComponent } from './auth-profile/auth-profile.component';
import { MapAvatarToServerPipe, TranslatePipe } from 'ngx-histaff-alpha';

@NgModule({
  declarations: [AuthProfileComponent],
  imports: [
    CommonModule,
    MapAvatarToServerPipe,
    TranslatePipe,
  ],
  exports: [
    AuthProfileComponent
  ]
})
export class AuthProfileModule { }
