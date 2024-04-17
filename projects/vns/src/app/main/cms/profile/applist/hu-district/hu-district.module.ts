import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HuDistrictComponent } from "./hu-district.component";
// import { CoreService } from "../../../../../services/core.service";
import { HuDistrictEditComponent } from "./hu-district-edit/hu-district-edit.component";
import { CanDeactivateGuard, CorePageEditComponent, CorePageHeaderComponent, CorePageListComponent, CoreStatusStickerComponent } from "ngx-histaff-alpha";
import { CommonModule } from "@angular/common";


const routes: Routes = [
  {
    path: "",
    component: HuDistrictComponent,
    children: [
      {
        path: ":id",
        component: HuDistrictEditComponent,
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
  declarations: [HuDistrictComponent,HuDistrictEditComponent],
  // providers: [CoreService],
})
export class HuDistrictModule { }
