import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CanDeactivateGuard, CorePageListComponent, CorePageHeaderComponent, CorePageEditComponent, CoreStatusStickerComponent } from "ngx-histaff-alpha";
import { HuWardEditComponent } from "./hu-ward-edit/hu-ward-edit.component";
import { HuWardComponent } from "./hu-ward.component";
import { CommonModule } from "@angular/common";

const routes: Routes = [
  {
    path: "",
    component: HuWardComponent,
    children: [
      {
        path: ":id",
        component: HuWardEditComponent,
        outlet: "corePageListAux",
        canDeactivate: [CanDeactivateGuard]
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    CorePageListComponent,
    CorePageHeaderComponent,
    CorePageEditComponent,
    CoreStatusStickerComponent
  ],
  declarations: [HuWardComponent, HuWardEditComponent],
})
export class HuWardModule { }
