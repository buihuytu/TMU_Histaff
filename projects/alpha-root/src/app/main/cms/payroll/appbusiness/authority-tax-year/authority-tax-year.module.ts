import { NgModule } from "@angular/core";
import { CorePageListComponent, CorePageEditComponent, CorePageHeaderComponent, CoreCompositionComponent, CoreOrgTreeComponent, CoreCheckboxComponent, TranslatePipe } from "ngx-histaff-alpha";
import { AuthorityTaxYearRoutingModule } from "./authority-tax-year-routing.module";
import { AuthorityTaxYearComponent } from "./authority-tax-year.component";
import { AuthorityTaxYearEditComponent } from "./edit/authority-tax-year-edit.component";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";


@NgModule({
  imports: [
    CommonModule,
    CorePageListComponent,
    CorePageEditComponent,
    AuthorityTaxYearRoutingModule,
    CorePageHeaderComponent,
    CoreCompositionComponent,
    CoreOrgTreeComponent,
    CoreCheckboxComponent,
    FormsModule,
    TranslatePipe,
  ],
  declarations: [AuthorityTaxYearComponent, AuthorityTaxYearEditComponent],
})
export class AuthorityTaxYearModule {}
