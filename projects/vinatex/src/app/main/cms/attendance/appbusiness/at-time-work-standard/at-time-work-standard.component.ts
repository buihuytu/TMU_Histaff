import { Component, AfterViewInit } from "@angular/core";
import { EnumTranslateKey, api } from 'alpha-global-constants';
import { BaseComponent, ICorePageListApiDefinition, ICorePageListCRUD, IInOperator, ICoreTableColumnItem, MultiLanguageService } from "ngx-histaff-alpha";
@Component({
  selector: 'app-at-time-work-standard',
  templateUrl: './at-time-work-standard.component.html',
  styleUrl: './at-time-work-standard.component.scss'
})

export class AtTimeWorkStandardComponent extends BaseComponent implements AfterViewInit {
  title = EnumTranslateKey.UI_COMPONENT_TITLE_AT_TIME_WORK_STANDARD;

  apiDefinition: ICorePageListApiDefinition = {
    queryListRelativePath: api.AT_TIME_WORK_STANDARD_QUERY_LIST,
  }

  crud: ICorePageListCRUD = {
    deleteIds: api.AT_TIME_WORK_STANDARD_DELETE_IDS,
  }

  orgIds!: number[];

  outerInOperators: IInOperator[] = [
    {
      field: 'orgId',
      values: this.orgIds || []
    }
  ];

  columns: ICoreTableColumnItem[] = [
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_EFFECTIVE_YEAR,
      field: 'effectiveYear',
      type: 'string',
      align: 'left',
      width: 200,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_POSITION_COMPANY,
      field: 'orgName',
      type: 'string',
      align: 'left',
      width: 200,
    },
    {
      caption: EnumTranslateKey.UI_LABEL_TIME_IMPORT_EMPLOYEE_OBJ,
      field: 'objEmployeeName',
      type: 'string',
      align: 'left',
      width: 200,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_WORK_ENVIRONMENT,
      field: 'workEnvironmentName',
      type: 'string',
      align: 'left',
      width: 200,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CONVERSION_COEFFICIENT,
      field: 'coefficient',
      type: 'string',
      align: 'left',
      width: 200,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_AT_ENTITLEMENT_T1_USE,
      field: 't1',
      type: 'string',
      align: 'left',
      width: 100,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_AT_ENTITLEMENT_T2_USE,
      field: 't2',
      type: 'string',
      align: 'left',
      width: 100,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_AT_ENTITLEMENT_T3_USE,
      field: 't3',
      type: 'string',
      align: 'left',
      width: 100,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_AT_ENTITLEMENT_T4_USE,
      field: 't4',
      type: 'string',
      align: 'left',
      width: 100,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_AT_ENTITLEMENT_T5_USE,
      field: 't5',
      type: 'string',
      align: 'left',
      width: 100,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_AT_ENTITLEMENT_T6_USE,
      field: 't6',
      type: 'string',
      align: 'left',
      width: 100,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_AT_ENTITLEMENT_T7_USE,
      field: 't7',
      type: 'string',
      align: 'left',
      width: 100,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_AT_ENTITLEMENT_T8_USE,
      field: 't8',
      type: 'string',
      align: 'left',
      width: 100,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_AT_ENTITLEMENT_T9_USE,
      field: 't9',
      type: 'string',
      align: 'left',
      width: 100,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_AT_ENTITLEMENT_T10_USE,
      field: 't10',
      type: 'string',
      align: 'left',
      width: 100,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_AT_ENTITLEMENT_T11_USE,
      field: 't11',
      type: 'string',
      align: 'left',
      width: 100,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_AT_ENTITLEMENT_T12_USE,
      field: 't12',
      type: 'string',
      align: 'left',
      width: 100,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_HU_EVALUATION_COM_ID,
      field: 'id',
      type: 'number',
      align: 'left',
      hidden: true,
      width: 1,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_HU_EVALUATION_COM_ID,
      field: 'orgId',
      type: 'number',
      align: 'left',
      hidden: true,
      width: 1,
    }
  ]

  constructor(
    public override mls: MultiLanguageService
  ) {
    super(mls);
  }

  ngAfterViewInit(): void {

  }

  onOrgIdsChange(orgIds: number[]) {
    this.orgIds = orgIds;
    this.outerInOperators = [
      {
        field: 'orgId',
        values: orgIds,
      },
    ];
  }
}