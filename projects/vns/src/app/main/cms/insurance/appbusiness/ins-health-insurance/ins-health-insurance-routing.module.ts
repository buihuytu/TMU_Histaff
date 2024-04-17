import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InsHealthInsuranceComponent } from './ins-health-insurance.component';
import { InsHealthInsuranceEditComponent } from './edit/ins-health-insurance-edit.component';
import { CanDeactivateGuard } from 'ngx-histaff-alpha';

const routes: Routes = [
  {
    path: "",
    component: InsHealthInsuranceComponent,
  },
  {
    path: ":id",
    component: InsHealthInsuranceEditComponent,
    canDeactivate: [CanDeactivateGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InsHealthInsuranceRoutingModule { }