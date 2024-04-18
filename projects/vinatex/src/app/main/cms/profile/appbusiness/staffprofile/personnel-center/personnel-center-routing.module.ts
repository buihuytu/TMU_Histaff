import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PersonnelCenterComponent } from './personnel-center.component';
import { CanDeactivateGuard } from 'ngx-histaff-alpha';

const routes: Routes = [
  {
    path: "",
    component: PersonnelCenterComponent,
    canDeactivate: [CanDeactivateGuard],
    children: [
      {
        // HU_EMPLOYEE_CV || HU_EMPLOYEE
        // Hồ sơ nhân viên
        path: "personnel-profile",
        loadChildren: () => import('./personnel-profile/personnel-profile.module').then(m => m.PersonnelProfileModule)
      },
      {
        // HU_WORKING || HU_WORKING_BEFORE
        // Quá trình công tác
        path: "working-history",
        loadChildren: () => import('./working-history/working-history.module').then(m => m.WorkingHistoryModule)
      },
      {
        // HU_WORKING
        // Hồ sơ lương, phụ cấp
        path: "wage-allowance",
        loadChildren: () => import('./working/working.module').then(m => m.WorkingModule)
      },
      {
        // HU_CONTRACT
        // Hợp đồng, phụ lục hợp đồng
        path: "contract",
        loadChildren: () => import('./contract/contract.module').then(m => m.ContractModule)
      },
      {
        // HU_CERTIFICATE
        // Bằng cấp, chứng chỉ
        path: 'certificate',
        loadChildren: () => import('./certificate/certificate.module').then(m => m.CertificateModule)
      },
      {
        // HU_COMMEND
        // Quá trình khen thưởng
        path: 'commend',
        loadChildren: () => import('./commend/commend.module').then(m => m.CommendModule)
      },
      {
        // HU_DISCIPLINE
        // Quá trình kỷ luật
        path: 'discipline',
        loadChildren: () => import('./discipline/discipline.module').then(m => m.DisciplineModule)
      },
      {
        // HU_???
        // Quá trình kiêm nhiệm
        path: 'concurrent',
        loadChildren: () => import('./concurrent/concurrent.module').then(m => m.ConcurrentModule)
      },
      {
        // HU_FAMILY
        // Thông tin người thân
        path: 'family',
        loadChildren: () => import('./family/family.module').then(m => m.FamilyModule)
      },
      {
        // HU_TERMINATE
        // Thông tin nghỉ việc
        path: 'terminate',
        loadChildren: () => import('./terminate/terminate.module').then(m => m.TerminateModule)
      },
      {
        path: "",
        redirectTo: "personnel-profile",
        pathMatch: "full"
      }
    ]
  },
  {
    path: "**",
    loadComponent: () => import("./router-distributor/router-distributor.component").then(m =>  m.RouterDistributorComponent)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PersonnelCenterRoutingModule { }
