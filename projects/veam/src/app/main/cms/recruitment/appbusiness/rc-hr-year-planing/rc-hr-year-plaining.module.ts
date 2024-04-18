import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { RcHrPlaningDetailEditComponent } from './rc-hr-plaining-detail/rc-hr-planing-detail-edit/rc-hr-planing-detail-edit.component';
import { FormsModule } from '@angular/forms';
import { CanDeactivateGuard, CorePageListComponent, CorePageEditComponent, CorePageHeaderComponent, CoreOrgTreeComponent, CoreCompositionComponent, CoreDropdownComponent, TranslatePipe } from 'ngx-histaff-alpha';
import { RcHrPlainingDetailComponent } from './rc-hr-plaining-detail/rc-hr-plaining-detail.component';
import { RcHrYearPlaningEditComponent } from './rc-hr-year-planing-edit/rc-hr-year-planing-edit.component';
import { RcHrYearPlaningComponent } from './rc-hr-year-planing.component';

const routes: Routes = [
  {
    path: '',
    component: RcHrYearPlaningComponent,
    children: [
      {
        path: ':id',
        component: RcHrYearPlaningEditComponent,
        outlet: 'corePageListAux',
        canDeactivate: [CanDeactivateGuard],
      },
    ]
  },
  {
    path: ':id',
    component: RcHrPlainingDetailComponent,
    canDeactivate: [CanDeactivateGuard],
    children: [
      {
        path: ':id',
        component: RcHrPlaningDetailEditComponent,
        outlet: 'corePageListAux',
        canDeactivate: [CanDeactivateGuard],
      },
    ]
  }
];

@NgModule({
  declarations: [
    RcHrYearPlaningComponent,
    RcHrPlainingDetailComponent,
    RcHrYearPlaningEditComponent,
    RcHrPlaningDetailEditComponent],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    TranslatePipe,
    CorePageListComponent,
    CorePageEditComponent,
    CorePageHeaderComponent,
    CoreOrgTreeComponent,
    CoreCompositionComponent,
    FormsModule,
    CoreDropdownComponent,
  ],
  providers: []
})
export class RcHrYearPlainingModule { }
