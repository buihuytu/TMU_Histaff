import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CanDeactivateGuard, CorePageListComponent, CoreListComponent, CorePageHeaderComponent, CoreOrgTreeComponent, CorePageEditComponent, AppService } from 'ngx-histaff-alpha';
import { SeAuthorizeApproveEditComponent } from './edit/se-authorize-approve-edit.component';
import { SeAuthorizeApproveComponent } from './se-authorize-approve.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


const routes: Routes = [
  {
    path: '',
    component: SeAuthorizeApproveComponent,
    children: [
      {
        path: ':id',
        component: SeAuthorizeApproveEditComponent,
        outlet: 'corePageListAux',
        canDeactivate: [CanDeactivateGuard],
      },
    ],
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    FormsModule,
    CorePageListComponent,
    CoreListComponent,
    CorePageHeaderComponent,
    CoreOrgTreeComponent,
    CorePageEditComponent,
  ],
  declarations: [SeAuthorizeApproveComponent, SeAuthorizeApproveEditComponent],
  providers: [AppService],
})
export class SeAuthorizeApproveModule {}
