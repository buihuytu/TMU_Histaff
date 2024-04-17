import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { ShiftSortComponent } from "./shiftsort.component";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { CoreTableComponent, CorePageListComponent, CorePageEditComponent, CorePageHeaderComponent, CoreCompositionComponent, CoreOrgTreeComponent, CoreDropdownComponent, CoreFormComponent, CoreButtonGroupVnsComponent, CorePaginationFullComponent, FullscreenModalLoaderComponent, TranslatePipe } from "ngx-histaff-alpha";
import { ShiftSortDeleteComponent } from "./delete/shiftsort-delete.component";
import { ShiftSortEditComponent } from "./edit/shiftsort-edit.component";
import { ShiftSortRoutingModule } from "./shiftsort-routing.module";


@NgModule({
  imports: [
    CommonModule,
    TranslatePipe,
    CoreTableComponent,
    CorePageListComponent,
    CorePageEditComponent,
    ShiftSortRoutingModule,
    CorePageHeaderComponent,
    CoreCompositionComponent,
    CoreOrgTreeComponent,
    CoreDropdownComponent,
    CoreFormComponent,
    FormsModule,
    CoreButtonGroupVnsComponent,
    CorePaginationFullComponent,
    FullscreenModalLoaderComponent
  ],
  declarations: [ShiftSortComponent, ShiftSortEditComponent, ShiftSortDeleteComponent],
})
export class ShiftSortModule {}
