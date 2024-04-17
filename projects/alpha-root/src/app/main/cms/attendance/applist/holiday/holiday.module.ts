import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { HolidayComponent } from "./holiday.component";
import { CanDeactivateGuard, CorePageListComponent, CorePageEditComponent, CoreStatusStickerComponent } from "ngx-histaff-alpha";
import { HolidayEditComponent } from "./edit/holiday-edit.component";
import { CommonModule } from "@angular/common";

const routes: Routes = [
  {
    path: "",
    component: HolidayComponent,
    children: [{
      path: ":id",
      component: HolidayEditComponent,
      outlet: "corePageListAux",
      canDeactivate: [CanDeactivateGuard]
    }]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes), 
    CommonModule,
    CorePageListComponent,
    CorePageEditComponent,
    CoreStatusStickerComponent
  ],
  declarations: [HolidayComponent,HolidayEditComponent],
  // providers: [CoreService],
})
export class HolidayModule {}
