import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { ContractInforComponent } from "./contractinfor.component";
import { ContractInforEditComponent } from "./edit/contractinfor-edit.component";


import { LiquidateDialogComponent } from './liquidate-dialog/liquidate-dialog.component';
import { ContractInfoImportComponent } from "./contract-info-import/contract-info-import.component";
import { CanDeactivateGuard, CoreButtonGroupVnsComponent, CoreOrgTreeComponent, CorePageEditComponent, CorePageListComponent, CoreStatusStickerComponent, CoreTableComponent, FullscreenModalLoaderComponent, TranslatePipe } from "ngx-histaff-alpha";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

const routes: Routes = [
  {
    path: "",
    component: ContractInforComponent,
    children: [
      {
        path: "contract-import",
        component: ContractInfoImportComponent,
        outlet: "corePageListAux",
      },
      {
        path: ':id',
        component: LiquidateDialogComponent,
        outlet: 'corePageListAux'
      }
    ]
  },
  {
    path: ":id",
    component: ContractInforEditComponent,
    canDeactivate: [CanDeactivateGuard]
  },
];

@NgModule({
    declarations: [
      ContractInforComponent,
      ContractInforEditComponent,
      ContractInfoImportComponent,
      LiquidateDialogComponent
    ],
    imports: [
        RouterModule.forChild(routes),
        FormsModule,
        CorePageListComponent,
        CorePageEditComponent,
        CoreOrgTreeComponent,
        CoreTableComponent,
        TranslatePipe,
        CoreButtonGroupVnsComponent,
        FullscreenModalLoaderComponent,
        CoreStatusStickerComponent,
        CommonModule,
    ]
})
export class ContractInforModule { }
