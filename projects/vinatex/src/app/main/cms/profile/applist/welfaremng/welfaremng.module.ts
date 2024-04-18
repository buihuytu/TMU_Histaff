import { NgModule } from "@angular/core";
import { CorePageListComponent, CorePageEditComponent, CorePageHeaderComponent, CoreCompositionComponent, CoreOrgTreeComponent, FullscreenModalLoaderComponent, CoreButtonGroupVnsComponent, TranslatePipe } from "ngx-histaff-alpha";
import { WelfaremngImportComponent } from "../welfaremng-import/welfaremng-import.component";
import { WelfareMngEditComponent } from "./edit/welfaremng-edit.component";
import { WelfareMngRoutingModule } from "./welfaremng-routing.module";
import { WelfareMngComponent } from "./welfaremng.component";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

@NgModule({
  imports: [
    CorePageListComponent,
    CorePageEditComponent,
    WelfareMngRoutingModule,
    CorePageHeaderComponent,
    CoreCompositionComponent,
    CoreOrgTreeComponent,
    FullscreenModalLoaderComponent,
    CoreButtonGroupVnsComponent,
    CommonModule,
    TranslatePipe,
    FormsModule,
  ],
  declarations: [WelfareMngComponent, WelfareMngEditComponent, WelfaremngImportComponent],
})
export class WelfareMngModule {}
