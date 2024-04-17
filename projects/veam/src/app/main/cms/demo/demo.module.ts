import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DemoRoutingModule } from './demo-routing.module';
import { HeaderButtonDropdownDemoComponent } from './header-button-dropdown-demo/header-button-dropdown-demo.component';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    DemoRoutingModule,
    HeaderButtonDropdownDemoComponent,
  ]
})
export class DemoModule { }
