import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { CalculateTaxYearComponent } from "./calculate-tax-year.component";


const routes: Routes = [
    {
      path: "",
      component: CalculateTaxYearComponent,
    },
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class CalculateTaxYearRoutingModule{}