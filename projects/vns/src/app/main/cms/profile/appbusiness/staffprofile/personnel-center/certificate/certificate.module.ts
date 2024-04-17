import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CertificateRoutingModule } from './certificate-routing.module';
import { CertificateComponent } from './certificate.component';
import { TranslatePipe } from 'ngx-histaff-alpha';


@NgModule({
  declarations: [
    CertificateComponent
  ],
  imports: [
    CommonModule,
    TranslatePipe,
    CertificateRoutingModule,
  ]
})
export class CertificateModule { }
