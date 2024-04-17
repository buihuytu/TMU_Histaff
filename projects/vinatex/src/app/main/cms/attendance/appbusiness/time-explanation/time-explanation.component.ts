import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { api, EnumTranslateKey } from 'alpha-global-constants';
import moment from 'moment';
import { ICoreDropdownOption, ICoreParamControl, IFilterOperator, EnumFilterOperator, IInOperator, ISortItem, EnumSortDirection, ICorePageListApiDefinition, ICorePageListCRUD, ICoreTableColumnItem, EnumCoreTablePipeType, ICorePageListEditRouting, OrganizationService, AppService, ResponseService, AlertService, IFormatedResponse, EnumFormBaseContolType } from 'ngx-histaff-alpha';
import { BehaviorSubject, Subscription } from 'rxjs';

@Component({
  selector: 'app-time-explanation',
  templateUrl: './time-explanation.component.html',
  styleUrls: ['./time-explanation.component.scss'],
})
export class TimeExplanationComponent implements OnInit, OnDestroy {
  /*
  Properties being passed to core-page-list
  */
  orgIds!: number[];
  salaryPeridOptions$ = new BehaviorSubject<ICoreDropdownOption[]>([]);
  atSalaryPeriodGetByIdObject$ = new BehaviorSubject<any>(null);
  atSalaryPeriodGetByIdApi = api.AT_SALARY_PERIOD_READ;
  year!: number;
  salPeriod!: number;
  startDate!: any;
  endDate!: any;
  shownFrom!: string;
  subsctiptions: Subscription[] = [];
  paramRows!: ICoreParamControl[][];
  yearGetByIdObject$ = new BehaviorSubject<any>(null);
  periodGetByIdObject$ = new BehaviorSubject<any>(null);
  groupOptionsYear$ = new BehaviorSubject<ICoreDropdownOption[]>([]);


  title = EnumTranslateKey.UI_COMPONENT_TITLE_AT_TIME_EXPLANATION;
  datePeriodComparisonFor: string = 'explanationDay';
  datePeriodComparisonForLabelKey: EnumTranslateKey = EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_AT_TIME_EXPLANATION_YEAR;
  regimesInclusionFor: string = '';
  regimesInclusionForLabelKey: EnumTranslateKey =
    EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_AT_TIME_EXPLANATION_SALARY_PERIOD;
  salaryPeriodOptionsApi: api = api.AT_TIME_EXPLANATION_GET_SALARY_PERIOD;

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
  outerSort: ISortItem[] = [
    {
      field: "jobOrderNum",
      sortDirection: EnumSortDirection.ASC
    }
  ]
  apiDefinition: ICorePageListApiDefinition = {
    queryListRelativePath: api.AT_TIME_EXPLANATION_QUERY_LIST,
  };

  crud: ICorePageListCRUD = {};

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
      type: 'number',
      align: 'right',
      width: 30,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_INS_INFORMATION_CODE,
      field: 'employeeCode',
      type: 'string',
      align: 'left',
      width: 150,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_INS_INFORMATION_NAME,
      field: 'employeeName',
      type: 'string',
      align: 'left',
      width: 250,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_INS_INFORMATION_POSITION_NAME,
      field: 'positionName',
      type: 'string',
      align: 'left',
      width: 300,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_INS_INFORMATION_ORG_NAME,
      field: 'orgName',
      type: 'string',
      align: 'left',
      width: 300,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_AT_TIME_EXPLANATION_EXPLANATION_DAY,
      field: 'explanationDay',
      type: 'string',
      align: 'left',
      width: 190,
      pipe: EnumCoreTablePipeType.DATE
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_AT_TIME_EXPLANATION_SHIFT_NAME,
      field: 'shiftName',
      type: 'string',
      align: 'left',
      width: 200,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_AT_TIME_EXPLANATION_SHIFT_NAME,
      field: 'shiftyear',
      type: 'string',
      align: 'left',
      hidden: true,
      width: 200,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_AT_TIME_EXPLANATION_SWIPE_IN,
      field: 'swipeIn',
      type: 'string',
      align: 'left',
      width: 200,
      pipe: EnumCoreTablePipeType.TIME_HHMM,
      hideSearchBox: true,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_AT_TIME_EXPLANATION_SWIPE_OUT,
      field: 'swipeOut',
      type: 'string',
      align: 'left',
      width: 200,
      pipe: EnumCoreTablePipeType.TIME_HHMM,
      hideSearchBox: true,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_AT_TIME_EXPLANATION_ACTUAL_WORKING_HOURS,
      field: 'actualWorkingHours',
      type: 'string',
      align: 'left',
      width: 200,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_AT_TIME_EXPLANATION_EXPLANATION_CODE,
      field: 'explanationCode',
      type: 'string',
      align: 'left',
      width: 200,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_AT_TIME_EXPLANATION_REASON,
      field: 'reason',
      type: 'string',
      align: 'left',
      width: 200,
    },
  ];


  editRoute: ICorePageListEditRouting = {
    auxiliary: 'popupAux',
  };
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private organizationService: OrganizationService,
    private appService: AppService, // CoreService is DEPRECATED!!!,
    private responseService: ResponseService,
    private alertService: AlertService,
  ) {
    const newOrgIds: number[] = [];
    this.organizationService.status$.value.activeKeys.map(x => newOrgIds.push(Number(x)))
    this.onOrgIdsChange(newOrgIds);
    this.onNgModelChangeNumber("year", new Date().getFullYear());
  }

  ngOnInit(): void {
    this.subsctiptions.push(
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
              this.groupOptionsYear$.next(options);
            }
          }
        })
    )
    this.paramRows = [
      [
        {
          flexSize: 3,
          name: 'year',
          ngModel: new Date().getFullYear(),
          ngModelChange: this.onNgModelChangeNumber,
          value: null,
          label: EnumTranslateKey.UI_COMPONENT_TITLE_AT_TIMESHEET_SUMMARY_YEAR,
          controlType: EnumFormBaseContolType.DROPDOWN,
          dropdownOptions$: this.groupOptionsYear$,
          getByIdObject$: this.yearGetByIdObject$,
        },
        {
          flexSize: 3,
          name: 'periodId',
          ngModel: null,
          ngModelChange: this.onNgModelChangeNumber,
          value: null,
          label: EnumTranslateKey.UI_COMPONENT_TITLE_AT_TIMESHEET_SUMMARY_SALARY_PERIOD_ID,
          controlType: EnumFormBaseContolType.DROPDOWN,
          dropdownOptions$: this.salaryPeridOptions$,
          getByIdObject$: this.periodGetByIdObject$,
        },
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

  ngOnDestroy(): void { }

  onYearChange(year: number) {
    if (year.toString().length == 4) {
      this.year = year;
      console.log(this.year);
      this.subsctiptions.push(
        this.appService.post(api.AT_SALARY_PERIOD_GET_LIST_IN_YEAR, { year: this.year }).subscribe((x) => {
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
              this.salaryPeridOptions$.next(options);
            } else {
              //this.responseService.resolve(body);
            }
          } else {
            //this.alertService.error(JSON.stringify(x), alertOptions);
          }
        }),
      );
    }
  }
  onOrgIdsChange(orgIds: number[]) {
    const periodIds: number[] = [];
    this.orgIds = orgIds
    if (this.paramRows != null && this.paramRows[0][1].ngModel != null && this.paramRows[0][1].ngModel != 0) {
      periodIds.push(Number(this.paramRows[0][1].ngModel));
    }
    this.outerInOperators = [
      {
        field: 'orgId',
        values: orgIds
      }, {
        field: 'periodId',
        values: periodIds
      }
    ]
  }
  onSalPeriodChange(salPerId: number) {
    console.log(salPerId);
    this.salPeriod = salPerId;
    this.subsctiptions.push(
      this.appService.post(api.AT_SALARY_PERIOD_GET_LIST_PERIOD, { id: salPerId }).subscribe((x) => {
        if (x.ok && x.status === 200) {
          const body: IFormatedResponse = x.body;
          if (body.statusCode === 200) {
            this.startDate = body.innerBody.startDate;
            this.endDate = body.innerBody.endDate;
            let a = moment(this.startDate);
            let b = moment(this.endDate);
            let m = a.month();
            let y = a.year();
            console.log(a.date() + ' ' + y);
            let soNgay = b.diff(a, 'days') + 1;
            let today = a.date() - 1;

            for (let i = 1; i <= soNgay; i++) {
              today += 1;
              let d = new Date(y, m, today);
              let dayOfWeek = moment(d);
              let day = dayOfWeek.day() != 0 ? 'T' + Number(dayOfWeek.day() + 1) : 'CN';
              let numOffday = dayOfWeek.date();
              let numOfMonth = dayOfWeek.month() + 1;
              this.columns.push({
                caption:
                  day +
                  ' ' +
                  (Number(numOffday) > 9 ? Number(numOffday) : '0' + Number(numOffday)) +
                  '/' +
                  (Number(numOfMonth) > 9 ? Number(numOfMonth) : '0' + Number(numOfMonth)),
                field: 'daY' + i,
                type: 'string',
                align: 'left',
                width: 100,
              });
            }
          } else {
            //this.responseService.resolve(body);
          }
        } else {
          //this.alertService.error(JSON.stringify(x), alertOptions);
        }
      }),
    );
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
  }
  onNgModelChangeNumber = (ngModel: string, value: any) => {

    // console.log('onNgModelChange', ngModel, value);

    let field: string;
    let eventFilterInOperator: IInOperator;
    const newValues: number[] = [];
    field = ngModel;
    newValues.push(Number(value));
    if (ngModel == 'year') {
      this.subsctiptions.push(
        this.appService.post(api.AT_SALARY_PERIOD_GET_LIST_IN_YEAR, { year: value }).subscribe(x => {
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
              const thisMonth = new Date().getMonth();
              const item = options[thisMonth];
              const thisMonthValue = item.value;
              this.paramRows[0][1].ngModel = thisMonthValue;
              this.onNgModelChangeNumber("periodId", thisMonthValue);
            } else {
              //this.responseService.resolve(body)
            }
          } else {
            //this.alertService.error(JSON.stringify(x), this.alertOptions)
          }
        }
        ))
    }

    switch (ngModel) {
      case "year":
        eventFilterInOperator = {
          field,
          values: newValues
        }
        break;
      case "periodId":
        if (newValues[0] == 0) {
          this.paramRows[0][2].ngModel = null;
          this.paramRows[0][3].ngModel = null;
        }
        this.subsctiptions.push(
          this.appService.post(api.AT_SALARY_PERIOD_GET_LIST_PERIOD, { id: newValues[0] }).subscribe(x => {
            if (x.ok && x.status === 200) {
              const body: IFormatedResponse = x.body

              if (body.statusCode === 200) {
                const startDate = new Date(body.innerBody.startDate);
                const endDate = new Date(body.innerBody.endDate);

                this.paramRows[0][2].ngModel = startDate;
                this.paramRows[0][3].ngModel = endDate;
              } else {
                //this.responseService.resolve(body)
              }
            } else {
              //this.alertService.error(JSON.stringify(x), alertOptions)
            }
          }
          )
        )
        eventFilterInOperator = {
          field,
          values: newValues
        }
        break;
      default:
        return;

    }
    // vì có 2 số nên cần bảo vệ state cũ
    const currentOuterInOperators: IInOperator[] = JSON.parse(JSON.stringify(this.outerInOperators));

    // lọc những field không trùng với field
    const remainOuterInOperators = currentOuterInOperators.filter(x => !!!(x.field === field));

    // thêm lại event vừa xảy ra
    remainOuterInOperators.push(eventFilterInOperator);

    // gán lại filter
    this.outerInOperators = remainOuterInOperators;

    // console.log("new filter", this.outerFilterOperators)
  }

  rowClick() {
    return;
  }
}
