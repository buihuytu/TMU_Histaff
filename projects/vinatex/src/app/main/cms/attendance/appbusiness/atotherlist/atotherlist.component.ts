import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { EnumTranslateKey, api } from 'alpha-global-constants';
import { BaseComponent, ICorePageListApiDefinition, ICorePageListEditRouting, ICorePageListCRUD, ICoreTableColumnItem, EnumCoreTablePipeType } from 'ngx-histaff-alpha';

@Component({
  selector: 'app-atotherlist',
  templateUrl: './atotherlist.component.html',
  styleUrls: ['./atotherlist.component.scss']
})
export class AtotherlistComponent extends BaseComponent implements OnInit {
  @ViewChild('isEntireYear') isEntireYear!: TemplateRef<any>;
  @ViewChild('sticker') sticker!: TemplateRef<any>;

  title = EnumTranslateKey.UI_COMPONENT_TITLE_AT_ORTHERLIST;
  checkboxTemplate!: TemplateRef<any>;


  apiDefinition: ICorePageListApiDefinition = {
    queryListRelativePath: api.AT_OTHER_LIST_QUERY_LIST,
  };

  editRoute: ICorePageListEditRouting = {
    auxiliary: 'popupAux',
  };

  crud: ICorePageListCRUD = {
    deleteIds: api.AT_OTHER_LIST_DELETE_IDS,
    toggleActiveIds: api.AT_OTHER_LIST_TOGGLER_ACTIVE_IDS

  };
  columns: ICoreTableColumnItem[] = [
    {
      caption: 'ContractType.ID',
      field: 'id',
      hidden: true,
      type: 'number',
      align: 'left',
      width: 200,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_AT_OTHER_LIST_IS_STATUS,
      field: 'statusName',
      type: 'string',
      align: 'center',
      width: 130,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_AT_OTHER_LIST_EFFECT_DATE,
      field: 'effectiveDateString',
      type: 'string',
      align: 'left',
      hidden: true,
      width: 160,
      //pipe: EnumCoreTablePipeType.DATE,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_AT_OTHER_LIST_EFFECT_DATE,
      field: 'effectDate',
      type: 'string',
      align: 'left',
      width: 160,
      pipe: EnumCoreTablePipeType.DATE
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_AT_OTHER_LIST_EXPIRATION_DATE,
      field: 'expirationDate',
      type: 'string',
      align: 'left',
      width: 160,
      pipe: EnumCoreTablePipeType.DATE
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_AT_OTHER_LIST_IS_ENTITE_YEAR,
      field: 'isEntireYear',
      type: 'bool',
      align: 'center',
      width: 160,
      pipe: EnumCoreTablePipeType.BOOLEAN_TO_TRUE_FALSE,
      readonly: true,
      templateRef: this.checkboxTemplate
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_AT_OTHER_LIST_MAX_WORKING_MONTH,
      field: 'maxWorkingMonth',
      type: 'string',
      align: 'left',
      width: 250,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_AT_OTHER_LIST_MAX_WORKING_YEAR,
      field: 'maxWorkingYear',
      type: 'string',
      align: 'left',
      width: 250,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_AT_OTHER_LIST_OVERTIME_DAY_WEEKDAY,
      field: 'overtimeDayWeekday',
      type: 'string',
      align: 'left',
      width: 300,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_AT_OTHER_LIST_OVERTIME_DAY_HOLIDAY,
      field: 'overtimeDayHoliday',
      type: 'string',
      align: 'left',
      width: 300,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_AT_OTHER_LIST_OVERTIME_DAY_OFF,
      field: 'overtimeDayOff',
      type: 'string',
      align: 'left',
      width: 300,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_AT_OTHER_LIST_OVERTIME_NIGHT_WEEKDAY,
      field: 'overtimeNightWeekday',
      type: 'string',
      align: 'left',
      width: 300,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_AT_OTHER_LIST_OVERTIME_NIGHT_HOLIDAY,
      field: 'overtimeNightHoliday',
      type: 'string',
      align: 'left',
      width: 300,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_AT_OTHER_LIST_OVERTIME_NIGHT_OFF,
      field: 'overtimeDayOff',
      type: 'string',
      align: 'left',
      width: 300,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_AT_OTHER_LIST_SELT_DEDUCTION_AMOUNT,
      field: 'selfDeductionAmount',
      type: 'string',
      align: 'left',
      width: 300,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_AT_OTHER_LIST_PERSONAL_DEDUCTION_AMOUNT,
      field: 'personalDeductionAmount',
      type: 'string',
      align: 'left',
      width: 300,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_AT_OTHER_LIST_BASE_SALARY,
      field: 'baseSalary',
      type: 'string',
      align: 'left',
      width: 300,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_AT_OTHER_LIST_WORKDAY_UNIT_PRICE,
      field: 'workdayUnitPrice',
      type: 'string',
      align: 'left',
      width: 300,
    },
    
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_AT_OTHER_LIST_NOTE,
      field: 'note',
      type: 'string',
      align: 'left',
      width: 200,
    },
  ]
  ngAfterViewInit():void{
    this.columns.filter(c => c.field === 'isEntireYear')[0].templateRef = this.isEntireYear,
    this.columns.filter((c) => c.field === 'statusName')[0].templateRef = this.sticker

  }
}
