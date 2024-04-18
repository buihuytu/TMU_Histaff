import { Component, AfterViewInit, Input, ViewChild, TemplateRef } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { EnumTranslateKey, api } from 'alpha-global-constants';
import { EnumStyleButtonClass, AlertService, AppService, BaseComponent, CorePageListService, EnumCoreButtonVNSCode, EnumCoreFormControlSeekerSourceType, EnumCoreTablePipeType, EnumFilterOperator, EnumSortDirection, IAlertOptions, ICoreButtonVNS, ICoreChecklistOption, ICoreDatePickerRange, ICoreDropdownOption, ICorePageListApiDefinition, ICorePageListCRUD, ICorePageListEditRouting, ICoreTableColumnItem, IFilterOperator, IFormatedResponse, IInOperator, ISortItem, MultiLanguageService, OrganizationService, RandomAvatarService, ResponseService,} from "ngx-histaff-alpha";
import { BehaviorSubject, Subscription } from "rxjs";

@Component({
  selector: "cms-app-time-timesheet-daily",
  templateUrl: "./time-timesheet-daily.component.html",
  styleUrls: ["./time-timesheet-daily.component.scss"],
})
export class TimeTimesheetDailyComponent extends BaseComponent implements AfterViewInit {

  @Input() hideHeader!: boolean;
  @ViewChild('employeeCode') employeeCode!: TemplateRef<any>;
  @ViewChild('employeeName') employeeName!: TemplateRef<any>;
  @ViewChild('positionName') positionName!: TemplateRef<any>;
  @ViewChild('orgName') orgName!: TemplateRef<any>;
  @ViewChild('workingday') workingday!: TemplateRef<any>;
  @ViewChild('shiftCode') shiftCode!: TemplateRef<any>;
  @ViewChild('shiftStart') shiftStart!: TemplateRef<any>;
  @ViewChild('shiftEnd') shiftEnd!: TemplateRef<any>;
  @ViewChild('valin1') valin1!: TemplateRef<any>;
  @ViewChild('valin4') valin4!: TemplateRef<any>;
  @ViewChild('workinghour') workinghour!: TemplateRef<any>;
  @ViewChild('manualCode') manualCode!: TemplateRef<any>;
  @ViewChild('late') late!: TemplateRef<any>;
  @ViewChild('comebackout') comebackout!: TemplateRef<any>;
  @ViewChild('dimuonVesomThucte') dimuonVesomThucte!: TemplateRef<any>;
  @ViewChild('otTotalConvert') otTotalConvert!: TemplateRef<any>;
  @ViewChild('signDefaultName') signDefaultName!: TemplateRef<any>;
  @ViewChild('otWeekday') otWeekday!: TemplateRef<any>;
  @ViewChild('otSunday') otSunday!: TemplateRef<any>;
  @ViewChild('otHoliday') otHoliday!: TemplateRef<any>;
  @ViewChild('otWeeknight') otWeeknight!: TemplateRef<any>;
  @ViewChild('otSundaynight') otSundaynight!: TemplateRef<any>;
  @ViewChild('otHolidayNight') otHolidayNight!: TemplateRef<any>;
  @ViewChild('isConfirm') isConfirm!: TemplateRef<any>;

  valueRefs!: TemplateRef<any>[];
  /* START: Local filter params */
  orgIds!: number[];
  orgId!: number;
  /* END: Local filter params */
  loading!: boolean;
  periodNow!: number;

  /*
  Properties being passed to core-page-list
  */
  alertOptions: IAlertOptions = {
    autoClose: true,
    keepAfterRouteChange: true,
    timeClose: 10000
  };
  // Template Search
  year: number = (new Date()).getFullYear();
  salPeriod!: number;
  dateStart!: Date;
  dateEnd!: Date;
  employeeId!: number;
  statuses!: number[];
  periodIds!: number [];
  employeeIds!: number[];
  selectedIds!: number[];
  // Label
  labelList = {
    year: EnumTranslateKey.UI_LABEL_CUSTOM_PARAM_KIT_YEAR,
    salPeriod: EnumTranslateKey.UI_LABEL_CUSTOM_PARAM_KIT_SALARY_PERIOD,
    startDate: EnumTranslateKey.UI_LABEL_CUSTOM_PARAM_KIT_FROM_DATE,
    endDate: EnumTranslateKey.UI_LABEL_CUSTOM_PARAM_KIT_TO_DATE,
    employeeCode: EnumTranslateKey.UI_LABEL_CUSTOM_PARAM_KIT_EMPLOYEE_CODE,
    status: EnumTranslateKey.UI_LABEL_CUSTOM_PARAM_KIT_STATUS,
  }

  employeeSeekerType: EnumCoreFormControlSeekerSourceType = EnumCoreFormControlSeekerSourceType.EMPLOYEE_SEEK;

  rangeLimit!: ICoreDatePickerRange;
  disabled!: boolean;
  multiMode: boolean = true;
  listInstance!: number;

  checkboxTemplate!: TemplateRef<any>;
  stichkerTemplate!: TemplateRef<any>;


  title = EnumTranslateKey.UI_COMPONENT_TITLE_AT_TIME_TIMESHEET_DAILY
  outerParam$ = new BehaviorSubject<any>(null);
  outerFilterOperators: IFilterOperator[] = [
    {
      field: 'orgId',
      operator: EnumFilterOperator.EQUAL
    }
  ]
  outerInOperators: IInOperator[] = [];

  //filterOperator: IFilterOperator = 

  apiDefinition: ICorePageListApiDefinition = {
    queryListRelativePath: api.AT_TIME_TIMESHEET_DAILY_QUERY_LIST,
  }

  crud: ICorePageListCRUD = {
    deleteIds: api.AT_TIME_TIMESHEET_DAILY_DELETE_IDS
  }

  avatarTemplate!: TemplateRef<any>;
  subsctiptions: Subscription[] = [];
  headerFirstRowHeight: number = 50;

  // Sắp xếp lưới hiển thị theo cấp chức danh
  outerSort: ISortItem[] = [
    {
      field: "employeeCode",
      sortDirection: EnumSortDirection.ASC
    },
    {
      field: "workingday",
      sortDirection: EnumSortDirection.ASC
    },
    {
      field: "jobOrderNum",
      sortDirection: EnumSortDirection.ASC
    }
  ]

  // Drop down list
  salaryPeridOptions$ = new BehaviorSubject<ICoreDropdownOption[]>([]);
  yearPeridOptions$ = new BehaviorSubject<ICoreDropdownOption[]>([]);
  atSalaryPeriodGetByIdObject$ = new BehaviorSubject<any>(null);
  yearPeriodGetByIdObject$ = new BehaviorSubject<any>(null);
  atSalaryPeriodGetByIdApi = api.AT_SALARY_PERIOD_READ;
  shownFrom!: string;
  getByIdObject$!: BehaviorSubject<any>;
  checklistOptions$ = new BehaviorSubject<ICoreChecklistOption[]>([]);
  checklistStatusGetByIdObject$ = new BehaviorSubject<any>(null);
  checklistStatusGetByIdApi = api.HU_EMPLOYEE_READ;
  buttonItems: EnumCoreButtonVNSCode[] = [
    EnumCoreButtonVNSCode.NONE_HEADER_SEARCH,
  ];

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
      type: 'string',
      align: 'center',
      width: 30,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_AT_TIME_TIMESHEET_DAILY_EMPLOYEE_CODE,
      field: 'employeeCode',
      type: 'string',
      align: 'center',
      width: 100,
      templateRef: this.employeeCode
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_AT_TIME_TIMESHEET_DAILY_EMPLOYEE_NAME,
      field: 'employeeName',
      type: 'string',
      align: 'center',
      width: 150,
      templateRef: this.employeeName
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_AT_TIME_TIMESHEET_DAILY_POSITION_NAME,
      field: 'positionName',
      type: 'string',
      align: 'center',
      width: 280,
      templateRef: this.positionName,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_AT_TIME_TIMESHEET_DAILY_DEPARTMENT_NAME,
      field: 'orgName',
      type: 'string',
      align: 'center',
      width: 160,
      templateRef: this.orgName,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_AT_TIME_TIMESHEET_DAILY_WORKINGDAY,
      field: 'workingday',
      type: 'string',
      align: 'center',
      width: 150,
      pipe: EnumCoreTablePipeType.DATE,
      templateRef: this.workingday,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_AT_TIME_TIMESHEET_DAILY_SHIFT,
      field: 'shiftCode',
      type: 'string',
      align: 'center',
      width: 150,
      templateRef: this.shiftCode,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_AT_TIME_TIMESHEET_ENTER_SHIFT_TIME,
      field: 'shiftStart',
      type: 'string',
      align: 'center',
      width: 150,
      pipe: EnumCoreTablePipeType.TIME_HHMM,
      templateRef: this.shiftStart
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_AT_TIME_TIMESHEET_LEAVE_SHIFT_TIME,
      field: 'shiftEnd',
      type: 'string',
      align: 'center',
      width: 150,
      pipe: EnumCoreTablePipeType.TIME_HHMM,
      templateRef: this.shiftEnd
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_AT_TIME_TIMESHEET_ENTER_SHIFT_TIME_ORIGINAL,
      field: 'valin1',
      type: 'string',
      align: 'center',
      width: 150,
      pipe: EnumCoreTablePipeType.TIME_HHMM,
      templateRef: this.valin1
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_AT_TIME_TIMESHEET_LEAVE_SHIFT_TIME_ORIGINAL,
      field: 'valin4',
      type: 'string',
      align: 'center',
      width: 150,
      pipe: EnumCoreTablePipeType.TIME_HHMM,
      templateRef: this.valin4
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_AT_TIME_TIMESHEET_TIME_WORKING,
      field: 'workinghour',
      type: 'string',
      align: 'center',
      width: 70,
      templateRef: this.workinghour,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_AT_TIME_TIMESHEET_SHIFT_TYPE,
      field: 'manualCode',
      type: 'string',
      align: 'center',
      width: 110,
      templateRef: this.manualCode
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_AT_TIME_TIMESHEET_MINUTE_LATE,
      field: 'late',
      type: 'string',
      align: 'center',
      width: 70,
      templateRef: this.late
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_AT_TIME_TIMESHEET_MINUTE_EARLY,
      field: 'comebackout',
      type: 'string',
      align: 'center',
      width: 70,
      templateRef: this.comebackout
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_AT_TIME_TIMESHEET_SUM_LATE_EARLY_MINUTE,
      field: 'dimuonVesomThucte',
      type: 'string',
      align: 'center',
      width: 150,
      templateRef: this.dimuonVesomThucte
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_AT_TIME_TIMESHEET_OT_SUM,
      field: 'otTotalConvert',
      type: 'string',
      align: 'center',
      width: 110,
      templateRef: this.otTotalConvert
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_AT_TIME_TIMESHEET_OT_AUTO_CAL,
      field: 'signDefaultName',
      type: 'string',
      align: 'center',
      width: 150,
      templateRef: this.signDefaultName,
      hidden: true
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_AT_TIME_TIMESHEET_OT_WEEKDAY,
      field: 'otWeekday',
      type: 'string',
      align: 'center',
      width: 150,
      templateRef: this.otWeekday
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_AT_TIME_TIMESHEET_OT_SUNDAY,
      field: 'otSunday',
      type: 'string',
      align: 'center',
      width: 95,
      templateRef: this.otSunday
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_AT_TIME_TIMESHEET_OT_HOLIDAY,
      field: 'otHoliday',
      type: 'string',
      align: 'center',
      width: 100,
      templateRef: this.otHoliday
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_AT_TIME_TIMESHEET_OT_WEEKNIGHT,
      field: 'otWeeknight',
      type: 'string',
      align: 'center',
      width: 150,
      templateRef: this.otWeeknight
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_AT_TIME_TIMESHEET_OT_SUNDAYNIGHT,
      field: 'otSundaynight',
      type: 'string',
      align: 'center',
      width: 90,
      templateRef: this.otSundaynight
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_AT_TIME_TIMESHEET_OT_HOLIDAYNIGHT,
      field: 'otHolidayNight',
      type: 'string',
      align: 'center',
      width: 90,
      templateRef: this.otHolidayNight
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_AT_TIME_TIMESHEET_CONFIRM,
      field: 'isConfirm',
      type: 'bool',
      pipe: EnumCoreTablePipeType.BOOLEAN_TO_TRUE_FALSE,
      align: 'center',
      hideSearchBox: true,
      width: 150,
      readonly: true,
      templateRef: this.checkboxTemplate,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_COMMON_JOB_ORDER_NUM,
      field: 'jobOrderNum',
      type: 'string',
      align: 'right',
      width: 0,
      pipe:EnumCoreTablePipeType.NUMBER,
      hidden: true,
    },
  ]

  inOperators!: IInOperator[];
  filterOperators!: IFilterOperator[];

  defaultAvatar!: string;

  editRoute: ICorePageListEditRouting = {
    auxiliary: 'popupAux'
  }
  /* End Properties being passed to core-page-type-a */



  constructor(
    public override mls: MultiLanguageService,
    private ras: RandomAvatarService,
    private organizationService: OrganizationService,
    private appService: AppService, // CoreService is DEPRECATED!!!,
    private responseService: ResponseService,
    private alertService: AlertService,
    private corePageListService: CorePageListService,
    private route: ActivatedRoute,
  ) {
    super(mls);
    this.defaultAvatar = ras.get();

    /* Get orgIds startup value */
    const newOrgIds: number[] = [];
    this.organizationService.status$.value.activeKeys.map(x => newOrgIds.push(Number(x)))
    this.onOrgIdsChange(newOrgIds);
    this.shownFrom = 'name',
      this.listInstance = Number(
        this.route.snapshot.paramMap.get('listInstance')!
      );

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
  override ngOnInit(): void {

    this.subscriptions.push(
      this.mls.lang$.subscribe(x => this.lang = x)
    )
    this.getListYear();
    if (this.year != null) {
      this.getListPeriod();
    }
    //console.log(this.year);
  }

  ngAfterViewInit(): void {
    setTimeout(() => {

      this.subscriptions.push(
        this.appService.get(api.SYS_OTHERLIST_GET_EMP_STATUS).subscribe((x) => {
          if (x.ok && x.status == 200) {
            const body: IFormatedResponse = x.body;
            if (body.statusCode == 200) {
              const newOptions: ICoreChecklistOption[] = [
                {
                  value: null,
                  text: this.mls.trans(EnumTranslateKey.UI_CORE_PARAMS_COMMON_NULL_STATUS, this.lang),
                  checked: true
                }];
              const newStatusIds: any[] = [null];
              body.innerBody.map((y: any) => {
                newOptions.push({
                  value: y.id,
                  text: y.name,
                  checked: true,
                });
                newStatusIds.push(y.id);
              });
              this.statuses = newStatusIds;
              this.checklistOptions$.next(newOptions);
            }
          }
        })
      );

      this.disabled = true;

      this.valueRefs = [
        this.employeeCode,
        this.employeeName,
        this.positionName,
        this.orgName,
        this.workingday,
        this.shiftCode,
        this.shiftStart,
        this.shiftEnd,
        this.valin1,
        this.valin4,
        this.workinghour,
        this.manualCode,
        this.late,
        this.comebackout,
        this.dimuonVesomThucte,
        this.otTotalConvert,
        this.signDefaultName,
        this.otWeekday,
        this.otSunday,
        this.otHoliday,
        this.otWeeknight,
        this.otSundaynight,
        this.otHolidayNight,
        this.isConfirm
      ]

      this.columns.filter(x => x.field === 'employeeCode')[0].templateRef = this.employeeCode;
      this.columns.filter(x => x.field === 'employeeName')[0].templateRef = this.employeeName;
      this.columns.filter(x => x.field === 'positionName')[0].templateRef = this.positionName;
      this.columns.filter(x => x.field === 'orgName')[0].templateRef = this.orgName;
      this.columns.filter(x => x.field === 'workingday')[0].templateRef = this.workingday;
      this.columns.filter(x => x.field === 'shiftCode')[0].templateRef = this.shiftCode;
      this.columns.filter(x => x.field === 'shiftStart')[0].templateRef = this.shiftStart;
      this.columns.filter(x => x.field === 'shiftEnd')[0].templateRef = this.shiftEnd;
      this.columns.filter(x => x.field === 'valin1')[0].templateRef = this.valin1;
      this.columns.filter(x => x.field === 'valin4')[0].templateRef = this.valin4;
      this.columns.filter(x => x.field === 'workinghour')[0].templateRef = this.workinghour;
      this.columns.filter(x => x.field === 'manualCode')[0].templateRef = this.manualCode;
      this.columns.filter(x => x.field === 'late')[0].templateRef = this.late;
      this.columns.filter(x => x.field === 'comebackout')[0].templateRef = this.comebackout;
      this.columns.filter(x => x.field === 'dimuonVesomThucte')[0].templateRef = this.dimuonVesomThucte;
      this.columns.filter(x => x.field === 'otTotalConvert')[0].templateRef = this.otTotalConvert;
      this.columns.filter(x => x.field === 'signDefaultName')[0].templateRef = this.signDefaultName;
      this.columns.filter(x => x.field === 'otWeekday')[0].templateRef = this.otWeekday;
      this.columns.filter(x => x.field === 'otSunday')[0].templateRef = this.otSunday;
      this.columns.filter(x => x.field === 'otHoliday')[0].templateRef = this.otHoliday;
      this.columns.filter(x => x.field === 'otWeeknight')[0].templateRef = this.otWeeknight;
      this.columns.filter(x => x.field === 'otSundaynight')[0].templateRef = this.otSundaynight;
      this.columns.filter(x => x.field === 'otHolidayNight')[0].templateRef = this.otHolidayNight;
      this.columns.filter(x => x.field === 'isConfirm')[0].templateRef = this.isConfirm;
      
    })
    this.disabled = true;
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
  reloadGrid(): void {
    this.onOrgIdsChange(this.orgIds);
    // reload màn hình LƯỚI
    const listInstances = this.corePageListService.instances.filter(
      (y) => y.instanceNumber === this.listInstance
    );
    if (!!listInstances.length) {
      listInstances[0].reloadFlag$.next(
        !!!listInstances[0].reloadFlag$.value
      );
    }
    // end reload màn hình
  }
  onYearChange(year: number) {

    if (year.toString().length == 4) {
      this.year = year;
      this.getListPeriod();
      //console.log(this.year);
    }
    else {
      this.salaryPeridOptions$.next([]);
      this.atSalaryPeriodGetByIdObject$.next(null);
      this.loading = false;
    }
  }

  getListPeriod() {
    this.subsctiptions.push(

      this.appService.post(api.AT_SALARY_PERIOD_GET_LIST_IN_YEAR, { year: this.year }).subscribe(x => {
        if (x.ok && x.status === 200) {
          const body: IFormatedResponse = x.body
          if (body.statusCode === 200) {
            const options: { value: number; text: string }[] = [];
            body.innerBody.map((get: any) => {
              if (get.month == new Date().getMonth() + 1) {
                this.periodNow = get.id
              }
              options.push({
                value: get.id,
                text: get.name,
              });
            });
            this.salaryPeridOptions$.next(options);
            this.salPeriod = this.periodNow;
            this.onSalPeriodChange(this.periodNow);
          } else {
            //this.responseService.resolve(body)
          }
        } else {
          //this.alertService.error(JSON.stringify(x), alertOptions)
        }
      }
      ))
  }
  getListYear() {
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
              this.yearPeridOptions$.next(options);
            }
          }
        })
    )
  }
  onSalPeriodChange(salPerId: number) {
    if (salPerId == null) {
      this.dateStart = new Date();
      this.dateEnd = new Date();
    }
    this.salPeriod = salPerId;
    //console.log("salary: "+ this.salPeriod);
    this.subsctiptions.push(

      this.appService.post(api.AT_SALARY_PERIOD_GET_LIST_PERIOD, { id: salPerId }).subscribe(x => {
        if (x.ok && x.status === 200) {
          const body: IFormatedResponse = x.body

          if (body.statusCode === 200) {
            // this.rangeLimit = {
            //   minDate: new Date(body.innerBody.startDate),
            //   maxDate: new Date(body.innerBody.endDate),
            // };              
            this.rangeLimit = {
              minDate: new Date(body.innerBody.startDate),
              maxDate: new Date(body.innerBody.endDate),
            };
            this.dateStart = new Date(body.innerBody.startDate);
            this.dateEnd = new Date(body.innerBody.endDate);

            //this.disabled = false;
          } else {
            //this.responseService.resolve(body)
          }
        } else {
          //this.alertService.error(JSON.stringify(x), alertOptions)
        }
      }
      )
    )
  }

  onDateStartChange(dateStart: Date) {
    this.dateStart = dateStart;
    this.dateStart.setHours(0, 0, 0, 0)

    //console.log(this.dateStart);
  }

  onDateEndChange(dateEnd: Date) {
    this.dateEnd = dateEnd;
    this.dateEnd.setHours(23, 59, 59, 999)
    //console.log(this.dateEnd);
  }

  onEmployeeChange(employeeId: number) {
    this.employeeId = employeeId;
    this.search();
    //console.log(this.employeeId);
  }

  onStatusChange(statuses: any[]) {
    this.statuses = statuses;
    console.log(this.statuses);
    //console.log(this.statuses.length);
  }




  onButtonClick(e: ICoreButtonVNS) {
    if (e.code === EnumCoreButtonVNSCode.NONE_HEADER_SEARCH) {
      this.search();
    }
  }

  search(): void {
    let eventFilterInOperator: IInOperator[] = [];
    const newValues: number[] = [];
    const periodIds: number[] = [];
    const statuses: number[] = [];
    let dateStart: Date = new Date(new Date((new Date(this.dateStart)).setDate((new Date(this.dateStart)).getDate()) + 1).setUTCHours(0, 0, 0, 0))
    let dateEnd: Date = new Date(new Date((new Date(this.dateEnd)).setDate((new Date(this.dateEnd)).getDate())).setUTCHours(23, 59, 59, 999))
    console.log(dateStart, dateEnd);
    // this.filterOperators = [
    //   {
    //     field: 'workingday',
    //     operator: EnumFilterOperator.GREATER_THAN_OR_EQUAL,
    //     dateTimeValue: dateStart
    //   },
    //   {
    //     field: 'workingday',
    //     operator: EnumFilterOperator.LESS_THAN_OR_EQUAL,
    //     dateTimeValue: dateEnd
    //     //this.date.setDate( this.date.getDate() + 3 );

    //   },
    // ]

    // vì có 2 số nên cần bảo vệ state cũ
    const currentOuterInOperators: IInOperator[] = JSON.parse(JSON.stringify(this.outerInOperators));

    periodIds.push(this.salPeriod);
    newValues.push(this.employeeId);
    // dateStart = this.dateStart;
    // dateEnd = this.dateEnd
    //--------------------------
    eventFilterInOperator = [
      {
        field: "periodId",
        values: periodIds
      },
    ]
    if (this.employeeId != null && this.employeeId != undefined && this.employeeId != 0) {
      newValues.push(this.employeeId);
      eventFilterInOperator.push(
        {
          field: "employeeId",
          values: newValues
        }
      )
    }

    // if(this.statuses != null){
    //   eventFilterInOperator.push(
    //     {
    //       field: "codeColor",
    //       values: this.statuses
    //     }
    //   )
    // }

    // lọc những field không trùng với field
    const remainOuterInOperators = currentOuterInOperators.filter(x => !!!(x.field === "periodId" || x.field === "employeeId" || x.field === "timeRegisteredStatus" || x.field === "orgId"));

    const newFilter = remainOuterInOperators.concat(eventFilterInOperator);

    // gán lại filter
    this.outerInOperators = this.outerInOperators.filter(x => !!(x.field === "orgId")).concat(newFilter);
  }

  onInstanceCreated(event: number) {
    this.listInstance = event;
  }
  onSelectedIdsChangeeee(e: number[]): void {
    this.selectedIds = e;
  }
  conFirm(): void {
    this.loading = true;
    if (this.selectedIds == null || this.selectedIds.length == 0) {
      this.loading = false;
      return this.alertService.warn(this.mls.trans("UI_COMPONENT_TITLE_TIMESHEET_DAILY_IDS_NULL"), this.alertOptions);
    }
    this.subscriptions.push(
      this.appService
        .post(api.AT_TIME_TIMESHEET_DAILY_CONFIRM, { ids: this.selectedIds, isConfirm: 1 })
        .subscribe((res: any) => {

          this.loading = false;
          if (!!res.ok && res.status === 200) {
            const body: IFormatedResponse = res.body
            if (body.statusCode === 200 && !!body.innerBody) {
              this.reloadGrid();
              return this.alertService.success(this.mls.trans("UI_COMPONENT_LABEL_AT_TIMESHEET_DAILY_CONFIRM_SUCCESS"), this.alertOptions);
            } else {
              return this.alertService.error(body.messageCode, this.alertOptions);
            }
          }
        })
    )
  }
  unConFirm(): void {
    this.loading = true;
    if (this.selectedIds == null || this.selectedIds.length == 0) {
      this.loading = false;
      return this.alertService.warn(this.mls.trans("UI_COMPONENT_TITLE_TIMESHEET_DAILY_IDS_NULL"), this.alertOptions);
    }
    this.subscriptions.push(
      this.appService
        .post(api.AT_TIME_TIMESHEET_DAILY_CONFIRM, { ids: this.selectedIds, isConfirm: 0 })
        .subscribe((res: any) => {

          this.loading = false;
          if (!!res.ok && res.status === 200) {
            const body: IFormatedResponse = res.body
            if (body.statusCode === 200 && !!body.innerBody) {
              this.reloadGrid();
              return this.alertService.success(this.mls.trans("UI_COMPONENT_LABEL_AT_TIMESHEET_DAILY_UNCONFIRM_SUCCESS"), this.alertOptions);
            } else {
              return this.alertService.error(body.messageCode, this.alertOptions);
            }
          }
        })
    )
  }
  calculate(): void {
    this.loading = true;
    if (this.orgId == null || this.orgId == 0) {
      this.loading = false;
      return this.alertService.warn(this.mls.trans("UI_COMPONENT_PARAM_AT_TIMESHEET_DAILY_ORG_ID_NULL"), this.alertOptions);
    }
    else if (this.salPeriod == null || this.salPeriod == 0) {
      this.loading = false;
      return this.alertService.warn(this.mls.trans("UI_COMPONENT_PARAM_AT_TIMESHEET_DAILY_SALARY_PERIOD_ID_NULL"), this.alertOptions);
    }
    this.subscriptions.push(
      this.appService
        .post(api.AT_TIME_TIMESHEET_DAILY_CALCULATE, { listOrgIds: this.orgIds, orgId: this.orgId, periodId: this.salPeriod, employeeId: this.employeeId })
        .subscribe((res: any) => {

          this.loading = false;
          if (!!res.ok && res.status === 200) {
            const body: IFormatedResponse = res.body
            if (body.statusCode === 200 && !!body.innerBody) {
              // reload màn hình
              this.reloadGrid()
              // end reload màn hình
              return this.alertService.success(this.mls.trans("UI_COMPONENT_LABEL_AT_TIMESHEET_SUMMARY_CALCULATE_SUCCESS"), this.alertOptions);
            } else {
              // return this.alertService.error(body.messageCode, this.alertOptions);
              // return this.alertService.error(body.messageCode, this.alertOptions);
            }
          }
        })
    )
    this.search();
  }
  onCorePageHeaderButtonClick(e: ICoreButtonVNS) {
    //console.log("StaffProfileComponent onCorePageHeaderButtonClick", e)
    switch (e.code) {
      case EnumCoreButtonVNSCode.HEADER_CONFIRM:
        this.conFirm();
        break;
      case EnumCoreButtonVNSCode.HEADER_UNCONFIRM:
        this.unConFirm();
        break;
      case EnumCoreButtonVNSCode.HEADER_CALCULATE:
        this.calculate();
        break;
      default:
    }
  }
  getColorByCode(code: number): string {
    switch (code) {
      case 1183:
        return '#E2F2FF'
      case 1184:
        return '#F1FFC1'
      case 1185:
        return '#FFE7C3'
      case 1186:
        return '#FFE3F2'
      default:
        return ''
    }
  }
}
