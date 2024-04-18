import { Component, OnInit } from '@angular/core';
import { EnumTranslateKey } from 'alpha-global-constants';
import { BaseComponent, MultiLanguageService } from 'ngx-histaff-alpha';
import { map } from 'rxjs';
import { PersonnelCenterService } from '../../personnel-center.service';
import { OutsideCompanyService } from './outside-company.service';

@Component({
  selector: 'app-outside-company',
  templateUrl: './outside-company.component.html',
  styleUrls: ['./outside-company.component.scss']
})
export class OutsideCompanyComponent extends BaseComponent implements OnInit {

  title: EnumTranslateKey = EnumTranslateKey.UI_COMPONENT_TITLE_WORKING_BEFORE_EDIT;
  titleName: EnumTranslateKey = EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_WORKING_BEFORE_TITLE_NAME;
  fromDate: EnumTranslateKey = EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_WORKING_BEFORE_FROM_DATE;
  endDate: EnumTranslateKey = EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_WORKING_BEFORE_END_DATE;
  mainDuty: EnumTranslateKey = EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_WORKING_BEFORE_MAIN_DUTY;
  terReason: EnumTranslateKey = EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_WORKING_BEFORE_TER_REASON;
  yes: EnumTranslateKey = EnumTranslateKey.UI_COMMON_BOOLEAN_TO_YES;
  no: EnumTranslateKey = EnumTranslateKey.UI_COMMON_BOOLEAN_TO_NO;

  works!: any[];

  employee!: any;
  employeeCv!: any;
  
  constructor(
    private outsideCompanyService: OutsideCompanyService,
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
          this.outsideCompanyService.getWorkingBeforeByEmployee(x.id)
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
