import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CanDeactivateGuard, CorePageListComponent, CorePageEditComponent, CorePageHeaderComponent, CoreStatusStickerComponent } from 'ngx-histaff-alpha';
import { InsRegimesEditComponent } from './edit/ins-regimes-edit.component';
import { InsRegimesComponent } from './ins-regimes.component';
import { CommonModule } from '@angular/common';

const routes: Routes = [
  {
    path: '',
    component: InsRegimesComponent,
    children: [
      {
        path: ':id',
        component: InsRegimesEditComponent,
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
  declarations: [InsRegimesComponent, InsRegimesEditComponent],
  // providers: [CoreService],
})
export class InsRegimesModule {}
