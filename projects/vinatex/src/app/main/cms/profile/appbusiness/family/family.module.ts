import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CanDeactivateGuard, CorePageListComponent, CoreOrgTreeComponent, CorePageEditComponent, CorePageHeaderComponent, CoreCheckboxComponent, CoreStatusStickerComponent, CoreButtonGroupVnsComponent, FullscreenModalLoaderComponent, CoreAccordionComponent, TranslatePipe } from 'ngx-histaff-alpha';
import { FamilyEditComponent } from './family-edit/family-edit.component';
import { FamilyComponent } from './family/family.component';
import { HuFamilyImportComponent } from './family/hu-family-import/hu-family-import.component';
import { FormsModule } from '@angular/forms';

const routes: Routes = [
  
  {
    path: "",
    component: FamilyComponent,
    children: [
      {
        path: "hu-family-import",
        outlet: "corePageListAux",
        component: HuFamilyImportComponent
      }
    ]
  },
  {
    path: "change-family-portal",
    loadChildren: () => import('./change-family-portal/change-family-portal.module').then(m => m.ChangeFamilyPortalModule)
  },
  {
    path: ":id",
    component: FamilyEditComponent,
    canDeactivate: [CanDeactivateGuard]
  },
];
@NgModule({
  declarations: [
    FamilyComponent,
    FamilyEditComponent,
    HuFamilyImportComponent,
  ],
  imports: [
    RouterModule.forChild(routes), 
    CorePageListComponent,
    CoreOrgTreeComponent,
    CorePageEditComponent,
    CorePageHeaderComponent,
    CoreCheckboxComponent,
    CoreStatusStickerComponent,
    CommonModule,
    FormsModule,
    TranslatePipe,
    CoreButtonGroupVnsComponent,
    FullscreenModalLoaderComponent,
    CoreAccordionComponent,
  ]
})
export class FamilyModule { }