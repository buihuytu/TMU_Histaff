import { Component } from "@angular/core";
import { Validators, FormGroup } from "@angular/forms";
import { EnumTranslateKey, api } from 'alpha-global-constants';
import { BaseEditComponent, ICoreDropdownOption, ICorePageEditCRUD, ICoreFormSection, EnumFormBaseContolType, DialogService, AppService } from "ngx-histaff-alpha";
import { Subscription, BehaviorSubject, map, distinctUntilChanged } from "rxjs";
import { InsWhereHealEditService } from "./ins-wherehealth.service";


@Component({
  selector: 'app-ins-wherehealth-edit',
  templateUrl: './ins-wherehealth-edit.component.html',
  styleUrls: ['./ins-wherehealth-edit.component.scss'],
})
export class InsWherehealthEditComponent extends BaseEditComponent {
  loading: boolean = false;
  override entityTable = 'INS_WHEREHEALTH';
  captionCode!: EnumTranslateKey;
  subsctiptions: Subscription[] = [];

  provinceOptions$ = new BehaviorSubject<ICoreDropdownOption[]>([]);
  districtOptions$ = new BehaviorSubject<ICoreDropdownOption[]>([]);
  provinceGetByIdObject$ = new BehaviorSubject<any>(null);
  districtGetByIdObject$ = new BehaviorSubject<any>(null);
  provinceGetByIdApi = api.HU_PROVINCE_READ;
  districtGetByIdApi = api.HU_DISTRICT_READ;
  crud!: ICorePageEditCRUD;
  sections: ICoreFormSection[] = [
    {
      rows: [
        [
          {
            flexSize: 12,
            label: EnumTranslateKey.UI_COMPONENT_LABEL_LANGUAGE_ID,
            value: '',
            controlType: EnumFormBaseContolType.TEXTBOX,
            field: 'id',
            readonly: true,
            hidden: true,
            type: 'text',
          },
          {
            flexSize: 6,
            label: EnumTranslateKey.UI_COMPONENT_TITLE_INS_WHEREHEALTH_CODE,
            field: 'code',
            value: '',
            disabled: true,
            controlType: EnumFormBaseContolType.TEXTBOX,
            readonly: false,
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
          {
            flexSize: 6,
            label: EnumTranslateKey.UI_COMPONENT_TITLE_INS_WHEREHEALTH_NAME_VN,
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
              {
                name: 'minLength',
                validator: Validators.minLength(1),
                errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_MIN_LENGTH,
              },
            ],
          },
          {
            flexSize: 6,
            label:
              EnumTranslateKey.UI_COMPONENT_TITLE_INS_WHEREHEALTH_PROVINCE_NAME,
            field: 'provinceId',
            value: '',
            controlType: EnumFormBaseContolType.DROPDOWN,
            dropdownOptions$: this.provinceOptions$,
            getByIdObject$: this.provinceGetByIdObject$,
            getByIdApi: this.provinceGetByIdApi,
            shownFrom: 'name',
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
            flexSize: 6,
            label:
              EnumTranslateKey.UI_COMPONENT_TITLE_INS_WHEREHEALTH_DISTRICT_NAME,
            field: 'districtId',
            value: '',
            getByIdObject$: this.districtGetByIdObject$,
            controlType: EnumFormBaseContolType.DROPDOWN,
            shownFrom: 'name',
            dropdownOptions$: this.districtOptions$,
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
            flexSize: 6,
            label: EnumTranslateKey.UI_COMPONENT_TITLE_INS_WHEREHEALTH_ADDRESS,
            field: 'address',
            value: '',
            controlType: EnumFormBaseContolType.TEXTBOX,
            readonly: false,
            type: 'text',
          },
          {
            flexSize: 6,
            label: EnumTranslateKey.UI_COMPONENT_TITLE_INS_WHEREHEALTH_NOTE,
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
    private insWhereHealThEditService: InsWhereHealEditService,
    private appService: AppService
  ) {
    super(dialogService);

    this.captionCode = EnumTranslateKey.UI_COMPONENT_TITLE_INS_WHEREHEALTH;

    this.crud = {
      c: api.INS_WHEREHEALTH_CREATE,
      r: api.INS_WHEREHEALTH_READ,
      u: api.INS_WHEREHEALTH_UPDATE,
      d: api.INS_WHEREHEALTH_DELETE_IDS,
    };
  }

  /* GET FormGroup Instance */
  onFormCreated(e: FormGroup): void {
    this.form = e;
    this.subsctiptions.push(
      this.appService
        .get(api.INS_WHEREHEALTH_GET_CODE)
        .pipe(
          map((f: any) => {
            let options: string = '';
            options = f.body.innerBody.code;
            return options;
          })
        )
        .subscribe((response) => {
          if (this.form.get('code')?.value == '')
            this.form.get('code')?.patchValue(response);
        })
    )!;
    this.subsctiptions.push(
      this.form
        .get('provinceId')
        ?.valueChanges!.pipe(distinctUntilChanged())
        .subscribe((numb: any) => {
          if (!!numb) {
            this.insWhereHealThEditService
              .getALLDistrictByProvinceId(numb)
              .pipe(
                map((x: any) => {
                  if (x.ok && x.status == 200) {
                    const options: { value: number; text: string }[] = [];
                    x.body.innerBody.map((get: any) => {
                      options.push({
                        value: get.id,
                        text: get.name,
                      });
                    });
                    return options;
                  } else {
                    return [];
                  }
                })
              )
              .subscribe((response) => {
                console.log(response);

                this.districtOptions$.next(response);
                this.loading = false;
                this.form.get('provinceId')?.enable();
              });
          } else {
            this.form.get('provinceId')?.disable();
          }
        })!
    );
  }

  /* To allow form to be deactivated */
  onFormReinit(e: string): void {
    this.formInitStringValue = e;
  }
  ngOnInit(): void {
    this.loading = true;
    this.insWhereHealThEditService
      .getAllProvince()
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
        this.provinceOptions$.next(response);
        this.loading = false;
      });
  }
}
