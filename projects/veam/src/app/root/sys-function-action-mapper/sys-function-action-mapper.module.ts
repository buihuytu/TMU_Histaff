import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SysFunctionActionMapperRoutingModule } from './sys-function-action-mapper-routing.module';
import { CoreButtonGroupVnsComponent, CoreIosSwitcherComponent, FullscreenModalLoaderComponent } from 'ngx-histaff-alpha';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SysFunctionActionMapperRoutingModule,
    CoreIosSwitcherComponent,
    CoreButtonGroupVnsComponent,
    FullscreenModalLoaderComponent,
  ]
})
export class SysFunctionActionMapperModule { }
