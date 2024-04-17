import { RouterModule, Routes } from '@angular/router';
import { HucommendComponent } from './hucommend.component';
import { NgModule } from '@angular/core';
import { HucommendEditComponent } from './hucommend-edit/hucommend-edit.component';
import { HucommendImportComponent } from './hucommend-import/hucommend-import.component';
import { CanDeactivateGuard } from 'ngx-histaff-alpha';

const routes: Routes = [
  {
    path: '',
    component: HucommendComponent,
    children: [
      {
        path: "commend-import",
        outlet: "corePageListAux",
        component: HucommendImportComponent
      },
    ]
  },
  {
    path: ':id',
    component: HucommendEditComponent,
    canDeactivate: [CanDeactivateGuard],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HuCommendRoutingModule {}
