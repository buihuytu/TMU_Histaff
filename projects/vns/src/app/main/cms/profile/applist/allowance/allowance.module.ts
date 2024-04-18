import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { AllowanceComponent } from "./allowance.component";
import { AllowanceEditComponent } from "./edit/allowance-edit.component";
import { CanDeactivateGuard, CoreCheckboxComponent, CorePageEditComponent, CorePageListComponent, CoreStatusStickerComponent } from "ngx-histaff-alpha";
import { CommonModule } from "@angular/common";

const routes: Routes = [
  {
    path: "",
    component: AllowanceComponent,
    children: [
      {
        path: ":id",
        component: AllowanceEditComponent,
        outlet: "corePageListAux",
        canDeactivate: [CanDeactivateGuard]
      }
    ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes), 
    CommonModule,
    CorePageListComponent,
    CoreCheckboxComponent,
    CoreStatusStickerComponent,
    CorePageEditComponent],
  declarations: [AllowanceComponent, AllowanceEditComponent],
  // providers: [CoreService],
})
export class AllowanceModule {}
