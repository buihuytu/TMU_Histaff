import { Component, ViewEncapsulation } from "@angular/core";
import { Validators, FormGroup } from "@angular/forms";
import { api, EnumTranslateKey } from 'alpha-global-constants';
import { BaseEditComponent, ICoreDropdownOption, ICorePageEditCRUD, ICoreFormSection, EnumFormBaseContolType, DialogService, AppService } from "ngx-histaff-alpha";
import { BehaviorSubject, Subscription, map } from "rxjs";
import { SalaryRankEditService } from "./salaryrank-edit.services";

@Component({
  selector: "app-salaryrank-edit",
  templateUrl: "./salaryrank-edit.component.html",
  styleUrls: ["./salaryrank-edit.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class SalaryRankEditComponent extends BaseEditComponent {

  /* Properties to be passed into core-page-edit */
  loading: boolean = false;
  override entityTable = "HU_SALARY_RANK";
  scaleOptions$ = new BehaviorSubject<ICoreDropdownOption[]>([]);
  scaleOptionsGetByIdObject$ = new BehaviorSubject<any>(null);
  scaleOptionsGetByIdApi = api.HU_SALARY_SCALE_READ;
  captionCode!: EnumTranslateKey;
  crud!: ICorePageEditCRUD;
  subsctiptions: Subscription[] = [];
  sections: ICoreFormSection[] =
    [
      {
        rows: [
          [
            {
              flexSize: 6,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_COMMON_ID,
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
              flexSize: 12,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SALARY_RANK_CODE,
              field: 'code',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              type: 'text',
              readonly : true
            },
          ],
          [
            {
              flexSize: 12,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SALARY_RANK_NAME,
              field: 'name',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              type: 'text',
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
                }
              ]
            },
          ],
          [
            {
              flexSize: 12,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SALARY_RANK_SCALE_NAME,
              field: 'salaryScaleId',
              value: '',
              controlType: EnumFormBaseContolType.DROPDOWN,
              shownFrom: 'name',
              dropdownOptions$: this.scaleOptions$,
              getByIdObject$: this.scaleOptionsGetByIdObject$,
              getByIdApi: this.scaleOptionsGetByIdApi,
              type: 'number',
              validators: [
                {
                  name: 'required',
                  validator: Validators.required,
                  errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
                },
              ]
            }
          ],
          [
            {
              flexSize: 12,
              label: EnumTranslateKey.UI_COMPONENT_LABEL_SALARY_RANK_EFFECTIVE_DATE,
              field: 'effectiveDate',
              value: '',
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
          ],
          [
            {
              flexSize: 12,
              label: EnumTranslateKey.UI_COMPONENT_LABEL_SALARY_RANK_EXPIRATION_DATE,
              field: 'expirationDate',
              value: '',
              controlType: EnumFormBaseContolType.DATEPICKER,
              type: 'date',

            },
          ],
          [
            {
              flexSize: 12,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SALARY_RANK_NOTE,
              field: 'note',
              value: '',
              controlType: EnumFormBaseContolType.TEXTAREA,
              type: 'text',
            },
          ]
        ]
      }
    ];

  constructor(
    public override dialogService: DialogService,
    private slrService: SalaryRankEditService,
    private appService: AppService,
  ) {

    super(dialogService);

    this.captionCode = EnumTranslateKey.UI_COMPONENT_TITLE_SALARY_RANK_EDIT;

    this.crud = {
      c: api.HU_SALARY_RANK_CREATE,
      r: api.HU_SALARY_RANK_READ,
      u: api.HU_SALARY_RANK_UPDATE,
      d: api.HU_SALARY_RANK_DELETE,
    };

  }

  ngOnInit(): void {
    this.loading = true;
    this.slrService.getScales()
      .pipe(
        map((x: any) => {
          if (x.ok && x.status === 200) {
            const options: { value: number; text: string; }[] = [];
            x.body.innerBody.map((g: any) => {
              options.push({
                value: g.id,
                text: g.name
              })
            })
            return options;
          } else {
            return [];
          }
        })
      )
      .subscribe(response => {
        this.scaleOptions$.next(response);
        this.loading = false;
      })
  }

  /* GET FormGroup Instance */
  onFormCreated(e: FormGroup): void {
    this.form = e;
    this.subsctiptions.push(
      this.appService.get(api.HU_SALARY_RANK_GETCODE)
        .pipe(
          map((f: any) => {
            let options: string = "";
            options = f.body.innerBody.code;
            return options;
          })
        )
        .subscribe(response => {
          if(this.form.get('code')?.value == "") this.form.get('code')?.patchValue(response);
        })
    )!
  }

  /* To allow form to be deactivated */
  onFormReinit(e: string): void {
    this.formInitStringValue = e;
  }

}
