import { RouterModule, Routes } from '@angular/router';
import { SeLdapComponent } from './se-ldap.component';
import { SeLdapEditComponent } from './edit/se-ldap-edit.component';
import { NgModule } from '@angular/core';
import { CanDeactivateGuard, CorePageEditComponent, CorePageHeaderComponent, CorePageListComponent } from 'ngx-histaff-alpha';
import { CommonModule } from '@angular/common';

const routes: Routes = [
  {
    path: '',
    component: SeLdapComponent,
    children: [
      {
        path: ':id',
        component: SeLdapEditComponent,
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
    CorePageListComponent,
    CorePageEditComponent,
    CorePageHeaderComponent,
  ],
  declarations: [SeLdapComponent, SeLdapEditComponent],
  // providers: [CoreService],
})
export class SeLdapModule {}
