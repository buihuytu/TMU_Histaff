import { Component, ViewEncapsulation } from "@angular/core";
import { Validators, FormGroup } from "@angular/forms";
import { api, EnumTranslateKey } from 'alpha-global-constants';
import { BaseEditComponent, ICoreDropdownOption, ICorePageEditCRUD, ICoreFormSection, EnumFormBaseContolType, DialogService, AppService, IFormatedResponse } from "ngx-histaff-alpha";
import { Subscription, BehaviorSubject, map, distinctUntilChanged } from "rxjs";
import { HuWWardEditService } from "./hu-ward-edit.services";

@Component({
  selector: 'app-hu-ward-edit',
  templateUrl: './hu-ward-edit.component.html',
  styleUrls: ['./hu-ward-edit.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class HuWardEditComponent extends BaseEditComponent {
  /* Properties to be passed into core-page-edit */
  loading: boolean = false;
  override entityTable = 'HU_WARD';
  subsctiptions: Subscription[] = [];
  ProvinceOptions$ = new BehaviorSubject<ICoreDropdownOption[]>([]);
  DistrictOptions$ = new BehaviorSubject<ICoreDropdownOption[]>([]);
  ProvinceGetByIdObject$ = new BehaviorSubject<any>(null);
  ProvinceGetByIdApi = api.HU_PROVINCE_READ;
  sysOtherlistGetById1Object$ = new BehaviorSubject<any>(null);
  sysOtherlistGetById1Api = api.HU_DISTRICT_READ;

  nationGetByIdObject$ = new BehaviorSubject<any>(null);
  nationGetByIdApi = api.HU_NATION_READ;
  nationOptions$ = new BehaviorSubject<ICoreDropdownOption[]>([]);

  captionCode!: EnumTranslateKey;
  crud!: ICorePageEditCRUD;
  sections: ICoreFormSection[] = [
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
            type: 'text',
            hidden: true,
          },
        ],
        [
          {
            flexSize: 6,
            label: EnumTranslateKey.UI_COMPONENT_LABEL_WARD_CODE,
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
              },
              {
                name: 'minLength',
                validator: Validators.minLength(1),
                errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_MIN_LENGTH,
              },
            ],
          },
          {
            flexSize: 6,
            label: EnumTranslateKey.UI_COMPONENT_LABEL_WARD_NAME,
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
              },
            ],
          },
        ],
        [
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
              },
            ],
          },
          {
            flexSize: 6,
            label: EnumTranslateKey.UI_COMPONENT_LABEL_PROVINCE_NAME,
            field: 'provinceId',
            value: '',
            getByIdObject$: this.ProvinceGetByIdObject$,
            getByIdApi: this.ProvinceGetByIdApi,
            controlType: EnumFormBaseContolType.DROPDOWN,
            shownFrom: 'name',
            dropdownOptions$: this.ProvinceOptions$,
            type: 'text',
            disabled: true,
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
            label: EnumTranslateKey.UI_COMPONENT_LABEL_DISTRICT_NAME,
            field: 'districtId',
            value: '',
            getByIdObject$: this.sysOtherlistGetById1Object$,
            getByIdApi: this.sysOtherlistGetById1Api,
            controlType: EnumFormBaseContolType.DROPDOWN,
            shownFrom: 'name',
            dropdownOptions$: this.DistrictOptions$,
            type: 'text',
            disabled: true,
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
            label: EnumTranslateKey.UI_COMPONENT_LABEL_WARD_NOTE,
            field: 'note',
            value: '',
            controlType: EnumFormBaseContolType.TEXTBOX,
            type: 'text',
          },
        ],
      ],
    },
  ];

  constructor(
    public override dialogService: DialogService,
    private slrService: HuWWardEditService,
    private appService: AppService
  ) {
    super(dialogService);

    this.captionCode = EnumTranslateKey.UI_COMPONENT_TITLE_HU_WARD_EDIT;

    this.crud = {
      c: api.HU_WARD_CREATE,
      r: api.HU_WARD_READ,
      u: api.HU_WARD_UPDATE,
      d: api.HU_WARD_DELETE_IDS,
    };
  }

  ngOnInit(): void {
    this.loading = true;

    this.slrService
      .getAllNation()
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
        this.nationOptions$.next(response);
        this.loading = false;
      });
  }

  /* GET FormGroup Instance */
  onFormCreated(e: FormGroup): void {
    this.form = e;
    this.subsctiptions.push(
      this.slrService
        .getCode()
        .pipe(
          map((f: any) => {
            let options: string = '';
            options = f.body.innerBody.code;
            return options;
          })
        )
        .subscribe((response: any) => {
          console.log(this.form.get('code'));
          if (this.form.get('code')?.value == '')
            this.form.get('code')?.patchValue(response);
        })
    );

    this.form.get('nationId')?.valueChanges.pipe(distinctUntilChanged()).subscribe((x) => {

      if (this.form.get('nationId')?.value != null && this.form.get('nationId')?.value != "") {
        this.form.get('provinceId')?.enable();
      } else {
        this.form.get('provinceId')?.setValue(null);
        this.form.get('provinceId')?.disable();
      }
      if(!!x){
        this.slrService
        .getProvinceById(x)
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
          this.ProvinceOptions$.next(response);
          this.loading = false;
        });
      }
      else{
        this.form.get('provinceId')?.setValue(null);
        this.form.get('provinceId')?.disable();
      }
      
    })

    const provinceIdControl = this.form.get('provinceId');
    if (provinceIdControl) {
      this.subsctiptions.push(
        provinceIdControl.valueChanges.subscribe((x: any) => {
          if (provinceIdControl.value != null && provinceIdControl.value != "") {
            this.form.get('districtId')?.enable();
          } else {
            this.form.get('districtId')?.disable();
          }
          if (!!x) {
            this.appService
              .get(api.HU_WARD_GET_SCALES_DISTRICT + provinceIdControl.value)
              .subscribe((res: any) => {
                if (!!res.ok && res.status === 200) {
                  const body: IFormatedResponse = res.body;
                  if (body.statusCode === 200 && !!body.innerBody) {
                    const options: { value: number | null; text: string }[] =
                      [];
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
                    this.DistrictOptions$.next(options);
                    // END ONE LOGIC
                  }
                }
              });
          }
          else{
            this.form.get('districtId')?.setValue(null);
            this.form.get('districtId')?.disable();
          }
        })
      );
    }
  }

  /* To allow form to be deactivated */
  onFormReinit(e: string): void {
    this.formInitStringValue = e;
  }
}
