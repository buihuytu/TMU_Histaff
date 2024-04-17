import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SysActionComponent, SysActionEditComponent, CanDeactivateGuard } from 'ngx-histaff-alpha';

const routes: Routes = [
  {
    path: "",
    component: SysActionComponent,
    children: [
      {
        path: ":id",
        component: SysActionEditComponent,
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
export class SysActionRoutingModule { }
