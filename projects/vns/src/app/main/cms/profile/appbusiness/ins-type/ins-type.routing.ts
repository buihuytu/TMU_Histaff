import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InsTypeComponent } from './ins-type.component';
import { InsTypeEditComponent } from './ins-type-edit/ins-type-edit.component';
import { CanDeactivateGuard } from 'ngx-histaff-alpha';

const routes: Routes = [
  {
    path: '',
    component: InsTypeComponent,
    children: [
      {
        path: ':id',
        component: InsTypeEditComponent,
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
export class InsTypeRoutingModule {}
