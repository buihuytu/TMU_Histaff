import { Component, ViewEncapsulation, OnInit, AfterViewInit, OnDestroy, ViewChild, TemplateRef } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { EnumTranslateKey, api } from 'alpha-global-constants';
import { IFilterOperator, EnumFilterOperator, IInOperator, ISortItem, EnumSortDirection, ICorePageListApiDefinition, ICorePageListCRUD, ICoreTableColumnItem, EnumCoreTablePipeType, ICorePageListEditRouting, OrganizationService } from "ngx-histaff-alpha";
import { BehaviorSubject } from "rxjs";


@Component({
  selector: 'cms-profile-insregimes-mng',
  templateUrl: './insregimes-mng.component.html',
  styleUrls: ['./insregimes-mng.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class InsRegimesMngComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('sticker') sticker!: TemplateRef<any>;

  /*
  Properties being passed to core-page-list
  */
  headerFirstRowHeight: number = 50;
  orgIds!: number[];
  outerParam$ = new BehaviorSubject<any>(null);
  
  outerInOperators: IInOperator[] = [
    {
      field: 'orgId',
      values: this.orgIds || [],
    },
  ];
  outerSort: ISortItem[] = [
    {
      field: "jobOrderNum",
      sortDirection: EnumSortDirection.ASC
    }
  ]
  title = EnumTranslateKey.UI_COMPONENT_TITLE_INSURANCE_REGIMES_MNG;
  datePeriodComparisonFor: string = 'startDate';
  datePeriodComparisonForLabelKey: EnumTranslateKey = EnumTranslateKey.UI_LABEL_INSURANCE_REGIMES_START_DATE;
  regimesInclusionFor: string = 'regimeId';
  regimesInclusionForLabelKey: EnumTranslateKey = EnumTranslateKey.UI_LABEL_INSURANCE_REGIMES;
  regimesOptionsApi: api = api.INS_REGIMES_MNG_GET_REGIMES;
  apiDefinition: ICorePageListApiDefinition = {
    queryListRelativePath: api.INS_REGIMES_MNG_QUERY_LIST,
  };

  crud: ICorePageListCRUD = {
    deleteIds: api.INS_REGIMES_MNG_DELETE_IDS,
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
      align: 'right',
      width: 30,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_INS_INFORMATION_CODE,
      field: 'employeeCode',
      type: 'string',
      align: 'left',
      width: 100,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_INS_INFORMATION_NAME,
      field: 'employeeName',
      type: 'string',
      align: 'left',
      width: 150,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_INS_INFORMATION_POSITION_NAME,
      field: 'positionName',
      type: 'string',
      align: 'left',
      width: 300,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_INS_INFORMATION_ORG_NAME,
      field: 'orgName',
      type: 'string',
      align: 'left',
      width: 250,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_INS_INFORMATION_BIRTH_DATE,
      field: 'birthDate',
      type: 'date',
      pipe: EnumCoreTablePipeType.DATE,
      align: 'left',
      width: 120,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_INS_INFORMATION_BIRTH_PLACE,
      field: 'birthPlace',
      type: 'string',
      align: 'left',
      width: 150,
    },
    {
      caption: EnumTranslateKey.UI_LABEL_INSURANCE_REGIMES,
      field: 'regimeName',
      type: 'string',
      align: 'left',
      width: 250,
    },
    {
      caption: EnumTranslateKey.UI_LABEL_INSURANCE_REGIMES,
      field: 'regimeId',
      type: 'string',
      align: 'left',
      hidden: true,
      width: 250,
    },
    {
      caption: EnumTranslateKey.UI_LABEL_INSURANCE_REGIMES_START_DATE,
      field: 'startDate',
      type: 'date',
      align: 'center',
      pipe: EnumCoreTablePipeType.DATE,
      width: 140,
    },
    {
      caption: EnumTranslateKey.UI_LABEL_INSURANCE_REGIMES_END_DATE,
      field: 'endDate',
      type: 'date',
      align: 'center',
      pipe: EnumCoreTablePipeType.DATE,
      width: 140,
    },
    {
      caption: EnumTranslateKey.UI_LABEL_INSURANCE_REGIMES_DAY_CALCULATOR,
      field: 'dayCalculator',
      type: 'string',
      align: 'center',
      width: 100,
    },
    {
      caption: EnumTranslateKey.UI_LABEL_INSURANCE_REGIMES_ACCUMULATE_DAY,
      field: 'accumulateDay',
      type: 'string',
      align: 'center',
      width: 120,
    },
    {
      caption: EnumTranslateKey.UI_LABEL_INSURANCE_REGIMES_CHILDREN_NO,
      field: 'childrenNo',
      type: 'string',
      align: 'center',
      width: 100,
    },
    {
      caption: EnumTranslateKey.UI_LABEL_INSURANCE_REGIMES_AVERAGE_SAL_SIX_MONTH,
      field: 'averageSalSixMonth',
      type: 'number',
      align: 'right',
      pipe: EnumCoreTablePipeType.NUMBER,
      width: 165,
    },
    {
      caption: EnumTranslateKey.UI_LABEL_INSURANCE_REGIMES_BHXH_SALARY,
      field: 'bhxhSalary',
      type: 'number',
      align: 'right',
      pipe: EnumCoreTablePipeType.NUMBER,
      width: 170,
    },
    {
      caption: EnumTranslateKey.UI_LABEL_INSURANCE_REGIMES_REGIME_SALARY,
      field: 'regimeSalary',
      type: 'number',
      align: 'left',
      pipe: EnumCoreTablePipeType.NUMBER,
      width: 200,
    },
    {
      caption: EnumTranslateKey.UI_LABEL_INSURANCE_REGIMES_SUBSIDY_AMOUNT_CHANGE,
      field: 'subsidyAmountChange',
      type: 'number',
      align: 'left',
      pipe: EnumCoreTablePipeType.NUMBER,
      width: 200,
    },
    {
      caption: EnumTranslateKey.UI_LABEL_INSURANCE_REGIMES_SUBSIDY_MONEY_ADVANCE,
      field: 'subsidyMoneyAdvance',
      type: 'number',
      align: 'left',
      pipe: EnumCoreTablePipeType.NUMBER,
      width: 200,
    },
    {
      caption: EnumTranslateKey.UI_LABEL_INSURANCE_REGIMES_DECLARE_DATE,
      field: 'declareDate',
      type: 'date',
      pipe: EnumCoreTablePipeType.DATE,
      align: 'left',
      width: 100,
    },
    {
      caption: EnumTranslateKey.UI_LABEL_INSURANCE_REGIMES_MNG_STATUS,
      field: 'status',
      type: 'string',
      align: 'cemter',
      width: 130,
    },
    {
      caption: EnumTranslateKey.UI_LABEL_INSURANCE_REGIMES_DATE_CALCULATOR,
      field: 'dateCalculator',
      type: 'date',
      pipe: EnumCoreTablePipeType.DATE,
      align: 'center',
      width: 100,
    },
    {
      caption: EnumTranslateKey.UI_LABEL_INSURANCE_REGIMES_INS_PAY_AMOUNT,
      field: 'insPayAmount',
      type: 'number',
      align: 'right',
      pipe: EnumCoreTablePipeType.NUMBER,
      width: 150,
    },
    {
      caption: EnumTranslateKey.UI_LABEL_INSURANCE_REGIMES_PAY_APPROVE_DATE,
      field: 'payApproveDate',
      type: 'date',
      pipe: EnumCoreTablePipeType.DATE,
      align: 'center',
      width: 120,
    },
    {
      caption: EnumTranslateKey.UI_LABEL_INSURANCE_REGIMES_APPROV_DAY_NUM,
      field: 'approvDayNum',
      type: 'string',
      align: 'center',
      width: 130,
    },
    {
      caption: EnumTranslateKey.UI_LABEL_INSURANCE_REGIMES_MNG_NOTE,
      field: 'note',
      type: 'string',
      align: 'left',
      width: 150,
    },


  ];

  editRoute: ICorePageListEditRouting = {
    auxiliary: 'popupAux',
  };
  constructor(private organizationService: OrganizationService, private router: Router, private route: ActivatedRoute) {
    const newOrgIds: number[] = [];
    this.organizationService.status$.value.activeKeys.map((x) => newOrgIds.push(Number(x)));
    this.onOrgIdsChange(newOrgIds);
  }

  ngOnInit(): void { }

  onRowDoubleClick(e: any) {
    this.router.navigate([btoa(e.id.toString())], { relativeTo: this.route });
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      const stickerFilter = this.columns.filter(c => c.field === 'status');
      if (!!stickerFilter.length) stickerFilter[0].templateRef = this.sticker;
    })
  }
  ngOnDestroy(): void { }

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
