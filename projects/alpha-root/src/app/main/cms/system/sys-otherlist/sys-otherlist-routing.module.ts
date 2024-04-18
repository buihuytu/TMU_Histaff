import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SysOtherlistComponent } from './sys-otherlist/sys-otherlist.component';
import { SysOtherlistEditComponent } from './sys-otherlist-edit/sys-otherlist-edit.component';
import { CanDeactivateGuard } from 'ngx-histaff-alpha';

const routes: Routes = [
  {
    path: "",
    component: SysOtherlistComponent,
    children: [
      {
        path: ":id",
        component: SysOtherlistEditComponent,
        outlet: "corePageListAux",
        canDeactivate: [CanDeactivateGuard]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class SysOtherlistRoutingModule { }
