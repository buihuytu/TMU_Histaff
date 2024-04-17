import { NgModule } from '@angular/core';

import { SysOtherlistComponent } from './sys-otherlist/sys-otherlist.component';
import { SysOtherlistEditComponent } from './sys-otherlist-edit/sys-otherlist-edit.component';
import { RouterModule, Routes } from '@angular/router';
import { CanDeactivateGuard, CorePageListComponent, CorePageEditComponent, CorePageHeaderComponent, CoreListComponent, CoreStatusStickerComponent } from 'ngx-histaff-alpha';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


const routes: Routes = [
  {
    path: '',
    component: SysOtherlistComponent,
    children: [
      {
        path: ":id",
        component: SysOtherlistEditComponent,
        outlet: "corePageListAux",
        canDeactivate: [CanDeactivateGuard]
      }
    ]
  }
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
    CoreStatusStickerComponent
  ],
  declarations: [SysOtherlistComponent, SysOtherlistEditComponent],
})
export class SysOtherlistModule { }
