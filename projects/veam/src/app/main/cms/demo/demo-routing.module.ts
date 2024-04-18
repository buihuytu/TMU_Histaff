import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeaderButtonDropdownDemoComponent } from './header-button-dropdown-demo/header-button-dropdown-demo.component';

const routes: Routes = [
  {
    path: "attachment",
    loadChildren: () => import('./attachment/attachment.module').then(m => m.AttachmentModule)
  },
  {
    path: "header-button-dropdown-demo",
    component: HeaderButtonDropdownDemoComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DemoRoutingModule { }
