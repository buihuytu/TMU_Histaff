import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TimeExplainationEditComponent } from './time-explaination-edit/time-explaination-edit.component';
import { CanDeactivateGuard, CorePageListComponent, CorePageHeaderComponent, CoreDropdownComponent, CoreOrgTreeComponent, CorePageEditComponent, CoreHeaderParamsComponent } from 'ngx-histaff-alpha';
import { TimeExplanationComponent } from './time-explanation.component';
import { FormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: '',
    component: TimeExplanationComponent,
  },
  {
    path: ":id",
    component: TimeExplainationEditComponent,
    canDeactivate: [CanDeactivateGuard]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    FormsModule,
    CorePageListComponent,
    CorePageHeaderComponent,
    CoreDropdownComponent,
    CoreOrgTreeComponent,
    CoreHeaderParamsComponent,
    CorePageEditComponent
  ],
  declarations: [TimeExplanationComponent, TimeExplainationEditComponent],
  // providers: [CoreService],
})
export class TimeExplanationModule {}
