import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoreAccordionComponent, CoreButtonGroupVnsComponent, CoreControlComponent, CoreFileUploaderComponent, CorePageHeaderComponent, FullscreenModalLoaderComponent, TranslatePipe } from 'ngx-histaff-alpha';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { StaffProfileEditRoutingModule } from './staff-profile-edit-routing.module';
import { StaffProfileEditComponent } from './staff-profile-edit.component';

@NgModule({
    declarations: [StaffProfileEditComponent],
    imports: [
        CommonModule,
        TranslatePipe,
        RouterModule,
        StaffProfileEditRoutingModule,
        CorePageHeaderComponent,
        CoreAccordionComponent,
        FormsModule,
        ReactiveFormsModule,
        CoreFileUploaderComponent,
        CoreControlComponent,
        CoreButtonGroupVnsComponent,
        FullscreenModalLoaderComponent
    ]
})
export class StaffProfileEditModule { }
