import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ForgotPasswordDialogComponent } from './forgot-password-dialog.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ForgotPasswordDialogComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    ForgotPasswordDialogComponent
  ]
})

export class ForgotPasswordDialogModule { }