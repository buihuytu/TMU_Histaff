import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CoreOrgTreeComponent, CorePageListComponent, CorePageHeaderComponent, CoreDropdownComponent, CoreFormControlSeekerComponent, CoreButtonGroupVnsComponent, CoreChecklistComponent, CoreDatePickerComponent, FullscreenModalLoaderComponent, TranslatePipe } from 'ngx-histaff-alpha';
import { ImportTaxAnnualComponent } from './import-tax-annual.component';
import { ImportTaxAnnualRoutingModule } from './import-tax-annual.routing';

@NgModule({
  declarations: [ImportTaxAnnualComponent],
  imports: [
    CommonModule,
    FormsModule,
    TranslatePipe,
    ImportTaxAnnualRoutingModule,
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
export class ImportTaxAnnualModule {}
