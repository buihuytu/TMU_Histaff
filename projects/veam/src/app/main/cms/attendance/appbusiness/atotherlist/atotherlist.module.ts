import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AtotherlistComponent } from './atotherlist.component';
import { AtotherlistEditComponent } from './atotherlist-edit/atotherlist-edit.component';
import { AtOtherListRoutingModule } from './atotherlist.routing';
import { CorePageEditComponent, CorePageListComponent, CoreCheckboxComponent, CoreStatusStickerComponent } from 'ngx-histaff-alpha';



@NgModule({
  declarations: [
    AtotherlistComponent,
    AtotherlistEditComponent
  ],
  imports: [
    CommonModule,
    AtOtherListRoutingModule,
    CorePageEditComponent,
    CorePageListComponent,
    CoreCheckboxComponent,
    CoreStatusStickerComponent
  ],
  // providers: [CoreService],
  
})
export class AtotherlistModule { }
