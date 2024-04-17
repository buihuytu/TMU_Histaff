import { Routes } from '@angular/router';
import { TrRequestYearComponent } from './tr-request-year.component';
import { TrRequestYearEditComponent } from './tr-request-year-edit/tr-request-year-edit.component';
import { CanDeactivateGuard } from 'ngx-histaff-alpha';

export const routes: Routes = [
  {
    path: "",
    component: TrRequestYearComponent,
    children: [
      {
        path: ':id',
        component: TrRequestYearEditComponent,
        outlet: 'corePageListAux',
        canDeactivate: [CanDeactivateGuard]
      }
    ]
  }
];