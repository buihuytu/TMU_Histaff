import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConcurrentComponent } from './concurrent.component';

const routes: Routes = [
  {
    path: "",
    component: ConcurrentComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConcurrentRoutingModule { }
