import { Component, OnInit, OnDestroy } from '@angular/core';
import { EnumTranslateKey, api } from 'alpha-global-constants';
import { BaseComponent, ICorePageListApiDefinition, IFilterOperator, EnumFilterOperator, IInOperator, ISortItem, EnumSortDirection, ICorePageListCRUD, ICoreTableColumnItem, EnumCoreTablePipeType, ICorePageListEditRouting, IGenerateTemplateRequest, MultiLanguageService, OrganizationService } from 'ngx-histaff-alpha';
import { BehaviorSubject } from 'rxjs';
@Component({
  selector: 'app-swipedata',
  templateUrl: './swipedata.component.html',
  styleUrls: ['./swipedata.component.scss'],
})
export class SwipeDataComponent extends BaseComponent implements OnInit, OnDestroy {
  /*
  Properties being passed to core-page-list
  */
  title = EnumTranslateKey.UI_COMPONENT_TITLE_SWIPE_DATA;

  outerParam$ = new BehaviorSubject<any>(null);
  datePeriodComparisonFor: string = 'workingDay';
  datePeriodComparisonForLabelKey: EnumTranslateKey =
    EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_WORKING_BEFORE_FROM_DATE_FILTER;
  statusInclusionFor: string = 'statusId';
  statusInclusionForLabelKey: EnumTranslateKey =
    EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_DEMO_ATTACHMENT_STATUS_ID;
  statusOptionsApi: api = api.DEMO_ATTACHMENT_GET_ATTACHMENT_STATUS_LIST;
  apiDefinition: ICorePageListApiDefinition = {
    queryListRelativePath: api.AT_SWIPE_DATA_QUERY_LIST,
  };

  orgIds!: number[];
  outerFilterOperators: IFilterOperator[] = [
    {
      field: 'orgId',
      operator: EnumFilterOperator.EQUAL,
    }
  ]
  outerInOperators: IInOperator[] = [
    {
      field: 'orgId',
      values: this.orgIds || []
    }
  ]

  outerSort: ISortItem[] = [
    {
      field: "jobOrderNum",
      sortDirection: EnumSortDirection.ASC
    }
  ]
  crud: ICorePageListCRUD = {
    deleteIds: api.AT_SWIPE_DATA_QUERY_DELETE_IDS,
  };

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
      align: 'left',
      width: 30,
    },
    {
      caption:
        EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SWIPE_DATA_EMPLOYEE_CODE,
      field: 'emplCode',
      type: 'string',
      align: 'left',
      width: 150,
    },
    {
      caption:
        EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SWIPE_DATA_EMPLOYEE_NAME,
      field: 'emplName',
      type: 'string',
      align: 'left',
      width: 250,
    },
    {
      caption:
        EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SWIPE_DATA_ORGANIZATION_NAME,
      field: 'posName',
      type: 'string',
      align: 'left',
      width: 250,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SWIPE_DATA_TERMINAL,
      field: 'terminalCode',
      type: 'string',
      align: 'left',
      width: 200,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SWIPE_DATA_ITIME_ID,
      field: 'itimeId',
      type: 'string',
      align: 'left',
      width: 200,
    },
    {
      caption:
        EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SWIPE_DATA_ATTENDENCE_DAY,
      field: 'workingDay',
      type: 'date',
      pipe: EnumCoreTablePipeType.DATE,
      align: 'left',
      width: 250,
    },
    {
      caption:
        EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SWIPE_DATA_ATTENDENCE_HOUR,
      field: 'valTime',
      type: 'time',
      pipe: EnumCoreTablePipeType.TIME_HHMM,
      align: 'left',
      width: 200,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SWIPE_DATA_PLACE,
      field: 'addressPlace',
      type: 'string',
      align: 'left',
      width: 250,
    },
  ];

  editRoute: ICorePageListEditRouting = {
    auxiliary: 'popupAux',
  };

  generateTemplateRequest!: IGenerateTemplateRequest;

  constructor(public override mls: MultiLanguageService,
    private organizationService: OrganizationService,
    ) {
    super(mls);
    const newOrgIds: number[] = [];
    this.organizationService.status$.value.activeKeys.map(x => newOrgIds.push(Number(x)))
    this.onOrgIdsChange(newOrgIds)
  }

  override ngOnInit(): void {
    this.mls.lang$.subscribe(x => {
      this.lang = x;
      this.generateTemplateRequest = {
        exCode: 'AT_SWIPE_DATA',
        lang: x
      }
    })
  }

  onOrgIdsChange(orgIds: number[]) {

    this.orgIds = orgIds
    this.outerInOperators = [
      {
        field: 'orgId',
        values: orgIds
      }
    ]
  }

}