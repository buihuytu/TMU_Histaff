import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { OrganizeRoutes } from "./organize.routing";

@NgModule({
  imports: [RouterModule.forChild(OrganizeRoutes)],
})
export class OrganizeModule {}
