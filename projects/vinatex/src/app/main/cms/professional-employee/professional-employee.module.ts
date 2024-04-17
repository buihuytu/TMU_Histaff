import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { Error404Module } from "../../errors/404/error-404.module";
import { ProfessionalEmployeeRoutes } from "./professional-employee.routing";

@NgModule({
  imports: [RouterModule.forChild(ProfessionalEmployeeRoutes)],
})

export class ProfessionalEmployeeModule { }