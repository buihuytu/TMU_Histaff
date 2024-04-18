import { HttpClient } from "@angular/common/http";
import { Component, AfterViewInit } from "@angular/core";
import { EnumTranslateKey, api } from 'alpha-global-constants';
import { BaseComponent, EnumCoreButtonVNSCode, ICoreDropdownOption, IFilterOperator, EnumCoreFormControlSeekerSourceType, IInOperator, ICoreDatePickerRange, ICoreChecklistOption, ICorePageListApiDefinition, ISortItem, EnumSortDirection, ICorePageListEditRouting, EnumFilterOperator, MultiLanguageService, AppService, AlertService, CorePageListService, IFormatedResponse, EnumCoreTablePipeType, ICoreButtonVNS, alertOptions } from "ngx-histaff-alpha";
import { BehaviorSubject, Subscription } from "rxjs";

@Component({
  selector: 'app-import-monthly-tax',
  templateUrl: './import-monthly-tax.component.html',
  styleUrls: ['./import-monthly-tax.component.scss'],
})
export class ImportMonthlyTaxComponent extends BaseComponent implements AfterViewInit {
  buttons: EnumCoreButtonVNSCode[] = [
    EnumCoreButtonVNSCode.HEADER_DOWNLOAD,
    EnumCoreButtonVNSCode.HEADER_UPLOAD,
    EnumCoreButtonVNSCode.HEADER_CREATE,
  ];

  taxDateId!: number;
  taxDateOptions$ = new BehaviorSubject<ICoreDropdownOption[]>([]);
  taxDateGetByIdObject$ = new BehaviorSubject<any>(null);

  title = EnumTranslateKey.UI_LABEL_IMPORT_MONTHLY_TAX;
  orgIds!: number[];
  loading!: boolean;
  loadingExport!: boolean;
  subscription: Subscription[] = [];
  filterOperators!: IFilterOperator[];
  objSalId!: number;

  objectSalOptions$ = new BehaviorSubject<ICoreDropdownOption[]>([]);
  objectSalGetByIdObject$ = new BehaviorSubject<any>(null);
  objectSalGetByIdApi = api.PA_LISTSALARIES_READ_OBJ_SAL;
  listInstance!: number;
  labelList = {
    year: EnumTranslateKey.UI_LABEL_TIME_IMPORT_YEAR,
    salaryPeriod: EnumTranslateKey.UI_LABEL_TIME_IMPORT_SALARY_PERIOD,
    eployeeCode: EnumTranslateKey.UI_LABEL_TIME_IMPORT_EMPLOYEE_CODE,
  };
  salPeriod!: number | null;
  shownFrom: string = 'name';
  dateStart!: Date;
  dateEnd!: Date;
  employeeId!: number;
  employeeSeekerType: EnumCoreFormControlSeekerSourceType = EnumCoreFormControlSeekerSourceType.EMPLOYEE_SEEK;
  statuses!: number[];
  inOperators!: IInOperator[];
  rangeLimit!: ICoreDatePickerRange;
  disabled!: boolean;
  getDate: any[] = [];
  buttonItems: EnumCoreButtonVNSCode[] = [EnumCoreButtonVNSCode.NONE_HEADER_SEARCH];
  checklistOptions$ = new BehaviorSubject<ICoreChecklistOption[]>([]);

  salaryPeriodOptions$ = new BehaviorSubject<ICoreDropdownOption[]>([]);
  atSalaryPeriodGetByIdObject$ = new BehaviorSubject<any>(null);
  atSalaryPeriodGetByIdApi = api.AT_SALARY_PERIOD_READ;




  errorRequired = EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED;
  showRequiredYear: boolean = false;
  showRequiredPeriod: boolean = false;
  showRequiredDateCal: boolean = false;
  showRequiredOrgId: boolean = false;
  showRequiredObj: boolean = false;
  showRequiredCode: boolean = false;



  apiDefinition: ICorePageListApiDefinition = {
    queryListRelativePath: api.PA_IMPORT_MONTHLY_TAX_QUERY_LIST,
  };

  rightColumns: any[] = [];

  // Sắp xếp lưới hiển thị theo cấp chức danh
  outerSort: ISortItem[] = [
    {
      field: "jobOrderNum",
      sortDirection: EnumSortDirection.ASC
    }
  ]

  leftColumns: any[] = [
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_COMMON_ID,
      field: 'id',
      hidden: true,
      type: 'string',
      align: 'left',
      width: 30,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_COMMON_ID,
      field: 'employeeId',
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
      field: 'employeeName',
      type: 'string',
      align: 'left',
      width: 200,
    },
    {
      caption: EnumTranslateKey.UI_LABEL_TIME_IMPORT_POSITION_NAME,
      field: 'positionName',
      type: 'string',
      align: 'left',
      width: 250,
    },
    {
      caption: EnumTranslateKey.UI_LABEL_TIME_IMPORT_ORG_NAME,
      field: 'orgName',
      type: 'string',
      align: 'left',
      width: 250,
    },
    {
      caption: EnumTranslateKey.UI_LABEL_TIME_IMPORT_NOTE,
      field: 'note',
      type: 'string',
      align: 'left',
      width: 250,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_COMMON_JOB_ORDER_NUM,
      field: 'jobOrderNum',
      type: 'string',
      align: 'right',
      width: 0,
      hidden: true,
    },
  ];
  columns = [...this.leftColumns];

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

  constructor(
    public override mls: MultiLanguageService,
    private appService: AppService,
    private alertService: AlertService,
    private http: HttpClient,
    private corePageListService: CorePageListService

  ) {
    super(mls);
    this.statuses = [];
  }
  ngAfterViewInit(): void {
    setTimeout(() => {
      this.onYearChange(this.year);
      this.subscription.push(
        this.appService.get(api.PA_IMPORT_MONTHLY_TAX_GET_OBJ).subscribe((x) => {
          if (x.ok && x.status === 200) {
            const body: IFormatedResponse = x.body;
            if (body.statusCode === 200) {
              const options: { value: number; text: string }[] = [];
              body.innerBody.map((get: any) => {
                options.push({
                  value: get.id,
                  text: get.name,
                });
              });
              this.objectSalOptions$.next(options);
            }
          }
        }),
      );
    });
    this.disabled = true;
  }

  override ngOnInit(): void {
    this.subscriptions.push(this.mls.lang$.subscribe((x) => (this.lang = x)));
  }
  onInstanceCreated(e: number) {
    this.listInstance = e
  }
  onYearChange(year: number) {
    if (year.toString().length == 4) {
      this.year = year;
      this.getListPeriod();
    } else {
      this.salaryPeriodOptions$.next([]);
      this.atSalaryPeriodGetByIdObject$.next(null);
      this.loading = false;
    }
  }
  onSalPeriodChange(salPerId: number) {
    this.salPeriod = salPerId;

    if (salPerId != null) {
      this.subscription.push(
        this.appService.get(api.PA_IMPORT_TAX_MONTH_GET_TAX_DATE + salPerId).subscribe((x) => {
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
            }
          }
        }),
      );
    }
    else {
      let opt: ICoreDropdownOption[] = [];
      this.taxDateOptions$.next(opt);
    }

  }
  getListPeriod() {
    this.subscription.push(
      this.appService.post(api.AT_SALARY_PERIOD_GET_LIST_IN_YEAR, { year: this.year }).subscribe((x) => {
        if (x.ok && x.status === 200) {
          const body: IFormatedResponse = x.body;
          if (body.statusCode === 200) {
            const options: { value: number; text: string; code: string }[] = [];
            body.innerBody.map((get: any) => {
              options.push({
                value: get.id,
                text: get.name,
                code: get.month,
              });
            });
            this.salPeriod = options.filter((x) => x.code == (new Date().getMonth() + 1).toString())[0].value;
            this.onSalPeriodChange(options.filter((x) => x.code == (new Date().getMonth() + 1).toString())[0].value);
            this.salaryPeriodOptions$.next(options);
          }
        }
      }),
    );
  }
  onListSalChange(statuses: number[]) {
    this.loading = true;
    let newColumns = JSON.parse(JSON.stringify(this.leftColumns));
    statuses.forEach((x) => {
      let op = this.checklistOptions$.value.filter((y) => y.value === x);
      let column = {
        caption: op[0].text.split(': ')[1],
        width: 200,
        field: `${op[0].text.split(': ')[0].toLowerCase()}`,
        type: 'number',
        pipe: EnumCoreTablePipeType.NUMBER,
        align: 'left',
      };
      newColumns.push(column);
    });
    this.columns = newColumns;
    this.loading = false;
  }

  onObjectSalChange(objectId: number) {
    this.columns = [...this.leftColumns];
    if (this.objSalId != null) {
      this.subscription.push(
        this.appService.get(api.PA_SALARY_IMPORT_GET_LIST_SAL_BY_ID + objectId).subscribe((x) => {
          if (x.ok && x.status === 200) {
            let body = x.body.innerBody;
            let opt: ICoreChecklistOption[] = [];
            body?.map((e: any) => {
              opt.push({
                value: e.id,
                text: e.name,
                checked: false,
              });
            });
            this.checklistOptions$.next(opt);
          }
        }),
      );
    }
    else {
      let opt: ICoreChecklistOption[] = [];
      this.checklistOptions$.next(opt);
    }
  }
  onButtonClick(e: ICoreButtonVNS) {
    if (e.code === EnumCoreButtonVNSCode.NONE_HEADER_SEARCH) {
      this.outerParam$.next({
        periodId: this.salPeriod,
        objSalaryId: this.objSalId,
        employeeId: this.employeeId,
        dateCalculateId: this.taxDateId
      });
    }
  }

  onCorePageHeaderButtonClick(e: ICoreButtonVNS) {
    switch (e.code) {
      case EnumCoreButtonVNSCode.HEADER_DOWNLOAD:
        if (this.checkParamValue() == true) {


          if (this.orgIds != null && this.orgIds.length > 0) {

            if (this.statuses.length > 0) {


              if (this.taxDateId != null && this.taxDateId > 0) {

                this.loadingExport = true;
                const requestBody = {
                  periodId: this.salPeriod,
                  salObjId: this.objSalId,
                  lstOrg: this.orgIds,
                  lstRankCode: this.statuses,
                  dateCalId: this.taxDateId,
                  employeeId: this.employeeId
                };
                this.http.post(api.PA_IMPORT_MONTHLY_TAX_EXPORT_TEMP, requestBody, { responseType: 'blob' })
                  .subscribe(
                    (response: Blob) => {
                      if (response.type === 'application/octet-stream') {
                        const downloadLink = document.createElement('a');
                        const url = window.URL.createObjectURL(response);
                        downloadLink.href = url;
                        downloadLink.download = 'IMPORT_MONTHLY_TAX.xlsx';
                        downloadLink.click();
                        window.URL.revokeObjectURL(url);
                        this.loadingExport = false;
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
                        this.loadingExport = false;

                      }
                    }
                  )

              }
              else {
                this.alertService.warn("Chưa chọn ngày tính thuế", alertOptions);

              }



            }
            else {
              this.alertService.warn("Chưa chọn mã khoản lương", alertOptions);
            }
          }
          else {
            this.alertService.warn("Chưa chọn sơ đồ tổ chức", alertOptions);
          }
        }
        break;
      default:
    }
  }
  onInputFileBase64DataReady(e: any) {
    if (this.checkParamValue()) {
      const requestBody = {
        salObj: this.objSalId,
        periodId: this.salPeriod,
        recordSuccess: 0,
        year: this.year,
        base64: e,
        lstColVal: this.statuses,
        dateCalId: this.taxDateId
      };

      if (this.orgIds != null && this.orgIds.length > 0) {
        if (this.statuses.length > 0) {
          this.loadingExport = true;

          this.appService.post(api.PA_IMPORT_MONTHLY_TAX_IMPORT_TEMP, requestBody).subscribe(x => {
            if (x.ok && x.status === 200) {
              const body: IFormatedResponse = x.body
              if (body.statusCode === 200) {
                const instances = this.corePageListService.instances.filter(m => m.instanceNumber === this.listInstance)
                if (!!instances.length) {
                  instances[0].reloadFlag$.next(!instances[0].reloadFlag$.value)
                }
              }
              this.loadingExport = false;

            }
          })
          this.loadingExport = false;

        }
        else {
          this.alertService.warn("Chưa chọn mã khoản lương", alertOptions);
        }
      }
      else {
        this.alertService.warn("Chưa chọn sơ đồ tổ chức", alertOptions);
      }
    }
  }

  checkParamValue(): boolean {
    this.resetCheckParam()
    let flagCheck: boolean = true;
    this.showRequiredObj = (!this.objSalId ? true : false);
    this.showRequiredCode = (!this.statuses.length ? true : false);
    this.showRequiredDateCal = (!this.taxDateId ? true : false);
    this.showRequiredPeriod = (!this.salPeriod ? true : false);
    this.showRequiredYear = (!this.year ? true : false);
    this.showRequiredOrgId = this.orgIds.length == 0 ? true : false;


    if (this.showRequiredOrgId == true) {
      this.alertService.error(this.mls.trans('common.select.org') + '!', alertOptions)
    }
    if (this.showRequiredYear == false && this.showRequiredPeriod == false
      && this.showRequiredDateCal == false && this.showRequiredObj == false
      && this.showRequiredCode == false) {
      flagCheck = true;
    }
    else {
      flagCheck = false;
    }
    return flagCheck
  }

  resetCheckParam(): void {
    this.showRequiredOrgId = false;
    this.showRequiredYear = false;
    this.showRequiredPeriod = false;
    this.showRequiredDateCal = false;
    this.showRequiredObj = false;
    this.showRequiredCode = false;
  }

}