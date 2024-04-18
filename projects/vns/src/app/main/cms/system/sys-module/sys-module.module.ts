import { NgModule } from '@angular/core';

import { SysModuleRoutingModule } from './sys-module-routing.module';
import { RouterModule } from '@angular/router';
import { CorePageListComponent, CorePageHeaderComponent, CorePageEditComponent, CoreCheckboxComponent } from 'ngx-histaff-alpha';

@NgModule({

  imports: [
    CorePageListComponent,
    CorePageHeaderComponent,
    RouterModule,
    CorePageEditComponent,
    SysModuleRoutingModule,
    CoreCheckboxComponent
  ],
  // providers: [CoreService],

})
export class SysModuleModule { }
