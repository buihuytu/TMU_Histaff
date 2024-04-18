import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AttachmentRoutingModule } from './attachment-routing.module';
import { DemoAttachmentListComponent } from './demo-attachment-list/demo-attachment-list.component';
import { DemoAttachmentEditComponent } from './demo-attachment-edit/demo-attachment-edit.component';
import { CorePageListComponent, CorePageEditComponent } from 'ngx-histaff-alpha';

@NgModule({
  declarations: [
    DemoAttachmentListComponent,
    DemoAttachmentEditComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    AttachmentRoutingModule,
    CorePageListComponent,
    CorePageEditComponent
  ]
})
export class AttachmentModule { }
