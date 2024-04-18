import { NgModule } from "@angular/core";
import { CalculatePayrollSubRoutingModule } from "./calculatepayrollsub-routing.module";
import { CalculatePayrollSubComponent } from "./calculatepayrollsub.component";
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
    CalculatePayrollSubRoutingModule,
    CoreTableComponent,
    CorePaginationFullComponent,
    FullscreenModalLoaderComponent,
  ],
  declarations: [CalculatePayrollSubComponent],
})
export class CalculatePayrollSubModule {}
