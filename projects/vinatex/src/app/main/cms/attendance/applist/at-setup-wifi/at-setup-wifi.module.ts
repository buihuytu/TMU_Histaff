import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CanDeactivateGuard, CorePageListComponent, CorePageEditComponent, CorePageHeaderComponent, CoreStatusStickerComponent, CoreOrgTreeComponent } from 'ngx-histaff-alpha';
import { AtSetupWifiEditComponent } from './at-setup-wifi-edit/at-setup-wifi-edit.component';
import { AtSetupWifiComponent } from './at-setup-wifi.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

const routes: Routes = [
  {
    path: '',
    component: AtSetupWifiComponent,
    children: [
      {
        path: ':id',
        component: AtSetupWifiEditComponent,
        outlet: 'corePageListAux',
        canDeactivate: [CanDeactivateGuard],
      },
    ],
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    FormsModule,
    CorePageListComponent,
    CorePageEditComponent,
    CorePageHeaderComponent,
    CoreStatusStickerComponent,
    CoreOrgTreeComponent
  ],
  declarations: [AtSetupWifiComponent, AtSetupWifiEditComponent],
})
export class AtSetupWifiModule {}
