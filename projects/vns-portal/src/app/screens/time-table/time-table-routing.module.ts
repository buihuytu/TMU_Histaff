import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExplainWorkComponent } from '../register-off/explain-work/explain-work.component';

const routes: Routes = [
  {
    path: '',
    component: ExplainWorkComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TimeTableRoutingModule {}
