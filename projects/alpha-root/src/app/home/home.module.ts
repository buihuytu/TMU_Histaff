import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';

import { AppDashboardModule } from '../main/cms/dashboard/dashboard.module';
import { HomeComponent } from './home.component';

import { CorePageHeaderComponent } from 'ngx-histaff-alpha';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    AppDashboardModule,
    CorePageHeaderComponent
  ]
})
export class HomeModule { }
