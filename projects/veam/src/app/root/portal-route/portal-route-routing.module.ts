import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PortalRouteComponent, PortalRouteEditComponent, CanDeactivateGuard } from 'ngx-histaff-alpha';

const routes: Routes = [
  {
    path: "",
    component: PortalRouteComponent,
    children: [
      {
        path: ":id",
        outlet: 'corePageListAux',
        component: PortalRouteEditComponent,
        canDeactivate: [CanDeactivateGuard]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PortalRouteRoutingModule { }
