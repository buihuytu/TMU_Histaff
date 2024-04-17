import { Component, ViewEncapsulation, AfterViewInit } from "@angular/core";
import { Validators, FormGroup } from "@angular/forms";
import { api, EnumTranslateKey } from 'alpha-global-constants';
import { BaseEditComponent, ICoreDropdownOption, ICorePageEditColumnComposition, ICorePageEditCRUD, ICoreFormSection, EnumFormBaseContolType, EnumCoreFormControlSeekerSourceType, DialogService, CoreFormService, AlertService, MultiLanguageService, IAlertOptions } from "ngx-histaff-alpha";
import { Subscription, BehaviorSubject, map, distinctUntilChanged } from "rxjs";
import { DisciplineEditService } from "./discipline-edit.service";

@Component({
  selector: 'app-discipline-edit',
  templateUrl: './discipline-edit.component.html',
  styleUrls: ['./discipline-edit.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DisciplineEditComponent extends BaseEditComponent implements AfterViewInit {

  /* Properties to be passed into core-page-edit */

  override entityTable = "HU_DISCIPLINE";

  loading: boolean = false;
  subsctiptions: Subscription[] = [];
  disObjOptions$ = new BehaviorSubject<ICoreDropdownOption[]>([]);
  disObjGetByIdObject$ = new BehaviorSubject<any>(null);
  disObjGetByIdApi = api.SYS_OTHERLIST_READ;

  disTypeOptions$ = new BehaviorSubject<ICoreDropdownOption[]>([]);
  disTypeGetByIdObject$ = new BehaviorSubject<any>(null);
  disTypeGetByIdApi = api.SYS_OTHERLIST_READ;

  statusOptions$ = new BehaviorSubject<ICoreDropdownOption[]>([]);
  statusGetByIdObject$ = new BehaviorSubject<any>(null);
  statusGetByIdApi = api.SYS_OTHERLIST_READ;

  employeeGetByIdObject$ = new BehaviorSubject<any>(null);
  employeeGetByIdApi = api.HU_EMPLOYEE_READ;

  positionSignGetByIdObject$ = new BehaviorSubject<any>(null);
  positionSignGetByIdApi = api.HU_EMPLOYEE_READ;

  captionCode!: EnumTranslateKey;
  formComposition!: ICorePageEditColumnComposition[][];
  crud!: ICorePageEditCRUD;
  alertOptions: IAlertOptions = {
    autoClose: true,
    keepAfterRouteChange: true,
    timeClose: 3000
  };
  sections: ICoreFormSection[] =
    [
      {
        rows: [
          [
            {
              flexSize: 0,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_DISCIPLINE_DISCIPLINE_ID,
              field: 'id',
              value: 0,
              controlType: EnumFormBaseContolType.TEXTBOX,
              readonly: true,
              hidden: true,
              type: 'number'
            },
            {
              flexSize: 3,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_DISCIPLINE_NO,
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
              ]
            },
            {
              flexSize: 3,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_DISCIPLINE_EFFECT_DATE,
              field: 'effectDate',
              value: null,
              controlType: EnumFormBaseContolType.DATEPICKER,
              type: 'date',
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
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_EXPIRE_DATE,
              field: 'expireDate',
              value: null,
              controlType: EnumFormBaseContolType.DATEPICKER,
              type: 'date'
            },
            {
              flexSize: 3,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_DISCIPLINE_STATUS,
              field: 'statusId',
              value: '',
              controlType: EnumFormBaseContolType.DROPDOWN,
              getByIdObject$: this.statusGetByIdObject$,
              getByIdApi: this.statusGetByIdApi,
              shownFrom: 'name',
              dropdownOptions$: this.statusOptions$,
              type: 'number',
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
                }
              ]
            }
          ]
        ]
      },
      {
        rows: [
          [
            {
              flexSize: 3,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_DISCIPLINE_ISSUED_DATE,
              field: 'issuedDate',
              value: null,
              controlType: EnumFormBaseContolType.DATEPICKER,
              type: 'date',
              // readonly: true,
              // disabled: true
            },
            {
              flexSize: 3,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_DISCIPLINE_VIOLATED_DATE,
              field: 'violatedDate',
              value: null,
              controlType: EnumFormBaseContolType.DATEPICKER,
              type: 'date'
            },
            {
              flexSize: 3,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_DISCIPLINE_BASED_ON,
              field: 'basedOn',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              type: 'text',
              // validators: [
              //   {
              //     name: 'required',
              //     validator: Validators.required,
              //     errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
              //   }
              // ]
            },
            {
              flexSize: 3,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_DISCIPLINE_DOCUMENT_SIGN_DATE,
              field: 'documentSignDate',
              value: null,
              controlType: EnumFormBaseContolType.DATEPICKER,
              type: 'date',
              validators: [
                {
                  name: 'required',
                  validator: Validators.required,
                  errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
                }
              ]
            }
          ]
        ]
      },
      {
        rows: [
          [
            {
              flexSize: 3,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_DISCIPLINE_SIGNER_POSITION,
              field: 'signId',
              value: '',
              controlType: EnumFormBaseContolType.SEEKER,
              seekerSourceType: EnumCoreFormControlSeekerSourceType.EMPLOYEE_SEEK,
              getByIdObject$: this.positionSignGetByIdObject$,
              getByIdApi: this.positionSignGetByIdApi,
              boundFrom: 'id',
              shownFrom: 'positionName',
              alsoBindTo: [{ takeFrom: 'fullname', bindTo: 'signerName' }],
              type: 'text',
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
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_DISCIPLINE_SIGNER_NAME,
              field: 'signerName',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              type: 'text',
              disabled: true
            },
            {
              flexSize: 3,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_DISCIPLINE_SIGN_DATE,
              field: 'signDate',
              value: null,
              controlType: EnumFormBaseContolType.DATEPICKER,
              type: 'date'
            },
            {
              flexSize: 3,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_DISCIPLINE_DISCIPLINE_OBJ,
              field: 'disciplineObj',
              value: '',
              controlType: EnumFormBaseContolType.DROPDOWN,
              getByIdObject$: this.disObjGetByIdObject$,
              getByIdApi: this.disObjGetByIdApi,
              shownFrom: 'name',
              dropdownOptions$: this.disObjOptions$,
              type: 'number',
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
                }
              ]
            }
          ]
        ],
      },
      {
        rows: [
          [
            {
              flexSize: 3,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_DISCIPLINE_DISCIPLINE_TYPE,
              field: 'disciplineType',
              value: '',
              controlType: EnumFormBaseContolType.DROPDOWN,
              getByIdObject$: this.disTypeGetByIdObject$,
              getByIdApi: this.disTypeGetByIdApi,
              shownFrom: 'name',
              dropdownOptions$: this.disTypeOptions$,
              type: 'number',
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
                }
              ]
            },
            {
              flexSize: 6,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_DISCIPLINE_REASON,
              field: 'reason',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              type: 'text'
            },
            {
              flexSize: 3,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_DISCIPLINE_EXTEND_SAL_TIME,
              field: 'extendSalTime',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              type: 'number'
            }
          ]
        ]
      },
      {
        rows: [
          [
            {
              flexSize: 3,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_FAMILY_UPLOAD_FILE,
              field: 'attachmentBuffer',
              value: null,
              controlType: EnumFormBaseContolType.ATTACHMENT,
              assignTo: 'attachment',
              type: 'object',
            },
            {
              flexSize: 6,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_FAMILY_NOTE,
              field: 'note',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              type: 'text'
            }
          ]
        ]
      },
      {
        rows: [
          [
            {
              flexSize: 12,
              label: EnumTranslateKey.UI_COMPONENT_TITLE_EMPLOYEE_CHECKER,
              field: 'employeeIds',
              value: [],
              controlType: EnumFormBaseContolType.SEEKER,
              type: 'object',
              /* 
                START: Thay đổi thuộc tính của SEEKER để có SELECTOR:
              */
              seekerSourceType: EnumCoreFormControlSeekerSourceType.EMPLOYEE_SEEK,
              multiMode: true,
              // multiModeExtendedColumns: [
              //   {
              //     caption: EnumTranslateKey.ADD_ARREARS_INF,
              //     field: "abcd",
              //     type: "string",
              //     align: "right",
              //     width: 1000,
              //   },
              //   {
              //     caption: EnumTranslateKey.ADD_ARREARS_INF,
              //     field: "abcde",
              //     type: "string",
              //     align: "right",
              //     width: 1000,
              //   }

              // ],
              // multiModeExtendedSections: [
              //   {
              //     rows: [
              //       [
              //         {
              //           field: "abcd",
              //           controlType: EnumFormBaseContolType.TEXTAREA,
              //           textareaRows: 5,
              //           flexSize: 6,
              //           label: EnumTranslateKey.ADD_ARREARS_INF,
              //           value: ""
              //         },
              //         {
              //           field: "abcde",
              //           controlType: EnumFormBaseContolType.TEXTAREA,
              //           textareaRows: 5,
              //           flexSize: 6 ,
              //           label: EnumTranslateKey.ADD_ARREARS_INF,
              //           value: ""
              //         }

              //       ]
              //     ]
              //   }
              // ],
              objectList$: new BehaviorSubject<any[]>([]),
              getObjectListFrom: 'employeeList',
              getByIdObject$: this.employeeGetByIdObject$,
              // getByIdApi: this.employeeGetByIdApi,
              disabled: true,
              boundFrom: 'id',
              click$: new BehaviorSubject<any>(null),
              shownFrom: 'fullname',
              // alsoBindTo: [{ takeFrom: 'positionName', bindTo: 'signPosition' }],
              /* END: WHEN USING controlType === EnumFormBaseContolType.SEEKER */
              validators: [
                {
                  name: 'required',
                  validator: Validators.required,
                  errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
                }
              ],
            },
            {
              flexSize: 12,
              label: EnumTranslateKey.UI_COMMON_EMPTY_STRING,
              field: 'employeeList',
              value: [],
              controlType: EnumFormBaseContolType.HIDDEN,
              type: 'object'
            },
          ]
        ]
      }
    ];
  constructor(
    public override dialogService: DialogService,
    private disciplineEditService: DisciplineEditService,
    private coreFormService: CoreFormService,
    private alertService: AlertService,
    public mls: MultiLanguageService
  ) {

    super(dialogService);

    this.captionCode = EnumTranslateKey.UI_COMPONENT_TITLE_DISCIPLINE_EDIT;

    this.crud = {
      c: api.HU_DISCIPLINE_CREATE,
      r: api.HU_DISCIPLINE_READ,
      u: api.HU_DISCIPLINE_UPDATE,
      d: api.HU_DISCIPLINE_DELETE,
    };

  }

  ngOnInit(): void {
    this.loading = true;
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.subsctiptions.push(
        this.disciplineEditService.getStatusList()
          .pipe(
            map((f: any) => {
              const options: { value: number; text: string; }[] = [];
              f.body.innerBody.map((g: any) => {
                options.push({
                  value: g.id,
                  text: g.name
                })
              })
              return options;
            })
          )
          .subscribe(response => {
            this.statusOptions$.next(response);
            this.loading = false;
          })
      );
      this.subsctiptions.push(
        this.disciplineEditService.getDisObjList()
          .pipe(
            map((x: any) => {
              const options: { value: number; text: string; code: string; }[] = [];
              x.body.innerBody.map((g: any) => {
                options.push({
                  value: g.id,
                  text: g.name,
                  code: g.code
                })
              })
              return options;
            })
          )
          .subscribe(response => {
            this.disObjOptions$.next(response);
            this.loading = false;
          })
      );
      this.subsctiptions.push(
        this.disciplineEditService.getDisTypeList()
          .pipe(
            map((x: any) => {
              const options: { value: number; text: string; code: string; }[] = [];
              x.body.innerBody.map((g: any) => {
                options.push({
                  value: g.id,
                  text: g.name,
                  code: g.code
                })
              })
              return options;
            })
          )
          .subscribe(response => {
            this.disTypeOptions$.next(response);
            this.loading = false;
          })
      )
    })
  }

  /* GET FormGroup Instance */
  onFormCreated(e: FormGroup): void {
    this.form = e as FormGroup;
    if (this.form.get('id')?.value === 0) {
      var now = new Date();
      this.form.get('signDate')?.patchValue(now);
    }

    if (this.form.get('statusId')?.value === 994) {
      this.form.get('decisionNo')?.disable();
      this.form.get('effectDate')?.disable();
      this.form.get('expireDate')?.disable();
      this.form.get('issuedDate')?.disable();
      this.form.get('violatedDate')?.disable();
      this.form.get('basedOn')?.disable();
      this.form.get('documentSignDate')?.disable();
      this.form.get('signId')?.disable();
      this.form.get('signDate')?.disable();
      this.form.get('disciplineObj')?.disable();
      this.form.get('disciplineType')?.disable();
      this.form.get('reason')?.disable();
      this.form.get('extendSalTime')?.disable();
      this.form.get('attachmentBuffer')?.disable();
      this.form.get('note')?.disable();
      this.form.get('employeeIds')?.disable();
      this.form.get('statusId')?.disable();
    }

    this.subsctiptions.push(
      this.form.get('disciplineObj')?.valueChanges.pipe(distinctUntilChanged()).subscribe(x => {
        if (!!x) {
          this.form.get('employeeIds')?.enable()
        } else {
          this.form.get('employeeIds')?.disable();
        }
      })!,
    )
    this.coreFormService.getFormBaseControlByName(this.sections, 'employeeIds')?.click$?.subscribe(x => {
      if (!!x) {
        const getDisciplineObj = this.form.get('disciplineObj')?.value;
        if (!!!getDisciplineObj) {
          this.alertService.warn(this.mls.trans(EnumTranslateKey.UI_COMPONENT_TITLE_HU_COMMEND_MUST_CHOOSE_EMPLOYEE_OBJ), this.alertOptions)
        }
      }
    })
  }
  /* To allow form to be deactivated */
  onFormReinit(e: string): void {
    this.formInitStringValue = e;
  }
  onClickSeeker() {

  }
}
