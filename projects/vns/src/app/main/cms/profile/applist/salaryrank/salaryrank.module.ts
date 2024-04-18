import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { SalaryRankComponent } from "./salaryrank.component";
import { CanDeactivateGuard, CorePageListComponent, CorePageHeaderComponent, CorePageEditComponent, CoreStatusStickerComponent } from "ngx-histaff-alpha";
import { SalaryRankEditComponent } from "./edit/salaryrank-edit.component";
import { CommonModule } from "@angular/common";



const routes: Routes = [
  {
    path: "",
    component: SalaryRankComponent,
    children: [
      {
        path: ":id",
        component: SalaryRankEditComponent,
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
  declarations: [SalaryRankComponent, SalaryRankEditComponent],
})
export class SalaryRankModule { }
