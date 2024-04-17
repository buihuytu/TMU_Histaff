import { RouterModule, Routes } from "@angular/router";
import { OtherListComponent } from "../../profile/applist/otherlist/otherlist.component";
import { OrtherListEditComponent } from "./edit/ortherlist-edit.component";
import { NgModule } from "@angular/core";
import { CanDeactivateGuard, CorePageListComponent, CorePageEditComponent, CorePageHeaderComponent } from "ngx-histaff-alpha";


const routes: Routes = [
    {
      path: '',
      component: OtherListComponent,
      children: [
        {
          path: ":id",
          component: OrtherListEditComponent,
          outlet: "corePageListAux",
          canDeactivate: [CanDeactivateGuard]
        }
      ]
    }
  ];

  @NgModule({
    imports: [
      RouterModule.forChild(routes),
      CorePageListComponent,
      CorePageEditComponent,
      CorePageHeaderComponent
    ],
    declarations: [],
  })
  export class OrtherListModule {}
