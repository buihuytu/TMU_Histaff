import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { CalculatePayrollComponent } from "./calculatepayroll.component";


const routes: Routes = [
    {
      path: "",
      component: CalculatePayrollComponent,
    },
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class CalculatePayrollRoutingModule{}