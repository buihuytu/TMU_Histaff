import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { WarningRoutingModule } from './warning-routing.module';
import { WarningEditComponent } from './warning-edit/warning-edit.component';
import { CoreCheckboxComponent, CorePageHeaderComponent, CoreButtonGroupVnsComponent, TranslatePipe } from 'ngx-histaff-alpha';

@NgModule({
  declarations: [
    WarningEditComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    WarningRoutingModule,
    TranslatePipe,
    CoreCheckboxComponent,
    CorePageHeaderComponent,
    CoreButtonGroupVnsComponent,
  ]
})
export class WarningModule { }
