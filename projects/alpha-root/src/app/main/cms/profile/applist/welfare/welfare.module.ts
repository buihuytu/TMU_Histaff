import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CanDeactivateGuard, CorePageListComponent, CorePageEditComponent, CorePageHeaderComponent, CoreCheckboxComponent, CoreStatusStickerComponent } from "ngx-histaff-alpha";
import { WelfareEditComponent } from "./edit/welfare-edit.component";
import { WelfareComponent } from "./welfare.component";
import { CommonModule } from "@angular/common";

const routes: Routes = [
  {
    path: "",
    component: WelfareComponent,
    children: [
      {
        path: ":id",
        component: WelfareEditComponent,
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
  declarations: [WelfareComponent, WelfareEditComponent],
  // providers: [CoreService],

})
export class WelfareModule {}
