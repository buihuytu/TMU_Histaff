import { Component, ViewEncapsulation } from "@angular/core";
import { Validators, FormGroup } from "@angular/forms";
import { BaseEditComponent,ICoreDropdownOption, ICorePageEditCRUD, ICoreFormSection, EnumFormBaseContolType, DialogService, AppService, IFormatedResponse } from "ngx-histaff-alpha";
import { BehaviorSubject, map, pipe, Subscription } from 'rxjs';
import { HuDistrictEditService } from "./hu-district-edit.services";
import { EnumTranslateKey, api } from 'alpha-global-constants';

@Component({
  selector: 'app-hu-district-edit',
  templateUrl: './hu-district-edit.component.html',
  styleUrls: ['./hu-district-edit.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class HuDistrictEditComponent extends BaseEditComponent {

  sysOtherlistGetByIdObject$ = new BehaviorSubject<any>(null);
  sysOtherlistGetByIdApi = api.HU_PROVINCE_READ;
  loading: boolean = false;
  subsctiptions: Subscription[] = [];
  override entityTable = "HU_DISTRICT";
  scaleOptions$ = new BehaviorSubject<ICoreDropdownOption[]>([]);
  captionCode!: EnumTranslateKey;
  crud!: ICorePageEditCRUD;

  nationGetByIdObject$ = new BehaviorSubject<any>(null);
  nationGetByIdApi = api.HU_NATION_READ;
  nationOptions$ = new BehaviorSubject<ICoreDropdownOption[]>([]);

  sections: ICoreFormSection[] =
    [
      {
        rows: [
          [
            {
              flexSize: 6,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_COMMON_ID,
              field: 'id',
              value: 0,
              controlType: EnumFormBaseContolType.TEXTBOX,
              readonly: true,
              type: 'number',
              hidden: true
            }
          ],
          [
            {
              flexSize: 6,
              label: EnumTranslateKey.UI_COMPONENT_LABEL_DISTRICT_CODE,
              field: 'code',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              type: 'text',
              readonly: true,
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
              label: EnumTranslateKey.UI_COMPONENT_LABEL_NATION_NAME,
              field: 'nationId',
              value: '',
              getByIdObject$: this.nationGetByIdObject$,
              getByIdApi: this.nationGetByIdApi,
              controlType: EnumFormBaseContolType.DROPDOWN,
              shownFrom: 'name',
              dropdownOptions$: this.nationOptions$,
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
              label: EnumTranslateKey.UI_COMPONENT_LABEL_PROVINCE_NAME,
              field: 'provinceId',
              value: '',
              getByIdObject$: this.sysOtherlistGetByIdObject$,
              getByIdApi: this.sysOtherlistGetByIdApi,
              controlType: EnumFormBaseContolType.DROPDOWN,
              shownFrom: 'name',
              dropdownOptions$: this.scaleOptions$,
              type: 'text',
              disabled: true,
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
              label: EnumTranslateKey.UI_COMPONENT_LABEL_DISTRICT_NAME,
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
              label: EnumTranslateKey.UI_COMPONENT_LABEL_DISTRICT_NOTE,
              field: 'note',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              type: 'text'
            },
          ],
        ]
      }
    ];

  constructor(
    public override dialogService: DialogService,
    private slrService: HuDistrictEditService,
    private appService: AppService,
  ) {

    super(dialogService);

    this.captionCode = EnumTranslateKey.UI_COMPONENT_TITLE_HU_DISTRICT_EDIT;

    this.crud = {
      c: api.HU_DISTRICT_CREATE,
      r: api.HU_DISTRICT_READ,
      u: api.HU_DISTRICT_UPDATE,
      d: api.HU_DISTRICT_DELETE_IDS,
    };
  }
  ngOnInit(): void {
    this.loading = true;
    this.slrService.getAllNation()
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
        this.nationOptions$.next(response);
        this.loading = false;
      })
  }

  /* GET FormGroup Instance */
  onFormCreated(e: FormGroup): void {
    this.form = e;
    this.subsctiptions.push(
      this.slrService.getCode()
        .pipe(
          map((f: any) => {
            let options: string = "";
            options = f.body.innerBody.code;
            return options;
          })
        )
        .subscribe((response: any) => {
          console.log(this.form.get('code'));
          if (this.form.get('code')?.value == "")
            this.form.get('code')?.patchValue(response);
        })
    );




    const nationIdControl = this.form.get('nationId');
    if (nationIdControl) {
      this.subsctiptions.push(
        nationIdControl.valueChanges.subscribe((x: any) => {
          if (nationIdControl.value != null && nationIdControl.value != "") {
            this.form.get('provinceId')?.enable();
          }
          else {
            this.form.get('provinceId')?.disable();
          }

          if (!!x) {
            this.appService
              .get(api.HU_DISTRICT_GET_SCALES_PROVINCE + nationIdControl.value)
              .subscribe((res: any) => {

                if (!!res.ok && res.status === 200) {
                  const body: IFormatedResponse = res.body
                  if (body.statusCode === 200 && !!body.innerBody) {
                    const options: { value: number | null; text: string; }[] = [];
                    options.push({
                      value: null,
                      text: ''
                    })
                    res.body.innerBody.map((g: any) => {
                      options.push({
                        value: g.id,
                        text: g.name
                      })
                    })
                    this.scaleOptions$.next(options);
                    // END ONE LOGIC
                  }
                }
              })

          } else {
            this.form.get('provinceId')?.setValue(null);
            this.form.get('provinceId')?.disable();
          }
        })
      )
    }

  }

  /* To allow form to be deactivated */
  onFormReinit(e: string): void {
    this.formInitStringValue = e;
  }

}
