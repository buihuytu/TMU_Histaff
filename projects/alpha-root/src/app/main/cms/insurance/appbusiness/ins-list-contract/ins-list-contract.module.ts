import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InsListContractComponent } from './ins-list-contract.component';
import { InsListContractEditComponent } from './ins-list-contract-edit/ins-list-contract-edit.component';
import { CanDeactivateGuard, CorePageEditComponent, CorePageHeaderComponent, CorePageListComponent, CoreStatusStickerComponent } from 'ngx-histaff-alpha';

const routes: Routes = [
  {
    path: '',
    component: InsListContractComponent,
    children: [
      {
        path: ':id',
        component: InsListContractEditComponent,
        outlet: 'corePageListAux',
        canDeactivate: [CanDeactivateGuard],
      },
    ],
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CorePageListComponent,
    CorePageEditComponent,
    CorePageHeaderComponent,
    CoreStatusStickerComponent
  ],
  declarations: [InsListContractComponent, InsListContractEditComponent],
})
export class InsListContractModule {}
