import { Component, AfterViewInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { api, EnumTranslateKey } from 'alpha-global-constants';
import { BaseComponent, IAlertOptions, EnumCoreButtonVNSCode, ICoreDropdownOption, IFilterOperator, EnumFilterOperator, IInOperator, ISortItem, EnumSortDirection, ICorePageListCRUD, ICoreTableColumnItem, EnumCoreTablePipeType, MultiLanguageService, OrganizationService, AppService, ResponseService, AlertService, CorePageListService, DialogService, ICorePageListApiDefinition, ICoreParamControl, IFormatedResponse, EnumFormBaseContolType, ICoreButtonVNS, CoreButtonGroupService, ICoreButtonGroupStatus } from "ngx-histaff-alpha";
import { Subscription, BehaviorSubject, filter } from "rxjs";
@Component({
  selector: 'app-timesheet-summary',
  templateUrl: './timesheet-summary.component.html',
  styleUrls: ['./timesheet-summary.component.scss']
})
export class TimesheetSummaryComponent extends BaseComponent implements AfterViewInit {

  override subscriptions: Subscription[] = [];
  alertOptions: IAlertOptions = {
    autoClose: true,
    keepAfterRouteChange: true,
    timeClose: 10000
  };
  listInstance!: number;

  pendingAction!: EnumCoreButtonVNSCode;


  buttonGroupStatus!: ICoreButtonGroupStatus;

  orgId!: number;
  salaryPeridOptions$ = new BehaviorSubject<ICoreDropdownOption[]>([]);
  groupOptionsYear$ = new BehaviorSubject<ICoreDropdownOption[]>([]);
  atSalaryPeriodGetByIdObject$ = new BehaviorSubject<any>(null);
  atSalaryPeriodGetByIdApi = api.AT_SALARY_PERIOD_READ;
  yearGetByIdObject$ = new BehaviorSubject<any>(null);
  periodGetByIdObject$ = new BehaviorSubject<any>(null);
  shownFrom!: string;
  getByIdObject$!: BehaviorSubject<any>;
  options$!: BehaviorSubject<ICoreDropdownOption[]>;
  loading!: boolean;
  title = EnumTranslateKey.UI_COMPONENT_TITLE_AT_TIMESHEET_SUMMARY;
  headerWrap!: boolean;
  headerFirstRowHeight: number = 50;
  orgIds!: number[];
  mustBeHidden!: any[];
  outerParam$ = new BehaviorSubject<any>(null);

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

  // Sắp xếp lưới hiển thị theo cấp chức danh
  outerSort: ISortItem[] = [

    {
      field: "orgOrderNum",
      sortDirection: EnumSortDirection.ASC
    },
    {
      field: "jobOrderNum",
      sortDirection: EnumSortDirection.ASC
    },
    {
      field: "positionId",
      sortDirection: EnumSortDirection.ASC
    },
    {
      field: "employeeCode",
      sortDirection: EnumSortDirection.ASC
    }
  ]

  buttonItems: EnumCoreButtonVNSCode[] = [
    EnumCoreButtonVNSCode.NONE_HEADER_SEARCH,
  ];

  crud: ICorePageListCRUD = {
    deleteIds: api.AT_OVERTIME_DELETE_IDS,
  }
  columns: ICoreTableColumnItem[] = [
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_AT_TIMESHEET_SUMMARY_ID,
      field: 'id',
      type: 'number',
      align: 'left',
      width: 10,
      hidden: true
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_AT_TIMESHEET_SUMMARY_ID,
      field: 'positionId',
      type: 'number',
      align: 'left',
      width: 10,
      hidden: true
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_AT_TIMESHEET_SUMMARY_EMPLOYEE_CODE,
      field: 'employeeCode',
      type: 'string',
      align: 'left',
      width: 90,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_AT_TIMESHEET_SUMMARY_EMPLOYEE_NAME,
      field: 'employeeName',
      type: 'string',
      align: 'left',
      width: 160,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_AT_TIMESHEET_SUMMARY_TITLE_NAME,
      field: 'positionName',
      type: 'string',
      align: 'left',
      width: 250,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_AT_TIMESHEET_SUMMARY_ORG_NAME,
      field: 'orgName',
      type: 'string',
      align: 'left',
      width: 200,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_AT_TIMESHEET_SUMMARY_OBJ_EMP_NAME,
      field: 'objEmpName',
      type: 'string',
      align: 'left',
      width: 200,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_AT_TIMESHEET_SUMMARY_PERIOD_STANDARD,
      field: 'workingStandard',
      type: 'string',
      align: 'right',
      width: 100,
      pipe: EnumCoreTablePipeType.NUMBER
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_AT_TIMESHEET_SUMMARY_WORKING_X,
      field: 'totalWorkingXj',
      type: 'string',
      align: 'right',
      width: 100,
      pipe: EnumCoreTablePipeType.NUMBER
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_AT_TIMESHEET_SUMMARY_MIN_LATE,
      field: 'totalLate',
      type: 'string',
      align: 'right',
      width: 70,
      pipe: EnumCoreTablePipeType.NUMBER,

    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_AT_TIMESHEET_SUMMARY_LATE_TIME,
      field: 'totalDmPhat',
      type: 'string',
      align: 'right',
      width: 70,
      pipe: EnumCoreTablePipeType.NUMBER
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_AT_TIMESHEET_SUMMARY_MIN_COMEBACKOUT,
      field: 'totalComebackout',
      type: 'string',
      align: 'right',
      width: 75,
      pipe: EnumCoreTablePipeType.NUMBER
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_AT_TIMESHEET_SUMMARY_COMEBACKOUT_TIME,
      field: 'totalVsPhat',
      type: 'string',
      align: 'right',
      width: 65,
      pipe: EnumCoreTablePipeType.NUMBER
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_AT_TIMESHEET_SUMMARY_WORKING_RO,
      field: 'workingRo',
      type: 'string',
      align: 'right',
      width: 150,
      pipe: EnumCoreTablePipeType.NUMBER
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_AT_TIMESHEET_SUMMARY_WORKING_H,
      field: 'workingH',
      type: 'string',
      align: 'right',
      width: 100,
      pipe: EnumCoreTablePipeType.NUMBER
    },
    // {
    //   caption: EnumTranslateKey.UI_COMPONENT_LABEL_AT_TIMESHEET_SUMMARY_WORKING_LCB,
    //   field: 'workingLcb',
    //   type: 'string',
    //   align: 'left',
    //   width: 150,
    //   pipe:EnumCoreTablePipeType.NUMBER
    // },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_AT_TIMESHEET_SUMMARY_WORKING_L,
      field: 'workingL',
      type: 'string',
      align: 'right',
      width: 90,
      pipe: EnumCoreTablePipeType.NUMBER
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_AT_TIMESHEET_SUMMARY_WORKING_P,
      field: 'workingP',
      type: 'string',
      align: 'right',
      width: 125,
      pipe: EnumCoreTablePipeType.NUMBER
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_AT_TIMESHEET_SUMMARY_WORKING_O,
      field: 'workingO',
      type: 'string',
      align: 'right',
      width: 250,
      pipe: EnumCoreTablePipeType.NUMBER,
      hidden: true,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_AT_TIMESHEET_SUMMARY_TOTAL_CT,
      field: 'totalWorkingCt',
      type: 'string',
      align: 'right',
      width: 150,
      pipe: EnumCoreTablePipeType.NUMBER,
      hidden: true,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_AT_TIMESHEET_SUMMARY_WORKING_CT,
      field: 'workingCt',
      type: 'string',
      align: 'right',
      width: 100,
      pipe: EnumCoreTablePipeType.NUMBER,
    },
    // {
    //   caption: EnumTranslateKey.UI_COMPONENT_LABEL_AT_TIMESHEET_SUMMARY_WORKING_CTN,
    //   field: 'workingCtn',
    //   type: 'string',
    //   align: 'left',
    //   width: 250,
    //   pipe:EnumCoreTablePipeType.NUMBER
    // },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_AT_TIMESHEET_SUMMARY_WORKING_TS,
      field: 'workingTs',
      type: 'string',
      align: 'right',
      width: 120,
      pipe: EnumCoreTablePipeType.NUMBER
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_AT_TIMESHEET_SUMMARY_WORKING_D,
      field: 'workingD',
      type: 'string',
      align: 'right',
      width: 100,
      pipe: EnumCoreTablePipeType.NUMBER
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_AT_TIMESHEET_SUMMARY_TOTAL_OT_WEEKDAY,
      field: 'totalOtWeekday',
      type: 'string',
      align: 'right',
      width: 240,
      pipe: EnumCoreTablePipeType.NUMBER
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_AT_TIMESHEET_SUMMARY_TOTAL_OT_SUNDAY,
      field: 'totalOtSunday',
      type: 'string',
      align: 'right',
      width: 240,
      pipe: EnumCoreTablePipeType.NUMBER
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_AT_TIMESHEET_SUMMARY_TOTAL_OT_HOLIDAY,
      field: 'totalOtHoliday',
      type: 'string',
      align: 'right',
      width: 240,
      pipe: EnumCoreTablePipeType.NUMBER
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_AT_TIMESHEET_SUMMARY_TOTAL_OT_WEEKNIGHT,
      field: 'totalOtWeeknight',
      type: 'string',
      align: 'right',
      width: 240,
      pipe: EnumCoreTablePipeType.NUMBER
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_AT_TIMESHEET_SUMMARY_TOTAL_OT_SUNDAYNIGTH,
      field: 'totalOtSundaynigth',
      type: 'string',
      align: 'right',
      width: 240,
      pipe: EnumCoreTablePipeType.NUMBER
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_AT_TIMESHEET_SUMMARY_TOTAL_OT_HOLIDAY_NIGTH,
      field: 'totalOtHolidayNigth',
      type: 'string',
      align: 'right',
      width: 240,
      pipe: EnumCoreTablePipeType.NUMBER
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_COMMON_JOB_ORDER_NUM,
      field: 'jobOrderNum',
      type: 'string',
      align: 'right',
      width: 0,
      hidden: true,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_COMMON_JOB_ORDER_NUM,
      field: 'orgOrderNum',
      type: 'string',
      align: 'right',
      width: 0,
      hidden: true,
    },
  ]

  constructor(
    public override mls: MultiLanguageService,
    private organizationService: OrganizationService,
    private appService: AppService,
    private responseService: ResponseService,
    private alertService: AlertService,
    private corePageListService: CorePageListService,
    private route: ActivatedRoute,
    private dialogService: DialogService,
    private coreButtonGroupService: CoreButtonGroupService,
  ) {
    super(mls);
    const newOrgIds: number[] = [];
    this.organizationService.status$.value.activeKeys.map(x => newOrgIds.push(Number(x)))
    this.onOrgIdsChange(newOrgIds);
    this.orgId = this.getMin(newOrgIds);
    this.listInstance = Number(
      this.route.snapshot.paramMap.get('listInstance')!
    );
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
  ngAfterViewInit(): void {

    this.subscriptions.push( // outer-push
      this.dialogService.dialogConfirmed$.pipe(
        filter(i => !!!this.dialogService.busy && !!i?.confirmed)
      ).subscribe(() => {
        this.dialogService.resetService();
        switch (this.pendingAction) {
          case EnumCoreButtonVNSCode.HEADER_LOCK:
            console.log("HEADER_LOCK");
            this.lock()
            break;
          default:
            break;
        }
      }))
    setTimeout(() => {
      console.log(this.coreButtonGroupService);

      const tryFind = this.coreButtonGroupService.instances.filter(x => x.instanceNumber === this.listInstance);
      this.buttonGroupStatus = tryFind[0];
      this.buttonGroupStatus.mustBeHidden$.next([EnumCoreButtonVNSCode.HEADER_LOCK, EnumCoreButtonVNSCode.HEADER_UNLOCK]);

      // this.appService.
    })
  }

  apiDefinition: ICorePageListApiDefinition = {
    queryListRelativePath: api.AT_TIME_TIMESHEET_MONTHY_QUERY_LIST,
  }
  paramRows!: ICoreParamControl[][];
  onOrgIdsChange(orgIds: number[]) {
    const periodIds: number[] = [];
    this.orgId = this.getMin(orgIds);
    this.orgIds = orgIds
    if (this.paramRows != null && this.paramRows[0][1].ngModel != null && this.paramRows[0][1].ngModel != 0) {
      periodIds.push(Number(this.paramRows[0][1].ngModel));
    }
    this.outerInOperators = [
      {
        field: 'orgId',
        values: orgIds
      }, {
        field: 'periodId',
        values: periodIds
      }
    ]
    if (this.orgIds.length > 0 && periodIds.length > 0) {
      this.checkLock(periodIds[0]);
    }
  }
  onNgModelChange = (ngModel: string, value: any) => {

    // console.log('onNgModelChange', ngModel, value);

    let field: string;
    let operator: EnumFilterOperator;
    let eventFilterOperator: IFilterOperator;

    field = ngModel;

    switch (ngModel) {
      case "fromDate":
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
      case "endDate":
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

    // vì có 2 date nên cần bảo vệ state cũ
    const currentOuterFilterOperators: IFilterOperator[] = JSON.parse(JSON.stringify(this.outerFilterOperators));

    // lọc những field không trùng với field và operator
    const remainOuterFilterOperators = currentOuterFilterOperators.filter(x => !!!(x.field === field && x.operator === operator));

    // thêm lại event vừa xảy ra
    remainOuterFilterOperators.push(eventFilterOperator);

    // gán lại filter
    this.outerFilterOperators = remainOuterFilterOperators;
  }
  onNgModelChangeNumber = (ngModel: string, value: any) => {

    // console.log('onNgModelChange', ngModel, value);

    let field: string;
    let eventFilterInOperator: IInOperator;
    const newValues: number[] = [];
    field = ngModel;
    newValues.push(Number(value));
    if (ngModel == 'year') {

      if (value != null && value != 0) {
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
              }
            }
          }))
      }
      else {

      }

    }

    switch (ngModel) {
      case "year":
        eventFilterInOperator = {
          field,
          values: newValues
        }
        break;
      case "periodId":
        if (newValues[0] == 0) {
          this.paramRows[0][2].ngModel = null;
          this.paramRows[0][3].ngModel = null;
        }
        this.subscriptions.push(
          this.appService.post(api.AT_SALARY_PERIOD_GET_LIST_PERIOD, { id: newValues[0] }).subscribe(x => {
            if (x.ok && x.status === 200) {
              const body: IFormatedResponse = x.body

              if (body.statusCode === 200) {
                const startDate = new Date(body.innerBody.startDate);
                const endDate = new Date(body.innerBody.endDate);

                this.paramRows[0][2].ngModel = startDate;
                this.paramRows[0][3].ngModel = endDate;
              } else {
                //this.responseService.resolve(body)
              }
            } else {
              //this.alertService.error(JSON.stringify(x), alertOptions)
            }
          }
          )
        )
        this.checkLock(newValues[0]);
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
        {

          flexSize: 3,
          name: 'fromDate',
          ngModel: null,
          ngModelChange: this.onNgModelChange,
          value: null,
          label: EnumTranslateKey.UI_COMPONENT_LABEL_AT_TIMESHEET_SUMMARY_FROM_DATE,
          controlType: EnumFormBaseContolType.DATEPICKER,
          disabled: true
        },
        {

          flexSize: 3,
          name: 'endDate',
          ngModel: null,
          ngModelChange: this.onNgModelChange,
          value: null,
          label: EnumTranslateKey.UI_COMPONENT_LABEL_AT_TIMESHEET_SUMMARY_TO_DATE,
          controlType: EnumFormBaseContolType.DATEPICKER,
          disabled: true
        }
      ]
    ];
  }

  onInstanceCreated(event: number) {
    this.listInstance = event;
  }
  calculate(): void {
    this.loading = true;
    if (this.orgId == null || this.orgId == 0) {
      this.loading = false;
      return this.alertService.warn(this.mls.trans("UI_COMPONENT_PARAM_AT_TIMESHEET_SUMMARY_ORG_ID_NULL"), this.alertOptions);
    }
    else if (this.paramRows[0][1].ngModel == null || this.paramRows[0][1].ngModel == 0) {
      this.loading = false;
      return this.alertService.warn(this.mls.trans("UI_COMPONENT_PARAM_AT_TIMESHEET_SUMMARY_SALARY_PERIOD_ID_NULL"), this.alertOptions);
    }
    this.subscriptions.push(
      this.appService
        .post(api.AT_TIME_TIMESHEET_MONTHY_CALCULATE, { orgIds: this.orgIds, orgId: this.orgId, periodId: this.paramRows[0][1].ngModel })
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
              return this.alertService.success(this.mls.trans("UI_COMPONENT_LABEL_AT_TIMESHEET_SUMMARY_CALCULATE_SUCCESS"), this.alertOptions);
            } else {
              //return this.alertService.error(body.messageCode, this.alertOptions);
            }
          }
        })
    )
  }
  lock(): void {
    this.loading = true;
    if (this.orgId == null || this.orgId == 0) {
      this.loading = false;
      return this.alertService.warn(this.mls.trans("UI_COMPONENT_PARAM_AT_TIMESHEET_SUMMARY_ORG_ID_NULL"), this.alertOptions);
    }
    else if (this.paramRows[0][1].ngModel == null || this.paramRows[0][1].ngModel == 0) {
      this.loading = false;
      return this.alertService.warn(this.mls.trans("UI_COMPONENT_PARAM_AT_TIMESHEET_SUMMARY_SALARY_PERIOD_ID_NULL"), this.alertOptions);
    }
    this.subscriptions.push(
      this.appService
        .post(api.AT_TIME_TIMESHEET_MONTHY_LOCK_PERIOD, { orgIds: this.orgIds, periodId: this.paramRows[0][1].ngModel, statusColex: 1 })
        .subscribe((res: any) => {

          this.loading = false;
          if (!!res.ok && res.status === 200) {
            const body: IFormatedResponse = res.body
            if (body.statusCode === 200 && !!body.innerBody) {
              this.checkLock(this.paramRows[0][1].ngModel);
              return this.alertService.success(this.mls.trans("UI_COMPONENT_LABEL_AT_TIMESHEET_SUMMARY_LOCK_SUCCESS"), this.alertOptions);
            } else {
              return this.alertService.error(body.messageCode, this.alertOptions);
            }
          }
        })
    )
    const listInstances = this.corePageListService.instances.filter(
      (y) => y.instanceNumber === this.listInstance
    );
    if (!!listInstances.length) {
      listInstances[0].reloadFlag$.next(
        !!!listInstances[0].reloadFlag$.value
      );
    }
  }
  unlock(): void {
    this.loading = true;
    if (this.orgId == null || this.orgId == 0) {
      this.loading = false;
      return this.alertService.warn(this.mls.trans("UI_COMPONENT_PARAM_AT_TIMESHEET_SUMMARY_ORG_ID_NULL"), this.alertOptions);
    }
    else if (this.paramRows[0][1].ngModel == null || this.paramRows[0][1].ngModel == 0) {
      this.loading = false;
      return this.alertService.warn(this.mls.trans("UI_COMPONENT_PARAM_AT_TIMESHEET_SUMMARY_SALARY_PERIOD_ID_NULL"), this.alertOptions);
    }
    this.subscriptions.push(
      this.appService
        .post(api.AT_TIME_TIMESHEET_MONTHY_LOCK_PERIOD, { orgIds: this.orgIds, periodId: this.paramRows[0][1].ngModel, statusColex: 0 })
        .subscribe((res: any) => {

          this.loading = false;
          if (!!res.ok && res.status === 200) {
            const body: IFormatedResponse = res.body
            if (body.statusCode === 200 && !!body.innerBody) {
              this.checkLock(this.paramRows[0][1].ngModel);
              return this.alertService.success(this.mls.trans("UI_COMPONENT_LABEL_AT_TIMESHEET_SUMMARY_UNLOCK_SUCCESS"), this.alertOptions);
            } else {
              return this.alertService.error(body.messageCode, this.alertOptions);
            }
          }
        })
    )
    const listInstances = this.corePageListService.instances.filter(
      (y) => y.instanceNumber === this.listInstance
    );
    if (!!listInstances.length) {
      listInstances[0].reloadFlag$.next(
        !!!listInstances[0].reloadFlag$.value
      );
    }

  }
  checkLock(periodId: any) {
    this.appService.post(api.AT_TIME_TIMESHEET_MONTHY_CHECKLOCK_PERIOD,
      { orgIds: this.orgIds, periodId: periodId })
      .pipe().subscribe((x) => {
        if (!!x.ok && x.status === 200) {
          const body = x.body.innerBody;
          let hideButon : any[] = [];
          if (!!body.lock) hideButon.push(EnumCoreButtonVNSCode.HEADER_LOCK);
          if (!!body.unLock) hideButon.push(EnumCoreButtonVNSCode.HEADER_UNLOCK);

          this.mustBeHidden = hideButon;
          this.buttonGroupStatus.mustBeHidden$.next(hideButon);
        }
      })
  }
  onRowDoubleClick(e: any) {
    return;
  }
  onCorePageHeaderButtonClick(e: ICoreButtonVNS) {
    //console.log("StaffProfileComponent onCorePageHeaderButtonClick", e)
    switch (e.code) {
      case EnumCoreButtonVNSCode.HEADER_LOCK:
        this.pendingAction = EnumCoreButtonVNSCode.HEADER_LOCK
        this.dialogService.title$.next(EnumTranslateKey.UI_CORE_DIALOG_SERVICE_CONFIRMATION)
        this.dialogService.okButtonText$.next(EnumTranslateKey.UI_CORE_CONFIRM_DIALOG_BUTTON_CONFIRM)
        this.dialogService.cancelButtonText$.next(EnumTranslateKey.UI_CORE_CONFIRM_DIALOG_BUTTON_CANCEL)
        this.dialogService.showCancelOnly$.next(false);
        this.dialogService.busy = true;
        this.dialogService.body$.next(EnumTranslateKey.UI_CORE_DIALOG_COMFIRM_TIMESHEET_SUMMARY_LOCK);
        let listDeleteIds: any[] = [];
        for (let i = 1; i <= 5; i++) {
          listDeleteIds.push('- ' + this.mls.trans(EnumTranslateKey.UI_CORE_DIALOG_COMFIRM_TIMESHEET_SUMMARY_LOCK_INFO_LINE_ + i))
        }
        this.dialogService.informationLines$.next(listDeleteIds)
        this.dialogService.showConfirmDialog$.next(true);
        //this.lock();
        this.checkLock(this.paramRows[0][1].ngModel)
        this.selectedData = [];
        break;
      case EnumCoreButtonVNSCode.HEADER_UNLOCK:
        this.unlock();
        this.selectedData = [];
        break;
      case EnumCoreButtonVNSCode.HEADER_CALCULATE:
        this.calculate();
        break;
      default:
    }
  }
  onButtonClick(e: ICoreButtonVNS) {
    if (e.code === EnumCoreButtonVNSCode.NONE_HEADER_SEARCH) {
      console.log("NONE_HEADER_SEARCH");
      this.outerParam$.next({
        periodId: this.paramRows[0][1].ngModel
      })
      this.outerFilterOperators = [
        {
          field: 'dateStart',
          operator: EnumFilterOperator.GREATER_THAN_OR_EQUAL,
          dateTimeValue: this.paramRows[0][2].ngModel
        },
        {
          field: 'dateEnd',
          operator: EnumFilterOperator.LESS_THAN_OR_EQUAL,
          dateTimeValue: this.paramRows[0][3].ngModel
        },
      ]
    }
  }
  selectedData: any;
  onSelectedDataChange(e: any[]) {
    this.selectedData = e;
    // this.checkLock(this.paramRows[0][1].ngModel)
    setTimeout(() => {
      this.buttonGroupStatus.mustBeHidden$.next(this.mustBeHidden);
    });
  }
}
