import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { InsuranceListRoutes } from "./insurancelist.routing";

@NgModule({
  imports: [RouterModule.forChild(InsuranceListRoutes)],
})
export class InsuranceListModule {}
