import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { ContractTypeComponent } from "./contracttype.component";
// import { CoreService } from "../../../../../services/core.service";
import { ContractTypeEditComponent } from "./edit/contracttype-edit.component";
import { CanDeactivateGuard, CoreCheckboxComponent, CorePageEditComponent, CorePageHeaderComponent, CorePageListComponent, CoreStatusStickerComponent } from "ngx-histaff-alpha";
import { CommonModule } from "@angular/common";



const routes: Routes = [
  {
    path: "",
    component: ContractTypeComponent,
    children: [
      {
        path: ":id",
        component: ContractTypeEditComponent,
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
    CorePageEditComponent,
    CorePageHeaderComponent,
    CoreCheckboxComponent,
    CoreStatusStickerComponent
  ],
  declarations: [ContractTypeComponent, ContractTypeEditComponent],
  // providers: [CoreService],
})
export class ContractTypeModule {}
