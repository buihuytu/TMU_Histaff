import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CanDeactivateGuard, MenuComponent, MenuEditComponent } from 'ngx-histaff-alpha';

const routes: Routes = [
  {
    path: '',
    component: MenuComponent,
    children: [
      {
        path: ":id",
        component: MenuEditComponent,
        outlet: "menuAux",
        canDeactivate: [CanDeactivateGuard]
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MenuRoutingModule { }
