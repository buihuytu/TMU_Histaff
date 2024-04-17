import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { InsuranceRoutes } from "./insurance.routing";

@NgModule({
  imports: [RouterModule.forChild(InsuranceRoutes)],
})
export class InsuranceModule {}
