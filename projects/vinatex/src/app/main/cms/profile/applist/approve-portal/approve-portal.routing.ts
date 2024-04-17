import { RouterModule, Routes } from "@angular/router";
import { ApprovePortalComponent } from "./approve-portal.component";
import { NgModule } from "@angular/core";
import { ApproveWorkingBeforeComponent } from "./approve-working-before/approve-working-before.component";
import { CanDeactivateGuard } from "ngx-histaff-alpha";



const routes: Routes = [
    {
      path: '',
      component: ApprovePortalComponent,
    },  
    {
      path: 'family-info',
      loadChildren: () => import("./hufamily-edit/hufamily-edit.module").then(m => m.HufamilyEditModule),
      canDeactivate: [CanDeactivateGuard],
    },
    {
      path: 'approve-staff-profile-edit',
      loadChildren: () => import("./approve-staff-profile-edit/approve-staff-profile-edit.module").then(m => m.ApproveStaffProfileEditModule),
      canDeactivate: [CanDeactivateGuard],
    },
    {
      // phê duyệt bằng cấp chứng chỉ
      path: 'approve-certificate-edit',
      loadChildren: () => import("./approve-certificate-edit/approve-certificate-edit.module").then(m => m.ApproveCertificateEdittModule),
      canDeactivate: [CanDeactivateGuard],
    },
    {
      // phê duyệt quá trình công tác tại công ty
      path: 'approve-working-company',
      loadChildren: () => import("./approve-working-company/approve-working-company.module").then(m => m.ApproveWorkingCompanyModule),
      canDeactivate: [CanDeactivateGuard],
    },
    {
      path:'approve-working-before',
      component: ApproveWorkingBeforeComponent,
      canDeactivate: [CanDeactivateGuard],
    }
  ];
  @NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
  })
  export class ApprovePortalRoutingModule {}