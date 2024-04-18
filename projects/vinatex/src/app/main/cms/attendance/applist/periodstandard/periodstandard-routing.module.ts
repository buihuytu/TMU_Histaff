import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PeriodStandardComponent } from './periodstandard.component';
import { PeriodStandardEditComponent } from './edit/periodstandard-edit.component';
import { CanDeactivateGuard } from 'ngx-histaff-alpha';

const routes: Routes = [
  {
    path: "",
    component: PeriodStandardComponent,
    children: [
      {
        path: ":id",
        component: PeriodStandardEditComponent,
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
export class PeriodStandardRoutingModule { }