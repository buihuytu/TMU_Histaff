import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TrAssessmentResultComponent } from './tr-assessment-result.component';
import { TrAssessmentResultEditComponent } from './tr-assessment-result-edit/tr-assessment-result-edit.component';
import { CanDeactivateGuard, CoreAccordionComponent, CoreCompositionComponent, CoreDropdownComponent, CoreOrgTreeComponent, CorePageEditComponent, CorePageHeaderComponent, CorePageListComponent, TranslatePipe } from 'ngx-histaff-alpha';
import { FormsModule } from '@angular/forms';


const routes: Routes = [
  {
    path: '',
    component: TrAssessmentResultComponent,
    children: [
      {
        path: ':id',
        component: TrAssessmentResultEditComponent,
        outlet: 'corePageListAux',
        canDeactivate: [CanDeactivateGuard],
      }
    ]
  }
];

@NgModule({
  declarations: [
    TrAssessmentResultComponent,
    TrAssessmentResultEditComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    TranslatePipe,
    CorePageListComponent,
    CorePageEditComponent,
    CoreOrgTreeComponent,
    CorePageHeaderComponent,
    CoreDropdownComponent,
    CoreAccordionComponent,
    CoreCompositionComponent,
    FormsModule
  ]
})

export class TrAssessmentResultModule {}