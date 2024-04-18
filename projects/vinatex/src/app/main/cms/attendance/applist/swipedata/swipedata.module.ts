import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { CorePageHeaderComponent, CoreCompositionComponent, CoreOrgTreeComponent, CorePageListComponent, CorePageListContentComponent, CoreButtonGroupVnsComponent, FullscreenModalLoaderComponent, TranslatePipe } from "ngx-histaff-alpha";
import { SwipeDataImportComponent } from "./swipe-data-import/swipe-data-import.component";
import { SwipeDataComponent } from "./swipedata.component";

const routes: Routes = [
  {
    path: "",
    component: SwipeDataComponent,
    children: [
      {
        path: "swipe-data-import",
        outlet: "corePageListAux",
        component: SwipeDataImportComponent
      }
    ]
  },
];


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TranslatePipe,
    RouterModule.forChild(routes),
    CorePageHeaderComponent,
    CoreCompositionComponent,
    CoreOrgTreeComponent,
    CorePageListComponent,
    CorePageListContentComponent,
    CoreButtonGroupVnsComponent,
    FullscreenModalLoaderComponent,
    CoreOrgTreeComponent
  ],
  declarations: [SwipeDataComponent, SwipeDataImportComponent],
})
export class SwipeDataModule {}