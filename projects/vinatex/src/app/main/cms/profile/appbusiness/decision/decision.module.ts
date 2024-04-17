import { NgModule } from "@angular/core";
import { CorePageListComponent, CoreOrgTreeComponent, CorePageEditComponent, CorePageHeaderComponent, CoreButtonGroupVnsComponent, FullscreenModalLoaderComponent, CoreStatusStickerComponent, DecisionComponent, TranslatePipe } from "ngx-histaff-alpha";
import { DecisionImportComponent } from "./decision-import/decision-import.component";
import { DecisionRoutingModule } from "./decision-routing.module";
import { DecisionEditComponent } from "./edit/decision-edit.component";
import { CommonModule } from "@angular/common";
@NgModule({
  imports: [
    CommonModule,
    TranslatePipe,
    CorePageListComponent,
    CoreOrgTreeComponent,
    CorePageEditComponent,
    CorePageHeaderComponent,
    DecisionRoutingModule,
    CoreButtonGroupVnsComponent,
    FullscreenModalLoaderComponent,
    CoreStatusStickerComponent
  ],
  declarations: [DecisionEditComponent, DecisionImportComponent],
})
export class DecisionModule {}
