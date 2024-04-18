import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ObjectRoutingModule } from './object-routing.module';
import { ObjectComponent } from './object/object.component';
import { ObjectEditComponent } from './object-edit/object-edit.component';
import { CorePageListComponent, CorePageEditComponent } from 'ngx-histaff-alpha';

@NgModule({
  declarations: [
    ObjectComponent,
    ObjectEditComponent
  ],
  imports: [
    CommonModule,
    ObjectRoutingModule,
    CorePageListComponent,
    CorePageEditComponent
  ]
})
export class ObjectModule { }
