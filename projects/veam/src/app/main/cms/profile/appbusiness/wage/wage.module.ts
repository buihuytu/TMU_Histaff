import { NgModule } from "@angular/core";
import { WageEditComponent } from "./edit/wage-edit.component";
import { WageRoutingModule } from "./wage-routing.module";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HuWorkingHslPcImportComponent } from "./hu-working-hsl-pc-import/hu-working-hsl-pc-import.component";
import { CoreAccordionComponent, CoreButtonGroupVnsComponent, CoreCheckboxComponent, CoreControlComponent, CoreHeaderParamsComponent, CoreOrgTreeComponent, CorePageEditComponent, CorePageHeaderComponent, CorePageListComponent, CoreStatusStickerComponent, EvaluateDialogComponent, FullscreenModalLoaderComponent, TranslatePipe } from "ngx-histaff-alpha";


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TranslatePipe,
    CorePageEditComponent,
    CorePageListComponent,
    WageRoutingModule,
    CoreOrgTreeComponent,
    CoreHeaderParamsComponent,
    CoreStatusStickerComponent,
    CoreButtonGroupVnsComponent,
    CoreAccordionComponent,
    ReactiveFormsModule,
    CoreControlComponent,
    CoreCheckboxComponent,
    CorePageHeaderComponent,
    FullscreenModalLoaderComponent,
    EvaluateDialogComponent
  ],
  declarations: [
    WageEditComponent,
    HuWorkingHslPcImportComponent
  ]
})
export class WageModule {}
