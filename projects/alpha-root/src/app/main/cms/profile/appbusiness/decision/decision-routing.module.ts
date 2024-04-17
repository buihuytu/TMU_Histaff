import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DecisionEditComponent } from './edit/decision-edit.component';
import { DecisionImportComponent } from './decision-import/decision-import.component';
import { CanDeactivateGuard } from 'ngx-histaff-alpha';
import { DecisionWrapperComponent } from './decision-wrapper.component';

const routes: Routes = [
  {
    path: "",
    component: DecisionWrapperComponent,
    children: [
      {
        path: "decision-import",
        outlet: "corePageListAux",
        component: DecisionImportComponent,
      },
    ]
  },
  
  {
    path: ":id",
    component: DecisionEditComponent,
    canDeactivate: [CanDeactivateGuard]
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DecisionRoutingModule { }