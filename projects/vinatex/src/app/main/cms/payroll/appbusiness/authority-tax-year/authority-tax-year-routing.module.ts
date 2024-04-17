import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthorityTaxYearComponent } from './authority-tax-year.component';
import { AuthorityTaxYearEditComponent } from './edit/authority-tax-year-edit.component';
import { CanDeactivateGuard } from 'ngx-histaff-alpha';

const routes: Routes = [
  {
    path: "",
    component: AuthorityTaxYearComponent,
    children: [
      {
        path: ":id",
        component: AuthorityTaxYearEditComponent,
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
export class AuthorityTaxYearRoutingModule { }