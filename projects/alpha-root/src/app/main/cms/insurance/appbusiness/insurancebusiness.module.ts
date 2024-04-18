import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { InsuranceBusinessRoutes } from "./insurancebusiness.routing";

@NgModule({
  imports: [RouterModule.forChild(InsuranceBusinessRoutes)],
  declarations: [
  ],
})
export class InsuranceBusinessModule {}
