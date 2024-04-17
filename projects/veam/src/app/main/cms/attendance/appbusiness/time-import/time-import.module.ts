import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimeImportComponent } from './time-import.component';
import { TimeImportEditComponent } from './time-import-edit/time-import-edit.component';
import { RouterModule, Routes } from '@angular/router';
import { CoreOrgTreeComponent, CorePageListComponent, CoreDropdownComponent, CoreButtonGroupVnsComponent, CoreChecklistComponent, CoreDatePickerComponent, CorePageHeaderComponent, CoreTableComponent, CoreCompositionComponent, CoreControlComponent, CorePageEditComponent, CorePaginationFullComponent, FullscreenModalLoaderComponent, CoreFormControlSeekerComponent, TranslatePipe } from 'ngx-histaff-alpha';
import { FormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: "",
    component: TimeImportComponent,
  },
  {
    path: ":id",
    component: TimeImportEditComponent,
  }
];
@NgModule({
  declarations: [
    TimeImportComponent,
    TimeImportEditComponent
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    FormsModule,
    TranslatePipe,
    CoreOrgTreeComponent,
    CorePageListComponent,
    CoreDropdownComponent,
    CoreFormControlSeekerComponent,
    CoreButtonGroupVnsComponent,
    CoreChecklistComponent,
    CoreDatePickerComponent,
    CorePageHeaderComponent,
    CoreTableComponent,
    CoreCompositionComponent,
    CoreControlComponent,
    RouterModule,
    CorePageEditComponent,
    CorePaginationFullComponent,
    FullscreenModalLoaderComponent
  ],
})
export class TimeImportModule { }
