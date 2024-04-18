import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CssVarComponent } from './css-var.component';

import { CssVarRoutingModule } from './css-var-routing.module';
import { CSSVarEditComponent } from './edit/edit.component';
import { CorePageListComponent, CorePageEditComponent } from 'ngx-histaff-alpha';

@NgModule({
  declarations: [CssVarComponent, CSSVarEditComponent],
  imports: [
    CommonModule,
    CssVarRoutingModule,
    CorePageListComponent,
    CorePageEditComponent,
  ],
})
export class CssVarModule {}
