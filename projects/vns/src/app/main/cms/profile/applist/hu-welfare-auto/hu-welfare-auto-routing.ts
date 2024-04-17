import { RouterModule, Routes } from '@angular/router';
import { HuWelfareAutoComponent } from './hu-welfare-auto.component';
import { NgModule } from '@angular/core';
import { HuWelfareAutoEditComponent } from './hu-welfare-auto-edit/hu-welfare-auto-edit.component';
import { CanDeactivateGuard } from 'ngx-histaff-alpha';

const routes: Routes = [
  {
    path: '',
    component: HuWelfareAutoComponent,
  },
  {
    path: ':id',
    component: HuWelfareAutoEditComponent,
    canDeactivate: [CanDeactivateGuard],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HuWelfareAutoRoutingModule {}
