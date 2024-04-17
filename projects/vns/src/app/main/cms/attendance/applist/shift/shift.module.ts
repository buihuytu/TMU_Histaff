import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ShiftComponent } from './shift.component';
import { CanDeactivateGuard, CorePageListComponent, CorePageEditComponent, CorePageHeaderComponent, CoreCheckboxComponent, CoreStatusStickerComponent } from 'ngx-histaff-alpha';
import { ShiftEditComponent } from './edit/shift-edit.component';
import { CommonModule } from '@angular/common';

const routes: Routes = [
  {
    path: '',
    component: ShiftComponent,
    children: [
      {
        path: ':id',
        component: ShiftEditComponent,
        outlet: 'corePageListAux',
        canDeactivate: [CanDeactivateGuard],
      },
    ],
  },
  // {
  //   path: ':id',
  //   component: ShiftEditComponent,
  //   canDeactivate: [CanDeactivateGuard],
  // },
];
@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    CorePageListComponent,
    CorePageEditComponent,
    CorePageHeaderComponent,
    CoreCheckboxComponent,
    CoreStatusStickerComponent
  ],
  exports: [RouterModule],
  declarations: [ShiftComponent, ShiftEditComponent],
  // providers: [CoreService],
})
export class ShiftModule {}
