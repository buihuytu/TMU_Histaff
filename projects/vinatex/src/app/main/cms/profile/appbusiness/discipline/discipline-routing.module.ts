import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DisciplineComponent } from './discipline/discipline.component';
import { DisciplineEditComponent } from './discipline-edit/discipline-edit.component';
import { CanDeactivateGuard } from 'ngx-histaff-alpha';

const routes: Routes = [
  {
    path: "",
    component: DisciplineComponent
  },
  {
    path: ":id",
    component: DisciplineEditComponent,
    canDeactivate: [CanDeactivateGuard]
  }
]; 
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DisciplineRoutingModule { }
