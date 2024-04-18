import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InfotypeRoutingModule } from './infotype-routing.module';
import { InfotypeComponent } from './infotype/infotype.component';
import { InfotypeEditComponent } from './infotype-edit/infotype-edit.component';
import { CorePageListComponent, CorePageEditComponent } from 'ngx-histaff-alpha';

@NgModule({
  declarations: [
    InfotypeComponent,
    InfotypeEditComponent
  ],
  imports: [
    CommonModule,
    InfotypeRoutingModule,
    CorePageListComponent,
    CorePageEditComponent
  ]
})
export class InfotypeModule { }
