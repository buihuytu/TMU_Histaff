import { Component, OnInit } from '@angular/core';

import { DisciplineService } from './discipline.service';
import { PersonnelCenterService } from '../personnel-center.service';
import { EnumTranslateKey } from 'alpha-global-constants';
import { BaseComponent, MultiLanguageService } from 'ngx-histaff-alpha';
import { map } from 'rxjs';

@Component({
  selector: 'app-discipline',
  templateUrl: './discipline.component.html',
  styleUrls: ['./discipline.component.scss']
})
export class DisciplineComponent extends BaseComponent implements OnInit {

  title: EnumTranslateKey = EnumTranslateKey.UI_COMPONENT_TITLE_DISCIPLINE_EDIT;
  decisionType: EnumTranslateKey = EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_DISCIPLINE_DECISION_TYPE;
  decisionNo: EnumTranslateKey = EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_DISCIPLINE_NO;
  effectDate: EnumTranslateKey = EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_DISCIPLINE_EFFECT_DATE;
  expireDate: EnumTranslateKey = EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_EXPIRE_DATE;
  issuedDate: EnumTranslateKey = EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_DISCIPLINE_ISSUED_DATE;
  disciplineTypeName: EnumTranslateKey = EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_DISCIPLINE_DISCIPLINE_TYPE;
  reason: EnumTranslateKey = EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_DISCIPLINE_REASON;
  note: EnumTranslateKey = EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_FAMILY_NOTE;
  yes: EnumTranslateKey = EnumTranslateKey.UI_COMMON_BOOLEAN_TO_YES;
  no: EnumTranslateKey = EnumTranslateKey.UI_COMMON_BOOLEAN_TO_NO;

  disciplines!: any[];


  headers: EnumTranslateKey = EnumTranslateKey.UI_PERSONNEL_MENU_ITEM_DISCIPLINE;

  employee!: any;
  employeeCv!: any;
  
  constructor(
    private disciplineService: DisciplineService,
    public override mls: MultiLanguageService,
    private personnelCenterService: PersonnelCenterService
  ) {
    super(mls);
  }

  override ngOnInit(): void {
    this.personnelCenterService.leftMenuActiveItemIndex = 6;
    this.personnelCenterService.tabActiveHeader = this.headers;

    this.mls.lang$.subscribe(x => this.lang = x);
    this.subscriptions.push(
      this.personnelCenterService.employee$.subscribe(x => {
        this.employee = x
        this.subscriptions.push(
          this.disciplineService.getDisciplineByEmployee(x.id)
            .pipe(
              map((disciplines: any) => {
                return disciplines.body.innerBody;
              })
            )
            .subscribe(response => {
              this.disciplines = response;
            })
        )
      })
    )

  }

}
