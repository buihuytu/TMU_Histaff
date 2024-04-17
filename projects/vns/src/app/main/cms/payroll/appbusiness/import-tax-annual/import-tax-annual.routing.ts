import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { ImportTaxAnnualComponent } from './import-tax-annual.component';

const routes: Routes = [
  {
    path: '',
    component: ImportTaxAnnualComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ImportTaxAnnualRoutingModule {}
