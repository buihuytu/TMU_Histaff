import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { SeDocumentComponent } from "./se-document.component";
import { CanDeactivateGuard, CorePageListComponent, CorePageHeaderComponent, CorePageEditComponent, CoreCheckboxComponent } from "ngx-histaff-alpha";
import { SeDocumentEditComponent } from "./se-document-edit/se-document-edit.component";
import { CommonModule } from "@angular/common";

const routes: Routes = [
  {
    path: "",
    component: SeDocumentComponent,
    children: [
      {
        path: ":id",
        component: SeDocumentEditComponent,
        outlet: "corePageListAux",
        canDeactivate: [CanDeactivateGuard]
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    CorePageListComponent,
    CorePageHeaderComponent,
    CorePageEditComponent,
    CoreCheckboxComponent
  ],
  declarations: [SeDocumentComponent, SeDocumentEditComponent],
  // providers: [CoreService],
})
export class SeDocumentModule { }
