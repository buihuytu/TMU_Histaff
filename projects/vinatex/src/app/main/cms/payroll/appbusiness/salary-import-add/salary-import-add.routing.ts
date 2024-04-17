import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { SalaryImportAddComponent } from './salary-import-add.component';

const routes: Routes = [
  {
    path: '',
    component: SalaryImportAddComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SalaryImportAddRoutingModule {}
