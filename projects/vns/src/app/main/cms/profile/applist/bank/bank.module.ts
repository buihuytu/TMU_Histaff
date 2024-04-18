import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { CanDeactivateGuard, CorePageListComponent, CorePageHeaderComponent, CoreStatusStickerComponent, CorePageEditComponent } from "ngx-histaff-alpha";
import { BankEditComponent } from "./bank-edit/bank-edit.component";
import { BankComponent } from "./bank.component";
import { CommonModule } from "@angular/common";

const routes: Routes = [
  {
    path: "",
    component: BankComponent,
    children: [
      {
        path: ":id",
        component: BankEditComponent,
        outlet: "corePageListAux",
        canDeactivate: [CanDeactivateGuard]
      }
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes),
    CommonModule,
    CorePageListComponent,
    CorePageHeaderComponent,
    CoreStatusStickerComponent,
    CorePageEditComponent,],
  declarations: [BankComponent, BankEditComponent],
  // providers: [CoreService],
})
export class BankModule {}
