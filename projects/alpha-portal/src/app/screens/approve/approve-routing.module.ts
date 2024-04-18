import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApproveComponent } from './approve/approve.component';
import { LeaveApproveComponent } from './leave-approve/leave-approve.component';
import { ApproveOvertimeComponent } from './approve-overtime/approve-overtime.component';
import { ExplainWorkApproveComponent } from './explain-work-approve/explain-work-approve.component';
import { ApproveHistoryComponent } from './approve-history/approve-history.component';
import { LeaveApproveEditComponent } from './leave-approve/leave-approve-edit/leave-approve-edit.component';
import { OvertimeApproveEditComponent } from './approve-overtime/overtime-approve-edit/overtime-approve-edit.component';
import { ExplainWorkApproveEditComponent } from './explain-work-approve/explain-work-approve-edit/explain-work-approve-edit.component';

const routes: Routes = [
  {
    path: '',
    component: ApproveComponent,
  },
  {
    path: 'leave-approve',
    component: LeaveApproveComponent,
  },
  {
    path: 'leave-approve-edit',
    component: LeaveApproveEditComponent,
  },
  {
    path: 'overtime-approve',
    component: ApproveOvertimeComponent,
  },
  {
    path: 'explain-approve',
    component: ExplainWorkApproveComponent,
  },
  {
    path: 'approve-history',
    component: ApproveHistoryComponent
  },
  {
    path: 'overtime-approve-edit',
    component: OvertimeApproveEditComponent
  },
  {
    path: 'explain-approve-edit',
    component: ExplainWorkApproveEditComponent
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ApproveRoutingModule {}
