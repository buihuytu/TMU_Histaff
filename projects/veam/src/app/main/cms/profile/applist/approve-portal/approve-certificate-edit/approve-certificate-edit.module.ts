import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { ApproveCertificateEditRoutingModule } from './approve-certificate-edit-routing.module';
import { CorePageListComponent, CorePageEditComponent, CorePageHeaderComponent, CoreOrgTreeComponent } from 'ngx-histaff-alpha';
import { ApproveCertificateEditDetailComponent } from './approve-certificate-edit-detail/approve-certificate-edit-detail.component';
import { ApproveCertificateEditComponent } from './approve-certificate-edit.component';


@NgModule({
  imports: [
    // thêm CommonModule
    // để có chức năng điều hướng Pop Up
    CommonModule,
    FormsModule,
    CorePageListComponent,
    CorePageEditComponent,
    CorePageHeaderComponent,
    ApproveCertificateEditRoutingModule,
    CoreOrgTreeComponent
  ],
  declarations: [ApproveCertificateEditComponent,ApproveCertificateEditDetailComponent],
  // providers: [CoreService],
})


export class ApproveCertificateEdittModule {}
