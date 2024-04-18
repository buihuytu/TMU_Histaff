import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HuEvaluateComponent } from './hu-evaluate.component';
import { HuEvaluateEditComponent } from './hu-evaluate-edit/hu-evaluate-edit.component';

import { HuEvaluateConcurrentImportComponent } from './hu-evaluate-concurrent-import/hu-evaluate-concurrent-import.component';
import { CoreApiProgressComponent, CoreButtonGroupVnsComponent, CoreOrgTreeComponent, CorePageEditComponent, CorePageListComponent, EvaluateDialogComponent, FullscreenModalLoaderComponent, TranslatePipe } from 'ngx-histaff-alpha';
import { HuEvaluateImportComponent } from '../hu-evaluate-import/hu-evaluate-import.component';
import { HuEvaluateRoutingModule } from './hu-evaluate.routing';
import { FormsModule } from '@angular/forms';
@NgModule({
  declarations: [HuEvaluateComponent, HuEvaluateEditComponent, HuEvaluateImportComponent, HuEvaluateConcurrentImportComponent],
  imports: [
    CommonModule,
    FormsModule,
    HuEvaluateRoutingModule,
    CorePageListComponent,
    CorePageEditComponent,
    CoreOrgTreeComponent,
    FullscreenModalLoaderComponent,
    CoreButtonGroupVnsComponent,
    EvaluateDialogComponent,
    CoreApiProgressComponent,
    TranslatePipe
  ],
})
export class HuEvaluateModule { }
