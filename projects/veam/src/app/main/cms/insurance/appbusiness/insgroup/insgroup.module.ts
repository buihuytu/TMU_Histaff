import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CanDeactivateGuard, CorePageListComponent, CorePageEditComponent, CorePageHeaderComponent, CoreStatusStickerComponent, TranslatePipe } from 'ngx-histaff-alpha';
import { InsGroupEditComponent } from './edit/insgroup-edit.component';
import { InsGroupComponent } from './insgroup.component';
import { CommonModule } from '@angular/common';

const routes: Routes = [
  {
    path: '',
    component: InsGroupComponent,
    children: [
      {
        path: ':id',
        component: InsGroupEditComponent,
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
  declarations: [InsGroupComponent, InsGroupEditComponent],
})
export class InsGroupModule {}
