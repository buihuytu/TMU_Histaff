import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterOffComponent } from './register-off/register-off.component';
import { RegisterOffEditComponent } from './register-off-edit/register-off-edit.component';
import { RegisterOvertimeComponent } from './register-overtime/register-overtime.component';
import { ExplainWorkComponent } from './explain-work/explain-work.component';
import { RegisterHistoryComponent } from './register-history/register-history.component';
import { RegisterHistoryEditComponent } from './register-history/register-history-edit/register-history-edit.component';

const routes: Routes = [
  {
  path: '',
  component: RegisterOffComponent
  },
  {
    path: 'register-off-edit',
    component: RegisterOffEditComponent
  },
  {
    path: 'register-over-time',
    component: RegisterOvertimeComponent
  },
  {
    path: 'explain-work',
    component: ExplainWorkComponent
  },
  {
    path: 'register-history',
    component: RegisterHistoryComponent
  },
  {
    path: 'register-history-edit',
    component: RegisterHistoryEditComponent
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RegisterOffRoutingModule { }
