import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { SalaryLevelComponent } from "./salarylevel.component";

import { CanDeactivateGuard, CorePageListComponent, CorePageHeaderComponent, CoreStatusStickerComponent, CorePageEditComponent } from "ngx-histaff-alpha";
import { SalaryLevelEditComponent } from "./edit/salarylevel-edit.component";
import { CommonModule } from "@angular/common";

const routes: Routes = [
  {
    path: "",
    component: SalaryLevelComponent,
    children: [
      {
        path: ":id",
        component: SalaryLevelEditComponent,
        outlet: "corePageListAux",
        canDeactivate: [CanDeactivateGuard]
      }
    ]
  },
  
];

@NgModule({
  imports: [
    RouterModule.forChild(routes), 
    CommonModule,
    CorePageListComponent,
    CorePageHeaderComponent,
    CoreStatusStickerComponent,
    CorePageEditComponent,],
  declarations: [SalaryLevelComponent, SalaryLevelEditComponent],
  
})
export class SalaryLevelModule {}
