import { RouterModule, Routes } from '@angular/router';
import { HuEvaluateComponent } from './hu-evaluate.component';
import { NgModule } from '@angular/core';
import { HuEvaluateEditComponent } from './hu-evaluate-edit/hu-evaluate-edit.component';
import { HuEvaluateImportComponent } from '../hu-evaluate-import/hu-evaluate-import.component';
import { HuEvaluateConcurrentImportComponent } from './hu-evaluate-concurrent-import/hu-evaluate-concurrent-import.component';
import { CanDeactivateGuard } from 'ngx-histaff-alpha';

const routes: Routes = [
  {
    path: '',
    component: HuEvaluateComponent,
    children: [
      {
        path: "hu-evaluate-import",
        outlet: "corePageListAux",
        component: HuEvaluateImportComponent
      },
      {
        path: "hu-evaluate-concurrent-import",
        outlet: "corePageListAux",
        component: HuEvaluateConcurrentImportComponent
      }
    ]
  },
  {
    path: ':id',
    component: HuEvaluateEditComponent,
    canDeactivate: [CanDeactivateGuard],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HuEvaluateRoutingModule {}
