import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CanDeactivateGuard, SysModuleComponent, SysModuleEditComponent } from 'ngx-histaff-alpha';

const routes: Routes = [
  {
    path: "",
    component: SysModuleComponent,
    children: [
      {
        path: ":id",
        component: SysModuleEditComponent,
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
export class SysModuleRoutingModule { }
