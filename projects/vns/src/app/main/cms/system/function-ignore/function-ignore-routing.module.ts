import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FunctionIgnoreComponent, FunctionIgnoreEditComponent, CanDeactivateGuard } from 'ngx-histaff-alpha';

const routes: Routes = [
  {
    path: "",
    component: FunctionIgnoreComponent,
    children: [
      {
        path: ":id",
        component: FunctionIgnoreEditComponent,
        outlet: "corePageListAux",
        canDeactivate: [CanDeactivateGuard]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FunctionIgnoreRoutingModule { }
