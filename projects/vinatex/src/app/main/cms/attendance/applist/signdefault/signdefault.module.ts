import { NgModule } from "@angular/core";
import { CorePageListComponent, CorePageEditComponent, CorePageHeaderComponent, CoreCompositionComponent, CoreOrgTreeComponent, CoreStatusStickerComponent } from "ngx-histaff-alpha";
import { SignDefaultEditComponent } from "./edit/signdefault-edit.component";
import { SignDefaultRoutingModule } from "./signdefault-routing.module";
import { SignDefaultComponent } from "./signdefault.component";
import { FormsModule } from "@angular/forms";


@NgModule({
  imports: [
    FormsModule,
    CorePageListComponent,
    CorePageEditComponent,
    SignDefaultRoutingModule,
    CorePageHeaderComponent,
    CoreCompositionComponent,
    CoreOrgTreeComponent,
    CoreStatusStickerComponent
  ],
  declarations: [SignDefaultComponent, SignDefaultEditComponent],
 })
export class SignDefaultModule {}
