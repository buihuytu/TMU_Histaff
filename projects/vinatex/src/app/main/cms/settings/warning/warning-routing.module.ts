import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WarningEditComponent } from './warning-edit/warning-edit.component';
import { CanDeactivateGuard } from 'ngx-histaff-alpha';

const routes: Routes = [
  {
    path: "",
    component: WarningEditComponent,
    canDeactivate: [CanDeactivateGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WarningRoutingModule { }
