import { AfterViewInit, Component, OnDestroy, OnInit, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { api, EnumTranslateKey } from 'alpha-global-constants';
import { BaseEditComponent, IAlertOptions, ICoreDropdownOption, ICorePageEditColumnComposition, ICorePageEditCRUD, ICoreTableColumnItem, ICorePageListApiDefinition, ICoreFormSection, EnumFormBaseContolType, EnumCoreFormControlSeekerSourceType, DialogService, MultiLanguageService, CommonHttpRequestService, ResponseService, AppService, AlertService, OrganizationService, IFormatedResponse, CustomValidators } from 'ngx-histaff-alpha';
import { Subscription, BehaviorSubject, distinctUntilChanged, filter } from 'rxjs';

@Component({
  selector: 'app-decision-edit',
  templateUrl: './decision-edit.component.html',
  styleUrls: ['./decision-edit.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
})
export class DecisionEditComponent extends BaseEditComponent implements OnInit, AfterViewInit, OnDestroy {
  /* Properties to be passed into core-page-edit */
  override entityTable = 'HU_WORKING';

  id_status_approve!: number;

  @ViewChild('allowanceType') allowanceType!: TemplateRef<any>; // Tham chiếu đến template

  loading: boolean = false;
  bufferForm!: FormGroup;

  alertOptions: IAlertOptions = {
    autoClose: true,
    keepAfterRouteChange: true,
    timeClose: 10000,
  };
  subscriptions: Subscription[] = [];

  workingPreDefinedOuterParam$ = new BehaviorSubject<any>(null);
  outerParamMCC$ = new BehaviorSubject<any>(null);
  groupOptionsReason$ = new BehaviorSubject<ICoreDropdownOption[]>([]);
  groupOptionsSalType$ = new BehaviorSubject<ICoreDropdownOption[]>([]);
  groupOptionsSalScale$ = new BehaviorSubject<ICoreDropdownOption[]>([]);
  groupOptionsSalRank$ = new BehaviorSubject<ICoreDropdownOption[]>([]);
  groupOptionsSalLevel$ = new BehaviorSubject<ICoreDropdownOption[]>([]);
  groupOptionsPosition$ = new BehaviorSubject<ICoreDropdownOption[]>([]);
  groupOptionsStatus$ = new BehaviorSubject<ICoreDropdownOption[]>([]);
  groupOptionsTitle$ = new BehaviorSubject<ICoreDropdownOption[]>([]);
  groupOptionsTypeDecision$ = new BehaviorSubject<ICoreDropdownOption[]>([]);
  groupOptionsAllowanceType$ = new BehaviorSubject<ICoreDropdownOption[]>([]);
  //groupOptionsLaborObj$ = new BehaviorSubject<ICoreDropdownOption[]>([]);
  groupOptionsEmployeeObj$ = new BehaviorSubject<ICoreDropdownOption[]>([]);

  //subscriptionsStatus: Subscription[] = [];

  employeeGetByIdObject$ = new BehaviorSubject<any>(null);
  employeeGetByIdApi = api.HU_EMPLOYEE_READ;

  signGetByIdObject$ = new BehaviorSubject<any>(null);
  signGetByIdApi = api.HU_EMPLOYEE_READ;

  orgUnitGetByIdObject$ = new BehaviorSubject<any>(null);
  orgUnitGetByIdApi = api.OM_ORGANIZATION_READ;

  salScaleGetByIdObject$ = new BehaviorSubject<any>(null);
  salScaleGetByIdApi = api.HU_SALARY_SCALE_READ;

  salRankGetByIdObject$ = new BehaviorSubject<any>(null);
  salRankGetByIdApi = api.HU_SALARY_RANK_READ;

  salLevelGetByIdObject$ = new BehaviorSubject<any>(null);
  salLevelGetByIdApi = api.HU_SALARY_LEVEL_READ;

  sysOtherlistGetByIdObject$ = new BehaviorSubject<any>(null);
  sysOtherlistGetByIdApi = api.SYS_OTHERLIST_READ;

  typeDecisionGetByIdObject$ = new BehaviorSubject<any>(null);
  typeDecisionGetByIdApi = api.SYS_OTHERLIST_READ;

  positionGetByIdObject$ = new BehaviorSubject<any>(null);
  positionGetByIdApi = api.HU_POSITION_READ;

  allowanceTypeGetByIdObject$ = new BehaviorSubject<any>(null);
  allowanceTypeGetByIdApi = api.HU_ALLOWANCE_READ;

  employeeObjGetByIdObject$ = new BehaviorSubject<any>(null);
  employeeObjGetByIdApi = api.SYS_OTHERLIST_READ;

  //laborObjGetByIdObject$ = new BehaviorSubject<any>(null);
  //laborObjGetByIdApi = api.SYS_OTHERLIST_READ;

  wageGetByIdObject$ = new BehaviorSubject<any>(null);
  wageGetByIdApi = api.HU_WAGE_READ;

  captionCode!: EnumTranslateKey;
  formComposition!: ICorePageEditColumnComposition[][];
  crud!: ICorePageEditCRUD;

  allowanceTypeTemplate!: TemplateRef<any>;

  functionMccColumns: ICoreTableColumnItem[] = [
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_COMMON_ID,
      field: 'id',
      hidden: true,
      type: 'number',
      align: 'left',
      width: 200,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_POSITION_NAME,
      field: 'name',
      type: 'string',
      align: 'left',
      width: 200,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_POSITION_MASTER,
      field: 'masterName',
      type: 'string',
      align: 'left',
      width: 200,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_POSITION_INTERIM,
      field: 'interimName',
      type: 'string',
      align: 'left',
      width: 200,
    },
  ];

  functionMccApiDefinition: ICorePageListApiDefinition = {
    queryListRelativePath: api.HU_POSITION_QUERY_LIST,
  };
  sections: ICoreFormSection[] = [
    {
      rows: [
        [
          {
            flexSize: 6,
            label: EnumTranslateKey.UI_COMPONENT_LABEL_DECISION_ID,
            field: 'id',
            value: '',
            controlType: EnumFormBaseContolType.TEXTBOX,
            readonly: true,
            hidden: true,
            type: 'text',
          },
          {
            flexSize: 6,
            label: EnumTranslateKey.UI_COMPONENT_LABEL_DECISION_ID,
            field: 'confirmSwapMasterInterim',
            value: '',
            controlType: EnumFormBaseContolType.TEXTBOX,
            readonly: true,
            hidden: true,
            type: 'text',
          },
          {
            // tạo trường này để fix bug vns 898
            flexSize: 1,
            label: EnumTranslateKey.UI_COMPONENT_LABEL_DECISION_ID,
            field: 'orgIdOfEmployee',
            value: '',
            controlType: EnumFormBaseContolType.TEXTBOX,
            hidden: true,
            type: 'text'
          }
        ],
      ],
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_DECISION_EMPLOYEE_INFOR,
      rows: [
        [
          {
            flexSize: 3,
            label: EnumTranslateKey.UI_COMPONENT_LABEL_DECISION_EMPLOYEE_CODE,
            field: 'employeeId',
            value: '',
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
            /* END: WHEN USING controlType === EnumFormBaseContolType.SEEKER */
            type: 'number',
            readonly: true,
            alsoBindTo: [{ takeFrom: 'positionNameOnConcurrently', bindTo: 'positionNameCur' }],
            validators: [
              {
                name: 'required',
                validator: Validators.required,
                errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
              },
            ],
          },
          {
            flexSize: 3,
            label: EnumTranslateKey.UI_COMPONENT_LABEL_DECISION_EMPLOYEE_NAME_CUR,
            field: 'employeeNameCur',
            value: '',
            controlType: EnumFormBaseContolType.TEXTBOX,
            type: 'text',
            disabled: true,
          },
          {
            flexSize: 3,
            label: EnumTranslateKey.UI_COMPONENT_LABEL_DECISION_ORG_NAME_CUR,
            field: 'orgNameCur',
            value: '',
            controlType: EnumFormBaseContolType.TEXTBOX,
            type: 'text',
            disabled: true,
          },
          {
            flexSize: 3,
            label: EnumTranslateKey.UI_COMPONENT_LABEL_DECISION_POSITION_NAME_CUR,
            field: 'positionNameCur',
            value: '',
            controlType: EnumFormBaseContolType.TEXTBOX,
            type: 'text',
            disabled: true,
          },
        ],
        [
          {
            flexSize: 3,
            label: EnumTranslateKey.UI_COMPONENT_LABEL_DECISION_TYPE_NAME_CUR,
            field: 'typeNameCur',
            value: '',
            controlType: EnumFormBaseContolType.TEXTBOX,
            type: 'text',
            disabled: true,
          },
          {
            flexSize: 3,
            label: EnumTranslateKey.UI_COMPONENT_LABEL_DECISION_DECISIONNO_CUR,
            field: 'decisionNoCur',
            value: '',
            controlType: EnumFormBaseContolType.TEXTBOX,
            type: 'text',
            disabled: true,
          },
          {
            flexSize: 3,
            label: EnumTranslateKey.UI_COMPONENT_LABEL_DECISION_EFFECTDATE_CUR,
            field: 'effectDateCur',
            value: '',
            controlType: EnumFormBaseContolType.DATEPICKER,
            type: 'date',
            disabled: true,
          },
          {
            flexSize: 3,
            label: EnumTranslateKey.UI_COMPONENT_LABEL_DECISION_EXPIREDATE_CUR,
            field: 'expireDateCur',
            value: '',
            controlType: EnumFormBaseContolType.DATEPICKER,
            type: 'date',
            disabled: true,
          },
        ],
        [
          {
            flexSize: 3,
            label: EnumTranslateKey.UI_COMPONENT_LABEL_DECISION_WORK_PLACE_CUR,
            field: 'workPlaceNameCur',
            value: '',
            controlType: EnumFormBaseContolType.TEXTBOX,
            type: 'text',
            disabled: true,
          },
          {
            flexSize: 3,
            label: EnumTranslateKey.UI_COMPONENT_LABEL_DECISION_EMPLOYEE_OBJ_CUR,
            field: 'employeeObjCur',
            value: '',
            controlType: EnumFormBaseContolType.TEXTBOX,
            type: 'text',
            disabled: true,
          },
          // {
          //   flexSize: 3,
          //   label: EnumTranslateKey.UI_COMPONENT_LABEL_DECISION_LABOR_OBJ_CUR,
          //   field: 'laborObjCur',
          //   value: '',
          //   controlType: EnumFormBaseContolType.TEXTBOX,
          //   type: 'text',
          //   disabled: true,
          // },
          {
            flexSize: 3,
            label: EnumTranslateKey.UI_COMPONENT_LABEL_DECISION_IS_RESPONSIBLE_CUR,
            field: 'isResponsibleCur',
            value: '',
            controlType: EnumFormBaseContolType.CHECKBOX,
            type: 'boolean',
            disabled: true,
          },
        ],
      ],
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_DECISION_INFOR,
      rows: [
        [
          {
            flexSize: 3,
            label: EnumTranslateKey.UI_COMPONENT_LABEL_DECISION_TYPE_NAME,
            field: 'typeId',
            value: '',
            getByIdObject$: this.typeDecisionGetByIdObject$,
            getByIdApi: this.typeDecisionGetByIdApi,
            shownFrom: 'name',
            controlType: EnumFormBaseContolType.DROPDOWN,
            dropdownOptions$: this.groupOptionsTypeDecision$,
            type: 'number',
            validators: [
              {
                name: 'required',
                validator: Validators.required,
                errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
              },
            ],
          },
          {
            flexSize: 3,
            label: EnumTranslateKey.UI_COMPONENT_LABEL_DECISION_DECISIONNO,
            field: 'decisionNo',
            value: '',
            controlType: EnumFormBaseContolType.TEXTBOX,
            readonly: false,
            type: 'text',
            // validators: [
            //   {
            //     name: 'required',
            //     validator: Validators.required,
            //     errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
            //   },
            //   // {
            //   //   name: 'checkQD',
            //   //   validator: DecisionEditComponent.checkQD,
            //   //   errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
            //   // },
            // ],
          },
          {
            flexSize: 3,
            label: EnumTranslateKey.UI_COMPONENT_LABEL_DECISION_EFFECTDATE,
            field: 'effectDate',
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
                name: 'effectDate',
                validator: DecisionEditComponent.effectDate,
                errorMessage: EnumTranslateKey.UI_FORM_CONTROL_WAGE_ERROR_EFFECTDATE_GREAT_THAN_EXPIREDATE,
              },
            ],
          },
          {
            flexSize: 3,
            label: EnumTranslateKey.UI_COMPONENT_LABEL_DECISION_EXPIREDATE,
            field: 'expireDate',
            value: '',
            controlType: EnumFormBaseContolType.DATEPICKER,
            type: 'date',
            validators: [
              {
                name: 'expireDate',
                validator: DecisionEditComponent.expireDate,
                errorMessage: EnumTranslateKey.UI_FORM_CONTROL_WAGE_ERROR_EXPIREDATE_LESS_THAN_EFFECTDATE,
              },
            ],
          },
        ],
        [
          {
            flexSize: 3,
            label: EnumTranslateKey.UI_COMPONENT_LABEL_DECISION_ORG_NAME,
            field: 'orgId',
            value: '',
            controlType: EnumFormBaseContolType.SEEKER,

            /* 
                START: WHEN USING controlType === EnumFormBaseContolType.SEEKER
                we must pass the three properties bellow:
               */
            seekerSourceType: EnumCoreFormControlSeekerSourceType.ORGANIZATION_UNIT_SEEK,
            getByIdObject$: this.orgUnitGetByIdObject$,
            getByIdApi: this.orgUnitGetByIdApi,
            boundFrom: 'id',
            shownFrom: 'name',
            /* END: WHEN USING controlType === EnumFormBaseContolType.SEEKER */
            type: 'text',
            readonly: true,
            validators: [
              {
                name: 'required',
                validator: Validators.required,
                errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
              },
            ],
          },
          // {
          //   flexSize: 3,
          //   label: EnumTranslateKey.UI_COMPONENT_LABEL_DECISION_POSITION_NAME,
          //   field: 'positionId',
          //   value: '',
          //   getByIdObject$: this.positionGetByIdObject$,
          //   getByIdApi: this.positionGetByIdApi,
          //   shownFrom: 'name',
          //   controlType: EnumFormBaseContolType.DROPDOWN,
          //   dropdownOptions$: this.groupOptionsPosition$,
          //   type: 'number',
          //   validators: [
          //     {
          //       name: 'required',
          //       validator: Validators.required,
          //       errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
          //     }
          //   ],
          // },

          {
            flexSize: 3,
            label: EnumTranslateKey.UI_COMPONENT_LABEL_DECISION_POSITION_NAME,
            field: 'positionId',
            value: null,
            controlType: EnumFormBaseContolType.MCC,
            columns: this.functionMccColumns,
            shownFrom: 'name',
            apiDefinition: this.functionMccApiDefinition,
            getByIdApi: this.positionGetByIdApi,
            outerParam$: this.outerParamMCC$,
            type: 'number',
            validators: [
              {
                name: 'required',
                validator: Validators.required,
                errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
              },
            ],
          },
          {
            flexSize: 3,
            label: EnumTranslateKey.UI_COMPONENT_LABEL_DECISION_WORKPLACE_NAME,
            field: 'workPlaceName',
            value: '',
            controlType: EnumFormBaseContolType.TEXTBOX,
            type: 'text',
            disabled: true,
          },
          {
            flexSize: 3,
            label: EnumTranslateKey.UI_COMPONENT_LABEL_DECISION_EMPLOYEE_OBJ_NAME,
            field: 'employeeObjId',
            value: '',
            getByIdObject$: this.employeeObjGetByIdObject$,
            getByIdApi: this.employeeObjGetByIdApi,
            shownFrom: 'name',
            controlType: EnumFormBaseContolType.DROPDOWN,
            dropdownOptions$: this.groupOptionsEmployeeObj$,
            type: 'number',
            validators: [
              {
                name: 'required',
                validator: Validators.required,
                errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
              },
            ],
          },
        ],
        [
          // {
          //   flexSize: 3,
          //   label: EnumTranslateKey.UI_COMPONENT_LABEL_DECISION_LABOR_OBJ_NAME,
          //   field: 'laborObjId',
          //   value: '',
          //   getByIdObject$: this.laborObjGetByIdObject$,
          //   getByIdApi: this.laborObjGetByIdApi,
          //   shownFrom: 'name',
          //   controlType: EnumFormBaseContolType.DROPDOWN,
          //   dropdownOptions$: this.groupOptionsLaborObj$,
          //   type: 'number',
          //   validators: [
          //     {
          //       name: 'required',
          //       validator: Validators.required,
          //       errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
          //     }
          //   ],
          // },

          {
            flexSize: 3,
            label: EnumTranslateKey.UI_COMPONENT_LABEL_DECISION_WAGE,
            field: 'wageId',
            value: '',
            controlType: EnumFormBaseContolType.SEEKER,

            /* 
                START: WHEN USING controlType === EnumFormBaseContolType.SEEKER
                we must pass the three properties bellow:
               */
            seekerSourceType: EnumCoreFormControlSeekerSourceType.WAGE_SEEK,
            preDefinedOuterParam$: this.workingPreDefinedOuterParam$,
            getByIdObject$: this.wageGetByIdObject$,
            getByIdApi: this.wageGetByIdApi,
            boundFrom: 'id',
            shownFrom: 'decisionNo',
            type: 'text',
            // readonly: true,
            // validators: [
            //   {
            //     name: 'required',
            //     validator: Validators.required,
            //     errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
            //   },
            // ],
          },
          {
            flexSize: 3,
            label: EnumTranslateKey.UI_COMPONENT_LABEL_DECISION_IS_RESPONSIBLE,
            field: 'isResponsible',
            value: true,
            controlType: EnumFormBaseContolType.CHECKBOX,
            type: 'boolean',
          },
        ],
      ],
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_DECISION_INFOR_APPROVE,
      rows: [
        [
          {
            flexSize: 3,
            label: EnumTranslateKey.UI_COMPONENT_LABEL_DECISION_STATUS,
            field: 'statusId',
            value: 993,
            getByIdObject$: this.sysOtherlistGetByIdObject$,
            getByIdApi: this.sysOtherlistGetByIdApi,
            shownFrom: 'name',
            controlType: EnumFormBaseContolType.DROPDOWN,
            dropdownOptions$: this.groupOptionsStatus$,
            type: 'number',
            validators: [
              {
                name: 'required',
                validator: Validators.required,
                errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
              },
            ],
          },

          // {
          //   flexSize: 3,
          //   label: EnumTranslateKey.UI_COMPONENT_LABEL_DECISION_BASEDATE,
          //   field: 'baseDate',
          //   value: '',
          //   controlType: EnumFormBaseContolType.DATEPICKER,
          //   type: 'date',
          //   validators: [
          //     {
          //       name: 'required',
          //       validator: Validators.required,
          //       errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
          //     }
          //   ]
          // },

          // {
          //   flexSize: 3,
          //   label: EnumTranslateKey.UI_COMPONENT_LABEL_DECISION_ISSUEDDATE,
          //   field: 'issuedDate',
          //   value: '',
          //   controlType: EnumFormBaseContolType.DATEPICKER,
          //   type: 'date',
          //   validators: [
          //     {
          //       name: 'required',
          //       validator: Validators.required,
          //       errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
          //     }
          //   ]
          // },

          // {
          //   flexSize: 3,
          //   label: EnumTranslateKey.UI_COMPONENT_LABEL_DECISION_CREATEDDATEDECISION,
          //   field: 'createdDateDecision',
          //   value: '',
          //   controlType: EnumFormBaseContolType.DATEPICKER,
          //   type: 'date',
          //   validators: [
          //     {
          //       name: 'required',
          //       validator: Validators.required,
          //       errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
          //     }
          //   ]
          // },
        ],
        [
          {
            flexSize: 3,
            label: EnumTranslateKey.UI_COMPONENT_LABEL_DECISION_SIGNDATE,
            field: 'signDate',
            value: '',
            controlType: EnumFormBaseContolType.DATEPICKER,
            type: 'date',
          },
          {
            flexSize: 3,
            label: EnumTranslateKey.UI_COMPONENT_LABEL_DECISION_SIGNERNAME,
            field: 'signId',
            value: '',
            controlType: EnumFormBaseContolType.SEEKER,

            /* 
                START: WHEN USING controlType === EnumFormBaseContolType.SEEKER
                we must pass the three properties bellow:
               */
            seekerSourceType: EnumCoreFormControlSeekerSourceType.EMPLOYEE_SEEK,
            getByIdObject$: this.signGetByIdObject$,
            getByIdApi: this.signGetByIdApi,
            boundFrom: 'id',
            shownFrom: 'fullname',
            alsoBindTo: [{ takeFrom: 'positionName', bindTo: 'signerPosition' }],
            /* END: WHEN USING controlType === EnumFormBaseContolType.SEEKER */
            type: 'text',
            readonly: true,
          },
          {
            flexSize: 3,
            label: EnumTranslateKey.UI_COMPONENT_LABEL_DECISION_SIGNER_POSITION,
            field: 'signerPosition',
            value: '',
            controlType: EnumFormBaseContolType.TEXTBOX,
            type: 'text',
            disabled: true,
          },
          {
            flexSize: 3,
            label: EnumTranslateKey.UI_COMPONENT_LABEL_DECISION_UPLOAD_FILE,
            field: 'attachmentBuffer',
            value: null,
            controlType: EnumFormBaseContolType.ATTACHMENT,
            assignTo: 'attachment',
            type: 'object',
          },
        ],
        [
          {
            flexSize: 12,
            label: EnumTranslateKey.UI_COMPONENT_LABEL_DECISION_NOTE,
            field: 'note',
            value: '',
            controlType: EnumFormBaseContolType.TEXTBOX,
            readonly: false,
            type: 'text',
          },
        ],
      ],
    },
  ];
  selectedData: any;
  
  constructor(
    //private _coreService: CoreService,
    public override dialogService: DialogService,
    private mls: MultiLanguageService,
    private commonHttpRequestService: CommonHttpRequestService,
    private responseService: ResponseService,
    private appService: AppService, // CoreService is DEPRECATED!!!
    private alertService: AlertService,
    private router : Router,
    private organizationService: OrganizationService
  ) {
    super(dialogService);
    if(this.router.getCurrentNavigation()?.extras?.state){
      this.selectedData = this.router.getCurrentNavigation()?.extras.state!['selectedData'];
    }
    this.captionCode = EnumTranslateKey.UI_COMPONENT_TITLE_DECISION_EDIT;

    this.crud = {
      c: api.HU_DECISION_CREATE,
      r: api.HU_DECISION_READ,
      u: api.HU_DECISION_UPDATE,
      d: api.HU_DECISION_DELETE,
    };

    this.appService.get(api.SYS_OTHER_LIST_GET_ID_STATUS_BY_CODE + "DD").subscribe(res => {
      this.id_status_approve = res.body.innerBody.id;   // it could be 994
    });
  }
  ngOnInit(): void {
    this.loading = true;

    this.workingPreDefinedOuterParam$.next({
      employeeId: 0,
    });
    /* Each subscribe() need to be in one this.subscriptions.push */

    // End PUSHING 1ST Subsctiption

    // Start PUSHING 2ND Subsctiption
    this.subscriptions.push(
      this.appService.get(api.SYS_OTHERLIST_GETOTHERLISTBYTYPE + 'STATUS').subscribe((res: any) => {
        if (!!res.ok && res.status === 200) {
          const body: IFormatedResponse = res.body;
          if (body.statusCode === 200 && !!body.innerBody) {
            // ONLY THEN YOU WILL IMPLEMENT YOUR LOGICS
            const options: { value: number | null; text: string }[] = [];
            options.push({
              value: Number(),
              text: '',
            });
            res.body.innerBody.map((g: any) => {
              options.push({
                value: g.id,
                text: g.name,
              });
            });
            this.groupOptionsStatus$.next(options);
          }
        }
      }),
    ); // <==== DO NOT FORGET TO CLOSE PUSH FOR EACH SUBSCRIBE()

    // Start PUSHING 3RD Subsctiption
    this.subscriptions.push(
      this.appService.get(api.SYS_OTHERLIST_GETOTHERLISTBYTYPE + 'TYPE_DECISION').subscribe((res: any) => {
        if (!!res.ok && res.status === 200) {
          const body: IFormatedResponse = res.body;
          if (body.statusCode === 200 && !!body.innerBody) {
            const options: { value: number | null; text: string }[] = [];
            options.push({
              value: Number(),
              text: '',
            });
            res.body.innerBody.map((g: any) => {
              options.push({
                value: g.id,
                text: g.name,
              });
            });
            this.groupOptionsTypeDecision$.next(options);
          }
        }
      }),
    ); // <==== DO NOT FORGET TO CLOSE PUSH FOR EACH SUBSCRIBE()

    // Start PUSHING 4RD Subsctiption
    this.subscriptions.push(
      this.appService.get(api.SYS_OTHERLIST_GETOTHERLISTBYTYPE + 'OBJECT_EMPLOYEE').subscribe((res: any) => {
        if (!!res.ok && res.status === 200) {
          const body: IFormatedResponse = res.body;
          if (body.statusCode === 200 && !!body.innerBody) {
            const options: { value: number | null; text: string }[] = [];
            options.push({
              value: Number(),
              text: '',
            });
            res.body.innerBody.map((g: any) => {
              options.push({
                value: g.id,
                text: g.name,
              });
            });
            this.groupOptionsEmployeeObj$.next(options);
          }
        }
      }),
    ); // <==== DO NOT FORGET TO CLOSE PUSH FOR EACH SUBSCRIBE()

    // Start PUSHING 5RD Subsctiption
    // this.subscriptions.push(
    //   this.appService
    //   .get(api.SYS_OTHERLIST_GETOTHERLISTBYTYPE + 'OBJECT_LABOR')
    //   .subscribe((res: any) => {

    //     if (!!res.ok && res.status === 200) {
    //       const body: IFormatedResponse = res.body
    //       if (body.statusCode === 200 && !!body.innerBody) {

    //     const options: { value: number | null; text: string; }[] = [];
    //     options.push({
    //       value: Number(),
    //       text: ''
    //     })
    //     res.body.innerBody.map((g: any) => {
    //       options.push({
    //         value: g.id,
    //         text: g.name
    //       })
    //     })
    //     this.groupOptionsLaborObj$.next(options);
    //   }}
    //   })
    // ) // <==== DO NOT FORGET TO CLOSE PUSH FOR EACH SUBSCRIBE()
    
  }

  ngAfterViewInit(): void {
  }
  /* To allow form to be deactivated */
  onFormReinit(e: string): void {
    this.formInitStringValue = e;
  }
  /* GET FormGroup Instance */
  onFormCreated = (e: FormGroup) => {
    this.form = e;
    if(!!this.selectedData){
      this.subscriptions.push(
        this.appService.get(api.HU_DECISION_READ + `?id=${this.selectedData[0].id}`).subscribe((x : any) => {
          this.form.patchValue(x.body.innerBody)
          this.appService.get(this.employeeGetByIdApi + `?id=${this.selectedData[0].employeeId}`).subscribe((y : any) => {
            this.employeeGetByIdObject$.next(y.body.innerBody)

          })
          this.appService.get(api.HU_WAGE_READ + `?id=${this.selectedData[0].wageId}`).subscribe((z : any) => {
            this.wageGetByIdObject$.next(z.body.innerBody)
          })
          
          this.form.get('id')?.setValue(0)
          this.form.get('decisionNo')?.setValue(null)
          this.form.get('effectDate')?.setValue(null)
        })
      )
    }
   
    setTimeout(() => {
      if(!!!this.selectedData){
        if (this.form.get('id')?.value == '') {
          this.subscriptions.push(
            // <== Inner push
            this.appService.get(api.HU_DECISION_GETDECISIONNOWORKING).subscribe((o) => {
              if (o.ok && o.status === 200) {
                const body: IFormatedResponse = o.body;
                if (body.statusCode === 200 && !!body.innerBody) {
                  this.form.get('decisionNo')?.setValue(body.innerBody.code);
                } else {
                  this.form.get('decisionNo')?.setValue('');
                }
              }
            }),
          );
        } else {
          if (this.form.get('id')?.value && !!this.form.get('statusId')?.value && this.form.get('statusId')?.value == 994) {
            this.form.disable();
          }
        }
      }
    }, 1500);
    this.subscriptions.push(
      // <== Outer push
      this.form
        .get('orgId')
        ?.valueChanges.pipe(distinctUntilChanged())
        .subscribe((x) => {
          if (!!x) {
            this.subscriptions.push(
              // <== Inner push
              this.appService.get(this.orgUnitGetByIdApi + '?id=' + x).subscribe((o) => {
                if (o.ok && o.status === 200) {
                  const body: IFormatedResponse = o.body;
                  if (body.statusCode === 200 && !!body.innerBody) {
                    this.orgUnitGetByIdObject$.next(body.innerBody);
                  } else {
                    //this.responseService.resolve(body);
                  }
                }
              }),
            );

            //   this.subscriptions.push( // <== Inner push
            //   this.appService
            //   .get(api.HU_POSITION_BY_ORGID + x)
            //   .subscribe((res: any) => {
            //     if (!!res.ok && res.status === 200) {
            //       const body: IFormatedResponse = res.body
            //       if (body.statusCode === 200 && !!body.innerBody) {
            //     const options: { value: number | null; text: string; }[] = [];
            //     options.push({
            //       value: 0,
            //       text: ''
            //     })
            //     res.body.innerBody.map((g: any) => {
            //       options.push({
            //         value: g.id,
            //         text: g.name
            //       })
            //     })
            //     this.groupOptionsPosition$.next(options);
            //   }
            // }

            //   })
            //   ) // Close inner push

            this.outerParamMCC$.next({
              orgId: x,
            });
            this.form.get('positionId')?.setValue(this.form.get('positionId')?.value);
          } else {
            //this.form.get('userName')?.disable()
            //this.form.get('fullname')?.disable()
          }
        })!,
    );
    
    this.subscriptions.push(
      // <== Outer push
      this.form
        .get('employeeId')
        ?.valueChanges.pipe(distinctUntilChanged())
        .subscribe((x) => {
          if (!!x) {
            this.form.get('employeeId')?.patchValue(x);
            this.workingPreDefinedOuterParam$.next({
              employeeId: x,
              statusId: this.id_status_approve
            });
            var id = this.form.get('id')?.value;
            var effectDate = this.form.get('effectDate')?.value;
            var url = '';
            if (!!id) {
              url = api.HU_DECISION_GETWORKINGOLD + x + '&id=' + id;
            } else {
              url = api.HU_DECISION_GETWORKINGOLD + x;
            }
            this.subscriptions.push(
              this.appService.get(url).subscribe((res: any) => {
                if (!!res.ok && res.status === 200) {
                  const body: IFormatedResponse = res.body;
                  if (body.statusCode === 200 && !!body.innerBody) {
                    this.form.get('employeeNameCur')?.patchValue(body.innerBody.employeeName);
                    this.form.get('orgNameCur')?.patchValue(body.innerBody.orgName);
                    this.form.get('positionNameCur')?.patchValue(body.innerBody.positionName);
                    this.form.get('typeNameCur')?.patchValue(body.innerBody.typeName);
                    this.form.get('decisionNoCur')?.patchValue(body.innerBody.decisionNo);
                    this.form.get('effectDateCur')?.patchValue(body.innerBody.effectDate);
                    this.form.get('expireDateCur')?.patchValue(body.innerBody.expireDate);
                    this.form.get('workPlaceNameCur')?.patchValue(body.innerBody.workPlaceName);
                    this.form.get('employeeObjCur')?.patchValue(body.innerBody.employeeObjName);
                    //this.form.get('laborObjCur')?.patchValue(body.innerBody.laborObjName);
                    this.form.get('isResponsibleCur')?.patchValue(body.innerBody.isResponsible);
                    //when created
                    if (!id) {
                      this.form.get('orgId')?.patchValue(body.innerBody.orgId);
                      this.form.get('positionId')?.patchValue(body.innerBody.positionId);
                      this.form.get('workPlaceName')?.patchValue(body.innerBody.workPlaceName);
                      this.form.get('employeeObjId')?.patchValue(body.innerBody.employeeObjId);
                      //this.form.get('laborObjId')?.patchValue(body.innerBody.laborObjId);
                    }
                  }
                }
              }),
            ); // Close inner push
          } else {
            //this.form.get('userName')?.disable()
            //this.form.get('fullname')?.disable()
          }
        })!,
    );
    this.form
      .get('positionId')
      ?.valueChanges.pipe(distinctUntilChanged())
      .pipe(
        filter((_) => {
          const touched = this.form.get('positionId')?.touched;
          return !!touched;
        }),
      )
      .subscribe((x) => {
        if (!!x) {
          const effectDate = new Date(this.form.get('effectDate')?.value);
          this.appService
            .post(api.HU_DECISION_CHECKDECISIONMASTER, {
              positionId: x,
              effectDate: effectDate,
              employeeId: this.form.get('employeeId')?.value,
            })
            .subscribe((res: any) => {
              if (!!res.ok && res.status === 200) {
                const body: IFormatedResponse = res.body;
                if (body.statusCode === 200 && !!body.innerBody) {
                  const confirm = window.confirm(this.mls.trans('common.confirm.decisionmaster.swap.masterinterim') + '?');
                  if (confirm) {
                    this.form.get('confirmSwapMasterInterim')?.setValue(1);
                  } else {
                    this.form.get('confirmSwapMasterInterim')?.setValue(0);
                  }
                  // this.form.get('confirmSwapMasterInterim')?.setValue(0);
                  // this.alertService.warn(
                  //   this.mls.trans('DO_NOT_ASSIGN_THIS_POSITION'),
                  //   this.alertOptions
                  // );
                } else if (body.statusCode != 204) {
                  this.form.get('confirmSwapMasterInterim')?.setValue(0);
                } else if (body.statusCode == 204) {
                  this.form.get('confirmSwapMasterInterim')?.setValue(1);
                }
              }
            });
        }
      });
    this.form
      .get('effectDate')
      ?.valueChanges.pipe(distinctUntilChanged())
      .pipe(
        filter((_) => {
          const touched = this.form.get('effectDate')?.touched;
          return !!touched;
        }),
      )
      .subscribe((x) => {
        if (!!x) {
          const effectDate = new Date(x);
          this.form.get('signDate')?.setValue(effectDate);
          const positionId = this.form.get('positionId')?.value;
          this.appService
            .post(api.HU_DECISION_CHECKDECISIONMASTER, {
              positionId: positionId,
              effectDate: effectDate,
              employeeId: this.form.get('employeeId')?.value,
            })
            .subscribe((res: any) => {
              if (!!res.ok && res.status === 200) {
                const body: IFormatedResponse = res.body;
                if (body.statusCode === 200 && !!body.innerBody) {
                  const confirm = window.confirm(this.mls.trans('common.confirm.decisionmaster.swap.masterinterim') + '?');
                  if (confirm) {
                    this.form.get('confirmSwapMasterInterim')?.setValue(1);
                  } else {
                    this.form.get('confirmSwapMasterInterim')?.setValue(0);
                  }
                  // this.form.get('confirmSwapMasterInterim')?.setValue(0);
                  // this.alertService.warn(
                  //   this.mls.trans('DO_NOT_ASSIGN_THIS_POSITION'),
                  //   this.alertOptions
                  // );
                } else if (body.statusCode != 204) {
                  this.form.get('confirmSwapMasterInterim')?.setValue(0);
                } else if (body.statusCode == 204) {
                  this.form.get('confirmSwapMasterInterim')?.setValue(1);
                }
              }
            });
        }
      });

    
    this.subscriptions.push(
      this.form.get("employeeId")?.valueChanges.subscribe(x => {
        this.appService.get(api.HU_EMPLOYEE_READ + "?id=" + x).subscribe(res => {
          this.form.get("orgIdOfEmployee")?.setValue(res.body.innerBody.orgId);
        });        
      })!
    );
    
    this.subscriptions.push(
      this.form.get("orgId")?.valueChanges.subscribe(x => {
        this.organizationService.status$.value.activeKeys[0] = this.form.get("orgIdOfEmployee")?.value.toString();
      })!
    );

  };

  ngOnDestroy(): void {
    this.subscriptions.map((x) => x?.unsubscribe());
  }

  protected static effectDate(date: AbstractControl): any | null {
    let valid = true;
    let errorMessage = '';
    const effectDate = date.value;
    const expireDate = date.parent?.get('expireDate')?.value;
    if (expireDate != '' && expireDate != null && effectDate != null) {
      if (effectDate > new Date(expireDate)) {
        valid = false;
        errorMessage = EnumTranslateKey.UI_FORM_CONTROL_WAGE_ERROR_EFFECTDATE_GREAT_THAN_EXPIREDATE;
        return CustomValidators.core('effectDate', false, errorMessage)(date);
      } else {
        date.parent?.get('effectDate')?.setErrors(null);
        date.parent?.get('expireDate')?.setErrors(null);
      }
    }
  }

  protected static expireDate(date: AbstractControl): any | null {
    let valid = true;
    let errorMessage = '';
    const effectDate = date.parent?.get('effectDate')?.value;
    const expireDate = date.value;
    if (expireDate != '' && expireDate != null) {
      if (effectDate != '' && effectDate != null && expireDate < new Date(effectDate)) {
        valid = false;
        errorMessage = EnumTranslateKey.UI_FORM_CONTROL_WAGE_ERROR_EXPIREDATE_LESS_THAN_EFFECTDATE;
        return CustomValidators.core('expireDate', false, errorMessage)(date);
      } else {
        date.parent?.get('effectDate')?.setErrors(null);
        date.parent?.get('expireDate')?.setErrors(null);
      }
    } else {
      //date.parent?.get("effectDate")?.setErrors(null);
      date.parent?.get('expireDate')?.setErrors(null);
    }
  }
  // static checkQD(qd: AbstractControl):any|null{
  //   const reg = /[\w]*\/QĐ-VNS(\W|$)/g;
  //   let valid = true;
  //   let errorMessage = "";
  //   if(!reg.test(qd.value)){
  //     valid = false;
  //     errorMessage =EnumTranslateKey.UI_COMPONENT_LABEL_QD_NO_QT;
  //   }
  //   return CustomValidators.core("expireDate", false,errorMessage)(qd)
  // }
}
