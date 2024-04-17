import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InsRegionComponent } from './insregion.component';
import { InsRegionEditComponent } from './edit/insregion-edit.component';
import { CanDeactivateGuard } from 'ngx-histaff-alpha';


const routes: Routes = [
  {
    path: "",
    component: InsRegionComponent,
    children: [
      {
        path: ":id",
        component: InsRegionEditComponent,
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
export class InsRegionRoutingModule { }