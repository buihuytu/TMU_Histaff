import { TrClassificationComponent } from './tr-classification.component';
import { TrClassificationEditComponent } from './edit/tr-classification-edit.component';
import { CanDeactivateGuard } from 'ngx-histaff-alpha';
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: "",
    component: TrClassificationComponent,
    children: [
      {
        path: ":id",
        component: TrClassificationEditComponent,
        outlet: "corePageListAux",
        canDeactivate: [CanDeactivateGuard]
      }
    ]
  },
];