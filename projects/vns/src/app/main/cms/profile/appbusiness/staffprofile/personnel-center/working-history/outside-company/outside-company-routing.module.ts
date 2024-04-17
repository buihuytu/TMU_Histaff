import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OutsideCompanyComponent } from './outside-company.component';

const routes: Routes = [
  {
    path: "",
    component: OutsideCompanyComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OutsideCompanyRoutingModule { }
