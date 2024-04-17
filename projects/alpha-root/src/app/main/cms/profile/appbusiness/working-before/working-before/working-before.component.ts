import { Component, OnInit, OnDestroy } from "@angular/core";
import { EnumTranslateKey, api } from 'alpha-global-constants';
import { BaseComponent, ISortItem, EnumSortDirection, IGenerateTemplateRequest, IFilterOperator, EnumFilterOperator, IInOperator, ICorePageListApiDefinition, ICorePageListCRUD, ICoreTableColumnItem, EnumCoreTablePipeType, ICorePageListEditRouting, OrganizationService, MultiLanguageService } from "ngx-histaff-alpha";
import { BehaviorSubject } from "rxjs";

@Component({
  selector: "cms-app-working-before",
  templateUrl: "./working-before.component.html",
  styleUrls: ["./working-before.component.scss"],
})
export class WorkingBeforeComponent extends BaseComponent implements OnInit, OnDestroy {

  /*
  Properties being passed to core-page-list
  */
  title = EnumTranslateKey.UI_COMPONENT_TITLE_WORKING_BEFORE;
  orgIds!: number[];
  outerSort: ISortItem[] = [
    {
      field: "jobOrderNum",
      sortDirection: EnumSortDirection.ASC
    }
  ]
  generateTemplateRequest!: IGenerateTemplateRequest;

  outerParam$ = new BehaviorSubject<any>(null);
  outerFilterOperators: IFilterOperator[] = [
    {
      field: 'orgId',
      operator: EnumFilterOperator.EQUAL
    }
  ]
  outerInOperators: IInOperator[] = [
    {
      field: 'orgId',
      values: this.orgIds || []
    }
  ]
  datePeriodComparisonFor: string = 'fromDate';
  datePeriodComparisonForLabelKey: EnumTranslateKey = EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_WORKING_BEFORE_FROM_DATE_FILTER;
  statusInclusionFor: string = 'employeeStatus';
  statusInclusionForLabelKey: EnumTranslateKey = EnumTranslateKey.UI_CORE_PARAMS_EMPLOYEE_STATUS_IN;
  statusOptionsApi: api = api.HU_EMPLOYEE_CV_GET_EMPLOYEE_STATUS_LIST;
  apiDefinition: ICorePageListApiDefinition = {
    queryListRelativePath: api.HU_WORKING_BEFORE_QUERY_LIST,
  }
  
  crud: ICorePageListCRUD = {
    deleteIds: api.HU_WORKING_BEFORE_DELETE_IDS
  }
  
  columns: ICoreTableColumnItem[] = [
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_COMMON_ID,
      field: 'id',
      hidden: true,
      type: 'number',
      align: 'right',
      width: 30
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_WORKING_BEFORE_EMPLOYEE_CODE,
      field: 'employeeCode',
      type: 'string',
      align: 'left',
      width: 80
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
      width: 250
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_WORKING_BEFORE_ORG_NAME,
      field: 'orgName',
      type: 'string',
      align: 'left',
      width: 180
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
    // {
    //   caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_WORKING_BEFORE_MAIN_DUTY,
    //   field: 'mainDuty',
    //   type: 'string',
    //   align: 'left',
    //   width: 150
    // },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_WORKING_BEFORE_COMPANY_NAME,
      field: 'companyName',
      type: 'string',
      align: 'left',
      width: 350
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_WORKING_BEFORE_TITLE_NAME,
      field: 'titleName',
      type: 'string',
      align: 'left',
      width: 250
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
      width: 150
    }
  ]

  onOrgIdsChange(orgIds: number[]) {
    this.orgIds = orgIds
    this.outerInOperators = [
      {
        field: 'orgId',
        values: orgIds
      }
    ]
  }
  editRoute: ICorePageListEditRouting = {
    auxiliary: 'popupAux'
  }
  constructor( 
    private organizationService: OrganizationService,
    public override mls: MultiLanguageService
    ) {
    super(mls);
    const newOrgIds: number[] = [];
    this.organizationService.status$.value.activeKeys.map(x => newOrgIds.push(Number(x)))
    this.onOrgIdsChange(newOrgIds)}

  override ngOnInit(): void {
    this.mls.lang$.subscribe(x => {
      this.lang = x;
      this.generateTemplateRequest = {
        exCode: 'HU_WORKING_BEFORE',
        lang: x
      }
    })
  }

  override ngOnDestroy(): void {
  }

}
