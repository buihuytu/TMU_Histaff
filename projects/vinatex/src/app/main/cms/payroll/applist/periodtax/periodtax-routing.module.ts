import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PeriodTaxEditComponent } from './edit/periodtax-edit.component';
import { PeriodTaxComponent } from './periodtax.component';
import { CanDeactivateGuard } from 'ngx-histaff-alpha';

const routes: Routes = [
  {
    path: "",
    component: PeriodTaxComponent,
    children: [
      {
        path: ":id",
        component: PeriodTaxEditComponent,
        outlet: "corePageListAux",
        canDeactivate: [CanDeactivateGuard]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PeriodTaxRoutingModule { }