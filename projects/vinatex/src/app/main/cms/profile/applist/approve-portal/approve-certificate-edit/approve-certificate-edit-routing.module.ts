import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { ApproveCertificateEditComponent } from './approve-certificate-edit.component';
import { ApproveCertificateEditDetailComponent } from './approve-certificate-edit-detail/approve-certificate-edit-detail.component';
import { CanDeactivateGuard } from 'ngx-histaff-alpha';


const routes: Routes = [
  {
    path: '',
    component: ApproveCertificateEditComponent,
    children: [
      {
        path: ":id",
        component: ApproveCertificateEditDetailComponent,
        outlet: "corePageListAux",
        canDeactivate: [CanDeactivateGuard]
      }
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})


export class ApproveCertificateEditRoutingModule {}
