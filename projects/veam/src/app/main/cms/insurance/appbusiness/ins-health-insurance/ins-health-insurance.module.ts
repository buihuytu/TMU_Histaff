import { NgModule } from "@angular/core";
import { CorePageListComponent, CoreAccordionComponent, CorePageEditComponent, CorePageHeaderComponent, CoreCompositionComponent, CoreOrgTreeComponent, CoreStatusStickerComponent } from "ngx-histaff-alpha";
import { InsHealthInsuranceEditComponent } from "./edit/ins-health-insurance-edit.component";
import { InsHealthInsuranceRoutingModule } from "./ins-health-insurance-routing.module";
import { InsHealthInsuranceComponent } from "./ins-health-insurance.component";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";


@NgModule({
  imports: [
    CorePageListComponent,
    FormsModule,
    CommonModule,
    CoreAccordionComponent,
    CorePageEditComponent,
    InsHealthInsuranceRoutingModule,
    CorePageHeaderComponent,
    CoreCompositionComponent,
    CoreOrgTreeComponent,
    CoreStatusStickerComponent
  ],
  declarations: [InsHealthInsuranceComponent, InsHealthInsuranceEditComponent],
  //providers: [CoreService],
})
export class InsHealthInsuranceModule {}
