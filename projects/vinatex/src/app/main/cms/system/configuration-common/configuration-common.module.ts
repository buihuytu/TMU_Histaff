import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// thêm code
// vì tạo mới component
import { ConfigurationCommonComponent } from './configuration-common.component';
import { ConfigurationCommonEditComponent } from './configuration-common-edit/configuration-common-edit.component';
import { AppService, CanDeactivateGuard, CoreCheckboxComponent, CorePageEditComponent, CorePageListComponent } from 'ngx-histaff-alpha';
import { CommonModule } from '@angular/common';

const routes: Routes = [
  {
    path: '',
    component: ConfigurationCommonComponent,
  },
  {
    path: ':id',
    component: ConfigurationCommonEditComponent,
    canDeactivate: [CanDeactivateGuard],
  }
];

@NgModule({
  declarations: [
    ConfigurationCommonComponent,
    ConfigurationCommonEditComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    
    // vì bạn có dòng code
    // *ngIf="!!sections.length"
    // nên phải thêm CommonModule
    CommonModule,

    // thẻ core-page-list
    CorePageListComponent,

    // thẻ core-checkbox
    CoreCheckboxComponent,

    // thẻ core-page-edit
    CorePageEditComponent
  ],
  providers: [AppService]
})
export class ConfigurationCommonModule {}