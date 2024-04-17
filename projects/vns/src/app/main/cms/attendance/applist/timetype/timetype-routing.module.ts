import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TimeTypeComponent } from './timetype/timetype.component';
import { TimeTypeEditComponent } from './timetype-edit/timetype-edit.component';
import { CanDeactivateGuard } from 'ngx-histaff-alpha';

const routes: Routes = [
  {
    path: "",
    component: TimeTypeComponent,
    children: [
      {
        path: ":id",
        component: TimeTypeEditComponent,
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
export class TimeTypeRoutingModule { }
