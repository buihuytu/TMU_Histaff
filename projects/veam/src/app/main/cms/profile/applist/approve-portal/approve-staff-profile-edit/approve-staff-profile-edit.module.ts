import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CoreTabsComponent, CorePageListComponent, CorePageViewComponent, CoreOrgTreeComponent, CorePageHeaderComponent, TranslatePipe, TableCellPipe } from 'ngx-histaff-alpha';
import { ApproveAdditinalInfoComponent } from './approve-additinal-info/approve-additinal-info.component';
import { ApproveBankinfoComponent } from './approve-bankinfo/approve-bankinfo.component';
import { ApproveContractComponent } from './approve-contract/approve-contract.component';
import { ApproveCvComponent } from './approve-cv/approve-cv.component';
import { ApproveEducationComponent } from './approve-education/approve-education.component';
import { ApproveStaffProfileEditComponent } from './approve-staff-profile-edit.component';
import { ApproveStaffProfileRoutingModule } from './approve-staff-profile-edit.routing';

@NgModule({
  declarations: [
    ApproveStaffProfileEditComponent,
    ApproveCvComponent,
    ApproveContractComponent,
    ApproveAdditinalInfoComponent,
    ApproveEducationComponent,
    ApproveBankinfoComponent,
  ],
  imports: [
    CommonModule,
    TableCellPipe,
    CoreTabsComponent,
    CorePageListComponent,
    ApproveStaffProfileRoutingModule,
    CorePageViewComponent,
    CoreOrgTreeComponent,
    FormsModule,
    CorePageHeaderComponent
  ]
})
export class ApproveStaffProfileEditModule { }
