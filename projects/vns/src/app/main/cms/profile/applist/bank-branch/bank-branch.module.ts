import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BankBranchComponent } from './bank-branch.component';
import { BankBranchEditComponent } from './bank-branch-edit/bank-branch-edit.component';
import { CanDeactivateGuard, CorePageEditComponent, CorePageHeaderComponent, CorePageListComponent, CoreStatusStickerComponent } from 'ngx-histaff-alpha';
import { CommonModule } from '@angular/common';


const routes: Routes = [
  {
    path: '',
    component: BankBranchComponent,
    children: [
      {
        path: ":id",
        component: BankBranchEditComponent,
        outlet: "corePageListAux",
        canDeactivate: [CanDeactivateGuard]
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    CorePageListComponent,
    CorePageEditComponent,
    CorePageHeaderComponent,
    CoreStatusStickerComponent
  ],
  declarations: [BankBranchComponent, BankBranchEditComponent],
  // providers: [CoreService],
})
export class BankBranchModule {}
