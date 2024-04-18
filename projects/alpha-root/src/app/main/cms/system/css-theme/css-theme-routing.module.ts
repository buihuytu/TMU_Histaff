import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CssThemeComponent } from './css-theme.component';

const routes: Routes = [
  {
    path: '',
    component: CssThemeComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CssThemeRoutingModule {}
