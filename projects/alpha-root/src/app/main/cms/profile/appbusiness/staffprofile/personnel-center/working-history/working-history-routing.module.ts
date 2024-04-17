import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WorkingHistoryComponent } from './working-history.component';

const routes: Routes = [
  {
    path: "",
    component: WorkingHistoryComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WorkingHistoryRoutingModule { }
