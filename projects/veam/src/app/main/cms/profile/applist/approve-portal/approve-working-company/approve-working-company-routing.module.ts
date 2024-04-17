import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ApproveWorkingCompanyComponent } from './approve-working-company.component';


const routes: Routes = [
  {
    path: '',
    component: ApproveWorkingCompanyComponent,

    // tạm thời cmt dòng code cho con lại
    // children: [
    //   {
    //     path: ":id",
    //     component: ApproveCertificateEditDetailComponent,
    //     outlet: "corePageListAux",
    //     canDeactivate: [CanDeactivateGuard]
    //   }
    // ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})


export class ApproveWorkingCompanyRoutingModule { }
