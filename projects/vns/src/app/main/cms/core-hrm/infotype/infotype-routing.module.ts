import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { InfotypeComponent } from './infotype/infotype.component';
import { InfotypeEditComponent } from './infotype-edit/infotype-edit.component';
import { CanDeactivateGuard } from 'ngx-histaff-alpha';

const routes: Routes = [
  {
    path: "",
    component: InfotypeComponent,
    children: [
      {
        path: ":id",
        component: InfotypeEditComponent,
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
export class InfotypeRoutingModule { }
