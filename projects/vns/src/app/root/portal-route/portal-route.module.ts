import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PortalRouteRoutingModule } from './portal-route-routing.module';
import { PortalRouteComponent, PortalRouteEditComponent, CorePageListComponent, CorePageEditComponent } from 'ngx-histaff-alpha';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    PortalRouteRoutingModule,
    CorePageListComponent,
    CorePageEditComponent,
    PortalRouteComponent,
    PortalRouteEditComponent
  ]
})
export class PortalRouteModule { }
