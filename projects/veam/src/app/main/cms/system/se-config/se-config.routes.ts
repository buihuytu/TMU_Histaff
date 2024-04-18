import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SeConfigComponent } from './se-config.component';
import { SeConfigEditComponent } from './edit/se-config-edit.component';
import { CanDeactivateGuard } from 'ngx-histaff-alpha';

export const routes: Routes = [
  {
    path: '',
    component: SeConfigComponent,
    children: [
      {
        path: ':id',
        component: SeConfigEditComponent,
        outlet: 'corePageListAux',
        canDeactivate: [CanDeactivateGuard],
      },
    ],
  },
];