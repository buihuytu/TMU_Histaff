import {
  Component,
  ViewChild,
  TemplateRef,
  AfterViewInit,
  Input,
  ElementRef,
} from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import moment from "moment";
import { BaseComponent, EnumCoreButtonVNSCode, ISearchItem, IPagination, defaultPaging, ICoreDropdownOption,EnumCoreOrgTreeaAccessorMode, IFilterOperator, EnumFilterOperator, IInOperator, ICorePageListCRUD, ICoreTableColumnItem, ICorePageListEditRouting, MultiLanguageService, RandomAvatarService, OrganizationService, AppService, ResponseService, AlertService, CorePageEditService, UrlService, DialogService, LayoutService, JsonService, IFormatedResponse, ICoreButtonVNS, alertOptions, ICoreTableFlatColumnItem, ISortItem, EnumSortDirection } from "ngx-histaff-alpha";
import { BehaviorSubject, Subscription, debounceTime, map, filter } from "rxjs";
import { ShiftSortService } from "./shiftsort.service";
import { EnumTranslateKey, api } from 'alpha-global-constants';

declare let coreFileUtils: any;
const { blobToBase64 } = coreFileUtils;
@Component({
  selector: "cms-app-shift-sort",
  templateUrl: "./shiftsort.component.html",
  styleUrls: ["./shiftsort.component.scss"],
})
export class ShiftSortComponent extends BaseComponent implements AfterViewInit {

  @Input() hideHeader!: boolean;
  @ViewChild('paginationContainer') paginationContainer!: ElementRef;

  /* START: Local filter params */
  orgIds: number[] = [];
  orgId!: number;
  /* END: Local filter params */
  loading!: boolean;
  loadingExport!: boolean;
  tableHeight!: number
  hideCheck: boolean = false;

  listSaturdaySunday: number[] = [];

  customHeaderButton = true;

  pendingAction!: EnumCoreButtonVNSCode;

  buttonItems: EnumCoreButtonVNSCode[] = [
    EnumCoreButtonVNSCode.NONE_HEADER_SEARCH,
  ];

  selectedIds: any[] = [];

  pageCount!: number;

  searchStream$ = new BehaviorSubject<ISearchItem[]>([]);

  // Passing BehaviorSubject to other component is like using a service (that holds this BehaviorSubject) injected to both components
  currentPage$ = new BehaviorSubject<number>(1);
  innerBodyCount$ = new BehaviorSubject<number>(0);
  pagination$ = new BehaviorSubject<IPagination>({
    skip: 0,
    take: defaultPaging.take,
  });
  paginationHeight!: number;
  /* end: passing this var to Pagination */

  pageSize$ = new BehaviorSubject<number>(defaultPaging.take);

  shift!: TemplateRef<any>;
  /*
  Properties being passed to core-page-list
  */
  // Year
  yearOptions$ = new BehaviorSubject<ICoreDropdownOption[]>([]);
  yearGetByIdObject$ = new BehaviorSubject<any>(null);

  compositionHeight!: number;
  treeHeight!: number;

  // Label
  labelList = {
    year: EnumTranslateKey.UI_LABEL_CUSTOM_PARAM_KIT_YEAR,
    salPeriod: EnumTranslateKey.UI_LABEL_CUSTOM_PARAM_KIT_SALARY_PERIOD,
  }
  year!: number;
  salPeriod!: number;
  startDate!: string;
  endDate!: string;
  salaryPeridOptions$ = new BehaviorSubject<ICoreDropdownOption[]>([]);
  atSalaryPeriodGetByIdObject$ = new BehaviorSubject<any>(null);
  atSalaryPeriodGetByIdApi = api.AT_SALARY_PERIOD_READ;
  shownFrom!: string;
  title = EnumTranslateKey.UI_COMPONENT_TITLE_AT_SHIFT_SORT
  corePageListInstanceNumber!: number;
  selectedEmployee: number = 0;
  forceReloadingFlag$ = new BehaviorSubject<boolean>(false);

  accessorMode: EnumCoreOrgTreeaAccessorMode = EnumCoreOrgTreeaAccessorMode.ACTIVATED_SINGLE;
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

  // Searching
  employeeCode: string = "";
  employeeName: string = "";
  departmentName: string = "";
  positionName: string = "";

  apiDefinition: any;

  crud: ICorePageListCRUD = {
    deleteIds: api.HU_WELFARE_MNG_DELETE_IDS
  }

  avatarTemplate!: TemplateRef<any>;
  subsctiptions: Subscription[] = [];

  // testValue: number = 1;
  // shiftOptions$ = new BehaviorSubject<ICoreDropdownOption[]>([{
  //   value: 1,
  //   text: "ANBNABSNABSNABSBANSB"
  // }]);


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
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_AT_SHIFT_SORT_EMPLOYEE_CODE,
      field: 'employeeCode',
      type: 'string',
      align: 'left',
      width: 200,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_AT_SHIFT_SORT_EMPLOYEE_NAME,
      field: 'employeeName',
      type: 'string',
      align: 'left',
      width: 200,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_AT_SHIFT_SORT_DEPARTMENT_NAME,
      field: 'orgName',
      type: 'string',
      align: 'left',
      width: 200,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_AT_SHIFT_SORT_POSITION_NAME,
      field: 'positionName',
      type: 'string',
      align: 'left',
      width: 200,
    },
  ]

  defaultAvatar!: string;

  staticColumns = JSON.parse(JSON.stringify(this.columns))


  editRoute: ICorePageListEditRouting = {
    auxiliary: 'popupAux'
  }
  /* End Properties being passed to core-page-type-a */

  innerBody!: any;

  constructor(
    public override mls: MultiLanguageService,
    private shiftSortService: ShiftSortService,
    private ras: RandomAvatarService,
    private organizationService: OrganizationService,
    private appService: AppService, // CoreService is DEPRECATED!!!,
    private responseService: ResponseService,
    private alertService: AlertService,
    private corePageEditService: CorePageEditService,
    private router: Router,
    private route: ActivatedRoute,
    private urlService: UrlService,
    private dialogService: DialogService,
    private layoutService: LayoutService,
    private jsonService: JsonService,
  ) {
    super(mls);
    this.defaultAvatar = ras.get();

    /* Get orgIds startup value */
    const newOrgIds: number[] = [];
    this.organizationService.status$.value.activeKeys.map(x => newOrgIds.push(Number(x)))
    this.onOrgIdsChange(newOrgIds)

    this.shownFrom = 'name'
    this.corePageListInstanceNumber = new Date().getTime();

    // get year + salary period from create/edit page
    this.shiftSortService.currentSelectedYear.subscribe(year => this.year = year);
    this.shiftSortService.currentperiodId.subscribe(id => this.salPeriod = id);
    console.log(this.salPeriod);
  }

  override ngOnInit(): void {
    // this.tableHeight = window.innerHeight - 360;
    this.subscriptions.push(
      this.mls.lang$.subscribe(x => this.lang = x)
    )

    // if(this.salPeriod == null){
    //   this.shiftSortService.changeperiodID(0);
    // }

    this.shiftSortService.changeEmployeeSelected(0);
    this.shiftSortService.changeListEmployeeSelected([]);

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
          this.onGetList(this.orgIds, this.pageSize$.value, this.currentPage$.value, this.employeeCode, this.employeeName, this.departmentName, this.positionName)
        }


      })
    )!
  }

  getCurrentSalary() {
    const dateNow = new Date()
    this.subsctiptions.push(
      this.shiftSortService.getCurrentPeriodSalary()
        .pipe(
          map((f: any) => {
            let id: number;
            id = f.body.innerBody.id;
            this.salPeriod = id;
            console.log(this.salPeriod);
            this.startDate! = f.body.innerBody.startDate;
            this.endDate! = f.body.innerBody.endDate;
            this.shiftSortService.changeMinDate(this.startDate);
            this.shiftSortService.changeMaxDate(this.endDate);
            this.onSalPeriodChange(this.salPeriod)
            if (this.orgIds.length != 0) {
              this.onGetList(this.orgIds, this.pageSize$.value, this.currentPage$.value, this.employeeCode, this.employeeName, this.departmentName, this.positionName)
            }
            return id;
          })
        )
        .subscribe(response => {
          this.salPeriod = response;
        })
    )!
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.subscriptions.push(
        this.layoutService.contentContainerHeight$.subscribe(x => {
          this.compositionHeight = x - this.layoutService.corePageHeaderHeight - this.layoutService.basicSpacing;
          this.treeHeight = this.compositionHeight;
          this.tableHeight = this.compositionHeight - 102 - this.layoutService.corePaginationHeight;
          this.paginationHeight = this.layoutService.corePaginationHeight;
        })
      )

      this.getListYear();

      if (this.year != null) {
        this.getListPeriod();
      }

      if (this.year == (new Date()).getFullYear() && this.salPeriod == 0) {
        this.getCurrentSalary();
      }


      if ((this.salPeriod != null || this.salPeriod != 0)) {
        this.onSalPeriodChange(this.salPeriod)
      }

      if ((this.salPeriod != null || this.salPeriod != 0) && this.orgIds.length != 0) {
        this.onGetList(this.orgIds, this.pageSize$.value, this.currentPage$.value, this.employeeCode, this.employeeName, this.departmentName, this.positionName)
      }

      this.subscriptions.push( // outer-push
        this.dialogService.dialogConfirmed$.pipe(
          filter(i => !!!this.dialogService.busy && !!i?.confirmed)
        ).subscribe(() => {
          this.dialogService.resetService();
          switch (this.pendingAction) {
            case EnumCoreButtonVNSCode.HEADER_GETSHIFTDEFAULT:
              console.log("HEADER_GETSHIFTDEFAULT");
              this.subsctiptions.push(
                this.appService.post(api.AT_SHIFT_SORT_GET_SHIFT_DEFAULT, { periodId: this.salPeriod, listOrgIds: this.orgIds }).subscribe(x => {
                  if (x.ok && x.status === 200) {
                    const body: IFormatedResponse = x.body
                    if (body.statusCode === 200) {

                      // this.alertService.info(
                      //   this.mls.trans('GET_SUCCESS'),
                      //   alertOptions,
                      // );
                      this.loadGrid()
                    } else {
                      //this.responseService.resolve(body)
                    }
                  } else {
                    //this.alertService.error(JSON.stringify(x), alertOptions)
                  }
                  this.loading = false;
                }
                ))
              break;
            default:
              break;
          }
        }))
    })


  }

  onCurrentPageChange(event: number) {
    console.log("currentPage changed to: ", event)
    this.currentPage$.next(event)
    this.onGetList(this.orgIds, this.pageSize$.value, this.currentPage$.value, this.employeeCode, this.employeeName, this.departmentName, this.positionName)
  }

  onOrgIdsChange(orgIds: number[]) {

    this.orgIds = orgIds  // array 
    this.outerInOperators = [
      {
        field: 'orgId',
        values: orgIds
      }
    ]
    //this.onGetList(orgIds);
    this.innerBody = null;
    this.innerBodyCount$.next(0);
    this.onGetList(this.orgIds, this.pageSize$.value, this.currentPage$.value, this.employeeCode, this.employeeName, this.departmentName, this.positionName)
    //this.shiftSortService.changeListEmployeeSelected([]);
  }



  onYearChange(year: number) {

    if (year.toString().length == 4) {
      this.year = year;
      this.shiftSortService.changeSelectedYear(this.year);
      this.getListPeriod();
    }
    else {
      this.salaryPeridOptions$.next([]);
      this.shiftSortService.changeSelectedYear((new Date()).getFullYear());
      this.shiftSortService.changeperiodID(0);
      this.shiftSortService.changeMinDate("");
      this.shiftSortService.changeMaxDate("");
      this.atSalaryPeriodGetByIdObject$.next(null);
      this.loading = false;
      this.innerBody = null;
      this.columns = this.staticColumns;
      this.innerBodyCount$.next(0);
      this.pageCount = 0;
    }
  }

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
                text: g.toString()
              })
            })

            this.yearOptions$.next(options);

            setTimeout(() => {
              this.yearGetByIdObject$.next({
                id: this.year,
                name: this.year.toString()
              })
            })

          }
        }
      })
    )
  }

  getListPeriod() {
    this.subsctiptions.push(

      this.appService.post(api.AT_SALARY_PERIOD_GET_LIST_IN_YEAR, { year: this.year }).subscribe(x => {
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
          } else {
            //this.responseService.resolve(body)
          }
        } else {
          //this.alertService.error(JSON.stringify(x), alertOptions)
        }
      })
    )
  }

  onSalPeriodChange(salPerId: number) {
    this.innerBodyCount$.next(0);
    this.innerBody = null;
    this.columns = this.staticColumns;
    this.salPeriod = salPerId;
    this.shiftSortService.changeperiodID(salPerId);
    this.listSaturdaySunday = [];
    this.subsctiptions.push(

      this.appService.post(api.AT_SALARY_PERIOD_GET_LIST_PERIOD, { id: salPerId }).subscribe(x => {
        if (x.ok && x.status === 200) {

          const body: IFormatedResponse = x.body

          if (body.statusCode === 200 && !!body.innerBody) {
            this.startDate = body.innerBody.startDate;
            this.endDate = body.innerBody.endDate;
            this.shiftSortService.changeMinDate(this.startDate);
            this.shiftSortService.changeMaxDate(this.endDate);
            let a = moment(this.startDate);
            let b = moment(this.endDate);
            let m = a.month();
            let y = a.year();
            let soNgay = b.diff(a, "days") + 1;
            let today = a.date() - 1;
            const newColumns = JSON.parse(JSON.stringify(this.columns))

            for (let i = 1; i <= soNgay; i++) {
              today += 1;
              let d = new Date(y, m, today);
              let dayOfWeek = moment(d);
              let day = dayOfWeek.day() != 0 ? "T" + Number(dayOfWeek.day() + 1) : "CN";
              let numOffday = dayOfWeek.date();
              let numOfMonth = dayOfWeek.month() + 1;
              // console.log(day + " " + numOffday);
              if (day == "T7" || day == "CN") {
                this.listSaturdaySunday.push(numOffday);
              }

              newColumns.push({
                caption: day +
                  " " +
                  (Number(numOffday) > 9 ? Number(numOffday) : "0" + Number(numOffday)) +
                  "/" +
                  (Number(numOfMonth) > 9 ? Number(numOfMonth) : "0" + Number(numOfMonth)),
                field: 'daY' + i,
                type: 'string',
                align: 'center',
                width: 60,
                // click row to active (display dropdown-list)
                templateRef: this.shift,
                templateRefAllowEditOnRowActived: true,
                hideSearchBox: true,
              })

            }
            this.listSaturdaySunday.forEach(x => {
              //console.log(x);
            })
            this.columns = newColumns;

            //this.onGetList(this.orgIds);
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

  onGetList(listOrgsId: number[], pageSize: number, pageNo: number,
    employeeCode: string, employeeName: string, departmentName: string, positionName: string,) {
    const newInnerBody: any[] = [];
    if (!!this.salPeriod && this.orgIds.length > 0) {
      //alert(this.orgIds.length)
      this.loading = true;
      this.subsctiptions.push(
        this.appService.post(api.AT_SHIFT_SORT_GET_LIST,
          {
            periodId: this.salPeriod,
            listOrgIds: listOrgsId,
            pageSize: pageSize,
            pageNo: pageNo,
            employeeCode: employeeCode,
            employeeName: employeeName,
            departmentName: departmentName,
            positionName: positionName
          }).subscribe(x => {
            if (x.ok && x.status == 200) {
              const body: IFormatedResponse = x.body
              if (body.statusCode === 200) {
                //console.log(1);
                body.innerBody.list.map((item: any, index: number) => {
                  // console.log(item);
                  // for(let key in item) {
                  //   if(item[key] == null){
                  //     item[key] = "OFF"
                  //   }
                  // }
                  // this.listSaturdaySunday.forEach(x => {
                  //   if (item['daY' + x] == null || item['daY' + x] == 0) {
                  //     item['daY' + x] = "OFF"
                  //   }
                  // });
                  newInnerBody.push({
                    ...item,
                    id: item.employeeId
                  })
                })
                this.innerBody = newInnerBody;
                this.pageCount = body.innerBody.pageCount;
                this.innerBodyCount$.next(body.innerBody.count)
                //this.alertService.info(body.innerBody.messageCode, alertOptions)
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
  }


  public loadGrid(): void {
    this.resetSearch();
    this.onGetList(this.orgIds, this.pageSize$.value, this.currentPage$.value, this.employeeCode, this.employeeName, this.departmentName, this.positionName)
  }

  onCorePageHeaderButtonClick(e: ICoreButtonVNS): void {
    switch (e.code) {
      case EnumCoreButtonVNSCode.HEADER_CREATE:
        this.shiftSortService.changeListEmployeeSelected([]);
        this.corePageEditService.fromUrl = this.router.url;

        this.router.navigate([btoa('0'), { listInstance: this.corePageListInstanceNumber }], {
          relativeTo: this.route.parent,
        });
        break;
      case EnumCoreButtonVNSCode.HEADER_EDIT:
        if (this.selectedIds.length > 1) {
          this.alertService.error(this.mls.trans('SELECT_ONLY_ONE_RECORD_TO_EDIT'), alertOptions);
        }
        else {
          if (this.selectedIds.length == 1) {
            this.router.navigate([btoa('' + this.selectedIds[0]), { listInstance: this.corePageListInstanceNumber }], {
              relativeTo: this.route.parent,
            });
          } else {
            this.alertService.error(this.mls.trans('NO_SELECTED_ID_TO_EDIT'), alertOptions);
          }

        }

        break;
      case EnumCoreButtonVNSCode.HEADER_DELETE:
        if (this.selectedIds.length != 0) {
          this.router.navigate(
            [
              {
                outlets: {
                  corePageListAux: [btoa('0'), { listInstance: this.corePageListInstanceNumber }],
                },
              },
            ],
            { relativeTo: this.route },
          );

        } else {
          this.alertService.error(this.mls.trans('NO_SELECTED_ID_TO_DELETE'), alertOptions);
        }
        break;
      case EnumCoreButtonVNSCode.HEADER_GETSHIFTDEFAULT:

        this.pendingAction = EnumCoreButtonVNSCode.HEADER_GETSHIFTDEFAULT
        this.dialogService.title$.next(EnumTranslateKey.UI_CORE_DIALOG_SERVICE_CONFIRMATION)
        this.dialogService.okButtonText$.next(EnumTranslateKey.UI_CORE_CONFIRM_DIALOG_BUTTON_CONFIRM)
        this.dialogService.cancelButtonText$.next(EnumTranslateKey.UI_CORE_CONFIRM_DIALOG_BUTTON_CANCEL)
        this.dialogService.showCancelOnly$.next(false);
        this.dialogService.busy = true;
        this.dialogService.body$.next(EnumTranslateKey.UI_CORE_DIALOG_COMFIRM_GET_DEFAULT_SHIFT);
        this.dialogService.showConfirmDialog$.next(true);

        // this.selectedIds.forEach((value,index)=>{
        //   if(value.id==key) objectArray.splice(index,1);
        // });
        break;
      case EnumCoreButtonVNSCode.HEADER_DOWNLOAD:
        if (this.orgIds != null && this.orgIds.length > 0) {
          this.loadingExport = true;
          const requestBody = {
            periodId: this.salPeriod,
            lstOrg: this.orgIds
          };
          this.subscriptions.push(
            this.appService.blobPost(api.AT_SHIFT_SORT_EXPORT_TEMP, requestBody).subscribe(x => {
              if (x.ok && x.status === 200) {
                let downloadLink = document.createElement("a");
                downloadLink.href = window.URL.createObjectURL(new Blob([x.body]))
                downloadLink.setAttribute("download", "IMPORT_SHIFT_SORT_TEMP.xlsx");
                document.body.appendChild(downloadLink);
                downloadLink.click();
                this.loadingExport = false;
              }
            }))
        }
        else {
          debugger;

          this.alertService.warn("Chưa chọn sơ đồ tổ chức", alertOptions);
        }
        break;
      case EnumCoreButtonVNSCode.HEADER_UPLOAD:
        this.openFileExplorer();
        break;
      case EnumCoreButtonVNSCode.HEADER_EXPORTEXEL:
        this.exportToExcel();
        break;
      default:
        break;
    }
  }

  openFileExplorer(): void {
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    fileInput.click();
  }

  onRowClick(e: any): void {
    this.selectedEmployee = e.employeeId;
    this.shiftSortService.changeEmployeeSelected(e.employeeId);
    console.log("click", e);
  }

  onRowDoubleClick(e: any): void {
    this.selectedEmployee = e.employeeId;
    this.shiftSortService.changeEmployeeSelected(e.employeeId);
    this.shiftSortService.changeListEmployeeSelected([e.employeeId]);
    this.router.navigate([btoa(e.employeeId)], { relativeTo: this.route })
    console.log("double click " + this.selectedEmployee);
  }

  onButtonClick(e: ICoreButtonVNS): void {
    console.log(this.salPeriod);
    if (this.salPeriod == null) {
      this.alertService.error(
        this.mls.trans('common.require.select.salaryperiod') + '!!!', alertOptions
      );

    }
    else if (this.orgIds.length == 0) {
      this.alertService.error(
        this.mls.trans('common.require.select.org') + '!!!', alertOptions
      );
    }
    else {
      this.onGetList(this.orgIds, this.pageSize$.value, this.currentPage$.value, this.employeeCode, this.employeeName, this.departmentName, this.positionName)
    }
  }

  employeeId!: number
  onSelectedIdsChange(e: string[] | number[]) {
    this.selectedIds = e;
    this.shiftSortService.changeListEmployeeSelected(e);
    console.log(this.selectedIds);
    this.shiftSortService.currentListEmployeeSelected.subscribe(id => this.employeeId = id[0])
    console.log(this.employeeId);
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
          debugger;

          this.appService.blobPost(api.AT_SHIFT_SORT_IMPORT_TEMP, requestBody)
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
                  this.resetSearch();
                  this.onGetList(this.orgIds, this.pageSize$.value, this.currentPage$.value, this.employeeCode, this.employeeName, this.departmentName, this.positionName)
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
    this.employeeCode = "";
    this.employeeName = "";
    this.departmentName = "";
    this.positionName = "";
  }

  // EXPORT EXCEL 
  /* START */
  prefetchLoading!: boolean;
  longApiRunning!: boolean;
  exportCorePageListGridToExcelSubscription!: Subscription;

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
      if(this.selectedIds.length == 0 || this.selectedIds.indexOf(row['employeeId']) !== -1){
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
    this.exportCorePageListGridToExcelSubscription?.unsubscribe();
    this.subsctiptions?.map(sub => sub.unsubscribe());
    this.subscriptions?.map(sub => sub.unsubscribe());
    if(!this.router.url.includes('/cms/attendance/business/shiftsort')){
      this.shiftSortService.changeSelectedYear((new Date()).getFullYear());
      this.shiftSortService.changeperiodID(0);
      this.shiftSortService.changeMinDate("");
      this.shiftSortService.changeMaxDate("");
      this.atSalaryPeriodGetByIdObject$.next(null);
    }
  }

  /* END */
}

