import { NgModule } from "@angular/core";
import { CorePageListComponent, CorePageEditComponent, CorePageHeaderComponent, CoreStatusStickerComponent } from "ngx-histaff-alpha";
import { InsRegionEditComponent } from "./edit/insregion-edit.component";
import { InsRegionRoutingModule } from "./insregion-routing.module";
import { InsRegionComponent } from "./insregion.component";



@NgModule({
  imports: [
    CorePageListComponent,
    CorePageEditComponent,
    InsRegionRoutingModule,
    CorePageHeaderComponent,
    CoreStatusStickerComponent
  ],
  declarations: [InsRegionComponent, InsRegionEditComponent],
})
export class InsRegionModule {}
