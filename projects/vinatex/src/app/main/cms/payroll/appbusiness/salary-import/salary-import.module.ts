import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CoreOrgTreeComponent, CorePageListComponent, CorePageHeaderComponent, CoreDropdownComponent, CoreFormControlSeekerComponent, CoreButtonGroupVnsComponent, CoreChecklistComponent, CoreDatePickerComponent, FullscreenModalLoaderComponent, TranslatePipe } from 'ngx-histaff-alpha';
import { SalaryImportComponent } from './salary-import.component';
import { SalaryImportRoutingModule } from './salary-import.routing';

@NgModule({
  declarations: [SalaryImportComponent],
  imports: [
    CommonModule,
    FormsModule,
    TranslatePipe,
    SalaryImportRoutingModule,
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
export class SalaryImportModule {}
