import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InsListProgramComponent } from './ins-list-program.component';
import { InsListProgramEditComponent } from './edit/ins-list-program-edit.component';
import { CanDeactivateGuard } from 'ngx-histaff-alpha';

const routes: Routes = [
  {
    path: "",
    component: InsListProgramComponent,
    children: [
      {
        path: ":id",
        component: InsListProgramEditComponent,
        outlet: "corePageListAux",
        canDeactivate: [CanDeactivateGuard]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InsListProgramRoutingModule { }