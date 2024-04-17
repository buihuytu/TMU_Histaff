import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InMemoryRoutingModule } from './in-memory-routing.module';
import { CorePageHeaderComponent, CoreTableComponent, CoreTabsComponent, InMemoryComponent } from 'ngx-histaff-alpha';

@NgModule({
  imports: [
    CommonModule,
    InMemoryRoutingModule,
    CorePageHeaderComponent,
    CoreTabsComponent,
    CoreTableComponent,
  ]
})
export class InMemoryModule { }
