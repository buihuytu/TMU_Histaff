import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CoreAttachmentComponent, CoreOrgTreeComponent, CorePageEditComponent, CorePageHeaderComponent, CorePageListComponent, CorePageViewComponent, CoreTabsComponent } from 'ngx-histaff-alpha';
import { ApproveHuWorkingComponent } from './approve-hu-working/approve-hu-working.component';
import { ApproveWorkingCompanyRoutingModule } from './approve-working-company-routing.module';
import { ApproveWorkingCompanyComponent } from './approve-working-company.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    CorePageListComponent,
    CorePageEditComponent,
    CorePageHeaderComponent,
    ApproveWorkingCompanyRoutingModule,
    CoreOrgTreeComponent,
    CoreAttachmentComponent,
    CoreTabsComponent,
    CorePageViewComponent,
  ],

  declarations: [
    ApproveWorkingCompanyComponent,
    // thứ tự 01: Quá trình công tác
    ApproveHuWorkingComponent
  ],
})
export class ApproveWorkingCompanyModule { }
