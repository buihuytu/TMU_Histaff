import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { OrganizationStructRoutingModule } from './organization-struct-routing.module';
import { OrganizationStructComponent } from './organization-struct/organization-struct.component';
import { CorePageHeaderComponent, CoreCompositionComponent, CoreOrgTreeComponent, CorePageViewComponent, CorePageEditComponent, FullscreenModalLoaderComponent } from 'ngx-histaff-alpha';
import { OrganizationStructEditComponent } from './organization-struct-edit/organization-struct-edit.component';
import { OrganizationStructViewComponent } from './organization-struct-view/organization-struct-view.component';


@NgModule({
  declarations: [
    OrganizationStructComponent,
    OrganizationStructEditComponent,
    OrganizationStructViewComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    OrganizationStructRoutingModule,
    CorePageHeaderComponent,
    CoreCompositionComponent,
    CoreOrgTreeComponent,
    CorePageViewComponent,
    CorePageEditComponent,
    FullscreenModalLoaderComponent,
  ]
})
export class OrganizationStructModule { }
