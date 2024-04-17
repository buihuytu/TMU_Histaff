import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, Input, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { api, EnumTranslateKey } from 'alpha-global-constants';
import { AlertService, AppService, BaseComponent, CorePageEditService, EnumCoreButtonVNSCode, EnumCoreFormControlSeekerSourceType, EnumFilterOperator, EnumSortDirection, ICoreButtonVNS, ICoreChecklistOption, ICoreDatePickerRange, ICoreDropdownOption, ICorePageListApiDefinition, ICorePageListCRUD, ICorePageListEditRouting, ICoreParamControl, ICoreTableColumnItem, ICoreTableFlatColumnItem, IFilterOperator, IFormatedResponse, IInOperator, IPagination, ISearchItem, ISortItem, JsonService, LayoutService, MultiLanguageService, OrganizationService, UrlService, alertOptions,defaultPaging } from 'ngx-histaff-alpha';
import { BehaviorSubject, Subscription, debounceTime } from 'rxjs';

declare let coreFileUtils: any;
const { blobToBase64 } = coreFileUtils;
@Component({
  selector: 'app-time-import',
  templateUrl: './time-import.component.html',
  styleUrls: ['./time-import.component.scss'],
})
export class TimeImportComponent extends BaseComponent implements AfterViewInit {
  @Input() control!: ICoreParamControl;
  @ViewChild('d01') d01!: TemplateRef<any>;
  @ViewChild('d02') d02!: TemplateRef<any>;
  @ViewChild('d03') d03!: TemplateRef<any>;
  @ViewChild('d04') d04!: TemplateRef<any>;
  @ViewChild('d05') d05!: TemplateRef<any>;
  @ViewChild('d06') d06!: TemplateRef<any>;
  @ViewChild('d07') d07!: TemplateRef<any>;
  @ViewChild('d08') d08!: TemplateRef<any>;
  @ViewChild('d09') d09!: TemplateRef<any>;
  @ViewChild('d10') d10!: TemplateRef<any>;
  @ViewChild('d11') d11!: TemplateRef<any>;
  @ViewChild('d12') d12!: TemplateRef<any>;
  @ViewChild('d13') d13!: TemplateRef<any>;
  @ViewChild('d14') d14!: TemplateRef<any>;
  @ViewChild('d15') d15!: TemplateRef<any>;
  @ViewChild('d16') d16!: TemplateRef<any>;
  @ViewChild('d17') d17!: TemplateRef<any>;
  @ViewChild('d18') d18!: TemplateRef<any>;
  @ViewChild('d19') d19!: TemplateRef<any>;
  @ViewChild('d20') d20!: TemplateRef<any>;
  @ViewChild('d21') d21!: TemplateRef<any>;
  @ViewChild('d22') d22!: TemplateRef<any>;
  @ViewChild('d23') d23!: TemplateRef<any>;
  @ViewChild('d24') d24!: TemplateRef<any>;
  @ViewChild('d25') d25!: TemplateRef<any>;
  @ViewChild('d26') d26!: TemplateRef<any>;
  @ViewChild('d27') d27!: TemplateRef<any>;
  @ViewChild('d28') d28!: TemplateRef<any>;
  @ViewChild('d29') d29!: TemplateRef<any>;
  @ViewChild('d30') d30!: TemplateRef<any>;
  @ViewChild('d31') d31!: TemplateRef<any>;

  valueRefs!: TemplateRef<any>[];
  colorRefs!: TemplateRef<any>[];

  innerBody!: any;
  corePageListInstanceNumber!: number;
  selectedIds: any[] = [];


  // Passing BehaviorSubject to other component is like using a service (that holds this BehaviorSubject) injected to both components
  currentPage$ = new BehaviorSubject<number>(1);
  innerBodyCount$ = new BehaviorSubject<number>(0);
  pagination$ = new BehaviorSubject<IPagination>({
    skip: 0,
    take: defaultPaging.take,
  });
  paginationHeight!: number;
  pageCount!: number;
  pageSize$ = new BehaviorSubject<number>(defaultPaging.take);
  /* end: passing this var to Pagination */

  controlType!: string;
  tableHeight!: number;
  selectedEmployee: number = 0;
  hideCheck: boolean = false;
  empStatusOptions$ = new BehaviorSubject<ICoreChecklistOption[]>([]);
  empStatusGetByIdObject$ = new BehaviorSubject<any>(null);
  empStatusGetByIdApi = api.HU_EMPLOYEE_READ;

  forceReloadingFlag$ = new BehaviorSubject<boolean>(false);

  title = EnumTranslateKey.UI_LABEL_TIME_IMPORT;
  orgIds!: number[];
  loading!: boolean;
  loadingExport!: boolean;
  subsctiptions: Subscription[] = [];
  filterOperators!: IFilterOperator[];
  labelList = {
    year: EnumTranslateKey.UI_LABEL_TIME_IMPORT_YEAR,
    salaryPeriod: EnumTranslateKey.UI_LABEL_TIME_IMPORT_SALARY_PERIOD,
    eployeeCode: EnumTranslateKey.UI_LABEL_TIME_IMPORT_EMPLOYEE_CODE,
    fromDate: EnumTranslateKey.UI_LABEL_TIME_IMPORT_FROM_DATE,
    toDate: EnumTranslateKey.UI_LABEL_TIME_IMPORT_TO_DATE,
    status: EnumTranslateKey.UI_LABEL_TIME_IMPORT_STATUS,
  };
  salPeriod!: number;
  dateStart!: Date;
  dateEnd!: Date;
  employeeId!: number;
  employeeSeekerType: EnumCoreFormControlSeekerSourceType =
    EnumCoreFormControlSeekerSourceType.EMPLOYEE_SEEK;
  statuses!: number[];
  inOperators!: IInOperator[];
  rangeLimit!: ICoreDatePickerRange;
  disabled!: boolean;
  getDate: any[] = [];
  buttonItems: EnumCoreButtonVNSCode[] = [
    EnumCoreButtonVNSCode.NONE_HEADER_SEARCH,
  ];
  checklistOptions$ = new BehaviorSubject<ICoreChecklistOption[]>([]);

  salaryPeridOptions$ = new BehaviorSubject<ICoreDropdownOption[]>([]);
  atSalaryPeriodGetByIdObject$ = new BehaviorSubject<any>(null);
  atSalaryPeriodGetByIdApi = api.AT_SALARY_PERIOD_READ;
  apiDefinition: ICorePageListApiDefinition = {
    queryListRelativePath: api.AT_TIME_TIMESHEET_DAILY_QUERY_LIST,
  };
  crud: ICorePageListCRUD = {
    deleteIds: api.AT_TIME_TIMESHEET_DAILY_DELETE_IDS,
  };
  rightColumns: ICoreTableColumnItem[] = [];

  instanceNumber!: number;
  longApiRunning!: boolean;
  exportCorePageListGridToExcelSubscription!: Subscription;

  // Sắp xếp lưới hiển thị theo cấp chức danh
  outerSort: ISortItem[] = [
    {
      field: "jobOrderNum",
      sortDirection: EnumSortDirection.ASC
    }
  ]

  // Searching
  searchStream$ = new BehaviorSubject<ISearchItem[]>([]);
  employeeCodeSearch: string = "";
  employeeNameSearch: string = "";
  departmentNameSearch: string = "";
  positionNameSearch: string = "";
  salPeriodObjSearch: string = "";

  leftColumns: ICoreTableColumnItem[] = [
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_COMMON_ID,
      field: 'id',
      hidden: true,
      type: 'string',
      align: 'left',
      width: 30,
    },
    {
      caption: EnumTranslateKey.UI_LABEL_TIME_IMPORT_EMPLOYEE_CODE,
      field: 'employeeCode',
      type: 'string',
      align: 'left',
      width: 150,
    },
    {
      caption: EnumTranslateKey.UI_LABEL_TIME_IMPORT_EMPOYEE_NAME,
      field: 'vnFullname',
      type: 'string',
      align: 'left',
      width: 250,
    },
    {
      caption: EnumTranslateKey.UI_LABEL_TIME_IMPORT_POSITION_NAME,
      field: 'positionName',
      type: 'string',
      align: 'left',
      width: 200,
    },
    {
      caption: EnumTranslateKey.UI_LABEL_TIME_IMPORT_ORG_NAME,
      field: 'orgName',
      type: 'string',
      align: 'left',
      width: 200,
    },
    {
      caption: EnumTranslateKey.UI_LABEL_TIME_IMPORT_EMPLOYEE_OBJ,
      field: 'employeeObj',
      type: 'string',
      align: 'left',
      width: 200,
    },
  ];
  columns = [...this.leftColumns, ...this.rightColumns];

  editRoute: ICorePageListEditRouting = {
    auxiliary: 'popupAux',
  };
  year: number = new Date().getFullYear();

  onOrgIdsChange(orgIds: number[]) {
    this.orgIds = orgIds;
    this.outerInOperators = [
      {
        field: 'orgId',
        values: orgIds,
      },
    ];
  }

  outerParam$ = new BehaviorSubject<any>(null);
  outerFilterOperators: IFilterOperator[] = [
    {
      field: 'orgId',
      operator: EnumFilterOperator.EQUAL,
    },
  ];
  outerInOperators: IInOperator[] = [
    {
      field: 'orgId',
      values: this.orgIds || [],
    },
  ];

  compositionHeight!: number;

  constructor(
    public override mls: MultiLanguageService,
    private appService: AppService,
    private layoutService: LayoutService,
    private alertService: AlertService,
    private corePageEditService: CorePageEditService,
    private router: Router,
    private route: ActivatedRoute,
    private urlService: UrlService,
    private http: HttpClient,
    private organizationService: OrganizationService,
    private jsonService: JsonService,

  ) {
    super(mls);
    this.paginationHeight = this.layoutService.corePaginationHeight;
  }
  ngAfterViewInit(): void {

    setTimeout(() => {

      this.valueRefs = [
        this.d01,
        this.d02,
        this.d03,
        this.d04,
        this.d05,
        this.d06,
        this.d07,
        this.d08,
        this.d09,
        this.d10,
        this.d11,
        this.d12,
        this.d13,
        this.d14,
        this.d15,
        this.d16,
        this.d17,
        this.d18,
        this.d19,
        this.d20,
        this.d21,
        this.d22,
        this.d23,
        this.d24,
        this.d25,
        this.d26,
        this.d27,
        this.d28,
        this.d29,
        this.d30,
        this.d31
      ]

      this.disabled = true;

      this.year = new Date().getFullYear();
      this.onYearChange(this.year);
      let date_today = new Date();
      let firstDay = new Date(date_today.getFullYear(), date_today.getMonth(), 1);
      let lastDay = new Date(date_today.getFullYear(), date_today.getMonth() + 1, 0);

      this.subscriptions.push(
        this.appService.post(api.AT_SALARY_PERIOD_GET_LIST_IN_YEAR, { year: this.year }).subscribe(x => {
          if (x.ok && x.status === 200) {
            const body: IFormatedResponse = x.body
            if (body.statusCode === 200) {
              body.innerBody.map((get: any) => {

                if (get.month == date_today.getMonth() + 1) {
                  this.salPeriod = get.id;
                  this.dateStart = firstDay;
                  this.dateEnd = lastDay;
                  this.onSalPeriodChange(get.id);
                }
              });
            }
          }
        })
      )

      this.subscriptions.push(
        this.layoutService.contentContainerHeight$.subscribe(x => {
          this.compositionHeight = x - this.layoutService.corePageHeaderHeight - this.layoutService.basicSpacing;
          this.tableHeight = this.compositionHeight - 124 - 15 - this.layoutService.corePaginationHeight;
        })
      )

    })
  }

  override ngOnInit(): void {

    const cachedOrgIds: number[] = [];
    this.organizationService.status$.value?.activeKeys.map(x => {
      cachedOrgIds.push(Number(x))
    })
    this.orgIds = cachedOrgIds

    this.instanceNumber = new Date().getTime();
    this.onYearChange(this.year);
    this.subscriptions.push(this.mls.lang$.subscribe((x) => (this.lang = x)));
    this.subscriptions.push(
      this.appService.get(api.SYS_OTHERLIST_GET_EMP_STATUS).subscribe((x) => {
        if (x.ok && x.status == 200) {
          const body: IFormatedResponse = x.body;
          if (body.statusCode == 200) {
            const newOptions: ICoreChecklistOption[] = [];
            const newStatusIds: any[] = [];
            body.innerBody.map((y: any) => {
              newOptions.push({
                value: y.id,
                text: y.name,
                checked: true,
              });
              newStatusIds.push(y.id);
            });
            this.statuses = newStatusIds;
            this.empStatusOptions$.next(newOptions);
          }
        }
      })
    );

    this.subscriptions.push(
      this.mls.lang$.subscribe(x => this.lang = x)
    )

    this.subscriptions.push(
      this.searchStream$.pipe(
        debounceTime(500),
      ).subscribe(x => {
        //console.log("Do smth with search here...")
        // do smth with x
        if (x.length != 0) {
          this.employeeCodeSearch = x[0].searchFor;
          this.employeeNameSearch = x[1].searchFor!;
          this.positionNameSearch = x[2].searchFor!;
          this.departmentNameSearch = x[3].searchFor!;
          this.salPeriodObjSearch = x[4].searchFor!;
          this.onGetList(this.orgIds, this.employeeCodeSearch, this.employeeNameSearch, this.departmentNameSearch, this.positionNameSearch, this.salPeriodObjSearch);
        }

      })
    )!
  }

  onYearChange(year: number) {
    if (year.toString().length == 4) {
      this.year = year;
      this.getListPeriod();
    } else {
      this.salaryPeridOptions$.next([]);
      this.atSalaryPeriodGetByIdObject$.next(null);
      this.loading = false;
    }
  }

  onSalPeriodChange(salPerId: number) {
    this.salPeriod = salPerId;
    this.subsctiptions.push(
      this.appService
        .post(api.AT_SALARY_PERIOD_GET_LIST_PERIOD, { id: salPerId })
        .subscribe((x) => {
          if (x.ok && x.status === 200) {
            const body: IFormatedResponse = x.body;

            if (body.statusCode === 200) {
              this.rangeLimit = {
                minDate: new Date(body.innerBody.startDate),
                maxDate: new Date(body.innerBody.endDate),
              };

              this.dateStart = body.innerBody.startDate;
              this.dateEnd = body.innerBody.endDate;

              this.disabled = false;
            } else {
              //this.responseService.resolve(body)
            }
          } else {
            //this.alertService.error(JSON.stringify(x), alertOptions)
          }
          let newColumns: ICoreTableColumnItem[] = JSON.parse(JSON.stringify(this.leftColumns));
          let dateGet = this.getDateOnMonth(
            x.body.innerBody.year,
            x.body.innerBody.month
          );
          let getDate = '';
          dateGet.forEach((item, index) => {
            const itemAfCut: string[] = item.toString().split(' ');
            let fisrtItem: string = itemAfCut[0];
            switch (fisrtItem) {
              case 'Mon':
                fisrtItem = this.mls.trans(
                  EnumTranslateKey.UI_LABEL_TIME_IMPORT_MONDAY,
                  this.lang
                );
                break;
              case 'Tue':
                fisrtItem = this.mls.trans(
                  EnumTranslateKey.UI_LABEL_TIME_IMPORT_TUESDAY,
                  this.lang
                );
                break;
              case 'Wed':
                fisrtItem = this.mls.trans(
                  EnumTranslateKey.UI_LABEL_TIME_IMPORT_WEDNESDAY,
                  this.lang
                );
                break;
              case 'Thu':
                fisrtItem = this.mls.trans(
                  EnumTranslateKey.UI_LABEL_TIME_IMPORT_THURSDAY,
                  this.lang
                );
                break;
              case 'Fri':
                fisrtItem = this.mls.trans(
                  EnumTranslateKey.UI_LABEL_TIME_IMPORT_FRIDAY,
                  this.lang
                );
                break;
              case 'Sat':
                fisrtItem = this.mls.trans(
                  EnumTranslateKey.UI_LABEL_TIME_IMPORT_SATURDAY,
                  this.lang
                );
                break;
              case 'Sun':
                fisrtItem = this.mls.trans(
                  EnumTranslateKey.UI_LABEL_TIME_IMPORT_SUNDAY,
                  this.lang
                );
                break;
            }
            if (x.body.innerBody.month > 9) {
              getDate =
                fisrtItem + ' ' + itemAfCut[2] + '/' + x.body.innerBody.month;
            } else {
              getDate =
                fisrtItem + ' ' + itemAfCut[2] + '/0' + x.body.innerBody.month;
            }
            let e = Number(itemAfCut[2]).toString();
            newColumns.push({
              caption: getDate,
              align: 'center',
              field: 'd' + itemAfCut[2],
              type: 'string',
              width: 50,
              templateRef: this.valueRefs[index],
              hideSearchBox: true,
            });
            this.columns = newColumns;
          });
          console.log(this.columns);
        })
    );
  }
  getListPeriod() {
    this.subsctiptions.push(
      this.appService
        .post(api.AT_SALARY_PERIOD_GET_LIST_IN_YEAR, { year: this.year })
        .subscribe((x) => {
          if (x.ok && x.status === 200) {
            const body: IFormatedResponse = x.body;
            if (body.statusCode === 200) {
              const options: { value: number; text: string; code: string }[] =
                [];
              body.innerBody.map((get: any) => {
                options.push({
                  value: get.id,
                  text: get.name,
                  code: get.month,
                });
              });
              this.salaryPeridOptions$.next(options);
              this.salPeriod = options.filter(
                (option) =>
                  Number.parseInt(option.code) === new Date().getMonth() + 1
              )[0].value;
              console.log(this.salPeriod);
              if (!!this.salPeriod) {
                this.disabled = false;
              }
            } else {
              //this.responseService.resolve(body)
            }
          } else {
            //this.alertService.error(JSON.stringify(x), alertOptions)
          }
        })
    );
  }
  onDateStartChange(dateStart: Date) {
    this.dateStart = this.dateStart;
    console.log(this.dateStart);
  }
  onDateEndChange(dateEnd: Date) {
    this.dateEnd = this.dateEnd;
    console.log(this.dateEnd);
  }
  onEmployeeChange(employeeId: number) {
    this.employeeId = employeeId;
    console.log(this.employeeId);
  }
  onStatusChange(statuses: number[]) {
    this.statuses = statuses;
    console.log(this.statuses);
  }
  onButtonClick(e: ICoreButtonVNS) {
    if (this.salPeriod == null) {
      this.alertService.error(`Select Salary Period to Find!!!`, alertOptions);
    } else if (this.orgIds?.length === 0) {
      this.alertService.error(
        `Select Organization Name to Find!!!`,
        alertOptions
      );
    } else {
      this.onGetList(this.orgIds, this.employeeCodeSearch, this.employeeNameSearch, this.departmentNameSearch, this.positionNameSearch, this.salPeriodObjSearch);
    }
  }
  onRowClick(e: any): void {
    this.selectedEmployee = e.employeeId;
    console.log('click', e);
  }
  onGetList(listOrgsId: number[], employeeCode: string, employeeName: string, departmentName: string, positionName: string, salPeriodObj: string) {
    const newInnerBody: any[] = [];
    if (!!this.salPeriod && this.orgIds.length > 0) {
      this.loading = true;
      this.subscriptions.push(
        this.appService
          .post(api.AT_TIME_TIMESHEET_DAILY_GET_LIST_TIME_SHEET, {
            periodId: this.salPeriod,
            listOrgIds: listOrgsId,
            employeeId: this.employeeId,
            employeeCodeSearch: employeeCode,
            employeeNameSearch: employeeName,
            departmentNameSearch: departmentName,
            positionNameSearch: positionName,
            salPeriodObjSearch: salPeriodObj,
          })
          .subscribe((x) => {
            this.loading = false;
            if (x.body && x.status == 200) {
              const body: IFormatedResponse = x.body;
              if (body.statusCode == 200) {
                body.innerBody.list.map((item: any, index: number) => {
                  newInnerBody.push({
                    ...item,
                    id: item.stt,
                  });
                });
                this.innerBodyCount$.next(body.innerBody.count)
              } else {
              }
            } else {
            }
            this.innerBody = newInnerBody;

            /*
            this.columns.map((x) => {
              Object.keys(this.innerBody[0]).map((y) => {
                if (x.color == y.toString()) {
                  x.color = this.innerBody[0][y];
                  console.log(x);
                }
              });
              switch (x.color) {
                case 999:
                  x.color = '#F1FFC1';
                  break;
                case 5:
                  x.color = '#E2F2FF';
                  break;
              }
            });
            */
          })
      );

      // for(let i = 0; i < )
    }
  }
  getDateOnMonth(year: number, month: number) {
    const numDate = new Date(year, month, 0).getDate();
    const dateOnMonth: Date[] = [];
    for (let date = 1; date <= numDate; date++) {
      const today = new Date(year, month - 1, date);
      dateOnMonth.push(today);
    }
    return dateOnMonth;
  }
  public loadGrid(): void {
    this.resetSearch();
    this.onGetList(this.orgIds, this.employeeCodeSearch, this.employeeNameSearch, this.departmentNameSearch, this.positionNameSearch, this.salPeriodObjSearch);
  }
  onCorePageHeaderButtonClick(e: ICoreButtonVNS): void {
    switch (e.code) {
      case EnumCoreButtonVNSCode.HEADER_CREATE:
        this.corePageEditService.fromUrl = this.router.url;

        this.router.navigate(
          [btoa('0'), { listInstance: this.corePageListInstanceNumber }],
          {
            relativeTo: this.route.parent,
          }
        );
        break;
      case EnumCoreButtonVNSCode.HEADER_UPLOAD:
        this.openFileExplorer();
        break;
      case EnumCoreButtonVNSCode.HEADER_DOWNLOAD:

        if (this.orgIds != null && this.orgIds.length > 0) {
          debugger;

          if (this.statuses.length > 0) {
            debugger;
            this.loadingExport = true;
            const requestBody = {
              periodId: this.salPeriod,
              lstOrg: this.orgIds,
              lstRankCode: this.statuses
            };
            this.subscriptions.push(
              this.appService.blobPost(api.AT_TIME_TIMESHEET_DAILY_EXPORT_TEMP, requestBody).subscribe(x => {
                if (x.ok && x.status === 200) {
                  let downloadLink = document.createElement("a");
                  downloadLink.href = window.URL.createObjectURL(new Blob([x.body]))
                  downloadLink.setAttribute("download", "IMPORT_TIME_SHEET_TEMP.xlsx");
                  document.body.appendChild(downloadLink);
                  downloadLink.click();
                  this.loadingExport = false;
                }
              }))
          }
          else {
            debugger;

            this.alertService.warn("Chưa chọn trạng thái", alertOptions);

          }

        }
        else {
          debugger;

          this.alertService.warn("Chưa chọn sơ đồ tổ chức", alertOptions);
        }
        break;
      case EnumCoreButtonVNSCode.HEADER_DELETE:
        if (this.selectedIds.length != 0) {
          this.router.navigate(
            [
              {
                outlets: {
                  corePageListAux: [
                    btoa('0'),
                    { listInstance: this.corePageListInstanceNumber },
                  ],
                },
              },
            ],
            { relativeTo: this.route }
          );
        } else {
          this.alertService.error(
            this.mls.trans('NO_SELECTED_ID_TO_DELETE'),
            alertOptions
          );
        }
        break;
      case EnumCoreButtonVNSCode.HEADER_GETSHIFTDEFAULT:
        const confirm = window.confirm(
          'Bạn có chắc chắn cập nhật lại ca mặc định?'
        );
        if (confirm) {
          this.subsctiptions.push(
            this.appService
              .post(api.AT_SHIFT_SORT_GET_SHIFT_DEFAULT, {
                periodId: this.salPeriod,
                listOrgIds: this.orgIds,
              })
              .subscribe((x) => {
                if (x.ok && x.status === 200) {
                  const body: IFormatedResponse = x.body;
                  if (body.statusCode === 200) {
                    this.forceReloadingFlag$.next(
                      !!!this.forceReloadingFlag$.value
                    );
                    this.router.navigateByUrl(
                      this.urlService.previousRouteUrl$.value
                    );
                    this.alertService.info(
                      this.mls.trans('GET_SUCCESS'),
                      alertOptions
                    );
                    this.loadGrid();
                  } else {
                    //this.responseService.resolve(body)
                  }
                } else {
                  //this.alertService.error(JSON.stringify(x), alertOptions)
                }
                this.loading = false;
              })
          );
        }
        break;
      case EnumCoreButtonVNSCode.HEADER_EXPORTEXEL:
        this.exportToExcel();
        break;
      default:
        break;
    }
  }
  onSelectedIdsChange(e: any) {
    this.selectedIds = e;
    console.log(this.selectedIds);
  }
  openFileExplorer(): void {
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    fileInput.click();
  }
  onRowDoubleClick(e: any): void {
    this.router.navigate([btoa(e.id)], { relativeTo: this.route })
  }
  getColorByCode(code: number): string {
    switch (code) {
      case 1:
        return 'red'
      case 2:
        return 'yellow'
      case 3:
        return 'green'
      case 4:
        return 'orange'
      default:
        return 'gray'
    }
  }
  onCurrentPageChange(event: number) {
    console.log("currentPage changed to: ", event)
    this.currentPage$.next(event)
    // , this.pageSize$.value, this.currentPage$.value
    this.onGetList(this.orgIds, this.employeeCodeSearch, this.employeeNameSearch, this.departmentNameSearch, this.positionNameSearch, this.salPeriodObjSearch);
  }
  inputFile = async (e: any) => {
    if (this.salPeriod == null) {
      this.alertService.warn('Chưa chọn kỳ công', alertOptions);

    }
    else {


      const fileInput = document.getElementById('fileInput') as HTMLInputElement;

      if (fileInput.value != '') {
        console.log("inputFile e", e)
        const files = e.target.files;
        const file = files[0];
        let fileName = file.name;

        const blob = new Blob([file]);

        blobToBase64(blob).then((base64: any) => {
          const requestBody = {
            periodId: this.salPeriod,
            base64: base64,
          };

          this.appService.blobPost(api.AT_TIME_TIMESHEET_DAILY_IMPORT_TEMP, requestBody)
            .subscribe(
              (response: Blob) => {
                // Check if the response is a file
                if (response.type === 'application/octet-stream') {
                  // Create a download link for the file
                  const downloadLink = document.createElement('a');
                  const url = window.URL.createObjectURL(response);
                  downloadLink.href = url;
                  downloadLink.download = 'Error_ImportTimeSheet.xlsx';
                  downloadLink.click();
                  window.URL.revokeObjectURL(url);
                } else {

                  const reader = new FileReader();
                  reader.onload = () => {
                    const jsonBody = reader.result as string;
                    const data = JSON.parse(jsonBody);
                    if (data.statusCode == 200) {
                      this.alertService.success(data.messageCode, alertOptions);
                    }
                    else {
                      this.alertService.error(data.messageCode, alertOptions);
                    }
                  };
                  reader.readAsText(response);

                  //load lại lưới
                  this.onGetList(this.orgIds, this.employeeCodeSearch, this.employeeNameSearch, this.departmentNameSearch, this.positionNameSearch, this.salPeriodObjSearch);
                  this.loadingExport = false;

                }
              },
              (error: any) => {
                // Handle the error
                console.error(error);
              }
            );

          fileInput.value = '';
        });
      }
    }
  };

  // Searching
  onSearching(e: ISearchItem[]): void {
    this.searchStream$.next(e);
  }

  resetSearch(): void {
    this.employeeCodeSearch = "";
    this.employeeNameSearch = "";
    this.departmentNameSearch = "";
    this.positionNameSearch = "";
    this.salPeriodObjSearch = "";
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
}
