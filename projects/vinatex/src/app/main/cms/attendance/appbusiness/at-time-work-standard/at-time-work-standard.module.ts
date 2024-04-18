import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AtTimeWorkStandardComponent } from './at-time-work-standard.component';
import { AtTimeWorkStandardEditComponent } from './at-time-work-standard-edit/at-time-work-standard-edit.component';
import { CanDeactivateGuard, CorePageListComponent, CorePageEditComponent, CoreOrgTreeComponent, CoreAccordionComponent, CoreCompositionComponent } from 'ngx-histaff-alpha';

const routes: Routes = [
  {
    path: '',
    component: AtTimeWorkStandardComponent,
    children: [
      {
        path: ':id',
        component: AtTimeWorkStandardEditComponent,
        outlet: 'corePageListAux',
        canDeactivate: [CanDeactivateGuard],
      }
    ]
  }
];

@NgModule({
  declarations: [
    AtTimeWorkStandardComponent,
    AtTimeWorkStandardEditComponent
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

export class AtTimeWorkStandardModule {}