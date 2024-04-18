import { NgModule } from "@angular/core";
import { CorePageListComponent, CorePageEditComponent, CorePageHeaderComponent, CoreStatusStickerComponent } from "ngx-histaff-alpha";
import { PeriodStandardEditComponent } from "./edit/periodstandard-edit.component";
import { PeriodStandardRoutingModule } from "./periodstandard-routing.module";
import { PeriodStandardComponent } from "./periodstandard.component";
import { CommonModule } from "@angular/common";


@NgModule({
  imports: [
    CommonModule,
    CorePageListComponent,
    CorePageEditComponent,
    PeriodStandardRoutingModule,
    CorePageHeaderComponent,
    CoreStatusStickerComponent
    
  ],
  declarations: [PeriodStandardComponent,PeriodStandardEditComponent],
})
export class PeriodStandardModule {}
