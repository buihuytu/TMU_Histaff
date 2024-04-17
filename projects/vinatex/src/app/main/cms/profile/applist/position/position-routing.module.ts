
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PositionEditComponent } from './edit/position-edit.component';
import { CanDeactivateGuard, PositionComponent } from 'ngx-histaff-alpha';
import { PositionWrapperComponent } from './position-wrapper/position-wrapper.component';

const routes: Routes = [
  {
    path: "",
    component: PositionWrapperComponent,
  },
  {
    path: ":id",
    component: PositionEditComponent,
    canDeactivate: [CanDeactivateGuard]
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PositionRoutingModule { }
