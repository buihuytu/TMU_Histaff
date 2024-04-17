import { Component, OnInit } from '@angular/core';
import { EnumTranslateKey } from 'alpha-global-constants';
import { BaseComponent, MultiLanguageService } from 'ngx-histaff-alpha';
import { map } from 'rxjs';
import { PersonnelCenterService } from '../../personnel-center.service';
import { InsideCompanyService } from './inside-company.service';

@Component({
  selector: 'app-inside-company',
  templateUrl: './inside-company.component.html',
  styleUrls: ['./inside-company.component.scss']
})
export class InsideCompanyComponent extends BaseComponent implements OnInit {

  title: EnumTranslateKey = EnumTranslateKey.UI_COMPONENT_TITLE_PERSONNEL_CENTER_DECISION;
  decisionNo: EnumTranslateKey = EnumTranslateKey.UI_COMPONENT_LABEL_DECISION_DECISIONNO;
  effectDate: EnumTranslateKey = EnumTranslateKey.UI_COMPONENT_LABEL_DECISION_EFFECTDATE;
  orgName: EnumTranslateKey = EnumTranslateKey.UI_COMPONENT_LABEL_DECISION_ORG_NAME;
  expireDate: EnumTranslateKey = EnumTranslateKey.UI_COMPONENT_LABEL_DECISION_EXPIREDATE;
  positionName: EnumTranslateKey = EnumTranslateKey.UI_COMPONENT_LABEL_DECISION_POSITION_NAME;
  signDate: EnumTranslateKey = EnumTranslateKey.UI_COMPONENT_LABEL_DECISION_SIGNDATE;
  lmName: EnumTranslateKey = EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_POSITION_LM;
  signerName: EnumTranslateKey = EnumTranslateKey.UI_COMPONENT_LABEL_DECISION_SIGNERNAME;
  lmPositionName: EnumTranslateKey = EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_POSITION_LM_JOB;
  signerPosition: EnumTranslateKey = EnumTranslateKey.UI_COMPONENT_LABEL_DECISION_SIGNER_POSITION;
  workAddress: EnumTranslateKey = EnumTranslateKey.UI_COMPONENT_LABEL_DECISION_WORKPLACE_NAME;
  statusName: EnumTranslateKey = EnumTranslateKey.UI_COMPONENT_LABEL_DECISION_STATUS;
  employeeOject: EnumTranslateKey = EnumTranslateKey.UI_COMPONENT_LABEL_DECISION_EMPLOYEE_OBJ_NAME;
  note: EnumTranslateKey = EnumTranslateKey.UI_COMPONENT_LABEL_DECISION_NOTE;

  works!: any[];

  employee!: any;
  employeeCv!: any;
  
  constructor(
    private insideCompanyService: InsideCompanyService,
    public override mls: MultiLanguageService,
    private personnelCenterService: PersonnelCenterService
  ) {
    super(mls);
  }

  override ngOnInit(): void {
    this.mls.lang$.subscribe(x => this.lang = x);
    this.subscriptions.push(
      this.personnelCenterService.employee$.subscribe(x => {
        this.employee = x
        this.subscriptions.push(
          this.insideCompanyService.getInsideCompanyByEmployee(x.id)
            .pipe(
              map((works: any) => {
                return works.body.innerBody;
              })
            )
            .subscribe(response => {
              this.works = response;
            })
        )
      })
    )

  }

}
