import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CorePageHeaderComponent, CoreDropdownComponent, CoreAccordionComponent, CoreCompositionComponent, TranslatePipe } from 'ngx-histaff-alpha';
import { PeEmployeeAssessmentComponent } from './pe-employee-assessment.component';
import { ScreenLeftModule } from './screen-left/screen-left.module';
import { ScreenRightModule } from './screen-right/screen-right.module';
const routes: Routes = [
  {
    path: '',
    component: PeEmployeeAssessmentComponent
  }
];

@NgModule({
  declarations: [
    PeEmployeeAssessmentComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    TranslatePipe,
    CorePageHeaderComponent,
    CoreDropdownComponent,
    CoreAccordionComponent,
    CoreCompositionComponent,
    FormsModule,
    ScreenLeftModule,
    ScreenRightModule
  ]
})

export class PeEmployeeAssessmentModule {}