import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CanDeactivateGuard, SysFunctionActionComponent, SysFunctionActionEditComponent } from 'ngx-histaff-alpha';

const routes: Routes = [
  {
    path: "",
    component: SysFunctionActionComponent,
    children: [
      {
        path: ":id",
        component: SysFunctionActionEditComponent,
        outlet: "corePageListAux",
        canDeactivate: [CanDeactivateGuard]
      }
    ]
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SysFunctionActionRoutingModule { }
