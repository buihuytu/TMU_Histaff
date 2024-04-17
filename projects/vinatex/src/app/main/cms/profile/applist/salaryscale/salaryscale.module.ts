
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { SalaryScaleComponent } from "./salaryscale.component";
import { CanDeactivateGuard, CorePageListComponent, CorePageEditComponent, CorePageHeaderComponent, CoreCheckboxComponent, CoreStatusStickerComponent } from "ngx-histaff-alpha";
import { SalaryScaleEditComponent } from "./edit/salaryscale-edit.component";
import { CommonModule } from "@angular/common";

const routes: Routes = [
  {
    path: "",
    component: SalaryScaleComponent,
    children: [
      {
        path: ":id",
        component: SalaryScaleEditComponent,
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
  exports: [RouterModule],
  declarations: [SalaryScaleComponent, SalaryScaleEditComponent],
})
export class SalaryScaleModule {}




