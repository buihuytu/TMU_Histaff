import { Component } from "@angular/core";
import { Validators, FormGroup } from "@angular/forms";
import { api, EnumTranslateKey } from 'alpha-global-constants';
import { BaseEditComponent, ICoreDropdownOption, ICorePageEditColumnComposition, ICorePageEditCRUD, ICoreFormSection, EnumFormBaseContolType, DialogService } from "ngx-histaff-alpha";
import { Subscription, BehaviorSubject, map } from "rxjs";
import { InsListContractEditService } from "./ins-list-contract-edit.service";


@Component({
  selector: 'app-ins-list-contract-edit',
  templateUrl: './ins-list-contract-edit.component.html',
  styleUrls: ['./ins-list-contract-edit.component.scss']
})
export class InsListContractEditComponent extends BaseEditComponent {
  override entityTable = 'INS_LIST_CONTRACT';
  subscriptions: Subscription[] = [];

  loading: boolean = false;

  yearPeroidGetByIdObject$ = new BehaviorSubject<any>(null);
  yearPeroidOptions$ = new BehaviorSubject<ICoreDropdownOption[]>([]);
  yearPeroidGetByIdApi = api.AT_SALARY_PERIOD_READ;

  unitInsuranceGetByIdObject$ = new BehaviorSubject<any>(null);
  unitInsuranceOption$ = new BehaviorSubject<ICoreDropdownOption[]>([]);
  unitInsGetByIdApi = api.INS_CHANGE_UNIT_INSURANCE;

  calDateTypeGetByIdObject$ = new BehaviorSubject<any>(null);
  calDateTypeOptions$ = new BehaviorSubject<ICoreDropdownOption[]>([]);
  calDateTypeGetByIdApi = api.INS_REGIMES_GET_DATE_TYPE;
  ///api/InsChange/GetOtherListInsType
  captionCode!: EnumTranslateKey;
  formComposition!: ICorePageEditColumnComposition[][];
  crud!: ICorePageEditCRUD;
  sections: ICoreFormSection[] = [
    {
      rows: [
        [
          {
            flexSize: 0,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_INS_GROUP_ID,
            field: 'id',
            value: '',
            hidden: true,
            controlType: EnumFormBaseContolType.TEXTBOX,
          },
          {
            flexSize: 6,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_INS_LIST_CONTRACT_NO,
            field: 'contractInsNo',
            value: '',
            controlType: EnumFormBaseContolType.TEXTBOX,
            type: 'text',
            readonly: false,
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
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_INS_LIST_CONTRACT_YEAR,
            field: 'year',
            value: '',
            controlType: EnumFormBaseContolType.DROPDOWN,
            dropdownOptions$: this.yearPeroidOptions$,
            getByIdObject$: this.yearPeroidGetByIdObject$,
            // getByIdApi: this.yearPeroidGetByIdApi,
            shownFrom: 'name',
            readonly: false,
            type: 'string',
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
          {
            flexSize: 12,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_INS_LIST_CONTRACT_ORG_INS,
            field: 'orgInsurance',
            value: '',
            controlType: EnumFormBaseContolType.DROPDOWN,
            dropdownOptions$: this.unitInsuranceOption$,
            getByIdObject$: this.unitInsuranceGetByIdObject$,
            getByIdApi: this.unitInsGetByIdApi,
            shownFrom: 'unitInsuranceTypeName',
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
        ],
        [
          {
            flexSize: 6,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_INS_LIST_CONTRACT_START_DATE,
            field: 'startDate',
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
            ],
          },
          {
            flexSize: 6,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_INS_LIST_CONTRACT_EXPIRE_DATE,
            field: 'expireDate',
            value: '',
            controlType: EnumFormBaseContolType.DATEPICKER,
            type: 'date',
            readonly: true,
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
          {
            flexSize: 6,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_INS_LIST_CONTRACT_VALCO,
            field: 'valCo',
            value: '',
            controlType: EnumFormBaseContolType.CURRENCY,
            readonly: false,
            type: 'number',
          },
          {
            flexSize: 6,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_INS_LIST_CONTRACT_BYDATE,
            field: 'buyDate',
            value: '',
            controlType: EnumFormBaseContolType.DATEPICKER,
            readonly: false,
            type: 'date',
          },
        ],
        [
          {
            flexSize: 6,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_INS_LIST_CONTRACT_SALINSU,
            field: 'salInsu',
            value: '',
            controlType: EnumFormBaseContolType.CURRENCY,
            readonly: false,
            type: 'number',
          },
          {
            flexSize: 6,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_INS_LIST_CONTRACT_PROGRAM,
            field: 'program',
            value: '',
            controlType: EnumFormBaseContolType.TEXTBOX,
            readonly: false,
            type: 'string',
          },
        ],
        [
          {
            flexSize: 12,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_INS_LIST_CONTRACT_NOTE,
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

  constructor(
    public override dialogService: DialogService,
    private ilcService: InsListContractEditService
  ) {
    super(dialogService);

    this.captionCode = EnumTranslateKey.UI_COMPONENT_TITLE_INS_LIST_CONTRACT;

    this.crud = {
      c: api.INS_LIST_CONTRACT_CREATE,
      r: api.INS_LIST_CONTRACT_READ,
      u: api.INS_LIST_CONTRACT_UPDATE,
      d: api.INS_LIST_CONTRACT_DELETE_IDS,
    };
  }

  /* GET FormGroup Instance */
  onFormCreated(e: FormGroup): void {
    this.form = e;
  }

  /* To allow form to be deactivated */
  onFormReinit(e: string): void {
    this.formInitStringValue = e;
    this.ilcService
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
          this.unitInsuranceOption$.next(response);
          this.loading = false;
        });
  }

  ngOnInit(): void { }
  ngAfterViewInit(): void {
    setTimeout(() => {
      this.loading = true;
      this.ilcService
        .getListYearPeroid()
        .pipe(
          map((x: any) => {
            if (x.ok && x.status === 200) {
              const options: { value: number; text: string }[] = [];
              x.body.innerBody.map((g: any) => {
                options.push({
                  value: g,
                  text: g.toString(),
                });
              });
              return options;
            } else {
              return [];
            }
          })
        )
        .subscribe((response) => {
          this.yearPeroidOptions$.next(response);
          this.loading = false;
        });
    });
  }
}
