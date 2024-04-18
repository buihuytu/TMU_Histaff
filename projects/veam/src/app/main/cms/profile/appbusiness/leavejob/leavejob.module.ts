import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { CorePageEditComponent, CorePageListComponent, CoreOrgTreeComponent, CoreHeaderParamsComponent, FullscreenModalLoaderComponent, CoreStatusStickerComponent } from "ngx-histaff-alpha";
import { LeaveJobEditComponent } from "./edit/leavejob-edit.component";
import { LeaveJobRoutingModule } from "./leavejob-routing.module";
import { LeaveJobComponent } from "./leavejob.component";


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    CorePageEditComponent,
    CorePageListComponent,
    LeaveJobRoutingModule,
    CoreOrgTreeComponent,
    CoreHeaderParamsComponent,
    FullscreenModalLoaderComponent,
    CoreStatusStickerComponent
  ],
  declarations: [LeaveJobComponent, LeaveJobEditComponent],
})
export class LeaveJobModule {}
