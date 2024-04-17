import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';

import { CoreAccordionComponent, CoreChecklistComponent, CoreCompositionComponent, CoreDatePickerComponent, CoreDropdownComponent, CoreFormControlSeekerComponent, CoreHeaderParamsComponent, CoreOrgTreeComponent, CorePageEditComponent, CorePageListComponent, TranslatePipe } from 'ngx-histaff-alpha';
import { TrTranningRecordComponent } from './tr-tranning-record.component';
import { FormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: '',
    component: TrTranningRecordComponent
  }
];

@NgModule({
  declarations: [
    TrTranningRecordComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    TranslatePipe,
    CorePageListComponent,
    CorePageEditComponent,
    CoreOrgTreeComponent,
    CoreHeaderParamsComponent,
    CoreAccordionComponent,
    CoreCompositionComponent,
    FormsModule,
    CoreFormControlSeekerComponent,
    CoreDatePickerComponent,
    CoreDropdownComponent,
    CoreChecklistComponent
  ]
})

export class TrTranningRecordModule {}