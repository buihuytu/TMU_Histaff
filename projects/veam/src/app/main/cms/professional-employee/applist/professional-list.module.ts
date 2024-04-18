import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { ProfessionalEmployeeListRoutes } from "./professional-list.routing"

@NgModule({
    imports: [RouterModule.forChild(ProfessionalEmployeeListRoutes)],
})

export class ProfessionalEmployeeListModule { }