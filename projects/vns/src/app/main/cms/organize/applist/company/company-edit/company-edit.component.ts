import { Component, OnDestroy, OnInit } from '@angular/core';
import { EnumTranslateKey, api } from 'alpha-global-constants';

import { CompanyService } from '../company.services';
import { Validators, FormGroup } from '@angular/forms';
import { BaseEditComponent, ICoreDropdownOption, ICorePageEditColumnComposition, ICorePageEditCRUD, ICoreFormSection, EnumFormBaseContolType, EnumCoreFormControlSeekerSourceType, AppService, DialogService, MultiLanguageService, IFormatedResponse } from 'ngx-histaff-alpha';
import { Subscription, BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-company-edit',
  templateUrl: './company-edit.component.html',
  styleUrls: ['./company-edit.component.scss'],
})
export class CompanyEditComponent extends BaseEditComponent implements OnInit, OnDestroy {
  override entityTable = 'HU_COMPANY';

  loading: boolean = false;

  subsctiptions: Subscription[] = [];

  sysOtherlistGetByIdObject$ = new BehaviorSubject<any>(null);
  sysOtherlistGetByIdApi = api.SYS_OTHERLIST_READ;

  sysOtherlistGetById2Object$ = new BehaviorSubject<any>(null);
  sysOtherlistGetById2Api = api.SYS_OTHERLIST_READ;

  employeeGetByIdObject$ = new BehaviorSubject<any>(null);
  employeeGetByIdApi = api.HU_EMPLOYEE_READ;

  region$ = new BehaviorSubject<ICoreDropdownOption[]>([]);

  unit$ = new BehaviorSubject<ICoreDropdownOption[]>([]);

  captionCode!: EnumTranslateKey;
  formComposition!: ICorePageEditColumnComposition[][];
  crud!: ICorePageEditCRUD;
  sections: ICoreFormSection[] = [
    {
      rows: [
        [
          {
            flexSize: 6,
            label: EnumTranslateKey.UI_COMPONENT_LABEL_COMPANY_ID,
            field: 'id',
            value: '',
            controlType: EnumFormBaseContolType.TEXTBOX,
            readonly: true,
            hidden: true,
            type: 'text',
          },
        ],
        [
          {
            flexSize: 4,
            label: EnumTranslateKey.UI_COMPONENT_LABEL_COMPANY_CODE,
            field: 'code',
            value: '',
            controlType: EnumFormBaseContolType.TEXTBOX,
            readonly: true,
            type: 'text',
            validators: [
              {
                name: 'required',
                validator: Validators.required,
                errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
              },
            ],
          },
          {
            flexSize: 4,
            label: EnumTranslateKey.UI_COMPONENT_LABEL_COMPANY_NAME_VN,
            field: 'nameVn',
            value: '',
            controlType: EnumFormBaseContolType.TEXTBOX,
            readonly: false,
            type: 'text',
            validators: [
              {
                name: 'required',
                validator: Validators.required,
                errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
              },
            ],
          },
          {
            flexSize: 4,
            label: EnumTranslateKey.UI_COMPONENT_LABEL_COMPANY_NAME_EN,
            field: 'nameEn',
            value: '',
            controlType: EnumFormBaseContolType.TEXTBOX,
            readonly: false,
            type: 'text',
          },
        ],
        [
          {
            flexSize: 4,
            label: EnumTranslateKey.UI_COMPONENT_LABEL_COMPANY_SHORT_NAME,
            field: 'shortName',
            value: '',
            controlType: EnumFormBaseContolType.TEXTBOX,
            readonly: false,
            type: 'text',
            validators: [
              {
                name: 'required',
                validator: Validators.required,
                errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
              },
            ],
          },
          //vvungf
          {
            flexSize: 4,
            label: EnumTranslateKey.UI_COMPONENT_LABEL_COMPANY_ADDRESS_GPKD,
            field: 'gpkdAddress',
            value: '',
            controlType: EnumFormBaseContolType.TEXTBOX,
            readonly: false,
            type: 'text',
            validators: [
              {
                name: 'required',
                validator: Validators.required,
                errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
              },
            ],
          },

          {
            flexSize: 4,
            label: EnumTranslateKey.UI_COMPONENT_LABEL_COMPANY_ADDRESS_WORKING,
            field: 'workAddress',
            value: '',
            controlType: EnumFormBaseContolType.TEXTBOX,
            readonly: false,
            type: 'text',
          },
        ],
        [
          {
            flexSize: 4,
            label: EnumTranslateKey.UI_COMPONENT_LABEL_COMPANY_REGION,
            field: 'regionId',
            value: '',
            getByIdObject$: this.sysOtherlistGetByIdObject$,
            getByIdApi: this.sysOtherlistGetByIdApi,
            shownFrom: 'name',
            controlType: EnumFormBaseContolType.DROPDOWN,
            dropdownOptions$: this.region$,
            type: 'number',
          },
          {
            flexSize: 4,
            label: EnumTranslateKey.UI_COMPONENT_LABEL_COMPANY_INSURANCE_UNIT,
            field: 'insUnit',
            value: '',
            getByIdObject$: this.sysOtherlistGetById2Object$,
            getByIdApi: this.sysOtherlistGetById2Api,
            shownFrom: 'name',
            controlType: EnumFormBaseContolType.DROPDOWN,
            dropdownOptions$: this.unit$,
            type: 'number',
          },
          {
            flexSize: 4,
            label: EnumTranslateKey.UI_COMPONENT_TITLE_COMPANY_GPKD,
            field: 'gpkdNo',
            value: '',
            controlType: EnumFormBaseContolType.TEXTBOX,
            readonly: false,
            type: 'text',
          },
        ],
        [
          {
            flexSize: 4,
            label: EnumTranslateKey.UI_COMPONENT_LABEL_COMPANY_TAX,
            field: 'pitCode',
            value: '',
            controlType: EnumFormBaseContolType.TEXTBOX,
            readonly: false,
            type: 'text',
          },
          {
            flexSize: 4,
            label: EnumTranslateKey.UI_COMPONENT_LABEL_COMPANY_TAX_DATE,
            field: 'pitCodeDate',
            value: new Date(),
            controlType: EnumFormBaseContolType.DATEPICKER,
            type: 'date',
          },
        ],
        [
          {
            flexSize: 4,
            label: EnumTranslateKey.UI_COMPONENT_TITLE_COMPANY_REPRESENT,
            field: 'representativeId',
            value: '',
            controlType: EnumFormBaseContolType.SEEKER,
            seekerSourceType: EnumCoreFormControlSeekerSourceType.EMPLOYEE_SEEK,
            getByIdObject$: this.employeeGetByIdObject$,
            getByIdApi: this.employeeGetByIdApi,
            boundFrom: 'id',
            shownFrom: 'fullname',
            alsoBindTo: [{ takeFrom: 'positionName', bindTo: 'representativeTitle' }],
            /* END: WHEN USING controlType === EnumFormBaseContolType.SEEKER */
            type: 'text',
          },
          // {
          //   flexSize: 4,
          //   label: EnumTranslateKey.UI_COMPONENT_TITLE_COMPANY_REPRESENT,
          //   field: 'representativeName',
          //   value: '',
          //   controlType: EnumFormBaseContolType.TEXTBOX,
          //   readonly: true, // We will update this field programatically
          //   type: 'text',
          //   disabled: true
          // },
          {
            flexSize: 4,
            label: EnumTranslateKey.UI_COMPONENT_TITLE_COMPANY_TITLE,
            field: 'representativeTitle',
            value: '',
            controlType: EnumFormBaseContolType.TEXTBOX,
            readonly: true, // We will update this field programatically
            type: 'text',
            disabled: true,
          },
        ],
        [
          {
            flexSize: 4,
            label: EnumTranslateKey.UI_COMPONENT_TITLE_COMPANY_PHONE,
            field: 'phoneNumber',
            value: '',
            controlType: EnumFormBaseContolType.TEXTBOX,
            readonly: false,
            type: 'text',
          },
          {
            flexSize: 4,
            label: EnumTranslateKey.UI_COMPONENT_TITLE_COMPANY_EMAIL,
            field: 'email',
            value: '',
            controlType: EnumFormBaseContolType.TEXTBOX,
            readonly: false,
            type: 'text',
          },
          {
            flexSize: 4,
            label: EnumTranslateKey.UI_COMPONENT_TITLE_COMPANY_FAX,
            field: 'fax',
            value: '',
            controlType: EnumFormBaseContolType.TEXTBOX,
            readonly: false,
            type: 'text',
          },
        ],
        [
          {
            flexSize: 12,
            label: EnumTranslateKey.UI_COMPONENT_TITLE_COMPANY_OTHER_INFO,
            field: 'note',
            value: '',
            controlType: EnumFormBaseContolType.TEXTBOX,
            readonly: false,
            type: 'text',
          },
          // {
          //   flexSize: 4,
          //   label: EnumTranslateKey.UI_COMPONENT_TITLE_COMPANY_STT,
          //   field: 'order',
          //   value: '',
          //   controlType: EnumFormBaseContolType.TEXTBOX,
          //   readonly: false,
          //   type: 'text',
          //   validators: [
          //     {
          //       name: 'required',
          //       validator: Validators.required,
          //       errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
          //     }
          //   ]
          // },
        ],
      ],
    },
  ];
  constructor(
    private appService: AppService,
    public override dialogService: DialogService,
    private mls: MultiLanguageService,
    private slrService: CompanyService,
  ) {
    super(dialogService);

    this.captionCode = EnumTranslateKey.UI_COMPONENT_TITLE_COMPANY_EDIT;

    this.crud = {
      c: api.HU_COMPANY_CREATE,
      r: api.HU_COMPANY_READ,
      u: api.HU_COMPANY_UPDATE,
      d: api.HU_COMPANY_DELETE,
    };
  }
  ngOnInit(): void {
    this.loading = true;
    this.subsctiptions.push(
      this.appService.get(api.SYS_OTHERLIST_GETOTHERLISTBYTYPE + 'INS_REGION').subscribe((res: any) => {
        if (!!res.ok && res.status === 200) {
          const body: IFormatedResponse = res.body;
          if (body.statusCode === 200 && !!body.innerBody) {
            const options: { value: number | null; text: string }[] = [];
            options.push({
              value: null,
              text: '',
            });
            res.body.innerBody.map((g: any) => {
              options.push({
                value: g.id,
                text: g.name,
              });
            });
            this.region$.next(options);
            // END ONE LOGIC
          }
        }
      }),
      this.appService.get(api.SYS_OTHERLIST_GETOTHERLISTBYTYPE + 'INS_UNIT').subscribe((res: any) => {
        if (!!res.ok && res.status === 200) {
          const body: IFormatedResponse = res.body;
          if (body.statusCode === 200 && !!body.innerBody) {
            const options: { value: number | null; text: string }[] = [];
            options.push({
              value: null,
              text: '',
            });
            res.body.innerBody.map((g: any) => {
              options.push({
                value: g.id,
                text: g.name,
              });
            });
            this.unit$.next(options);
            // END ONE LOGIC
          }
        }
      }),
    );
  }

  /* GET FormGroup Instance */
  onFormCreated(e: FormGroup): void {
    this.form = e;

    this.subsctiptions.push(
      this.slrService.getCode().subscribe((response: any) => {
        console.log(this.form.get('code'));
        if (this.form.get('code')?.value == '') this.form.get('code')?.patchValue(response.body.innerBody.code);
      }),
    );
  }

  /* To allow form to be deactivated */
  onFormReinit(e: string): void {
    this.formInitStringValue = e;
  }

  ngOnDestroy(): void {
    this.subsctiptions.map((x) => x?.unsubscribe());
  }
}
