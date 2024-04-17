import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MutationLogComponent, MutationViewComponent } from 'ngx-histaff-alpha';

const routes: Routes = [
  {
    path: "",
    component: MutationLogComponent,
    children: [
      {
        path: ":id",
        component: MutationViewComponent,
        outlet: 'corePageListAux'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MutationLogRoutingModule { }
