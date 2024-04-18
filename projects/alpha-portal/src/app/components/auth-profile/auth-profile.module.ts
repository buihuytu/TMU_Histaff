import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthProfileComponent } from './auth-profile/auth-profile.component';
import { CorePageEditComponent, ImageErrorResolverDirective, MapAvatarToServerPipe, TooltipDirective, TranslatePipe } from 'ngx-histaff-alpha';


@NgModule({
  declarations: [AuthProfileComponent],
  imports: [
    CommonModule,
    TooltipDirective,
    TranslatePipe,
    MapAvatarToServerPipe,
    ImageErrorResolverDirective,
    CorePageEditComponent
  ],
  exports: [
    AuthProfileComponent
  ]
})
export class AuthProfileModule { }
