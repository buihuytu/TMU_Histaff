import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserComponent } from './user.component';
// import { CoreService } from '../../../../services/core.service';
import { UserEditComponent } from './edit/user-edit.component';
import { CanDeactivateGuard, CoreCheckboxComponent, CorePageEditComponent, CorePageListComponent, FullscreenModalLoaderComponent, ImageErrorResolverDirective, MapAvatarToServerPipe } from 'ngx-histaff-alpha';
import { CommonModule } from '@angular/common';


const routes: Routes = [
  {
    path: '',
    component: UserComponent,
    /* WHEN YOU WANT POPUP */
    children: [
      {
        path: ':id',
        component: UserEditComponent,
        outlet: "corePageListAux",
        canDeactivate: [CanDeactivateGuard]
      }  
    ]
  },
  /* WHEN YOU DO NOT WANT POPUP */
  /*
  {
    path: ':id',
    component: UserEditComponent,
    canDeactivate: [CanDeactivateGuard]
  }
  */
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    MapAvatarToServerPipe,
    CorePageListComponent,
    CorePageEditComponent,
    CoreCheckboxComponent,
    FullscreenModalLoaderComponent,
    ImageErrorResolverDirective,
  ],
  declarations: [UserComponent, UserEditComponent],
  // providers: [CoreService]
})
export class UserModule {}
