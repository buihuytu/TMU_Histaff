import { Routes } from '@angular/router';
import { TrCriteriaComponent } from './tr-criteria.component';
import { TrCriteriaEditComponent } from './edit/tr-criteria-edit.component';
import { CanDeactivateGuard } from 'ngx-histaff-alpha';

export const routes: Routes = [
  {
    path: "",
    component: TrCriteriaComponent,
    children: [
      {
        path: ":id",
        component: TrCriteriaEditComponent,
        outlet: "corePageListAux",
        canDeactivate: [CanDeactivateGuard]
      }
    ]
  },
];