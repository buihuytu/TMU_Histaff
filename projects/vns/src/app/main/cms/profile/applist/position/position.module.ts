import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { CorePageListComponent, CoreOrgTreeComponent, CorePageEditComponent, CorePageHeaderComponent, CoreCheckboxComponent, CoreStatusStickerComponent, PositionComponent } from "ngx-histaff-alpha";
import { PositionEditComponent } from "./edit/position-edit.component";
import { PositionRoutingModule } from "./position-routing.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    CorePageListComponent,
    CoreOrgTreeComponent,
    CorePageEditComponent,
    CorePageHeaderComponent,
    CoreCheckboxComponent,
    PositionRoutingModule,
    CoreStatusStickerComponent
  ],
  declarations: [PositionEditComponent],
})
export class PositionModule { }
