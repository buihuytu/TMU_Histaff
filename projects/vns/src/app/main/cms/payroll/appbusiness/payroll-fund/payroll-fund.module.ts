import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CanDeactivateGuard, CorePageListComponent, CoreListComponent, CorePageHeaderComponent, CoreOrgTreeComponent, CorePageEditComponent } from 'ngx-histaff-alpha';
import { PayrollFundEditComponent } from './payroll-fund-edit/payroll-fund-edit.component';
import { PayrollFundComponent } from './payroll-fund.component';
import { CommonModule } from '@angular/common';


const routes: Routes = [
  {
    path: '',
    component: PayrollFundComponent,
    children: [
      {
        path: ':id',
        component: PayrollFundEditComponent,
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
    CorePageListComponent,
    CoreListComponent,
    CorePageHeaderComponent,
    CoreOrgTreeComponent,
    CorePageEditComponent,
  ],
  declarations: [PayrollFundComponent, PayrollFundEditComponent],
  // providers: [CoreService],
})
export class PayrollFundModule {}
