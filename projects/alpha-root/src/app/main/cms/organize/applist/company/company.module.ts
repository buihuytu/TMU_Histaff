import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CanDeactivateGuard, CorePageListComponent, CorePageEditComponent, CoreStatusStickerComponent } from 'ngx-histaff-alpha';
import { CompanyEditComponent } from './company-edit/company-edit.component';
import { CompanyComponent } from './company.component';

const routes: Routes = [
  {
    path: '',
    component: CompanyComponent,
    children: [
      {
        path: ':id',
        component: CompanyEditComponent,
        outlet: 'corePageListAux',
        canDeactivate: [CanDeactivateGuard],
      },
    ],
  },
];

@NgModule({
  declarations: [CompanyComponent, CompanyEditComponent],
  imports: [RouterModule.forChild(routes), 
    CommonModule,
    CorePageListComponent, 
    CorePageEditComponent, 
    CoreStatusStickerComponent],
})
export class CompanyModule { }
