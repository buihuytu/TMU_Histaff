import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CorePageListComponent, CoreOrgTreeComponent, CorePageEditComponent, CoreButtonGroupVnsComponent, FullscreenModalLoaderComponent, CorePageHeaderComponent, CoreAccordionComponent, TranslatePipe } from 'ngx-histaff-alpha';
import { WorkingBeforeEditComponent } from './working-before-edit/working-before-edit.component';
import { WorkingBeforeRoutingModule } from './working-before-routing.module';
import { WorkingBeforeComponent } from './working-before/working-before.component';
import { FormsModule } from '@angular/forms';
import { HuWorkingBeforeImportComponent } from '../hu-working-before-import/hu-working-before-import.component';

@NgModule({
  declarations: [
    WorkingBeforeComponent,
    WorkingBeforeEditComponent,
    HuWorkingBeforeImportComponent
  ],
  providers: [
    // anh Văn Tân bảo bỏ CoreService vì nó bị outdated
    // CoreService,

  ],
  imports: [
    CommonModule,
    TranslatePipe,
    FormsModule,
    WorkingBeforeRoutingModule,
    CorePageListComponent,
    CoreOrgTreeComponent,
    CorePageEditComponent,
    CoreButtonGroupVnsComponent,
    FullscreenModalLoaderComponent,
    CorePageHeaderComponent,
    CoreAccordionComponent,
  ]
})


export class WorkingBeforeModule { }