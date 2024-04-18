import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InsTypeComponent } from './ins-type.component';
import { InsTypeRoutingModule } from './ins-type.routing';
import { CorePageListComponent, CorePageEditComponent, CoreStatusStickerComponent } from 'ngx-histaff-alpha';
import { InsTypeEditComponent } from './ins-type-edit/ins-type-edit.component';

@NgModule({
  declarations: [InsTypeComponent, InsTypeEditComponent],
  imports: [
    CommonModule,
    InsTypeRoutingModule,
    CorePageListComponent,
    CorePageEditComponent,
    CoreStatusStickerComponent
  ],
})
export class InsTypeModule {}
