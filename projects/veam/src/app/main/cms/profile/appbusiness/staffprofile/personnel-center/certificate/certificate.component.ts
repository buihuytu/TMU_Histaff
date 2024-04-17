import { Component, OnInit } from '@angular/core';

import { CertificateService } from './certificate.service';
import { PersonnelCenterService } from '../personnel-center.service';
import { EnumTranslateKey } from 'alpha-global-constants';
import { BaseComponent, MultiLanguageService } from 'ngx-histaff-alpha';
import { map } from 'rxjs';

@Component({
  selector: 'app-certificate',
  templateUrl: './certificate.component.html',
  styleUrls: ['./certificate.component.scss']
})
export class CertificateComponent extends BaseComponent implements OnInit {

  title: EnumTranslateKey = EnumTranslateKey.UI_COMPONENT_TITLE_CERTIFICATE_EDIT;
  typeName: EnumTranslateKey = EnumTranslateKey.UI_COMPONENT_LABEL_CERTIFICATE_TYPECERTIFICATENAME;
  trainFrom: EnumTranslateKey = EnumTranslateKey.UI_COMPONENT_LABEL_CERTIFICATE_TRAIN_FROM;
  trainTo: EnumTranslateKey = EnumTranslateKey.UI_COMPONENT_LABEL_CERTIFICATE_TRAIN_TO;
  effectDate: EnumTranslateKey = EnumTranslateKey.UI_COMPONENT_LABEL_CERTIFICATE_EFFECT_DATE; 
  levelTrainName: EnumTranslateKey = EnumTranslateKey.UI_COMPONENT_LABEL_CERTIFICATE_LEVELTRAINNAME; 
  level: EnumTranslateKey = EnumTranslateKey.UI_COMPONENT_LABEL_CERTIFICATE_LEVEL;
  major: EnumTranslateKey = EnumTranslateKey.UI_COMPONENT_LABEL_CERTIFICATE_MAJOR;
  year: EnumTranslateKey = EnumTranslateKey.UI_COMPONENT_LABEL_CERTIFICATE_YEAR;
  schoolName: EnumTranslateKey = EnumTranslateKey.UI_COMPONENT_LABEL_CERTIFICATE_SCHOOLNAME;
  classification: EnumTranslateKey = EnumTranslateKey.UI_COMPONENT_LABEL_CERTIFICATE_CLASSIFICATION;
  isPrime: EnumTranslateKey = EnumTranslateKey.UI_COMPONENT_LABEL_CERTIFICATE_IS_PRIME;
  note: EnumTranslateKey = EnumTranslateKey.UI_COMPONENT_LABEL_CERTIFICATE_NOTE;
  name: EnumTranslateKey = EnumTranslateKey.UI_COMPONENT_LABEL_CERTIFICATE_NAME;

  headers: EnumTranslateKey = EnumTranslateKey.UI_PERSONNEL_MENU_ITEM_CERTIFICATE;
  members!: any[];

  employee!: any;
  employeeCv!: any;
  
  constructor(
    private cer: CertificateService,
    public override mls: MultiLanguageService,
    private personnelCenterService: PersonnelCenterService
  ) {
    super(mls);
  }

  override ngOnInit(): void {
    this.personnelCenterService.leftMenuActiveItemIndex = 4;
    this.personnelCenterService.tabActiveHeader = this.headers;

    this.mls.lang$.subscribe(x => this.lang = x);
    this.subscriptions.push(
      this.personnelCenterService.employee$.subscribe(x => {
        this.employee = x
        this.subscriptions.push(
          this.cer.getCertificateByEmployee(x.id)
            .pipe(
              map((members: any) => {
                return members.body.innerBody;
              })
            )
            .subscribe(response => {
              this.members = response;
            })
        )
      })
    )

  }

}
