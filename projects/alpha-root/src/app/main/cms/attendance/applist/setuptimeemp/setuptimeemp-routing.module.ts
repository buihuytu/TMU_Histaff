import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SetupTimeEmpComponent } from './setuptimeemp.component';
import { SetupTimeEmpEditComponent } from './edit/setuptimeemp-edit.component';
import { CanDeactivateGuard } from 'ngx-histaff-alpha';

const routes: Routes = [
  {
    path: "",
    component: SetupTimeEmpComponent,
    children: [
      {
        path: ":id",
        component: SetupTimeEmpEditComponent,
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
export class SetupTimeEmpRoutingModule { }