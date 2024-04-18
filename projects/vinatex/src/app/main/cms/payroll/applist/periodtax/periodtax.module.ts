import { NgModule } from "@angular/core";
import { CorePageListComponent, CorePageEditComponent, CorePageHeaderComponent, CoreStatusStickerComponent } from "ngx-histaff-alpha";
import { PeriodTaxEditComponent } from "./edit/periodtax-edit.component";
import { PeriodTaxRoutingModule } from "./periodtax-routing.module";
import { PeriodTaxComponent } from "./periodtax.component";
import { CommonModule } from "@angular/common";



@NgModule({
  imports: [
    CommonModule,
    CorePageListComponent,
    CorePageEditComponent,
    CorePageHeaderComponent,
    PeriodTaxRoutingModule,
    CoreStatusStickerComponent
  ],
  declarations: [PeriodTaxComponent, PeriodTaxEditComponent],
})
export class PeriodTaxModule { }
