import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CommonModule } from '@angular/common';
import { LocationlistComponent } from "./locationlist.component";
import { CoreTabsComponent, CoreAccordionComponent, CoreCompositionComponent, CorePageListComponent } from "ngx-histaff-alpha";

const routes: Routes = [
  {
    path: "",
    component: LocationlistComponent
  },

];
@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CoreTabsComponent,
    CoreAccordionComponent,
    RouterModule,
    CommonModule,
    CoreCompositionComponent,
    CorePageListComponent
  ],
  declarations: [
    LocationlistComponent,

  ],
})
export class LocationListModule { }
