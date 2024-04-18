import { NgModule } from "@angular/core";
import { CorePageListComponent, CorePageEditComponent, CorePageHeaderComponent, CoreStatusStickerComponent } from "ngx-histaff-alpha";
import { ListfundEditComponent } from "./edit/listfund-edit.component";
import { ListfundRoutingModule } from "./listfund-routing.module";
import { ListfundCompnent } from "./listfund.component";
import { CommonModule } from "@angular/common";


@NgModule({
  imports: [
    CommonModule,
    CorePageListComponent,
    CorePageEditComponent,
    ListfundRoutingModule,
    CorePageHeaderComponent,
    CoreStatusStickerComponent
  ],
  declarations: [ListfundCompnent, ListfundEditComponent],
})
export class ListfundModule { }
