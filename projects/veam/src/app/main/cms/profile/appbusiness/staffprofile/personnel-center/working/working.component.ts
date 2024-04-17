import { Component, OnInit } from '@angular/core';

import { WorkingService } from './working.service';
import { PersonnelCenterService } from '../personnel-center.service';
import { EnumTranslateKey } from 'alpha-global-constants';
import { BaseComponent, MultiLanguageService } from 'ngx-histaff-alpha';
import { map } from 'rxjs';

@Component({
  selector: 'app-working',
  templateUrl: './working.component.html',
  styleUrls: ['./working.component.scss']
})
export class WorkingComponent extends BaseComponent implements OnInit {

  title: EnumTranslateKey = EnumTranslateKey.UI_COMPONENT_TITLE_STAFF_PROFILE_WAGE;
  salaryScaleName: EnumTranslateKey = EnumTranslateKey.UI_COMPONENT_LABEL_BASIC_SALARY_SCALE;
  salaryType: EnumTranslateKey = EnumTranslateKey.UI_COMPONENT_LABEL_WAGE_SALARY_TYPE_NAME;
  salaryRankName: EnumTranslateKey = EnumTranslateKey.UI_COMPONENT_LABEL_BASIC_SALARY_RANGE;
  salaryLevelName: EnumTranslateKey = EnumTranslateKey.UI_COMPONENT_LABEL_BASIC_SALARY_LEVEL;
  decisionNo: EnumTranslateKey = EnumTranslateKey.UI_COMPONENT_LABEL_WAGE_DECISIONNO;
  effectDate: EnumTranslateKey = EnumTranslateKey.UI_COMPONENT_LABEL_WAGE_EFFECTDATE;
  expireDate: EnumTranslateKey = EnumTranslateKey.UI_COMPONENT_LABEL_WAGE_EXPIREDATE;
  shortTempSalary: EnumTranslateKey = EnumTranslateKey.UI_COMPONENT_LABEL_FIXED_SALARY;
  coefficient: EnumTranslateKey = EnumTranslateKey.UI_COMPONENT_LABEL_BASIC_COEFFICIENT;
  salaryScaleDcvName: EnumTranslateKey = EnumTranslateKey.UI_COMPONENT_LABEL_EFFECTIVE_SALARY_SCALE;
  taxTableName: EnumTranslateKey = EnumTranslateKey.UI_COMPONENT_LABEL_WAGE_TAXTABLE;
  salaryRankDcvName: EnumTranslateKey = EnumTranslateKey.UI_COMPONENT_LABEL_EFFECTIVE_ALLOWANCE;
  regionName: EnumTranslateKey = EnumTranslateKey.UI_COMPONENT_LABEL_WAGE_REGION;
  salaryLevelDcvName: EnumTranslateKey = EnumTranslateKey.UI_COMPONENT_LABEL_EFFECTIVE_SALARY;
  salPercent: EnumTranslateKey = EnumTranslateKey.UI_COMPONENT_LABEL_WAGE_SAL_PERCENT;
  coefficientDcv: EnumTranslateKey = EnumTranslateKey.UI_COMPONENT_LABEL_EFFICIENCY_COEFFICIENT;
  yes: EnumTranslateKey = EnumTranslateKey.UI_COMMON_BOOLEAN_TO_YES;
  no: EnumTranslateKey = EnumTranslateKey.UI_COMMON_BOOLEAN_TO_NO;
  note: EnumTranslateKey = EnumTranslateKey.UI_COMPONENT_LABEL_DECISION_NOTE;
  workings!: any[];


  headers: EnumTranslateKey = EnumTranslateKey.UI_PERSONNEL_MENU_ITEM_DISCIPLINE;

  employee!: any;
  employeeCv!: any;
  
  constructor(
    private workingService: WorkingService,
    public override mls: MultiLanguageService,
    private personnelCenterService: PersonnelCenterService
  ) {
    super(mls);
  }

  override ngOnInit(): void {
    this.personnelCenterService.leftMenuActiveItemIndex = 2;
    this.personnelCenterService.tabActiveHeader = this.headers;

    this.mls.lang$.subscribe(x => this.lang = x);
    this.subscriptions.push(
      this.personnelCenterService.employee$.subscribe(x => {
        this.employee = x
        this.subscriptions.push(
          this.workingService.getWorkingByEmployee(x.id)
            .pipe(
              map((workings: any) => {
                return workings.body.innerBody;
              })
            )
            .subscribe(response => {
              this.workings = response;
            })
        )
      })
    )

  }

}
