import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LeaveJobComponent } from './leavejob.component';
import { LeaveJobEditComponent } from './edit/leavejob-edit.component';
import { CanDeactivateGuard } from 'ngx-histaff-alpha';

const routes: Routes = [
  {
    path: "",
    component: LeaveJobComponent,
  },
  {
    path: ":id",
    component: LeaveJobEditComponent,
    canDeactivate: [CanDeactivateGuard]
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LeaveJobRoutingModule { }