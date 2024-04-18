import { NgModule } from "@angular/core";
import { CalculatePayrollBackdateComponent } from "./calculatepayroll-backdate.component";
import { CalculatePayrollBackdateRoutingModule } from "./calculatepayroll-backdate-routing.module";
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
    CalculatePayrollBackdateRoutingModule,
    CoreTableComponent,
    CorePaginationFullComponent,
    FullscreenModalLoaderComponent,
  ],
  declarations: [CalculatePayrollBackdateComponent],
})
export class CalculatePayrollBackdateModule {}
