import { OtherlistEditComponent } from './edit/otherlist-edit.component';

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CanDeactivateGuard, CorePageListComponent, CorePageEditComponent, CorePageHeaderComponent, CoreListComponent } from 'ngx-histaff-alpha';
import { OtherListComponent } from './otherlist.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

const routes: Routes = [
  {
    path: '',
    component: OtherListComponent,
    children: [
      {
        path: ':id',
        component: OtherlistEditComponent,
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
    FormsModule,
    CorePageListComponent,
    CorePageEditComponent,
    CorePageHeaderComponent,
    CoreListComponent,
  ],
  exports: [RouterModule],
  declarations: [OtherListComponent, OtherlistEditComponent],
})
export class OtherlistModule {}
