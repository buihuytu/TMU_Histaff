import { CommonModule } from "@angular/common";
import { Component, AfterViewInit } from "@angular/core";
import { RouterModule, ActivatedRoute, Router } from "@angular/router";
import { EnumTranslateKey, api } from 'alpha-global-constants';
import { CorePageListComponent, CorePageHeaderComponent, CoreCommonParamKitComponent, CoreDropdownComponent, CoreChecklistComponent, FullscreenModalLoaderComponent, BaseComponent, ICorePageListApiDefinition, ICorePageListCRUD, ICoreDropdownOption, IInOperator, ICoreChecklistOption, ICoreTableColumnItem, EnumCoreTablePipeType, ICorePageListEditRouting, MultiLanguageService, AppService, CorePageListService, AlertService, IFormatedResponse, EnumCoreButtonVNSCode, TranslatePipe } from "ngx-histaff-alpha";
import { Subscription, BehaviorSubject } from "rxjs";
import { InsTotalSalaryService } from "./ins-total-salary.service";
import { FormsModule } from "@angular/forms";


@Component({
  selector: 'app-ins-total-salary',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    TranslatePipe,
    CorePageListComponent,
    CorePageHeaderComponent,
    CoreCommonParamKitComponent,
    CoreDropdownComponent,
    CoreChecklistComponent,
    FullscreenModalLoaderComponent,
    RouterModule,
  ],
  templateUrl: './ins-total-salary.component.html',
  styleUrl: './ins-total-salary.component.scss'
})
export class InsTotalSalaryComponent extends BaseComponent implements AfterViewInit {
  title = EnumTranslateKey.UI_COMPONENT_TITLE_INS_TOTALSALARY;
  loading!: boolean;
  listInstance!: number;
  apiDefinition: ICorePageListApiDefinition = {
    queryListRelativePath: api.INS_TOTALSALARY_QUERY_LIST,
  };

  subscription: Subscription[] = [];
  salPeriod!: number;
  insOrgId!: number;
  insChangeTypeId!: number[];

  crud: ICorePageListCRUD = {
    deleteIds: api.INS_GROUP_DELETE_IDS,
    toggleActiveIds: api.INS_GROUP_TOGGLER_ACTIVE_IDS,
  };

  labelList = {
    year: EnumTranslateKey.UI_LABEL_TIME_IMPORT_YEAR,
    unit: EnumTranslateKey.UI_COMPONENT_LABEL_COMPANY_INSURANCE_UNIT,
    month: EnumTranslateKey.UI_COMPONENT_TITLE_SALARY_PERIOD_MONTH,
    arisingGroup: EnumTranslateKey.UI_COMPONENT_LABEL_ARISING_GROUP,
  };



  year: number = new Date().getFullYear();

  salaryPeriodOptions$ = new BehaviorSubject<ICoreDropdownOption[]>([]);
  salaryPeriodAddOptions$ = new BehaviorSubject<ICoreDropdownOption[]>([]);
  atSalaryPeriodGetByIdObject$ = new BehaviorSubject<any>(null);


  outerInOperators: IInOperator[] = [];
  outerParam$ = new BehaviorSubject<any>(null);
  groupOptionsInsOrg$ = new BehaviorSubject<ICoreDropdownOption[]>([]);
  insOrgGetByIdObject$ = new BehaviorSubject<any>(null);

  changeTypeOptions$ = new BehaviorSubject<ICoreChecklistOption[]>([
    {
      value: 1,
      text: 'Tăng',
      checked: true,
    },
    {
      value: 2,
      text: 'Giảm',
      checked: true,
    },
    {
      value: 3,
      text: 'Điểu chỉnh',
      checked: true,
    },
    {
      value: 4,
      text: 'Trong kỳ',
      checked: true,
    }
  ]);


  lstSal: any;


  columns: ICoreTableColumnItem[] = [
    // {
    //   caption: EnumTranslateKey.UI_LABEL_INSURANCE_GROUP_STATUS,
    //   field: 'status',
    //   type: 'string',
    //   align: 'center',
    //   width: 130,
    // },
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
      width: 0,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_COMMON_ID,
      field: 'insOrgId',
      hidden: true,
      type: 'number',
      align: 'right',
      width: 0,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_COMMON_ID,
      field: 'arisingGroupId',
      hidden: true,
      type: 'number',
      align: 'right',
      width: 0,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_INS_CHANGE_EMPL_CODE, //ma nv
      field: 'employeeCode',
      type: 'string',
      align: 'left',
      width: 100,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_INS_CHANGE_EMPL_NAME, //ten nv
      field: 'employeeName',
      type: 'string',
      align: 'left',
      width: 200,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_INS_CHANGE_ORG_NAME, //cong ty
      field: 'orgName',
      type: 'string',
      align: 'left',
      width: 200,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_INS_CHANGE_POS_NAME, //chuc danh
      field: 'positionName',
      type: 'string',
      align: 'left',
      width: 200,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_INS_CHANGE_BHXH_NO, //so so bhxh
      field: 'bhxhNo',
      type: 'string',
      align: 'center',
      width: 150,
    },
    {
      caption: EnumTranslateKey.UI_LABEL_INSURANCE_REGIMES_DECLARE_DATE, //dot khai bao
      field: 'declareDate',
      type: 'string',
      align: 'center',
      width: 150,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_INS_SPECIFIED_OBJECTS_SI_EMP, //BHXH Nhân viên đóng
      field: 'siEmp',
      type: 'string',
      align: 'center',
      pipe: EnumCoreTablePipeType.NUMBER,
      width: 150,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_INS_SPECIFIED_OBJECTS_HI_EMP, //BHYT nhân viên
      field: 'hiEmp',
      type: 'string',
      align: 'center',
      pipe: EnumCoreTablePipeType.NUMBER,
      width: 150,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_INS_SPECIFIED_OBJECTS_UI_EMP, //	BHTN nhân viên
      field: 'uiEmp',
      type: 'string',
      align: 'center',
      pipe: EnumCoreTablePipeType.NUMBER,
      width: 150,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_INS_SPECIFIED_OBJECTS_AI_OAI_EMP, //BHTNLD-BNN nhân viên
      field: 'bhtnldBnnEmp',
      type: 'string',
      align: 'center',
      pipe: EnumCoreTablePipeType.NUMBER,
      width: 150,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_INS_TOTALSALARY_TOTAL_EMP, //	Tổng mức nhân viên đóng
      field: 'totalEmp',
      type: 'string',
      align: 'center',
      pipe: EnumCoreTablePipeType.NUMBER,
      width: 150,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_INS_SPECIFIED_OBJECTS_SI_COM, //BHXH Công ty đóng
      field: 'siCom',
      type: 'string',
      align: 'center',
      pipe: EnumCoreTablePipeType.NUMBER,
      width: 150,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_INS_SPECIFIED_OBJECTS_HI_COM, //BHYT công ty
      field: 'hiCom',
      type: 'string',
      align: 'center',
      pipe: EnumCoreTablePipeType.NUMBER,
      width: 150,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_INS_SPECIFIED_OBJECTS_UI_COM, //	BHTN công ty
      field: 'uiCom',
      type: 'string',
      align: 'center',
      pipe: EnumCoreTablePipeType.NUMBER,
      width: 150,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_INS_SPECIFIED_OBJECTS_AI_OAI_COM, //BHTNLD-BNN Công ty
      field: 'bhtnldBnnCom',
      type: 'string',
      align: 'center',
      pipe: EnumCoreTablePipeType.NUMBER,
      width: 150,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_INS_TOTALSALARY_TOTAL_COMP, //Tổng mức Công ty đóng
      field: 'totalCom',
      type: 'string',
      align: 'center',
      pipe: EnumCoreTablePipeType.NUMBER,
      width: 150,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_INS_TOTALSALARY_SI_ADJUST, //Điều chỉnh BHXH (NV)
      field: 'siAdjust',
      type: 'string',
      align: 'center',
      pipe: EnumCoreTablePipeType.NUMBER,
      width: 150,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_INS_TOTALSALARY_HI_ADJUST, //Điều chỉnh BHYT (NV)
      field: 'hiAdjust',
      type: 'string',
      align: 'center',
      pipe: EnumCoreTablePipeType.NUMBER,
      width: 150,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_INS_TOTALSALARY_UI_ADJUST, //Điều chỉnh BHTN (NV)
      field: 'uiAdjust',
      type: 'string',
      align: 'center',
      pipe: EnumCoreTablePipeType.NUMBER,
      width: 150,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_INS_TOTALSALARY_BHTNLD_BNN_ADJUST, //Điều chỉnh BHTNLĐ_BNN(NV)
      field: 'bhtnldBnnAdjustEmp',
      type: 'string',
      align: 'center',
      pipe: EnumCoreTablePipeType.NUMBER,
      width: 150,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_INS_TOTALSALARY_SI_ADJUST_COMP, //Điều chỉnh BHXH (CTY)
      field: 'siAdjustCom',
      type: 'string',
      align: 'center',
      pipe: EnumCoreTablePipeType.NUMBER,
      width: 150,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_INS_TOTALSALARY_HI_ADJUST_COMP, //Điều chỉnh BHYT (CTY)
      field: 'hiAdjustCom',
      type: 'string',
      align: 'center',
      pipe: EnumCoreTablePipeType.NUMBER,
      width: 150,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_INS_TOTALSALARY_UI_ADJUST_COMP, //Điều chỉnh BHTN (CTY)
      field: 'uiAdjustCom',
      type: 'string',
      align: 'center',
      pipe: EnumCoreTablePipeType.NUMBER,
      width: 150,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_INS_TOTALSALARY_BHTNLD_BNN_ADJUST_COMP, //Điều chỉnh BHTNLĐ-BNN (CTY)
      field: 'bhtnldBnnAdjustCom',
      type: 'string',
      align: 'center',
      pipe: EnumCoreTablePipeType.NUMBER,
      width: 150,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_INS_TOTALSALARY_RATE_SI_COM, //Tỷ lệ % BHXH Công ty
      field: 'rateSiCom',
      type: 'string',
      align: 'center',
      pipe: EnumCoreTablePipeType.NUMBER,
      width: 150,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_INS_TOTALSALARY_RATE_HI_COM, //Tỷ lệ % BHYT Công ty
      field: 'rateHiCom',
      type: 'string',
      align: 'center',
      pipe: EnumCoreTablePipeType.NUMBER,
      width: 150,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_INS_TOTALSALARY_RATE_UI_COM, //	Tỷ lệ % BHTN Công ty
      field: 'rateUiCom',
      type: 'string',
      align: 'center',
      pipe: EnumCoreTablePipeType.NUMBER,
      width: 150,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_INS_TOTALSALARY_RATE_BHTNLD_BNN_COM, //Tỷ lệ % BHTNLĐ-BNN Công ty
      field: 'rateBhtnldBnnCom',
      type: 'string',
      align: 'center',
      pipe: EnumCoreTablePipeType.NUMBER,
      width: 150,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_INS_TOTALSALARY_RATE_SI, //Tỷ lệ % BHXH Nhân viên
      field: 'rateSiEmp',
      type: 'string',
      align: 'center',
      pipe: EnumCoreTablePipeType.NUMBER,
      width: 150,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_INS_TOTALSALARY_RATE_HI, //Tỷ lệ % BHYT Nhân viên
      field: 'rateHiEmp',
      type: 'string',
      align: 'center',
      pipe: EnumCoreTablePipeType.NUMBER,
      width: 150,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_INS_TOTALSALARY_RATE_UI, //Tỷ lệ % BHTN Nhân viên
      field: 'rateUiEmp',
      type: 'string',
      align: 'center',
      pipe: EnumCoreTablePipeType.NUMBER,
      width: 150,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_INS_TOTALSALARY_RATE_BHTNLD_BNN, //Tỷ lệ % BHTNLĐ-BNN Nhân viên
      field: 'rateBhtnldBnnEmp',
      type: 'string',
      align: 'center',
      pipe: EnumCoreTablePipeType.NUMBER,
      width: 150,
    },
  ];

  editRoute: ICorePageListEditRouting = {
    auxiliary: 'popupAux',
  };
  constructor(
    public override mls: MultiLanguageService,
    private appService: AppService,
    private corePageListService: CorePageListService,
    private route: ActivatedRoute,
    private router: Router,
    private alertService: AlertService,
    private insTotalSalaryService: InsTotalSalaryService,
  ) {
    super(mls);
    this.listInstance = Number(
      this.route.snapshot.paramMap.get('listInstance')!
    );
    this.insChangeTypeId = [1, 2, 3, 4]
  }

  override ngOnInit(): void { }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.subscriptions.push(this.mls.lang$.subscribe((x) => (this.lang = x)));
      this.onYearChange(this.year);
      this.getListUnit();
    })
  }

  onInstanceCreated(event: number) {
    this.listInstance = event;
  }
  override ngOnDestroy(): void { }


  onYearChange(year: number) {
    if (year.toString().length == 4) {
      this.year = year;
      this.getListPeriod();
    } else {
      this.salaryPeriodOptions$.next([]);
      this.atSalaryPeriodGetByIdObject$.next(null);
    }
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

  getListUnit() {
    this.subscriptions.push(
      this.appService
        .get(api.SYS_OTHERLIST_GETOTHERLISTBYTYPE + 'INS_UNIT')
        .subscribe((res: any) => {
          if (!!res.ok && res.status === 200) {
            const body: IFormatedResponse = res.body;
            if (body.statusCode === 200 && !!body.innerBody) {
              const options: { value: number | null; text: string }[] = [];
              // options.push({
              //   value: Number(),
              //   text: ''
              // })
              res.body.innerBody.map((g: any) => {
                options.push({
                  value: g.id,
                  text: g.name,
                })
              });
              this.groupOptionsInsOrg$.next(options);
            }
          }
        })
    );
  }
  onGetList(e: any) {
    console.log(this.year, this.salPeriod, this.insOrgId, this.insChangeTypeId)
    if (!this.year || !this.salPeriod || !this.insOrgId || !this.insChangeTypeId) return;
    this.insTotalSalaryService.infoPeriod = {
      year: this.year,
      periodId: this.salPeriod,
      insOrgId: this.insOrgId
    }
    this.outerParam$.next({
      periodId: this.salPeriod,
      year: this.year,
      insOrgId: this.insOrgId,
    })
    let y: number[] = [];
    if (this.insChangeTypeId.includes(4)) {
      var x = [1, 3];
      y = [...new Set(this.insChangeTypeId.concat(x))]
    }
    this.outerInOperators = [
      {
        field: 'arisingGroupId',
        values: y.filter(x => x !== 4)
      }

    ]
  }

  corePageHeaderButtonClick(e: any) {
    switch (e.code) {
      case EnumCoreButtonVNSCode.HEADER_INFORMATION:
        if (!this.year || !this.salPeriod || !this.insOrgId || !this.insChangeTypeId) {
          return this.alertService.warn(this.mls.trans('Fill Required Feild'), {
            keepAfterRouteChange: true,
            autoClose: true,
            timeClose: 3000,
          });
        }

        this.router.navigate(
          [
            {
              outlets: {
                corePageListAux: [btoa('0'), { listInstance: this.listInstance }],
              },
            },
          ],
          { relativeTo: this.route }
        );
        break;
      case EnumCoreButtonVNSCode.HEADER_CALCULATE:
        if (!!!this.insOrgId) {
          return this.alertService.warn(this.mls.trans(EnumTranslateKey.UI_COMPONENT_TITLE_INS_TOTALSALARY_SELECT_UNIT) + '!', {
            autoClose: true,
            keepAfterRouteChange: false,
            timeClose: 3000,
          });
        }
        this.loading = true;
        this.appService.post(api.INS_TOTALSALARY_CALCULATE, {
          year: this.year,
          periodId: this.salPeriod,
          insOrgId: this.insOrgId,
          insChangeTypeId: this.insChangeTypeId
        })
          .pipe().subscribe(x => {
            if (!!x && x.status === 200) {
              this.loading = false;
              if (!!x.ok && x.status === 200) {
                const body: IFormatedResponse = x.body
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
                } else {
                }
              }
            }
          })
        break;
    }
  }
}
