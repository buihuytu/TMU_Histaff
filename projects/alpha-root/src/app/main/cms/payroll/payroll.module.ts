import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { PayrollRoutes } from "./payroll.routing";

@NgModule({
  imports: [RouterModule.forChild(PayrollRoutes)],
})
export class PayrollModule {}
