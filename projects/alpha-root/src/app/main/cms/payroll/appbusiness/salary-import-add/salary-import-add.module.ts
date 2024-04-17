import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CoreOrgTreeComponent, CorePageListComponent, CorePageHeaderComponent, CoreDropdownComponent, CoreFormControlSeekerComponent, CoreButtonGroupVnsComponent, CoreChecklistComponent, CoreDatePickerComponent, FullscreenModalLoaderComponent, TranslatePipe } from 'ngx-histaff-alpha';
import { SalaryImportAddComponent } from './salary-import-add.component';
import { SalaryImportAddRoutingModule } from './salary-import-add.routing';

@NgModule({
  declarations: [SalaryImportAddComponent],
  imports: [
    CommonModule,
    FormsModule,
    TranslatePipe,
    SalaryImportAddRoutingModule,
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
export class SalaryImportAddModule {}
