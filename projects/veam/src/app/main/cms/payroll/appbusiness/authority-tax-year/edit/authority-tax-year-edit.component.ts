import { Component } from "@angular/core";
import { Validators, FormGroup } from "@angular/forms";
import { api, EnumTranslateKey } from 'alpha-global-constants';
import { BaseEditComponent, ICoreDropdownOption, ICorePageEditColumnComposition, ICorePageEditCRUD, ICoreFormSection, EnumFormBaseContolType, EnumCoreFormControlSeekerSourceType, DialogService, AppService, ResponseService, AlertService, CoreFormService } from "ngx-histaff-alpha";
import { BehaviorSubject, Subscription } from "rxjs";


@Component({
  selector: 'app-authority-tax-year-edit',
  templateUrl: './authority-tax-year-edit.component.html',
  styleUrls: ['./authority-tax-year-edit.component.scss']
})
export class AuthorityTaxYearEditComponent extends BaseEditComponent {

  /* Properties to be passed into core-page-edit */

  override entityTable = "PA_AUTHORITY_TAX_YEAR";

  employeeGetByIdObject$ = new BehaviorSubject<any>(null);
  employeeGetByIdApi = api.HU_EMPLOYEE_READ;

  welfareOptions$ = new BehaviorSubject<ICoreDropdownOption[]>([]);
  huWelfareGetByIdObject$ = new BehaviorSubject<any>(null);
  huWelfareGetByIdApi = api.HU_WELFARE_READ;

  loading: boolean = false;
  defCosts: string = '';

  subsctiptions: Subscription[] = [];
  effectDate!: any;
  expireDate!: any;
  captionCode!: EnumTranslateKey;
  formComposition!: ICorePageEditColumnComposition[][];
  crud!: ICorePageEditCRUD;
  sections: ICoreFormSection[] =
    [
      {
        rows: [
          [
            {
              flexSize: 0,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_COMMON_ID,
              field: 'id',
              value: 0,
              controlType: EnumFormBaseContolType.TEXTBOX,
              readonly: true,
              hidden: true,
              type: 'text'
            },
          ],
          [
            {
              flexSize: 6,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_PA_AUTHORITY_TAX_YEAR_EMPLOYEE_CODE,
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
              alsoBindTo: [
                { takeFrom: 'fullname', bindTo: 'employeeName' },
                { takeFrom: 'positionName', bindTo: 'positionName' },
                { takeFrom: 'orgName', bindTo: 'departmentName' }],
              /* END: WHEN USING controlType === EnumFormBaseContolType.SEEKER */
              type: 'number',
              readonly: false,
              disabled: true,
            },
            {
              flexSize: 6,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_PA_AUTHORITY_TAX_YEAR_EMPLOYEE_NAME,
              field: 'employeeName',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              readonly: false,
              type: 'text',
              disabled: true,
            },
            
          ],
          [
            {
              flexSize: 6,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_PA_AUTHORITY_TAX_YEAR_POSITION_NAME,
              field: 'positionName',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              readonly: false,
              type: 'text',
              disabled: true,
            },
            {
              flexSize: 6,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_PA_AUTHORITY_TAX_YEAR_DEPARTMENT_NAME,
              field: 'departmentName',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              type: 'text',
              disabled: true,
            },
          ],
          [
            {
              flexSize: 6,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_PA_AUTHORITY_TAX_YEAR_YEAR,
              field: 'year',
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
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_PA_AUTHORITY_TAX_YEAR_IS_EMP_REGISTER,
              field: 'isEmpRegister',
              value: '',
              controlType: EnumFormBaseContolType.CHECKBOX,
              type: 'boolean',
            },
            {
              flexSize: 3,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_PA_AUTHORITY_TAX_YEAR_IS_COM_APPROVE,
              field: 'isComApprove',
              value: '',
              controlType: EnumFormBaseContolType.CHECKBOX,
              type: 'boolean',
            },
          ],
          [
            {
              flexSize: 6,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_PA_AUTHORITY_TAX_YEAR_REASON_REJECT,
              field: 'reasonReject',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              type: 'text',
            },
            {
              flexSize: 6,
              label: EnumTranslateKey.UI_COMPONENT_LABEL_WELFARE_NOTE,
              field: 'note',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              type: 'text',
            },
          ],
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
              objectList$: new BehaviorSubject<any[]>([]),
              getObjectListFrom: 'employeeList',
              getByIdObject$: this.employeeGetByIdObject$,
              getByIdApi: this.employeeGetByIdApi,
              boundFrom: 'id',
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
    private appService: AppService, 
    private responseService: ResponseService,
    private alertService: AlertService,
    private coreFormService: CoreFormService
  ) {

    super(dialogService);

    this.captionCode = EnumTranslateKey.UI_COMPONENT_TITLE_PA_AUTHORITY_TAX_YEAR;

    this.crud = {
      c: api.PA_AUTHORITY_TAX_YEAR_CREATE,
      r: api.PA_AUTHORITY_TAX_YEAR_READ,
      u: api.PA_AUTHORITY_TAX_YEAR_UPDATE,
      d: api.PA_AUTHORITY_TAX_YEAR_DELETE_IDS,
    };

  }

  ngOnInit(): void {
    this.loading = true;
  }

  /* GET FormGroup Instance */
  onFormCreated(e: FormGroup): void {
    this.form = e;
    console.log(this.form);
    console.log(e.value.id);
    if(e.value.id !== 0)
    {
      var empsObj = this.coreFormService.getFormBaseControlByName(this.sections, 'employeeIds');
      var empCodeObj = this.coreFormService.getFormBaseControlByName(this.sections, 'employeeId');
      var employeeNameObj = this.coreFormService.getFormBaseControlByName(this.sections, 'employeeName');
      var orgNameObj = this.coreFormService.getFormBaseControlByName(this.sections, 'departmentName');
      var positionNameObj = this.coreFormService.getFormBaseControlByName(this.sections, 'positionName');
      if (empsObj) {
        debugger
        empsObj.hidden=true;
        this.form.get('employeeIds')?.clearValidators();
        this.form.get('employeeIds')?.updateValueAndValidity();
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
      if (positionNameObj) {
        positionNameObj.hidden=false;
      }
    }else{
      var empCodeObj = this.coreFormService.getFormBaseControlByName(this.sections, 'employeeId');
      var employeeNameObj = this.coreFormService.getFormBaseControlByName(this.sections, 'employeeName');
      var orgNameObj = this.coreFormService.getFormBaseControlByName(this.sections, 'departmentName');
      var positionNameObj = this.coreFormService.getFormBaseControlByName(this.sections, 'positionName');
      if (empCodeObj) {
        empCodeObj.hidden=true;
      }
      if (employeeNameObj) {
        employeeNameObj.hidden=true;
      }
      if (orgNameObj) {
        orgNameObj.hidden=true;
      }
      if (positionNameObj) {
        positionNameObj.hidden=true;
      }
    }
  }

  /* To allow form to be deactivated */
  onFormReinit(e: string): void {
    this.formInitStringValue = e;
  }

  ngOnDestroy(): void {
    this.subsctiptions.map(x => x?.unsubscribe() )
  }


}