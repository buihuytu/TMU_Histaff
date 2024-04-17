import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CanDeactivateGuard, CorePageListComponent, CorePageEditComponent, CoreStatusStickerComponent } from 'ngx-histaff-alpha';
import { ListSalaryEditComponent } from './listsalary-edit/listsalary-edit.component';
import { ListSalaryComponent } from './listsalary.component';

const routes: Routes = [
  {
    path: '',
    component: ListSalaryComponent,
    children: [
      {
        path: ':id',
        component: ListSalaryEditComponent,
        outlet: 'corePageListAux',
        canDeactivate: [CanDeactivateGuard],
      },
    ],
  },
];

@NgModule({
  declarations: [ListSalaryComponent, ListSalaryEditComponent],
  imports: [RouterModule.forChild(routes),
    CommonModule,
    CorePageListComponent,
    CorePageEditComponent,
    CoreStatusStickerComponent],
})
export class ListSalaryModule { }
