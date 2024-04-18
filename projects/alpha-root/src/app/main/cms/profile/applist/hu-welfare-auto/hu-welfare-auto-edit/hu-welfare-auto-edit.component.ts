import { Component } from "@angular/core";
import { Validators, FormGroup } from "@angular/forms";
import { api, EnumTranslateKey } from 'alpha-global-constants';
import { BaseEditComponent, ICoreDropdownOption, ICorePageEditCRUD, ICoreFormSection, EnumFormBaseContolType, EnumCoreFormControlSeekerSourceType, EnumCoreTablePipeType, DialogService } from "ngx-histaff-alpha";
import { BehaviorSubject, map } from "rxjs";
import { HuWelfareAutoService } from "./hu-welfare-auto-service";

@Component({
  selector: 'app-hu-welfare-auto-edit',
  templateUrl: './hu-welfare-auto-edit.component.html',
  styleUrls: ['./hu-welfare-auto-edit.component.scss'],
})
export class HuWelfareAutoEditComponent extends BaseEditComponent {
  loading: boolean = false;
  override entityTable = 'HU_WELFARE_AUTO';
  yearGetByIdObject$ = new BehaviorSubject<any>(null);
  salaryPeriodGetByIdObject$ = new BehaviorSubject<any>(null);
  salaryPeriodGetByIdApi = api.AT_SALARY_PERIOD_READ;
  yearOptions$ = new BehaviorSubject<ICoreDropdownOption[]>([]);

  genderGetByIdObject$ = new BehaviorSubject<any>(null);
  genderGetByIdApi = api.SYS_OTHERLIST_READ;
  genderOptions$ = new BehaviorSubject<ICoreDropdownOption[]>([]);

  benefitGetByIdObject$ = new BehaviorSubject<any>(null);
  benefitGetByIdApi = api.HU_WELFARE_READ;
  benefitOptions$ = new BehaviorSubject<ICoreDropdownOption[]>([]);

  employeeGetByIdObject$ = new BehaviorSubject<any>(null);
  employeeGetByIdApi = api.HU_EMPLOYEE_READ;

  workingGetByIdObject$ = new BehaviorSubject<any>(null);
  workingGetByIdApi = api.HU_DECISION_READ;

  captionCode!: EnumTranslateKey;
  crud!: ICorePageEditCRUD;

  sections: ICoreFormSection[] = [
    {
      rows: [
        [
          {
            flexSize: 12,
            label: EnumTranslateKey.UI_COMPONENT_LABEL_LANGUAGE_ID,
            field: 'id',
            value: '',
            controlType: EnumFormBaseContolType.TEXTBOX,
            readonly: true,
            hidden: true,
            type: 'text',
          },
          {
            flexSize: 0,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_EMPLOYEE_CODE,
            field: 'employeeCode',
            value: '',
            controlType: EnumFormBaseContolType.TEXTBOX,
            hidden: true,
          },
          {
            flexSize: 4,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_EMPLOYEE_CODE,
            field: 'employeeID',
            type: 'number',
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
              { takeFrom: 'code', bindTo: 'employeeCode' },
              { takeFrom: 'fullname', bindTo: 'employeeName' },
              { takeFrom: 'positionName', bindTo: 'positionName' },
              { takeFrom: 'orgName', bindTo: 'orgName' },
            ],
            /* END: WHEN USING controlType === EnumFormBaseContolType.SEEKER */

            validators: [
              {
                name: 'required',
                validator: Validators.required,
                errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
              },
              {
                name: 'minLength',
                validator: Validators.minLength(1),
                errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_MIN_LENGTH,
              },
            ],
          },

          {
            flexSize: 4,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_EMPLOYEE_FULLNAME,
            field: 'employeeName',
            value: '',
            controlType: EnumFormBaseContolType.TEXTBOX,
            readonly: true, // We will update this field programatically
            type: 'text',
          },
          {
            flexSize: 4,
            label: EnumTranslateKey.UI_COMPONENT_TITLE_HU_COMMEND_ORG_NAME,
            field: 'orgName',
            value: '',
            controlType: EnumFormBaseContolType.TEXTBOX,
            readonly: true, // We will update this field programatically
            type: 'text',
          },
          {
            flexSize: 4,
            label: EnumTranslateKey.UI_COMPONENT_TITLE_HU_COMMEND_POSITION_NAME,
            field: 'positionName',
            value: '',
            controlType: EnumFormBaseContolType.TEXTBOX,
            readonly: true, // We will update this field programatically
            type: 'text',
          },
          {
            flexSize: 4,
            label:
              EnumTranslateKey.UI_COMPONENT_TITLE_HU_WELFARE_AUTO_CONTRACT_NAME,
            field: 'contractTypeName',
            value: '',
            controlType: EnumFormBaseContolType.TEXTBOX,
            readonly: true, // We will update this field programatically
            type: 'text',
          },
          {
            flexSize: 4,
            label:
              EnumTranslateKey.UI_COMPONENT_TITLE_HU_WELFARE_AUTO_BIRTH_DATE,
            field: 'birthDate',
            value: '',
            controlType: EnumFormBaseContolType.DATEPICKER,
            readonly: true, // We will update this field programatically
            type: 'date',
            validators: [
              {
                name: 'required',
                validator: Validators.required,
                errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
              },
              {
                name: 'minLength',
                validator: Validators.minLength(1),
                errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_MIN_LENGTH,
              },
            ],
          },
          {
            flexSize: 4,
            label: EnumTranslateKey.UI_COMPONENT_TITLE_HU_WELFARE_AUTO_YEAR,
            field: 'year',
            value: '',
            controlType: EnumFormBaseContolType.TEXTBOX,
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
                errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_MIN_LENGTH,
              },
            ],
          },
          {
            flexSize: 4,
            label:EnumTranslateKey.UI_COMPONENT_TITLE_HU_WELFARE_AUTO_WELFARE_ID,
            field: 'salaryPeriodId',
            value: '',
            getByIdObject$: this.salaryPeriodGetByIdObject$,
            getByIdApi:this.salaryPeriodGetByIdApi,
            controlType: EnumFormBaseContolType.DROPDOWN,
            shownFrom: 'name',
            dropdownOptions$: this.yearOptions$,
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
                errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_MIN_LENGTH,
              },
            ],
          },

          {
            flexSize: 4,
            label:
              EnumTranslateKey.UI_COMPONENT_TITLE_HU_WELFARE_AUTO_BENEFIT_NAME,
            field: 'welfareId',
            value: '',
            getByIdObject$: this.benefitGetByIdObject$,
            getByIdApi: this.benefitGetByIdApi,
            controlType: EnumFormBaseContolType.DROPDOWN,
            shownFrom: 'name',
            dropdownOptions$: this.benefitOptions$,
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
                errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_MIN_LENGTH,
              },
            ],
          },
          {
            flexSize: 4,
            label:
              EnumTranslateKey.UI_COMPONENT_TITLE_HU_WELFARE_AUTO_COUNT_CHILD,
            field: 'countChild',
            value: '',
            controlType: EnumFormBaseContolType.TEXTBOX,
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
                errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_MIN_LENGTH,
              },
            ],
          },
          {
            flexSize: 4,
            label: EnumTranslateKey.UI_COMPONENT_TITLE_HU_WELFARE_AUTO_GENDER,
            field: 'genderId',
            value: '',
            getByIdObject$: this.genderGetByIdObject$,
            getByIdApi: this.genderGetByIdApi,
            controlType: EnumFormBaseContolType.DROPDOWN,
            shownFrom: 'name',
            dropdownOptions$: this.genderOptions$,
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
                errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_MIN_LENGTH,
              },
            ],
          },
          {
            flexSize: 4,
            label:
              EnumTranslateKey.UI_COMPONENT_TITLE_HU_WELFARE_AUTO_SENIORITY,
            field: 'seniority',
            value: '',
            controlType: EnumFormBaseContolType.TEXTBOX,
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
                errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_MIN_LENGTH,
              },
            ],
          },
          {
            flexSize: 4,
            label: EnumTranslateKey.UI_COMPONENT_TITLE_HU_WELFARE_AUTO_MONEY,
            field: 'money',
            value: '',
            controlType: EnumFormBaseContolType.TEXTBOX,
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
                errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_MIN_LENGTH,
              },
            ],
          },
          {
            flexSize: 4,
            label:
              EnumTranslateKey.UI_COMPONENT_TITLE_HU_WELFARE_AUTO_EFFECTIVE_DATE,
            field: 'effectiveDate',
            value: '',
            controlType: EnumFormBaseContolType.DATEPICKER,
            readonly: true, // We will update this field programatically
            type: 'date',
            validators: [
              {
                name: 'required',
                validator: Validators.required,
                errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
              },
              {
                name: 'minLength',
                validator: Validators.minLength(1),
                errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_MIN_LENGTH,
              },
            ],
          },
          {
            flexSize: 4,
            label:
              EnumTranslateKey.UI_COMPONENT_TITLE_HU_WELFARE_AUTO_EXPIRATION_DATE,
            field: 'expirationDate',
            value: '',
            controlType: EnumFormBaseContolType.DATEPICKER,
            readonly: true, // We will update this field programatically
            type: 'date',
            validators: [
              {
                name: 'required',
                validator: Validators.required,
                errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
              },
              {
                name: 'minLength',
                validator: Validators.minLength(1),
                errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_MIN_LENGTH,
              },
            ],
          },
        ],
      ],
    },
    {
      updateModeOnly: true,
      rows: [
        [
          {
            flexSize: 6,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_COMMON_CREATED_DATE,
            field: 'createdDate',
            value: '',
            controlType: EnumFormBaseContolType.TEXTBOX,
            type: 'text',
            readonly: true,
            pipe: EnumCoreTablePipeType.DATE_TIME,
          },
          {
            flexSize: 6,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_COMMON_CREATED_BY,
            field: 'createdByUsername',
            value: '',
            controlType: EnumFormBaseContolType.TEXTBOX,
            type: 'text',
            readonly: true,
          },
        ],
        [
          {
            flexSize: 6,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_COMMON_UPDATED_DATE,
            field: 'updatedDate',
            value: '',
            controlType: EnumFormBaseContolType.TEXTBOX,
            readonly: true,
            type: 'text',
            pipe: EnumCoreTablePipeType.DATE_TIME,
          },
          {
            flexSize: 6,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_COMMON_UPDATED_BY,
            field: 'updatedByUsername',
            value: '',
            controlType: EnumFormBaseContolType.TEXTBOX,
            textareaRows: 12,
            readonly: true,
            type: 'text',
          },
        ],
      ],
    },
  ];

  constructor(
    public override dialogService: DialogService,
    private huWelfareAutoService: HuWelfareAutoService
  ) {
    super(dialogService);

    this.captionCode = EnumTranslateKey.UI_COMPONENT_TITLE_HU_WELFARE_AUTO;

    this.crud = {
      c: api.HU_WELFARE_AUTO_CREATE,
      r: api.HU_WELFARE_AUTO_READ,
      u: api.HU_WELFARE_AUTO_UPDATE,
      d: api.HU_WELFARE_AUTO_DELETE_IDS,
    };
  }
  /* GET FormGroup Instance */
  onFormCreated(e: FormGroup): void {
    this.form = e;
  }

  onFormReinit(e: string): void {
    this.formInitStringValue = e;
  }
  ngOnInit(): void {
    (this.loading = true),
      this.huWelfareAutoService
        .getAllPeriodYear()
        .pipe(
          map((x: any) => {
            console.log(x);
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
          this.yearOptions$.next(response);
          this.loading = false;
        });
    this.huWelfareAutoService
      .getAllGender()
      .pipe(
        map((x: any) => {
          console.log(x);
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
        this.genderOptions$.next(response);
        this.loading = false;
      });
    this.huWelfareAutoService
      .getAllWelfareByKey()
      .pipe(
        map((x: any) => {
          console.log(x);
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
        this.benefitOptions$.next(response);
        this.loading = false;
      });
  }
}
