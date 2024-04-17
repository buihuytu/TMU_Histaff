import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignDefaultComponent } from './signdefault.component';
import { SignDefaultEditComponent } from './edit/signdefault-edit.component';
import { CanDeactivateGuard } from 'ngx-histaff-alpha';

const routes: Routes = [
  {
    path: "",
    component: SignDefaultComponent,
    children: [
      {
        path: ":id",
        component: SignDefaultEditComponent,
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
export class SignDefaultRoutingModule { }