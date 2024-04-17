import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { ImportMonthlyTaxComponent } from './import-monthly-tax.component';

const routes: Routes = [
  {
    path: '',
    component: ImportMonthlyTaxComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ImportMonthlyTaxRoutingModule {}
