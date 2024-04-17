import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { CorePageHeaderComponent, CoreCompositionComponent, CoreOrgTreeComponent, CorePageListComponent, CorePageListContentComponent } from "ngx-histaff-alpha";
import { OrgChartComponent } from "./orgchart.component";


const routes: Routes = [
  {
    path: "",
    component: OrgChartComponent,
  },
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
    CorePageHeaderComponent,
    CoreCompositionComponent,
    CoreOrgTreeComponent,
    CorePageListComponent,
    CorePageListContentComponent,
  ],
  declarations: [OrgChartComponent],
})
export class OrgChartModule {}
