import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { CalculatePayrollSubComponent } from "./calculatepayrollsub.component";


const routes: Routes = [
    {
      path: "",
      component: CalculatePayrollSubComponent,
    },
  ];
  
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class CalculatePayrollSubRoutingModule{}