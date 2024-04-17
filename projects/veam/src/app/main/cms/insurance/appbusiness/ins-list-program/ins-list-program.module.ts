import { NgModule } from "@angular/core";
import { InsListProgramRoutingModule } from "./ins-list-program-routing.module";
import { InsListProgramEditComponent } from "./edit/ins-list-program-edit.component";
import { CommonModule } from "@angular/common";
import { CorePageListComponent, CorePageEditComponent, CorePageHeaderComponent, CoreCompositionComponent, CoreStatusStickerComponent } from "ngx-histaff-alpha";
import { InsListProgramComponent } from "./ins-list-program.component";


@NgModule({
  imports: [
    CorePageListComponent,
    CommonModule,
    CorePageEditComponent,
    InsListProgramRoutingModule,
    CorePageHeaderComponent,
    CoreCompositionComponent,
    CoreStatusStickerComponent
  ],
  declarations: [InsListProgramComponent, InsListProgramEditComponent],
  //providers: [CoreService],
})
export class InsListProgramModule {}
