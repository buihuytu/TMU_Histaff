import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListfundEditComponent } from './edit/listfund-edit.component';
import { ListfundCompnent } from './listfund.component';
import { CanDeactivateGuard } from 'ngx-histaff-alpha';

const routes: Routes = [
  {
    path: "",
    component: ListfundCompnent,
    children: [
      {
        path: ":id",
        component: ListfundEditComponent,
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
export class ListfundRoutingModule { }