
import { BehaviorSubject, Subscription } from "rxjs";
import { Router, ActivatedRoute } from "@angular/router";
import { Component, AfterViewInit } from "@angular/core";
import { EnumTranslateKey, api } from 'alpha-global-constants';
import { BaseComponent, IAlertOptions, ISortItem, EnumSortDirection, ICoreDropdownOption, ICorePageListApiDefinition, ICorePageListEditRouting, ICorePageListCRUD, IInOperator, ICoreTableColumnItem, EnumCoreTablePipeType, ICoreButtonVNS, IFormatedResponse, ICoreParamControl, AlertService, DialogService, MultiLanguageService, AppService, ResponseService, OrganizationService, CorePageListService, EnumFormBaseContolType } from "ngx-histaff-alpha";

@Component({
  selector: 'app-hu-welfare-auto',
  templateUrl: './hu-welfare-auto.component.html',
  styleUrls: ['./hu-welfare-auto.component.scss'],
})
export class HuWelfareAutoComponent extends BaseComponent implements AfterViewInit {

  alertOptions: IAlertOptions = {
    autoClose: true,
    keepAfterRouteChange: true,
    timeClose: 10000
  };
  loading!: boolean;
  orgId!: number;
  listInstance!: number;

  outerParam$ = new BehaviorSubject<any>(null);
  outerSort: ISortItem[] = [
  {
    field: "jobOrderNum",
    sortDirection: EnumSortDirection.ASC
  }
]
  groupOptionsYear$ = new BehaviorSubject<ICoreDropdownOption[]>([]);
  groupOptionsPeriod$ = new BehaviorSubject<ICoreDropdownOption[]>([]);
  groupOptionsWelfare$ = new BehaviorSubject<ICoreDropdownOption[]>([]);

  yearGetByIdObject$ = new BehaviorSubject<any>(null);
  periodGetByIdObject$ = new BehaviorSubject<any>(null);
  welfareGetByIdObject$ = new BehaviorSubject<any>(null);

  title = EnumTranslateKey.UI_COMPONENT_TITLE_HU_WELFARE_AUTO;
  apiDefinition: ICorePageListApiDefinition = {
    queryListRelativePath: api.HU_WELFARE_AUTO_QUERY_LIST,
  };
  editRoute: ICorePageListEditRouting = {
    auxiliary: 'popupAux',
  };
  crud: ICorePageListCRUD = {
    deleteIds: api.HU_WELFARE_AUTO_DELETE_IDS,
  };
  
  outerInOperators: IInOperator[] = [];
  forceReloadingFlag$ = new BehaviorSubject<boolean>(false);
  columns: ICoreTableColumnItem[] = [
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_COMMON_ID,
      field: 'id',
      hidden: true,
      type: 'number',
      align: 'right',
      width: 30,
    },
    {
      caption:
        EnumTranslateKey.UI_COMPONENT_TITLE_HU_WELFARE_AUTO_EMPLOYEE_CODE,
      field: 'employeeCode',
      type: 'string',
      align: 'left',
      width: 80,
    },
    {
      caption:
        EnumTranslateKey.UI_COMPONENT_TITLE_HU_WELFARE_AUTO_EMPLOYEE_NAME,
      field: 'employeeName',
      type: 'string',
      align: 'left',
      width: 250,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_HU_WELFARE_AUTO_ORG_NAME,
      field: 'orgName',
      type: 'string',
      align: 'left',
      width: 180,
    },
    {
      caption:
        EnumTranslateKey.UI_COMPONENT_TITLE_HU_WELFARE_AUTO_POSITION_NAME,
      field: 'positionName',
      type: 'string',
      align: 'left',
      width: 250,
    },
    {
      caption:
        EnumTranslateKey.UI_COMPONENT_TITLE_HU_WELFARE_AUTO_SALARY_PERIOD_ID,
      field: 'salaryPeriodName',
      type: 'string',
      align: 'left',
      width: 120,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_HU_WELFARE_AUTO_BENEFIT_NAME,
      field: 'benefitName',
      type: 'string',
      align: 'left',
      width: 140,
    },
    {
      caption:
        EnumTranslateKey.UI_COMPONENT_TITLE_HU_WELFARE_AUTO_EFFECTIVE_DATE,
      field: 'effectiveDate',
      type: 'date',
      align: 'center',
      width: 120,
      pipe: EnumCoreTablePipeType.DATE,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_HU_WELFARE_AUTO_BIRTH_DATE,
      field: 'birthDate',
      type: 'date',
      align: 'center',
      width: 100,
      pipe: EnumCoreTablePipeType.DATE,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_HU_WELFARE_AUTO_COUNT_CHILD,
      field: 'countChild',
      type: 'number',
      align: 'center',
      width: 50,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_HU_WELFARE_AUTO_GENDER,
      field: 'genderName',
      type: 'string',
      align: 'center',
      width: 70,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_HU_WELFARE_AUTO_SENIORITY,
      field: 'seniority',
      type: 'string',
      align: 'center',
      width: 75,
    },
    {
      caption:EnumTranslateKey.UI_COMPONENT_TITLE_HU_WELFARE_AUTO_CONTRACT_TYPE_NAME,
      field: 'contactTypeName',
      type: 'string',
      align: 'left',
      width: 220,
    },

    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_HU_WELFARE_AUTO_MONEY,
      field: 'money',
      type: 'formated_money',
      align: 'right',
      width: 100,
      pipe:EnumCoreTablePipeType.NUMBER
    },
    
  ];
  onCorePageHeaderButtonClick(e: ICoreButtonVNS){
    this.calculate();
  }
  onNgModelChange = (ngModel: string, value: any) => {
    if (ngModel == 'year'){
      this.subscriptions.push(
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
              this.groupOptionsPeriod$.next(options);
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
  getMin(numbers: number[]): number {
    if (numbers.length === 0) {
      return 0; // Return undefined if the array is empty.
    }

    let min = numbers[0]; // Assume the first element is the minimum.

    for (let i = 1; i < numbers.length; i++) {
      if (numbers[i] < min) {
        min = numbers[i]; // Update the minimum if a smaller value is found.
      }
    }

    return min;
  }
  onOrgIdChange(value: number[]){
    this.orgId = this.getMin(value);
    this.outerInOperators = [
      {
        field: 'orgId',
        values: value
      }
    ]
  }
  paramRows!: ICoreParamControl[][];
  override subscriptions: Subscription[] = [];

  constructor(
    private alertService: AlertService,
    public dialogService: DialogService,
    public override mls: MultiLanguageService,
    private router: Router,
    private route: ActivatedRoute,
    private appService: AppService, // CoreService is DEPRECATED!!!
    private responseService: ResponseService,
    private organizationService: OrganizationService,
    private corePageListService: CorePageListService,

  ) {
    super(mls);
    // lấy ra danh sách org đang được chọn gồm các con
    const newOrgIds: number[] = [];
    this.organizationService.status$.value.activeKeys.map(x => newOrgIds.push(Number(x)));
    // lấy min của các con
    this.orgId = this.getMin(newOrgIds);

    this.onOrgIdChange(newOrgIds);
    this.listInstance = Number(
      this.route.snapshot.paramMap.get('listInstance')!
    );
  }
  onInstanceCreated(event: number) {
    this.listInstance = event;
  }
  ngAfterViewInit(): void {
  }

  override ngOnDestroy(): void {}

  override ngOnInit(): void {

    /* Each subscribe() need to be in one this.subscriptions.push */

    // End PUSHING 1ST Subsctiption

    this.subscriptions.push(
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

    // Start PUSHING 2ND Subsctiption
    this.subscriptions.push(
      this.appService
      .get(api.HU_WELFARE_GETLIST_AUTO)
      .subscribe((res: any) => {

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
            value: g.id,
            text: g.name
          })
        })
        this.groupOptionsWelfare$.next(options);
      }}
      })
    ) 
    this.paramRows = [
      [
        {
          flexSize: 3,
          name: 'year',
          ngModel: null,
          ngModelChange: this.onNgModelChange,
          value: null,
          label: EnumTranslateKey.UI_COMPONENT_TITLE_HU_WELFARE_AUTO_YEAR,
          controlType: EnumFormBaseContolType.DROPDOWN,
          dropdownOptions$: this.groupOptionsYear$,
          getByIdObject$: this.yearGetByIdObject$,
        },
        {
          flexSize: 3,
          name: 'salaryPeriodId',
          ngModel: null,
          ngModelChange: this.onNgModelChange,
          value: null,
          label: EnumTranslateKey.UI_COMPONENT_TITLE_HU_WELFARE_AUTO_SALARY_PERIOD_ID,
          controlType: EnumFormBaseContolType.DROPDOWN,
          dropdownOptions$: this.groupOptionsPeriod$,
          getByIdObject$: this.periodGetByIdObject$,
        },
        {
          flexSize: 3,
          name: 'welfareId',
          ngModel: null,
          ngModelChange: this.onNgModelChange,
          value: null,
          label: EnumTranslateKey.UI_COMPONENT_LABEL_WELFARE_AUTO_WELFARE,
          controlType: EnumFormBaseContolType.DROPDOWN,
          dropdownOptions$: this.groupOptionsWelfare$,
          getByIdObject$: this.welfareGetByIdObject$,
        },
        {
          
          flexSize: 3,
          name: 'calulateDate',
          ngModel: null,
          ngModelChange: this.onNgModelChange,
          value: null,
          label: EnumTranslateKey.UI_COMPONENT_LABEL_WELFARE_AUTO_CALCULATE_DATE,
          controlType: EnumFormBaseContolType.DATEPICKER,
        }
      ]
    ];

  }

  calculate(): void {
    
    if (this.orgId == null || this.orgId == 0)
    {
      return this.alertService.warn(this.mls.trans("UI_COMPONENT_TITLE_HU_WELFARE_AUTO_ORG_ID_NULL"), this.alertOptions);
    }
    else if (this.paramRows[0][1].ngModel == null|| this.paramRows[0][0].ngModel == 0)
    {
      return this.alertService.warn(this.mls.trans("UI_COMPONENT_TITLE_HU_WELFARE_AUTO_SALARY_PERIOD_ID_NULL"), this.alertOptions);
    }
    else if (this.paramRows[0][2].ngModel == null|| this.paramRows[0][1].ngModel == 0)
    {
      return this.alertService.warn(this.mls.trans("UI_COMPONENT_LABEL_WELFARE_AUTO_WELFARE_NULL"), this.alertOptions);
    }
    else if (this.paramRows[0][3].ngModel == null)
    {
      return this.alertService.warn(this.mls.trans("UI_COMPONENT_LABEL_WELFARE_AUTO_CALCULATE_DATE_NULL"), this.alertOptions);
    }
    this.loading = true;
    this.subscriptions.push(
      this.appService
      .get(api.HU_WELFARE_AUTO_CALCULATE + this.orgId + 
        '&welfareId=' + this.paramRows[0][2].ngModel +
        '&periodId='+ this.paramRows[0][1].ngModel + 
        '&calculateDate=' + this.paramRows[0][3].ngModel.toLocaleDateString('en-US'))
      .subscribe((res: any) => {

        if (!!res.ok && res.status === 200) {
          const body: IFormatedResponse = res.body
          if (body.statusCode === 200 && !!body.innerBody) {    
            // reload màn hình  
            const listInstances = this.corePageListService.instances.filter(
                (y) => y.instanceNumber === this.listInstance
              );
              if (!!listInstances.length) {
                listInstances[0].reloadFlag$.next(
                  !!!listInstances[0].reloadFlag$.value
                );
              }
              // end reload màn hình
            //this.loadGrid();
            this.alertService.success(this.mls.trans("UI_COMPONENT_LABEL_WELFARE_AUTO_CALCULATE_SUCCESS"), this.alertOptions);
            this.outerParam$.next({
              benefitId: this.paramRows[0][2].ngModel,
              salaryPeriodId: this.paramRows[0][1].ngModel,
            });
            this.loading = false;
          }else{
              this.loading = false;
          }
        }
      })
    )
    
  }
  onRowDoubleClick(e: any) {
    // do not redirect edit by BA code 281
    return;
  }
}
