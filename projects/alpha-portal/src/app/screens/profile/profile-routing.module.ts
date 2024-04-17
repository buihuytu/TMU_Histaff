import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { StaffProfileComponent } from './profile/staff-profile/staff-profile.component';
import { EducationComponent } from './profile/staff-profile/education/education.component';
import { BankInfoComponent } from './profile/staff-profile/bank-info/bank-info.component';
import { CurriculumComponent } from './profile/staff-profile/curriculum/curriculum.component';
import { ProfileInfoComponent } from './profile/staff-profile/profile-info/profile-info.component';
import { WorkingBeforeComponent } from './profile/working-before/working-before.component';
import { WorkPresentComponent } from './profile/work-present/work-present.component';

import { ContractComponent } from './profile/work-present/contract/contract.component';
import { AllowanceManagerComponent } from './profile/work-present/allowance-manager/allowance-manager.component';
import { CommendComponent } from './profile/work-present/commend/commend.component';
import { EvaluateComponent } from './profile/work-present/evaluate/evaluate.component';
import { WageAllowanceComponent } from './profile/work-present/wage-allowance/wage-allowance.component';
import { ConcurrentlyComponent } from './profile/work-present/concurrently/concurrently.component';
import { DisciplineComponent } from './profile/work-present/discipline/discipline.component';
import { EducationEditComponent } from './profile/staff-profile/education/education-edit/education-edit.component';
import { CurriculumEditComponent } from './profile/staff-profile/curriculum/curriculum-edit/curriculum-edit.component';

import { WorkingProcessComponent } from './profile/work-present/working-process/working-process.component';
import { FamilyInfoComponent } from './profile/family-info/family-info.component';
import { FamilyInfoEditComponent } from './profile/family-info/family-info-edit/family-info-edit.component';
import { CertificateComponent } from './profile/certificate/certificate.component';
import { CertificateEditComponent } from './profile/certificate/certificate-edit/certificate-edit.component';
import { BankInfoEditComponent } from './profile/staff-profile/bank-info/bank-info-edit/bank-info-edit.component';
import { ContactComponent } from './profile/staff-profile/contact/contact.component';
import { AdditionalInfoComponent } from './profile/staff-profile/additional-info/additional-info.component';
import { ContactEditComponent } from './profile/staff-profile/contact/contact-edit/contact-edit.component';
import { AdditionalInfoEditComponent } from './profile/staff-profile/additional-info/additional-info-edit/additional-info-edit.component';
import { InsuareceInfoComponent } from './profile/staff-profile/insuarece-info/insuarece-info.component';
import { InsuarenceInfoEditComponent } from './profile/staff-profile/insuarece-info/insuarence-info-edit/insuarence-info-edit.component';

const routes: Routes = [
  {
    path: '',
    component: ProfileComponent,
  },
  {
    path: 'staff-profile',
    component: StaffProfileComponent,
  },
  {
    path: 'family-info',
    component: FamilyInfoComponent,
  },
  {
    path: 'family-info/family-info-edit',
    component: FamilyInfoEditComponent,
  },
  {
    path: 'staff-profile/education',
    component: EducationComponent,
  },
  {
    // đây là education edit
    path: 'staff-profile/education/education-edit',
    component: EducationEditComponent,
  },
  {
    path: 'staff-profile/curriculum',
    component: CurriculumComponent,
  },
  {
    path: 'staff-profile/contact',
    component: ContactComponent,
  },
  {
    path: 'staff-profile/contact/contact-edit',
    component: ContactEditComponent,
  },
  {
    path: 'staff-profile/additional-info',
    component: AdditionalInfoComponent,
  },
  {
    path: 'staff-profile/additional-info/additional-info-edit',
    component: AdditionalInfoEditComponent,
  },
  {
    path: 'staff-profile/curriculum/curriculum-edit',
    component: CurriculumEditComponent,
  },
  {
    path: 'staff-profile/ins-info',
    component: InsuareceInfoComponent,
  },
  {
    path: 'staff-profile/ins-info/ins-info-edit',
    component: InsuarenceInfoEditComponent,
  },
  {
    path: 'staff-profile/bank-info',
    component: BankInfoComponent,
  },
  {
    path: 'staff-profile/bank-info/bank-info-edit',
    component: BankInfoEditComponent,
  },
  {
    path: 'staff-profile/profile-info',
    component: ProfileInfoComponent,
  },
  {
    path: 'work-past',
    component: WorkingBeforeComponent,
  },
  {
    path: 'work-present',
    component: WorkPresentComponent,
  },
  {
    path: 'work-present/contract',
    component: ContractComponent,
  },
  {
    path: 'work-present/allowance-mng',
    component: AllowanceManagerComponent,
  },
  {
    path: 'work-present/commend',
    component: CommendComponent,
  },
  {
    path: 'work-present/concurrently',
    component: ConcurrentlyComponent,
  },
  {
    path: 'work-present/evaluate',
    component: EvaluateComponent,
  },
  {
    path: 'work-present/wage-allowance',
    component: WageAllowanceComponent,
  },
  {
    path: 'work-present/discipline',
    component: DisciplineComponent,
  },
  {
    path: 'work-present/working-process',
    component: WorkingProcessComponent
  },
  {
    path: 'certificate',
    component: CertificateComponent
  },
  {
    path: 'certificate/certificate-edit',
    component: CertificateEditComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfileRoutingModule {}
