import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TerminateComponent } from './terminate.component';

const routes: Routes = [
  {
    path: "",
    component: TerminateComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TerminateRoutingModule { }
