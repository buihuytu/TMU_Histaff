import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CanDeactivateGuard, CorePageListComponent, CorePageEditComponent, CorePageHeaderComponent, CoreStatusStickerComponent } from 'ngx-histaff-alpha';
import { ListFundSourceEditComponent } from './edit/list-fund-source-edit.component';
import { ListFundSourceComponent } from './list-fund-source.component';
import { CommonModule } from '@angular/common';

const routes: Routes = [
  {
    path: '',
    component: ListFundSourceComponent,
    children: [
      {
        path: ':id',
        component: ListFundSourceEditComponent,
        outlet: 'corePageListAux',
        canDeactivate: [CanDeactivateGuard],
      },
    ],
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    CorePageListComponent,
    CorePageEditComponent,
    CorePageHeaderComponent,
    CoreStatusStickerComponent
  ],
  declarations: [ListFundSourceComponent, ListFundSourceEditComponent],
  // providers: [CoreService],
})
export class ListFundSourceModule {}
