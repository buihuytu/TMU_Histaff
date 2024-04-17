import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DemoAttachmentListComponent } from './demo-attachment-list/demo-attachment-list.component';
import { DemoAttachmentEditComponent } from './demo-attachment-edit/demo-attachment-edit.component';
import { CanDeactivateGuard } from 'ngx-histaff-alpha';

const routes: Routes = [
  {
    path: '',
    component: DemoAttachmentListComponent
  },
  {
    path: ':id',
    component: DemoAttachmentEditComponent,
    canDeactivate: [CanDeactivateGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AttachmentRoutingModule { }
