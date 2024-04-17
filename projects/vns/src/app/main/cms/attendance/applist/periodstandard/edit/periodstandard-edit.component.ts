import { Component } from '@angular/core';
import { Validators, FormGroup } from '@angular/forms';
import { EnumTranslateKey, api } from 'alpha-global-constants';
import { BaseEditComponent, ICoreDropdownOption, ICorePageEditColumnComposition, ICorePageEditCRUD, ICoreFormSection, EnumFormBaseContolType, DialogService, MultiLanguageService, AppService } from 'ngx-histaff-alpha';
import { BehaviorSubject, Subscription, map } from 'rxjs';
import { PeriodStandardEditService } from './periodstandard.edit.service';

@Component({
  selector: 'app-period-standard-edit',
  templateUrl: './periodstandard-edit.component.html',
  styleUrls: ['./periodstandard-edit.component.scss'],
})
export class PeriodStandardEditComponent extends BaseEditComponent {
  /* Properties to be passed into core-page-edit */
  override entityTable = 'AT_PERIOD_STANDARD';

  loading: boolean = false;

  sysOtherlistGetByIdObject$ = new BehaviorSubject<any>(null);
  sysOtherlistGetByIdApi = api.SYS_OTHERLIST_READ;

  atSalaryPeriodGetByIdObject$ = new BehaviorSubject<any>(null);
  atSalaryPeriodGetByIdApi = api.AT_PERIOD_STANDARD_GET_SALARY_PERIOD_BY_ID;

  subsctiptions: Subscription[] = [];
  periodOptions$ = new BehaviorSubject<ICoreDropdownOption[]>([]);
  objectOptions$ = new BehaviorSubject<ICoreDropdownOption[]>([]);

  maxValue$ = 32;

  captionCode!: EnumTranslateKey;
  formComposition!: ICorePageEditColumnComposition[][];
  crud!: ICorePageEditCRUD;
  sections: ICoreFormSection[] = [
    {
      rows: [
        [
          {
            flexSize: 0,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_COMMON_ID,
            field: 'id',
            value: '',
            controlType: EnumFormBaseContolType.TEXTBOX,
            readonly: true,
            hidden: true,
            type: 'text',
          },
          {
            flexSize: 4,
            label:
              EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_AT_PERIOD_STANDARD_YEAR,
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
                name: 'max',
                validator: Validators.max(9999),
                errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_MIN_LENGTH,
              },
              {
                name: 'min',
                validator: Validators.min(1000),
                errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_MIN_LENGTH,
              },
            ],
          },
          {
            flexSize: 4,
            label:
              EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_AT_PERIOD_STANDARD_PERIOD_NAME,
            field: 'periodId',
            value: '',
            controlType: EnumFormBaseContolType.DROPDOWN,
            dropdownOptions$: this.periodOptions$,
            getByIdObject$: this.atSalaryPeriodGetByIdObject$,
            shownFrom: 'name',
            getByIdApi: this.atSalaryPeriodGetByIdApi,
            readonly: false,
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
            flexSize: 4,
            label:
              EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_AT_PERIOD_STANDARD_OBJECT_NAME,
            field: 'objectId',
            value: '',
            controlType: EnumFormBaseContolType.DROPDOWN,
            getByIdObject$: this.sysOtherlistGetByIdObject$,
            shownFrom: 'name',
            getByIdApi: this.sysOtherlistGetByIdApi,
            dropdownOptions$: this.objectOptions$,
            readonly: false,
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
          {
            flexSize: 4,
            label:
              EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_AT_PERIOD_STANDARD_PERIOD_STANDARD,
            field: 'periodStandard',
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
                name: 'max',
                validator: Validators.max(31),
                errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_MAX,
              },
              {
                name: 'min',
                validator: Validators.min(0),
                errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_MIN,
              },
            ],
          },
          {
            flexSize: 4,
            label:
              EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_AT_PERIOD_STANDARD_PERIOD_STANDARD_NIGHT,
            field: 'periodStandardNight',
            value: '',
            controlType: EnumFormBaseContolType.TEXTBOX,
            type: 'number',
            validators: [
              {
                name: 'max',
                validator: Validators.max(31),
                errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_MAX,
              },
              {
                name: 'min',
                validator: Validators.min(0),
                errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_MIN,
              },
            ],
          },
          {
            flexSize: 4,
            label:
              EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_AT_STANDARD_PERIOD_NOTE,
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
    private pseService: PeriodStandardEditService,
    private mls: MultiLanguageService,
    private appService: AppService // CoreService is DEPRECATED!!!
  ) {
    super(dialogService);

    this.captionCode = EnumTranslateKey.UI_COMPONENT_TITLE_AT_PERIOD_STANDARD;

    this.crud = {
      c: api.AT_PERIOD_STANDARD_CREATE,
      r: api.AT_PERIOD_STANDARD_READ,
      u: api.AT_PERIOD_STANDARD_UPDATE,
      d: api.AT_PERIOD_STANDARD_DELETE,
    };
  }

  /* GET FormGroup Instance */
  onFormCreated(e: FormGroup): void {
    this.form = e;
    this.subsctiptions.push(
      this.form.get('year')?.valueChanges.subscribe((x) => {
        if (!!x && x.length == 4) {
          this.pseService
            .getPeriodList(x)
            .pipe(
              map((f: any) => {
                const options: { value: number; text: string; code: string }[] =
                  [];
                f.body.innerBody.map((g: any) => {
                  options.push({
                    value: g.id,
                    text: g.name,
                    code: g.month,
                  });
                });
                return options;
              })
            )
            .subscribe((response) => {
              this.periodOptions$.next(response);
              this.loading = false;
            });
        }
      })!,

      this.form.get('periodId')?.valueChanges.subscribe((data) => {
        let x = this.periodOptions$.value.filter((x) => x.value === data)[0]
          .code;
        if (!!x) {
          switch (Number.parseInt(x)) {
            case 4:
            case 6:
            case 9:
            case 11:
              this.maxValue$ = 30;
              break;
            case 2:
              var year = this.form.get('year')?.value;

              if ((year % 4 == 0 && year % 100 != 0) || year % 400 == 0) {
                this.maxValue$ = 29;
              } else {
                this.maxValue$ = 28;
              }
              break;
            default:
              this.maxValue$ = 31;
          }
          this.form
            .get('periodStandard')
            ?.setValue("");
          this.form
          .get('periodStandardNight')
          ?.setValue("");
          this.form
            .get('periodStandard')
            ?.setValidators([
              Validators.required,
              Validators.max(this.maxValue$),
              Validators.min(0),
            ]);
          this.form
            .get('periodStandardNight')
            ?.setValidators([
              Validators.max(this.maxValue$),
              Validators.min(0),
            ]);
        }
      })!
    );
    this.pseService
      .getObjects()
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
        })
      )
      .subscribe((response) => {
        this.objectOptions$.next(response);
        this.loading = false;
      });
  }

  /* To allow form to be deactivated */
  onFormReinit(e: string): void {
    this.formInitStringValue = e;
  }

  ngOnInit(): void {
    this.loading = true;
  }

  ngOnDestroy(): void {
    this.subsctiptions.map((x) => x?.unsubscribe());
  }
}
