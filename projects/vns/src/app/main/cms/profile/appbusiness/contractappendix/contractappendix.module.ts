import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { CanDeactivateGuard, CoreTableComponent, CoreOrgTreeComponent, CorePageListComponent, CorePageEditComponent, CoreCompositionComponent, CoreButtonGroupVnsComponent, CorePageHeaderComponent, FullscreenModalLoaderComponent, CoreStatusStickerComponent, TranslatePipe } from "ngx-histaff-alpha";
import { ContractAppendixImportComponent } from "./contract-appendix-import/contract-appendix-import.component";
import { ContractAppendixComponent } from "./contractappendix.component";
import { ContractAppendixEditComponent } from "./edit/contractappendix-edit.component";

const routes: Routes = [
  {
    path: "",
    component: ContractAppendixComponent,
    children: [
      {
        path: "contract-appendix-import",
        component: ContractAppendixImportComponent,
        outlet: "corePageListAux",
      }
    ]
  },
  {
    path: ":id",
    component: ContractAppendixEditComponent,
    canDeactivate: [CanDeactivateGuard]
  }
];
@NgModule({
    declarations: [ContractAppendixComponent, ContractAppendixEditComponent, ContractAppendixImportComponent],
    // providers: [CoreService],
    imports: [
        RouterModule.forChild(routes),
        CommonModule,
        CoreTableComponent,
        CoreOrgTreeComponent,
        CorePageListComponent,
        CorePageEditComponent,
        CoreCompositionComponent,
        CoreButtonGroupVnsComponent,
        FormsModule,
        TranslatePipe,
        CorePageHeaderComponent,
        FullscreenModalLoaderComponent,
        CoreStatusStickerComponent
    ]
})
export class ContractAppendixModule {}
