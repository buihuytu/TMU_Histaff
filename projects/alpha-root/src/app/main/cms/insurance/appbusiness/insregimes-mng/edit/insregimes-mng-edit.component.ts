import { Component, AfterViewInit, OnInit, Output, EventEmitter } from "@angular/core";
import { FormGroup, Validators, FormBuilder, AbstractControl } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { EnumTranslateKey, api } from 'alpha-global-constants';
import { BaseEditComponent, ICoreButtonVNS, IAlertOptions, ICoreDropdownOption, ICoreAccordionItem, EnumCoreButtonVNSCode, IFormBaseControl, EnumFormBaseContolType, EnumCoreFormControlSeekerSourceType, EnumCoreTablePipeType, DialogService, AppService, AlertService, RoutingService, MultiLanguageService, AuthService, ISysMutationLogBeforeAfterRequest, IFormatedResponse, CustomValidators } from "ngx-histaff-alpha";
import { BehaviorSubject, Subscription, map, distinctUntilChanged } from "rxjs";
import { InsRegimesMngEditService } from "./insregimes-mng.edit.service";



@Component({
  selector: 'cms-profile-insregimes-mng-edit',
  templateUrl: './insregimes-mng-edit.component.html',
  styleUrls: ['./insregimes-mng-edit.component.scss'],
})
export class InsRegimesMngEditComponent
  extends BaseEditComponent
  implements AfterViewInit, OnInit
{

  title = EnumTranslateKey.UI_COMPONENT_TITLE_INSURANCE_REGIMES_MNG

  // @Output() onSubmit = new EventEmitter();
  @Output() buttonClick = new EventEmitter<ICoreButtonVNS>();
  @Output() onCancal = new EventEmitter();
  alertOptions: IAlertOptions = {
    autoClose: false,
    keepAfterRouteChange: true,
    timeClose: 10000,
  };
  manualHeightList!: boolean;
  heightListVisible: number[] = [];
  loading: boolean = false;

  captionCode!: EnumTranslateKey.UI_COMPONENT_TITLE_HU_COMMEND;
  employeeGetByIdObject$ = new BehaviorSubject<any>(null);
  employeeGetByIdApi = api.HU_EMPLOYEE_READ;

  regimesOptions$ = new BehaviorSubject<ICoreDropdownOption[]>([]);
  regimesGetByIdObject$ = new BehaviorSubject<any>(null);
  regimesGetByIdApi = api.INS_REGIMES_READ;

  regimesGroupOptions$ = new BehaviorSubject<ICoreDropdownOption[]>([]);
  regimesGroupGetByIdObject$ = new BehaviorSubject<any>(null);
  regimesGroupGetByIdApi = api.INS_GROUP_READ;

  sectors!: ICoreAccordionItem[];
  override form!: FormGroup;
  buttonItems: EnumCoreButtonVNSCode[] = [
    EnumCoreButtonVNSCode.NONE_HEADER_SAVE,
    EnumCoreButtonVNSCode.NONE_HEADER_CANCEL,
  ];

  employeeIdGetByIdApi = api.HU_ORGANIZATION_READ;
  employeeIdGetById$ = new BehaviorSubject<any>(null);
  employeeIdOptions$ = new BehaviorSubject<ICoreDropdownOption[]>([]);

  subscriptions: Subscription[] = [];

  employeeId: IFormBaseControl = {
    //Đối tượng nhân viên
    flexSize: 3,
    label: EnumTranslateKey.UI_COMPONENT_TITLE_INS_INFORMATION_CODE,
    field: 'employeeId',
    value: 0,
    controlType: EnumFormBaseContolType.SEEKER,
    /* 
                START: WHEN USING controlType === EnumFormBaseContolType.SEEKER
                we must pass the three properties bellow:
               */
    seekerSourceType: EnumCoreFormControlSeekerSourceType.EMPLOYEE_SEEK,
    getByIdObject$: this.employeeGetByIdObject$,
    getByIdApi: this.employeeGetByIdApi,
    boundFrom: 'id',
    shownFrom: 'code',
    alsoBindTo: [
      { takeFrom: 'positionName', bindTo: 'positionName' },
      { takeFrom: 'fullname', bindTo: 'employeeName' },
      { takeFrom: 'orgName', bindTo: 'orgName' },
      { takeFrom: 'birthDate', bindTo: 'birthDate' },
      { takeFrom: 'birthPlace', bindTo: 'birthPlace' },
    ],
    /* END: WHEN USING controlType === EnumFormBaseContolType.SEEKER */
    type: 'number',
    validators: [
      {
        name: 'required',
        validator: Validators.required,
        errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
      },
      {
        name: 'minLength',
        validator: Validators.minLength(1),
        errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
      },
    ],
  };
  employeeCode: IFormBaseControl = {
    //họ và tên nhân viên
    flexSize: 3,
    controlType: EnumFormBaseContolType.TEXTBOX,
    field: 'employeeCode',
    label: EnumTranslateKey.UI_COMPONENT_TITLE_INS_INFORMATION_CODE,
    type: 'string',
    value: '',
    disabled: true,
    validators: [
      {
        name: 'required',
        validator: Validators.required,
        errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
      },
    ],
  };
  employeeName: IFormBaseControl = {
    //họ và tên nhân viên
    flexSize: 3,
    controlType: EnumFormBaseContolType.TEXTBOX,
    field: 'employeeName',
    label: EnumTranslateKey.UI_COMPONENT_TITLE_INS_INFORMATION_NAME,
    type: 'string',
    value: '',
    disabled: true,
  };
  positionName: IFormBaseControl = {
    //chức danh
    flexSize: 3,
    controlType: EnumFormBaseContolType.TEXTBOX,
    field: 'positionName',
    label: EnumTranslateKey.UI_COMPONENT_TITLE_INS_INFORMATION_POSITION_NAME,
    type: 'string',
    value: '',
    disabled: true,
  };
  orgName: IFormBaseControl = {
    //phòng ban
    flexSize: 3,
    controlType: EnumFormBaseContolType.TEXTBOX,
    field: 'orgName',
    label: EnumTranslateKey.UI_COMPONENT_TITLE_INS_INFORMATION_ORG_NAME,
    type: 'string',
    value: '',
    disabled: true,
  };

  bhxhNo: IFormBaseControl = {
    flexSize: 3,
    label: EnumTranslateKey.UI_COMPONENT_TITLE_INS_INFORMATION_BHXH_NO,
    field: 'bhxhNo',
    value: '',
    controlType: EnumFormBaseContolType.TEXTBOX,
    type: 'text',
    disabled: true,
  };

  birthDate: IFormBaseControl = {
    flexSize: 3,
    label: EnumTranslateKey.UI_COMPONENT_TITLE_INS_INFORMATION_BIRTH_DATE,
    field: 'birthDate',
    value: '',
    controlType: EnumFormBaseContolType.DATEPICKER,
    type: 'text',
    disabled: true,
  };
  birthPlace: IFormBaseControl = {
    flexSize: 3,
    label: EnumTranslateKey.UI_COMPONENT_TITLE_INS_INFORMATION_BIRTH_PLACE,
    field: 'birthPlace',
    value: '',
    controlType: EnumFormBaseContolType.TEXTBOX,
    type: 'text',
    disabled: true,
  };

  //sector 2

  insGroupId: IFormBaseControl = {
    flexSize: 3,
    label: EnumTranslateKey.UI_LABEL_INSURANCE_REGIMES_GROUP,
    field: 'insGroupId',
    value: null,
    controlType: EnumFormBaseContolType.DROPDOWN,
    dropdownOptions$: this.regimesGroupOptions$,
    getByIdObject$: this.regimesGroupGetByIdObject$,
    getByIdApi: this.regimesGroupGetByIdApi,
    type: 'string',
    shownFrom: 'name',
    validators: [
      {
        name: 'required',
        validator: Validators.required,
        errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
      },
      {
        name: 'minLength',
        validator: Validators.min(1),
        errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
      },
    ],
  };

  regimeId: IFormBaseControl = {
    flexSize: 3,
    label: EnumTranslateKey.UI_LABEL_INSURANCE_REGIMES,
    field: 'regimeId',
    value: '',
    controlType: EnumFormBaseContolType.DROPDOWN,
    dropdownOptions$: this.regimesOptions$,
    getByIdObject$: this.regimesGetByIdObject$,
    getByIdApi: this.regimesGetByIdApi,
    type: 'string',
    shownFrom: 'name',
    validators: [
      {
        name: 'required',
        validator: Validators.required,
        errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
      },
      {
        name: 'minLength',
        validator: Validators.min(1),
        errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
      },
    ],
  };
  ///End Sector 1///

  ///Sector 2

  startDate: IFormBaseControl = {
    flexSize: 3,
    label: EnumTranslateKey.UI_LABEL_INSURANCE_REGIMES_START_DATE,
    field: 'startDate',
    value: '',
    controlType: EnumFormBaseContolType.DATEPICKER,
    validators: [
      {
        name: 'required',
        validator: Validators.required,
        errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
      },
    ],
    type: 'date',
  };
  endDate: IFormBaseControl = {
    flexSize: 3,
    label: EnumTranslateKey.UI_LABEL_INSURANCE_REGIMES_END_DATE,
    field: 'endDate',
    value: '',
    controlType: EnumFormBaseContolType.DATEPICKER,
    validators: [
      {
        name: 'required',
        validator: Validators.required,
        errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
      },
    ],
    type: 'date',
  };
  dayCalculator: IFormBaseControl = {
    flexSize: 3,
    label: EnumTranslateKey.UI_LABEL_INSURANCE_REGIMES_DAY_CALCULATOR,
    field: 'dayCalculator',
    value: '',
    controlType: EnumFormBaseContolType.TEXTBOX,
    disabled: true,
    type: 'text',
  };

  accumulateDay: IFormBaseControl = {
    flexSize: 3,
    label: EnumTranslateKey.UI_LABEL_INSURANCE_REGIMES_ACCUMULATE_DAY,
    field: 'accumulateDay',
    value: '',
    controlType: EnumFormBaseContolType.TEXTBOX,
    disabled: true,
    type: 'text',
  };
  childrenNo: IFormBaseControl = {
    flexSize: 3,
    label: EnumTranslateKey.UI_LABEL_INSURANCE_REGIMES_CHILDREN_NO,
    field: 'childrenNo',
    value: '',
    controlType: EnumFormBaseContolType.TEXTBOX,
    disabled: true,
    type: 'number',
    validators: [
      {
        name: 'min',
        validator: Validators.min(0),
        errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_MIN,
      },
    ],
  };
  averageSalSixMonth: IFormBaseControl = {
    flexSize: 3,
    label: EnumTranslateKey.UI_LABEL_INSURANCE_REGIMES_AVERAGE_SAL_SIX_MONTH,
    field: 'averageSalSixMonth',
    value: '',
    controlType: EnumFormBaseContolType.CURRENCY,
    pipe: EnumCoreTablePipeType.NUMBER,
    type: 'number',
  };
  bhxhSalary: IFormBaseControl = {
    flexSize: 3,
    label: EnumTranslateKey.UI_LABEL_INSURANCE_REGIMES_BHXH_SALARY,
    field: 'bhxhSalary',
    value: '',
    controlType: EnumFormBaseContolType.CURRENCY,
    pipe: EnumCoreTablePipeType.NUMBER,
    type: 'number',
    // readonly: true,
  };

  regimeSalary: IFormBaseControl = {
    flexSize: 3,
    label: EnumTranslateKey.UI_LABEL_INSURANCE_REGIMES_REGIME_SALARY,
    field: 'regimeSalary',
    value: '',
    controlType: EnumFormBaseContolType.CURRENCY,
    pipe: EnumCoreTablePipeType.NUMBER,
    type: 'number',
  };

  subsidyAmountChange: IFormBaseControl = {
    flexSize: 3,
    label: EnumTranslateKey.UI_LABEL_INSURANCE_REGIMES_SUBSIDY_AMOUNT_CHANGE,
    field: 'subsidyAmountChange',
    value: '',
    controlType: EnumFormBaseContolType.CURRENCY,
    type: 'number',
  };
  subsidyMoneyAdvance: IFormBaseControl = {
    flexSize: 3,
    label: EnumTranslateKey.UI_LABEL_INSURANCE_REGIMES_SUBSIDY_MONEY_ADVANCE,
    field: 'subsidyMoneyAdvance',
    value: '',
    controlType: EnumFormBaseContolType.CURRENCY,
    type: 'number',
  };

  declareDate: IFormBaseControl = {
    flexSize: 3,
    label: EnumTranslateKey.UI_LABEL_INSURANCE_REGIMES_DECLARE_DATE,
    field: 'declareDate',
    value: '',
    controlType: EnumFormBaseContolType.DATEPICKER,
    type: 'date',
    validators: [
      {
        name: 'required',
        validator: Validators.required,
        errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
      },
      {
        name: 'minLength',
        validator: Validators.min(1),
        errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
      },
    ],
  };

  dateCalculator: IFormBaseControl = {
    flexSize: 3,
    label: EnumTranslateKey.UI_LABEL_INSURANCE_REGIMES_DATE_CALCULATOR,
    field: 'dateCalculator',
    value: '',
    controlType: EnumFormBaseContolType.DATEPICKER,
    type: 'date',
  };
  salaryBasic: IFormBaseControl = {
    flexSize: 0,
    label: EnumTranslateKey.UI_LABEL_INSURANCE_REGIMES_DATE_CALCULATOR,
    field: 'salaryBasic',
    value: '',
    controlType: EnumFormBaseContolType.CURRENCY,
    hidden: true,
    type: 'number',
  };

  status: IFormBaseControl = {
    flexSize: 3,
    label: EnumTranslateKey.UI_LABEL_INSURANCE_REGIMES_MNG_STATUS,
    field: 'status',
    value: '',
    controlType: EnumFormBaseContolType.TEXTBOX,
    type: 'text',
  };

  note: IFormBaseControl = {
    flexSize: 3,
    label: EnumTranslateKey.UI_LABEL_INSURANCE_REGIMES_MNG_NOTE,
    field: 'note',
    value: '',
    controlType: EnumFormBaseContolType.TEXTBOX,
    type: 'text',
  };
  insPayAmount: IFormBaseControl = {
    flexSize: 3,
    label: EnumTranslateKey.UI_LABEL_INSURANCE_REGIMES_INS_PAY_AMOUNT,
    field: 'insPayAmount',
    value: '',
    controlType: EnumFormBaseContolType.CURRENCY,
    type: 'number',
  };
  approvDayNum: IFormBaseControl = {
    flexSize: 3,
    label: EnumTranslateKey.UI_LABEL_INSURANCE_REGIMES_APPROV_DAY_NUM,
    field: 'approvDayNum',
    value: '',
    controlType: EnumFormBaseContolType.TEXTBOX,
    type: 'number',
  };
  payApproveDate: IFormBaseControl = {
    flexSize: 3,
    label: EnumTranslateKey.UI_LABEL_INSURANCE_REGIMES_PAY_APPROVE_DATE,
    field: 'payApproveDate',
    value: '',
    controlType: EnumFormBaseContolType.DATEPICKER,
    type: 'date',
  };

  checkError$ = new BehaviorSubject<boolean>(false);
  id!: number;
  constructor(
    public override dialogService: DialogService,
    private fb: FormBuilder,
    private appService: AppService,
    private insRegimesEditService: InsRegimesMngEditService,
    private alertService: AlertService,
    private route: ActivatedRoute,
    private routingService: RoutingService,
    private mls: MultiLanguageService,
    private router: Router,
    private authService: AuthService
  ) {
    super(dialogService);
    this.sectors = this.insRegimesEditService.sectors;
    this.id = Number(atob(this.route.snapshot.params['id']));
  }

  ngOnInit(): void {
    this.createForm();
    // this.getCode();
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.subscriptions.push(
        this.insRegimesEditService
          .getAllGroup()
          .pipe(
            map((x: any) => {
              if (x.ok && x.status === 200) {
                const options: { value: number; text: string; code: string }[] =
                  [];
                x.body.innerBody.map((g: any) => {
                  options.push({
                    value: g.id,
                    text: g.name,
                    code: g.code,
                  });
                });
                return options;
              } else {
                return [];
              }
            })
          )
          .subscribe((response) => {
            this.regimesGroupOptions$.next(response);
            this.loading = false;
          })
      );
    });
  }

  createForm() {
    this.form = this.fb.group({
      id: null,
      orgId: null,
      employeeId: [null, [Validators.required]],
      employeeCode: [{ value: '', disabled: true }, [Validators.required]],
      employeeName: [{ value: null, disabled: true }],
      positionName: [{ value: null, disabled: true }],
      orgName: [{ value: null, disabled: true }],
      bhxhNo: [{ value: null, disabled: true }],
      birthDate: [{ value: null, disabled: true }],
      birthPlace: [{ value: null, disabled: true }],
      insGroupId: [null, [Validators.required]],
      regimeId: [null, [Validators.required]],
      // fromDate: [
      //   null,
      //   [Validators.required, InsRegimesMngEditComponent.checkFromDate],
      // ],
      // toDate: [
      //   null,
      //   [Validators.required, InsRegimesMngEditComponent.checkToDate],
      // ],
      startDate: [
        null,
        [Validators.required, InsRegimesMngEditComponent.checkStartDate],
      ],
      endDate: [
        null,
        [Validators.required, InsRegimesMngEditComponent.checkEndDate],
      ],
      dayCalculator: [{ value: null, disabled: true }],
      accumulateDay: [{ value: null, disabled: true }],
      childrenNo: [{ value: null, disabled: true }],
      averageSalSixMonth: [null],
      bhxhSalary: [null],
      regimeSalary: [null],
      subsidyAmountChange: [null],
      subsidyMoneyAdvance: [null],
      declareDate: [null, [Validators.required]],
      dateCalculator: [null],
      status: [null],
      note: [null],
      insPayAmount: [0],
      approvDayNum: [null],
      payApproveDate: [null],
    });

    if (!!this.id) {
      this.form.get('id')?.setValue(this.id);
      this.subscriptions.push(
        this.appService
          .get(api.INS_REGIMES_MNG_GET_BY_ID + this.id.toString())
          .subscribe((x: any) => {
            if (x.ok && x.status == 200) {
              let resObj = x.body.innerBody;
              this.form.patchValue(resObj);
              if (x.body.innerBody.insGroupId != null) {
                this.insRegimesEditService
                  .getRegimesByGroupId(x.body.innerBody.insGroupId)
                  .pipe(
                    map((x: any) => {
                      if (x.ok && x.status === 200) {
                        const options: {
                          value: number;
                          text: string;
                          code: string;
                        }[] = [];
                        x.body.innerBody.map((g: any) => {
                          options.push({
                            value: g.id,
                            text: g.name,
                            code: g.totalDay,
                          });
                        });
                        return options;
                      } else {
                        return [];
                      }
                    })
                  )
                  .subscribe((response) => {
                    this.regimesOptions$.next(response);
                    this.loading = false;
                  });
              }

              this.formInitStringValue = JSON.stringify(
                this.form.getRawValue()
              );
              let objSign = {
                value: resObj.employeeId,
                code: resObj.employeeCode,
              };
              this.employeeGetByIdObject$.next(objSign);
            }
          })
      );
    }

    this.subscriptions.push(
      this.form
        .get('fromDate')
        ?.valueChanges.pipe(distinctUntilChanged())
        .subscribe((x) => {
          if (this.form.get('toDate')?.value != null) {
            this.form.get('toDate')?.setValue(this.form.get('toDate')?.value);
          }
          // if (this.form.get('startDate')?.value != null) {
          //   this.form.get('startDate')?.setValue(this.form.get('startDate')?.value);
          // }
        })!,

      this.form
        .get('toDate')
        ?.valueChanges.pipe(distinctUntilChanged())
        .subscribe((x) => {
          if (this.form.get('fromDate')?.value != null) {
            this.form
              .get('fromDate')
              ?.setValue(this.form.get('fromDate')?.value);
          }
          // if (this.form.get('endDate')?.value != null) {
          //   this.form.get('endDate')?.setValue(this.form.get('endDate')?.value);
          // }
        })!,

      this.form
        .get('startDate')
        ?.valueChanges.pipe(distinctUntilChanged())
        .subscribe((x) => {
          this.getDayCalculator();
          if (this.form.get('endDate')?.value != null) {
            this.form.get('endDate')?.setValue(this.form.get('endDate')?.value);
          }
          // if (this.form.get('fromDate')?.value != null) {
          //   this.form.get('fromDate')?.setValue(this.form.get('fromDate')?.value);
          // }
        })!,
      this.form
        .get('endDate')
        ?.valueChanges.pipe(distinctUntilChanged())
        .subscribe((x) => {
          this.getDayCalculator();
          if (this.form.get('startDate')?.value != null) {
            this.form
              .get('startDate')
              ?.setValue(this.form.get('startDate')?.value);
          }
          // if (this.form.get('toDate')?.value != null) {
          //   this.form.get('toDate')?.setValue(this.form.get('toDate')?.value);
          // }
        })!,

      // employee Infor
      this.form
        .get('employeeId')
        ?.valueChanges.pipe(distinctUntilChanged())
        .subscribe((x) => {
          this.insRegimesEditService
            .getInforByEmployeeId(x)
            .pipe(
              map((x: any) => {
                if (x.ok && x.status === 200) {
                  return x.body.innerBody;
                } else {
                  return null;
                }
              })
            )
            .subscribe((response) => {
              this.form.get('bhxhNo')?.patchValue(response.bhxhNo);
              this.loading = false;
            });
          this.getDayCalculator();
        })!,

      // change regimes
      this.form
        .get('regimeId')
        ?.valueChanges.pipe(distinctUntilChanged())
        .subscribe((x) => {
          this.getDayCalculator();
        })!,
      //get regimes
      this.form
        .get('insGroupId')
        ?.valueChanges.pipe(distinctUntilChanged())
        .subscribe((x) => {
          let opt = this.regimesGroupOptions$.value.filter(
            (y) => y.value === x
          )[0];
          if (opt.code === 'NCD001') {
            this.form.get('childrenNo')?.enable();
          } else this.form.get('childrenNo')?.disable();
          if (!!x) {
            this.insRegimesEditService
              .getRegimesByGroupId(x)
              .pipe(
                map((x: any) => {
                  if (x.ok && x.status === 200) {
                    const options: {
                      value: number;
                      text: string;
                      code: string;
                    }[] = [];
                    x.body.innerBody.map((g: any) => {
                      options.push({
                        value: g.id,
                        text: g.name,
                        code: g.totalDay,
                      });
                    });
                    return options;
                  } else {
                    return [];
                  }
                })
              )
              .subscribe((response) => {
                this.regimesOptions$.next(response);
                this.loading = false;
              });
          } else {
            this.regimesOptions$.next([]);
          }
        })!
    );
  }

  onButtonClick(e: ICoreButtonVNS): void {
    if (e.code == EnumCoreButtonVNSCode.NONE_HEADER_CANCEL) {
      this.onCancelLocal();
    }
    if (e.code == EnumCoreButtonVNSCode.NONE_HEADER_SAVE) {
      this.onFormSubmit();
    }
    this.buttonClick.emit(e);
  }

  onCancelLocal() {
    this.router.navigateByUrl('/cms/insurance/business/insregimes-mng');
  }

  onFormSubmit() {
    let url: string;
    this.checkError$.next(true);
    const request = this.form.getRawValue();
    const actualFormDeclaredFields: any[] = [];
    Object.keys(this.form.controls).forEach((c) => {
      actualFormDeclaredFields.push(c);
    });

    let sysActionCode = '';
    if (!!this.id) {
      url = api.INS_INFORMATION_UPDATE;
      sysActionCode = EnumCoreButtonVNSCode.HEADER_SAVE;
    } else {
      url = api.INS_INFORMATION_CREATE;
      sysActionCode = EnumCoreButtonVNSCode.HEADER_CREATE;
    }
    const sysMutationLogBeforeAfterRequest: ISysMutationLogBeforeAfterRequest =
      {
        sysFunctionCode: this.routingService.currentFunction$.value?.code!,
        sysActionCode: sysActionCode,
        before: this.formInitStringValue || '""',
        after: JSON.stringify(this.form.getRawValue()),
        username: this.authService.data$.value?.userName!,
      };

    const mixRequest = {
      ...request,
      actualFormDeclaredFields,
      sysMutationLogBeforeAfterRequest,
    };

    if (!!this.form.valid) {
      if (!!this.id) {
        url = api.INS_REGIMES_MNG_UPDATE;
      } else {
        url = api.INS_REGIMES_MNG_CREATE;
      }
      this.appService.post(url, mixRequest).subscribe((response) => {
        if (response.ok == true && response.status == 200) {
          const body: IFormatedResponse = response.body;
          if (body.statusCode === 200) {
            // this.alertService.success(`${this.mls.trans(response.body.messageCode)}`, this.alertOptions);
            this.formInitStringValue = JSON.stringify(this.form.getRawValue());
            this.onCancelLocal();
          }
          // else {
          //   this.alertService.error(`${this.mls.trans(response.body.messageCode)}`, this.alertOptions);
          // }
        }
        // else {
        //   this.alertService.error(`${this.mls.trans(response.messageCode)}`, this.alertOptions);
        // }
      });
    } else {
      this.sectors.forEach((x) => {
        x.open = true;
      });

      const c = document.querySelectorAll('.sector-content.open');
      for (let i = 0; i < c.length; i++) {
        var x = c[i] as HTMLElement;
        x.style.height = 'auto';
      }
    }

    // setTimeout(() => this.checkError$.next(false), 3000);
  }
  onAccordionItemClick(e: ICoreAccordionItem): void {
    const c = document.querySelectorAll('.sector-content.open');
    for (let i = 0; i < c.length; i++) {
      var x = c[i] as HTMLElement;
      x.style.height = 'auto';
    }
  }

  onAccordionItemClickEdit(e: ICoreAccordionItem): void {}

  ngOnDestroy(): void {
    this.subscriptions.map((x) => x?.unsubscribe());
  }

  getDayCalculator() {
    if (
      this.form.get('endDate')?.getRawValue() != null &&
      this.form.get('startDate')?.getRawValue() != null
    ) {
      //get dayCalculator

      var startDate = this.form.get('startDate')?.getRawValue();
      var endDate = this.form.get('endDate')?.getRawValue();
      let x =
        Math.ceil(
          (new Date(endDate.toLocaleDateString('en-US')).getTime() -
            new Date(startDate.toLocaleDateString('en-US')).getTime()) /
            (24 * 60 * 60 * 1000)
        ) + 1;
      if (x >= 0) {
        this.form.get('dayCalculator')?.setValue(x);
      } else this.form.get('dayCalculator')?.setValue(null);

      //get accumulateDay
      if (
        this.form.get('employeeId')?.value != null &&
        this.form.get('employeeId')?.value != ''
      ) {
        const request = this.form.getRawValue();
        this.appService
          .post(api.INS_REGIMES_MNG_GET_ACCUUMULATE_Day, request)
          .subscribe((res) => {
            if (res.ok && res.status == 200) {
              const body = res.body;
              if (body.statusCode === 200) {
                var n = x - Number.parseInt(body.innerBody.count)
                this.form.get('accumulateDay')?.setValue(( n < 0 ) ? 0 : n);
              }
            }
          });
      }
    } else this.form.get('accumulateDay')?.setValue(null);
  }

  static checkFromDate(control: AbstractControl): any | null {
    let valid = true;
    let errorMessage: string = '';
    const fromDate = new Date(control.value);
    const toDate =
      control.parent?.get('toDate')?.value === null
        ? null
        : new Date(control.parent?.get('toDate')?.value);
    // const startDate = control.parent?.get('startDate')?.value === null ? null : new Date(control.parent?.get('startDate')?.value);
    if (!!toDate) {
      if (
        new Date(fromDate.toLocaleDateString('en-US')) >
        new Date(toDate.toLocaleDateString('en-US'))
      ) {
        valid = false;
        errorMessage =
          EnumTranslateKey.UI_FORM_CONTROL_INSURANCE_REGIMES_MNG_ERROR_FROM_DATE_MORE_THAN_TO_DATE;
      }
    }
    // if (!!startDate) {
    //   if (new Date(fromDate.toLocaleDateString('en-US')) > new Date(startDate.toLocaleDateString('en-US'))) {
    //     valid = false;
    //     errorMessage = EnumTranslateKey.UI_FORM_CONTROL_INSURANCE_REGIMES_MNG_ERROR_FROM_DATE_MORE_THAN_START_DATE;
    //   }
    // }
    return CustomValidators.core('checkFromDate', valid, errorMessage)(control);
  }

  static checkToDate(control: AbstractControl): any | null {
    let valid = true;
    let errorMessage: string = '';
    const toDate = new Date(control.value);
    const fromDate =
      control.parent?.get('fromDate')?.value === null
        ? null
        : new Date(control.parent?.get('fromDate')?.value);
    // const endDate = control.parent?.get('endDate')?.value === null ? null : new Date(control.parent?.get('endDate')?.value);
    if (!!fromDate) {
      if (
        new Date(toDate.toLocaleDateString('en-US')) <
        new Date(fromDate.toLocaleDateString('en-US'))
      ) {
        valid = false;
        errorMessage =
          EnumTranslateKey.UI_FORM_CONTROL_INSURANCE_REGIMES_MNG_ERROR_TO_DATE_LESS_THAN_FROM_DATE;
      }
    }
    // if (!!endDate) {
    //   if (new Date(toDate.toLocaleDateString('en-US')) < new Date(endDate.toLocaleDateString('en-US'))) {
    //     valid = false;
    //     errorMessage = EnumTranslateKey.UI_FORM_CONTROL_INSURANCE_REGIMES_MNG_ERROR_TO_DATE_LESS_THAN_END_DATE;
    //   }
    // }
    return CustomValidators.core('checkToDate', valid, errorMessage)(control);
  }

  static checkStartDate(control: AbstractControl): any | null {
    let valid = true;
    let errorMessage: string = '';
    const startDate = new Date(control.value);
    const endDate =
      control.parent?.get('endDate')?.value === null
        ? null
        : new Date(control.parent?.get('endDate')?.value);
    // const fromDate = control.parent?.get('fromDate')?.value === null ? null : new Date(control.parent?.get('fromDate')?.value);
    if (!!endDate) {
      if (
        new Date(startDate.toLocaleDateString('en-US')) >
        new Date(endDate.toLocaleDateString('en-US'))
      ) {
        valid = false;
        errorMessage =
          EnumTranslateKey.UI_FORM_CONTROL_INSURANCE_REGIMES_MNG_ERROR_START_DATE_MORE_THAN_END_DATE;
      }
    }
    // if (!!fromDate) {
    //   if (new Date(startDate.toLocaleDateString('en-US')) < new Date(fromDate.toLocaleDateString('en-US'))) {
    //     valid = false;
    //     errorMessage = EnumTranslateKey.UI_FORM_CONTROL_INSURANCE_REGIMES_MNG_ERROR_START_DATE_LESS_THAN_FROM_DATE;
    //   }
    // }
    return CustomValidators.core(
      'checkStartDate',
      valid,
      errorMessage
    )(control);
  }

  static checkEndDate(control: AbstractControl): any | null {
    let valid = true;
    let errorMessage: string = '';
    const endDate = new Date(control.value);
    const startDate =
      control.parent?.get('startDate')?.value === null
        ? null
        : new Date(control.parent?.get('startDate')?.value);
    // const toDate = control.parent?.get('toDate')?.value === null ? null : new Date(control.parent?.get('toDate')?.value);
    if (!!startDate) {
      if (
        new Date(endDate.toLocaleDateString('en-US')) <
        new Date(startDate.toLocaleDateString('en-US'))
      ) {
        valid = false;
        errorMessage =
          EnumTranslateKey.UI_FORM_CONTROL_INSURANCE_REGIMES_MNG_ERROR_END_DATE_LESS_THAN_START_DATE;
      }
    }
    // if (!!toDate) {
    //   if (new Date(endDate.toLocaleDateString('en-US')) > new Date(toDate.toLocaleDateString('en-US'))) {
    //     valid = false;
    //     errorMessage = EnumTranslateKey.UI_FORM_CONTROL_INSURANCE_REGIMES_MNG_ERROR_END_DATE_LESS_THAN_TO_DATE;
    //   }
    // }
    return CustomValidators.core('checkEndDate', valid, errorMessage)(control);
  }
}
