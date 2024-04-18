import { Component, AfterViewInit } from "@angular/core";
import { EnumTranslateKey, api } from 'alpha-global-constants';
import { BaseComponent, EnumCoreButtonVNSCode, EnumCoreOrgTreeaAccessorMode, ICoreDropdownOption, ISearchItem, ICoreTableColumnItem, IPagination, defaultPaging, MultiLanguageService, AppService, ResponseService, AlertService, AuthService, OrganizationService, LayoutService, JsonService, ICoreButtonVNS, alertOptions, IFormatedResponse, EnumCoreTablePipeType, ICoreTableFlatColumnItem } from "ngx-histaff-alpha";
import { Subscription, BehaviorSubject, debounceTime } from "rxjs";


@Component({
  selector: "cms-app-calculatepayrollsub",
  templateUrl: "./calculatepayrollsub.component.html",
  styleUrls: ["./calculatepayrollsub.component.scss"],
})

export class CalculatePayrollSubComponent extends BaseComponent implements AfterViewInit {

  /* Start Init Variable */
  subsctiptions: Subscription[] = [];
  loading!: boolean;
  loadingPage!: boolean;
  errorRequired = EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED;

  compositionHeight!: number;
  treeHeight!: number;
  paginationHeight!: number;

  // HEADER
  title = EnumTranslateKey.UI_COMPONENT_TITLE_PA_PAYROLLSHEET_SUM_SUB;
  headerButtons: EnumCoreButtonVNSCode[] = [
    EnumCoreButtonVNSCode.HEADER_CREATE,
    EnumCoreButtonVNSCode.HEADER_LOCK,
    EnumCoreButtonVNSCode.HEADER_UNLOCK,
  ];

  // ORG_TREE_CHECKBOX
  listOrgIds: number[] = [];
  accessorMode: EnumCoreOrgTreeaAccessorMode = EnumCoreOrgTreeaAccessorMode.CHECKED;

  // FILLTER FORM
  year!: number;
  salPeriod!: number;
  phaseAdvanceId!: number;
  objSalary!: number;
  payrollFund!: number;
  employeeCal!: string;
  payDate!: Date;

  // Label
  labelList = {
    year: EnumTranslateKey.UI_LABEL_CUSTOM_PARAM_KIT_YEAR,
    salPeriod: EnumTranslateKey.UI_LABEL_CUSTOM_PARAM_KIT_SALARY_PERIOD,
    salPeriodPhaseAdvance: EnumTranslateKey.UI_LABEL_CUSTOM_PARAM_KIT_SALARY_PERIOD_PHASE_ADVANCE,
    objSalary: EnumTranslateKey.UI_LABEL_CUSTOM_PARAM_KIT_OBJ_SALARY,
    payrollFund: EnumTranslateKey.UI_LABEL_CUSTOM_PARAM_KIT_PAYROLL_FUND,
    employeeCal: EnumTranslateKey.UI_LABEL_CUSTOM_PARAM_KIT_EMPLOYEE_CALCULATE,
    payDate: EnumTranslateKey.UI_LABEL_CUSTOM_PARAM_KIT_PAY_DATE,
  }

  /* Drop down list */
  // Year
  yearOptions$ = new BehaviorSubject<ICoreDropdownOption[]>([]);
  yearGetByIdObject$ = new BehaviorSubject<any>(null);
  // Salary Period
  salaryPeridOptions$ = new BehaviorSubject<ICoreDropdownOption[]>([]);
  salaryPeriodGetByIdObject$ = new BehaviorSubject<any>(null);
  // Phase Advance
  phaseAdvanceIdOptions$ = new BehaviorSubject<ICoreDropdownOption[]>([]);
  phaseAdvanceIdGetByIdObject$ = new BehaviorSubject<any>(null);
  // Salary Object
  objSalaryOptions$ = new BehaviorSubject<ICoreDropdownOption[]>([]);
  objSalaryGetByIdObject$ = new BehaviorSubject<any>(null);
  // Payroll Fund
  payrollFundOptions$ = new BehaviorSubject<ICoreDropdownOption[]>([]);
  payrollFundGetByIdObject$ = new BehaviorSubject<any>(null);

  shownFrom!: string;
  disabled!: boolean;

  // Button
  buttonItems: EnumCoreButtonVNSCode[] = [
    EnumCoreButtonVNSCode.NONE_HEADER_SEARCH,
  ];

  // Grid data
  tableHeight!: number
  hideCheck: boolean = false;
  innerBody!: any;

  // Searching
  searchStream$ = new BehaviorSubject<ISearchItem[]>([]);
  employeeCode: string = "";
  employeeName: string = "";
  departmentName: string = "";
  positionName: string = "";
  joinDateSearch: string = "";
  payDateSearch: string = "";
  fundName: string = "";

  headerWrap!: boolean;
  headerFirstRowHeight: number = 50;

  columns: ICoreTableColumnItem[] = [
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_COMMON_ID,
      field: 'id',
      hidden: true,
      type: 'string',
      align: 'left',
      width: 200,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_PA_PAYROLLSHEET_SUM_EMPLOYEE_CODE,
      field: 'code',
      type: 'string',
      align: 'left',
      width: 80,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_PA_PAYROLLSHEET_SUM_EMPLOYEE_NAME,
      field: 'fullName',
      type: 'string',
      align: 'left',
      width: 160,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_PA_PAYROLLSHEET_SUM_EMPLOYEE_POSITION,
      field: 'posName',
      type: 'string',
      align: 'left',
      width: 250,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_PA_PAYROLLSHEET_SUM_EMPLOYEE_DEPARTMENT,
      field: 'orgName',
      type: 'string',
      align: 'left',
      width: 160,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_PA_PAYROLLSHEET_SUM_EMPLOYEE_JOIN_DATE,
      field: 'joinDate',
      type: 'string',
      align: 'center',
      width: 125,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_PA_PAYROLLSHEET_SUM_EMPLOYEE_PAY_DATE,
      field: 'spentDate',
      type: 'string',
      align: 'center',
      width: 100,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_PA_PAYROLLSHEET_SUM_EMPLOYEE_PAYROLL_FUND,
      field: 'payrollFund',
      type: 'string',
      align: 'left',
      width: 120,
    },
  ]

  staticColumns = JSON.parse(JSON.stringify(this.columns))

  // Pagination
  pageCount!: number;
  currentPage$ = new BehaviorSubject<number>(1);
  innerBodyCount$ = new BehaviorSubject<number>(0);
  pagination$ = new BehaviorSubject<IPagination>({
    skip: 0,
    take: defaultPaging.take,
  });
  pageSize$ = new BehaviorSubject<number>(defaultPaging.take);



  // Validator Form
  showRequiredYear: boolean = false;
  showRequiredSalPeriod: boolean = false;
  showRequiredObjSalary: boolean = false;
  showRequiredPayrollFund: boolean = false;
  showRequiredEmployeeCal: boolean = false;
  showRequiredPayDate: boolean = false;
  showRequiredOrgId: boolean = false;
  showRequiredPhaseAdvanceId: boolean = false;

  /* End Init Variable */

  constructor(
    public override mls: MultiLanguageService,
    private appService: AppService,
    private responseService: ResponseService,
    private alertService: AlertService,
    private authService: AuthService,
    private organizationService: OrganizationService,
    private layoutService: LayoutService,
    private jsonService: JsonService,
  ) {
    super(mls);
    this.shownFrom = "name";
    this.employeeCal = this.authService.data$.value?.fullName!;
    console.log(this.organizationService.status$.value);
    this.organizationService.status$.value.checkedKeys?.map(x => this.listOrgIds.push(Number(x)))
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.getListObjSalary();
      this.getListYear();
      this.getListPayrollFund();

      this.subscriptions.push(
        this.layoutService.contentContainerHeight$.subscribe(x => {
          this.compositionHeight = x - this.layoutService.corePageHeaderHeight - this.layoutService.basicSpacing;
          this.treeHeight = this.compositionHeight;
          this.tableHeight = this.compositionHeight - 163 - 45 - this.layoutService.corePaginationHeight;
          this.paginationHeight = this.layoutService.corePaginationHeight;
        })
      )

      const orgIds: number[] = []

      // this.organizationService.status$.value?.checkedKeys?.map(x => {
      //   orgIds.push(Number(x));
      // });

      this.listOrgIds = orgIds;
    })

  }

  override ngOnInit(): void {
    //console.log(this.tableHeight);

    this.subscriptions.push(
      this.mls.lang$.subscribe(x => this.lang = x)
    )
    //console.log(this.listOrgIds);

    this.subscriptions.push(
      this.pageSize$.subscribe(x => {
        if (this.innerBodyCount$.value != 0) {
          this.onGetList(x, this.currentPage$.value)
        }
      })
    );

    // searching
    this.subscriptions.push(
      this.searchStream$.pipe(
        debounceTime(500),
      ).subscribe(x => {
        //console.log("Do smth with search here...")
        // do smth with x
        if (x.length != 0) {
          this.employeeCode = x[0].searchFor;
          this.employeeName = x[1].searchFor!;
          this.departmentName = x[2].searchFor!;
          this.positionName = x[3].searchFor!;
          this.joinDateSearch = x[4].searchFor!;
          this.payDateSearch = x[5].searchFor!;
          this.fundName = x[6].searchFor!;
          console.log(this.employeeCode);
          this.onGetList(this.pageSize$.value, this.currentPage$.value)
        }
      })
    )!
  }

  // HEADER
  onCorePageHeaderButtonClick(e: ICoreButtonVNS): void {
    switch (e.code) {
      case EnumCoreButtonVNSCode.HEADER_HANDLE:
        this.calculate()
        break;
      case EnumCoreButtonVNSCode.HEADER_LOCK:
        if (this.phaseAdvanceId == null || this.listOrgIds.length == 0) {
          this.alertService.error(this.mls.trans('NO_SELECTED_ID_TO_DELETE'), alertOptions);
        }
        else {
          this.loading = true;
          this.subsctiptions.push(
            this.appService.post(api.PA_PAYROLLSHEET_SUM_SUB_CHANGE_STATUS_PAROX_SUB, {
              statusParoxSub: 1,
              orgIds: this.listOrgIds,
              periodId: this.phaseAdvanceId
            }).subscribe(x => {
              if (x.ok && x.status === 200) {
                const body: IFormatedResponse = x.body
                if (body.statusCode === 200) {
                  //this.alertService.success(body.messageCode, alertOptions)
                } else {
                  //this.responseService.resolve(body)
                }
              } else {
                //this.alertService.error(JSON.stringify(x), alertOptions)
              }
            })
          )
          this.loading = false;
        }

        break;
      case EnumCoreButtonVNSCode.HEADER_UNLOCK:
        if (this.phaseAdvanceId == null || this.listOrgIds == null) {
          this.alertService.error(this.mls.trans('NO_SELECTED_ID_TO_DELETE'), alertOptions);
        }
        else {
          this.loading = true;
          this.subsctiptions.push(
            this.appService.post(api.PA_PAYROLLSHEET_SUM_SUB_CHANGE_STATUS_PAROX_SUB, {
              statusParoxSub: 0,
              orgIds: this.listOrgIds,
              periodId: this.phaseAdvanceId
            }).subscribe(x => {
              if (x.ok && x.status === 200) {
                const body: IFormatedResponse = x.body
                if (body.statusCode === 200) {
                  //this.alertService.success(body.messageCode, alertOptions)
                } else {
                  //this.responseService.resolve(body)
                }
              } else {
                //this.alertService.error(JSON.stringify(x), alertOptions)
              }
            })
          )
          this.loading = false;
        }
        break;
      case EnumCoreButtonVNSCode.HEADER_EXPORTEXEL:
        this.exportToExcel();
        break;
      default:
        break;
    }
    console.log("onCorePageHeaderButtonClick ", e)
  }

  // ORG_TREE


  // FILLTER FORM

  onYearChange(year: number): void {
    this.showRequiredYear = (!this.year ? true : false);
    this.salPeriod = 0;
    this.salaryPeridOptions$.next([]);
    this.phaseAdvanceIdOptions$.next([]);
    this.salaryPeriodGetByIdObject$.next(null);
    this.phaseAdvanceIdGetByIdObject$.next(null);
    this.getListPeriod(year)
  }

  onSalPeriodChange(salPeriod: number): void {
    this.showRequiredSalPeriod = !this.salPeriod ? true : false;
    this.salPeriod = salPeriod;
    this.phaseAdvanceId = 0;
    this.phaseAdvanceIdOptions$.next([]);
    this.phaseAdvanceIdGetByIdObject$.next(null);
    this.getListPhaseAdvance(salPeriod)
  }

  onPhaseAdvanceIdChange(phaseAdvanceId: number): void {
    this.showRequiredPhaseAdvanceId = !this.phaseAdvanceId ? true : false;
    console.log(this.phaseAdvanceId, this.showRequiredPhaseAdvanceId);
    this.appService.get(api.PA_PAYROLLSHEET_SUM_SUB_GET_PHASE_ADVANCE_BY_ID + `?id=${phaseAdvanceId}`).subscribe(x => {
      if (x.ok && x.status === 200) {
        const body = x.body;
        if (body.statusCode === 200) {
          this.payDate = body.innerBody.day;
        }
      }
    })
    this.phaseAdvanceId = phaseAdvanceId;
  }

  onObjSalaryChange(objSalary: number): void {
    this.showRequiredObjSalary = !this.objSalary ? true : false;
    this.objSalary = objSalary;
    this.onLoadDynamicName(this.objSalary);
  }

  onPayrollFundChange(payrollFund: number): void {
    this.showRequiredPayrollFund = !this.payrollFund ? true : false;
    this.payrollFund = payrollFund;
  }

  onEmployeeCalChange(employeeCal: string): void {
    this.showRequiredEmployeeCal = !this.employeeCal ? true : false;
    this.employeeCal = employeeCal;
  }

  onPayDateChange(payDate: Date): void {
    this.showRequiredPayDate = !this.payDate ? true : false;
    this.payDate = payDate;
  }

  onButtonClick(_e: ICoreButtonVNS): void {
    if (this.checkParamValue(1) == true) {
      this.onGetList(this.pageSize$.value, this.currentPage$.value)
    }
  }

  calculate(): void {
    this.resetSearch()
    if (this.checkParamValue(2) == true) {
      this.loading = true;
      this.subsctiptions.push(
        this.appService.post(api.PA_PAYROLLSHEET_SUM_SUB_HANDLE_REQUEST, {
          orgIds: this.listOrgIds,
          year: this.year,
          periodId: this.salPeriod,
          phaseAdvanceId: this.phaseAdvanceId,
          objSalaryId: this.objSalary,
          payrollFund: this.payrollFund,
          employeeCal: this.employeeCal,
          payDate: this.payDate,
        }).subscribe(x => {
          if (x.ok && x.status === 200) {
            const body: IFormatedResponse = x.body
            if (body.statusCode === 200) {
              //this.alertService.success(this.mls.trans('common.calculate.successfully'), alertOptions)
              this.onGetList(this.pageSize$.value, this.currentPage$.value)
            } else {
              //this.responseService.resolve(body)
              //this.alertService.error(this.mls.trans('common.calculate.error'), alertOptions)

            }
          } else {
            //this.alertService.error(JSON.stringify(x), alertOptions)
            //this.alertService.error(this.mls.trans('common.calculate.error'), alertOptions)

          }
          this.loading = false;
        })
      )
      this.loading = false;
    }
  }

  // Function for List DropdownLists
  getListYear() {
    this.subscriptions.push(
      this.appService.get(api.AT_SALARY_PERIOD_GET_YEAR).subscribe((res: any) => {
        if (!!res.ok && res.status === 200) {
          const body: IFormatedResponse = res.body
          if (body.statusCode === 200 && !!body.innerBody) {
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
            this.yearOptions$.next(options);

          }
        }
      })
    )
  }

  getListPeriod(year: number) {
    if (year != null) {
      this.subsctiptions.push(
        this.appService.post(api.AT_SALARY_PERIOD_GET_LIST_IN_YEAR, { year: year }).subscribe(x => {
          if (x.ok && x.status === 200) {
            const body: IFormatedResponse = x.body
            if (body.statusCode === 200 && !!body.innerBody) {
              const options: { value: number | null; text: string }[] = [];
              options.push({
                value: Number(),
                text: ''
              })
              body.innerBody.map((get: any) => {
                options.push({
                  value: get.id,
                  text: get.name,
                });
              });
              this.salaryPeridOptions$.next(options);
            } else {
              //this.responseService.resolve(body)
            }
          } else {
            //this.alertService.error(JSON.stringify(x), alertOptions)
          }
        })
      )
    }
  }

  getListPhaseAdvance(periodId: number) {
    if (this.salPeriod != null) {
      this.subsctiptions.push(
        this.appService.post(api.PA_PAYROLLSHEET_SUM_SUB_GET_PHASE_ADVANCE, { periodId: periodId }).subscribe(x => {
          if (x.ok && x.status === 200) {
            const body: IFormatedResponse = x.body
            if (body.statusCode === 200 && !!body.innerBody) {
              const options: { value: number | null; text: string }[] = [];
              options.push({
                value: Number(),
                text: ''
              })
              body.innerBody.map((get: any) => {
                options.push({
                  value: get.id,
                  text: get.name,
                });
              });
              this.phaseAdvanceIdOptions$.next(options);
            } else {
              //this.responseService.resolve(body)
            }
          } else {
            //this.alertService.error(JSON.stringify(x), alertOptions)
          }
        })
      )
    }
  }


  getListObjSalary() {
    this.subscriptions.push(
      this.appService.get(api.PA_PAYROLLSHEET_SUM_SUB_GET_OBJ_SALARY_SUB_GROUP).subscribe((x) => {
        if (x.ok && x.status === 200) {
          const body: IFormatedResponse = x.body;
          if (body.statusCode === 200) {
            const options: { value: number; text: string }[] = [];
            options.push({
              value: Number(),
              text: ''
            })
            body.innerBody.map((get: any) => {
              options.push({
                value: get.id,
                text: get.name,
              });
            });
            this.objSalaryOptions$.next(options);
          } else {
            //this.responseService.resolve(body);
          }
        } else {
          //this.alertService.error(JSON.stringify(x), alertOptions);
        }
      })
    );
  }

  getListPayrollFund() {
    this.subsctiptions.push(
      this.appService.get(api.PA_LISTFUND_GET_LIST).subscribe(x => {
        if (x.ok && x.status === 200) {
          const body: IFormatedResponse = x.body
          if (body.statusCode === 200 && !!body.innerBody) {
            const options: { value: number | null; text: string }[] = [];
            options.push({
              value: Number(),
              text: ''
            })
            body.innerBody.map((get: any) => {
              options.push({
                value: get.id,
                text: get.name,
              });
            });
            this.payrollFundOptions$.next(options);
          } else {
            //this.responseService.resolve(body)
          }
        } else {
          //this.alertService.error(JSON.stringify(x), alertOptions)
        }
      })
    )
  }

  // GRID DATA
  onLoadDynamicName(objSalary: number): void {
    this.innerBody = null;
    this.columns = this.staticColumns;
    this.subsctiptions.push(
      this.appService.post(api.PA_PAYROLLSHEET_SUM_SUB_GET_DYNAMIC_NAME, { objSalaryId: objSalary }).subscribe(x => {
        if (x.ok && x.status === 200) {
          const body: IFormatedResponse = x.body
          if (body.statusCode === 200 && !!body.innerBody) {
            const newColumns = JSON.parse(JSON.stringify(this.columns))
            body.innerBody.map((get: any) => {
              //console.log(get.code);
              newColumns.push({
                caption: '' + get.name,
                field: (get.code).toLowerCase(),
                type: get.name.toLowerCase().includes("hệ số") ? 'formated_decimal' : 'formated_money',
                align: 'right',
                width: 95,
                pipe: EnumCoreTablePipeType.NUMBER,
                hideSearchBox: true,
              })
            });

            this.columns = newColumns;

          } else {
            //this.responseService.resolve(body)
          }
        } else {
          //this.alertService.error(JSON.stringify(x), alertOptions)
        }
      })
    )
  }

  onGetList(pageSize: number, pageNo: number) {
    const newInnerBody: any[] = [];

    this.loading = true;
    this.subsctiptions.push(
      this.appService.post(api.PA_PAYROLLSHEET_SUM_SUB_GET_LIST, {
        orgIds: this.listOrgIds,
        year: this.year,
        periodId: this.salPeriod,
        objSalaryId: this.objSalary,
        employeeCal: this.employeeCal,
        phaseAdvanceId: this.phaseAdvanceId,
        pageSize: pageSize,
        pageNo: pageNo,
        payrollFund: this.payrollFund,
        payDate: this.payDate,
        employeeCode: this.employeeCode,
        employeeName: this.employeeName,
        departmentName: this.departmentName,
        positionName: this.positionName,
        joinDateSearch: this.joinDateSearch,
        payDateSearch: this.payDateSearch,
        fundName: this.fundName,
      }).subscribe(x => {
        if (x.ok && x.status === 200) {
          const body: IFormatedResponse = x.body
          if (body.statusCode === 200) {
            body.innerBody.list.map((item: any, _index: number) => {
              newInnerBody.push({
                ...item,
                id: item.id
              })
            })
            this.innerBody = newInnerBody;
            this.pageCount = body.innerBody.pageCount;
            this.innerBodyCount$.next(body.innerBody.count)
          } else {
            //this.responseService.resolve(body)
          }
        } else {
          //this.alertService.error(JSON.stringify(x), alertOptions)
        }
        this.loading = false;
        this.selectedIds = [];
      })
    )
  }

  // Pagination
  onCurrentPageChange(event: number) {
    console.log("currentPage changed to: ", event)
    this.currentPage$.next(event)
    this.onGetList(this.pageSize$.value, this.currentPage$.value)
  }

  checkParamValue(checkType: number): boolean {
    this.resetCheckParam()
    let flagCheck: boolean = true;
    this.showRequiredYear = (!this.year ? true : false);
    this.showRequiredSalPeriod = !this.salPeriod ? true : false;
    this.showRequiredObjSalary = !this.objSalary ? true : false;
    this.showRequiredEmployeeCal = !this.employeeCal ? true : false;
    this.showRequiredOrgId = this.listOrgIds.length == 0 ? true : false;
    this.showRequiredPhaseAdvanceId = !this.phaseAdvanceId ? true : false;
    switch (checkType) {
      case 1:
        if (this.showRequiredOrgId == true) {
          this.alertService.error(this.mls.trans('common.select.org') + '!', alertOptions)
        }
        if (this.showRequiredYear == false && this.showRequiredSalPeriod == false && this.showRequiredPhaseAdvanceId == false && this.showRequiredObjSalary == false
          && this.showRequiredEmployeeCal == false && this.showRequiredOrgId == false) {
          flagCheck = true;
        }
        else {
          flagCheck = false;
        }
        break;
      case 2:
        this.showRequiredPayrollFund = !this.payrollFund ? true : false;
        this.showRequiredPayDate = !this.payDate ? true : false;
        if (this.showRequiredOrgId == true) {
          this.alertService.error(this.mls.trans('common.select.org') + '!', alertOptions)
        }
        if (this.showRequiredYear == false && this.showRequiredSalPeriod == false && this.showRequiredObjSalary == false
          && this.showRequiredPhaseAdvanceId == false
          && this.showRequiredPayrollFund == false && this.showRequiredEmployeeCal == false
          && this.showRequiredPayDate == false && this.showRequiredOrgId == false) {
          flagCheck = true;
        }
        else {
          flagCheck = false;
        }
        break;
    }
    return flagCheck
  }

  resetCheckParam(): void {
    this.showRequiredYear = false;
    this.showRequiredSalPeriod = false;
    this.showRequiredObjSalary = false;
    this.showRequiredEmployeeCal = false;
    this.showRequiredOrgId = false;
    this.showRequiredPayrollFund = false;
    this.showRequiredPayDate = false;
    this.showRequiredPhaseAdvanceId = false;
  }

  onSearching(e: ISearchItem[]): void {
    this.searchStream$.next(e);
  }

  resetSearch(): void {
    this.employeeCode = "";
    this.employeeName = "";
    this.departmentName = "";
    this.positionName = "";
    this.joinDateSearch = "";
    this.payDateSearch = "";
    this.fundName = "";
  }


  // EXPORT EXCEL 
  /* START */
  selectedIds: any[] = [];
  prefetchLoading!: boolean;
  longApiRunning!: boolean;
  exportCorePageListGridToExcelSubscription!: Subscription;

  onSelectedIdsChange(e: string[] | number[]) {
    this.selectedIds = e;
    console.log(this.selectedIds);
  }

  exportToExcel(): void {
    if (!this.innerBodyCount$.value) {
      this.alertService.info(this.mls.trans('XLSX_NO_RESULT_TO_EXPORT'), alertOptions);
      return;
    }

    const apiPoint = api.XLSX_EXPORT_CORE_PAGE_LIST_TO_EXCEL;
    const flatColumns: ICoreTableFlatColumnItem[] = [];
    const flatData: any[] = [];
    const keys: string[] = [];

    this.columns.filter(x => !x.hidden).map(c => {
      flatColumns.push(
        {
          caption: c.caption,
          field: c.field,
          type: c.type,
          pipe: c.pipe,
          align: c.align,
          width: c.width,
          hidden: c.hidden
        }
      )
    })

    flatColumns!.map(c => keys.push(c.field));

    this.innerBody.map((row: any) => {
      const e: any = {};
      keys.map(k => {
        e[k] = row[k];
      })
      if (this.selectedIds.length == 0 || this.selectedIds.indexOf(row['id']) !== -1) {
        flatData.push(e);
      }
    })


    const obj = {
      columns: flatColumns,
      data: flatData
    }

    const payload = this.jsonService.stringify(obj);
    this.longApiRunning = true;

    this.exportCorePageListGridToExcelSubscription = this.appService.blobPost(apiPoint, payload).subscribe(response => {
      this.longApiRunning = false;
      if (response.body.statusCode === 400) return

      let downloadLink = document.createElement("a");
      downloadLink.href = window.URL.createObjectURL(new Blob([response.body]))
      downloadLink.setAttribute("download", this.mls.trans(this.title) + ".xlsx");
      document.body.appendChild(downloadLink);
      downloadLink.click();
    })
  }

  override ngOnDestroy(): void {
    this.exportCorePageListGridToExcelSubscription?.unsubscribe()
  }

  /* END */
}

