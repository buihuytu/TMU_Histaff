import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HufamilyEditComponent } from './hufamily-edit.component';
import { HuFamilyEditRoutingModule } from './hufamily-edit.routing';
import { FormsModule } from '@angular/forms';
import { CoreCheckboxComponent, CorePageListComponent, CorePageEditComponent, CoreOrgTreeComponent } from 'ngx-histaff-alpha';
import { HufamilyEditDetailComponent } from './hufamily-edit-detail/hufamily-edit-detail.component';




@NgModule({
  declarations: [
    HufamilyEditComponent,
    HufamilyEditDetailComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    CoreCheckboxComponent,
    CorePageListComponent,
    CorePageEditComponent,
    HuFamilyEditRoutingModule,
    CoreOrgTreeComponent,
  ],
  // providers: [CoreService]
})
export class HufamilyEditModule { }
