import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { CalculatePayrollBackdateComponent } from "./calculatepayroll-backdate.component";


const routes: Routes = [
    {
      path: "",
      component: CalculatePayrollBackdateComponent,
    },
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class CalculatePayrollBackdateRoutingModule{}