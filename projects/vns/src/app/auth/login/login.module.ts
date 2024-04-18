import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login.component';

import { ForgotPasswordDialogModule } from '../forgot-password-dialog/forgot-password-dialog.module';
import { FullscreenModalLoaderComponent } from 'ngx-histaff-alpha';


@NgModule({
    declarations: [
        LoginComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        FullscreenModalLoaderComponent,
        ForgotPasswordDialogModule,
    ],
    exports: [
        LoginComponent
    ]
})

export class LoginModule { }