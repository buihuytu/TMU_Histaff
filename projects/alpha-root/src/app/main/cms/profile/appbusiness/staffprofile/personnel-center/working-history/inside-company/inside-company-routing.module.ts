import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InsideCompanyComponent } from './inside-company.component';

const routes: Routes = [
  {
    path: "",
    component: InsideCompanyComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InsideCompanyRoutingModule { }
