import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrgchartComponent } from './orgchart.component';

const routes: Routes = [
  {
    path: "",
    component: OrgchartComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrgchartRoutingModule { }
