import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CanDeactivateGuard, CorePageListComponent, CorePageHeaderComponent, CorePageEditComponent, CoreCheckboxComponent, CoreOrgTreeComponent } from "ngx-histaff-alpha";
import { SeDocumentInfoEditComponent } from "./se-document-info-edit/se-document-edit-info.component";
import { SeDocumentInfoUpComponent } from "./se-document-info-edit/se-document-info-up/se-document-info-up.component";
import { SeDocumentInfoComponent } from "./se-document-info.component";
import { FormsModule } from "@angular/forms";

const routes: Routes = [
  {
    path: "",
    component: SeDocumentInfoComponent,
    // children: [
    //   {
       
    //     outlet: "corePageListAux",
    //     canDeactivate: [CanDeactivateGuard]
    //   }
    // ]
  },{
    path: ":id",
    component: SeDocumentInfoEditComponent,
    children: [
      {
        path: ":id",
        component: SeDocumentInfoUpComponent,
        outlet: "corePageListAux",
        canDeactivate: [CanDeactivateGuard]
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    FormsModule,
    CorePageListComponent,
    CorePageHeaderComponent,
    CorePageEditComponent,
    CoreCheckboxComponent,
    CoreOrgTreeComponent
  ],
  declarations: [SeDocumentInfoComponent, SeDocumentInfoEditComponent, SeDocumentInfoUpComponent],
})
export class SeDocumentInfoModule { }
