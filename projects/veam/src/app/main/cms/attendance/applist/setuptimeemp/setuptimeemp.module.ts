import { NgModule } from "@angular/core";
import { CorePageListComponent, CorePageEditComponent, CorePageHeaderComponent, CoreStatusStickerComponent, CoreOrgTreeComponent } from "ngx-histaff-alpha";
import { SetupTimeEmpEditComponent } from "./edit/setuptimeemp-edit.component";
import { SetupTimeEmpRoutingModule } from "./setuptimeemp-routing.module";
import { SetupTimeEmpComponent } from "./setuptimeemp.component";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    CorePageListComponent,
    CorePageEditComponent,
    SetupTimeEmpRoutingModule,
    CorePageHeaderComponent,
    CoreStatusStickerComponent,
    CoreOrgTreeComponent,
  ],
  declarations: [SetupTimeEmpComponent,SetupTimeEmpEditComponent],
})
export class SetupTimeEmpModule {}
