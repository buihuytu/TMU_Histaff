import { Routes } from '@angular/router';
import { OrgHoangComponent } from './org-hoang.component';
import { OrgHoangEditComponent } from './org-hoang-edit/org-hoang-edit.component';
import { CanDeactivateGuard } from 'ngx-histaff-alpha';

export const routes: Routes = [
  {
    path: "",
    component: OrgHoangComponent,
    children: [
      {
        path: ':id',
        component: OrgHoangEditComponent,
        outlet: 'corePageListAux',
        canDeactivate: [CanDeactivateGuard]
      }
    ]
  }
];