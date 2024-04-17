import { Component, AfterViewInit } from "@angular/core";
import { EnumTranslateKey, api } from 'alpha-global-constants';
import { BaseComponent, ICorePageListApiDefinition, ICorePageListCRUD, IInOperator, IFilterOperator, ICoreParamControl, ICoreTableColumnItem, EnumCoreTablePipeType, MultiLanguageService, EnumFormBaseContolType, EnumFilterOperator } from "ngx-histaff-alpha";

@Component({
  selector: 'app-hu-blacklist',
  templateUrl: './hu-blacklist.component.html',
  styleUrl: './hu-blacklist.component.scss'
})

export class HuBlacklistComponent extends BaseComponent implements AfterViewInit {
  title = EnumTranslateKey.UI_COMPONENT_TITLE_HU_BLACKLIST;

  apiDefinition: ICorePageListApiDefinition = {
    queryListRelativePath: api.HU_BLACKLIST_QUERY_LIST,
  }

  crud: ICorePageListCRUD = {
    deleteIds: api.HU_BLACKLIST_DELETE_IDS,
  }

  orgIds!: number[];

  outerInOperators: IInOperator[] = [
    {
      field: 'orgId',
      values: this.orgIds || []
    }
  ];

  outerFilterOperators: IFilterOperator[] = [];

  paramRows!: ICoreParamControl[][];

  columns: ICoreTableColumnItem[] = [
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_HU_COMMEND_EMPLOYEE_CODE,
      field: 'employeeCode',
      type: 'string',
      align: 'left',
      width: 200,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_HU_COMMEND_EMPLOYEE_NAME,
      field: 'employeeName',
      type: 'string',
      align: 'left',
      width: 200,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_INS_HEALTH_INSURANCE_FAMILY_MEMBER_IDENTITY_NO,
      field: 'employeeNo',
      type: 'string',
      align: 'left',
      width: 200,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_STAFF_PROFILE_JOIN_DATE,
      field: 'dateJoin',
      type: 'string',
      align: 'left',
      width: 200,
      pipe: EnumCoreTablePipeType.DATE
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_HU_COMMEND_ORG_NAME,
      field: 'orgName',
      type: 'string',
      align: 'left',
      width: 200,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_PA_AUTHORITY_TAX_YEAR_POSITION_NAME,
      field: 'positionName',
      type: 'string',
      align: 'left',
      width: 200,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_LEAVEJOB_SENDDATE,
      field: 'dateSendForm',
      type: 'string',
      align: 'left',
      width: 200,
      pipe: EnumCoreTablePipeType.DATE
    },
    {
      caption: EnumTranslateKey.UI_HU_BLACKLIST_TERMINATION_DAY,
      field: 'endDateWork',
      type: 'string',
      align: 'left',
      width: 200,
      pipe: EnumCoreTablePipeType.DATE
    },
    {
      caption: EnumTranslateKey.UI_HU_BLACKLIST_LAST_WORKING_DAY,
      field: 'lastWorkingDay',
      type: 'string',
      align: 'left',
      width: 200,
      pipe: EnumCoreTablePipeType.DATE
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_INS_TYPE_IS_ACTIVE,
      field: 'statusName',
      type: 'string',
      align: 'left',
      width: 200,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_TR_PLAN_NOTE,
      field: 'note',
      type: 'string',
      align: 'left',
      width: 200,
    },
    {
      caption: EnumTranslateKey.UI_HU_BLACKLIST_REASON_FOR_BLACKLIST,
      field: 'reasonForBlacklist',
      type: 'string',
      align: 'left',
      width: 200,
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

  override ngOnInit(): void {
    this.paramRows = [
      [
        {
          flexSize: 3,
          name: 'minDateSendForm',
          ngModel: null,
          ngModelChange: this.onNgModelChange,
          value: null,
          label: EnumTranslateKey.UI_COMPONENT_LABEL_LEAVEJOB_SENDDATE_FROM,
          controlType: EnumFormBaseContolType.DATEPICKER,
        },
        {
          flexSize: 3,
          name: 'maxDateSendForm',
          ngModel: null,
          ngModelChange: this.onNgModelChange,
          value: null,
          label: EnumTranslateKey.UI_COMPONENT_LABEL_LEAVEJOB_EFFECTDATE_FILTER_TO,
          controlType: EnumFormBaseContolType.DATEPICKER,
        }
      ],
      [
        {
          flexSize: 3,
          name: 'minLastWorkingDay',
          ngModel: null,
          ngModelChange: this.onNgModelChange,
          value: null,
          label: EnumTranslateKey.UI_COMPONENT_LABEL_LEAVEJOB_LASTDATE_FILTER_FROM,
          controlType: EnumFormBaseContolType.DATEPICKER,
        },
        {
          flexSize: 3,
          name: 'maxLastWorkingDay',
          ngModel: null,
          ngModelChange: this.onNgModelChange,
          value: null,
          label: EnumTranslateKey.UI_COMPONENT_LABEL_LEAVEJOB_LASTDATE_FILTER_TO,
          controlType: EnumFormBaseContolType.DATEPICKER,
        }
      ]
    ];
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

  onNgModelChange = (ngModel: string, value: any) => {
    let field: string;
    let operator: EnumFilterOperator;
    let eventFilterOperator: IFilterOperator;
    
    switch (ngModel) {
      case "minDateSendForm":
        field = "dateSendForm";
        operator = EnumFilterOperator.GREATER_THAN_OR_EQUAL;
        if (value != null) {
          value.setDate(value.getUTCDate());
          value.setUTCHours(0, 0, 0);
        }
        eventFilterOperator = {
          field,
          operator,
          dateTimeValue: value
        }
        break;

      case "maxDateSendForm":
        field = "dateSendForm";
        operator = EnumFilterOperator.LESS_THAN_OR_EQUAL;
        if (value != null) {
          value.setDate(value.getUTCDate());
          value.setUTCHours(23, 59, 59);
        }
        eventFilterOperator = {
          field,
          operator,
          dateTimeValue: value
        }
        break;

      case "minLastWorkingDay":
        field = "lastWorkingDay";
        operator = EnumFilterOperator.GREATER_THAN_OR_EQUAL;
        if (value != null) {
          value.setDate(value.getUTCDate());
          value.setUTCHours(0, 0, 0);
        }
        eventFilterOperator = {
          field,
          operator,
          dateTimeValue: value
        }
        break;

      case "maxLastWorkingDay":
        field = "lastWorkingDay";
        operator = EnumFilterOperator.LESS_THAN_OR_EQUAL;
        if (value != null) {
          value.setDate(value.getUTCDate());
          value.setUTCHours(23, 59, 59);
        }
        eventFilterOperator = {
          field,
          operator,
          dateTimeValue: value
        }
        break;

      default:
        return;

    }

    // vì có 04 date nên cần bảo vệ state cũ
    const currentOuterFilterOperators: IFilterOperator[] = JSON.parse(JSON.stringify(this.outerFilterOperators));

    // lọc những field không trùng với field và operator
    const remainOuterFilterOperators = currentOuterFilterOperators.filter(x => !!!(x.field === field && x.operator === operator));

    // thêm lại event vừa xảy ra
    remainOuterFilterOperators.push(eventFilterOperator);

    this.outerFilterOperators = remainOuterFilterOperators
  }
}