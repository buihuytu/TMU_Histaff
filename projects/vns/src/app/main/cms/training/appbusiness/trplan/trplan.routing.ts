import { RouterModule, Routes } from '@angular/router';
import { TrplanComponent } from './trplan.component';
import { NgModule } from '@angular/core';
import { TrplanEditComponent } from './trplan-edit/trplan-edit.component';
import { CanDeactivateGuard } from 'ngx-histaff-alpha';

const routes: Routes = [
  {
    path: '',
    component: TrplanComponent,
    children: [
      {
        path: ':id',
        component: TrplanEditComponent,
        outlet: 'corePageListAux',
        canDeactivate: [CanDeactivateGuard],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TrPlanRoutingModule {}
