import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { InsuranceSettingRoutes } from "./insurancesetting.routing";

@NgModule({
  imports: [RouterModule.forChild(InsuranceSettingRoutes)],
})
export class InsuranceSettingModule {}
