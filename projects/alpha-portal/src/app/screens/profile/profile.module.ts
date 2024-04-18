import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile/profile.component';
import { StaffProfileComponent } from './profile/staff-profile/staff-profile.component';
import { EducationComponent } from './profile/staff-profile/education/education.component';
import { ProfileInfoComponent } from './profile/staff-profile/profile-info/profile-info.component';
import { CurriculumComponent } from './profile/staff-profile/curriculum/curriculum.component';
import { BankInfoComponent } from './profile/staff-profile/bank-info/bank-info.component';
import { WorkingBeforeComponent } from './profile/working-before/working-before.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { WorkPresentComponent } from './profile/work-present/work-present.component';
import { EducationEditComponent } from './profile/staff-profile/education/education-edit/education-edit.component';
import { CurriculumEditComponent } from './profile/staff-profile/curriculum/curriculum-edit/curriculum-edit.component';
import { FamilyInfoComponent } from './profile/family-info/family-info.component';
import { FamilyInfoEditComponent } from './profile/family-info/family-info-edit/family-info-edit.component';
import { CertificateComponent } from './profile/certificate/certificate.component';
import { CertificateEditComponent } from './profile/certificate/certificate-edit/certificate-edit.component';
import { BankInfoEditComponent } from './profile/staff-profile/bank-info/bank-info-edit/bank-info-edit.component';
import { ContactComponent } from './profile/staff-profile/contact/contact.component';
import { AdditionalInfoComponent } from './profile/staff-profile/additional-info/additional-info.component';
import { ContactEditComponent } from './profile/staff-profile/contact/contact-edit/contact-edit.component';
import { AdditionalInfoEditComponent } from './profile/staff-profile/additional-info/additional-info-edit/additional-info-edit.component';
import { InsuarenceInfoEditComponent } from './profile/staff-profile/insuarece-info/insuarence-info-edit/insuarence-info-edit.component';
import { InsuareceInfoComponent } from './profile/staff-profile/insuarece-info/insuarece-info.component';
import { CoreButtonGroupVnsComponent, CoreCheckboxComponent, CoreFormComponent, CorePageEditComponent, CorePageViewComponent, MapAvatarToServerPipe, TableCellPipe, TranslatePipe } from 'ngx-histaff-alpha';


@NgModule({
    declarations: [
        ProfileComponent,
        StaffProfileComponent,
        EducationComponent,
        ProfileInfoComponent,
        CurriculumComponent,
        BankInfoComponent,
        WorkingBeforeComponent,
        WorkPresentComponent,
        EducationEditComponent,
        CurriculumEditComponent,
        FamilyInfoComponent,
        FamilyInfoEditComponent,
        CertificateComponent,
        CertificateEditComponent,
        BankInfoEditComponent,
        ContactComponent,
        AdditionalInfoComponent,
        ContactEditComponent,
        AdditionalInfoEditComponent,
        InsuareceInfoComponent,
        InsuarenceInfoEditComponent
    ],
    imports: [
        CommonModule,
        ProfileRoutingModule,
        TranslatePipe,
        TableCellPipe,
        MapAvatarToServerPipe,
        CorePageViewComponent,
        CorePageEditComponent,
        FormsModule,
        CoreFormComponent,
        ReactiveFormsModule,
        CoreCheckboxComponent,
        CoreButtonGroupVnsComponent
    ],
})
export class ProfileModule {}
