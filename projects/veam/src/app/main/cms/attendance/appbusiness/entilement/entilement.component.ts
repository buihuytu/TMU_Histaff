import { Component, AfterViewInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { api, EnumTranslateKey } from 'alpha-global-constants';
import { EnumStyleButtonClass,BaseComponent, IAlertOptions, ICoreDropdownOption, ICoreParamControl, EnumCoreButtonVNSCode, IFilterOperator, EnumFilterOperator, IInOperator, ISortItem, EnumSortDirection, ICorePageListCRUD, ICorePageListEditRouting, ICoreTableColumnItem, EnumCoreTablePipeType, MultiLanguageService, AppService, ResponseService, AlertService, OrganizationService, CorePageListService, ICoreButtonVNS, IFormatedResponse, EnumFormBaseContolType, ICorePageListApiDefinition } from "ngx-histaff-alpha";
import { BehaviorSubject, Subscription } from "rxjs";


@Component({
  selector: 'app-entilement',
  templateUrl: './entilement.component.html',
  styleUrls: ['./entilement.component.scss']
})
export class EntilementComponent extends BaseComponent implements AfterViewInit {


  alertOptions: IAlertOptions = {
    autoClose: true,
    keepAfterRouteChange: true
  };
  loading!: boolean;
  orgId!: number;
  salPeriod!: number;
  salaryPeridOptions$ = new BehaviorSubject<ICoreDropdownOption[]>([]);
  atSalaryPeriodGetByIdObject$ = new BehaviorSubject<any>(null);
  atSalaryPeriodGetByIdApi = api.AT_SALARY_PERIOD_READ;
  getByIdObject$!: BehaviorSubject<any>;
  options$!: BehaviorSubject<ICoreDropdownOption[]>;
  paramRows!: ICoreParamControl[][];
  listInstance!: number;
  groupOptionsYear$ = new BehaviorSubject<ICoreDropdownOption[]>([]);
  yearGetByIdObject$ = new BehaviorSubject<any>(null);
  periodGetByIdObject$ = new BehaviorSubject<any>(null);
  shownFrom!: string;
  title = EnumTranslateKey.UI_COMPONENT_TITLE_AT_ENTITLEMENT
  calltotal: EnumTranslateKey = EnumTranslateKey.UI_COMPONENT_BUTTON_AT_ENTITLEMENT_CALL;
  buttonItems: EnumCoreButtonVNSCode[] = [
    EnumCoreButtonVNSCode.NONE_HEADER_SEARCH,
    // EnumCoreButtonVNSCode.HEADER_CALCULATE,
  ];

  headerWrap!: boolean;
  headerFirstRowHeight: number = 50;
  orgIds!: number[];
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
  outerSort: ISortItem[] = [
    {
      field: "jobOrderNum",
      sortDirection: EnumSortDirection.ASC
    }
  ]
  crud: ICorePageListCRUD = {
    deleteIds: api.AT_ENTITLEMENT_DELETE,
  }
  editRoute: ICorePageListEditRouting = {
    auxiliary: 'popupAux'
  }
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
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_AT_ENTITLEMENT_ID,
      field: 'id',
      type: 'number',
      align: 'left',
      width: 10,
      hidden: true
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_AT_ENTITLEMENT_EMPLOYEE_CODE,
      field: 'employeeCode',
      type: 'string',
      align: 'left',
      width: 110,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_AT_ENTITLEMENT_EMPLOYEE_NAME,
      field: 'employeeName',
      type: 'string',
      align: 'left',
      width: 250,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_AT_ENTITLEMENT_TITLE_NAME,
      field: 'positionName',
      type: 'string',
      align: 'left',
      width: 200,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_AT_ENTITLEMENT_ORG_NAME,
      field: 'orgName',
      type: 'string',
      align: 'left',
      width: 200,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_AT_ENTITLEMENT_JOIN_DATE,
      field: 'joinDate',
      type: 'date',
      pipe: EnumCoreTablePipeType.DATE,
      align: 'left',
      width: 150,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_AT_ENTITLEMENT_SENIORITY_MONTH,
      field: 'seniority',
      type: 'string',
      align: 'right',
      width: 100,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_AT_ENTITLEMENT_SENIORITY,
      field: 'seniorityHave',
      type: 'string',
      align: 'right',
      width: 75,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_AT_ENTITLEMENT_LAST_YEAR_LEAVE,
      field: 'prevHave',
      type: 'string',
      align: 'right',
      width: 120,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_AT_ENTITLEMENT_LAST_YEAR_RETIRED,
      field: 'prevUsed',
      type: 'string',
      align: 'right',
      width: 150,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_AT_ENTITLEMENT_LAST_YEAR_DATE,
      field: 'expiredate',
      type: 'date',
      pipe: EnumCoreTablePipeType.DATE,
      align: 'center',
      width: 130,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_AT_ENTITLEMENT_LAST_YEAR_HAVE,
      field: 'prevtotalHave',
      type: 'string',
      align: 'right',
      width: 90,
    },
    /* {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_AT_ENTITLEMENT_THIS_YEAR,
      field: 'qpMonthSum',
      type: 'string',
      align: 'left',
      width: 200,
    }, */
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_AT_ENTITLEMENT_THIS_YEAR_STANDARD,
      field: 'qpStandard',
      type: 'string',
      align: 'right',
      width: 110,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_AT_ENTITLEMENT_X_USE,
      field: 'qpYearXHave',
      type: 'string',
      align: 'right',
      width: 108,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_AT_ENTITLEMENT_REMAINING,
      field: 'totalHave',
      type: 'string',
      align: 'right',
      width: 90,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_AT_ENTITLEMENT_X_HAVE_USE,
      field: 'qpYearXUsed',
      type: 'string',
      align: 'right',
      width: 90,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_AT_ENTITLEMENT_T1_USE,
      field: 'curUsed1',
      type: 'string',
      align: 'right',
      width: 60,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_AT_ENTITLEMENT_T2_USE,
      field: 'curUsed2',
      type: 'string',
      align: 'right',
      width: 60,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_AT_ENTITLEMENT_T3_USE,
      field: 'curUsed3',
      type: 'string',
      align: 'right',
      width: 60,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_AT_ENTITLEMENT_T4_USE,
      field: 'curUsed4',
      type: 'string',
      align: 'right',
      width: 60,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_AT_ENTITLEMENT_T5_USE,
      field: 'curUsed5',
      type: 'string',
      align: 'right',
      width: 60,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_AT_ENTITLEMENT_T6_USE,
      field: 'curUsed6',
      type: 'string',
      align: 'right',
      width: 60,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_AT_ENTITLEMENT_T7_USE,
      field: 'curUsed7',
      type: 'string',
      align: 'right',
      width: 60,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_AT_ENTITLEMENT_T8_USE,
      field: 'curUsed8',
      type: 'string',
      align: 'right',
      width: 60,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_AT_ENTITLEMENT_T9_USE,
      field: 'curUsed9',
      type: 'string',
      align: 'right',
      width: 60,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_AT_ENTITLEMENT_T10_USE,
      field: 'curUsed10',
      type: 'string',
      align: 'right',
      width: 60,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_AT_ENTITLEMENT_T11_USE,
      field: 'curUsed11',
      type: 'string',
      align: 'right',
      width: 60,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_AT_ENTITLEMENT_T12_USE,
      field: 'curUsed12',
      type: 'string',
      align: 'right',
      width: 60,
    },
  ]
  filterOperators!: IFilterOperator[];
  constructor(
    public override mls: MultiLanguageService,
    private appService: AppService,
    private responseService: ResponseService,
    private alertService: AlertService,
    private organizationService: OrganizationService,
    private corePageListService: CorePageListService,
    private route: ActivatedRoute,
  ) {
    super(mls);
    const newOrgIds: number[] = [];
    this.organizationService.status$.value.activeKeys.map(x => newOrgIds.push(Number(x)))
    this.onOrgIdsChange(newOrgIds);
    this.orgId = this.getMin(newOrgIds);
    //this.shownFrom='name',
    this.listInstance = Number(
      this.route.snapshot.paramMap.get('listInstance')!
    );
    //this.shownFrom='name'
    this.onNgModelChangeNumber("year", new Date().getFullYear());
  }
  getMin(numbers: number[]): number {
    if (numbers.length === 0) {
      return 0; // Return undefined if the array is empty.
    }

    let min = numbers[0]; // Assume the first element is the minimum.

    for (let i = 1; i < numbers.length; i++) {
      if (numbers[i] < min) {
        min = numbers[i]; // Update the minimum if a smaller value is found.
      }
    }

    return min;
  }
  onButtonClick(e: ICoreButtonVNS) {
    if (e.code === EnumCoreButtonVNSCode.NONE_HEADER_SEARCH) {
      let eventFilterInOperator: IInOperator[] = [];
      const periodIds: number[] = [];

      const currentOuterInOperators: IInOperator[] = JSON.parse(JSON.stringify(this.outerInOperators));


      periodIds.push(this.salPeriod);
      //--------------------------
      eventFilterInOperator = [
        {
          field: "periodId",
          values: periodIds
        }
      ]
      // lọc những field không trùng với field
      const remainOuterInOperators = currentOuterInOperators.filter(x => !!!(x.field === "periodId" || x.field === "orgId"));

      const newFilter = remainOuterInOperators.concat(eventFilterInOperator);

      // gán lại filter
      this.outerInOperators = this.outerInOperators.filter(x => !!(x.field === "orgId")).concat(newFilter);
    }
    // if(e.code === EnumCoreButtonVNSCode.HEADER_CALCULATE){
    //   this.calculate()
    // }
  }
  corePageHeaderButtonClick(e: ICoreButtonVNS) {
    if (e.code === EnumCoreButtonVNSCode.HEADER_CALCULATE) {
      this.calculate()
    }
  }
  onNgModelChangeNumber = (ngModel: string, value: any) => {

    // console.log('onNgModelChange', ngModel, value);

    let field: string;
    let eventFilterInOperator: IInOperator;
    const newValues: number[] = [];
    field = ngModel;
    newValues.push(Number(value));
    if (ngModel == 'year') {
      if (value != null) {

        this.subscriptions.push(
          this.appService.post(api.AT_SALARY_PERIOD_GET_LIST_IN_YEAR, { year: value }).subscribe(x => {
            if (x.ok && x.status === 200) {
              const body: IFormatedResponse = x.body
              if (body.statusCode === 200) {
                const options: { value: number; text: string }[] = [];
                body.innerBody.map((get: any) => {
                  options.push({
                    value: get.id,
                    text: get.name,
                  });
                });
                this.salaryPeridOptions$.next(options);
                const thisMonth = new Date().getMonth();
                const item = options[thisMonth];
                const thisMonthValue = item.value;
                this.paramRows[0][1].ngModel = thisMonthValue;
                this.onNgModelChangeNumber("periodId", thisMonthValue);
              } else {
                //this.responseService.resolve(body)
              }
            } else {
              //this.alertService.error(JSON.stringify(x), this.alertOptions)
            }
          }
          ))
      }
      else {
        const options: { value: number; text: string }[] = [];
        this.salaryPeridOptions$.next(options);
      }
    } else if (ngModel == "periodId") {
      this.salPeriod = Number(value)
    }

    switch (ngModel) {
      case "year":
        eventFilterInOperator = {
          field,
          values: newValues
        }
        break;
      case "periodId":
        eventFilterInOperator = {
          field,
          values: newValues
        }
        break;
      default:
        return;

    }
    // vì có 2 số nên cần bảo vệ state cũ
    const currentOuterInOperators: IInOperator[] = JSON.parse(JSON.stringify(this.outerInOperators));

    // lọc những field không trùng với field
    const remainOuterInOperators = currentOuterInOperators.filter(x => !!!(x.field === field));

    // thêm lại event vừa xảy ra
    remainOuterInOperators.push(eventFilterInOperator);

    // gán lại filter
    this.outerInOperators = remainOuterInOperators;

    // console.log("new filter", this.outerFilterOperators)
  }
  override ngOnInit(): void {
    this.mls.lang$.subscribe(x => this.lang = x);
    this.subscriptions.push(
      this.appService
        .get(api.AT_SALARY_PERIOD_GET_YEAR)
        .subscribe((res: any) => {

          if (!!res.ok && res.status === 200) {
            const body: IFormatedResponse = res.body
            if (body.statusCode === 200 && !!body.innerBody) {
              // ONLY THEN YOU WILL IMPLEMENT YOUR LOGICS
              const options: { value: number | null; text: string; }[] = [];
              options.push({
                value: Number(),
                text: ''
              })
              res.body.innerBody.map((g: any) => {
                options.push({
                  value: g,
                  text: g
                })
              })
              this.groupOptionsYear$.next(options);

            }
          }
        })
    )
    this.paramRows = [
      [
        {
          flexSize: 3,
          name: 'year',
          ngModel: new Date().getFullYear(),
          ngModelChange: this.onNgModelChangeNumber,
          value: null,
          label: EnumTranslateKey.UI_COMPONENT_TITLE_AT_TIMESHEET_SUMMARY_YEAR,
          controlType: EnumFormBaseContolType.DROPDOWN,
          dropdownOptions$: this.groupOptionsYear$,
          getByIdObject$: this.yearGetByIdObject$,
        },
        {
          flexSize: 3,
          name: 'periodId',
          ngModel: null,
          ngModelChange: this.onNgModelChangeNumber,
          value: null,
          label: EnumTranslateKey.UI_COMPONENT_TITLE_AT_TIMESHEET_SUMMARY_SALARY_PERIOD_ID,
          controlType: EnumFormBaseContolType.DROPDOWN,
          dropdownOptions$: this.salaryPeridOptions$,
          getByIdObject$: this.periodGetByIdObject$,
        },
      ]
    ];
  }
  ngAfterViewInit(): void {
  }
  onInstanceCreated(event: number) {
    this.listInstance = event;
  }
  calculate(): void {
    this.loading = true;
    if (this.orgId == null || this.orgId == 0) {
      this.loading = false;
      return this.alertService.warn(this.mls.trans("UI_COMPONENT_PARAM_AT_ENTITLEMENT_ORG_ID_NULL"), this.alertOptions);
    }
    else if (this.paramRows[0][1].ngModel == null || this.paramRows[0][1].ngModel == 0) {
      this.loading = false;
      return this.alertService.warn(this.mls.trans("UI_COMPONENT_PARAM_AT_ENTITLEMENT_SALARY_PERIOD_ID_NULL"), this.alertOptions);
    }
    this.subscriptions.push(
      this.appService
        .post(api.AT_ENTITLEMENT_CALCULATE, { orgIds: this.orgIds, orgId: this.orgId, periodId: this.paramRows[0][1].ngModel })
        .subscribe((res: any) => {

          this.loading = false;
          if (!!res.ok && res.status === 200) {
            const body: IFormatedResponse = res.body
            if (body.statusCode === 200 && !!body.innerBody) {
              // reload màn hình
              const listInstances = this.corePageListService.instances.filter(
                (y) => y.instanceNumber === this.listInstance
              );
              if (!!listInstances.length) {
                listInstances[0].reloadFlag$.next(
                  !!!listInstances[0].reloadFlag$.value
                );
              }
              // end reload màn hình
              return this.alertService.success(this.mls.trans("UI_COMPONENT_LABEL_AT_ENTITLEMENT_CALCULATE_SUCCESS"), this.alertOptions);
            } else {
              return this.alertService.error(body.messageCode, this.alertOptions);
            }
          }
        })
    )
  }
  apiDefinition: ICorePageListApiDefinition = {
    queryListRelativePath: api.AT_ENTITLEMENT_QUERY_LIST,
  }

  onOrgIdsChange(orgIds: number[]) {

    this.orgIds = orgIds
    this.orgId = this.getMin(orgIds);
    this.outerInOperators = [
      {
        field: 'orgId',
        values: orgIds
      }
    ]
    const buttons: ICoreButtonVNS = {
      code: EnumCoreButtonVNSCode.NONE_HEADER_SEARCH,
      styleClass: EnumStyleButtonClass.NONE_HEADER_CANCEL,
      caption: ""
    };
    // LẤY FILTER HIỆN TẠI
    this.onButtonClick(buttons);
  }
  subsctiptions: Subscription[] = [];
}
