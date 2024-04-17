import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommendComponent } from './commend.component';

const routes: Routes = [
  {
    path: "",
    component: CommendComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CommendRoutingModule { }
