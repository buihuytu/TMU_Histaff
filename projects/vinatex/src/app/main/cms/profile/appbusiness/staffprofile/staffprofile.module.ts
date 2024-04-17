import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CorePageListComponent, CoreOrgTreeComponent, CorePageHeaderComponent, CorePageEditComponent, CoreAccordionComponent, CoreButtonGroupVnsComponent, FullscreenModalLoaderComponent, TranslatePipe } from "ngx-histaff-alpha";
import { StaffprofileImportComponent } from "../staffprofile-import/staffprofile-import.component";
import { CommonModule } from "@angular/common";
import { StaffProfileExtComponent } from "./staff-profile-ext/staff-profile-ext.component";

const routes: Routes = [
  {
    path: "",
    component: StaffProfileExtComponent,
    children: [
      {
        path: "staffprofile-import",
        outlet: "corePageListAux",
        component: StaffprofileImportComponent
      }
    ]
  },
  {
    path: "change-info",
    loadChildren: () => import('./change-info/change-info.module').then(m => m.ChangeInfoModule)
  },
  {
    path: "app-staff-profile-edit",
    loadChildren: () => import('./staff-profile-edit/staff-profile-edit.module').then(m => m.StaffProfileEditModule)
  },
  {
    path: ":id",
    loadChildren: () => import('./personnel-center/personnel-center.module').then(m => m.PersonnelCenterModule)
  },
  
  

];

@NgModule({
    declarations: [StaffprofileImportComponent],
    imports: [
        RouterModule.forChild(routes),
        CommonModule,
        TranslatePipe,
        CorePageListComponent,
        CoreOrgTreeComponent,
        CorePageHeaderComponent,
        CorePageEditComponent,
        CoreAccordionComponent,
        CoreButtonGroupVnsComponent,
        FullscreenModalLoaderComponent
    ]
})
export class StaffProfileModule {}
