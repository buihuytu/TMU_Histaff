import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CoreOrgTreeComponent, CorePageListComponent, CorePageHeaderComponent, CoreDropdownComponent, CoreFormControlSeekerComponent, CoreButtonGroupVnsComponent, CoreChecklistComponent, CoreDatePickerComponent, FullscreenModalLoaderComponent, TranslatePipe } from 'ngx-histaff-alpha';
import { ImportMonthlyTaxComponent } from './import-monthly-tax.component';
import { ImportMonthlyTaxRoutingModule } from './import-monthly-tax.routing';


@NgModule({
  declarations: [ImportMonthlyTaxComponent],
  imports: [
    CommonModule,
    FormsModule,
    TranslatePipe,
    ImportMonthlyTaxRoutingModule,
    CoreOrgTreeComponent,
    CorePageListComponent,
    CorePageHeaderComponent,
    CoreDropdownComponent,
    CoreFormControlSeekerComponent,
    CoreButtonGroupVnsComponent,
    CoreChecklistComponent,
    CoreDatePickerComponent,
    FullscreenModalLoaderComponent
  ],
})
export class ImportMonthlyTaxModule {}
