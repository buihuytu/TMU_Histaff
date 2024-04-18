import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InsWherehealthComponent } from './ins-wherehealth.component';
import { InsWhereHealThRoutingModule } from './InsWhereHealTh.routing';
import { CorePageListComponent, CorePageEditComponent, CoreStatusStickerComponent } from 'ngx-histaff-alpha';
import { InsWherehealthEditComponent } from './ins-wherehealth-edit/ins-wherehealth-edit.component';

@NgModule({
  declarations: [InsWherehealthComponent, InsWherehealthEditComponent],
  imports: [
    CommonModule,
    InsWhereHealThRoutingModule,
    CorePageListComponent,
    CorePageEditComponent,
    CoreStatusStickerComponent
  ],
})
export class InsWherehealthModule {}
