import { Component, AfterViewInit } from "@angular/core";
import { api, EnumTranslateKey } from 'alpha-global-constants';
import { BaseComponent, ICoreDropdownOption, IFilterOperator, ICoreParamControl, IInOperator, ISortItem, EnumSortDirection, EnumCoreButtonVNSCode, ICorePageListCRUD, ICorePageListApiDefinition, IAlertOptions, ICorePageListEditRouting, ICoreTableColumnItem, EnumCoreTablePipeType, MultiLanguageService, OrganizationService, AppService, ResponseService, AlertService, CorePageListService, IFormatedResponse, EnumFormBaseContolType, ICoreButtonVNS, alertOptions, EnumFilterOperator } from "ngx-histaff-alpha";
import { BehaviorSubject, Subscription } from "rxjs";
import { OverTimeService } from "./overtime.service";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: "cms-profile-overtime",
  templateUrl: "./overtime.component.html",
  styleUrls: ["./overtime.component.scss"],
})
export class OvertimeComponent extends BaseComponent implements AfterViewInit {
  loading!: boolean;
  loadingExport!: boolean;
  year!: number;
  salPeriod!: number;
  startDate!: any
  endDate!: any;
  listInstance!: number;
  salaryPeridOptions$ = new BehaviorSubject<ICoreDropdownOption[]>([]);
  atSalaryPeriodGetByIdObject$ = new BehaviorSubject<any>(null);
  atSalaryPeriodGetByIdApi = api.AT_SALARY_PERIOD_READ;
  shownFrom!: string;
  getByIdObject$!: BehaviorSubject<any>;
  options$!: BehaviorSubject<ICoreDropdownOption[]>;

  title = EnumTranslateKey.UI_COMPONENT_TITLE_AT_OVERTIME
  datePeriodComparisonFor: string = 'startDate';
  datePeriodComparisonForLabelKey: EnumTranslateKey = EnumTranslateKey.UI_COMPONENT_LABEL_CONTRACT_STARTDATE_FILTER;
  statusInclusionFor: string = 'statusId';
  statusInclusionForLabelKey: EnumTranslateKey = EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_DEMO_ATTACHMENT_STATUS_ID;
  statusOptionsApi: api = api.DEMO_ATTACHMENT_GET_ATTACHMENT_STATUS_LIST;
  corePageListInstanceNumber!: number;
  orgIds!: number[];
  outerParam$ = new BehaviorSubject<any>(null);

  subsctiptions: Subscription[] = [];
  filterOperators!: IFilterOperator[];
  paramRows!: ICoreParamControl[][];
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
  buttonItems: EnumCoreButtonVNSCode[] = [
    EnumCoreButtonVNSCode.NONE_HEADER_SEARCH,
  ];

  crud: ICorePageListCRUD = {
    deleteIds: api.AT_OVERTIME_DELETE_IDS,
  }

  apiDefinition: ICorePageListApiDefinition = {
    queryListRelativePath: api.AT_OVERTIME_QUERY_LIST,
  }

  alertOptions: IAlertOptions = {
    autoClose: false,
    keepAfterRouteChange: true,
    timeClose: 20000,
  };

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
      caption: 'ID',
      field: 'id',
      type: 'number',
      align: 'left',
      width: 10,
      hidden: true
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_AT_OVERTIME_EMPLOYEECODE,
      field: 'employeeCode',
      type: 'string',
      align: 'left',
      width: 110,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_AT_OVERTIME_EMPLOYEENAME,
      field: 'employeeName',
      type: 'string',
      align: 'left',
      width: 250,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_AT_OVERTIME_TITLENAME,
      field: 'positionName',
      type: 'string',
      align: 'left',
      width: 200,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_AT_OVERTIME_START_DATE,
      field: 'startDate',
      type: 'date',
      pipe: EnumCoreTablePipeType.DATE,
      align: 'center',
      width: 150,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_AT_OVERTIME_END_DATE,
      field: 'endDate',
      type: 'date',
      pipe: EnumCoreTablePipeType.DATE,
      align: 'center',
      width: 150,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_AT_OVERTIME_TIME_START,
      field: 'timeStartStr',
      type: 'string',
      align: 'center',
      width: 150,
      hideSearchBox: true,

    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_AT_OVERTIME_TIME_END,
      field: 'timeEndStr',
      type: 'string',
      align: 'center',
      width: 150,
      hideSearchBox: true,


    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_AT_OVERTIME_REASON,
      field: 'reason',
      type: 'string',
      align: 'left',
      width: 200,
    },
  ]

  constructor(
    public override mls: MultiLanguageService,
    private organizationService: OrganizationService,
    private appService: AppService,
    private responseService: ResponseService,
    private alertService: AlertService,
    private overtimeService: OverTimeService,
    private http: HttpClient,
    private corePageListService: CorePageListService

  ) {
    super(mls);
    const newOrgIds: number[] = [];
    this.organizationService.status$.value.activeKeys.map(x => newOrgIds.push(Number(x)))
    this.onOrgIdsChange(newOrgIds)
    this.shownFrom = 'name';

    // this.corePageListInstanceNumber = new Date().getTime();

    // // get year + salary period from create/edit page
    // this.overtimeService.currentSelectedYear.subscribe(year => this.year = year);
    // this.overtimeService.currentperiodId.subscribe(id => this.salPeriod = id);
    // console.log(this.salPeriod);

  }



  onInstanceCreated(e: number) {
    this.listInstance = e
  }

  ngAfterViewInit(): void {
    this.year = new Date().getFullYear();
    this.onYearChange(this.year);
    let date_today = new Date();
    let firstDay = new Date(date_today.getFullYear(), date_today.getMonth(), 1);
    let lastDay = new Date(date_today.getFullYear(), date_today.getMonth() + 1, 0);

    this.appService
      .post(api.AT_SALARY_PERIOD_GET_LIST_IN_YEAR, { year: this.year })
      .subscribe((x) => {
        if (x.ok && x.status === 200) {
          const body: IFormatedResponse = x.body;
          if (body.statusCode === 200) {
            const res = body.innerBody;
            var cc = res.filter((s: { month: number }) => s.month == date_today.getMonth() + 1)[0];
            this.salPeriod = cc.id;
            this.startDate = firstDay;
            this.endDate = lastDay;
            this.onSalPeriodChange(this.salPeriod);

          }
        }
      });

    this.paramRows = [
      [
        {
          flexSize: 3,
          name: 'fromDate',
          ngModel: null,
          ngModelChange: this.onNgModelChange,
          value: null,
          label:
            EnumTranslateKey.UI_COMPONENT_LABEL_AT_TIMESHEET_SUMMARY_FROM_DATE,
          controlType: EnumFormBaseContolType.DATEPICKER,
          disabled: true,
        },
        {
          flexSize: 3,
          name: 'endDate',
          ngModel: null,
          ngModelChange: this.onNgModelChange,
          value: null,
          label:
            EnumTranslateKey.UI_COMPONENT_LABEL_AT_TIMESHEET_SUMMARY_TO_DATE,
          controlType: EnumFormBaseContolType.DATEPICKER,
          disabled: true,
        },
      ],
    ];
    // if (this.year != null) {
    //   this.getListPeriod();
    // }

    // if (this.year == (new Date()).getFullYear() && this.salPeriod == 0) {
    //   this.getCurrentSalary();
    // }
  }

  onOrgIdsChange(orgIds: number[]) {

    this.orgIds = orgIds
    this.outerInOperators = [
      {
        field: 'orgId',
        values: orgIds
      }
    ]
  }


  onYearChange(year: number) {

    if (year.toString().length == 4) {
      this.year = year;
      console.log(this.year);
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
        }
        ))
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
    console.log(salPerId);
    this.salPeriod = salPerId;
    this.subsctiptions.push(

      this.appService.post(api.AT_SALARY_PERIOD_GET_LIST_PERIOD, { id: salPerId }).subscribe(x => {
        if (x.ok && x.status === 200) {
          const body: IFormatedResponse = x.body
          if (body.statusCode === 200) {
            this.startDate = body.innerBody.startDate;
            this.endDate = body.innerBody.endDate;
          } else {
            //this.responseService.resolve(body)
          }
        } else {
          //this.alertService.error(JSON.stringify(x), alertOptions)
        }
      }
      )
    )
    this.outerInOperators = [
      {
        field: 'orgId',
        values: this.orgIds,
      },
      {
        field: 'periodId',
        values: [this.salPeriod],
      },
    ];
  }

  onButtonClick(e: ICoreButtonVNS): void {
    if (this.salPeriod == null) {
      this.alertService.error(
        `Select Salary Period to Find!!!`, alertOptions
      );
    }
    else {
      if (e.code === EnumCoreButtonVNSCode.NONE_HEADER_SEARCH) {
        this.filterOperators = [
          {
            field: 'startDate',
            operator: EnumFilterOperator.GREATER_THAN_OR_EQUAL,
            dateTimeValue: this.startDate
          },
          {
            field: 'endDate',
            operator: EnumFilterOperator.LESS_THAN_OR_EQUAL,
            dateTimeValue: this.endDate
          },
        ]
      }
    }
  }

  // getCurrentSalary() {//lay nam hien tai
  //   const dateNow = new Date()
  //   this.subsctiptions.push(
  //     this.overtimeService.getCurrentPeriodSalary()
  //       .pipe(
  //         map((f: any) => {
  //           let id: number;
  //           id = f.body.innerBody.id;
  //           this.salPeriod = id;
  //           console.log(this.salPeriod);
  //           this.startDate! = f.body.innerBody.startDate;
  //           this.endDate! = f.body.innerBody.endDate;
  //           this.overtimeService.changeMinDate(this.startDate);
  //           this.overtimeService.changeMaxDate(this.endDate);
  //           this.onSalPeriodChange(this.salPeriod)
  //           return id;
  //         })
  //       )
  //       .subscribe(response => {
  //         this.salPeriod = response;
  //       })
  //   )!
  // }

  onCorePageHeaderButtonClick(e: ICoreButtonVNS) {
    switch (e.code) {
      case EnumCoreButtonVNSCode.HEADER_DOWNLOAD:
        if (this.orgIds != null && this.orgIds.length > 0) {
          this.loadingExport = true;
          const requestBody = {
            periodId: this.salPeriod,
            lstOrg: this.orgIds
          };
          this.subscriptions.push(
            this.http.post(api.AT_OVERTIME_EXPORT, requestBody, { responseType: 'blob' })
              .subscribe(
                (response: Blob) => {
                  if (response.type === 'application/octet-stream') {
                    const downloadLink = document.createElement('a');
                    const url = window.URL.createObjectURL(response);
                    downloadLink.href = url;
                    downloadLink.download = 'IMPORT_REGISTER_OT.xlsx';
                    downloadLink.click();
                    window.URL.revokeObjectURL(url);
                    this.loadingExport = false;
                  } else {
                    const reader = new FileReader();
                    reader.onload = () => {
                      const jsonBody = reader.result as string;
                      const data = JSON.parse(jsonBody);
                      this.alertService.warn(data.messageCode, alertOptions);
                    };
                    reader.readAsText(response);
                    this.loadingExport = false;

                  }
                }
              )

          )
        }
        else {
          this.alertService.warn("Chưa chọn sơ đồ tổ chức", alertOptions);
        }

        break;
      default:
    }
  }
  onInputFileBase64DataReady(e: any) {
    const requestBody = {
      base64: e,
    };
    this.http.post(api.AT_OVERTIME_IMPORT, requestBody, { responseType: 'blob' })
      .subscribe(
        (response: Blob) => {
          if (response.type === 'application/octet-stream') {
            const downloadLink = document.createElement('a');
            const url = window.URL.createObjectURL(response);
            downloadLink.href = url;
            downloadLink.download = 'Error_ImportRegisterOT.xlsx';
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
            const instances = this.corePageListService.instances.filter(m => m.instanceNumber === this.listInstance)
            if (!!instances.length) {
              instances[0].reloadFlag$.next(!instances[0].reloadFlag$.value)
            }
          }
        }
      );
  }

  onNgModelChange = (ngModel: string, value: any) => {
    // console.log('onNgModelChange', ngModel, value);

    let field: string;
    let operator: EnumFilterOperator;
    let eventFilterOperator: IFilterOperator;

    field = ngModel;

    switch (ngModel) {
      case 'fromDate':
        operator = EnumFilterOperator.GREATER_THAN_OR_EQUAL;
        if (value != null) {
          value.setDate(value.getUTCDate());
          value.setUTCHours(0, 0, 0);
        }
        eventFilterOperator = {
          field,
          operator,
          dateTimeValue: value,
        };
        break;
      case 'endDate':
        operator = EnumFilterOperator.LESS_THAN_OR_EQUAL;
        if (value != null) {
          value.setDate(value.getUTCDate());
          value.setUTCHours(23, 59, 59);
        }
        eventFilterOperator = {
          field,
          operator,
          dateTimeValue: value,
        };
        break;
      default:
        return;
    }

    // vì có 2 date nên cần bảo vệ state cũ
    const currentOuterFilterOperators: IFilterOperator[] = JSON.parse(
      JSON.stringify(this.filterOperators)
    );

    // lọc những field không trùng với field và operator
    const remainOuterFilterOperators = currentOuterFilterOperators.filter(
      (x) => !!!(x.field === field && x.operator === operator)
    );

    // thêm lại event vừa xảy ra
    remainOuterFilterOperators.push(eventFilterOperator);

    // gán lại filter
    this.filterOperators = remainOuterFilterOperators;
  };
}
