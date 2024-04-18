import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SymbolComponent } from './symbol.component';
import { CanDeactivateGuard, CorePageEditComponent, CorePageListComponent, CoreCheckboxComponent, CoreStatusStickerComponent } from 'ngx-histaff-alpha';
import { SymbolEditComponent } from './edit/symbol-edit.component';
import { CommonModule } from '@angular/common';

const routes: Routes = [
  {
    path: '',
    component: SymbolComponent,
    children: [
      {
        path: ':id',
        component: SymbolEditComponent,
        outlet: 'corePageListAux',
        canDeactivate: [CanDeactivateGuard],
      },
    ],
  },
  // {
  //   path: ':id',
  //   component: SymbolEditComponent,
  //   canDeactivate: [CanDeactivateGuard],
  // },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    CorePageEditComponent,
    CorePageListComponent,
    CoreCheckboxComponent,
    CoreStatusStickerComponent
  ],
  declarations: [SymbolComponent, SymbolEditComponent],
  // providers: [CoreService],
})
export class SymbolModule {}
