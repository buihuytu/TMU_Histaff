import {
  Component,
  ViewEncapsulation,
} from "@angular/core";
import {FormGroup, Validators } from "@angular/forms";
import { EnumTranslateKey, api } from 'alpha-global-constants';
import { AppService, BaseEditComponent, CoreFormService, DialogService, EnumCoreFormControlSeekerSourceType, EnumFormBaseContolType, ICoreDropdownOption, ICoreFormSection, ICorePageEditCRUD, ICorePageEditColumnComposition, IFormatedResponse,} from "ngx-histaff-alpha";
import { BehaviorSubject, Subscription } from "rxjs";

@Component({
  selector: "app-allowanceemployee-edit",
  templateUrl: "./allowanceemployee-edit.component.html",
  styleUrls: ["./allowanceemployee-edit.component.scss"],
})
export class AllowanceEmployeeEditComponent extends BaseEditComponent {
  override entityTable = "HU_ALLOWANCE_EMP";
  subsctiptions: Subscription[] = [];
  captionCode!: EnumTranslateKey;
  loading: boolean = false;
  TypeOptions$ = new BehaviorSubject<ICoreDropdownOption[]>([]);
  
  formComposition!: ICorePageEditColumnComposition[][];

  allowanceGetByIdObject$ = new BehaviorSubject<any>(null);

  employeeGetByIdObject$ = new BehaviorSubject<any>(null);
  employeeGetByIdApi = api.HU_EMPLOYEE_READ;
  allowanceGetByIdApi = api.HU_ALLOWANCE_READ;
  crud!: ICorePageEditCRUD;

  sections: ICoreFormSection[] =
    [
      {
        rows: [
          [
            {
              flexSize: 0,
              label: EnumTranslateKey.UI_COMPONENT_LABEL_ALLOWANCE_ID,
              field: 'id',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              readonly: true,
              hidden: true,
              type: 'text'
            },
          ],
          [
            {
              flexSize: 6,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_EMPLOYEE_CODE,
              field: 'employeeCode',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              readonly: true, 
              disabled: true,
              type: 'text',
            },
            {
              flexSize: 6,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_USER_FULLNAME,
              field: 'employeeName',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              readonly: true, 
              disabled: true,
              type: 'text',
            },
            
          ],
          [
            {
              flexSize: 6,
              label: EnumTranslateKey.UI_COMPONENT_LABEL_LEAVEJOB_ORG_NAME,
              field: 'orgName',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              readonly: true, 
              type: 'text',
              disabled: true,
              hidden: false,
            },
            {
              flexSize: 6,
              label: EnumTranslateKey.UI_COMPONENT_LABEL_LEAVEJOB_TITLE_NAME,
              field: 'posName',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              readonly: true,
              type: 'text',
              disabled: true,
              hidden: false,
            },
          ],
          [
            {
              flexSize: 6,
              label: EnumTranslateKey.UI_COMPONENT_LABEL_ALLOWANSEEMPLOYEE_ALLOWANCENAME,
              field: 'allowanceId',
              value: '',
              controlType: EnumFormBaseContolType.DROPDOWN,
              getByIdObject$: this.allowanceGetByIdObject$,
              getByIdApi: this.allowanceGetByIdApi,
              shownFrom: 'name',
              dropdownOptions$: this.TypeOptions$,
              type: 'number',
              validators: [
                {
                  name: 'required',
                  validator: Validators.required,
                  errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
                },
              ]
            },
            {
              flexSize: 6,
              label: EnumTranslateKey.UI_COMPONENT_LABEL_ALLOWANSEEMPLOYEE_MONNEY,
              field: 'monney',
              value: '',
              controlType: EnumFormBaseContolType.CURRENCY,
              //readonly: false,
              type: 'number',
            },
          ],
          [
            {
              flexSize: 6,
              label: EnumTranslateKey.UI_COMPONENT_LABEL_ALLOWANCE_ISCOEFICIENT,
              field: 'coefficient',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              //readonly: true,
              type: 'number',

            },
          ],
          [
            {
              flexSize: 6,
              label: EnumTranslateKey.UI_COMPONENT_LABEL_ALLOWANSEEMPLOYEE_DATESTART,
              field: 'dateStart',
              value: '',
              controlType: EnumFormBaseContolType.DATEPICKER,
              readonly: false,
              type: 'date',
              validators: [
                {
                  name: 'required',
                  validator: Validators.required,
                  errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
                },
              ]
            },
            {
              flexSize: 6,
              label: EnumTranslateKey.UI_COMPONENT_LABEL_ALLOWANSEEMPLOYEE_DATEEND,
              field: 'dateEnd',
              value: '',
              controlType: EnumFormBaseContolType.DATEPICKER,
              readonly: true,
              type: 'date',
            },
          ],
          [
            {
              flexSize: 12,
              label: EnumTranslateKey.UI_COMPONENT_LABEL_ALLOWANSEEMPLOYEE_NOTE,
              field: 'note',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              readonly: false,
              type: 'text',
            },
          ],
        ]
      },
     /*  {
        rows: [
          [
            {
              flexSize: 12,
              label: EnumTranslateKey.UI_COMMON_EMPTY_STRING,
              field: 'emps',
              value: [],
              controlType: EnumFormBaseContolType.GRIDBUFFER,
              type: 'children',
              // When using EnumFormBaseContolType.GRIDBUFFER
              onBufferFormCreated: this.onBufferFormCreated,
              gridBufferFormSections: [
                {
                  rows: [
                    [
                      {
                        flexSize: 6,
                        label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_EMPLOYEE_CODE,
                        field: 'employeeId',
                        value: '',
                        controlType: EnumFormBaseContolType.SEEKER,
                        seekerSourceType: EnumCoreFormControlSeekerSourceType.EMPLOYEE_SEEK,
                        getByIdObject$: this.employeeGetByIdObject$,
                        getByIdApi: this.employeeGetByIdApi,
                        boundFrom: 'id',
                        shownFrom: 'code',
                        alsoBindTo: [{ takeFrom: 'fullname', bindTo: 'fullname' },
                                     { takeFrom: 'code', bindTo: 'code' },
                                      { takeFrom: 'orgName', bindTo: 'orgName' },
                                      { takeFrom: 'positionName', bindTo: 'posName' },],
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
                        flexSize: 6,
                        label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_USER_FULLNAME,
                        field: 'fullname',
                        value: '',
                        controlType: EnumFormBaseContolType.TEXTBOX,
                        readonly: true, // We will update this field programatically
                        type: 'text',
                      },
                      
                    ],
                    [
                      {
                        flexSize: 6,
                        label: EnumTranslateKey.UI_COMPONENT_LABEL_LEAVEJOB_ORG_NAME,
                        field: 'code',
                        value: '',
                        controlType: EnumFormBaseContolType.TEXTBOX,
                        readonly: true, // We will update this field programatically
                        type: 'text',
                        disabled: true,
                        hidden: true,
                      },
                      {
                        flexSize: 6,
                        label: EnumTranslateKey.UI_COMPONENT_LABEL_LEAVEJOB_ORG_NAME,
                        field: 'orgName',
                        value: '',
                        controlType: EnumFormBaseContolType.TEXTBOX,
                        readonly: true, // We will update this field programatically
                        type: 'text',
                        disabled: true,
                        hidden: true,
                      },
                      {
                        flexSize: 6,
                        label: EnumTranslateKey.UI_COMPONENT_LABEL_LEAVEJOB_TITLE_NAME,
                        field: 'posName',
                        value: '',
                        controlType: EnumFormBaseContolType.TEXTBOX,
                        readonly: true, // We will update this field programatically
                        type: 'text',
                        disabled: true,
                        hidden: true,
                      },
                    ]
                  ]
                }
              ],
              gridBufferTableColumns: [
                {
                  caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_COMMON_ID,
                  field: 'id',
                  hidden: true,
                  type: 'string',
                  align: 'left',
                  width: 30,
                },
                {
                  caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_EMPLOYEE_CODE,
                  field: 'code',
                  type: 'string',
                  align: 'left',
                  width: 150,
                },
                {
                  caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_USER_FULLNAME,
                  field: 'fullname',
                  type: 'string',
                  align: 'left',
                  width: 210,
                },
                {
                  caption: EnumTranslateKey.UI_COMPONENT_LABEL_LEAVEJOB_ORG_NAME,
                  field: 'orgName',
                  type: 'string',
                  align: 'left',
                  width: 210,
                },
                {
                  caption: EnumTranslateKey.UI_COMPONENT_LABEL_LEAVEJOB_TITLE_NAME,
                  field: 'posName',
                  type: 'string',
                  align: 'left',
                  width: 210,
                },
              ]
            },
          ]
        ]
      } */
      {
        rows: [
          [
            {
              flexSize: 12,
              label: EnumTranslateKey.UI_COMPONENT_TITLE_EMPLOYEE_CHECKER,
              field: 'EmployeeIds',
              value: [],
              controlType: EnumFormBaseContolType.SEEKER,
              type: 'object',
              /* 
                START: Thay đổi thuộc tính của SEEKER để có SELECTOR:
              */
              seekerSourceType: EnumCoreFormControlSeekerSourceType.EMPLOYEE_SEEK,
              multiMode: true,
              objectList$: new BehaviorSubject<any[]>([]),
              getObjectListFrom: 'employeeList',
              getByIdObject$: this.employeeGetByIdObject$,
              getByIdApi: this.employeeGetByIdApi,

              boundFrom: 'id',
              shownFrom: 'fullname',
              // alsoBindTo: [{ takeFrom: 'positionName', bindTo: 'signPosition' }],
              /* END: WHEN USING controlType === EnumFormBaseContolType.SEEKER */

            },
            {
              flexSize: 12,
              label: EnumTranslateKey.UI_COMMON_EMPTY_STRING,
              field: 'employeeList',
              value: [],
              controlType: EnumFormBaseContolType.HIDDEN,
              type: 'object',
            },
          ]
        ]
      }
    ];
    constructor(
      private appService: AppService,
      public override dialogService: DialogService,
      private coreFormService: CoreFormService
    ) {
  
      super(dialogService);
  
      this.captionCode = EnumTranslateKey.UI_COMPONENT_TITLE_ALLOWANSEEMPLOYEE;
  
      this.crud = {
        c: api.HU_ALLOWANSEEMPLOYEE_CREATE,
        r: api.HU_ALLOWANSEEMPLOYEE_READ,
        u: api.HU_ALLOWANSEEMPLOYEE_UPDATE,
        d: api.HU_ALLOWANSEEMPLOYEE_DELETE,
      };
  
    }
    ngOnInit(): void {
      this.loading = true;
      this.appService
      .get(api.HU_ALLOWANSEEMPLOYEE_GETLIST)
      .subscribe((res: any) => {
        const options: { value: number; text: string; }[] = [];
        res.body.innerBody.map((g: any) => {
          options.push({
            value: g.id,
            text: g.name,
          })
        })
        this.TypeOptions$.next(options);
        this.loading = false;
      });
    }
    onFormCreated(e: FormGroup): void {
      this.form = e;
      if(e.value.id !== "")
      {
        var empsObj = this.coreFormService.getFormBaseControlByName(this.sections, 'EmployeeIds');
        var empCodeObj = this.coreFormService.getFormBaseControlByName(this.sections, 'employeeCode');
        var employeeNameObj = this.coreFormService.getFormBaseControlByName(this.sections, 'employeeName');
        var orgNameObj = this.coreFormService.getFormBaseControlByName(this.sections, 'orgName');
        var posNameObj = this.coreFormService.getFormBaseControlByName(this.sections, 'posName');
        if (empsObj) {
          empsObj.hidden=true;
        }
        if (empCodeObj) {
          empCodeObj.hidden=false;
        }
        if (employeeNameObj) {
          employeeNameObj.hidden=false;
        }
        if (orgNameObj) {
          orgNameObj.hidden=false;
        }
        if (posNameObj) {
          posNameObj.hidden=false;
        }
      }else{
        var empCodeObj = this.coreFormService.getFormBaseControlByName(this.sections, 'employeeCode');
        var employeeNameObj = this.coreFormService.getFormBaseControlByName(this.sections, 'employeeName');
        var orgNameObj = this.coreFormService.getFormBaseControlByName(this.sections, 'orgName');
        var posNameObj = this.coreFormService.getFormBaseControlByName(this.sections, 'posName');
        if (empCodeObj) {
          empCodeObj.hidden=true;
        }
        if (employeeNameObj) {
          employeeNameObj.hidden=true;
        }
        if (orgNameObj) {
          orgNameObj.hidden=true;
        }
        if (posNameObj) {
          posNameObj.hidden=true;
        }
      }
      this.subsctiptions.push(
        this.form.get('allowanceId')?.valueChanges.subscribe(x => {
          if (!!x) {
            this.appService
            .get(api.HUALLOWANSEEMPLOYEE_GETTYPEBYID + x)
            .subscribe((res: any) => {
              
              if (!!res.ok && res.status === 200) {
                const body: IFormatedResponse = res.body
                if (body.statusCode === 200 && !!body.innerBody) {
                  var moneyObj = this.coreFormService.getFormBaseControlByName(this.sections, 'monney');
                  var coefficientObj = this.coreFormService.getFormBaseControlByName(this.sections, 'coefficient');
                  if(body.innerBody.isCoefficient){
                    if (moneyObj) {
                        //moneyObj.readonly = true;
                        this.form.get('monney')?.disable();
                        this.form.get('monney')?.patchValue('');  
                        //this.form.get('monney')?.setValidators([]);
                        this.form.get('monney')?.updateValueAndValidity();
                    }
                    if (coefficientObj) {
                        //coefficientObj.readonly = false;
                        this.form.get('coefficient')?.enable();
                        //this.form.get('coefficient')?.patchValue('');  
                        //this.form.get('coefficient')?.setValidators([Validators.required, Validators.min(1)]);
                        this.form.get('coefficient')?.updateValueAndValidity();
                    }
                  }else{
                    if (moneyObj) {
                      //moneyObj.readonly = false;
                      this.form.get('monney')?.enable();
                      //this.form.get('monney')?.patchValue('');  
                      //this.form.get('monney')?.setValidators([Validators.required, Validators.min(1)]);
                      this.form.get('monney')?.updateValueAndValidity();
                    }
                    if (coefficientObj) {
                      //coefficientObj.readonly = true;
                      this.form.get('coefficient')?.disable();
                      this.form.get('coefficient')?.patchValue('');  
                      //this.form.get('coefficient')?.setValidators([]);
                      this.form.get('coefficient')?.updateValueAndValidity();
                    }
                  }
                }
              }
            })
          }
        })!
      )
      //this.form.get('monney')?.disable();
      //this.form.get('coefficient')?.disable();
    }
    onBufferFormCreated(form: FormGroup) {
    }
    onFormReinit(e: string): void {
      this.formInitStringValue = e;
    }
}
