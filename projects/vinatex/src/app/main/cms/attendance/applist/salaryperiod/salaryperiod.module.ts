import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CanDeactivateGuard, CoreOrgTreeComponent, CorePageListComponent, CorePageEditComponent, CoreStatusStickerComponent } from 'ngx-histaff-alpha';
import { SalaryPeriodEditComponent } from './edit/salaryperiod-edit.component';
import { SalaryPeriodComponent } from './salaryperiod.component';
import { FormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: '',
    component: SalaryPeriodComponent,
  },
  {
    path: ':id',
    component: SalaryPeriodEditComponent,
    canDeactivate: [CanDeactivateGuard],
  },
];
@NgModule({
  imports: [
    RouterModule.forChild(routes),
    FormsModule,
    CoreOrgTreeComponent,
    CorePageListComponent,
    CommonModule,
    CorePageEditComponent,
    CoreStatusStickerComponent
  ],
  exports: [RouterModule],
  declarations: [SalaryPeriodComponent, SalaryPeriodEditComponent],
})
export class SalaryPeriodModule {}
