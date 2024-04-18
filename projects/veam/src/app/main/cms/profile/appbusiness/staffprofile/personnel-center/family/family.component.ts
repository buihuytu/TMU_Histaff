import { Component, OnInit } from '@angular/core';

import { FamilyService } from './family.service';
import { PersonnelCenterService } from '../personnel-center.service';
import { EnumTranslateKey } from 'alpha-global-constants';
import { BaseComponent, MultiLanguageService } from 'ngx-histaff-alpha';
import { map } from 'rxjs';

@Component({
  selector: 'app-family',
  templateUrl: './family.component.html',
  styleUrls: ['./family.component.scss']
})
export class FamilyComponent extends BaseComponent implements OnInit {

  title: EnumTranslateKey = EnumTranslateKey.UI_COMPONENT_TITLE_FAMILY_EDIT;
  fullname: EnumTranslateKey = EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_FAMILY_FULLNAME;
  birthDate: EnumTranslateKey = EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_FAMILY_BIRTH_DATE;
  idNo: EnumTranslateKey = EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_FAMILY_ID_NO;
  pitCode: EnumTranslateKey = EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_FAMILY_PIT_CODE; 
  deductFrom: EnumTranslateKey = EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_FAMILY_DEDUCT_FROM;
  deductTo: EnumTranslateKey = EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_FAMILY_DEDUCT_TO;
  isHousehold: EnumTranslateKey = EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_FAMILY_IS_HOUSEHOLD;
  isDeduct: EnumTranslateKey = EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_FAMILY_IS_DEDUCT;
  yes: EnumTranslateKey = EnumTranslateKey.UI_COMMON_BOOLEAN_TO_YES;
  no: EnumTranslateKey = EnumTranslateKey.UI_COMMON_BOOLEAN_TO_NO;

  headers: EnumTranslateKey = EnumTranslateKey.UI_PERSONNEL_MENU_ITEM_FAMILY;
  members!: any[];

  employee!: any;
  employeeCv!: any;
  
  constructor(
    private familyService: FamilyService,
    public override mls: MultiLanguageService,
    private personnelCenterService: PersonnelCenterService
  ) {
    super(mls);
  }

  override ngOnInit(): void {
    this.personnelCenterService.leftMenuActiveItemIndex = 7;
    this.personnelCenterService.tabActiveHeader = this.headers;

    this.mls.lang$.subscribe(x => this.lang = x);
    this.subscriptions.push(
      this.personnelCenterService.employee$.subscribe(x => {
        this.employee = x
        this.subscriptions.push(
          this.familyService.getFamilyByEmployee(x.id)
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
