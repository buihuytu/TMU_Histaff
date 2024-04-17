import { NgModule } from "@angular/core";

import { GroupPositionComponent } from "./groupposition.component";
import { GroupPositionEditComponent } from "./edit/groupposition-edit.component";
import { GroupPositionRoutingModule } from './groupposition-routing.module';
import { CorePageListComponent, CorePageEditComponent, CorePageHeaderComponent } from "ngx-histaff-alpha";
import { CommonModule } from "@angular/common";

@NgModule({
  imports: [
    CommonModule,
    CorePageListComponent,
    CorePageEditComponent,
    GroupPositionRoutingModule,
    CorePageHeaderComponent,
  ],
  declarations: [GroupPositionComponent, GroupPositionEditComponent],
})
export class GroupPositionModule { }
