import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OtherlistTypeComponent } from './otherlist-type/otherlist-type.component';
import { OtherlistTypeEditComponent } from './otherlist-type-edit/otherlist-type-edit.component';
import { CanDeactivateGuard } from 'ngx-histaff-alpha';

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
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OtherlistTypeRoutingModule { }
