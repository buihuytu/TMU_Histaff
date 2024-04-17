import { HttpClient } from "@angular/common/http";
import { Component, AfterViewInit } from "@angular/core";
import { EnumTranslateKey, api } from 'alpha-global-constants';
import { BaseComponent, EnumCoreButtonVNSCode, IFilterOperator, ICoreDropdownOption, EnumCoreFormControlSeekerSourceType, IInOperator, ICoreDatePickerRange, ICoreChecklistOption, ICorePageListApiDefinition, ISortItem, EnumSortDirection, ICorePageListEditRouting, EnumFilterOperator, MultiLanguageService, AppService, AlertService, CorePageListService, IFormatedResponse, EnumCoreTablePipeType, ICoreButtonVNS, alertOptions } from "ngx-histaff-alpha";
import { Subscription, BehaviorSubject } from "rxjs";




@Component({
  selector: 'app-import-salary-backdate',
  templateUrl: './import-salary-backdate.component.html',
  styleUrls: ['./import-salary-backdate.component.scss']
})




export class ImportSalaryBackdateComponent extends BaseComponent implements AfterViewInit {
  buttons: EnumCoreButtonVNSCode[] = [
    EnumCoreButtonVNSCode.HEADER_DOWNLOAD,
    EnumCoreButtonVNSCode.HEADER_UPLOAD,
    EnumCoreButtonVNSCode.HEADER_CREATE,
  ];

  title = EnumTranslateKey.UI_TITLE_PA_SAL_IMPORT_BACKDATE;
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
  salPeriodAdd!: number | null;
  lstSal: any;
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

  salaryPeriodAddOptions$ = new BehaviorSubject<ICoreDropdownOption[]>([]);
  atSalaryPeriodGetByIdObject$ = new BehaviorSubject<any>(null);

  atSalaryPeriodGetByIdApi = api.AT_SALARY_PERIOD_READ;
  atSalaryPeriodAddGetByIdObject$ = new BehaviorSubject<any>(null);




  errorRequired = EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED;
  showRequiredYear: boolean = false;
  showRequiredPeriod: boolean = false;
  showRequiredPeriodAdd: boolean = false;
  showRequiredOrgId: boolean = false;
  showRequiredObj: boolean = false;
  showRequiredCode: boolean = false;



  apiDefinition: ICorePageListApiDefinition = {
    queryListRelativePath: api.PA_SAL_IMPORT_BACKDATE_QUERY_LIST,
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
        this.appService.get(api.PA_LISTSALARIES_READ_OBJ_SAL).subscribe((x) => {
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
              //this.objectSalOptions$.next(options.sort((a, b) => a.text !== b.text ? a.text > b.text ? -1 : 1 : 0));
            } else {
              //this.responseService.resolve(body);
            }
          } else {
            //this.alertService.error(JSON.stringify(x), alertOptions);
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
    this.showRequiredYear = (!this.year ? true : false);
    if (year.toString().length == 4) {
      this.year = year;
      this.getListPeriod();
    } else {
      this.salaryPeriodOptions$.next([]);
      this.atSalaryPeriodGetByIdObject$.next(null);
      this.atSalaryPeriodAddGetByIdObject$.next(null);
      this.loading = false;
    }
  }
  onSalPeriodChange(salPerId: number) {
    this.showRequiredPeriod = (!this.salPeriod ? true : false);

    this.salPeriod = salPerId;
    this.periodChange()
  }

  periodChange(): void {
    if (this.salPeriod != null) {
      let code = (Number(this.lstSal.filter((x: any) => x.value == this.salPeriod)[0].code) + 1);
      if (code == 13) {
        this.salPeriodAdd = this.lstSal[this.lstSal.length - 1].value;
      }
      else {
        this.salPeriodAdd = this.lstSal.filter((x: any) => x.code == code.toString())[0].value;
      }
    }
    else {
      this.salPeriodAdd = null
    }
    this.lstSal.next([]);
  }


  onSalPeriodAddChange(salPerAddId: number) {
    this.showRequiredPeriodAdd = (!this.salPeriodAdd ? true : false);

    this.salPeriodAdd = salPerAddId;
  }
  getListPeriod() {
    this.subscription.push(

      this.appService.post(api.PA_SAL_IMPORT_BACKDATE_LST_PERIOD, { year: this.year }).subscribe((x) => {
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

            this.lstSal = options;
            this.salaryPeriodAddOptions$.next(options);

          }
        }
      }),
      this.appService.post(api.PA_SAL_IMPORT_BACKDATE_LST_PERIOD, { year: this.year }).subscribe((x) => {
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
            options.pop();
            this.salaryPeriodOptions$.next(options);
          }
        }
      }),
    );

  }
  onListSalChange(statuses: number[]) {

    this.showRequiredCode = (!this.statuses.length ? true : false);

    this.loading = true;
    let newColumns = JSON.parse(JSON.stringify(this.leftColumns));
    statuses.forEach((x) => {
      // this.checklistOptions$.value;
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
    // console.log()
    this.columns = newColumns;
    this.loading = false;
  }

  onObjectSalChange(objectId: number) {

    this.showRequiredObj = (!this.objSalId ? true : false);

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
        periodAddId: this.salPeriodAdd,
        objSalaryId: this.objSalId,
        employeeId: this.employeeId,
      });
    }
  }

  onCorePageHeaderButtonClick(e: ICoreButtonVNS) {
    switch (e.code) {
      case EnumCoreButtonVNSCode.HEADER_DOWNLOAD:
        if (this.checkParamValue() == true) {
        if (this.orgIds != null && this.orgIds.length > 0) {
          debugger;

          if (this.statuses.length > 0) {
            debugger;
            if (this.salPeriodAdd == null) {
              this.alertService.warn("Chưa chọn kì lương được cộng vào", alertOptions);
              return;
            }
            this.loadingExport = true;
            const requestBody = {
              periodId: this.salPeriod,
              periodAddId: this.salPeriodAdd,
              salObjId: this.objSalId,
              lstOrg: this.orgIds,
              lstRankCode: this.statuses,
              employeeId: this.employeeId

            };
            this.subscriptions.push(
              this.http.post(api.PA_SAL_IMPORT_BACKDATE_EXPORT_TEMP, requestBody, { responseType: 'blob' })
                .subscribe(
                  (response: Blob) => {
                    // Check if the response is a file
                    if (response.type === 'application/octet-stream') {
                      // Create a download link for the file
                      const downloadLink = document.createElement('a');
                      const url = window.URL.createObjectURL(response);
                      downloadLink.href = url;
                      downloadLink.download = 'IMPORT_SALARY_BACKDATE_TEMP.xlsx';
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






            )

          }
          else {
            debugger;

            this.alertService.warn("Chưa chọn mã khoản lương", alertOptions);

          }

        }
        else {
          debugger;

          this.alertService.warn("Chưa chọn sơ đồ tổ chức", alertOptions);
        }
      }

        break;
      default:
    }
  }
  onInputFileBase64DataReady(e: any) {
    const requestBody = {
      salObj: this.objSalId,
      periodId: this.salPeriod,
      periodAddId: this.salPeriodAdd,
      recordSuccess: 0,
      year: this.year,
      base64: e,
      lstColVal: this.statuses
    };

    if (this.orgIds != null && this.orgIds.length > 0) {
      if (this.salPeriodAdd == null) {
        this.alertService.warn("Chưa chọn kì lương được cộng vào", alertOptions);
        return;
      }
      if (this.statuses.length > 0) {
        this.loadingExport = true;

        this.appService.post(api.PA_SAL_IMPORT_IMPORT_BACKDATE_TEMP, requestBody).subscribe(x => {
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


  checkParamValue(): boolean {
    this.resetCheckParam()
    let flagCheck: boolean = true;
    this.showRequiredObj = (!this.objSalId ? true : false);
    this.showRequiredCode = (!this.statuses.length ? true : false);
    this.showRequiredPeriodAdd = (!this.salPeriodAdd ? true : false);
    this.showRequiredPeriod = (!this.salPeriod ? true : false);
    this.showRequiredYear = (!this.year ? true : false);
    this.showRequiredOrgId = this.orgIds.length == 0 ? true : false;


    if (this.showRequiredOrgId == true) {
      this.alertService.error(this.mls.trans('common.select.org') + '!', alertOptions)
    }
    if (this.showRequiredYear == false && this.showRequiredPeriod == false
      && this.showRequiredPeriodAdd == false && this.showRequiredObj == false
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
    this.showRequiredPeriodAdd = false;
    this.showRequiredObj = false;
    this.showRequiredCode = false;
  }

}