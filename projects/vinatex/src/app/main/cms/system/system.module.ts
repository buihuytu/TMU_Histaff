import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SystemRoutes } from './system.routing';

@NgModule({
  imports: [RouterModule.forChild(SystemRoutes)],
  declarations: [
  ],
})
export class SystemModule {}
