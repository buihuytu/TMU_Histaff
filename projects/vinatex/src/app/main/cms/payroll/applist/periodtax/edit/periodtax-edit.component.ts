import { Component, ViewEncapsulation } from "@angular/core";
import { Validators, FormGroup, AbstractControl } from "@angular/forms";
import { BehaviorSubject, Subscription, distinctUntilChanged, map } from "rxjs";
import { EnumTranslateKey, api } from 'alpha-global-constants';
import { BaseEditComponent, ICoreDropdownOption, ICorePageEditCRUD, ICoreFormSection, EnumFormBaseContolType, DialogService, CustomValidators } from "ngx-histaff-alpha";
import { PeriodTaxEditService } from "./periodtax-edit.service";
@Component({
  selector: "app-periodtax-edit",
  templateUrl: "./periodtax-edit.component.html",
  styleUrls: ["./periodtax-edit.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class PeriodTaxEditComponent extends BaseEditComponent {

  /* Properties to be passed into core-page-edit */
  loading: boolean = false;
  override entityTable = "PA_PERIOD_TAX";
  
  salaryPeriodOptions$ = new BehaviorSubject<ICoreDropdownOption[]>([]);
  salaryPeriodGetByIdObject$ = new BehaviorSubject<any>(null);
  salaryPeriodGetByIdApi = api.AT_SALARY_PERIOD_READ;

  subsctiptions: Subscription[] = [];
  captionCode!: EnumTranslateKey;
  crud!: ICorePageEditCRUD;
  sections: ICoreFormSection[] =
    [
      {
        rows: [
          [
            {
              flexSize: 6,
              label: EnumTranslateKey.UI_COMPONENT_TITLE_PA_PERIOD_TAX_ID,
              field: 'id',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              readonly: true,
              hidden: true,
              type: 'text'
            }
          ],
          [
            {
              flexSize: 3,
              label: EnumTranslateKey.UI_COMPONENT_TITLE_PA_PERIOD_TAX_YEAR,
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
              flexSize: 4,
              label: EnumTranslateKey.UI_COMPONENT_TITLE_PA_PERIOD_TAX_MONTH,
              field: 'monthlyTaxCalculation',
              value: '',
              controlType: EnumFormBaseContolType.DROPDOWN,
              dropdownOptions$: this.salaryPeriodOptions$,
              getByIdObject$: this.salaryPeriodGetByIdObject$,
              shownFrom: 'month',
              getByIdApi: this.salaryPeriodGetByIdApi,
              readonly: false,
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
              flexSize: 4,
              label: EnumTranslateKey.UI_COMPONENT_TITLE_PA_PERIOD_TAX_DATE,
              field: 'taxDate',
              value: '',
              controlType: EnumFormBaseContolType.DATEPICKER,
              type: 'Date',
              readonly: false,
              validators: [
                {
                  name: 'required',
                  validator: Validators.required,
                  errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
                }
              ]
            }
          ],
          [
            {
              flexSize: 6,
              label: EnumTranslateKey.UI_COMPONENT_TITLE_PA_PERIOD_TAX_FROM_DATE,
              field: 'calculateTaxFromDate',
              value: '',
              controlType: EnumFormBaseContolType.DATEPICKER,
              type: 'Date',
              readonly: false,
              validators: [
                {
                  name: 'required',
                  validator: Validators.required,
                  errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
                },
                {
                  name: 'dateFrom',
                  validator: PeriodTaxEditComponent.dateFrom,
                  errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_MIN,
                },
              ]
            },
            {
              flexSize: 6,
              label: EnumTranslateKey.UI_COMPONENT_TITLE_PA_PERIOD_TAX_TO_DATE,
              field: 'calculateTaxToDate',
              value: '',
              controlType: EnumFormBaseContolType.DATEPICKER,
              type: 'Date',
              readonly: false,
              validators: [
                {
                  name: 'required',
                  validator: Validators.required,
                  errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
                },
                {
                  name: 'dateTo',
                  validator: PeriodTaxEditComponent.dateTo,
                  errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_MIN,
                },
              ]
            },
          ],
          [
            {
              flexSize: 12,
              label: EnumTranslateKey.UI_COMPONENT_TITLE_PA_PERIOD_TAX_NOTE,
              field: 'note',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              type: 'string',
              readonly: false,
            }
          ]
        ]
      },
    ];


  constructor(
    public override dialogService: DialogService,
    private slrService: PeriodTaxEditService
  ) {
    super(dialogService);

    this.captionCode = EnumTranslateKey.UI_COMPONENT_TITLE_PA_PERIOD_TAX;

    this.crud = {
      c: api.PA_PERIOD_TAX_CREATE,
      r: api.PA_PERIOD_TAX_READ,
      u: api.PA_PERIOD_TAX_UPDATE,
      d: api.PA_PERIOD_TAX_DELETE_IDS,
    };
  }

  ngOnInit(): void {
    this.loading = true;
    // this.slrService.getPeriod()
    //   .pipe(
    //     map((x: any) => {
    //       if (x.ok && x.status === 200) {
    //         const options: { value: number; text: string; }[] = [];
    //         x.body.innerBody.map((g: any) => {
    //           options.push({
    //             value: g.id,
    //             text: g.name
    //           })
    //         })
    //         return options;
    //       } else {
    //         return [];
    //       }
    //     })
    //   )
    //   .subscribe(response => {
    //     this.salaryPeriodOptions$.next(response);
    //     console.log(this.salaryPeriodOptions$);
    //     this.loading = false;
    //   })
  }

  getMonth(year: number) {
    this.slrService.getMonth(year)
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
        this.salaryPeriodOptions$.next(response);
        this.loading = false;
      });
  }
  /* GET FormGroup Instance */
  onFormCreated(e: FormGroup): void {
    this.form = e;
    this.subsctiptions.push(
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

  ngOnDestroy(): void {
    this.subsctiptions.map(x => x?.unsubscribe())
  }

  protected static dateFrom(date: AbstractControl): any | null {
    let valid = true;
    let errorMessage = '';
    const dateFrom = date.value;
    const dateTo = date.parent?.get('calculateTaxToDate')?.value;
    if (dateTo != '' && dateTo != null && dateFrom != null) {
      if (dateFrom > new Date(dateTo)) {
        valid = false;
        errorMessage = EnumTranslateKey.UI_COMPONENT_TITLE_PA_PERIOD_TAX_FROM_DATE_LESS_THAN_TO_DATE;
        return CustomValidators.core('calculateTaxFromDate', false, errorMessage)(date);
      } else {
        date.parent?.get('calculateTaxFromDate')?.setErrors(null);
        date.parent?.get('calculateTaxToDate')?.setErrors(null);
      }
    }
  }

  protected static dateTo(date: AbstractControl): any | null {
    let valid = true;
    let errorMessage = '';
    const dateFrom = date.parent?.get('calculateTaxFromDate')?.value;
    const dateTo = date.value;
    if (dateTo != '' && dateTo != null) {
      if (dateFrom != '' && dateFrom != null && dateTo < new Date(dateFrom)) {
        valid = false;
        errorMessage = EnumTranslateKey.UI_COMPONENT_TITLE_PA_PERIOD_TAX_TO_DATE_MORE_THAN_FROM_DATE;
        return CustomValidators.core('calculateTaxToDate', false, errorMessage)(date);
      } else {
        date.parent?.get('calculateTaxFromDate')?.setErrors(null);
        date.parent?.get('calculateTaxToDate')?.setErrors(null);
      }
    } else {
      // date.parent?.get("effectiveDate")?.setErrors(null);
      date.parent?.get('calculateTaxToDate')?.setErrors(null);
    }
  }
}
