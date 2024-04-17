import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CalculateTaxMonthComponent } from './calculate-tax-month.component';

const routes: Routes = [
  {
    path: '',
    component: CalculateTaxMonthComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CalculateTaxMonthRoutingModule {}
