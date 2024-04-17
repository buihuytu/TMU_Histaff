import { NgModule } from "@angular/core";
import { CorePageListComponent, CoreOrgTreeComponent, CorePageEditComponent, CorePageHeaderComponent, CoreButtonGroupVnsComponent, FullscreenModalLoaderComponent, CoreStatusStickerComponent, DecisionComponent, TranslatePipe, CoreApiProgressComponent } from "ngx-histaff-alpha";
import { DecisionImportComponent } from "./decision-import/decision-import.component";
import { DecisionRoutingModule } from "./decision-routing.module";
import { DecisionEditComponent } from "./edit/decision-edit.component";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { DecisionWrapperComponent } from "./decision-wrapper.component";
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TranslatePipe,
    CorePageListComponent,
    CoreOrgTreeComponent,
    CorePageEditComponent,
    CorePageHeaderComponent,
    DecisionRoutingModule,
    CoreButtonGroupVnsComponent,
    FullscreenModalLoaderComponent,
    CoreStatusStickerComponent,
    CoreApiProgressComponent
  ],
  declarations: [DecisionEditComponent,DecisionWrapperComponent, DecisionImportComponent],
})
export class DecisionModule {}
