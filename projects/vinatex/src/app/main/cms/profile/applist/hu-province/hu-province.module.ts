import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CanDeactivateGuard, CorePageListComponent, CorePageHeaderComponent, CorePageEditComponent, CoreStatusStickerComponent } from "ngx-histaff-alpha";
import { HuProvinceEditComponent } from "./hu-province-edit/hu-province-edit.component";
import { HuProvinceComponent } from "./hu-province.component";
import { CommonModule } from "@angular/common";

const routes: Routes = [
  {
    path: "",
    component: HuProvinceComponent,
    children: [
      {
        path: ":id",
        component: HuProvinceEditComponent,
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
  declarations: [HuProvinceComponent, HuProvinceEditComponent],
  // providers: [CoreService],
})
export class HuProvinceModule { }
