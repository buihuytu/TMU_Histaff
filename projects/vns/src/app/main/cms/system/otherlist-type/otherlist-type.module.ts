import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OtherlistTypeRoutingModule } from './otherlist-type-routing.module';
import { OtherlistTypeComponent } from './otherlist-type/otherlist-type.component';
import { Route, RouterModule, Routes } from '@angular/router';
import { CanDeactivateGuard, CorePageListComponent, CorePageEditComponent } from 'ngx-histaff-alpha';
import { OtherlistTypeEditComponent } from './otherlist-type-edit/otherlist-type-edit.component';

const routes: Routes = [
  {
    path: '',
    component: OtherlistTypeComponent,
    children: [
      {
        path: ':id',
        component: OtherlistTypeEditComponent,
        outlet: "corePageListAux",
        canDeactivate: [CanDeactivateGuard]
      },
    ]
  }
];
@NgModule({
  declarations: [
    OtherlistTypeComponent,
    OtherlistTypeEditComponent
  ],
  imports: [
    CommonModule,
    CorePageListComponent,
    CorePageEditComponent,
    RouterModule.forChild(routes),
  ]
})
export class OtherlistTypeModule { }
