import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CanDeactivateGuard } from 'ngx-histaff-alpha';
import { GroupuserCloneComponent } from './clone/groupuser-clone.component';
import { GroupUserEditComponent } from './edit/groupuser-edit.component';
import { GroupUserComponent } from './groupuser.component';


const routes: Routes = [
  {
    path: "",
    component: GroupUserComponent,
    children: [
      {
        path: "clone",
        component: GroupuserCloneComponent,
        outlet: "corePageListAux",
        canDeactivate: [CanDeactivateGuard]
      },

      {
        path: ":id",
        component: GroupUserEditComponent,
        outlet: "corePageListAux",
        canDeactivate: [CanDeactivateGuard]
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GroupUserRoutingModule { }
