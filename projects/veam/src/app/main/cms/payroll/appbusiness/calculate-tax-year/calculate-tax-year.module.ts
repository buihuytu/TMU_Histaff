import { NgModule } from "@angular/core";
import { CalculateTaxYearComponent } from "./calculate-tax-year.component";
import { CalculateTaxYearRoutingModule } from "./calculate-tax-year-routing.module";
import { CommonModule } from "@angular/common";
import { CoreCompositionComponent, CorePageHeaderComponent, CoreOrgTreeComponent, CoreDropdownComponent, CoreDatePickerComponent, CoreButtonGroupVnsComponent, CoreTableComponent, CorePaginationFullComponent, FullscreenModalLoaderComponent, TranslatePipe } from "ngx-histaff-alpha";
import { FormsModule } from "@angular/forms";

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
    CalculateTaxYearRoutingModule,
    CoreTableComponent,
    CorePaginationFullComponent,
    FullscreenModalLoaderComponent,
  ],
  declarations: [CalculateTaxYearComponent],
})
export class CalculateTaxYearlModule {}
