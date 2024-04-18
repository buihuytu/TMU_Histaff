import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CanDeactivateGuard, CorePageListComponent, CorePageEditComponent, CoreOrgTreeComponent, CoreAccordionComponent, CoreCompositionComponent } from 'ngx-histaff-alpha';
import { RcExamsEditComponent } from './rc-exams-edit/rc-exams-edit.component';
import { RcExamsComponent } from './rc-exams.component';

const routes: Routes = [
  {
    path: '',
    component: RcExamsComponent,
    children: [
      {
        path: ':id',
        component: RcExamsEditComponent,
        outlet: 'corePageListAux',
        canDeactivate: [CanDeactivateGuard],
      }
    ],
  }
];

@NgModule({
  declarations: [
    RcExamsComponent,
    RcExamsEditComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    CorePageListComponent,
    CorePageEditComponent,
    CoreOrgTreeComponent,
    CoreAccordionComponent,
    CoreCompositionComponent,
    FormsModule
  ]
})

export class RcExamsModule {}