import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProfileBusinessRoutes } from './profilebusiness.routing';

@NgModule({
  imports: [RouterModule.forChild(ProfileBusinessRoutes)],
  declarations: [
  ],
})
export class ProfileBusinessModule {}
