import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SalaryTypeComponent } from './salarytype.component';
import { CanDeactivateGuard, CorePageListComponent, CorePageHeaderComponent, CorePageEditComponent, CoreStatusStickerComponent } from 'ngx-histaff-alpha';
import { SalaryTypeEditComponent } from './edit/salarytype-edit.component';
import { CommonModule } from '@angular/common';
const routes: Routes = [
  {
    path: "",
    component: SalaryTypeComponent,
    children: [
      {
        path: ":id",
        component: SalaryTypeEditComponent,
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
    CorePageHeaderComponent,
    CorePageEditComponent,
    CoreStatusStickerComponent
  ],
  declarations: [SalaryTypeComponent, SalaryTypeEditComponent],
})
export class SalaryTypeModule { }
