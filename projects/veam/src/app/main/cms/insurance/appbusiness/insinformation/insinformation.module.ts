import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { InsInformationComponent } from './insinformation.component';
import { InsInformationEditComponent } from './edit/insinformation-edit.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CorePageListComponent, CoreButtonGroupVnsComponent, CoreAccordionComponent, CoreOrgTreeComponent, CoreControlComponent, CoreCheckboxComponent, CorePageHeaderComponent, CorePageEditComponent, FullscreenModalLoaderComponent, TranslatePipe } from 'ngx-histaff-alpha';
import { InsInformationImportComponent } from './ins-information-import/ins-information-import.component';


const routes: Routes = [
  {
    path: '',
    component: InsInformationComponent,
    children: [
      {
        path: "ins-information-import",
        outlet: "corePageListAux",
        component: InsInformationImportComponent
      }
    ]
  },
  {
    path: ':id',
    component: InsInformationEditComponent,
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    FormsModule,
    TranslatePipe,
    CorePageListComponent,
    CoreButtonGroupVnsComponent,
    CoreAccordionComponent,
    ReactiveFormsModule,
    RouterModule,
    CoreOrgTreeComponent,
    CoreControlComponent,
    CoreCheckboxComponent,
    CorePageHeaderComponent,
    CorePageEditComponent,
    FullscreenModalLoaderComponent,
  ],
  declarations: [InsInformationComponent, InsInformationEditComponent, InsInformationImportComponent],
})
export class InsInformationModule {}
