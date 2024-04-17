import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CorePageListComponent, CoreOrgTreeComponent, CorePageHeaderComponent, CorePageEditComponent, CoreAccordionComponent, CoreButtonGroupVnsComponent, FullscreenModalLoaderComponent, CoreCheckboxComponent, CoreControlComponent, MapAvatarToServerPipe } from "ngx-histaff-alpha";
import { ProfileRecruitmentComponent } from "./profile-recruitment.component";

const routes: Routes = [
  {
    path: "",
    component: ProfileRecruitmentComponent,
    // children: [
    //   {
    //     path: ":id",
    //     outlet: "corePageListAux",
    //     component: ProfileRecruitmentEditComponent
    //   }
    // ]
  },
  {
    path: "app-profile-recruitment-edit",
    loadChildren: () => import('./profile-recruitment-edit/profile-recruitment-edit.module').then(m => m.ProfileRecruitmentEditModule)
  },
//   {
//     path: "change-info",
//     loadChildren: () => import('./change-info/change-info.module').then(m => m.ChangeInfoModule)
//   },
//   {
//     path: "app-staff-profile-edit",
//     loadChildren: () => import('./staff-profile-edit/staff-profile-edit.module').then(m => m.StaffProfileEditModule)
//   },
  {
    path: ":id",
    loadChildren: () => import('./profile-recruitment-center/profile-recruitment-center.module').then(m => m.ProfileRecruitmentCenterModule)
    
  },
];

@NgModule({
    declarations: [ProfileRecruitmentComponent],
    imports: [
        RouterModule.forChild(routes),
        CorePageListComponent,
        CoreOrgTreeComponent,
        CorePageHeaderComponent,
        CorePageEditComponent,
        CoreAccordionComponent,
        CoreButtonGroupVnsComponent,
        FullscreenModalLoaderComponent,
        CommonModule,
        CoreCheckboxComponent,
        MapAvatarToServerPipe,
    ]
})
export class ProfileRecruitmentModule {}
