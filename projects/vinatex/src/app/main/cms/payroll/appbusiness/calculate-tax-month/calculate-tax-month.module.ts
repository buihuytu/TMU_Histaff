import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CoreCompositionComponent, CorePageHeaderComponent, CoreOrgTreeComponent, CoreDropdownComponent, CoreDatePickerComponent, CoreButtonGroupVnsComponent, CoreTableComponent, CorePaginationFullComponent, FullscreenModalLoaderComponent, CoreHeaderParamsComponent, TranslatePipe } from 'ngx-histaff-alpha';
import { CalculateTaxMonthRoutingModule } from './calculate-tax-month-routing.module';
import { CalculateTaxMonthComponent } from './calculate-tax-month.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TranslatePipe,
    CoreCompositionComponent,
    CorePageHeaderComponent,
    CoreOrgTreeComponent,
    CoreDropdownComponent,
    CoreDatePickerComponent,
    CoreButtonGroupVnsComponent,
    CalculateTaxMonthRoutingModule,
    CoreTableComponent,
    CorePaginationFullComponent,
    FullscreenModalLoaderComponent,
    CoreHeaderParamsComponent
  ],
  declarations: [CalculateTaxMonthComponent],
})
export class CalculateTaxMonthModule {}
