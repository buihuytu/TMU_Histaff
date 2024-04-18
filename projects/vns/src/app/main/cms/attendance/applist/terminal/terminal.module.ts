import { NgModule } from "@angular/core";

import { TerminalEditComponent } from "./edit/terminal-edit.component";
import { CorePageListComponent, CorePageEditComponent, CorePageHeaderComponent, CoreStatusStickerComponent } from "ngx-histaff-alpha";
import { TerminalRoutingModule } from "./terminal-routing.module";
import { TerminalComponent } from "./terminal.component";
import { CommonModule } from "@angular/common";
// const routes: Routes = [
//   {
//     path: "",
//     component: TerminalComponent,
//     children: [{
//       path: ":id",
//       component: TerminalEditComponent,
//       outlet: "corePageListAux",
//       canDeactivate: [CanDeactivateGuard]
//     }]
//   }
// ];

@NgModule({
  imports: [
    CommonModule,
    CorePageListComponent,
    CorePageEditComponent,
    TerminalRoutingModule,
    CorePageHeaderComponent,
    CoreStatusStickerComponent
  ],
  declarations: [TerminalComponent,TerminalEditComponent],
})
export class TerminalModule {}
