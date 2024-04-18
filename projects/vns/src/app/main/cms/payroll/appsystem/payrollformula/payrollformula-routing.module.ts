
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PayrollFormulaEditComponent } from "./edit/payrollformula-edit.component";
import { PayrollFormulaComponent } from './payrollformula.component';
import { CanDeactivateGuard } from 'ngx-histaff-alpha';

const routes: Routes = [
  {
    path: "",
    component: PayrollFormulaComponent,
  },
  {
    path: ":id",
    component: PayrollFormulaEditComponent,
    canDeactivate: [CanDeactivateGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class PayrollFormulaRoutingModule { }