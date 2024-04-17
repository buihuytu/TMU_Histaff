import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HuNationComponent } from "./hu-nation.component";
import { CanDeactivateGuard, CorePageListComponent, CorePageHeaderComponent, CorePageEditComponent, CoreStatusStickerComponent } from "ngx-histaff-alpha";
import { HuNationEditComponent } from "./hu-nation-edit/hu-nation-edit.component";
import { CommonModule } from "@angular/common";

const routes: Routes = [
  {
    path: "",
    component: HuNationComponent,
    children: [
      {
        path: ":id",
        component: HuNationEditComponent,
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
  declarations: [HuNationComponent,HuNationEditComponent],
  // providers: [CoreService],
})
export class HuNationModule { }
