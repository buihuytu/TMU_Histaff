import { AfterViewInit, Component, EventEmitter, Output } from '@angular/core';
import { Validators, FormBuilder, AbstractControl } from '@angular/forms';
import { Subscription, BehaviorSubject, map, distinctUntilChanged, debounceTime, filter } from 'rxjs';
import { EnumTranslateKey, api } from 'alpha-global-constants';
import { ActivatedRoute, Router } from '@angular/router';
import moment from 'moment';
import { BaseEditComponent, ICoreButtonVNS, ICoreAccordionItem, EnumCoreButtonVNSCode, IAlertOptions, ICoreChecklistOption, ICorePageEditColumnComposition, ICorePageEditCRUD, IFormBaseControl, EnumFormBaseContolType, EnumCoreFormControlSeekerSourceType, DialogService, MultiLanguageService, AlertService, AppService, RoutingService, AuthService, ISysMutationLogBeforeAfterRequest, IFormatedResponse, CustomValidators } from 'ngx-histaff-alpha';
import { InsChangeEditService } from './inschange.edit.service';
@Component({
  selector: 'app-inschange-edit',
  templateUrl: './inschange-edit.component.html',
  styleUrls: ['./inschange-edit.component.scss'],
})
export class InsChangeEditComponent
  extends BaseEditComponent
  implements AfterViewInit {

  title = EnumTranslateKey.UI_COMPONENT_TITLE_INS_CHANGE;

  /* Properties to be passed into core-page-edit */
  @Output() buttonClick = new EventEmitter<ICoreButtonVNS>();
  sectors!: ICoreAccordionItem[];
  checkError$ = new BehaviorSubject<boolean>(false);
  loading: boolean = false;
  date = moment();
  lang!: string;

  buttonItems: EnumCoreButtonVNSCode[] = [
    EnumCoreButtonVNSCode.NONE_HEADER_SAVE,
    EnumCoreButtonVNSCode.NONE_HEADER_CANCEL,
  ];

  alertOptions: IAlertOptions = {
    autoClose: false,
    keepAfterRouteChange: true,
  };
  override entityTable = 'INS_CHANGE';

  checklistOptions$ = new BehaviorSubject<ICoreChecklistOption[]>([
    {
      value: 1,
      text: 'BHXH',
      checked: true,
    },
    {
      value: 2,
      text: 'BHYT',
      checked: true,
    },
    {
      value: 3,
      text: 'BHTN',
      checked: true,
    },
    {
      value: 4,
      text: 'BHTNLĐ-BNN',
      checked: true,
    },
  ]);

  listTruyThu: any = ['TM', 'ON', 'TD'];
  listThoaiThu: any = ['GH', 'GC', 'TS', 'OM', 'OP', 'OF', 'KL'];
  realChangeValue!: string;

  selectedData: any;
  insuranceGetByIdObject$ = new BehaviorSubject<any>(null);

  subscriptions: Subscription[] = [];

  employeeGetByIdObject$ = new BehaviorSubject<any>(null);
  employeeGetByIdApi = api.HU_EMPLOYEE_READ;
  //employeeGetByIdApi = api.PA_LISTSALARIES_READ;

  unitInsOptions$ = new BehaviorSubject<any>(null);
  unitInsGetByIdObject$ = new BehaviorSubject<any>(null);
  unitInsGetByIdApi = api.INS_CHANGE_UNIT_INSURANCE;

  insTypeChangeOptions$ = new BehaviorSubject<any>(null);
  insTypeChangeGetByIdObject$ = new BehaviorSubject<any>(null);
  insTypeChangeGetByIdApi = api.INS_TYPE_READ;

  captionCode!: EnumTranslateKey;
  formComposition!: ICorePageEditColumnComposition[][];
  crud!: ICorePageEditCRUD;

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
      //{ takeFrom: 'employeeCode', bindTo: 'employeeCode' },
      { takeFrom: 'fullname', bindTo: 'employeeName' },
      { takeFrom: 'orgName', bindTo: 'orgName' },
      { takeFrom: 'idNo', bindTo: 'idNo' },
      { takeFrom: 'idDate', bindTo: 'idDate' },
      { takeFrom: 'addressIdentity', bindTo: 'addressIdentity' },
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
    /* validators: [
      {
        name: 'required',
        validator: Validators.required,
        errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
      },
    ], */
  };
  positionName: IFormBaseControl = {
    //chức danh
    flexSize: 3,
    controlType: EnumFormBaseContolType.TEXTBOX,
    field: 'positionName',
    label: EnumTranslateKey.UI_COMPONENT_TITLE_INS_INFORMATION_POSITION_NAME,
    type: 'string',
    disabled: true,
    value: '',
    /* validators: [
      {
        name: 'required',
        validator: Validators.required,
        errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
      },
    ], */
  };
  orgName: IFormBaseControl = {
    //phòng ban
    flexSize: 3,
    controlType: EnumFormBaseContolType.TEXTBOX,
    field: 'orgName',
    label: EnumTranslateKey.UI_COMPONENT_TITLE_INS_INFORMATION_ORG_NAME,
    type: 'string',
    disabled: true,
    value: '',
    /* validators: [
      {
        name: 'required',
        validator: Validators.required,
        errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
      },
    ], */
  };
  bhxhNo: IFormBaseControl = {
    flexSize: 3,
    label: EnumTranslateKey.UI_COMPONENT_TITLE_INS_INFORMATION_BHXH_NO,
    field: 'bhxhNo',
    value: '',
    controlType: EnumFormBaseContolType.TEXTBOX,
    type: 'string',
    /* validators: [
      {
        name: 'required',
        validator: Validators.required,
        errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
      },
    ], */
  };
  idNo: IFormBaseControl = {
    flexSize: 3,
    label: EnumTranslateKey.UI_COMPONENT_TITLE_INS_INFORMATION_ID_NO,
    field: 'idNo',
    value: '',
    controlType: EnumFormBaseContolType.TEXTBOX,
    type: 'string',
    disabled: true,
  };
  idDate: IFormBaseControl = {
    flexSize: 3,
    label: EnumTranslateKey.UI_COMPONENT_TITLE_INS_INFORMATION_ID_DATE,
    field: 'idDate',
    value: '',
    disabled: true,
    controlType: EnumFormBaseContolType.DATEPICKER,
    type: 'date',
  };
  addressIdentity: IFormBaseControl = {
    flexSize: 3,
    label: EnumTranslateKey.UI_COMPONENT_TITLE_INS_INFORMATION_ID_PLACE,
    field: 'addressIdentity',
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

  ///them moi thong tin bao hiem
  unitInsuranceTypeId: IFormBaseControl = {
    flexSize: 3,
    label: EnumTranslateKey.UI_COMPONENT_TITLE_INS_CHANGE_UNIT,
    field: 'unitInsuranceTypeId',
    value: '',
    controlType: EnumFormBaseContolType.DROPDOWN,
    getByIdObject$: this.unitInsGetByIdObject$,
    dropdownOptions$: this.unitInsOptions$,
    getByIdApi: this.unitInsGetByIdApi,
    shownFrom: 'unitInsuranceTypeName',
    type: 'number',
    readonly: true,
    validators: [
      {
        name: 'required',
        validator: Validators.required,
        errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
      },
    ],
  };
  changeTypeId: IFormBaseControl = {
    flexSize: 3,
    label: EnumTranslateKey.UI_COMPONENT_TITLE_INS_CHANGE_CHANGE_NAME,
    field: 'changeTypeId',
    value: '',
    controlType: EnumFormBaseContolType.DROPDOWN,
    getByIdObject$: this.insTypeChangeGetByIdObject$,
    dropdownOptions$: this.insTypeChangeOptions$,
    getByIdApi: this.insTypeChangeGetByIdApi,
    shownFrom: 'name',
    type: 'number',
    readonly: false,
    validators: [
      {
        name: 'required',
        validator: Validators.required,
        errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
      },
    ],
  };
  insuranceType: IFormBaseControl = {
    flexSize: 3,
    label: EnumTranslateKey.UI_COMPONENT_TITLE_INS_CHANGE_INS_TYPE,
    field: 'insuranceType',
    value: [1, 2],
    readonly: true,
    disabled: true,
    controlType: EnumFormBaseContolType.CHECKLIST,
    checklistOptions$: this.checklistOptions$,
    getByIdObject$: this.insuranceGetByIdObject$,
    shownFrom: 'text',
    type: 'string',
    validators: [
      {
        name: 'required',
        validator: Validators.required,
        errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
      },
    ],
  };
  //muc dong bhxh cu
  salaryBhxhOld: IFormBaseControl = {
    flexSize: 3,
    label: EnumTranslateKey.UI_COMPONENT_TITLE_INS_CHANGE_SA_BHXH_OLD,
    field: 'salaryBhxhOld',
    value: '',
    controlType: EnumFormBaseContolType.CURRENCY,
    type: 'number',
    readonly: false,
    validators: [
      {
        name: 'required',
        validator: Validators.required,
        errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
      },
    ],
  };
  //muc dong bhyt cu
  salaryBhytOld: IFormBaseControl = {
    flexSize: 3,
    label: EnumTranslateKey.UI_COMPONENT_TITLE_INS_CHANGE_SA_BHYT_OLD,
    field: 'salaryBhytOld',
    value: '',
    controlType: EnumFormBaseContolType.CURRENCY,
    type: 'number',
    readonly: false,
    validators: [
      {
        name: 'required',
        validator: Validators.required,
        errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
      },
    ],
  };
  //muc dong bhbnn cu
  salaryBhbnnOld: IFormBaseControl = {
    flexSize: 3,
    label: EnumTranslateKey.UI_COMPONENT_TITLE_INS_CHANGE_SA_BHBNN_OLD,
    field: 'salaryBhbnnOld',
    value: '',
    controlType: EnumFormBaseContolType.CURRENCY,
    type: 'number',
    readonly: false,
    validators: [
      {
        name: 'required',
        validator: Validators.required,
        errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
      },
    ],
  };
  //muc dong bhtn cu
  salaryBhtnOld: IFormBaseControl = {
    flexSize: 3,
    label: EnumTranslateKey.UI_COMPONENT_TITLE_INS_CHANGE_SA_BHTN_OLD,
    field: 'salaryBhtnOld',
    value: '',
    readonly: false,
    controlType: EnumFormBaseContolType.CURRENCY,
    type: 'number',
    validators: [
      {
        name: 'required',
        validator: Validators.required,
        errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
      },
    ],
  };
  salaryBhxhNew: IFormBaseControl = {
    flexSize: 3,
    label: EnumTranslateKey.UI_COMPONENT_TITLE_INS_CHANGE_SA_BHXH_NEW,
    field: 'salaryBhxhNew',
    value: '',
    controlType: EnumFormBaseContolType.CURRENCY,
    type: 'number',
    readonly: false,
    validators: [
      {
        name: 'required',
        validator: Validators.required,
        errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
      },
    ],
  };
  salaryBhytNew: IFormBaseControl = {
    flexSize: 3,
    label: EnumTranslateKey.UI_COMPONENT_TITLE_INS_CHANGE_SA_BHYT_NEW,
    field: 'salaryBhytNew',
    value: '',
    controlType: EnumFormBaseContolType.CURRENCY,
    type: 'number',
    readonly: false,
    validators: [
      {
        name: 'required',
        validator: Validators.required,
        errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
      },
    ],
  };
  salaryBhbnnNew: IFormBaseControl = {
    flexSize: 3,
    label: EnumTranslateKey.UI_COMPONENT_TITLE_INS_CHANGE_SA_BHBNN_NEW,
    field: 'salaryBhbnnNew',
    value: '',
    controlType: EnumFormBaseContolType.CURRENCY,
    type: 'number',
    readonly: false,
    validators: [
      {
        name: 'required',
        validator: Validators.required,
        errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
      },
    ],
  };
  salaryBhtnNew: IFormBaseControl = {
    flexSize: 3,
    label: EnumTranslateKey.UI_COMPONENT_TITLE_INS_CHANGE_SA_BHTN_NEW,
    field: 'salaryBhtnNew',
    value: '',
    readonly: false,
    controlType: EnumFormBaseContolType.CURRENCY,
    type: 'number',
    validators: [
      {
        name: 'required',
        validator: Validators.required,
        errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
      },
    ],
  };

  effectiveDate: IFormBaseControl = {
    flexSize: 3,
    controlType: EnumFormBaseContolType.DATEPICKER,
    field: 'effectiveDate',
    label: EnumTranslateKey.UI_COMPONENT_TITLE_INS_CHANGE_EFFECTIVE_DATE,
    type: 'date',
    value: '',
    validators: [
      {
        name: 'required',
        validator: Validators.required,
        errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
      },
    ],
  };

  expireDate: IFormBaseControl = {
    flexSize: 3,
    label: EnumTranslateKey.UI_COMPONENT_TITLE_INS_CHANGE_EXPIRE_DATE,
    field: 'expireDate',
    value: '',
    readonly: false,
    controlType: EnumFormBaseContolType.DATEPICKER,
    type: 'date',
  };
  changeMonthString: IFormBaseControl = {
    flexSize: 3,
    label: EnumTranslateKey.UI_COMPONENT_TITLE_INS_CHANGE_MONTH,
    field: 'changeMonthString',
    value: '',
    readonly: false,
    controlType: EnumFormBaseContolType.MONTHSELECTOR,
  };
  declarationPeriodString: IFormBaseControl = {
    flexSize: 3,
    label: EnumTranslateKey.UI_COMPONENT_TITLE_INS_CHANGE_DECLARATION_PERIOD, //dot khai bao
    field: 'declarationPeriodString',
    value: '',
    readonly: false,
    controlType: EnumFormBaseContolType.MONTHSELECTOR,
    validators: [
      {
        name: 'required',
        validator: Validators.required,
        errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
      },
    ],
  };
  bhytReimbursementDate: IFormBaseControl = {
    flexSize: 3,
    label:
      EnumTranslateKey.UI_COMPONENT_TITLE_INS_CHANGE_BHYT_REIMBURSEMENT_DATE,
    field: 'bhytReimbursementDate',
    value: '',
    readonly: false,
    controlType: EnumFormBaseContolType.DATEPICKER,
    type: 'date',
  };
  note: IFormBaseControl = {
    flexSize: 3,
    label: EnumTranslateKey.UI_COMPONENT_TITLE_INS_CHANGE_NOTE,
    field: 'note',
    value: '',
    controlType: EnumFormBaseContolType.TEXTBOX,
    type: 'string',
    readonly: false,
  };

  ///them moi thong tin truy thu
  arrearsFromMonthString: IFormBaseControl = {
    flexSize: 3,
    label: EnumTranslateKey.UI_COMPONENT_TITLE_INS_CHANGE_ARREARS_FROM_MONTH,
    field: 'arrearsFromMonthString',
    value: '',
    controlType: EnumFormBaseContolType.MONTHSELECTOR,
  };
  arrearsToMonthString: IFormBaseControl = {
    flexSize: 3,
    label: EnumTranslateKey.UI_COMPONENT_TITLE_INS_CHANGE_ARREARS_TO_MONTH,
    field: 'arrearsToMonthString',
    value: '',
    controlType: EnumFormBaseContolType.MONTHSELECTOR,
  };
  arBhxhSalaryDifference: IFormBaseControl = {
    flexSize: 3,
    label: EnumTranslateKey.UI_COMPONENT_TITLE_INS_CHANGE_AR_BHXH_SA_DIF,
    field: 'arBhxhSalaryDifference',
    value: '',
    controlType: EnumFormBaseContolType.CURRENCY,
    type: 'number',
    disabled: true,
  };
  arBhytSalaryDifference: IFormBaseControl = {
    flexSize: 3,
    label: EnumTranslateKey.UI_COMPONENT_TITLE_INS_CHANGE_AR_BHYT_SA_DIF,
    field: 'arBhytSalaryDifference',
    value: '',
    controlType: EnumFormBaseContolType.CURRENCY,
    type: 'number',
    disabled: true,
  };
  arBhtnSalaryDifference: IFormBaseControl = {
    flexSize: 3,
    label: EnumTranslateKey.UI_COMPONENT_TITLE_INS_CHANGE_AR_BHTN_SA_DIF,
    field: 'arBhtnSalaryDifference',
    value: '',
    controlType: EnumFormBaseContolType.CURRENCY,
    type: 'number',
    disabled: true,
  };
  arBhtnldBnnSalaryDifference: IFormBaseControl = {
    flexSize: 3,
    label: EnumTranslateKey.UI_COMPONENT_TITLE_INS_CHANGE_AR_BHTNLD_BNN_SA_DIF,
    field: 'arBhtnldBnnSalaryDifference',
    value: '',
    controlType: EnumFormBaseContolType.CURRENCY,
    type: 'number',
    disabled: true,
  };

  ///them moi thong tin thoai thu
  withdrawalFromMonthString: IFormBaseControl = {
    flexSize: 3,
    label: EnumTranslateKey.UI_COMPONENT_TITLE_INS_CHANGE_WITHDRAWAL_FROM_MONTH,
    field: 'withdrawalFromMonthString',
    value: null,
    controlType: EnumFormBaseContolType.MONTHSELECTOR,
  };
  withdrawalToMonthString: IFormBaseControl = {
    flexSize: 3,
    label: EnumTranslateKey.UI_COMPONENT_TITLE_INS_CHANGE_WITHDRAWAL_TO_MONTH,
    field: 'withdrawalToMonthString',
    value: '',
    controlType: EnumFormBaseContolType.MONTHSELECTOR,
  };
  wdBhxhSalaryDifference: IFormBaseControl = {
    flexSize: 3,
    label: EnumTranslateKey.UI_COMPONENT_TITLE_INS_CHANGE_WD_BHXH_SA_DIF,
    field: 'wdBhxhSalaryDifference',
    value: '',
    controlType: EnumFormBaseContolType.CURRENCY,
    type: 'number',
    disabled: true,
  };
  wdBhytSalaryDifference: IFormBaseControl = {
    flexSize: 3,
    label: EnumTranslateKey.UI_COMPONENT_TITLE_INS_CHANGE_WD_BHYT_SA_DIF,
    field: 'wdBhytSalaryDifference',
    value: '',
    controlType: EnumFormBaseContolType.CURRENCY,
    type: 'number',
    disabled: true,
  };
  wdBhtnSalaryDifference: IFormBaseControl = {
    flexSize: 3,
    label: EnumTranslateKey.UI_COMPONENT_TITLE_INS_CHANGE_WD_BHTN_SA_DIF,
    field: 'wdBhtnSalaryDifference',
    value: '',
    controlType: EnumFormBaseContolType.CURRENCY,
    type: 'number',
    disabled: true,
  };
  wdBhtnldBnnSalaryDifference: IFormBaseControl = {
    flexSize: 3,
    label: EnumTranslateKey.UI_COMPONENT_TITLE_INS_CHANGE_WD_BHTNLD_BNN_SA_DIF,
    field: 'wdBhtnldBnnSalaryDifference',
    value: '',
    controlType: EnumFormBaseContolType.CURRENCY,
    type: 'number',
    disabled: true,
  };

  id!: number;

  constructor(
    public override dialogService: DialogService,
    private insChangeEditService: InsChangeEditService,
    private mls: MultiLanguageService,
    private alertService: AlertService,
    private fb: FormBuilder,
    private appService: AppService,
    private router: Router,
    private route: ActivatedRoute,
    private routingService: RoutingService,
    private authService: AuthService
  ) {
    super(dialogService);
    if (this.router.getCurrentNavigation()?.extras?.state) {
      this.selectedData = this.router.getCurrentNavigation()?.extras.state!['selectedData'];
    }
    this.sectors = this.insChangeEditService.sectors;
    this.captionCode = EnumTranslateKey.UI_COMPONENT_TITLE_INS_CHANGE;
    this.id = Number(atob(this.route.snapshot.params['id']));
  }

  createForm() {
    this.form = this.fb.group({
      id: [null],
      orgId: [null],
      employeeId: [null, [Validators.required]],
      employeeName: [{ value: null, disabled: true }],
      orgName: [{ value: null, disabled: true }],
      positionName: [{ value: null, disabled: true }],
      bhxhNo: [{ value: null, disabled: true }],
      idNo: [{ value: null, disabled: true }],
      idDate: [{ value: null, disabled: true }],
      addressIdentity: [{ value: null, disabled: true }],
      birthDate: [{ value: null, disabled: true }],
      birthPlace: [{ value: null, disabled: true }],

      unitInsuranceTypeId: [null, [Validators.required]],
      unitInsuranceTypeName: [null],
      insuranceType: [null, [Validators.required]],
      changeTypeId: [null, [Validators.required]],
      changeTypeName: [null],
      salaryBhxhOld: [null, [Validators.required]],
      salaryBhytOld: [null, [Validators.required]],
      salaryBhbnnOld: [null, [Validators.required]],
      salaryBhtnOld: [null, [Validators.required]],
      salaryBhxhNew: [null, [Validators.required]],
      salaryBhytNew: [null, [Validators.required]],
      salaryBhbnnNew: [null, [Validators.required]],
      salaryBhtnNew: [null, [Validators.required]],
      effectiveDate: [
        null,
        [Validators.required, InsChangeEditComponent.effectiveDate],
      ],
      expireDate: [null, InsChangeEditComponent.expireDate],
      changeMonthString: [null],
      declarationPeriodString: [null, [Validators.required]],
      bhytReimbursementDate: [null],
      note: [null],

      arrearsFromMonthString: [
        null,
        InsChangeEditComponent.checkFromArrearsMonth,
      ],
      arrearsToMonthString: [null, InsChangeEditComponent.checkToArrearsMonth],
      arBhxhSalaryDifference: [{ value: 0, disabled: false }],
      arBhytSalaryDifference: [{ value: 0, disabled: false }],
      arBhtnSalaryDifference: [{ value: 0, disabled: false }],
      arBhtnldBnnSalaryDifference: [{ value: 0, disabled: false }],

      withdrawalFromMonthString: [
        null,
        InsChangeEditComponent.checkFromWithdrawalMonth,
      ],
      withdrawalToMonthString: [
        null,
        InsChangeEditComponent.checkToWithdrawalMonth,
      ],
      wdBhxhSalaryDifference: [{ value: 0, disabled: false }],
      wdBhytSalaryDifference: [{ value: 0, disabled: false }],
      wdBhtnSalaryDifference: [{ value: 0, disabled: false }],
      wdBhtnldBnnSalaryDifference: [{ value: 0, disabled: false }],
    });

    this.insChangeEditService
      .getInsTypeChange()
      .pipe(
        map((x: any) => {
          if (x.ok && x.status === 200) {
            const options: { value: number; text: string; code: string }[] =
              [];
            x.body.innerBody.map((g: any) => {
              options.push({
                value: g.changeTypeId,
                text: g.changeTypeName,
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
        this.insTypeChangeOptions$.next(response);
        this.loading = false;
      });

    if (!!this.id) {
      this.form.get('id')?.setValue(this.id);
      this.subscriptions.push(
        this.appService
          .get(api.INS_CHANGE_GET_BY_ID + this.id.toString())
          .subscribe((x: any) => {
            if (x.ok && x.status == 200) {
              let resObj = x.body.innerBody;
              this.form.patchValue(resObj);
              this.formInitStringValue = JSON.stringify(
                this.form.getRawValue()
              );
              let objSign = {
                value: resObj.employeeId,
                code: resObj.employeeCode,
              };
              this.realChangeValue = resObj.changeTypeName;
              this.employeeGetByIdObject$.next(objSign);
            }
          })
      );
    }

    if (this.id == 0) {
      this.subscriptions.push(
        // employee Infor
        this.form
          .get('employeeId')
          ?.valueChanges.pipe(distinctUntilChanged())
          .subscribe((x) => {
            if (!!x) {
              this.insChangeEditService
                .getInforById(x)
                .pipe(
                  map((f: any) => {
                    let options: any;
                    options = f.body.innerBody;
                    return options;
                  })
                )
                .subscribe((response: any) => {
                  this.form.get('bhxhNo')?.setValue(response.bhxhNo);
                });

              //get Type BH
              this.insChangeEditService
                .GetLstInsCheck(x)
                .pipe(
                  map((x: any) => {
                    if (x.ok && x.status === 200) {
                      return x.body.innerBody.insuranceType;
                    } else {
                      return [];
                    }
                  })
                )
                .subscribe((response) => {
                  this.form.get('insuranceType')?.setValue(response);
                  console.log(response);
                  this.loading = false;
                });

              this.insChangeEditService
                .GetUnit(x)
                .pipe(
                  map((x: any) => {
                    if (x.ok && x.status === 200) {
                      return x.body.innerBody.id;
                    } else {
                      return [];
                    }
                  })
                )
                .subscribe((response) => {
                  this.form.get('unitInsuranceTypeId')?.setValue(response);
                  console.log(response);
                  this.loading = false;
                });
            }
          })!
      );
    }

    this.subscriptions.push(
      this.form.get('changeTypeId')?.valueChanges.pipe(distinctUntilChanged()).subscribe((x) => {
        let checkTm = this.insTypeChangeOptions$.value.filter((e: { value: any; }) => e.value === x)[0];
        //check trung loai bien dong
        if (this.realChangeValue !== null && this.realChangeValue !== undefined) {
          if ((this.listTruyThu.includes(this.realChangeValue) && this.listTruyThu.includes(checkTm.code)) ||
            (this.listThoaiThu.includes(this.realChangeValue) && this.listThoaiThu.includes(checkTm.code))) {
          } else {
            this.realChangeValue = checkTm.code;
            this.disableControl(checkTm);
          }
        } else {
          this.disableControl(checkTm);
        }
      })!,

      this.form.get('salaryBhxhOld')?.valueChanges.pipe(debounceTime(500), distinctUntilChanged())
        .pipe(
          filter((_) => {
            const touched = this.form.get('salaryBhxhOld')?.touched;
            return !!touched;
          }),
        ).subscribe((x) => {
          if (!!x) this.calculatorByMonth2();
        })!,
      this.form.get('salaryBhytOld')?.valueChanges.pipe(debounceTime(500), distinctUntilChanged())
        .pipe(
          filter((_) => {
            const touched = this.form.get('salaryBhytOld')?.touched;
            return !!touched;
          }),
        ).subscribe((x) => {
          if (!!x) this.calculatorByMonth2();
        })!,
      this.form.get('salaryBhtnOld')?.valueChanges.pipe(debounceTime(500), distinctUntilChanged())
        .pipe(
          filter((_) => {
            const touched = this.form.get('salaryBhtnOld')?.touched;
            return !!touched;
          }),
        ).subscribe((x) => {
          if (!!x) this.calculatorByMonth2();
        })!,
      this.form.get('salaryBhbnnOld')?.valueChanges.pipe(debounceTime(500), distinctUntilChanged())
        .pipe(
          filter((_) => {
            const touched = this.form.get('salaryBhbnnOld')?.touched;
            return !!touched;
          }),
        ).subscribe((x) => {
          if (!!x) this.calculatorByMonth2();
        })!,
      this.form.get('salaryBhxhNew')?.valueChanges.pipe(debounceTime(500), distinctUntilChanged())
        .pipe(
          filter((_) => {
            const touched = this.form.get('salaryBhxhNew')?.touched;
            return !!touched;
          }),
        ).subscribe((x) => {
          if (!!x) this.calculatorByMonth();
        })!,
      this.form.get('salaryBhytNew')?.valueChanges.pipe(debounceTime(500), distinctUntilChanged())
        .pipe(
          filter((_) => {
            const touched = this.form.get('salaryBhytNew')?.touched;
            return !!touched;
          }),
        ).subscribe((x) => {
          if (!!x) this.calculatorByMonth();
        })!,
      this.form.get('salaryBhtnNew')?.valueChanges.pipe(debounceTime(500), distinctUntilChanged())
        .pipe(
          filter((_) => {
            const touched = this.form.get('salaryBhtnNew')?.touched;
            return !!touched;
          }),
        ).subscribe((x) => {
          if (!!x) this.calculatorByMonth();
        })!,
      this.form.get('salaryBhbnnNew')?.valueChanges.pipe(debounceTime(500), distinctUntilChanged())
        .pipe(
          filter((_) => {
            const touched = this.form.get('salaryBhbnnNew')?.touched;
            return !!touched;
          }),
        ).subscribe((x) => {
          if (!!x) this.calculatorByMonth();
        })!,

      this.form.get('effectiveDate')?.valueChanges.pipe(distinctUntilChanged()).subscribe((x) => {
        // this.getDayCalculator();
      })!,

      this.form.get('changeMonthString')?.valueChanges.pipe(distinctUntilChanged())
        .subscribe((x) => {
          if (!!x) {
            var e = new Date(x);
            let m = this.insTypeChangeOptions$.value.filter((p: { value: any; }) => p.value === this.form.get('changeTypeId')?.value)[0];
            this.disableFull();
            if (this.form.get('changeMonthString')?.value <= this.form.get('declarationPeriodString')?.value) {
              if (this.listTruyThu.includes(m.code) && this.form.get('changeMonthString')?.value !== this.form.get('declarationPeriodString')?.value) {
                this.form.get('arrearsFromMonthString')?.setValue(`${e.getFullYear()}-${e.getMonth() < 9 ? '0' + (e.getMonth() + 1) : e.getMonth() + 1}`);
              }
              else if (this.listThoaiThu.includes(m.code) && this.form.get('changeMonthString')?.value !== this.form.get('declarationPeriodString')?.value) {
                this.form.get('withdrawalFromMonthString')?.setValue(`${e.getFullYear()}-${e.getMonth() < 9 ? '0' + (e.getMonth() + 1) : e.getMonth() + 1}`);
              }
              else {
                this.form.get('arrearsFromToString')?.setValue(null);
                this.form.get('withdrawalFromMonthString')?.setValue(null);
              }
            }
          }
        })!,

      this.form.get('declarationPeriodString')?.valueChanges.pipe(distinctUntilChanged())
        .subscribe((x) => {
          if (!!x) {
            var e = new Date(x);
            let m = this.insTypeChangeOptions$.value.filter((p: { value: any; }) => p.value === this.form.get('changeTypeId')?.value)[0];
            let mx = (e.getMonth() === 0) ? (`${e.getFullYear() - 1}-12`) : (`${e.getFullYear()}-${e.getMonth() < 10 ? '0' + e.getMonth() : e.getMonth()}`);
            this.disableFull();
            if (this.form.get('changeMonthString')?.value <= this.form.get('declarationPeriodString')?.value) {
              if (this.listTruyThu.includes(m.code) && this.form.get('changeMonthString')?.value != this.form.get('declarationPeriodString')?.value) {
                this.form.get('arrearsToMonthString')?.setValue(mx);
              }
              else if (this.listThoaiThu.includes(m.code) && this.form.get('changeMonthString')?.value != this.form.get('declarationPeriodString')?.value) {
                this.form.get('withdrawalToMonthString')?.setValue(mx);
              }
              else {
                this.form.get('arrearsToMonthString')?.setValue(null);
                this.form.get('withdrawalToMonthString')?.setValue(null);
              }
            } else {
              this.form.get('arrearsToMonthString')?.setValue(null);
              this.form.get('withdrawalToMonthString')?.setValue(null);
            }
          }
        })!,
      this.form.get('arrearsFromMonthString')?.valueChanges.pipe(distinctUntilChanged())
        .subscribe((x) => {
          if (!!x) this.calculatorByMonth();
        })!,
      this.form.get('arrearsToMonthString')?.valueChanges.pipe(distinctUntilChanged())
        .subscribe((x) => {
          if (!!x) this.calculatorByMonth();
        })!,
      this.form.get('withdrawalFromMonthString')?.valueChanges.pipe(distinctUntilChanged())
        .subscribe((x) => {
          if (!!x) this.calculatorByMonth2();
        })!,
      this.form.get('withdrawalToMonthString')?.valueChanges.pipe(distinctUntilChanged())
        .subscribe((x) => {
          if (!!x) this.calculatorByMonth2();
        })!
    );
  }
  disableControlFirstTime(e: any) {
    if (this.listTruyThu.includes(e.code)) {
      //khoa dong thoai thuy
      this.disableThoaiThu()
    }
    else if (this.listThoaiThu.includes(e.code)) {
      //khoa dong thoai thuy
      this.disableTruyThu()
    }
    else {
      this.form.get('salaryBhxhBhytOld')?.enable();
      this.form.get('salaryBhtnOld')?.enable();
      this.form.get('salaryBhxhBhytNew')?.enable();
      this.form.get('salaryBhtnNew')?.enable();
    }
  }
  disableControl(e: any) {
    var cm = this.form.get('changeMonthString')?.value;
    var cd = this.form.get('declarationPeriodString')?.value;
    if (cm !== null && cd !== null) {
      if (new Date(cm) >= new Date(cd)) {
        this.disableFull();
        return;
      }
    }
    if (this.listTruyThu.includes(e.code)) {
      this.form.get('salaryBhxhOld')?.disable();
      this.form.get('salaryBhytOld')?.disable();
      this.form.get('salaryBhtnOld')?.disable();
      this.form.get('salaryBhbnnOld')?.disable();
      this.form.get('salaryBhxhOld')?.setValue(0);
      this.form.get('salaryBhtnOld')?.setValue(0);
      this.form.get('salaryBhtnOld')?.setValue(0);
      this.form.get('salaryBhbnnOld')?.setValue(0);
      this.form.get('salaryBhxhNew')?.enable();
      this.form.get('salaryBhytNew')?.enable();
      this.form.get('salaryBhtnNew')?.enable();
      this.form.get('salaryBhbnnNew')?.enable();
      //mo dong truy thuy
      this.form.get('arrearsToMonthString')?.enable();
      this.form.get('arrearsFromMonthString')?.enable();
      this.form.get('arBhxhSalaryDifference')?.enable();
      this.form.get('arBhytSalaryDifference')?.enable();
      this.form.get('arBhtnSalaryDifference')?.enable();
      this.form.get('arBhtnldBnnSalaryDifference')?.enable();
      if (cm !== null) {
        var z = new Date(cm);
        let mx = (z.getMonth() === 0) ? (`${z.getFullYear() - 1}-12`) : (`${z.getFullYear()}-${z.getMonth() < 10 ? '0' + (z.getMonth() + 1) : z.getMonth() + 1}`);
        this.form.get('arrearsFromMonthString')?.setValue(cm);
      }
      if (cd !== null) {
        var z = new Date(cd);
        let mx = (z.getMonth() === 0) ? (`${z.getFullYear() - 1}-12`) : (`${z.getFullYear()}-${z.getMonth() < 10 ? '0' + z.getMonth() : z.getMonth()}`);
        this.form.get('arrearsToMonthString')?.setValue(mx);
      }
      //khoa dong thoai thuy
      this.disableThoaiThu()
    }
    else if (this.listThoaiThu.includes(e.code)) {
      this.form.get('salaryBhxhOld')?.enable();
      this.form.get('salaryBhytOld')?.enable();
      this.form.get('salaryBhtnOld')?.enable();
      this.form.get('salaryBhbnnOld')?.enable();
      this.form.get('salaryBhxhNew')?.disable();
      this.form.get('salaryBhytNew')?.disable();
      this.form.get('salaryBhtnNew')?.disable();
      this.form.get('salaryBhbnnNew')?.disable();
      this.form.get('salaryBhxhNew')?.setValue(0);
      this.form.get('salaryBhytNew')?.setValue(0);
      this.form.get('salaryBhtnNew')?.setValue(0);
      this.form.get('salaryBhbnnNew')?.setValue(0);
      //mo dong thoai thuy
      this.form.get('wdBhxhSalaryDifference')?.enable();
      this.form.get('wdBhytSalaryDifference')?.enable();
      this.form.get('wdBhtnSalaryDifference')?.enable();
      this.form.get('wdBhtnldBnnSalaryDifference')?.enable();
      this.form.get('withdrawalFromMonthString')?.enable();
      this.form.get('withdrawalToMonthString')?.enable();
      if (cm !== null) {
        var z = new Date(cm);
        let mx = (z.getMonth() === 0) ? (`${z.getFullYear() - 1}-12`) : (`${z.getFullYear()}-${z.getMonth() < 10 ? '0' + (z.getMonth() + 1) : z.getMonth() + 1}`);
        this.form.get('withdrawalFromMonthString')?.setValue(cm);
      }
      if (cd !== null) {
        var z = new Date(cd);
        let mx = (z.getMonth() === 0) ? (`${z.getFullYear() - 1}-12`) : (`${z.getFullYear()}-${z.getMonth() < 10 ? '0' + z.getMonth() : z.getMonth()}`);
        this.form.get('withdrawalToMonthString')?.setValue(mx);
      }
      //khoa dong truy thuy
      this.disableTruyThu()

    }
    else {
      this.form.get('salaryBhxhOld')?.enable();
      this.form.get('salaryBhytOld')?.enable();
      this.form.get('salaryBhbnnOld')?.enable();
      this.form.get('salaryBhtnOld')?.enable();
      //gan lai gia tri
      this.form.get('salaryBhxhOld')?.setValue(0);
      this.form.get('salaryBhytOld')?.setValue(0);
      this.form.get('salaryBhtnOld')?.setValue(0);
      this.form.get('salaryBhbnnOld')?.setValue(0);
      this.form.get('salaryBhxhNew')?.enable();
      this.form.get('salaryBhytNew')?.enable();
      this.form.get('salaryBhbnnNew')?.enable();
      this.form.get('salaryBhtnNew')?.enable();
      this.disableTruyThu()
      //khoa dong thoai thuy
      this.disableThoaiThu()
      this.form.get('arBhxhSalaryDifference')?.setValue(0);
      this.form.get('arBhytSalaryDifference')?.setValue(0);
      this.form.get('arBhtnSalaryDifference')?.setValue(0);
      this.form.get('arBhtnldBnnSalaryDifference')?.setValue(0);
      this.form.get('wdBhxhSalaryDifference')?.setValue(0);
      this.form.get('wdBhytSalaryDifference')?.setValue(0);
      this.form.get('wdBhtnSalaryDifference')?.setValue(0);
      this.form.get('wdBhtnldBnnSalaryDifference')?.setValue(0);
      this.form.get('withdrawalToMonthString')?.setValue(null);
      this.form.get('withdrawalFromMonthString')?.setValue(null);
      this.form.get('arrearsFromMonthString')?.setValue(null);
      this.form.get('arrearsToMonthString')?.setValue(null);
    }
  }
  disableFull() {
    if (!!this.form.get('changeMonthString')?.value && !!this.form.get('declarationPeriodString')?.value) {
      if (this.form.get('changeMonthString')?.value >= this.form.get('declarationPeriodString')?.value) {
        //khoa dong truy thuy
        this.disableTruyThu()
        //khoa dong thoai thuy
        this.disableThoaiThu()
      } else {
        let m = this.insTypeChangeOptions$.value.filter((p: { value: any; }) => p.value === this.form.get('changeTypeId')?.value)[0];
        if (m == undefined) {
          m = this.insTypeChangeOptions$.value.filter((p: { value: any; code: any; }) => p.code === 'TD')[0];
        }
        this.disableControl(m);
      }
    }
  }
  disableThoaiThu() {
    //khoa dong thoai thuy
    this.form.get('wdBhxhSalaryDifference')?.disable();
    this.form.get('wdBhytSalaryDifference')?.disable();
    this.form.get('wdBhtnSalaryDifference')?.disable();
    this.form.get('wdBhtnldBnnSalaryDifference')?.disable();
    this.form.get('withdrawalFromMonthString')?.disable();
    this.form.get('withdrawalToMonthString')?.disable();
    this.form.get('withdrawalFromMonthString')?.setValue(null);
    this.form.get('withdrawalToMonthString')?.setValue(null);
    this.form.get('wdBhxhSalaryDifference')?.setValue(null);
    this.form.get('wdBhytSalaryDifference')?.setValue(null);
    this.form.get('wdBhtnSalaryDifference')?.setValue(null);
    this.form.get('wdBhtnldBnnSalaryDifference')?.setValue(null);
  }

  disableTruyThu() {
    //khoa dong truy thuy
    this.form.get('arrearsToMonthString')?.disable();
    this.form.get('arrearsFromMonthString')?.disable();
    this.form.get('arBhxhSalaryDifference')?.disable();
    this.form.get('arBhytSalaryDifference')?.disable();
    this.form.get('arBhtnSalaryDifference')?.disable();
    this.form.get('arBhtnldBnnSalaryDifference')?.disable();
    this.form.get('arBhxhSalaryDifference')?.setValue(null);
    this.form.get('arBhytSalaryDifference')?.setValue(null);
    this.form.get('arBhtnSalaryDifference')?.setValue(null);
    this.form.get('arBhtnldBnnSalaryDifference')?.setValue(null);
    this.form.get('arrearsToMonthString')?.setValue(null);
    this.form.get('arrearsFromMonthString')?.setValue(null);
  }
  async calculatorByMonth() {
    let x2 = this.form.get('arrearsToMonthString')?.value === null || this.form.get('arrearsToMonthString')?.value === '';
    let x1 = this.form.get('arrearsFromMonthString')?.value === null || this.form.get('arrearsFromMonthString')?.value === '';
    let x3 = this.form.get('changeTypeId')?.value;
    if (x1 || x2 || x3 === null) {
      return;
    }
    await this.truythuBhxh();
    await this.truythuBhyt();
    await this.truythuBhtn();
    await this.truythuBhbnn();
  }
  async truythuBhxh() {
    this.appService.post(api.INS_CHANGE_MANUAL_GET, this.form.getRawValue()).subscribe(response => {
      if (response.ok && response.status === 200) {
        const body = response.body;
        if (body.statusCode == 200) {
          this.form.get('arBhxhSalaryDifference')?.setValue(body.innerBody.trxh);
        }
      }
    });
  }
  async truythuBhyt() {
    this.appService.post(api.INS_CHANGE_MANUAL_GET, this.form.getRawValue()).subscribe(response => {
      if (response.ok && response.status === 200) {
        const body = response.body;
        if (body.statusCode == 200) {
          this.form.get('arBhytSalaryDifference')?.setValue(body.innerBody.tryt);
        }
      }
    });
  }
  async truythuBhbnn() {
    this.appService.post(api.INS_CHANGE_MANUAL_GET, this.form.getRawValue()).subscribe(response => {
      if (response.ok && response.status === 200) {
        const body = response.body;
        if (body.statusCode == 200) {
          this.form.get('arBhtnSalaryDifference')?.setValue(body.innerBody.trtn);
        }
      }
    });
  }
  async truythuBhtn() {
    this.appService.post(api.INS_CHANGE_MANUAL_GET, this.form.getRawValue()).subscribe(response => {
      if (response.ok && response.status === 200) {
        const body = response.body;
        if (body.statusCode == 200) {
          this.form.get('arBhtnldBnnSalaryDifference')?.setValue(body.innerBody.trbnn);
        }
      }
    });
  }


  async calculatorByMonth2() {
    let x1 = this.form.get('withdrawalFromMonthString')?.value === null || this.form.get('withdrawalFromMonthString')?.value === '';
    let x2 = this.form.get('withdrawalToMonthString')?.value === null || this.form.get('withdrawalToMonthString')?.value === '';
    let x3 = this.form.get('changeTypeId')?.value;
    if (x1 || x2 || x3 === null) {
      return;
    }
    await this.thoaithuBhxh();
    await this.thoaithuBhyt();
    await this.thoaithuBhtn();
    await this.thoaithuBhbnn();
  }
  async thoaithuBhxh() {
    this.appService.post(api.INS_CHANGE_MANUAL_GET2, this.form.getRawValue()).subscribe(response => {
      if (response.ok && response.status === 200) {
        const body = response.body;
        if (body.statusCode == 200) {
          this.form.get('wdBhxhSalaryDifference')?.setValue(body.innerBody.ttxh);
        }
      }
    });
  }
  async thoaithuBhyt() {
    this.appService.post(api.INS_CHANGE_MANUAL_GET2, this.form.getRawValue()).subscribe(response => {
      if (response.ok && response.status === 200) {
        const body = response.body;
        if (body.statusCode == 200) {
          this.form.get('wdBhytSalaryDifference')?.setValue(body.innerBody.ttyt);
        }
      }
    });
  }
  async thoaithuBhtn() {
    this.appService.post(api.INS_CHANGE_MANUAL_GET2, this.form.getRawValue()).subscribe(response => {
      if (response.ok && response.status === 200) {
        const body = response.body;
        if (body.statusCode == 200) {
          this.form.get('wdBhtnSalaryDifference')?.setValue(body.innerBody.tttn);
        }
      }
    });
  }
  async thoaithuBhbnn() {
    this.appService.post(api.INS_CHANGE_MANUAL_GET2, this.form.getRawValue()).subscribe(response => {
      if (response.ok && response.status === 200) {
        const body = response.body;
        if (body.statusCode == 200) {
          this.form.get('wdBhtnldBnnSalaryDifference')?.setValue(body.innerBody.ttbnn);
        }
      }
    });
  }
  ngOnInit(): void {
    this.createForm();
    this.subscriptions.push(this.mls.lang$.subscribe((x) => (this.lang = x)));
    if (!!this.selectedData) {
      this.subscriptions.push(
        this.appService
          .get(api.INS_CHANGE_GET_BY_ID + this.selectedData[0].id.toString())
          .subscribe((x: any) => {
            if (x.ok && x.status == 200) {
              let resObj = x.body.innerBody;
              this.form.patchValue(resObj);
              this.formInitStringValue = JSON.stringify(
                this.form.getRawValue()
              );
              let objSign = {
                value: resObj.employeeId,
                code: resObj.employeeCode,
              };
              this.employeeGetByIdObject$.next(objSign);
              this.form.get('id')?.setValue(0);
              this.form.get('effectiveDate')?.setValue(null);
            }
          })
      );
    }
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.loading = true;
      this.insChangeEditService
        .getOtherListType()
        .pipe(
          map((x: any) => {
            if (x.ok && x.status === 200) {
              const options: { value: number; text: string }[] = [];
              x.body.innerBody.map((g: any) => {
                options.push({
                  value: g.unitInsuranceTypeId,
                  text: g.unitInsuranceTypeName,
                });
              });
              return options;
            } else {
              return [];
            }
          })
        )
        .subscribe((response) => {
          this.unitInsOptions$.next(response);
          this.loading = false;
        });


    });
    setTimeout(() => {
      if (!!this.selectedData) {
        this.subscriptions.push(
          this.appService
            .get(api.INS_CHANGE_GET_BY_ID + this.selectedData[0].id.toString())
            .subscribe((x: any) => {
              if (x.ok && x.status == 200) {
                let resObj = x.body.innerBody;
                this.form.patchValue(resObj);
                this.formInitStringValue = JSON.stringify(
                  this.form.getRawValue()
                );
                let objSign = {
                  value: resObj.employeeId,
                  code: resObj.employeeCode,
                };
                this.employeeGetByIdObject$.next(objSign);
                this.form.get('id')?.setValue(0);
                this.form.get('effectiveDate')?.setValue(null);
              }
            })
        );
      }
    }, 100)


    // let e = this.insTypeChangeOptions$.value.filter((p: { value: any; })=> p.value === this.form.get('changeTypeId')?.value)[0];
    // this.disableControlFirstTime(e);
  }

  onCancelLocal() {
    this.checkError$.next(true);
    this.router.navigateByUrl('/cms/insurance/business/inschange');
  }
  onButtonClick(e: ICoreButtonVNS): void {
    if (e.code == EnumCoreButtonVNSCode.NONE_HEADER_CANCEL) {
      this.onCancelLocal();
    }
    if (e.code == EnumCoreButtonVNSCode.NONE_HEADER_SAVE) {
      this.onFormSubmit();
      //this.router.navigateByUrl('/cms/insurance/business/inschange');
    }
    this.buttonClick.emit(e);
  }
  onAccordionItemClick(e: ICoreAccordionItem): void { }

  onAccordionItemClickEdit(e: ICoreAccordionItem): void { }

  onFormSubmit() {
    let url: string;
    this.checkError$.next(true);
    const request = this.form.getRawValue();
    const c = document.querySelectorAll('.sector-content.open');
    for (let i = 0; i < c.length; i++) {
      var x = c[i] as HTMLElement;
      x.style.height = 'auto';
    }
    this.sectors.forEach((x) => {
      x.open = true;
    });
    if (!!this.form.valid) {
      const actualFormDeclaredFields: any[] = [];
      Object.keys(this.form.controls).forEach((c) => {
        actualFormDeclaredFields.push(c);
      });
      actualFormDeclaredFields.push('changeMonth');
      actualFormDeclaredFields.push('declarationPeriod');
      actualFormDeclaredFields.push('withdrawalFromMonth');
      actualFormDeclaredFields.push('withdrawalToMonth');
      actualFormDeclaredFields.push('arrearsFromMonth');
      actualFormDeclaredFields.push('arrearsToMonth');
      let sysActionCode = '';

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
      if (!!this.id) {
        url = api.INS_CHANGE_UPDATE;
      } else {
        url = api.INS_CHANGE_CREATE;
      }
      this.appService.post(url, mixRequest).subscribe((response) => {
        if (response.ok == true && response.status == 200) {
          const body: IFormatedResponse = response.body;
          if (body.statusCode === 200) {
            this.formInitStringValue = JSON.stringify(this.form.getRawValue());
            this.router.navigateByUrl('/cms/insurance/business/inschange');
          }
        } else {
          this.alertService.error(
            `${this.mls.trans(response.messageCode)}`,
            this.alertOptions
          );
        }
      });
    } else {
    }
  }

  protected static effectiveDate(date: AbstractControl): any | null {
    let valid = true;
    let errorMessage = '';
    const effectiveDate = date.value;
    const expireDate = date.parent?.get('expireDate')?.value;
    if (expireDate != '' && expireDate != null && effectiveDate != null) {
      if (effectiveDate > new Date(expireDate)) {
        valid = false;
        errorMessage =
          EnumTranslateKey.UI_FORM_CONTROL_WAGE_ERROR_EFFECTDATE_GREAT_THAN_EXPIREDATE;
        return CustomValidators.core(
          'effectiveDate',
          false,
          errorMessage
        )(date);
      } else {
        date.parent?.get('effectiveDate')?.setErrors(null);
        date.parent?.get('expireDate')?.setErrors(null);
      }
    }
  }

  protected static expireDate(date: AbstractControl): any | null {
    let valid = true;
    let errorMessage = '';
    const effectiveDate = date.parent?.get('effectiveDate')?.value;
    const expireDate = date.value;
    if (expireDate != '' && expireDate != null) {
      if (
        effectiveDate != '' &&
        effectiveDate != null &&
        expireDate < new Date(effectiveDate)
      ) {
        valid = false;
        errorMessage =
          EnumTranslateKey.UI_FORM_CONTROL_WAGE_ERROR_EXPIREDATE_LESS_THAN_EFFECTDATE;
        return CustomValidators.core('expireDate', false, errorMessage)(date);
      } else {
        date.parent?.get('effectiveDate')?.setErrors(null);
        date.parent?.get('expireDate')?.setErrors(null);
      }
    } else {
      // date.parent?.get("effectiveDate")?.setErrors(null);
      date.parent?.get('expireDate')?.setErrors(null);
    }
  }
  getDayCalculator() {
    if (
      this.form.get('effectiveDate')?.value != null &&
      this.form.get('changeMonthString')?.value != null &&
      this.form.get('declarationPeriodString')?.value != null
    ) {
      //get accumulateDay
      if (
        this.form.get('employeeId')?.value != null &&
        this.form.get('employeeId')?.value != ''
      ) {
        const request = this.form.getRawValue();

        this.appService
          .post(api.INS_CHANGE_MANUAL_LOAD, request)
          .subscribe((res) => {
            if (res.ok && res.status == 200) {
              const body = res.body;
              if (body.statusCode === 200) {
                const innerBody = body.innerBody;
                //TRUY THU
                this.form.get('arrearsFromMonthString')?.setValue(innerBody.aFrom);
                this.form.get('arrearsToMonthString')?.setValue(innerBody.aTo);
                this.form.get('arBhxhSalaryDifference')?.setValue(innerBody.aSi);
                this.form.get('arBhytSalaryDifference')?.setValue(innerBody.aHi);
                this.form.get('arBhtnSalaryDifference')?.setValue(innerBody.aUi);
                this.form.get('arBhtnldBnnSalaryDifference')?.setValue(innerBody.aBhtnld);

                //THOAI THU
                this.form.get('withdrawalFromMonthString')?.setValue(innerBody.rFrom);

                this.form.get('withdrawalToMonthString')?.setValue(innerBody.rTo);

                this.form.get('wdBhxhSalaryDifference')?.setValue(innerBody.rSi);

                this.form.get('wdBhytSalaryDifference')?.setValue(innerBody.rHi);

                this.form.get('wdBhtnSalaryDifference')?.setValue(innerBody.rUi);

                this.form.get('wdBhtnldBnnSalaryDifference')?.setValue(innerBody.rBhtnld);
              }
            }
          });
      }
    } // else this.form.get('dayCalculator')?.setValue(null);
  }
  getDayCalculator2(isTruythu: number) {
    if (
      this.form.get('effectiveDate')?.value != null &&
      this.form.get('changeMonthString')?.value != null &&
      this.form.get('declarationPeriodString')?.value != null
    ) {
      //get accumulateDay
      if (
        this.form.get('employeeId')?.value != null &&
        this.form.get('employeeId')?.value != ''
      ) {
        const request = this.form.getRawValue();
        request.IsTruyThu = isTruythu;
        this.appService
          .post(api.INS_CHANGE_MANUAL_LOAD2, request)
          .subscribe((res) => {
            if (res.ok && res.status == 200) {
              const body = res.body;
              if (body.statusCode === 200) {
                const innerBody = body.innerBody;
                //TRUY THU
                this.form.get('arBhxhSalaryDifference')?.setValue(innerBody.aSi);
                this.form.get('arBhytSalaryDifference')?.setValue(innerBody.aHi);
                this.form.get('arBhtnSalaryDifference')?.setValue(innerBody.aUi);
                this.form.get('arBhtnldBnnSalaryDifference')?.setValue(innerBody.aBhtnld);

                //THOAI THU
                this.form.get('wdBhxhSalaryDifference')?.setValue(innerBody.rSi);
                this.form.get('wdBhytSalaryDifference')?.setValue(innerBody.rHi);
                this.form.get('wdBhtnSalaryDifference')?.setValue(innerBody.rUi);
                this.form.get('wdBhtnldBnnSalaryDifference')?.setValue(innerBody.rBhtnld);
              }
            }
          });
      }
    } // else this.form.get('dayCalculator')?.setValue(null);
  }

  protected static checkFromArrearsMonth(date: AbstractControl): any | null {
    let valid = true;
    let errorMessage = '';
    const arrearsFromMonthString = date.value;
    const arrearsToMonth = date.parent?.get('arrearsToMonthString')?.value;
    if (
      arrearsToMonth != '' &&
      arrearsToMonth != null &&
      arrearsFromMonthString != null
    ) {
      if (arrearsFromMonthString > arrearsToMonth) {
        valid = false;
        errorMessage =
          EnumTranslateKey.UI_FORM_CONTROL_WAGE_ERROR_EFFECTDATE_GREAT_THAN_EXPIREDATE;
        return CustomValidators.core(
          'arrearsFromMonthString',
          false,
          errorMessage
        )(date);
      } else {
        date.parent?.get('arrearsFromMonthString')?.setErrors(null);
        date.parent?.get('arrearsToMonthString')?.setErrors(null);
      }
    }
  }

  protected static checkToArrearsMonth(date: AbstractControl): any | null {
    let valid = true;
    let errorMessage = '';
    const arrearsFromMonth = date.parent?.get('arrearsFromMonthString')?.value;
    const arrearsToMonth = date.value;
    if (arrearsToMonth != '' && arrearsToMonth != null) {
      if (
        arrearsFromMonth != '' &&
        arrearsFromMonth != null &&
        arrearsToMonth < arrearsFromMonth
      ) {
        valid = false;
        errorMessage =
          EnumTranslateKey.UI_FORM_CONTROL_WAGE_ERROR_EXPIREDATE_LESS_THAN_EFFECTDATE;
        return CustomValidators.core(
          'arrearsToMonthString',
          false,
          errorMessage
        )(date);
      } else {
        date.parent?.get('arrearsFromMonthString')?.setErrors(null);
        date.parent?.get('arrearsToMonthString')?.setErrors(null);
      }
    } else {
      // date.parent?.get("arrearsFromMonthString")?.setErrors(null);
      date.parent?.get('arrearsToMonthString')?.setErrors(null);
    }
  }

  protected static checkFromWithdrawalMonth(date: AbstractControl): any | null {
    let valid = true;
    let errorMessage = '';
    const withdrawalFromMonthString = date.value;
    const withdrawalToMonth = date.parent?.get(
      'withdrawalToMonthString'
    )?.value;
    if (
      withdrawalToMonth != '' &&
      withdrawalToMonth != null &&
      withdrawalFromMonthString != null
    ) {
      if (withdrawalFromMonthString > withdrawalToMonth) {
        valid = false;
        errorMessage =
          EnumTranslateKey.UI_FORM_CONTROL_WAGE_ERROR_EFFECTDATE_GREAT_THAN_EXPIREDATE;
        return CustomValidators.core(
          'withdrawalFromMonthString',
          false,
          errorMessage
        )(date);
      } else {
        date.parent?.get('withdrawalFromMonthString')?.setErrors(null);
        date.parent?.get('withdrawalToMonthString')?.setErrors(null);
      }
    }
  }

  protected static checkToWithdrawalMonth(date: AbstractControl): any | null {
    let valid = true;
    let errorMessage = '';
    const withdrawalFromMonth = date.parent?.get(
      'withdrawalFromMonthString'
    )?.value;
    const withdrawalToMonth = date.value;
    if (withdrawalToMonth != '' && withdrawalToMonth != null) {
      if (
        withdrawalFromMonth != '' &&
        withdrawalFromMonth != null &&
        withdrawalToMonth < withdrawalFromMonth
      ) {
        valid = false;
        errorMessage =
          EnumTranslateKey.UI_FORM_CONTROL_WAGE_ERROR_EXPIREDATE_LESS_THAN_EFFECTDATE;
        return CustomValidators.core(
          'withdrawalToMonthString',
          false,
          errorMessage
        )(date);
      } else {
        date.parent?.get('withdrawalFromMonthString')?.setErrors(null);
        date.parent?.get('withdrawalToMonthString')?.setErrors(null);
      }
    } else {
      // date.parent?.get("withdrawalFromMonthString")?.setErrors(null);
      date.parent?.get('withdrawalToMonthString')?.setErrors(null);
    }
  }
}
