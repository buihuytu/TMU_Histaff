import { Component, OnInit, AfterViewInit } from "@angular/core";
import { EnumTranslateKey, api } from 'alpha-global-constants';
import { BaseComponent, IInOperator, MultiLanguageService, OrganizationService, LayoutService, ICorePageListApiDefinition, ICoreTableColumnItem, IFilterOperator, EnumFilterOperator, ICoreButtonVNS } from "ngx-histaff-alpha";
import { BehaviorSubject } from "rxjs";

@Component({
  selector: "cms-app-orgchart",
  templateUrl: "./orgchart.component.html",
  styleUrls: ["./orgchart.component.scss"],
})
export class OrgChartComponent extends BaseComponent implements OnInit, AfterViewInit {
  title = EnumTranslateKey.UI_COMPONENT_TITLE_ORGCHART

  corePageListHeight!: number;

  jobsTitle = EnumTranslateKey.UI_COMPONENT_TITLE_ORGCHART_JOBS
  employeesTitle = EnumTranslateKey.UI_COMPONENT_TITLE_ORGCHART_EMPLOYEES

  /* tham số lọc cho jobs */
  orgIds!: number[];
  /* tham số lọc cho employees */
  jobId!: number;

  jobOuterInOperators: IInOperator[] = [
    {
      field: 'orgId',
      values: this.orgIds || []
    }
  ]

  employeeOuterParam$ = new BehaviorSubject<any>(null);
  isDeskop!: boolean;

  constructor(
    public override mls: MultiLanguageService,
    private organizationService: OrganizationService,
    private layoutService: LayoutService
  ) {
    super(mls);
    const activeKeys = organizationService.status$.value.activeKeys;
    const newOrgIds: number[] = [];
    activeKeys.map(x => newOrgIds.push(Number(x)))
    this.onOrgIdsChange(newOrgIds);
  }

  override ngOnInit(): void {
    
    this.subscriptions.push(
      this.mls.lang$.subscribe(x => this.lang = x)
    );

    const mainAppHeaderHeight = Number(getComputedStyle(document.documentElement).getPropertyValue('--size-header-height').replace('px', ''))
    const corePaginationHeight = Number(getComputedStyle(document.documentElement).getPropertyValue('--size-core-pagination-height').replace('px', ''))
    this.corePageListHeight = window.innerHeight - mainAppHeaderHeight - corePaginationHeight - 80;

    if(window.innerHeight > 750){
      this.isDeskop = true
    }
  }


  onOrgIdsChange(orgIds: number[]) {

    console.log("onOrgIdsChange", orgIds)

    this.orgIds = orgIds
    this.jobOuterInOperators = [
      {
        field: 'orgId',
        values: orgIds
      }
    ]

    // reset EmployeeListData
    this.jobId = 0;
    this.clearEmployeeListData$.next(true);
  }

  onJobIdChange(jobId: number) {
    this.jobId = jobId
    this.employeeOuterParam$.next({ jobId })
  }

  jobApiDefinition: ICorePageListApiDefinition = {
    queryListRelativePath: api.HU_JOB_QUERY_LIST_FOR_ORG_OVERVIEW,
  }

  empApiDefinition: ICorePageListApiDefinition = {
    queryListRelativePath: api.HU_EMPLOYEE_QUERY_LIST_FOR_ORG_OVERVIEW,
  }

  columnsJob: ICoreTableColumnItem[] = [
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_COMMON_ID,
      field: 'id',
      hidden: true,
      type: 'number',
      align: 'left',
      width: 200,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_OTHERLIST_ORDERS,
      field: 'orders',
      type: 'number',
      align: 'left',
      width: 50,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_JOB_NAMEVN,
      field: 'nameVn',
      type: 'string',
      align: 'left',
      width: 250,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_ORGCHART_QUANTITY,
      field: 'employeeCount',
      type: 'number',
      align: 'right',
      width: 80,
    },

  ]

  columnsEmp: ICoreTableColumnItem[] = [
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_COMMON_ID,
      field: 'id',
      hidden: true,
      type: 'number',
      align: 'right',
      width: 20,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_EMPLOYEE_CODE,
      field: 'code',
      type: 'string',
      align: 'left',
      width: 110,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_EMPLOYEE_FULLNAME,
      field: 'fullname',
      type: 'string',
      align: 'left',
      width: 200,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_POSITION_ORGNAME,
      field: 'orgName',
      type: 'string',
      align: 'left',
      width: 200,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_POSITION_NAME,
      field: 'positionName',
      type: 'string',
      align: 'left',
      width: 200,
    },
  ]

  jobOuterParam$ = new BehaviorSubject<any>(null);
  jobOuterFilterOperators: IFilterOperator[] = [
    {
      field: 'orgId',
      operator: EnumFilterOperator.EQUAL
    }
  ]

  clearEmployeeListData$ = new BehaviorSubject<boolean>(false)

  onCorePageHeaderButtonClick(e: ICoreButtonVNS) {
    console.log("onCorePageHeaderButtonClick e", e)
  }

  ngAfterViewInit(): void {

  }
}