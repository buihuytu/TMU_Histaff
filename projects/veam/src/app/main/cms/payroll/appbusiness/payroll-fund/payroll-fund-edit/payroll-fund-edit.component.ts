import { Component, OnDestroy } from "@angular/core";
import { Validators, FormGroup } from "@angular/forms";
import { api, EnumTranslateKey } from 'alpha-global-constants';
import { BaseEditComponent, ICoreDropdownOption, ICorePageEditCRUD, ICoreFormSection, EnumFormBaseContolType, EnumCoreTablePipeType, DialogService } from "ngx-histaff-alpha";
import { Subscription, BehaviorSubject, distinctUntilChanged, map } from "rxjs";
import { PayrollFundEditService } from "./payroll-fund.edit.service";


@Component({
  selector: 'app-payroll-fund-edit',
  templateUrl: './payroll-fund-edit.component.html',
  styleUrls: ['./payroll-fund-edit.component.scss'],
})
export class PayrollFundEditComponent extends BaseEditComponent implements OnDestroy {
  loading: boolean = false;
  override entityTable = 'PA_PAYROLL_FUND';

  subscriptions: Subscription[] = [];

  monthOptions$ = new BehaviorSubject<ICoreDropdownOption[]>([]);
  monthGetByIdObject$ = new BehaviorSubject<any>(null);
  monthGetByIdApi = api.AT_SALARY_PERIOD_READ;

  companyOptions$ = new BehaviorSubject<ICoreDropdownOption[]>([]);
  companyGetByIdObject$ = new BehaviorSubject<any>(null);
  companyNameGetByIdApi = api.HU_COMPANY_READ;

  listFundSourceOptions$ = new BehaviorSubject<ICoreDropdownOption[]>([]);
  listFundSourceGetByIdObject$ = new BehaviorSubject<any>(null);
  listFundSourceGetByIdApi = api.PA_LIST_FUND_SOURCE_READ;

  listFundOptions$ = new BehaviorSubject<ICoreDropdownOption[]>([]);
  listFundGetByIdObject$ = new BehaviorSubject<any>(null);
  listFundGetByIdApi = api.PA_LISTFUND_READ;

  captionCode!: EnumTranslateKey;
  crud!: ICorePageEditCRUD;
  sections: ICoreFormSection[] = [
    {
      rows: [
        [
          {
            flexSize: 0,
            label: EnumTranslateKey.UI_LABEL_TRAINING_CENTER_ID,
            value: '',
            controlType: EnumFormBaseContolType.TEXTBOX,
            field: 'id',
            readonly: true,
            hidden: true,
            type: 'text',
          },
          {
            flexSize: 6,
            label: EnumTranslateKey.UI_COMPONENT_LABEL_PA_PAYROLL_FUND_YEAR,
            field: 'year',
            value: '',
            controlType: EnumFormBaseContolType.TEXTBOX,
            readonly: false,
            type: 'number',
            validators: [
              {
                name: 'required',
                validator: Validators.required,
                errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
              },
              {
                name: 'minLength',
                validator: Validators.minLength(4),
                errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_MIN_LENGTH,
              },
              {
                name: 'min',
                validator: Validators.min(0),
                errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_MIN,
              },
              {
                name: 'maxLength',
                validator: Validators.maxLength(4),
                errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_MAX,
              },
            ],
          },
          {
            flexSize: 6,
            label: EnumTranslateKey.UI_COMPONENT_LABEL_PA_PAYROLL_FUND_MONTH,
            field: 'salaryPeriodId',
            value: '',
            controlType: EnumFormBaseContolType.DROPDOWN,
            dropdownOptions$: this.monthOptions$,
            getByIdObject$: this.monthGetByIdObject$,
            getByIdApi: this.monthGetByIdApi,
            readonly: false,
            shownFrom: 'month',
            type: 'string',
            validators: [
              // {
              //   name: 'required',
              //   validator: Validators.required,
              //   errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
              // },
            ],
          },
        ],
        [
          {
            flexSize: 6,
            label: EnumTranslateKey.UI_COMPONENT_LABEL_PA_PAYROLL_FUND_COMPANY_NAME,
            field: 'companyId',
            value: null,
            controlType: EnumFormBaseContolType.DROPDOWN,
            dropdownOptions$: this.companyOptions$,
            getByIdObject$: this.companyGetByIdObject$,
            getByIdApi: this.companyNameGetByIdApi,
            readonly: false,
            shownFrom: 'nameVn',
            type: 'string',
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
            label: EnumTranslateKey.UI_COMPONENT_LABEL_PA_PAYROLL_FUND_LIST_FUND_NAME,
            field: 'listFundId',
            value: '',
            controlType: EnumFormBaseContolType.DROPDOWN,
            dropdownOptions$: this.listFundOptions$,
            getByIdObject$: this.listFundGetByIdObject$,
            getByIdApi: this.listFundGetByIdApi,
            shownFrom: 'listfundName',
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
            flexSize: 6,
            label: EnumTranslateKey.UI_COMPONENT_LABEL_PA_PAYROLL_FUND_LIST_FUND_SOURCE_NAME,
            field: 'listFundSourceId',
            value: '',
            controlType: EnumFormBaseContolType.DROPDOWN,
            dropdownOptions$: this.listFundSourceOptions$,
            getByIdObject$: this.listFundSourceGetByIdObject$,
            getByIdApi: this.listFundSourceGetByIdApi,
            shownFrom: 'name',
            readonly: false,
            type: 'string',
          },
          {
            flexSize: 6,
            label: EnumTranslateKey.UI_COMPONENT_LABEL_PA_PAYROLL_FUND_AMOUNT,
            field: 'amount',
            value: '',
            controlType: EnumFormBaseContolType.CURRENCY,
            pipe: EnumCoreTablePipeType.NUMBER,
            type: 'number',
            validators: [
              {
                name: 'required',
                validator: Validators.required,
                errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
              },
              {
                name: 'min',
                validator: Validators.min(1),
                errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
              },
              {
                name: 'max',
                validator: Validators.max(9999999999),
                errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
              },
            ],
          },
        ],
        [
          {
            flexSize: 6,
            label: EnumTranslateKey.UI_COMPONENT_LABEL_PA_PAYROLL_FUND_APPROVAL_DATE,
            field: 'approvalDate',
            value: '',
            controlType: EnumFormBaseContolType.DATEPICKER,
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
            flexSize: 6,
            label: EnumTranslateKey.UI_COMPONENT_LABEL_PA_PAYROLL_FUND_NOTE,
            field: 'note',
            value: '',
            controlType: EnumFormBaseContolType.TEXTBOX,
            type: 'text',
          },
        ],
      ],
    },
  ];
  constructor(public override dialogService: DialogService, private pfeService: PayrollFundEditService) {
    super(dialogService);

    this.captionCode = EnumTranslateKey.UI_COMPONENT_TITLE_PA_PAYROLL_FUND_EDIT;

    this.crud = {
      c: api.PA_PAYROLL_FUND_CREATE,
      r: api.PA_PAYROLL_FUND_READ,
      u: api.PA_PAYROLL_FUND_UPDATE,
      d: api.PA_PAYROLL_FUND_DELETE_IDS,
    };
  }

  /* GET FormGroup Instance */
  onFormCreated(e: FormGroup): void {
    this.form = e;

    this.subscriptions.push(
      this.form
        .get('companyId')
        ?.valueChanges.pipe(distinctUntilChanged())
        .subscribe((x) => {
          this.getFund(x);
        })!,

      this.form
        .get('year')
        ?.valueChanges.pipe(distinctUntilChanged())
        .subscribe((x) => {
          if (x.toString().length == 4) this.getMonth(x);
        })!,
    );
  }

  /* To allow form to be deactivated */
  onFormReinit(e: string): void {
    this.formInitStringValue = e;
  }
  ngOnInit(): void {
    this.loading = true;
    this.pfeService
      .getCompany()
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
        }),
      )
      .subscribe((response) => {
        this.companyOptions$.next(response);
        this.loading = false;
      });
  }

  ngOnDestroy(): void {
    this.subscriptions.map((x) => x?.unsubscribe());
  }
  getMonth(year: number) {
    this.pfeService
      .getMonth(year)
      .pipe(
        map((x: any) => {
          if (x.ok && x.status === 200) {
            const options: { value: number; text: string }[] = [];
            x.body.innerBody.map((g: any) => {
              options.push({
                value: g.id,
                text: g.month,
              });
            });
            return options;
          } else {
            return [];
          }
        }),
      )
      .subscribe((response) => {
        this.monthOptions$.next(response);
        this.loading = false;
      });
  }
  getFund(id: number): void {
    this.pfeService
      .getListFundSource(id)
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
        }),
      )
      .subscribe((response) => {
        this.listFundSourceOptions$.next(response);
        this.loading = false;
      });

    this.pfeService
      .getListFund(id)
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
        }),
      )
      .subscribe((response) => {
        this.listFundOptions$.next(response);
        this.loading = false;
      });
  }
}
