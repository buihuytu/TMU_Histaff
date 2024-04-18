import { AfterViewInit, Component, OnDestroy, OnInit, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { EnumTranslateKey, api } from 'alpha-global-constants';
import { AppService, BaseEditComponent, CustomValidators, DialogService, EnumCoreFormControlSeekerSourceType, EnumCoreTablePipeType, EnumFormBaseContolType, ICoreChecklistOption, ICoreDropdownOption, ICoreFormSection, ICorePageEditCRUD, ICorePageEditColumnComposition, IFormatedResponse, MultiLanguageService } from 'ngx-histaff-alpha';
import { Subscription, BehaviorSubject, distinctUntilChanged, filter } from 'rxjs';

@Component({
  selector: 'app-wage-edit',
  templateUrl: './wage-edit.component.html',
  styleUrls: ['./wage-edit.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
})
export class WageEditComponent extends BaseEditComponent implements OnInit, AfterViewInit, OnDestroy {

  /* Properties to be passed into core-page-edit */
  override entityTable = "HU_WORKING";

  @ViewChild('allowanceType') allowanceType!: TemplateRef<any>; // Tham chiếu đến template

  loading: boolean = false;
  bufferForm!: FormGroup;
  subscriptions: Subscription[] = [];
  defauleValueTaxtable: number = 1006; // sửa thánh getIdbycode sau
  defauleValueStatus: number = 993; // sửa thánh getIdbycode sau
  groupOptionsSalType$ = new BehaviorSubject<ICoreDropdownOption[]>([]);
  groupOptionsSalScale$ = new BehaviorSubject<ICoreDropdownOption[]>([]);
  groupOptionsSalRank$ = new BehaviorSubject<ICoreDropdownOption[]>([]);
  groupOptionsSalLevel$ = new BehaviorSubject<ICoreDropdownOption[]>([]);
  groupOptionsPosition$ = new BehaviorSubject<ICoreDropdownOption[]>([]);
  groupOptionsStatus$ = new BehaviorSubject<ICoreDropdownOption[]>([]);
  groupOptionsTitle$ = new BehaviorSubject<ICoreDropdownOption[]>([]);
  groupOptionsTypeWage$ = new BehaviorSubject<ICoreDropdownOption[]>([]);
  groupOptionsAllowanceType$ = new BehaviorSubject<ICoreDropdownOption[]>([]);
  groupOptionsTaxtable$ = new BehaviorSubject<ICoreDropdownOption[]>([]);
  groupOptionsRegion$ = new BehaviorSubject<ICoreDropdownOption[]>([]);
  groupOptionsSalScaleDCV$ = new BehaviorSubject<ICoreDropdownOption[]>([]);
  groupOptionsSalRankDCV$ = new BehaviorSubject<ICoreDropdownOption[]>([]);
  groupOptionsSalLevelDCV$ = new BehaviorSubject<ICoreDropdownOption[]>([]);
  groupOptionsEmployeeObj$ = new BehaviorSubject<ICoreDropdownOption[]>([]);

  checklistOptions$ = new BehaviorSubject<ICoreChecklistOption[]>([
    {
      value: 1,
      text: "BHXH",
      checked: true
    },
    {
      value: 2,
      text: "BHYT",
      checked: true
    },
    {
      value: 3,
      text: "BHTNLĐ-BN",
      checked: true
    },
    {
      value: 4,
      text: "BHTN",
      checked: true
    },
  ])
  //subscriptionsStatus: Subscription[] = [];
  bhtypeGetByIdObject$ = new BehaviorSubject<any>(null);
  bhtypeGetByIdApi = null;

  employeeGetByIdObject$ = new BehaviorSubject<any>(null);
  employeeGetByIdApi = api.HU_EMPLOYEE_READ;

  groupOptionGetByIdApi = api.SYS_OTHERLIST_READ;
  groupOptionGetByIdObject$ = new BehaviorSubject<any>(null);


  signGetByIdObject$ = new BehaviorSubject<any>(null);
  signGetByIdApi = api.HU_EMPLOYEE_READ;

  employeeObjGetByIdObject$ = new BehaviorSubject<any>(null);
  employeeObjGetByIdApi = api.SYS_OTHERLIST_READ;

  orgUnitGetByIdObject$ = new BehaviorSubject<any>(null);
  orgUnitGetByIdApi = api.OM_ORGANIZATION_READ;

  salScaleGetByIdObject$ = new BehaviorSubject<any>(null);
  salScaleGetByIdApi = api.HU_SALARY_SCALE_READ;

  salRankGetByIdObject$ = new BehaviorSubject<any>(null);
  salRankGetByIdApi = api.HU_SALARY_RANK_READ;

  salLevelGetByIdObject$ = new BehaviorSubject<any>(null);
  salLevelGetByIdApi = api.HU_SALARY_LEVEL_READ;

  statusGetByIdObject$ = new BehaviorSubject<any>(null);
  statusGetByIdApi = api.SYS_OTHERLIST_READ;

  typeWageGetByIdObject$ = new BehaviorSubject<any>(null);
  typeWageGetByIdApi = api.SYS_OTHERLIST_READ;

  taxTableGetByIdObject$ = new BehaviorSubject<any>(null);
  taxTableGetByIdApi = api.SYS_OTHERLIST_READ;

  allowanceTypeGetByIdObject$ = new BehaviorSubject<any>(null);
  allowanceTypeGetByIdApi = api.HU_ALLOWANCE_READ;

  salScaleDCVGetByIdObject$ = new BehaviorSubject<any>(null);
  salScaleDCVGetByIdApi = api.HU_SALARY_SCALE_READ;

  salRankDCVGetByIdObject$ = new BehaviorSubject<any>(null);
  salRankDCVGetByIdApi = api.HU_SALARY_RANK_READ;

  salLevelDCVGetByIdObject$ = new BehaviorSubject<any>(null);
  salLevelDCVGetByIdApi = api.HU_SALARY_RANK_READ;

  salaryTypeGetByIdObject$ = new BehaviorSubject<any>(null);
  salaryTypeGetByIdApi = api.HU_SALARY_TYPE_READ;

  captionCode!: EnumTranslateKey;
  formComposition!: ICorePageEditColumnComposition[][];
  crud!: ICorePageEditCRUD;

  allowanceTypeTemplate!: TemplateRef<any>;

  // Chuyển hàm callback thành arrow function. Và đặt định nghĩa này trước khi khai báo phần Sections cho form chính
  // Nếu dùng "onBufferFormCreated(form: FormGroup) {} như cũ thì từ this.appService sẽ bị undefined
  onBufferFormCreated = (form: FormGroup) => {
    this.bufferForm = form;
  }

  sections: ICoreFormSection[] =
    [
      {
        rows: [
          [
            {
              flexSize: 6,
              label: EnumTranslateKey.UI_COMPONENT_LABEL_WAGE_ID,
              field: 'id',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              readonly: true,
              hidden: true,
              type: 'text'
            },
            {
              flexSize: 0,
              label: EnumTranslateKey.UI_COMPONENT_LABEL_WAGE_EMPLOYEE_NAME,
              field: 'religionId',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              type: 'text',
              readonly: true,
              hidden: true,
            },
          ],
        ]
      },
      {
        caption: EnumTranslateKey.UI_COMPONENT_LABEL_WAGE_EMPLOYEE_INFOR,
        rows: [
          [
            {
              flexSize: 3,
              label: EnumTranslateKey.UI_COMPONENT_LABEL_WAGE_EMPLOYEE_CODE,
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
              alsoBindTo: [{ takeFrom: 'fullname', bindTo: 'employeeName' },
              { takeFrom: 'orgName', bindTo: 'orgName' },
              { takeFrom: 'positionName', bindTo: 'positionName' },
              { takeFrom: 'religionName', bindTo: 'regionName' },
              { takeFrom: 'orgId', bindTo: 'orgId' },
              { takeFrom: 'religionId', bindTo: 'religionId' },
              ],
              /* END: WHEN USING controlType === EnumFormBaseContolType.SEEKER */
              type: 'text',
              readonly: true,
              validators: [
                {
                  name: 'required',
                  validator: Validators.required,
                  errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
                }
              ],
            },
            {
              flexSize: 3,
              label: EnumTranslateKey.UI_COMPONENT_LABEL_WAGE_EMPLOYEE_NAME,
              field: 'employeeName',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              type: 'text',
              readonly: false,
              disabled: true,
              validators: [
                {
                  name: 'required',
                  validator: Validators.required,
                  errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
                }
              ],
            },
            {
              flexSize: 3,
              label: EnumTranslateKey.UI_COMPONENT_LABEL_WAGE_ORG_NAME,
              field: 'orgName',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              type: 'text',
              readonly: false,
              disabled: true,
              validators: [
                {
                  name: 'required',
                  validator: Validators.required,
                  errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
                }
              ],
            },
            {
              flexSize: 3,
              label: EnumTranslateKey.UI_COMPONENT_LABEL_WAGE_JOB_NAME,
              field: 'positionName',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              type: 'text',
              readonly: false,
              disabled: true,
              validators: [
                {
                  name: 'required',
                  validator: Validators.required,
                  errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
                }
              ],
            },
          ],
          [
            {
              flexSize: 3,
              label: EnumTranslateKey.UI_COMPONENT_LABEL_WAGE_TYPE_NAME,
              field: 'typeId',
              value: '',
              getByIdObject$: this.typeWageGetByIdObject$,
              getByIdApi: this.typeWageGetByIdApi,
              shownFrom: 'name',
              controlType: EnumFormBaseContolType.DROPDOWN,
              dropdownOptions$: this.groupOptionsTypeWage$,
              type: 'number',
              validators: [
                {
                  name: 'required',
                  validator: Validators.required,
                  errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
                }
              ],
            },
            {
              flexSize: 3,
              label: EnumTranslateKey.UI_COMPONENT_LABEL_WAGE_DECISIONNO,
              field: 'decisionNo',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              type: 'text',
              validators: [
                {
                  name: 'required',
                  validator: Validators.required,
                  errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
                }
              ],
            },
            {
              flexSize: 3,
              label: EnumTranslateKey.UI_COMPONENT_LABEL_WAGE_EFFECTDATE,
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
                  validator: WageEditComponent.effectDate,
                  errorMessage: EnumTranslateKey.UI_FORM_CONTROL_WAGE_ERROR_EFFECTDATE_GREAT_THAN_EXPIREDATE,
                },
              ]
            },
            {
              flexSize: 3,
              label: EnumTranslateKey.UI_COMPONENT_LABEL_WAGE_EXPIREDATE,
              field: 'expireDate',
              value: '',
              controlType: EnumFormBaseContolType.DATEPICKER,
              type: 'date',
              validators: [
                {
                  name: 'expireDate',
                  validator: WageEditComponent.expireDate,
                  errorMessage: EnumTranslateKey.UI_FORM_CONTROL_WAGE_ERROR_EXPIREDATE_LESS_THAN_EFFECTDATE,
                },
              ]
            },
          ],
          [

            {
              flexSize: 3,
              label: EnumTranslateKey.UI_COMPONENT_LABEL_WAGE_UPLOAD_FILE,
              field: 'attachmentBuffer',
              value: null,
              controlType: EnumFormBaseContolType.ATTACHMENT,
              assignTo: 'attachment',
              type: 'object',
            },
            {
              flexSize: 3,
              label: EnumTranslateKey.UI_COMPONENT_LABEL_WAGE_LIST_CHECK_INS,
              field: 'lstCheckIns',
              value: [1, 2, 3, 4],
              controlType: EnumFormBaseContolType.CHECKLIST,
              checklistOptions$: this.checklistOptions$,
              getByIdObject$: this.bhtypeGetByIdObject$,
              type: 'text',
              shownFrom: 'text',
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
          ]
        ]
      },
      {
        caption: EnumTranslateKey.UI_COMPONENT_LABEL_WAGE_INFOR_SALARY,
        rows:
          [
            [
              {
                flexSize: 3,
                label: EnumTranslateKey.UI_COMPONENT_LABEL_FIXED_SALARY,
                field: 'shortTempSalary',
                value: '',
                controlType: EnumFormBaseContolType.CURRENCY,
                pipe: EnumCoreTablePipeType.NUMBER,
                type: 'number'
              },
              {
                flexSize: 3,
                label: EnumTranslateKey.UI_COMPONENT_LABEL_WAGE_TAXTABLE,
                field: 'taxtableId',
                value: this.defauleValueTaxtable,
                getByIdObject$: this.taxTableGetByIdObject$,
                getByIdApi: this.taxTableGetByIdApi,
                shownFrom: 'name',
                controlType: EnumFormBaseContolType.DROPDOWN,
                dropdownOptions$: this.groupOptionsTaxtable$,
                type: 'number',
                validators: [
                  {
                    name: 'required',
                    validator: Validators.required,
                    errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
                  }
                ],
              },
              {
                flexSize: 3,
                label: EnumTranslateKey.UI_COMPONENT_LABEL_WAGE_REGION,
                field: 'regionName',
                value: '',
                type: 'text',
                controlType: EnumFormBaseContolType.TEXTBOX,
                readonly: false,
                disabled: true,
              },
              {
                flexSize: 3,
                label: EnumTranslateKey.UI_COMPONENT_LABEL_REGION_MINIMUM_WAGE,
                field: 'regionMinimumWage',
                value: '',
                type: 'text',
                controlType: EnumFormBaseContolType.CURRENCY,
                readonly: false,
                disabled: true,
                pipe: EnumCoreTablePipeType.NUMBER
              }
            ],
            [
              {
                flexSize: 3,
                label: EnumTranslateKey.UI_COMPONENT_LABEL_BASIC_SALARY_SCALE,
                field: 'salaryScaleId',
                value: '',
                getByIdObject$: this.salScaleGetByIdObject$,
                getByIdApi: this.salScaleGetByIdApi,
                shownFrom: 'name',
                controlType: EnumFormBaseContolType.DROPDOWN,
                dropdownOptions$: this.groupOptionsSalScale$,
                type: 'number',
              },
              {
                flexSize: 3,
                label: EnumTranslateKey.UI_COMPONENT_LABEL_BASIC_SALARY_RANGE,
                field: 'salaryRankId',
                value: '',
                getByIdObject$: this.salRankGetByIdObject$,
                getByIdApi: this.salRankGetByIdApi,
                shownFrom: 'name',
                controlType: EnumFormBaseContolType.DROPDOWN,
                dropdownOptions$: this.groupOptionsSalRank$,
                type: 'number'
              },
              {
                flexSize: 3,
                label: EnumTranslateKey.UI_COMPONENT_LABEL_BASIC_SALARY_LEVEL,
                field: 'salaryLevelId',
                value: '',
                getByIdObject$: this.salLevelGetByIdObject$,
                getByIdApi: this.salLevelGetByIdApi,
                shownFrom: 'name',
                controlType: EnumFormBaseContolType.DROPDOWN,
                dropdownOptions$: this.groupOptionsSalLevel$,
                type: 'number'
              },
              {
                flexSize: 3,
                label: EnumTranslateKey.UI_COMPONENT_LABEL_BASIC_COEFFICIENT,
                field: 'coefficient',
                value: '',
                controlType: EnumFormBaseContolType.TEXTBOX,
                type: 'number',
                readonly: false,
                disabled: true
              },
            ],
            // [
            //   // {
            //   //   flexSize: 3,
            //   //   label: EnumTranslateKey.UI_COMPONENT_LABEL_EFFECTIVE_SALARY_SCALE,
            //   //   field: 'salaryScaleDcvId',
            //   //   value: '',
            //   //   getByIdObject$: this.salScaleDCVGetByIdObject$,
            //   //   getByIdApi: this.salScaleDCVGetByIdApi,
            //   //   shownFrom: 'name',
            //   //   controlType: EnumFormBaseContolType.DROPDOWN,
            //   //   dropdownOptions$: this.groupOptionsSalScaleDCV$,
            //   //   type: 'number'
            //   // },
            //   // {
            //   //   flexSize: 3,
            //   //   label: EnumTranslateKey.UI_COMPONENT_LABEL_EFFECTIVE_ALLOWANCE,
            //   //   field: 'salaryRankDcvId',
            //   //   value: '',
            //   //   getByIdObject$: this.salRankDCVGetByIdObject$,
            //   //   getByIdApi: this.salRankDCVGetByIdApi,
            //   //   shownFrom: 'name',
            //   //   controlType: EnumFormBaseContolType.DROPDOWN,
            //   //   dropdownOptions$: this.groupOptionsSalRankDCV$,
            //   //   type: 'number'
            //   // },
            //   // {
            //   //   flexSize: 3,
            //   //   label: EnumTranslateKey.UI_COMPONENT_LABEL_EFFECTIVE_SALARY,
            //   //   field: 'salaryLevelDcvId',
            //   //   value: '',
            //   //   getByIdObject$: this.salLevelDCVGetByIdObject$,
            //   //   getByIdApi: this.salLevelDCVGetByIdApi,
            //   //   shownFrom: 'name',
            //   //   controlType: EnumFormBaseContolType.DROPDOWN,
            //   //   dropdownOptions$: this.groupOptionsSalLevelDCV$,
            //   //   type: 'number'
            //   // },
            //   // {
            //   //   flexSize: 3,
            //   //   label: EnumTranslateKey.UI_COMPONENT_LABEL_EFFICIENCY_COEFFICIENT,
            //   //   field: 'coefficientDcv',
            //   //   value: '',
            //   //   controlType: EnumFormBaseContolType.TEXTBOX,
            //   //   type: 'number',
            //   //   readonly: false,
            //   //   disabled: true
            //   // },
            // ],
            [
              {
                flexSize: 3,
                label: EnumTranslateKey.UI_COMPONENT_LABEL_WAGE_SALARY_TYPE_NAME,
                field: 'salaryTypeId',
                value: '',
                getByIdObject$: this.groupOptionGetByIdObject$,
                getByIdApi: this.groupOptionGetByIdApi,
                shownFrom: 'name',
                controlType: EnumFormBaseContolType.DROPDOWN,
                dropdownOptions$: this.groupOptionsSalType$,
                type: 'number',
                validators: [
                  {
                    name: 'required',
                    validator: Validators.required,
                    errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
                  }
                ]
              },
              {
                flexSize: 3,
                label: EnumTranslateKey.UI_COMPONENT_LABEL_WAGE_SAL_PERCENT,
                field: 'salPercent',
                value: 100,
                controlType: EnumFormBaseContolType.TEXTBOX,
                type: 'number',
                validators: [
                  {
                    name: 'required',
                    validator: Validators.required,
                    errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
                  }
                ],
              },
              {
                flexSize: 3,
                label: EnumTranslateKey.UI_COMPONENT_LABEL_WAGE_EXPIRE_UPSAL_DATE,
                field: 'expireUpsalDate',
                value: '',
                controlType: EnumFormBaseContolType.DATEPICKER,
                type: 'date',
              },
              {
                flexSize: 3,
                label: EnumTranslateKey.UI_COMPONENT_LABEL_DECISION_SAL_BASIC,
                field: 'salInsu',
                value: '',
                type: 'text',
                controlType: EnumFormBaseContolType.CURRENCY,
                readonly: false,
                disabled: true,
                pipe: EnumCoreTablePipeType.NUMBER
              }
            ]
          ]
      },
      {
        caption: EnumTranslateKey.UI_COMPONENT_LABEL_WAGE_INFOR_APPROVE,
        rows:
          [
            [
              {
                flexSize: 3,
                label: EnumTranslateKey.UI_COMPONENT_LABEL_WAGE_STATUS,
                field: 'statusId',
                value: this.defauleValueStatus,
                getByIdObject$: this.statusGetByIdObject$,
                getByIdApi: this.statusGetByIdApi,
                shownFrom: 'name',
                controlType: EnumFormBaseContolType.DROPDOWN,
                dropdownOptions$: this.groupOptionsStatus$,
                type: 'number',
                validators: [
                  {
                    name: 'required',
                    validator: Validators.required,
                    errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
                  }
                ]
              },
              {
                flexSize: 3,
                label: EnumTranslateKey.UI_COMPONENT_LABEL_WAGE_SIGNDATE,
                field: 'signDate',
                value: '',
                controlType: EnumFormBaseContolType.DATEPICKER,
                type: 'date',
              },
              {
                flexSize: 3,
                label: EnumTranslateKey.UI_COMPONENT_LABEL_WAGE_SIGNERNAME,
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
                label: EnumTranslateKey.UI_COMPONENT_LABEL_WAGE_SIGNER_POSITION,
                field: 'signerPosition',
                value: '',
                controlType: EnumFormBaseContolType.TEXTBOX,
                type: 'text',
                readonly: false,
                disabled: true
              },
            ],
            [
              {
                flexSize: 6,
                label: EnumTranslateKey.UI_COMPONENT_LABEL_WAGE_NOTE,
                field: 'note',
                value: '',
                controlType: EnumFormBaseContolType.TEXTAREA,
                type: 'text',
                textareaRows: 3
              },
            ]
          ]
      },
    ];
  constructor(
    //private _coreService: CoreService,
    public override dialogService: DialogService,
    private mls: MultiLanguageService,
    private appService: AppService // CoreService is DEPRECATED!!!
  ) {

    super(dialogService);

    this.captionCode = EnumTranslateKey.UI_COMPONENT_TITLE_WAGE_EDIT;

    this.crud = {
      c: api.HU_WAGE_CREATE,
      r: api.HU_WAGE_READ,
      u: api.HU_WAGE_UPDATE,
      d: api.HU_WAGE_DELETE,
    };

  }
  ngOnInit(): void { }

  sub2Done!: boolean
  sub3Done!: boolean
  sub4Done!: boolean
  sub5Done!: boolean
  sub6Done!: boolean
  sub7Done!: boolean

  ngAfterViewInit(): void {

    setTimeout(() => {
      /* Each subscribe() need to be in one this.subscriptions.push */
      // Start PUSHING 1ST Subsctiption
      //2------
      this.subscriptions.push(
        this.appService
          .get(api.SYS_OTHERLIST_GETOTHERLISTBYTYPE + "SALARY_TYPE_GROUP")
          .subscribe((res: any) => {
            this.sub2Done = true;
            if (!!res.ok && res.status === 200) {
              const body: IFormatedResponse = res.body
              if (body.statusCode === 200 && !!body.innerBody) {
                const options: { value: number | null; text: string; }[] = [];
                res.body.innerBody.map((g: any) => {
                  options.push({
                    value: g.id,
                    text: g.name
                  })
                })
                this.groupOptionsSalType$.next(options);
              }
            }
          })
      ) // <==== DO NOT FORGET TO CLOSE PUSH FOR EACH SUBSCRIBE()

      // Start PUSHING 2ND Subsctiption
      //3------
      this.subscriptions.push(
        this.appService
          .get(api.SYS_OTHERLIST_GETOTHERLISTBYTYPE + 'STATUS')
          .subscribe((res: any) => {
            this.sub3Done = true
            if (!!res.ok && res.status === 200) {
              const body: IFormatedResponse = res.body
              if (body.statusCode === 200 && !!body.innerBody) {
                // ONLY THEN YOU WILL IMPLEMENT YOUR LOGICS
                const options: { value: number | null; text: string; }[] = [];
                res.body.innerBody.map((g: any) => {
                  options.push({
                    value: g.id,
                    text: g.name
                  })
                })
                this.groupOptionsStatus$.next(options);

              }
            }
          })
      ) // <==== DO NOT FORGET TO CLOSE PUSH FOR EACH SUBSCRIBE()

      //4--------
      this.subscriptions.push(
        this.appService
          .get(api.SYS_OTHERLIST_GETOTHERLISTBYTYPE + 'TAXTABLE')
          .subscribe((res: any) => {
            this.sub4Done = true
            if (!!res.ok && res.status === 200) {
              const body: IFormatedResponse = res.body
              if (body.statusCode === 200 && !!body.innerBody) {
                // ONLY THEN YOU WILL IMPLEMENT YOUR LOGICS
                const options: { value: number | null; text: string; }[] = [];
                res.body.innerBody.map((g: any) => {
                  options.push({
                    value: g.id,
                    text: g.name
                  })
                })
                this.groupOptionsTaxtable$.next(options);
              }
            }
          })
      ) // <==== DO NOT FORGET TO CLOSE PUSH FOR EACH SUBSCRIBE()

      // Start PUSHING 3RD Subsctiption
      //5----------
      this.subscriptions.push(
        this.appService
          .get(api.SYS_OTHERLIST_GETOTHERLISTBYTYPE + 'WAGE_TYPE')
          .subscribe((res: any) => {
            this.sub5Done = true
            if (!!res.ok && res.status === 200) {
              const body: IFormatedResponse = res.body
              if (body.statusCode === 200 && !!body.innerBody) {
                const options: { value: number | null; text: string; }[] = [];
                res.body.innerBody.map((g: any) => {
                  options.push({
                    value: g.id,
                    text: g.name
                  })
                })
                this.groupOptionsTypeWage$.next(options);
              }
            }
          })
      ) // <==== DO NOT FORGET TO CLOSE PUSH FOR EACH SUBSCRIBE()

      // Start PUSHING 5TH Subsctiption
      //6-------------------
      this.subscriptions.push(
        this.appService
          .get(api.HU_SALARY_SCALE_GETLIST)
          .subscribe((res: any) => {
            this.sub6Done = true
            if (!!res.ok && res.status === 200) {
              const body: IFormatedResponse = res.body
              if (body.statusCode === 200 && !!body.innerBody) {
                const options: { value: number | null; text: string; }[] = [];
                const optionsDCV: { value: number | null; text: string; }[] = [];
                res.body.innerBody.map((g: any) => {
                  if (g.isTableScore == true) {
                    optionsDCV.push({
                      value: g.id,
                      text: g.name
                    })
                  } else {
                    options.push({
                      value: g.id,
                      text: g.name
                    })
                  }
                })
                this.groupOptionsSalScale$.next(options);
                this.groupOptionsSalScaleDCV$.next(optionsDCV);

              }
            }
          })
      ) // <==== DO NOT FORGET TO CLOSE PUSH FOR EACH SUBSCRIBE()

      //7--------------
      this.subscriptions.push(
        this.appService
          .get(api.HU_ALLOWANCE_GETLIST)
          .subscribe((res: any) => {
            this.sub7Done = true
            if (!!res.ok && res.status === 200) {
              const body: IFormatedResponse = res.body
              if (body.statusCode === 200 && !!body.innerBody) {


                const options: { value: number | null; text: string; }[] = [];
                res.body.innerBody.map((g: any) => {
                  if (g.isSal == true) {
                    options.push({
                      value: g.id,
                      text: g.name
                    })
                  }
                })
                this.groupOptionsAllowanceType$.next(options);
              }
            }
          })
      )

      this.form.get("employeeId")?.valueChanges.subscribe(x => {
        let effectDate = this.form.get("effectDate")?.value;
        if (!!effectDate) {
          const request = {
            employeeId: x,
            effectDate: effectDate
          };
  
          this.appService.post(api.GET_SALARY_MINIMUM_OF_REGION, request).subscribe(res => {
            this.form.get("regionMinimumWage")?.patchValue(res.body.innerBody);
          });
        }
      });
  
      this.form.get("effectDate")?.valueChanges.subscribe(x => {
        var employeeId = this.form.get("employeeId")?.value;
  
        if (!!employeeId) {
          const request2 = {
            employeeId: employeeId,
            effectDate: x
          };
  
          this.appService.post(api.GET_SALARY_MINIMUM_OF_REGION, request2).subscribe(res => {
            this.form.get("regionMinimumWage")?.patchValue(res.body.innerBody);
          });
        }
      });
  
      this.form.get("coefficient")?.valueChanges.subscribe(x => {
        if (!!x) {
          var regionMinimumWage = this.form.get("regionMinimumWage")?.value;
  
          if (!!regionMinimumWage) {
            var salInsu = Math.floor(regionMinimumWage * x);
  
            this.form.get("salInsu")?.patchValue(salInsu);
          }
        }
        else {
          this.form.get("salInsu")?.patchValue('');
        }
      });

    })

  }

  /* GET FormGroup Instance */
  onFormCreated = (e: FormGroup) => {
    this.form = e;
    console.log(this.form);

    setTimeout(() => {
      if (this.form.get('id')?.value && !!this.form.get('statusId')?.value && this.form.get('statusId')?.value == 994) {
        this.form.get('employeeId')?.disable();
        this.form.get('employeeName')?.disable();
        this.form.get('orgName')?.disable();
        this.form.get('positionName')?.disable();
        this.form.get('typeId')?.disable();
        this.form.get('decisionNo')?.disable();
        this.form.get('effectDate')?.disable();
        this.form.get('expireDate')?.disable();
        this.form.get('expireUpsalDate')?.disable();
        this.form.get('lstCheckIns')?.disable();
        this.form.get('employeeObjId')?.disable();
        this.form.get('shortTempSalary')?.disable();
        this.form.get('taxtableId')?.disable();

        this.form.get('regionName')?.disable();
        this.form.get('salaryTypeId')?.disable();
        this.form.get('salaryScaleId')?.disable();
        this.form.get('salaryRankId')?.disable();
        this.form.get('salaryLevelId')?.disable();

        this.form.get('coefficient')?.disable();
        this.form.get('salaryScaleDcvId')?.disable();
        this.form.get('salaryRankDcvId')?.disable();
        this.form.get('salaryLevelDcvId')?.disable();
        this.form.get('coefficientDcv')?.disable();

        this.form.get('salPercent')?.disable();

        this.form.get('statusId')?.disable();
        this.form.get('signDate')?.disable();
        this.form.get('signId')?.disable();
        this.form.get('signerPosition')?.disable();
        this.form.get('attachmentBuffer')?.disable();
        this.form.get('note')?.disable();
      }
    }, 1500)
    this.form.get('shortTempSalary')?.valueChanges.pipe(distinctUntilChanged())
      .subscribe(x => {
        if (!!this.form.get('statusId')?.value && this.form.get('statusId')?.value != 994) {
          if (!!x) {
            this.form.get('taxtableId')?.disable();
            this.form.get('taxtableId')?.patchValue('');

            this.form.get('salaryTypeId')?.disable();
            this.form.get('salaryTypeId')?.patchValue('');

            this.form.get('salaryScaleId')?.disable();
            this.form.get('salaryScaleId')?.patchValue('');

            this.form.get('salaryRankId')?.disable();
            this.form.get('salaryRankId')?.patchValue('');

            this.form.get('salaryLevelId')?.disable();
            this.form.get('salaryLevelId')?.patchValue('');

            this.form.get('salaryScaleDcvId')?.disable();
            this.form.get('salaryScaleDcvId')?.patchValue('');

            this.form.get('salaryRankDcvId')?.disable();
            this.form.get('salaryRankDcvId')?.patchValue('');

            this.form.get('salaryLevelDcvId')?.disable();
            this.form.get('salaryLevelDcvId')?.patchValue('');

            this.form.get('coefficient')?.disable();
            this.form.get('coefficient')?.patchValue('');

            this.form.get('coefficientDcv')?.disable();
            this.form.get('coefficientDcv')?.patchValue('');

            this.form.get('expireUpsalDate')?.patchValue(null);
          } else {
            this.form.get('taxtableId')?.enable();
            this.form.get('taxtableId')?.patchValue(1006);

            this.form.get('salaryTypeId')?.enable();
            this.form.get('salaryTypeId')?.patchValue('');

            this.form.get('salaryScaleId')?.enable();
            this.form.get('salaryScaleId')?.patchValue('');

            this.form.get('salaryRankId')?.enable();
            this.form.get('salaryRankId')?.patchValue('');

            this.form.get('salaryLevelId')?.enable();
            this.form.get('salaryLevelId')?.patchValue('');

            this.form.get('salaryScaleDcvId')?.enable();
            this.form.get('salaryScaleDcvId')?.patchValue('');

            this.form.get('salaryRankDcvId')?.enable();
            this.form.get('salaryRankDcvId')?.patchValue('');

            this.form.get('salaryLevelDcvId')?.enable();
            this.form.get('salaryLevelDcvId')?.patchValue('');

            this.form.get('coefficient')?.enable();
            this.form.get('coefficient')?.patchValue('');

            this.form.get('coefficientDcv')?.enable();
            this.form.get('coefficientDcv')?.patchValue('');

            this.form.get('expireUpsalDate')?.patchValue(null);
          }
        }
      })!
    this.subscriptions.push( // <== Outer push
      this.form.get('salaryScaleId')?.valueChanges.pipe(distinctUntilChanged())
        .subscribe(x => {
          if (!!x) {
            //this._coreService !!!!!! CoreService DEPRECATED! USE AppService INSTEAD!!!

            this.subscriptions.push( // <== Inner push

              this.appService
                .get(api.HU_SALARY_RANK_BYSCALEID + x)
                .subscribe((res: any) => {


                  if (!!res.ok && res.status === 200) {
                    const body: IFormatedResponse = res.body
                    if (body.statusCode === 200 && !!body.innerBody) {
                      const options: { value: number | null; text: string }[] = [];
                      res.body.innerBody.map((g: any) => {
                        options.push({
                          value: g.id,
                          text: g.name,
                        })
                      })
                      this.groupOptionsSalRank$.next(options);

                    }
                  }
                })
            ) // <== CLOSE INNER PUSH

          } else {
            //this.form.get('userName')?.disable()
            //this.form.get('fullname')?.disable()
          }

        })!

    ) // <== CLOSE OUTER PUSH

    this.subscriptions.push( // <== Outer push
      this.form.get('salaryRankId')?.valueChanges.pipe(distinctUntilChanged())
        .subscribe(x => {
          if (!!x) {
            this.subscriptions.push( // <== Inner push

              this.appService
                .get(api.HU_SALARY_LEVEL_BYRANKID + x)
                .subscribe((res: any) => {


                  if (!!res.ok && res.status === 200) {
                    const body: IFormatedResponse = res.body
                    if (body.statusCode === 200 && !!body.innerBody) {
                      const options: { value: number | null; text: string; }[] = [];
                      res.body.innerBody.map((g: any) => {
                        options.push({
                          value: g.id,
                          text: g.name
                        })
                      })
                      this.groupOptionsSalLevel$.next(options);
                    }
                  }

                  this.form.get('salaryRankId')?.setValue(this.form.get('salaryRankId')?.value);

                })
            ) // Close inner push

          } else {
            //this.form.get('userName')?.disable()
            //this.form.get('fullname')?.disable()
          }
        })!
    ) // Close outer push   

    this.subscriptions.push( // <== Outer push
      this.form.get('salaryScaleDcvId')?.valueChanges.pipe(distinctUntilChanged())
        .subscribe(x => {
          if (!!x) {
            //this._coreService !!!!!! CoreService DEPRECATED! USE AppService INSTEAD!!!

            this.subscriptions.push( // <== Inner push

              this.appService
                .get(api.HU_SALARY_RANK_BYSCALEID + x)
                .subscribe((res: any) => {


                  if (!!res.ok && res.status === 200) {
                    const body: IFormatedResponse = res.body
                    if (body.statusCode === 200 && !!body.innerBody) {
                      const options: { value: number | null; text: string }[] = [];
                      res.body.innerBody.map((g: any) => {
                        options.push({
                          value: g.id,
                          text: g.name,
                        })
                      })
                      this.groupOptionsSalRankDCV$.next(options);

                    }
                  }
                })
            ) // <== CLOSE INNER PUSH

          } else {
            //this.form.get('userName')?.disable()
            //this.form.get('fullname')?.disable()
          }

        })!

    ) // <== CLOSE OUTER PUSH

    // Start PUSHING 4RD Subsctiption
    this.subscriptions.push(
      this.appService.get(api.SYS_OTHERLIST_GETOTHERLISTBYTYPE + 'OBJECT_EMPLOYEE').subscribe((res: any) => {
        if (!!res.ok && res.status === 200) {
          const body: IFormatedResponse = res.body;
          if (body.statusCode === 200 && !!body.innerBody) {
            const options: { value: number | null; text: string }[] = [];
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

    this.subscriptions.push( // <== Outer push
      this.form.get('salaryRankDcvId')?.valueChanges.pipe(distinctUntilChanged())
        .subscribe(x => {
          if (!!x) {
            this.subscriptions.push( // <== Inner push

              this.appService
                .get(api.HU_SALARY_LEVEL_BYRANKID + x)
                .subscribe((res: any) => {


                  if (!!res.ok && res.status === 200) {
                    const body: IFormatedResponse = res.body
                    if (body.statusCode === 200 && !!body.innerBody) {
                      const options: { value: number | null; text: string; }[] = [];
                      res.body.innerBody.map((g: any) => {
                        options.push({
                          value: g.id,
                          text: g.name
                        })
                      })
                      this.groupOptionsSalLevelDCV$.next(options);
                    }
                  }

                  this.form.get('salaryRankDcvId')?.setValue(this.form.get('salaryRankDcvId')?.value);

                })
            ) // Close inner push

          } else {
            //this.form.get('userName')?.disable()
            //this.form.get('fullname')?.disable()
          }
        })!
    ) // Close outer push  

    this.subscriptions.push( // <== Outer push
      this.form.get('salaryLevelDcvId')?.valueChanges.pipe(distinctUntilChanged())
        .subscribe(x => {
          if (!!x) {
            this.subscriptions.push( // <== Inner push

              this.appService
                .get(api.HU_SALARY_LEVEL_READ + '?id=' + x)
                .subscribe((res: any) => {


                  if (!!res.ok && res.status === 200) {
                    const body: IFormatedResponse = res.body
                    if (body.statusCode === 200 && !!body.innerBody) {
                      this.form.get('coefficientDcv')?.setValue(body.innerBody.coefficient);
                    }
                  }
                })
            ) // Close inner push

          } else {
            //this.form.get('userName')?.disable()
            //this.form.get('fullname')?.disable()
          }
        })!
    ) // Close outer push  

    this.subscriptions.push( // <== Outer push
      this.form.get('salaryLevelDcvId')?.valueChanges.pipe(distinctUntilChanged())
        .subscribe(x => {

          if (!!x) {
            this.subscriptions.push( // <== Inner push

              this.appService
                .get(api.HU_SALARY_LEVEL_READ + '?id=' + x)
                .subscribe((res: any) => {


                  if (!!res.ok && res.status === 200) {
                    const body: IFormatedResponse = res.body
                    if (body.statusCode === 200 && !!body.innerBody) {
                      this.form.get('coefficientDcv')?.setValue(body.innerBody.coefficient);
                    }
                  }
                })
            ) // Close inner push

          } else {
            //this.form.get('userName')?.disable()
            //this.form.get('fullname')?.disable()
          }
        })!
    ) // Close outer push 

    this.form.get('effectDate')?.valueChanges.pipe(distinctUntilChanged())
      .pipe(
        filter(_ => {
          const touched = this.form.get('effectDate')?.touched;
          return !!touched
        })
      ).subscribe(x => {
        if (!!x) {
          if (!!this.form.get('employeeId')?.value) {
            var levelId = 0;
            if (!!this.form.get('salaryLevelId')?.value) {
              levelId = this.form.get('salaryLevelId')?.value;
            } else {
              this.form.get('expireUpsalDate')?.patchValue(null);
              return;
            }
            this.CalculateExpireShortTemp(this.form.get('employeeId')?.value, new Date(x).toLocaleDateString("en-US"), levelId)
          } else {
            this.form.get('expireUpsalDate')?.patchValue(null);
          }

        } else {
          this.form.get('expireUpsalDate')?.patchValue(null);
        }
      })

    this.form.get('salaryLevelId')?.valueChanges.pipe(distinctUntilChanged())
      .pipe(
        filter(_ => {
          const touched = this.form.get('salaryLevelId')?.touched;
          return !!touched
        })
      ).subscribe(x => {
        if (!!x) {
          this.subscriptions.push( // <== Inner push
            this.appService
              .get(api.HU_SALARY_LEVEL_READ + '?id=' + x)
              .subscribe((res: any) => {
                if (!!res.ok && res.status === 200) {
                  const body: IFormatedResponse = res.body
                  if (body.statusCode === 200 && !!body.innerBody) {
                    this.form.get('coefficient')?.setValue(body.innerBody.coefficient);
                  }
                }
              })
          ) // Close inner push
          if (!!this.form.get('employeeId')?.value && !!this.form.get('effectDate')?.value) {
            const date = new Date(this.form.get('effectDate')?.value).toLocaleDateString("en-US");
            this.CalculateExpireShortTemp(this.form.get('employeeId')?.value, date, x)
          } else {
            this.form.get('expireUpsalDate')?.patchValue(null);
          }

        } else {
          this.form.get('coefficient')?.setValue(null);
          this.form.get('expireUpsalDate')?.patchValue(null);
        }
      })

    this.subscriptions.push(
      this.form.get('attachment')?.valueChanges.subscribe(x => {
        console.log(x);
      })!
    )

  }
  CalculateExpireShortTemp(empId: any, date: any, levelId: any) {
    if (this.form.get('shortTempSalary')?.value != '' && this.form.get('shortTempSalary')?.value != null && this.form.get('shortTempSalary')?.value != undefined) {
      levelId = 0;
    }
    this.subscriptions.push( // <== Inner push
      this.appService
        .get(api.HU_WAGE_EXPIRE_SHORT_TEMP + empId + "&date=" + date + "&levelId=" + levelId)
        .subscribe((res: any) => {
          if (!!res.ok && res.status === 200) {
            const body: IFormatedResponse = res.body
            if (body.statusCode === 200 && !!body.innerBody) {
              var dateNew = new Date(body.innerBody);
              this.form.get('expireUpsalDate')?.patchValue(dateNew);
            }
          }
        }))


  }
  /* To allow form to be deactivated */
  onFormReinit(e: string): void {
    this.formInitStringValue = e;
  }

  ngOnDestroy(): void {
    this.subscriptions.map(x => x?.unsubscribe())
  }

  protected static effectDate(date: AbstractControl): any | null {
    let valid = true;
    let errorMessage = "";
    const effectDate = date.value;
    const expireDate = date.parent?.get("expireDate")?.value;
    if (expireDate != "" && expireDate != null && effectDate != null) {
      if (effectDate > new Date(expireDate)) {
        valid = false;
        errorMessage = EnumTranslateKey.UI_FORM_CONTROL_WAGE_ERROR_EFFECTDATE_GREAT_THAN_EXPIREDATE
        return CustomValidators.core("effectdate", false, errorMessage)(date)
      } else {
        date.parent?.get("effectdate")?.setErrors(null);
        date.parent?.get("expireDate")?.setErrors(null);
      }
    }
  }

  protected static expireDate(date: AbstractControl): any | null {
    let valid = true;
    let errorMessage = "";
    const effectDate = date.parent?.get("effectDate")?.value;
    const expireDate = date.value;
    if (expireDate != "" && expireDate != null) {
      if (effectDate != "" && effectDate != null && expireDate < new Date(effectDate)) {
        valid = false;
        errorMessage = EnumTranslateKey.UI_FORM_CONTROL_WAGE_ERROR_EXPIREDATE_LESS_THAN_EFFECTDATE
        return CustomValidators.core("expireDate", false, errorMessage)(date)
      } else {
        date.parent?.get("effectDate")?.setErrors(null);
        date.parent?.get("expireDate")?.setErrors(null);
      }
    } else {
      // date.parent?.get("effectDate")?.setErrors(null);
      date.parent?.get("expireDate")?.setErrors(null);
    }
  }
}