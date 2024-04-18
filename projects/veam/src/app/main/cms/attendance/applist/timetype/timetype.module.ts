import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CorePageListComponent, CorePageEditComponent, CoreStatusStickerComponent } from 'ngx-histaff-alpha';
import { TimeTypeEditComponent } from './timetype-edit/timetype-edit.component';
import { TimeTypeRoutingModule } from './timetype-routing.module';
import { TimeTypeComponent } from './timetype/timetype.component';


@NgModule({
  declarations: [
    TimeTypeComponent,
    TimeTypeEditComponent
  ],
  imports: [
    CommonModule,
    TimeTypeRoutingModule,
    CorePageListComponent,
    CorePageEditComponent,
    CoreStatusStickerComponent
  ]
})
export class TimeTypeModule { }
