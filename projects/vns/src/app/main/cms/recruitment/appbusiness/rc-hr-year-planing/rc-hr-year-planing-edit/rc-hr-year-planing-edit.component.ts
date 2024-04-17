import { AfterViewInit, Component } from '@angular/core';
import { Validators, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Subscription } from 'rxjs';
import { EnumTranslateKey, api } from 'alpha-global-constants';
import { BaseEditComponent, ICorePageEditCRUD, ICoreDropdownOption, ICoreFormSection, EnumFormBaseContolType, DialogService, AppService, IFormatedResponse } from 'ngx-histaff-alpha';

@Component({
  selector: 'app-rc-hr-year-planing-edit',
  templateUrl: './rc-hr-year-planing-edit.component.html',
  styleUrl: './rc-hr-year-planing-edit.component.scss'
})
export class RcHrYearPlaningEditComponent extends BaseEditComponent implements AfterViewInit {
  /* Properties to be passed into core-page-edit */
  override entityTable = 'RC_HR_YEAR_PLANING';
  subscriptions: Subscription[] = [];
  loading: boolean = false;

  captionCode!: EnumTranslateKey;
  crud!: ICorePageEditCRUD;


  yearOptions$ = new BehaviorSubject<ICoreDropdownOption[]>([]);
  yearGetByIdObject$ = new BehaviorSubject<any>(null);
  yearGetByIdApi = api.RC_YEAR_PLANING_GETYEAR;

  planingOptions$ = new BehaviorSubject<ICoreDropdownOption[]>([]);
  planingGetByIdObject$ = new BehaviorSubject<any>(null);
  planingGetByIdApi = api.RC_YEAR_PLANING_GETYEAR;

  id!: number;

  sections: ICoreFormSection[] = [
    {
      rows: [
        [
          {
            flexSize: 6,
            label: EnumTranslateKey.UI_LABEL_TRAINING_COURSE_ID,
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
            flexSize: 6,
            label: EnumTranslateKey.UI_COMPONENT_TITLE_TR_PLAN_YEAR,
            field: 'year',
            value: '',
            controlType: EnumFormBaseContolType.DROPDOWN,
            readonly: false,
            shownFrom: 'name',
            dropdownOptions$: this.yearOptions$,
            getByIdObject$: this.yearGetByIdObject$,
            getByIdApi: this.yearGetByIdApi,
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
            flexSize: 6,
            label: EnumTranslateKey.UI_COMPONENT_TITLE_RC_YEAR_PLAINING_VERSION,
            field: 'version',
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
        ],
        [
          {
            flexSize: 6,
            label: EnumTranslateKey.UI_COMPONENT_TITLE_HU_COMMEND_EFFECT_DATE,
            field: 'effectDate',
            value: '',
            controlType: EnumFormBaseContolType.DATEPICKER,
            readonly: false,
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
            flexSize: 6,
            label: EnumTranslateKey.UI_COMPONENT_TITLE_TR_PLAN_NOTE,
            field: 'note',
            value: '',
            controlType: EnumFormBaseContolType.TEXTBOX,
            readonly: false,
            type: 'text',
          },
        ],
        [
          {
            flexSize: 6,
            label: EnumTranslateKey.UI_COMPONENT_TITLE_RC_YEAR_PLAINING_COPIED_BOUNDARIES,
            field: 'copiedId',
            value: '',
            controlType: EnumFormBaseContolType.DROPDOWN,
            readonly: false,
            shownFrom: 'name',
            dropdownOptions$: this.planingOptions$,
            getByIdObject$: this.planingGetByIdObject$,
            getByIdApi: this.planingGetByIdApi,
            type: 'number',
          },
        ]
      ],
    },
  ];

  constructor(
    public override dialogService: DialogService,
    public appService: AppService,
    private route: ActivatedRoute,
  ) {
    super(dialogService);

    this.captionCode = EnumTranslateKey.UI_COMPONENT_TITLE_RC_YEAR_PLAINING;

    this.crud = {
      c: api.RC_YEAR_PLANING_CREATE,
      r: api.RC_YEAR_PLANING_READ,
      u: api.RC_YEAR_PLANING_UPDATE,
      d: api.RC_YEAR_PLANING_DELETE_IDS,
    };

    this.id = Number(atob(this.route.snapshot.params['id']));
  }
  ngAfterViewInit(): void {
    setTimeout(() => {
      this.subscriptions.push(
        this.appService.get(api.AT_SALARY_PERIOD_GET_YEAR).subscribe((res: any) => {
          if (!!res.ok && res.status === 200) {
            const body: IFormatedResponse = res.body;
            if (body.statusCode === 200 && !!body.innerBody) {
              const options: { value: number | null; text: string }[] = [];
              res.body.innerBody.map((g: any) => {
                options.push({
                  value: g,
                  text: g,
                });
              });
              this.yearOptions$.next(options);
            }
          }
        }),

        this.appService.get(api.RC_YEAR_PLANING_GET_ALL + `?id=${this.id}`).subscribe((res: any) => {
          if (!!res.ok && res.status === 200) {
            const body: IFormatedResponse = res.body;
            if (body.statusCode === 200 && !!body.innerBody) {
              const options: { value: number | null; text: string }[] = [];
              res.body.innerBody.map((g: any) => {
                options.push({
                  value: g.id,
                  text: `${g.year} - ${g.version} - ${g.effectDate}`,
                });
              });
              this.planingOptions$.next(options);
            }
          }
        }),
      );
    })
  }

  /* GET FormGroup Instance */
  onFormCreated(e: FormGroup): void {
    this.form = e;
  }

  /* To allow form to be deactivated */
  onFormReinit(e: string): void {
    this.formInitStringValue = e;
  }

  ngOnInit(): void {
    this.loading = true;
  }
}
