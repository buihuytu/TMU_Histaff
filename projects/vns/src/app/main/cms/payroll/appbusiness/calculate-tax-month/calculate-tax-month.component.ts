import { AfterViewInit, Component } from '@angular/core';
import { EnumTranslateKey, api } from 'alpha-global-constants';
import { BaseComponent, EnumCoreButtonVNSCode, EnumCoreOrgTreeaAccessorMode, ICoreDropdownOption, ISearchItem, ICoreTableColumnItem, IPagination, defaultPaging, MultiLanguageService, AppService, AlertService, AuthService, LayoutService, JsonService, ICoreButtonVNS, alertOptions, IFormatedResponse, EnumCoreTablePipeType, ICoreTableFlatColumnItem } from 'ngx-histaff-alpha';
import { Subscription, BehaviorSubject, debounceTime } from 'rxjs';

@Component({
  selector: 'cms-app-calculate-tax-month',
  templateUrl: './calculate-tax-month.component.html',
  styleUrls: ['./calculate-tax-month.component.scss'],
})
export class CalculateTaxMonthComponent extends BaseComponent implements AfterViewInit {
  /* Start Init Variable */
  subsctiptions: Subscription[] = [];
  loading!: boolean;
  loadingPage!: boolean;
  errorRequired = EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED;
  // HEADER
  title = EnumTranslateKey.UI_TITLE_PA_CALCULCATE_TAX_MONTH;
  headerButtons: EnumCoreButtonVNSCode[] = [
    EnumCoreButtonVNSCode.HEADER_CREATE,
    EnumCoreButtonVNSCode.HEADER_LOCK,
    EnumCoreButtonVNSCode.HEADER_UNLOCK,
  ];

  compositionHeight!: number;
  treeHeight!: number;
  paginationHeight!: number;

  // ORG_TREE_CHECKBOX
  listOrgIds: number[] = [];
  accessorMode: EnumCoreOrgTreeaAccessorMode = EnumCoreOrgTreeaAccessorMode.CHECKED;

  // FILLTER FORM
  year!: number;
  month!: number;
  objSalary!: number;
  taxDateId!: number;
  taxDate!: any;
  employeeCal!: string;
  periodId!: number;

  // Label
  labelList = {
    year: EnumTranslateKey.UI_LABEL_CUSTOM_PARAM_KIT_YEAR,
    month: EnumTranslateKey.UI_LABEL_CUSTOM_PARAM_KIT_CALCULCATE_TAX_MONTH,
    objSalary: EnumTranslateKey.UI_LABEL_CUSTOM_PARAM_KIT_OBJ_SALARY,
    taxDate: EnumTranslateKey.UI_COMPONENT_TITLE_PA_PERIOD_TAX_DATE,
    employeeCal: EnumTranslateKey.UI_LABEL_CUSTOM_PARAM_KIT_EMPLOYEE_CALCULATE,
    taxDateId: EnumTranslateKey.UI_LABEL_CUSTOM_PARAM_KIT_PAY_DATE,
  };
  // Validator Form
  showRequiredYear: boolean = false;
  showRequiredMonth: boolean = false;
  showRequiredObjSalary: boolean = false;
  showRequiredPayrollFund: boolean = false;
  showRequiredEmployeeCal: boolean = false;
  showRequiredTaxDate: boolean = false;
  showRequiredOrgId: boolean = false;

  /* Drop down list */
  // Year
  yearOptions$ = new BehaviorSubject<ICoreDropdownOption[]>([]);
  yearGetByIdObject$ = new BehaviorSubject<any>(null);
  // Month
  monthOptions$ = new BehaviorSubject<ICoreDropdownOption[]>([]);
  monthGetByIdObject$ = new BehaviorSubject<any>(null);
  // Salary Object
  objSalaryOptions$ = new BehaviorSubject<ICoreDropdownOption[]>([]);
  objSalaryGetByIdObject$ = new BehaviorSubject<any>(null);
  // Payroll Fund
  taxDateOptions$ = new BehaviorSubject<ICoreDropdownOption[]>([]);
  taxDateGetByIdObject$ = new BehaviorSubject<any>(null);

  shownFrom!: string;
  disabled!: boolean;

  // Button
  buttonItems: EnumCoreButtonVNSCode[] = [
    EnumCoreButtonVNSCode.NONE_HEADER_SEARCH
  ];

  // Grid data
  tableHeight!: number;
  hideCheck: boolean = false;
  innerBody!: any;

  headerWrap!: boolean;
  headerFirstRowHeight: number = 60;
  // Searching
  searchStream$ = new BehaviorSubject<ISearchItem[]>([]);
  employeeCode: string = "";
  employeeName: string = "";
  departmentName: string = "";
  positionName: string = "";
  joinDateSearch: string = "";
  fundName: string = "";

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
      width: 100,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_PA_PAYROLLSHEET_SUM_EMPLOYEE_NAME,
      field: 'fullName',
      type: 'string',
      align: 'left',
      width: 180,
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
      width: 200,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_PA_PAYROLLSHEET_SUM_EMPLOYEE_JOIN_DATE,
      field: 'joinDate',
      type: 'string',
      align: 'center',
      width: 100,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_PA_PERIOD_TAX_DATE,
      field: 'workingday',
      type: 'string',
      align: 'right',
      width: 120,
    },
    // {
    //   caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_PA_PAYROLLSHEET_SUM_EMPLOYEE_PAYROLL_FUND,
    //   field: 'positionName',
    //   type: 'string',
    //   align: 'left',
    //   width: 200,
    // },
  ];

  staticColumns = JSON.parse(JSON.stringify(this.columns));

  // Pagination
  pageCount!: number;
  currentPage$ = new BehaviorSubject<number>(1);
  innerBodyCount$ = new BehaviorSubject<number>(0);
  pagination$ = new BehaviorSubject<IPagination>({
    skip: 0,
    take: defaultPaging.take,
  });
  pageSize$ = new BehaviorSubject<number>(defaultPaging.take);

  /* End Init Variable */

  constructor(
    public override mls: MultiLanguageService,
    private appService: AppService,
    private alertService: AlertService,
    private authService: AuthService,
    private layoutService: LayoutService,
    private jsonService: JsonService,
  ) {
    super(mls);
    this.shownFrom = 'name';
    this.employeeCal = this.authService.data$.value?.fullName!;
  }

  ngAfterViewInit(): void {


    setTimeout(() => {
      this.getListObjSalary();
      this.getListYear();
      this.subscriptions.push(
        this.layoutService.contentContainerHeight$.subscribe(x => {
          this.compositionHeight = x - this.layoutService.corePageHeaderHeight - this.layoutService.basicSpacing;
          this.treeHeight = this.compositionHeight;
          this.tableHeight = this.compositionHeight - 183 - 15 - this.layoutService.corePaginationHeight;
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
    this.subscriptions.push(this.mls.lang$.subscribe((x) => (this.lang = x)));

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
          this.fundName = x[5].searchFor!;
          console.log(this.employeeCode);
          this.onGetList(this.pageSize$.value, this.currentPage$.value)
        }
      })
    )!
  }

  // HEADER
  onCorePageHeaderButtonClick(e: ICoreButtonVNS): void {
    switch (e.code) {
      case EnumCoreButtonVNSCode.HEADER_UNLOCK:
        if (this.periodId == null || this.listOrgIds == null) {
          this.alertService.error(this.mls.trans('NO_SELECTED_ID_TO_DELETE'), alertOptions);
        }
        else {
          console.log(this.periodId + " " + this.listOrgIds);
          this.loading = true;
          this.subsctiptions.push(
            this.appService.post(api.PA_CALCULATE_TAX_MONTH_CHANGE_STATUS_PAROX_TAX_MONTH, {
              statusParoxTaxMonth: 0,
              orgIds: this.listOrgIds,
              periodId: this.periodId
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
      case EnumCoreButtonVNSCode.HEADER_LOCK:
        if (this.periodId == null || this.listOrgIds == null) {
          this.alertService.error(this.mls.trans('NO_SELECTED_ID_TO_DELETE'), alertOptions);
        }
        else {
          console.log(this.periodId + " " + this.listOrgIds);
          this.loading = true;
          this.subsctiptions.push(
            this.appService.post(api.PA_CALCULATE_TAX_MONTH_CHANGE_STATUS_PAROX_TAX_MONTH, {
              statusParoxTaxMonth: 1,
              orgIds: this.listOrgIds,
              periodId: this.periodId
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
      case EnumCoreButtonVNSCode.HEADER_HANDLE:
        this.calculate();
        break;
      case EnumCoreButtonVNSCode.HEADER_EXPORTEXEL:
        this.exportToExcel();
        break;
      default:
        break;
    }
    console.log('onCorePageHeaderButtonClick ', e);
  }

  // ORG_TREE

  // FILLTER FORM

  onYearChange(year: number): void {
    this.getListMonth(year);
    this.getListTaxDate()
    this.month = 0;
    this.taxDateId = 0;
  }

  onMonthChange(month: number): void {
    //this.month = month;
    this.getListTaxDate()

    if (this.month != null) {
      this.subscriptions.push(
        this.appService.get(api.PA_LISTSALARIES_GET_PERIOD + `?year=${this.year}&month=${this.month}`).subscribe((x) => {
          if (x.ok && x.status === 200) {
            const body: IFormatedResponse = x.body;
            if (body.statusCode === 200) {
              this.periodId = body.innerBody.id
            } else {
              //this.responseService.resolve(body);
            }
          } else {
            //this.alertService.error(JSON.stringify(x), alertOptions);
          }
        }),
      );
    }

    this.taxDateId = 0;
  }

  onObjSalaryChange(objSalary: number): void {
    this.objSalary = objSalary;
    this.onLoadDynamicName(this.objSalary);
  }

  onTaxDateChange(taxDateId: number): void {
    this.taxDateId = taxDateId;
    this.taxDate = this.taxDateOptions$.value.filter((x) => x.value === taxDateId)[0].code;
  }

  onEmployeeCalChange(employeeCal: string): void {
    this.employeeCal = employeeCal;
  }

  onButtonClick(e: ICoreButtonVNS): void {
    // if(!!this.year && this.month){
    //   this.subscriptions.push(
    //     this.appService.get(api.PA_LISTSALARIES_GET_PERIOD+`?year=${this.year}&month=${this.month}`).subscribe((x) => {
    //       if (x.ok && x.status === 200) {
    //         const body: IFormatedResponse = x.body;
    //         if (body.statusCode === 200) {
    //           this.periodId = body.innerBody.id
    //         } else {
    //           //this.responseService.resolve(body);
    //         }
    //       } else {
    //         //this.alertService.error(JSON.stringify(x), alertOptions);
    //       }
    //     }),
    //   );
    // }
    if (this.checkParamValue() == true) {
      this.onGetList(this.pageSize$.value, this.currentPage$.value);
    }
  }

  calculate(): void {
    this.resetSearch();
    if (this.listOrgIds.length == 0) {
      this.alertService.error(this.mls.trans('common.select.org') + '!', alertOptions);
      return;
    }
    if (this.checkParamValue() == true) {
      this.loading = true;
      this.subsctiptions.push(
        this.appService
          .post(api.PA_CALCULATE_TAX_MONTH_HANDLE_REQUEST, {
            orgIds: this.listOrgIds,
            year: this.year,
            month: this.month,
            objSalaryId: this.objSalary,
            taxDateId: this.taxDateId,
            employeeCal: this.employeeCal,
            taxDate: this.taxDate,
            periodId: this.periodId
          })
          .subscribe((x) => {
            console.log('!111');
            if (x.ok && x.status === 200) {
              const body: IFormatedResponse = x.body;
              if (body.statusCode === 200) {
                this.loading = true;
                this.loadingPage = true;
                //this.alertService.success(this.mls.trans('common.calculate.successfully'), alertOptions)
                this.onGetList(this.pageSize$.value, this.currentPage$.value)
              } else {
                //this.responseService.resolve(body);
                //this.alertService.error(this.mls.trans('common.calculate.error'), alertOptions)
              }
            } else {
              //this.alertService.error(this.mls.trans('common.calculate.error'), alertOptions)
              //this.alertService.error(JSON.stringify(x), alertOptions);
            }
            this.loading = false;
          }),
      );
    }
  }

  // Function for List DropdownLists
  getListYear() {
    this.subscriptions.push(
      this.appService.get(api.AT_SALARY_PERIOD_GET_YEAR).subscribe((res: any) => {
        if (!!res.ok && res.status === 200) {
          const body: IFormatedResponse = res.body;
          if (body.statusCode === 200 && !!body.innerBody) {
            const options: { value: number | null; text: string }[] = [];
            res.body.innerBody.map((g: any) => {
              options.push({
                value: g,
                text: g,
              });
            });
            this.yearOptions$.next(options);
          }
        }
      }),
    );
  }

  getListMonth(year: number) {
    this.subsctiptions.push(
      this.appService.post(api.PA_CALCULATE_TAX_MONTH_GET_MONTH, { year: year }).subscribe((x) => {
        if (x.ok && x.status === 200) {
          const body: IFormatedResponse = x.body;
          if (body.statusCode === 200 && !!body.innerBody) {
            const options: { value: number | null; text: string }[] = [];
            body.innerBody.map((get: any) => {
              options.push({
                value: get,
                text: get,
              });
            });
            this.monthOptions$.next(options);
          } else {
            //this.responseService.resolve(body);
          }
        } else {
          //this.alertService.error(JSON.stringify(x), alertOptions);
        }
      }),
    );
  }

  getListObjSalary() {
    this.subscriptions.push(
      this.appService.get(api.PA_CALCULATE_TAX_MONTH_GET_OBJ).subscribe((x) => {
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
      }),
    );
  }

  getListTaxDate() {
    this.subsctiptions.push(
      this.appService.post(api.PA_CALCULATE_TAX_MONTH_GET_TAX_DATE, { year: this.year, month: this.month }).subscribe((x) => {
        if (x.ok && x.status === 200) {
          const body: IFormatedResponse = x.body;
          if (body.statusCode === 200 && !!body.innerBody) {
            const options: { value: number | null; text: string; code: string }[] = [];
            body.innerBody.map((get: any) => {
              options.push({
                value: get.id,
                text: get.name,
                code: get.code,
              });
            });
            this.taxDateOptions$.next(options);
          } else {
            //this.responseService.resolve(body);
          }
        } else {
          //this.alertService.error(JSON.stringify(x), alertOptions);
        }
      }),
    );
  }

  // GRID DATA
  onLoadDynamicName(e: number): void {
    this.innerBody = null;
    this.subsctiptions.push(
      this.appService.post(api.PA_CALCULATE_TAX_MONTH_GET_DYNAMIC_NAME, { objSalaryId: e }).subscribe((x) => {
        if (x.ok && x.status === 200) {
          const body: IFormatedResponse = x.body;
          if (body.statusCode === 200 && !!body.innerBody) {
            const newColumns = JSON.parse(JSON.stringify(this.columns));
            body.innerBody.map((get: any) => {
              //console.log(get.code);
              newColumns.push({
                caption: '' + get.name,
                field: get.code.toLowerCase(),
                type: get.name.toLowerCase().includes("hệ số") ? 'formated_decimal' : 'formated_money',
                align: 'right',
                width: 110,
                hideSearchBox: true,
                pipe: EnumCoreTablePipeType.NUMBER
              });
            });

            this.columns = newColumns;
          } else {
            //this.responseService.resolve(body);
          }
        } else {
          //this.alertService.error(JSON.stringify(x), alertOptions);
        }
      }),
    );
  }

  onGetList(pageSize: number, pageNo: number) {
    const newInnerBody: any[] = [];
    this.loading = true;


    this.subsctiptions.push(
      this.appService
        .post(api.PA_CALCULATE_TAX_MONTH_GET_LIST, {
          orgIds: this.listOrgIds,
          year: this.year,
          periodId: this.periodId,
          month: this.month,
          objSalaryId: this.objSalary,
          taxDateId: this.taxDateId,
          taxDate: this.taxDate,
          employeeCal: this.employeeCal,
          employeeCode: this.employeeCode,
          employeeName: this.employeeName,
          departmentName: this.departmentName,
          positionName: this.positionName,
          joinDateSearch: this.joinDateSearch,
          fundName: this.fundName,
          pageSize: pageSize,
          pageNo: pageNo,
        })
        .subscribe((x) => {
          if (x.ok && x.status === 200) {
            const body: IFormatedResponse = x.body;
            if (body.statusCode === 200) {
              body.innerBody.list.map((item: any, index: number) => {
                newInnerBody.push({
                  ...item,
                  id: item.id,
                });
              });
              this.innerBody = newInnerBody;
              this.pageCount = body.innerBody.pageCount;
              this.innerBodyCount$.next(body.innerBody.count);
            } else {
              //this.responseService.resolve(body);
            }
          } else {
            //this.alertService.error(JSON.stringify(x), alertOptions);
          }
          this.loading = false;
        }),
    );
    this.loadingPage = false;

  }

  // Pagination
  onCurrentPageChange(event: number) {
    console.log('currentPage changed to: ', event);
    this.currentPage$.next(event);
    this.onGetList(this.pageSize$.value, this.currentPage$.value)
  }

  onCurrentSizeChange(event: number) {
    console.log('currentSize changed to: ', event);
    this.pageSize$.next(event);
    this.onGetList(this.pageSize$.value, this.currentPage$.value)
  }

  checkParamValue(): boolean {
    this.showRequiredYear = !this.year ? true : false;
    this.showRequiredMonth = !this.month ? true : false;
    this.showRequiredObjSalary = !this.objSalary ? true : false;
    this.showRequiredEmployeeCal = !this.employeeCal ? true : false;
    this.showRequiredTaxDate = !this.taxDateId ? true : false;
    this.showRequiredOrgId = this.listOrgIds.length === 0 ? true : false;
    if (this.showRequiredOrgId == true) {
      this.alertService.error(this.mls.trans('common.select.org') + '!', alertOptions);
    }
    if (
      this.showRequiredYear == false &&
      this.showRequiredMonth == false &&
      this.showRequiredObjSalary == false &&
      this.showRequiredPayrollFund == false &&
      this.showRequiredEmployeeCal == false &&
      this.showRequiredTaxDate == false &&
      this.showRequiredOrgId == false
    ) {
      return true;
    }
    return false;
  }

  onSearching(e: ISearchItem[]): void {
    this.searchStream$.next(e);
  }

  resetSearch(): void {
    this.employeeCode = "";
    this.employeeName = "";
    this.departmentName = "";
    this.positionName = "";
  }


  selectedIds: any[] = [];
  prefetchLoading!: boolean;
  longApiRunning!: boolean;
  exportCorePageListGridToExcelSubscription!: Subscription;

  onSelectedIdsChange(e: string[] | number[]) {
    this.selectedIds = e;
    console.log(this.selectedIds);
  }

  exportToExcel(): void{
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
      if(this.selectedIds.length == 0 || this.selectedIds.indexOf(row['id']) !== -1){
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
}
