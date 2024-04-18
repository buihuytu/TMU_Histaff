import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { api, EnumTranslateKey } from 'alpha-global-constants';
import { BaseComponent, EnumCoreTablePipeType, EnumSortDirection, ICorePageListApiDefinition, ICorePageListCRUD, ICorePageListEditRouting, ICoreTableColumnItem, IInOperator, ISortItem, MultiLanguageService } from 'ngx-histaff-alpha';

import { BehaviorSubject, Subscription } from "rxjs";


@Component({
  selector: 'app-approve-working-before',
  templateUrl: './approve-working-before.component.html',
  styleUrls: ['./approve-working-before.component.scss']
})
export class ApproveWorkingBeforeComponent extends BaseComponent implements OnInit {

  @ViewChild('reasonChange') reasonChange!: TemplateRef<any>;
  reasonChangeTemplateRef!: TemplateRef<any>;
  checkboxTemplate!: TemplateRef<any>;
  apiDefinition: ICorePageListApiDefinition = {
    queryListRelativePath: api.HU_EVALUATE_QUERY_LIST_WORKING_BEFORE,
  };
  showDialog!: boolean;
  title: EnumTranslateKey = EnumTranslateKey.UI_COMPONENT_TITLE_APPROVE_WORKING_BEFORE;
  corePageListInstanceNumber!: number;
  selectedIds: string[] | number[] = [];
  subsctiptions: Subscription[] = [];
  salPeriod!: number;
  orgIds: number[] = [];

  outerParam$ = new BehaviorSubject<any>(null);

  outerInOperators: IInOperator[] = [
    {
      field: 'orgId',
      values: this.orgIds || []
    }
  ];
  outerSort: ISortItem[] = [
    {
      field: "jobOrderNum",
      sortDirection: EnumSortDirection.ASC
    }
  ]
  columns: ICoreTableColumnItem[] = [
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_LEAVEJOB_EFFECTDATE,
      field: 'jobOrderNum',
      type: 'string',
      align: 'center',
      hidden: true,
      width: 0,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_COMMON_ID,
      field: 'id',
      hidden: true,
      type: 'number',
      align: 'right',
      width: 30
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_APPROVE_SEND_DATE_WORKING_BEFORE,
      field: 'createdDate',
      type: 'date',
      align: 'center',
      pipe: EnumCoreTablePipeType.DATE,
      width: 110
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_APPROVE_REASON_WORKING_BEFORE,
      field: 'reasonChange',
      type: 'string',
      align: 'left',
      width: 250,
      templateRef: this.reasonChangeTemplateRef
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_APPROVE_STATUS_WORKING_BEFORE,
      field: 'isApproveName',
      type: 'string',
      align: 'left',
      hidden: true,
      width: 150
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_WORKING_BEFORE_EMPLOYEE_CODE,
      field: 'employeeCode',
      type: 'string',
      align: 'left',
      width: 100
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_WORKING_BEFORE_EMPLOYEE_NAME,
      field: 'employeeName',
      type: 'string',
      align: 'left',
      width: 250
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_WORKING_BEFORE_POSITION_NAME,
      field: 'positionName',
      type: 'string',
      align: 'left',
      width: 200
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_WORKING_BEFORE_ORG_NAME,
      field: 'orgName',
      type: 'string',
      align: 'left',
      width: 200
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_WORKING_BEFORE_FROM_DATE,
      field: 'fromDate',
      type: 'date',
      pipe: EnumCoreTablePipeType.DATE,
      align: 'center',
      width: 100,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_WORKING_BEFORE_END_DATE,
      field: 'endDate',
      type: 'date',
      pipe: EnumCoreTablePipeType.DATE,
      align: 'center',
      width: 100,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_WORKING_BEFORE_MAIN_DUTY,
      field: 'mainDuty',
      type: 'string',
      align: 'left',
      width: 150
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_WORKING_BEFORE_COMPANY_NAME,
      field: 'companyName',
      type: 'string',
      align: 'left',
      width: 400
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_WORKING_BEFORE_TITLE_NAME,
      field: 'titleName',
      type: 'string',
      align: 'left',
      width: 350
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_WORKING_BEFORE_SENIORITY,
      field: 'seniority',
      type: 'string',
      align: 'left',
      width: 100
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_WORKING_BEFORE_TER_REASON,
      field: 'terReason',
      type: 'string',
      align: 'left',
      width: 200
    },
  ]

  editRoute: ICorePageListEditRouting = {
    auxiliary: 'popupAux',
  };
  crud: ICorePageListCRUD = {
    //deleteIds: api.HU_EVALUATE_DELETE_IDS,
    toggleApproveIds: api.HU_EVALUATE_APPROVE_IDS,
    toggleUnapproveIds: api.HU_EVALUATE_APPROVE_IDS
  };

  constructor(
    public override mls: MultiLanguageService,
  ) {
    super(mls);
  }
  override ngOnInit(): void {
    this.subscriptions.push(
      this.mls.lang$.subscribe((x) => (this.lang = x)));
  }
  ngAfterViewInit(): void {
    this.columns.filter((c) => c.field === 'reasonChange')[0].templateRef = this.reasonChange;
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

