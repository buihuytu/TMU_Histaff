import { AfterViewInit, Component } from '@angular/core';
import { EnumTranslateKey, api } from 'alpha-global-constants';
import { BaseComponent, EnumCoreButtonVNSCode, EnumCoreOrgTreeaAccessorMode, ICoreDropdownOption, ISearchItem, ICoreTableColumnItem, IPagination, defaultPaging, MultiLanguageService, AppService, ResponseService, AlertService, AuthService, LayoutService, JsonService, ICoreButtonVNS, IFormatedResponse, alertOptions, EnumCoreTablePipeType, ICoreTableFlatColumnItem, ISortItem, EnumSortDirection } from 'ngx-histaff-alpha';
import { Subscription, BehaviorSubject, debounceTime } from 'rxjs';

@Component({
  selector: "cms-app-calculate-tax-year",
  templateUrl: "./calculate-tax-year.component.html",
  styleUrls: ["./calculate-tax-year.component.scss"],
})

export class CalculateTaxYearComponent extends BaseComponent implements AfterViewInit {

  /* Start Init Variable */
  subsctiptions: Subscription[] = [];
  loading!: boolean;
  loadingPage!: boolean;
  errorRequired = EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED;

  headerFirstRowHeight: number = 60;

  compositionHeight!: number;
  treeHeight!: number;
  paginationHeight!: number;

  // HEADER
  title = EnumTranslateKey.UI_COMPONENT_TITLE_PA_PAYROLL_TAX_YEAR;
  headerButtons: EnumCoreButtonVNSCode[] = [
    EnumCoreButtonVNSCode.HEADER_CREATE,
    EnumCoreButtonVNSCode.HEADER_LOCK,
    EnumCoreButtonVNSCode.HEADER_UNLOCK,
  ];

  // ORG_TREE_CHECKBOX
  listOrgIds: number[] = [];
  accessorMode: EnumCoreOrgTreeaAccessorMode = EnumCoreOrgTreeaAccessorMode.CHECKED;

  outerSort: ISortItem[] = [
    {
      field: "jobOrderNum",
      sortDirection: EnumSortDirection.ASC
    }
  ]
  // FILLTER FORM
  year!: number;
  objSalary!: number;
  dateStart!: Date;
  dateEnd!: Date;
  employeeCal!: string;
  // Label
  labelList = {
    year: EnumTranslateKey.UI_LABEL_CUSTOM_PARAM_KIT_YEAR,
    objSalary: EnumTranslateKey.UI_LABEL_CUSTOM_PARAM_KIT_OBJ_SALARY,
    dateStart: EnumTranslateKey.UI_LABEL_CUSTOM_PARAM_KIT_FROM_DATE,
    dateEnd: EnumTranslateKey.UI_LABEL_CUSTOM_PARAM_KIT_TO_DATE,
    employeeCal: EnumTranslateKey.UI_LABEL_CUSTOM_PARAM_KIT_EMPLOYEE_CALCULATE_TAX,
  }

  /* Drop down list */
  // Year
  yearOptions$ = new BehaviorSubject<ICoreDropdownOption[]>([]);
  yearGetByIdObject$ = new BehaviorSubject<any>(null);
  // Salary Object
  objSalaryOptions$ = new BehaviorSubject<ICoreDropdownOption[]>([]);
  objSalaryGetByIdObject$ = new BehaviorSubject<any>(null);

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
  taxCodeSearch: string = "";
  idNoSearch: string = "";

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
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_LEAVEJOB_EFFECTDATE,
      field: 'jobOrderNum',
      type: 'string',
      align: 'center',
      hidden: true,
      width: 0,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_PA_PAYROLLSHEET_SUM_EMPLOYEE_CODE,
      field: 'code',
      type: 'string',
      align: 'left',
      width: 70,
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
      width: 200,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_PA_PAYROLLSHEET_SUM_EMPLOYEE_DEPARTMENT,
      field: 'orgName',
      type: 'string',
      align: 'left',
      width: 200,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_PA_PAYROLL_TAX_YEAR_TAX_CODE,
      field: 'taxCode',
      type: 'string',
      align: 'left',
      width: 100,
    }, {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_PA_PAYROLL_TAX_YEAR_IDENTITY_NUMBER,
      field: 'idNo',
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
  showRequiredObjSalary: boolean = false;
  showRequiredOrgId: boolean = false;
  showRequiredDateStart: boolean = false;
  showRequiredDateEnd: boolean = false;

  /* End Init Variable */

  constructor(
    public override mls: MultiLanguageService,
    private appService: AppService,
    private responseService: ResponseService,
    private alertService: AlertService,
    private authService: AuthService,
    private layoutService: LayoutService,
    private jsonService: JsonService,
  ) {
    super(mls);
    this.shownFrom = "name";
    this.employeeCal = this.authService.data$.value?.fullName!;
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.getListYear();
      this.getListObjSalary();
      this.subscriptions.push(
        this.layoutService.contentContainerHeight$.subscribe(x => {
          this.compositionHeight = x - this.layoutService.corePageHeaderHeight - this.layoutService.basicSpacing;
          this.treeHeight = this.compositionHeight;
          this.tableHeight = this.compositionHeight - 152 - 45 - this.layoutService.corePaginationHeight;
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


    this.subscriptions.push(
      this.mls.lang$.subscribe(x => this.lang = x)
    )

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
          this.taxCodeSearch = x[4].searchFor!;
          this.idNoSearch = x[5].searchFor!;
          this.onGetList(this.pageSize$.value, this.currentPage$.value)
        }
      })
    )!
  }

  // HEADER
  onCorePageHeaderButtonClick(e: ICoreButtonVNS): void {
    switch (e.code) {
      case EnumCoreButtonVNSCode.HEADER_LOCK:
        console.log(this.dateStart + " " + this.dateEnd);
        if (this.checkParamValue() == true) {
          this.loading = true;
          this.subsctiptions.push(
            this.appService.post(api.PA_PAYROLL_TAX_YEAR_LOCK, {
              year: this.year,
              dateStart: this.dateStart,
              dateEnd: this.dateEnd,
              objSalaryId: this.objSalary,
              orgIds: this.listOrgIds,
              lock: 1,
              employeeCal: this.employeeCal
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
        else {
          this.alertService.error(this.mls.trans('NO_SELECTED_ID_TO_DELETE'), alertOptions);
        }
        break;
      case EnumCoreButtonVNSCode.HEADER_UNLOCK:
        console.log(this.dateStart + " " + this.dateEnd);
        if (this.checkParamValue() == true) {
          this.loading = true;
          this.subsctiptions.push(
            this.appService.post(api.PA_PAYROLL_TAX_YEAR_LOCK, {
              year: this.year,
              dateStart: this.dateStart,
              dateEnd: this.dateEnd,
              objSalaryId: this.objSalary,
              orgIds: this.listOrgIds,
              lock: 0,
              employeeCal: this.employeeCal
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
        else {
          this.alertService.error(this.mls.trans('NO_SELECTED_ID_TO_DELETE'), alertOptions);
        }
        break;
      case EnumCoreButtonVNSCode.HEADER_HANDLE:
        this.calculate()
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
    this.year = year;
    console.log(this.year);
    this.showRequiredYear = (!this.year ? true : false);
    this.dateStart = new Date(new Date(this.year + '/01/01'));
    this.dateEnd = new Date(new Date(this.year + '/12/31'));
    console.log(this.dateStart, this.dateEnd);
  }

  onObjSalaryChange(objSalary: number): void {
    this.showRequiredObjSalary = !this.objSalary ? true : false;
    this.objSalary = objSalary;
    this.onLoadDynamicName(this.objSalary);
  }

  onDateStartChange(dateStart: Date): void {
    this.showRequiredDateStart = !this.dateStart ? true : false;
    this.dateStart = dateStart;
  }

  onDateEndChange(dateEnd: Date): void {
    this.showRequiredDateEnd = !this.dateEnd ? true : false;
    this.dateEnd = dateEnd;
  }

  onEmployeeCalChange(employeeCal: string): void {
    this.employeeCal = employeeCal;
  }

  onButtonClick(e: ICoreButtonVNS): void {
    if (this.checkParamValue() == true) {
      this.onGetList(this.pageSize$.value, this.currentPage$.value)
    }
  }

  calculate(): void {
    this.resetSearch();
    if (this.checkParamValue() == true) {
      this.loading = true;
      this.subsctiptions.push(
        this.appService.post(api.PA_PAYROLL_TAX_YEAR_HANDLE_REQUEST, {
          orgIds: this.listOrgIds,
          objSalaryId: this.objSalary,
          year: this.year,
          dateStart: this.dateStart,
          dateEnd: this.dateEnd,
          employeeCal: this.employeeCal,
        }).subscribe(x => {
          if (x.ok && x.status === 200) {
            const body: IFormatedResponse = x.body
            if (body.statusCode === 200) {
              this.loadingPage = false;
              this.onGetList(this.pageSize$.value, this.currentPage$.value)
            } else {
              //this.responseService.resolve(body)
            }
          } else {
            this.alertService.error(JSON.stringify(x), alertOptions)
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
            body.innerBody.map((g: any) => {
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

  getListObjSalary() {
    this.subscriptions.push(
      this.appService.get(api.PA_PAYROLL_TAX_YEAR_GET_OBJ_SALARY_TAX_GROUP).subscribe((x) => {
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

  // GRID DATA -- todo
  onLoadDynamicName(objSalary: number): void {
    this.innerBody = null;
    this.columns = this.staticColumns;
    this.subsctiptions.push(
      this.appService.post(api.PA_PAYROLL_TAX_YEAR_GET_DYNAMIC_NAME, { objSalaryId: objSalary }).subscribe(x => {
        if (x.ok && x.status === 200) {
          const body: IFormatedResponse = x.body
          if (body.statusCode === 200 && !!body.innerBody) {
            const newColumns = JSON.parse(JSON.stringify(this.columns))
            body.innerBody.map((get: any) => {

              if ((get.code).toLowerCase() == 'tax26') {
                newColumns.push({
                  caption: '' + get.name,
                  field: (get.code).toLowerCase(),
                  type: get.name.toLowerCase().includes("hệ số") ? 'formated_decimal' : 'formated_money',
                  align: 'center',
                  width: 150,
                  hideSearchBox: true,
                  pipe: EnumCoreTablePipeType.NUMBER
                })
              }
              else {
                newColumns.push({
                  caption: '' + get.name,
                  field: (get.code).toLowerCase(),
                  type: 'string',
                  align: 'center',
                  width: 110,
                  hideSearchBox: true,
                  pipe: EnumCoreTablePipeType.NUMBER
                })
              }



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
      this.appService.post(api.PA_PAYROLL_TAX_YEAR_GET_LIST, {
        orgIds: this.listOrgIds,
        year: this.year,
        objSalaryId: this.objSalary,
        dateStart: this.dateStart,
        dateEnd: this.dateEnd,
        employeeCode: this.employeeCode,
        employeeName: this.employeeName,
        departmentName: this.departmentName,
        positionName: this.positionName,
        taxCodeSearch: this.taxCodeSearch,
        idNoSearch: this.idNoSearch,
        pageSize: pageSize,
        pageNo: pageNo
      }).subscribe(x => {
        if (x.ok && x.status === 200) {
          const body: IFormatedResponse = x.body
          if (body.statusCode === 200) {
            body.innerBody.list.map((item: any, index: number) => {
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
      })
    )
  }

  // Pagination
  onCurrentPageChange(event: number) {
    console.log("currentPage changed to: ", event)
    this.currentPage$.next(event)
    this.onGetList(this.pageSize$.value, this.currentPage$.value)
  }

  checkParamValue(): boolean {
    this.resetCheckParam()
    let flagCheck: boolean = true;
    this.showRequiredYear = (!this.year ? true : false);
    this.showRequiredObjSalary = !this.objSalary ? true : false;
    this.showRequiredOrgId = this.listOrgIds.length == 0 ? true : false;
    this.showRequiredDateEnd = !this.dateEnd ? true : false;
    this.showRequiredDateStart = !this.dateStart ? true : false;

    if (this.showRequiredOrgId == true) {
      this.alertService.error(this.mls.trans('common.select.org') + '!', alertOptions)
    }
    if (this.showRequiredYear == false && this.showRequiredObjSalary == false && this.showRequiredDateStart == false
      && this.showRequiredDateEnd == false && this.showRequiredOrgId == false) {
      flagCheck = true;
    }
    else {
      flagCheck = false;
    }

    return flagCheck;
  }

  resetCheckParam(): void {
    this.showRequiredYear = false;
    this.showRequiredObjSalary = false
    this.showRequiredOrgId = false;
    this.showRequiredDateStart = false;
    this.showRequiredDateEnd = false;
  }

  // Searching
  onSearching(e: ISearchItem[]): void {
    this.searchStream$.next(e);
  }

  resetSearch(): void {
    this.employeeCode = "";
    this.employeeName = "";
    this.departmentName = "";
    this.positionName = "";
    this.taxCodeSearch = "";
    this.idNoSearch = "";
  }



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
}
