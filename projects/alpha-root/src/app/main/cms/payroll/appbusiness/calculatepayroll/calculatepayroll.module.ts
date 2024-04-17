import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { CoreCompositionComponent, CorePageHeaderComponent, CoreOrgTreeComponent, CoreDropdownComponent, CoreDatePickerComponent, CoreButtonGroupVnsComponent, CoreTableComponent, CorePaginationFullComponent, FullscreenModalLoaderComponent, TranslatePipe } from "ngx-histaff-alpha";
import { CalculatePayrollRoutingModule } from "./calculatepayroll-routing.module";
import { CalculatePayrollComponent } from "./calculatepayroll.component";
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
    CalculatePayrollRoutingModule,
    CoreTableComponent,
    CorePaginationFullComponent,
    FullscreenModalLoaderComponent,
  ],
  declarations: [CalculatePayrollComponent],
})
export class CalculatePayrollModule {}
