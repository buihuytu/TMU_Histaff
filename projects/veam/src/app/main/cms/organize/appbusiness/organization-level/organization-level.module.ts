import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrganizationLevelComponent } from './organization-level/organization-level.component';
import { OrganizationLevelEditComponent } from './organization-level-edit/organization-level-edit.component';
import { OrganizationLevelRoutingModule } from './organization-level-routing.module';
import { CorePageEditComponent, CorePageListComponent, CoreStatusStickerComponent } from 'ngx-histaff-alpha';



@NgModule({
  declarations: [
    OrganizationLevelComponent,
    OrganizationLevelEditComponent,
    
  ],
  imports: [
    CommonModule,
    OrganizationLevelRoutingModule,
    CorePageEditComponent,
    CorePageListComponent,
    CoreStatusStickerComponent
  ]
})
export class OrganizationLevelModule { }
