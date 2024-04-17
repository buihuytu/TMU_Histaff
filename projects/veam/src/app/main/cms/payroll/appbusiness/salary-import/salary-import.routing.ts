import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { SalaryImportComponent } from './salary-import.component';

const routes: Routes = [
  {
    path: '',
    component: SalaryImportComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SalaryImportRoutingModule {}
