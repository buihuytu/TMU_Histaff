import { NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { GroupUserRoutingModule } from './groupuser-routing.module';
import { GroupuserCloneComponent } from './clone/groupuser-clone.component';
import { CorePageListComponent, CorePageHeaderComponent, CorePageEditComponent } from 'ngx-histaff-alpha';
import { GroupUserEditComponent } from './edit/groupuser-edit.component';
import { GroupUserComponent } from './groupuser.component';

@NgModule({
  imports: [
    CommonModule,
    GroupUserRoutingModule,
    CorePageListComponent,
    CorePageHeaderComponent,
    CorePageEditComponent,
  ],
  declarations: [GroupUserComponent, GroupUserEditComponent, GroupuserCloneComponent],
  // providers: [CoreService]
})
export class GroupUserModule {}
