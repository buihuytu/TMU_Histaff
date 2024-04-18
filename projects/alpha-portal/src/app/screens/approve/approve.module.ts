import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ApproveRoutingModule } from './approve-routing.module';
import { ApproveComponent } from './approve/approve.component';
import { LeaveApproveComponent } from './leave-approve/leave-approve.component';
import { ExplainWorkApproveComponent } from './explain-work-approve/explain-work-approve.component';
import { ApproveHistoryComponent } from './approve-history/approve-history.component';
import { LeaveApproveEditComponent } from './leave-approve/leave-approve-edit/leave-approve-edit.component';
import { OvertimeApproveEditComponent } from './approve-overtime/overtime-approve-edit/overtime-approve-edit.component';
import { ExplainWorkApproveEditComponent } from './explain-work-approve/explain-work-approve-edit/explain-work-approve-edit.component';
import { FormsModule } from '@angular/forms';
import { CoreDatePickerComponent, CorePageEditComponent, CoreControlComponent, CoreButtonGroupVnsComponent, CoreChecklistComponent, TableCellPipe, NormalizeHumanNamePipe, MapAvatarToServerPipe, TranslatePipe, TooltipDirective } from 'ngx-histaff-alpha';
import { ApproveOvertimeComponent } from './approve-overtime/approve-overtime.component';

@NgModule({
  declarations: [
    ApproveComponent,
    LeaveApproveComponent,
    ApproveOvertimeComponent,
    ApproveHistoryComponent,
    ExplainWorkApproveComponent,
    LeaveApproveEditComponent,
    OvertimeApproveEditComponent,
    ExplainWorkApproveEditComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ApproveRoutingModule,
    CoreDatePickerComponent,
    CorePageEditComponent,
    CoreControlComponent,
    CoreButtonGroupVnsComponent,
    CoreChecklistComponent,
    TranslatePipe,
    TableCellPipe,
    NormalizeHumanNamePipe,
    MapAvatarToServerPipe,
    TooltipDirective,
  ]
})
export class ApproveModule {}
