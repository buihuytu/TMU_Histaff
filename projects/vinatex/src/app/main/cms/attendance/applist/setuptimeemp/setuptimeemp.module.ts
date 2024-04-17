import { NgModule } from "@angular/core";
import { CorePageListComponent, CorePageEditComponent, CorePageHeaderComponent, CoreStatusStickerComponent } from "ngx-histaff-alpha";
import { SetupTimeEmpEditComponent } from "./edit/setuptimeemp-edit.component";
import { SetupTimeEmpRoutingModule } from "./setuptimeemp-routing.module";
import { SetupTimeEmpComponent } from "./setuptimeemp.component";


@NgModule({
  imports: [
    CorePageListComponent,
    CorePageEditComponent,
    SetupTimeEmpRoutingModule,
    CorePageHeaderComponent,
    CoreStatusStickerComponent
  ],
  declarations: [SetupTimeEmpComponent,SetupTimeEmpEditComponent],
})
export class SetupTimeEmpModule {}
