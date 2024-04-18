import { Component, Output, EventEmitter } from "@angular/core";
import { Validators, FormBuilder, AbstractControl } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { EnumTranslateKey, api } from 'alpha-global-constants';
import { BaseEditComponent, ICoreButtonVNS, ICoreAccordionItem, EnumCoreButtonVNSCode, IAlertOptions, ICoreChecklistOption, ICoreDropdownOption, ICorePageEditColumnComposition, IFormBaseControl, EnumFormBaseContolType, EnumCoreFormControlSeekerSourceType, DialogService, CoreFormService, RoutingService, MultiLanguageService, AlertService, AppService, AuthService, IFormatedResponse, ISysMutationLogBeforeAfterRequest, CustomValidators } from "ngx-histaff-alpha";
import { BehaviorSubject, Subscription, distinctUntilChanged, map } from "rxjs";
import { InsInformationEditService } from "./insinformation.edit.service";


@Component({
  selector: 'cms-insurance-insinformation-edit',
  templateUrl: './insinformation-edit.component.html',
  styleUrls: ['./insinformation-edit.component.scss'],
})
export class InsInformationEditComponent extends BaseEditComponent {
  /* Properties to be passed into core-page-edit */
  @Output() buttonClick = new EventEmitter<ICoreButtonVNS>();
  sectors!: ICoreAccordionItem[];
  checkError$ = new BehaviorSubject<boolean>(false);
  loading: boolean = false;
  manualHeightList!: boolean;
  heightList: number[] = [];
  heightListVisible: number[] = [];
  buttonItems: EnumCoreButtonVNSCode[] = [
    EnumCoreButtonVNSCode.NONE_HEADER_SAVE,
    EnumCoreButtonVNSCode.NONE_HEADER_CANCEL,
  ];

  title = EnumTranslateKey.UI_COMPONENT_TITLE_INS_INFORMATION

  alertOptions: IAlertOptions = {
    autoClose: true,
    keepAfterRouteChange: true,
  };
  bhtypeOptions$ = new BehaviorSubject<ICoreChecklistOption[]>([]);
  bhtypeGetByIdObject$ = new BehaviorSubject<any>(null);
  override entityTable = 'INS_INFORMATION';
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

  lang!: string;

  bhxhStatusOptions$ = new BehaviorSubject<ICoreDropdownOption[]>([]);
  bhxhStatusGetByIdObject$ = new BehaviorSubject<any>(null);
  bhxhStatusGetByIdApi = api.INS_INFORMATION_GET_BHXHSTATUS_BY_ID;

  bhytStatusOptions$ = new BehaviorSubject<ICoreDropdownOption[]>([]);
  bhytStatusGetByIdObject$ = new BehaviorSubject<any>(null);
  bhytStatusGetByIdApi = api.INS_INFORMATION_GET_BHYTSTATUS_BY_ID;

  whereHealthOptions$ = new BehaviorSubject<ICoreDropdownOption[]>([]);
  whereHealthGetByIdObject$ = new BehaviorSubject<any>(null);
  whereHealGetByIdApi = api.INS_INFORMATION_GET_INS_WHEREHEALTH_BY_ID;

  subscriptions: Subscription[] = [];

  employeeGetByIdObject$ = new BehaviorSubject<any>(null);
  employeeGetByIdApi = api.HU_EMPLOYEE_READ;

  captionCode!: EnumTranslateKey;
  formComposition!: ICorePageEditColumnComposition[][];

  employeeId: IFormBaseControl = {
    //Đối tượng nhân viên
    flexSize: 3,
    label: EnumTranslateKey.UI_COMPONENT_TITLE_INS_INFORMATION_CODE,
    field: 'employeeId',
    value: '',
    controlType: EnumFormBaseContolType.SEEKER,
    seekerSourceType: EnumCoreFormControlSeekerSourceType.EMPLOYEE_SEEK,
    getByIdObject$: this.employeeGetByIdObject$,
    getByIdApi: this.employeeGetByIdApi,
    boundFrom: 'id',
    shownFrom: 'code',
    alsoBindTo: [
      { takeFrom: 'positionName', bindTo: 'positionName' },
      { takeFrom: 'fullname', bindTo: 'employeeName' },
      { takeFrom: 'orgName', bindTo: 'orgName' },
      { takeFrom: 'idNo', bindTo: 'idNo' },
      { takeFrom: 'idDate', bindTo: 'idDate' },
      { takeFrom: 'addressIdentity', bindTo: 'addressIdentity' },
      { takeFrom: 'birthDate', bindTo: 'birthDate' },
      { takeFrom: 'birthPlace', bindTo: 'birthPlace' },
      { takeFrom: 'mobilePhone', bindTo: 'contact' },
    ],
    /* END: WHEN USING controlType === EnumFormBaseContolType.SEEKER */
    type: 'text',
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
    // readonly: true,
    disabled: true,
    value: '',
  };
  orgName: IFormBaseControl = {
    //phòng ban
    flexSize: 3,
    controlType: EnumFormBaseContolType.TEXTBOX,
    field: 'orgName',
    label: EnumTranslateKey.UI_COMPONENT_TITLE_INS_INFORMATION_ORG_NAME,
    type: 'text',
    disabled: true,
    value: '',
    // readonly: true,
  };

  idNo: IFormBaseControl = {
    flexSize: 3,
    label: EnumTranslateKey.UI_COMPONENT_TITLE_INS_INFORMATION_ID_NO,
    field: 'idNo',
    value: '',
    controlType: EnumFormBaseContolType.TEXTBOX,
    type: 'text',
    disabled: true,
    // readonly: true,
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

  contact: IFormBaseControl = {
    flexSize: 3,
    label: EnumTranslateKey.UI_COMPONENT_TITLE_INS_INFORMATION_CONTACT,
    field: 'contact',
    value: '',
    controlType: EnumFormBaseContolType.TEXTBOX,
    type: 'text',
    disabled: true,
  };

  seniorityInsurance: IFormBaseControl = {
    flexSize: 3,
    label:
      EnumTranslateKey.UI_COMPONENT_TITLE_INS_INFORMATION_SENIORITY_INSURANCE,
    field: 'seniorityInsurance',
    value: '',
    controlType: EnumFormBaseContolType.TEXTBOX,
    type: 'number',
    readonly: false,
  };
  seniorityInsuranceInCompany: IFormBaseControl = {
    flexSize: 3,
    label:
      EnumTranslateKey.UI_COMPONENT_TITLE_INS_INFORMATION_SENIORITY_INSURANCE_IN_CMP,
    field: 'seniorityInsuranceInCompany',
    value: '',
    controlType: EnumFormBaseContolType.TEXTBOX,
    type: 'number',
    disabled: true,
  };
  company: IFormBaseControl = {
    flexSize: 3,
    label:
      EnumTranslateKey.UI_COMPONENT_TITLE_INS_INFORMATION_COMPANY_SUPPLY_NAME,
    field: 'company',
    value: '',
    controlType: EnumFormBaseContolType.TEXTBOX,
    type: 'text',
    disabled: true,
  };
  salaryBhxhYt: IFormBaseControl = {
    flexSize: 3,
    label: EnumTranslateKey.UI_COMPONENT_TITLE_INS_INFORMATION_SALARY_BHXH_YT,
    field: 'salaryBhxhYt',
    value: '',
    controlType: EnumFormBaseContolType.CURRENCY,
    type: 'text',
    disabled: true,
  };
  lstCheckInsItems: IFormBaseControl = {
    flexSize: 3,
    label: EnumTranslateKey.UI_COMPONENT_TITLE_INS_INFORMATION_INSURANCE_TYPE,
    field: 'lstCheckInsItems',
    value: [],
    readonly: true,
    disabled: true,
    controlType: EnumFormBaseContolType.CHECKLIST,
    checklistOptions$: this.checklistOptions$,
    getByIdObject$: this.bhtypeGetByIdObject$,
    shownFrom: 'text',
    type: 'string',
  };

  ///sector 2
  ///sector 2
  bhxhFromDateString: IFormBaseControl = {
    flexSize: 3,
    label: EnumTranslateKey.UI_COMPONENT_TITLE_INS_INFORMATION_FROM_DATE,
    field: 'bhxhFromDateString',
    value: '',
    controlType: EnumFormBaseContolType.MONTHSELECTOR,
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
      {
        name: 'checkBhxhFromDate',
        validator: InsInformationEditComponent.checkBhxhFromDate,
        errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_MIN,
      },
    ],
  };
  bhxhToDateString: IFormBaseControl = {
    flexSize: 3,
    label: EnumTranslateKey.UI_COMPONENT_TITLE_INS_INFORMATION_TO_DATE,
    field: 'bhxhToDateString',
    value: '',
    controlType: EnumFormBaseContolType.MONTHSELECTOR,
    validators: [
      {
        name: 'checkBhxhToDate',
        validator: InsInformationEditComponent.checkBhxhToDate,
        errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_MIN,
      },
    ],
  };
  bhxhNo: IFormBaseControl = {
    flexSize: 3,
    label: EnumTranslateKey.UI_COMPONENT_TITLE_INS_INFORMATION_BHXH_NO,
    field: 'bhxhNo',
    value: '',
    controlType: EnumFormBaseContolType.TEXTBOX,
    type: 'string',
    disabled: true,
  };
  bhxhStatusId: IFormBaseControl = {
    flexSize: 3,
    label: EnumTranslateKey.UI_COMPONENT_TITLE_INS_INFORMATION_BHXH_STATUS,
    field: 'bhxhStatusId',
    value: '',
    controlType: EnumFormBaseContolType.DROPDOWN,
    getByIdObject$: this.bhxhStatusGetByIdObject$,
    dropdownOptions$: this.bhxhStatusOptions$,
    getByIdApi: this.bhxhStatusGetByIdApi,
    shownFrom: 'name',
    type: 'string',
  };
  bhxhSuppliedDate: IFormBaseControl = {
    flexSize: 3,
    label:
      EnumTranslateKey.UI_COMPONENT_TITLE_INS_INFORMATION_BHXH_SUPPLIED_DATE,
    field: 'bhxhSuppliedDate',
    value: '',
    controlType: EnumFormBaseContolType.DATEPICKER,
    type: 'date',
  };

  bhxhGrantDate: IFormBaseControl = {
    flexSize: 3,
    label: EnumTranslateKey.UI_COMPONENT_TITLE_INS_INFORMATION_BHXH_GRANT_DATE,
    field: 'bhxhGrantDate',
    value: '',
    controlType: EnumFormBaseContolType.DATEPICKER,
    type: 'date',
  };

  bhxhDeliverer: IFormBaseControl = {
    flexSize: 3,
    label: EnumTranslateKey.UI_COMPONENT_TITLE_INS_INFORMATION_BHXH_DELIVERER,
    field: 'bhxhDeliverer',
    value: '',
    controlType: EnumFormBaseContolType.TEXTBOX,
    type: 'text',
  };
  bhxhStorageNumber: IFormBaseControl = {
    flexSize: 3,
    label:
      EnumTranslateKey.UI_COMPONENT_TITLE_INS_INFORMATION_BHXH_STORAGE_NUMBER,
    field: 'bhxhStorageNumber',
    value: '',
    controlType: EnumFormBaseContolType.TEXTBOX,
    type: 'text',
  };
  bhxhReimbursementDate: IFormBaseControl = {
    flexSize: 3,
    label:
      EnumTranslateKey.UI_COMPONENT_TITLE_INS_INFORMATION_BHXH_REIMBURSEMENT_DATE,
    field: 'bhxhReimbursementDate',
    value: '',
    controlType: EnumFormBaseContolType.DATEPICKER,
    type: 'date',
  };

  bhxhReceiver: IFormBaseControl = {
    flexSize: 3,
    label: EnumTranslateKey.UI_COMPONENT_TITLE_INS_INFORMATION_BHXH_RECEIVER,
    field: 'bhxhReceiver',
    value: '',
    controlType: EnumFormBaseContolType.TEXTBOX,
    type: 'text',
  };

  bhxhNote: IFormBaseControl = {
    flexSize: 3,
    label: EnumTranslateKey.UI_COMPONENT_TITLE_INS_INFORMATION_BHXH_NOTE,
    field: 'bhxhNote',
    value: '',
    controlType: EnumFormBaseContolType.TEXTBOX,
    type: 'text',
  };
  //sector 3
  bhytFromDateString: IFormBaseControl = {
    flexSize: 3,
    label: EnumTranslateKey.UI_COMPONENT_TITLE_INS_INFORMATION_FROM_DATE,
    field: 'bhytFromDateString',
    value: '',
    controlType: EnumFormBaseContolType.MONTHSELECTOR,
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
      {
        name: 'checkBhytFromDate',
        validator: InsInformationEditComponent.checkBhytFromDate,
        errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_MIN,
      },
    ],
  };
  bhytToDateString: IFormBaseControl = {
    flexSize: 3,
    label: EnumTranslateKey.UI_COMPONENT_TITLE_INS_INFORMATION_TO_DATE,
    field: 'bhytToDateString',
    value: '',
    controlType: EnumFormBaseContolType.MONTHSELECTOR,
    validators: [
      {
        name: 'checkBhytToDate',
        validator: InsInformationEditComponent.checkBhytToDate,
        errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_MIN,
      },
    ],
  };
  bhytNo: IFormBaseControl = {
    flexSize: 3,
    label: EnumTranslateKey.UI_COMPONENT_TITLE_INS_INFORMATION_BHYT_NO,
    field: 'bhytNo',
    value: '',
    controlType: EnumFormBaseContolType.TEXTBOX,
    type: 'string',
    disabled: true,
  };
  bhytStatusId: IFormBaseControl = {
    flexSize: 3,
    label: EnumTranslateKey.UI_COMPONENT_TITLE_INS_INFORMATION_BHYT_STATUS,
    field: 'bhytStatusId',
    value: null,
    controlType: EnumFormBaseContolType.DROPDOWN,
    getByIdObject$: this.bhytStatusGetByIdObject$,
    dropdownOptions$: this.bhytStatusOptions$,
    getByIdApi: this.bhytStatusGetByIdApi,
    shownFrom: 'name',
    type: 'string',
  };

  bhytEffectDate: IFormBaseControl = {
    flexSize: 3,
    label: EnumTranslateKey.UI_COMPONENT_TITLE_INS_INFORMATION_BHYT_EFFECT_DATE,
    field: 'bhytEffectDate',
    value: '',
    controlType: EnumFormBaseContolType.DATEPICKER,
    type: 'date',
  };
  bhytExpireDate: IFormBaseControl = {
    flexSize: 3,
    label: EnumTranslateKey.UI_COMPONENT_TITLE_INS_INFORMATION_BHYT_EXPIRE_DATE,
    field: 'bhytExpireDate',
    value: null,
    controlType: EnumFormBaseContolType.DATEPICKER,
    type: 'date',
  };
  bhytWherehealthId: IFormBaseControl = {
    flexSize: 3,
    label: EnumTranslateKey.UI_COMPONENT_TITLE_INS_INFORMATION_BHYT_WHEREHEALTH,
    field: 'bhytWherehealthId',
    value: null,
    controlType: EnumFormBaseContolType.DROPDOWN,
    dropdownOptions$: this.whereHealthOptions$,
    getByIdObject$: this.whereHealthGetByIdObject$,
    getByIdApi: this.whereHealGetByIdApi,
    shownFrom: 'name',
    type: 'string',
  };
  bhytReceivedDate: IFormBaseControl = {
    flexSize: 3,
    label:
      EnumTranslateKey.UI_COMPONENT_TITLE_INS_INFORMATION_BHYT_RECEIVED_DATE,
    field: 'bhytReceivedDate',
    value: '',
    controlType: EnumFormBaseContolType.DATEPICKER,
    type: 'date',
  };
  bhytReceiver: IFormBaseControl = {
    flexSize: 3,
    label: EnumTranslateKey.UI_COMPONENT_TITLE_INS_INFORMATION_BHYT_RECEIVER,
    field: 'bhytReceiver',
    value: null,
    controlType: EnumFormBaseContolType.TEXTBOX,
    type: 'text',
  };
  bhytReimbursementDate: IFormBaseControl = {
    flexSize: 3,
    label:
      EnumTranslateKey.UI_COMPONENT_TITLE_INS_INFORMATION_BHYT_REIMBURSEMENT_DATE,
    field: 'bhytReimbursementDate',
    value: null,
    controlType: EnumFormBaseContolType.DATEPICKER,
    type: 'date',
  };
  bhtnFromDateString: IFormBaseControl = {
    flexSize: 3,
    label: EnumTranslateKey.UI_COMPONENT_TITLE_INS_INFORMATION_FROM_DATE,
    field: 'bhtnFromDateString',
    value: '',
    controlType: EnumFormBaseContolType.MONTHSELECTOR,
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
      {
        name: 'checkBhtnFromDate',
        validator: InsInformationEditComponent.checkBhtnFromDate,
        errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_MIN,
      },
    ],
  };
  bhtnToDateString: IFormBaseControl = {
    flexSize: 3,
    label: EnumTranslateKey.UI_COMPONENT_TITLE_INS_INFORMATION_TO_DATE,
    field: 'bhtnToDateString',
    value: '',
    controlType: EnumFormBaseContolType.MONTHSELECTOR,
    validators: [
      {
        name: 'checkBhtnToDate',
        validator: InsInformationEditComponent.checkBhtnToDate,
        errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_MIN,
      },
    ],
  };
  bhtnldBnnFromDateString: IFormBaseControl = {
    flexSize: 3,
    label: EnumTranslateKey.UI_COMPONENT_TITLE_INS_INFORMATION_FROM_DATE,
    field: 'bhtnldBnnFromDateString',
    value: '',
    controlType: EnumFormBaseContolType.MONTHSELECTOR,
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
      {
        name: 'checkBhtnldFromDate',
        validator: InsInformationEditComponent.checkBhtnldFromDate,
        errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_MIN,
      },
    ],
  };
  bhtnldBnnToDateString: IFormBaseControl = {
    flexSize: 3,
    label: EnumTranslateKey.UI_COMPONENT_TITLE_INS_INFORMATION_TO_DATE,
    field: 'bhtnldBnnToDateString',
    value: '',
    controlType: EnumFormBaseContolType.MONTHSELECTOR,
    validators: [
      {
        name: 'checkBhtnldToDate',
        validator: InsInformationEditComponent.checkBhtnldToDate,
        errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_MIN,
      },
    ],
  };

  id!: number;
  selectedData: any;
  constructor(
    public override dialogService: DialogService,
    private insInformationEditService: InsInformationEditService,
    private coreFormService: CoreFormService,
    private routingService: RoutingService,
    private mls: MultiLanguageService,
    private alertService: AlertService,
    private appService: AppService,
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService
  ) {
    super(dialogService);
    if (this.router.getCurrentNavigation()?.extras?.state) {
      this.selectedData = this.router.getCurrentNavigation()?.extras.state!['selectedData'];
    }
    this.sectors = this.insInformationEditService.sectors;
    this.captionCode = EnumTranslateKey.UI_COMPONENT_TITLE_HU_COMMEND;
    this.id = Number(atob(this.route.snapshot.params['id']));
  }

  createForm() {
    let newDate: String =
      new Date().getFullYear() +
      '-' +
      (new Date().getMonth() + 1 <= 9
        ? `0${new Date().getMonth() + 1}`
        : new Date().getMonth() + 1);
    this.form = this.fb.group({
      id: null,
      orgId: null,
      employeeName: [{ value: null, disabled: true }],
      employeeId: [null, [Validators.required]],
      employeeCode: [{ value: null, disabled: true }, [Validators.required]],
      positionName: [{ value: null, disabled: true }],
      orgName: [{ value: null, disabled: true }],
      birthDate: [{ value: null, disabled: true }],
      birthPlace: [{ value: null, disabled: true }],
      contact: [{ value: null, disabled: true }],
      idNo: [{ value: null, disabled: true }],
      addressIdentity: [{ value: null, disabled: true }],
      idDate: [{ value: null, disabled: true }],
      seniorityInsurance: [],
      seniorityInsuranceInCompany: [{ value: null, disabled: true }],
      company: [{ value: null, disabled: true }],
      salaryBhxhYt: [{ value: null, disabled: true }],
      salaryBhTn: [null],
      lstCheckInsItems: [{ value: [], disabled: true }],
      bhxhNo: [{ value: null, disabled: true }],
      bhxhFromDateString: [
        newDate,
        [Validators.required, InsInformationEditComponent.checkBhxhFromDate],
      ],
      bhxhToDateString: [null, [InsInformationEditComponent.checkBhxhToDate]],
      bhxhStatusId: [],
      bhxhSuppliedDate: [],
      bhxhGrantDate: [],
      bhxhDeliverer: [],
      bhxhStorageNumber: [],
      bhxhReimbursementDate: [],
      bhxhReceiver: [],
      bhxhNote: [],
      bhytFromDateString: [
        newDate,
        [Validators.required, InsInformationEditComponent.checkBhytFromDate],
      ],
      bhytToDateString: [null, [InsInformationEditComponent.checkBhytToDate]],
      bhytNo: [{ value: null, disabled: true }],
      bhytStatusId: [],
      bhytEffectDate: [null, [InsInformationEditComponent.checkEffectDate]],
      bhytExpireDate: [null, [InsInformationEditComponent.checkExpireDate]],
      bhytWherehealthId: [],
      bhytReceivedDate: [],
      bhytReceiver: [],
      bhytReimbursementDate: [],
      bhtnFromDateString: [
        newDate,
        [Validators.required, InsInformationEditComponent.checkBhtnFromDate],
      ],
      bhtnToDateString: [null, [InsInformationEditComponent.checkBhtnToDate]],
      bhtnldBnnFromDateString: [
        newDate,
        [Validators.required, InsInformationEditComponent.checkBhtnldFromDate],
      ],
      bhtnldBnnToDateString: [
        null,
        [InsInformationEditComponent.checkBhtnldToDate],
      ],
    });
    this.subscriptions.push(
      // employee Infor
      this.form
        .get('employeeId')
        ?.valueChanges.pipe(distinctUntilChanged())
        .subscribe((x) => {
          if (!!x) {
            this.insInformationEditService
              .getInforById(x)
              .pipe(
                map((f: any) => {
                  let options: any;
                  options = f.body.innerBody;
                  return options;
                })
              )
              .subscribe((response: any) => {
                this.form
                  .get('employeeCode')
                  ?.patchValue(response.employeeCode);
                this.form
                  .get('seniorityInsuranceInCompany')
                  ?.patchValue(response.seniorityInsuranceInCompany || null);
                this.form.get('company')?.patchValue(response.company);
                this.form
                  .get('salaryBhxhYt')
                  ?.patchValue(response.salaryBhxhYt ?? 0);
                this.form.get('bhytNo')?.patchValue(response.bhytNo);
                this.form.get('bhxhNo')?.patchValue(response.bhxhNo);
              });
            //get Type BH
            this.insInformationEditService
              .GetLstInsCheck(x)
              .pipe(
                map((x: any) => {
                  if (x.ok && x.status === 200) {
                    return x.body.innerBody.lstCheckInsItems;
                  } else {
                    return [];
                  }
                })
              )
              .subscribe((response) => {
                this.form.get('lstCheckInsItems')?.setValue(response);
                console.log(response);
                this.loading = false;
              });
          }
        })!,
      //check BHXH
      this.form
        .get('bhxhFromDateString')
        ?.valueChanges.pipe(distinctUntilChanged())
        .subscribe((x) => {
          if (this.form.get('bhxhToDateString')?.value != null) {
            this.form
              .get('bhxhToDateString')
              ?.setValue(this.form.get('bhxhToDateString')?.value);
          }
        })!,

      this.form
        .get('bhxhToDateString')
        ?.valueChanges.pipe(distinctUntilChanged())
        .subscribe((x) => {
          if (this.form.get('bhxhFromDateString')?.value != null) {
            this.form
              .get('bhxhFromDateString')
              ?.setValue(this.form.get('bhxhFromDateString')?.value);
          }
        })!,
      //check BHYT
      this.form
        .get('bhytFromDateString')
        ?.valueChanges.pipe(distinctUntilChanged())
        .subscribe((x) => {
          if (this.form.get('bhytToDateString')?.value != null) {
            this.form
              .get('bhytToDateString')
              ?.setValue(this.form.get('bhytToDateString')?.value);
          }
        })!,

      this.form
        .get('bhytToDateString')
        ?.valueChanges.pipe(distinctUntilChanged())
        .subscribe((x) => {
          if (this.form.get('bhytFromDateString')?.value != null) {
            this.form
              .get('bhytFromDateString')
              ?.setValue(this.form.get('bhytFromDateString')?.value);
          }
        })!,
      //check BHBnn
      this.form
        .get('bhtnldBnnFromDateString')
        ?.valueChanges.pipe(distinctUntilChanged())
        .subscribe((x) => {
          if (this.form.get('bhtnldBnnToDateString')?.value != null) {
            this.form
              .get('bhtnldBnnToDateString')
              ?.setValue(this.form.get('bhtnldBnnToDateString')?.value);
          }
        })!,

      this.form
        .get('bhtnldBnnToDateString')
        ?.valueChanges.pipe(distinctUntilChanged())
        .subscribe((x) => {
          if (this.form.get('bhtnldBnnFromDateString')?.value != null) {
            this.form
              .get('bhtnldBnnFromDateString')
              ?.setValue(this.form.get('bhtnldBnnFromDateString')?.value);
          }
        })!,
      //check BHtn
      this.form
        .get('bhtnFromDateString')
        ?.valueChanges.pipe(distinctUntilChanged())
        .subscribe((x) => {
          if (this.form.get('bhtnToDateString')?.value != null) {
            this.form
              .get('bhtnToDateString')
              ?.setValue(this.form.get('bhtnToDateString')?.value);
          }
        })!,

      this.form
        .get('bhtnToDateString')
        ?.valueChanges.pipe(distinctUntilChanged())
        .subscribe((x) => {
          if (this.form.get('bhtnFromDateString')?.value != null) {
            this.form
              .get('bhtnFromDateString')
              ?.setValue(this.form.get('bhtnFromDateString')?.value);
          }
        })!
    );

    if (!!this.id) {
      this.form.get('id')?.setValue(this.id);
      this.subscriptions.push(
        this.appService
          .get(api.INS_INFORMATION_READ_BY_ID + this.id.toString())
          .subscribe((x: any) => {
            if (x.ok && x.status == 200) {
              const body: IFormatedResponse = x.body;

              if (body.statusCode === 200) {
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
              }
            }
          })
      );
    }
  }

  ngOnInit(): void {

    this.subscriptions.push(
      this.mls.lang$.subscribe(x => this.lang = x)
    )

    this.loading = true;
    this.createForm();
    if (!!this.selectedData) {
      this.subscriptions.push(
        this.appService
          .get(api.INS_INFORMATION_READ_BY_ID + this.selectedData[0].id.toString())
          .subscribe((x: any) => {
            if (x.ok && x.status == 200) {
              const body: IFormatedResponse = x.body;

              if (body.statusCode === 200) {
                let resObj = x.body.innerBody;
                this.form.patchValue(resObj);
                this.formInitStringValue = JSON.stringify(
                  this.form.getRawValue()
                );
                this.form.get('id')?.setValue(0)
                let objSign = {
                  value: resObj.employeeId,
                  code: resObj.employeeCode,
                };
                this.employeeGetByIdObject$.next(objSign);
              }
            }
          })
      );
    }



    this.insInformationEditService
      .getBhxhStatus()
      .pipe(
        map((x: any) => {
          if (x.ok && x.status === 200) {
            const options: { value: number; text: string }[] = [];
            x.body.innerBody.map((g: any) => {
              options.push({
                value: g.id,
                text: g.name,
              });
            });
            return options;
          } else {
            return [];
          }
        })
      )
      .subscribe((response) => {
        this.bhxhStatusOptions$.next(response);
        this.loading = false;
      });

    this.insInformationEditService
      .getBhYtStatus()
      .pipe(
        map((x: any) => {
          if (x.ok && x.status === 200) {
            const options: { value: number; text: string }[] = [];
            x.body.innerBody.map((g: any) => {
              options.push({
                value: g.id,
                text: g.name,
              });
            });
            return options;
          } else {
            return [];
          }
        })
      )
      .subscribe((response) => {
        this.bhytStatusOptions$.next(response);
        this.loading = false;
      });

    this.insInformationEditService
      .getInsWhereHealth()
      .pipe(
        map((x: any) => {
          if (x.ok && x.status === 200) {
            const options: { value: number; text: string }[] = [];
            x.body.innerBody.map((g: any) => {
              options.push({
                value: g.id,
                text: g.name,
              });
            });
            return options;
          } else {
            return [];
          }
        })
      )
      .subscribe((response) => {
        this.whereHealthOptions$.next(response);
        this.loading = false;
      });
  }
  onCancelLocal() {
    this.checkError$.next(true);
    this.router.navigateByUrl('/cms/insurance/business/insinformation');
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
  onAccordionItemClick(e: ICoreAccordionItem): void { }

  onAccordionItemClickEdit(e: ICoreAccordionItem): void { }

  onFormSubmit() {
    let url: string;
    this.checkError$.next(true);
    const request = this.form.getRawValue();

    if (!!this.form.valid) {
      const actualFormDeclaredFields: any[] = [];
      Object.keys(this.form.controls).forEach((c) => {
        actualFormDeclaredFields.push(c);
      });
      actualFormDeclaredFields.push('bhxhToDate');
      actualFormDeclaredFields.push('bhytToDate');
      actualFormDeclaredFields.push('bhtnToDate');
      actualFormDeclaredFields.push('bhtnldBnnToDate');

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

      this.appService.post(url, mixRequest).subscribe((response) => {
        if (response.ok == true && response.status == 200) {
          const body: IFormatedResponse = response.body;
          if (body.statusCode === 200) {
            this.formInitStringValue = JSON.stringify(this.form.getRawValue());
            this.router.navigateByUrl('/cms/insurance/business/insinformation');
          }
        }
      });
    } else {
      const c = document.querySelectorAll('.sector-content');
      console.log(c)
      for (let i = 0; i < c.length; i++) {
        var x = c[i] as HTMLElement;
        x.style.height = 'auto'
      }
      this.sectors.forEach((x) => {
        x.open = true;
      });
    }
  }
  ngOnDestroy(): void {
    this.subscriptions.map((x) => x?.unsubscribe());
  }

  static checkBhxhFromDate(control: AbstractControl): any | null {
    let valid = true;
    let errorMessage: string = '';
    if (
      control.parent?.get('bhxhFromDateString')?.value != null &&
      control.parent?.get('bhxhToDateString')?.value != null
    ) {
      const bhxhFromDate = new Date(control.value);
      const bhxhToDate = new Date(
        control.parent?.get('bhxhToDateString')?.value
      );
      if (
        new Date(bhxhFromDate.toLocaleDateString('en-US')) >
        new Date(bhxhToDate.toLocaleDateString('en-US'))
      ) {
        valid = false;
        errorMessage =
          EnumTranslateKey.UI_COMPONENT_TITLE_INS_INFORMATION_FROM_DATE_MORE_THAN_TO_DATE;
      }
    }
    return CustomValidators.core(
      'checkBhxhFromDate',
      valid,
      errorMessage
    )(control);
  }
  static checkBhxhToDate(control: AbstractControl): any | null {
    let valid = true;
    let errorMessage: string = '';
    if (
      control.parent?.get('bhxhFromDateString')?.value != null &&
      control.parent?.get('bhxhToDateString')?.value != null
    ) {
      const bhxhToDate = new Date(control.value);
      const bhxhFromDate = new Date(
        control.parent?.get('bhxhFromDateString')?.value
      );
      if (
        new Date(bhxhFromDate.toLocaleDateString('en-US')) >
        new Date(bhxhToDate.toLocaleDateString('en-US'))
      ) {
        valid = false;
        errorMessage =
          EnumTranslateKey.UI_COMPONENT_TITLE_INS_INFORMATION_TO_DATE_LESS_THAN_FROM_DATE;
      }
    }
    return CustomValidators.core(
      'checkBhxhToDate',
      valid,
      errorMessage
    )(control);
  }
  static checkBhytFromDate(control: AbstractControl): any | null {
    let valid = true;
    let errorMessage: string = '';
    if (
      control.parent?.get('bhytFromDateString')?.value != null &&
      control.parent?.get('bhytToDateString')?.value != null
    ) {
      const bhytFromDate = new Date(control.value);
      const bhytToDate = new Date(
        control.parent?.get('bhytToDateString')?.value
      );
      if (
        new Date(bhytFromDate.toLocaleDateString('en-US')) >
        new Date(bhytToDate.toLocaleDateString('en-US'))
      ) {
        valid = false;
        errorMessage =
          EnumTranslateKey.UI_COMPONENT_TITLE_INS_INFORMATION_FROM_DATE_MORE_THAN_TO_DATE;
      }
    }
    return CustomValidators.core(
      'checkBhytFromDate',
      valid,
      errorMessage
    )(control);
  }
  static checkBhytToDate(control: AbstractControl): any | null {
    let valid = true;
    let errorMessage: string = '';
    if (
      control.parent?.get('bhytFromDateString')?.value != null &&
      control.parent?.get('bhytToDateString')?.value != null
    ) {
      const bhytToDate = new Date(control.value);
      const bhytFromDate = new Date(
        control.parent?.get('bhytFromDateString')?.value
      );
      if (
        new Date(bhytFromDate.toLocaleDateString('en-US')) >
        new Date(bhytToDate.toLocaleDateString('en-US'))
      ) {
        valid = false;
        errorMessage =
          EnumTranslateKey.UI_COMPONENT_TITLE_INS_INFORMATION_TO_DATE_LESS_THAN_FROM_DATE;
      }
    }
    return CustomValidators.core(
      'checkBhytToDate',
      valid,
      errorMessage
    )(control);
  }
  static checkBhtnFromDate(control: AbstractControl): any | null {
    let valid = true;
    let errorMessage: string = '';
    if (
      control.parent?.get('bhtnFromDateString')?.value != null &&
      control.parent?.get('bhtnToDateString')?.value != null
    ) {
      const bhtnFromDate = new Date(control.value);
      const bhtnToDate = new Date(
        control.parent?.get('bhtnToDateString')?.value
      );
      if (
        new Date(bhtnFromDate.toLocaleDateString('en-US')) >
        new Date(bhtnToDate.toLocaleDateString('en-US'))
      ) {
        valid = false;
        errorMessage =
          EnumTranslateKey.UI_COMPONENT_TITLE_INS_INFORMATION_FROM_DATE_MORE_THAN_TO_DATE;
      }
    }
    return CustomValidators.core(
      'checkBhtnFromDate',
      valid,
      errorMessage
    )(control);
  }
  static checkBhtnToDate(control: AbstractControl): any | null {
    let valid = true;
    let errorMessage: string = '';
    if (
      control.parent?.get('bhtnFromDateString')?.value != null &&
      control.parent?.get('bhtnToDateString')?.value != null
    ) {
      const bhtnToDate = new Date(control.value);
      const bhtnFromDate = new Date(
        control.parent?.get('bhtnFromDateString')?.value
      );
      if (
        new Date(bhtnFromDate.toLocaleDateString('en-US')) >
        new Date(bhtnToDate.toLocaleDateString('en-US'))
      ) {
        valid = false;
        errorMessage =
          EnumTranslateKey.UI_COMPONENT_TITLE_INS_INFORMATION_TO_DATE_LESS_THAN_FROM_DATE;
      }
    }
    return CustomValidators.core(
      'checkBhtnToDate',
      valid,
      errorMessage
    )(control);
  }
  static checkBhtnldFromDate(control: AbstractControl): any | null {
    let valid = true;
    let errorMessage: string = '';
    if (
      control.parent?.get('bhtnldBnnFromDateString')?.value != null &&
      control.parent?.get('bhtnldBnnToDateString')?.value != null
    ) {
      const bhtnldFromDate = new Date(control.value);
      const bhtnldToDate = new Date(
        control.parent?.get('bhtnldBnnToDateString')?.value
      );
      if (
        new Date(bhtnldFromDate.toLocaleDateString('en-US')) >
        new Date(bhtnldToDate.toLocaleDateString('en-US'))
      ) {
        valid = false;
        errorMessage =
          EnumTranslateKey.UI_COMPONENT_TITLE_INS_INFORMATION_FROM_DATE_MORE_THAN_TO_DATE;
      }
    }
    return CustomValidators.core(
      'checkBhtnldFromDate',
      valid,
      errorMessage
    )(control);
  }
  static checkBhtnldToDate(control: AbstractControl): any | null {
    let valid = true;
    let errorMessage: string = '';
    if (
      control.parent?.get('bhtnldBnnToDateString')?.value != null &&
      control.parent?.get('bhtnldBnnFromDateString')?.value != null
    ) {
      const bhtnldToDate = new Date(control.value);
      const bhtnldFromDate = new Date(
        control.parent?.get('bhtnldBnnFromDateString')?.value
      );
      if (
        new Date(bhtnldFromDate.toLocaleDateString('en-US')) >
        new Date(bhtnldToDate.toLocaleDateString('en-US'))
      ) {
        valid = false;
        errorMessage =
          EnumTranslateKey.UI_COMPONENT_TITLE_INS_INFORMATION_TO_DATE_LESS_THAN_FROM_DATE;
      }
    }
    return CustomValidators.core(
      'checkBhtnldToDate',
      valid,
      errorMessage
    )(control);
  }
  static checkEffectDate(control: AbstractControl): any | null {
    let valid = true;
    let errorMessage: string = '';
    if (
      control.parent?.get('bhytEffectDate')?.value != null &&
      control.parent?.get('bhytExpireDate')?.value != null
    ) {
      const bhtnldToDate = new Date(control.value);
      const bhtnldFromDate = new Date(
        control.parent?.get('bhytExpireDate')?.value
      );
      if (
        new Date(bhtnldFromDate.toLocaleDateString('en-US')) >
        new Date(bhtnldToDate.toLocaleDateString('en-US'))
      ) {
        valid = false;
        errorMessage =
          EnumTranslateKey.UI_COMPONENT_TITLE_INS_INFORMATION_TO_DATE_LESS_THAN_FROM_DATE;
      }
    }
    return CustomValidators.core(
      'checkEffectDate',
      valid,
      errorMessage
    )(control);
  }

  static checkExpireDate(control: AbstractControl): any | null {
    let valid = true;
    let errorMessage: string = '';
    if (
      control.parent?.get('bhytEffectDate')?.value != null &&
      control.parent?.get('bhytExpireDate')?.value != null
    ) {
      const bhtnldToDate = new Date(control.value);
      const bhtnldFromDate = new Date(
        control.parent?.get('bhytEffectDate')?.value
      );
      if (
        new Date(bhtnldFromDate.toLocaleDateString('en-US')) >
        new Date(bhtnldToDate.toLocaleDateString('en-US'))
      ) {
        valid = false;
        errorMessage =
          EnumTranslateKey.UI_COMPONENT_TITLE_INS_INFORMATION_TO_DATE_LESS_THAN_FROM_DATE;
      }
    }
    return CustomValidators.core(
      'checkExpireDate',
      valid,
      errorMessage
    )(control);
  }
}
