import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { CorePageListComponent, CorePageEditComponent, CorePageHeaderComponent, CoreFormComponent, CoreListComponent, CoreButtonGroupVnsComponent, CoreStatusStickerComponent, TranslatePipe } from "ngx-histaff-alpha";
import { PayrollFormulaEditComponent } from "./edit/payrollformula-edit.component";
import { PayrollFormulaRoutingModule } from "./payrollformula-routing.module";
import { PayrollFormulaComponent } from "./payrollformula.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TranslatePipe,
    CorePageListComponent,
    CorePageEditComponent,
    CorePageHeaderComponent,
    PayrollFormulaRoutingModule,
    CoreFormComponent,
    CoreListComponent,
    CoreButtonGroupVnsComponent,
    CoreStatusStickerComponent
  ],
  declarations: [PayrollFormulaComponent, PayrollFormulaEditComponent],
})
export class PayrollFormulaModule {}
