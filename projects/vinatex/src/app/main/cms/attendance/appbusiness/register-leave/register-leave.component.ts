import { HttpClient } from "@angular/common/http";
import { Component, AfterViewInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { api, EnumTranslateKey } from 'alpha-global-constants';
import { BaseComponent, ICoreDropdownOption, EnumCoreButtonVNSCode, IFilterOperator, EnumFilterOperator, IInOperator, ISortItem, EnumSortDirection, ICoreParamControl, ICorePageListCRUD, ICorePageListEditRouting, ICoreTableColumnItem, EnumCoreTablePipeType, MultiLanguageService, OrganizationService, AppService, ResponseService, AlertService, CorePageListService, IFormatedResponse, EnumFormBaseContolType, ICorePageListApiDefinition, ICoreButtonVNS, alertOptions } from "ngx-histaff-alpha";
import { BehaviorSubject, Subscription } from "rxjs";

@Component({
  selector: 'app-register-leave',
  templateUrl: './register-leave.component.html',
  styleUrls: ['./register-leave.component.scss']
})
export class RegisterLeaveComponent extends BaseComponent implements AfterViewInit {

  year!: number;
  salPeriod!: number;
  startDate!: any
  endDate!: any;
  salaryPeridOptions$ = new BehaviorSubject<ICoreDropdownOption[]>([]);
  atSalaryPeriodGetByIdObject$ = new BehaviorSubject<any>(null);
  atSalaryPeriodGetByIdApi = api.AT_SALARY_PERIOD_READ;
  shownFrom!: string;
  getByIdObject$!: BehaviorSubject<any>;
  options$!: BehaviorSubject<ICoreDropdownOption[]>;

  listInstance!: number;


  title = EnumTranslateKey.UI_COMPONENT_TITLE_AT_RESGISTER_LEAVE
  datePeriodComparisonFor: string = 'startDate';

  buttonItems: EnumCoreButtonVNSCode[] = [
    EnumCoreButtonVNSCode.NONE_HEADER_SEARCH,
  ];
  orgIds!: number[];
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
  outerSort: ISortItem[] = [
    {
      field: "jobOrderNum",
      sortDirection: EnumSortDirection.ASC
    }
  ]
  paramRows!: ICoreParamControl[][];
  filterOperators!: IFilterOperator[];


  crud: ICorePageListCRUD = {
    deleteIds: api.AT_REGISTER_LEAVE_DELETE_IDS,
  }
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
      hidden: true,
      type: 'number',
      align: 'left',
      width: 10,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_REGISTER_LEAVE_EMPLOYEECODE,
      field: 'employeeCode',
      type: 'string',
      align: 'left',
      width: 110,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_REGISTER_LEAVE_EMPLOYEENAME,
      field: 'employeeName',
      type: 'string',
      align: 'left',
      width: 250,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_REGISTER_LEAVE_TITLENAME,
      field: 'positionName',
      type: 'string',
      align: 'left',
      width: 200,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_REGISTER_LEAVE_ORGNAME,
      field: 'orgName',
      type: 'string',
      align: 'left',
      width: 210,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_REGISTER_LEAVE_STARTDATE,
      field: 'dateStart',
      type: 'date',
      pipe: EnumCoreTablePipeType.DATE,
      align: 'center',
      width: 150,
    },

    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_REGISTER_LEAVE_ENDDATE,
      field: 'dateEnd',
      type: 'date',
      pipe: EnumCoreTablePipeType.DATE,
      align: 'center',
      width: 150,
    },

    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_REGISTER_LEAVE_REGISTER_TYPE,
      field: 'typeName',
      type: 'string',
      align: 'left',
      width: 250,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_REGISTER_LEAVE_REASON,
      field: 'reason',
      type: 'string',
      align: 'left',
      width: 250,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_REGISTER_LEAVE_NOTE,
      field: 'note',
      type: 'string',
      align: 'left',
      width: 250,
    },
  ]
  selectedData: any;
  corePageListInstanceNumber: number;

  constructor(
    public override mls: MultiLanguageService,
    private organizationService: OrganizationService,
    private appService: AppService,
    private responseService: ResponseService,
    private alertService: AlertService,
    private http: HttpClient,
    private corePageListService: CorePageListService,
    private router : Router,
    private route: ActivatedRoute,
  ) {
    super(mls);
    const newOrgIds: number[] = [];
    this.organizationService.status$.value.activeKeys.map(x => newOrgIds.push(Number(x)))
    this.onOrgIdsChange(newOrgIds)
    this.shownFrom = 'name'
    this.corePageListInstanceNumber = new Date().getTime();
  }
  ngAfterViewInit(): void {
    this.year = new Date().getFullYear();
    this.onYearChange(this.year);
    let date_today = new Date();
    let firstDay = new Date(date_today.getFullYear(), date_today.getMonth(), 1);
    let lastDay = new Date(date_today.getFullYear(), date_today.getMonth() + 1, 0);

    this.appService.post(api.AT_SALARY_PERIOD_GET_LIST_IN_YEAR, { year: this.year }).subscribe(x => {
      if (x.ok && x.status === 200) {
        const body: IFormatedResponse = x.body
        if (body.statusCode === 200) {
          body.innerBody.map((get: any) => {

            if (get.month == date_today.getMonth() + 1) {
              this.salPeriod = get.id;
              this.startDate = firstDay;
              this.endDate = lastDay;

              this.outerParam$.next({
                periodId: get.id
              });
            }
          });
        }
      }
    }
    )

    this.paramRows = [
      [
        // {
        //   flexSize: 3,
        //   name: 'year',
        //   ngModel: new Date().getFullYear(),
        //   ngModelChange: this.onNgModelChangeNumber,
        //   value: null,
        //   label: EnumTranslateKey.UI_COMPONENT_TITLE_AT_TIMESHEET_SUMMARY_YEAR,
        //   controlType: EnumFormBaseContolType.DROPDOWN,
        //   dropdownOptions$: this.groupOptionsYear$,
        //   getByIdObject$: this.yearGetByIdObject$,
        // },
        // {
        //   flexSize: 3,
        //   name: 'periodId',
        //   ngModel: null,
        //   ngModelChange: this.onNgModelChangeNumber,
        //   value: null,
        //   label: EnumTranslateKey.UI_COMPONENT_TITLE_AT_TIMESHEET_SUMMARY_SALARY_PERIOD_ID,
        //   controlType: EnumFormBaseContolType.DROPDOWN,
        //   dropdownOptions$: this.salaryPeridOptions$,
        //   getByIdObject$: this.periodGetByIdObject$,
        // },
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

  apiDefinition: ICorePageListApiDefinition = {
    queryListRelativePath: api.AT_REGISTER_LEAVE_QUERY_LIST,
  }

  onInstanceCreated(e: number) {
    this.listInstance = e
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
  subsctiptions: Subscription[] = [];

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

  onSalPeriodChange(salPerId: number) {

    if (salPerId == null) {
      this.startDate = null;
      this.endDate = null;
    }
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
        values: this.orgIds
      }
    ]
    this.outerParam$.next({
      periodId: this.salPeriod
    })
  }

  onButtonClick(e: ICoreButtonVNS): void {

    if (e.code === EnumCoreButtonVNSCode.NONE_HEADER_SEARCH) {
      this.outerParam$.next({
        periodId: this.salPeriod
      })
    }

  }

  onCorePageHeaderButtonClick(e: ICoreButtonVNS) {
    switch (e.code) {
      case EnumCoreButtonVNSCode.HEADER_DOWNLOAD:
        if (this.orgIds != null && this.orgIds.length > 0) {
          const requestBody = {
            periodId: this.salPeriod,
            lstOrg: this.orgIds
          };
          this.subscriptions.push(
            this.http.post(api.AT_REGISTER_LEAVE_EXPORT, requestBody, { responseType: 'blob' })
              .subscribe(
                (response: Blob) => {
                  if (response.type === 'application/octet-stream') {
                    const downloadLink = document.createElement('a');
                    const url = window.URL.createObjectURL(response);
                    downloadLink.href = url;
                    downloadLink.download = 'IMPORT_REGISTER_LEAVE.xlsx';
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
                  }
                }
              )

          )
        }
        else {
          this.alertService.warn("Chưa chọn sơ đồ tổ chức", alertOptions);
        }

        break;
        case EnumCoreButtonVNSCode.HEADER_COPY : 
        if (this.selectedData.length > 1) {
          this.alertService.error(`${this.mls.trans(EnumTranslateKey.NOT_SELECTED_MORE_THAN_ONE_ROW_FOR_BUTTON_COPY_DATA)}`, alertOptions)
          return;
        }
        this.router.navigate(
          [btoa('0'), { listInstance: this.corePageListInstanceNumber }],
          {
            relativeTo: this.route, state: { selectedData: this.selectedData }
          }
        );
        break;
      default:
    }
  }
  onInputFileBase64DataReady(e: any) {
    const requestBody = {
      base64: e,
    };
    this.http.post(api.AT_REGISTER_LEAVE_IMPORT, requestBody, { responseType: 'blob' })
      .subscribe(
        (response: Blob) => {
          // Check if the response is a file
          if (response.type === 'application/octet-stream') {
            // Create a download link for the file
            const downloadLink = document.createElement('a');
            const url = window.URL.createObjectURL(response);
            downloadLink.href = url;
            downloadLink.download = 'Error_ImportRegisterLeave.xlsx';
            downloadLink.click();
            window.URL.revokeObjectURL(url);
          } else {
            const reader = new FileReader();
            reader.onload = () => {
              const jsonBody = reader.result as string;
              const data = JSON.parse(jsonBody);
              this.alertService.success(data.messageCode, alertOptions);
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


  onSelectedDataChange(event : any[]){
    this.selectedData = event
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
    const currentOuterFilterOperators: IFilterOperator[] = JSON.parse(JSON.stringify(this.filterOperators));

    // lọc những field không trùng với field và operator
    const remainOuterFilterOperators = currentOuterFilterOperators.filter(x => !!!(x.field === field && x.operator === operator));

    // thêm lại event vừa xảy ra
    remainOuterFilterOperators.push(eventFilterOperator);

    // gán lại filter
    this.filterOperators = remainOuterFilterOperators;
  }

}
