import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { CoreAccordionComponent, CoreButtonGroupVnsComponent, CoreCheckboxComponent, CoreControlComponent, CoreFormComponent, CoreHeaderParamsComponent, CoreOrgTreeComponent, CorePageListComponent, CoreStatusStickerComponent, FullscreenModalLoaderComponent, TranslatePipe } from "ngx-histaff-alpha";
import { HucommendEditComponent } from "./hucommend-edit/hucommend-edit.component";
import { HucommendImportComponent } from "./hucommend-import/hucommend-import.component";
import { HucommendComponent } from "./hucommend.component";
import { HuCommendRoutingModule } from "./hucommend.routing";

@NgModule({
    declarations: [HucommendComponent, HucommendEditComponent, HucommendImportComponent],
    imports: [
        CommonModule,
        CorePageListComponent,
        HuCommendRoutingModule,
        FormsModule,
        CoreButtonGroupVnsComponent,
        CoreAccordionComponent,
        ReactiveFormsModule,
        RouterModule,
        CoreControlComponent,
        CoreOrgTreeComponent,
        CoreFormComponent,
        CoreButtonGroupVnsComponent,
        FullscreenModalLoaderComponent,
        CoreCheckboxComponent,
        CoreStatusStickerComponent,
        CoreHeaderParamsComponent,
        TranslatePipe
    ]
})
export class HucommendModule {}
