import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CssThemeComponent } from './css-theme.component';

import { CssThemeRoutingModule } from './css-theme-routing.module';
import { CorePageListComponent, CorePageEditComponent } from 'ngx-histaff-alpha';

@NgModule({
  declarations: [CssThemeComponent],
  imports: [
    CommonModule,
    CssThemeRoutingModule,
    CorePageListComponent,
    CorePageEditComponent,
  ],
})
export class CssThemeModule {}
