import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FunctionComponent, FunctionEditComponent, CanDeactivateGuard } from 'ngx-histaff-alpha';


const routes: Routes = [
  {
    path: "",
    component: FunctionComponent,
    children: [
      {
        path: ":id",
        component: FunctionEditComponent,
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
export class FunctionRoutingModule { }
