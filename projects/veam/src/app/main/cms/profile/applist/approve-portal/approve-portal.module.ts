import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApprovePortalComponent } from './approve-portal.component';
import { ApprovePortalRoutingModule } from './approve-portal.routing';
import { ApproveWorkingBeforeComponent } from './approve-working-before/approve-working-before.component';
import { ApproveCertificateEdittModule } from './approve-certificate-edit/approve-certificate-edit.module';
import { CoreCheckboxComponent, CoreConfirmDialogComponent, CoreOrgTreeComponent, CorePageHeaderComponent, CorePageListComponent, CorePaginationFullComponent } from 'ngx-histaff-alpha';
import { FormsModule } from '@angular/forms';




@NgModule({
  declarations: [
    ApproveWorkingBeforeComponent
  ],
  imports: [
    CommonModule,
    ApprovePortalRoutingModule,
    CorePageHeaderComponent,
    FormsModule,
    CorePaginationFullComponent,
    CoreConfirmDialogComponent,
    CoreCheckboxComponent,
    CorePageListComponent,
    ApproveCertificateEdittModule,
    CorePageListComponent,
    CoreOrgTreeComponent
  ],
  // providers: [CoreService],
})
export class ApprovePortalModule { }
