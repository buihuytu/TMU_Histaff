import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { api, EnumTranslateKey } from 'alpha-global-constants';
import { BaseEditComponent, ICoreDropdownOption, ICoreFormSection, EnumFormBaseContolType, ICorePageEditCRUD, DialogService, MultiLanguageService, AppService, AuthService, UrlService, CoreFormService, IFormatedResponse } from 'ngx-histaff-alpha';
import { BehaviorSubject, Subscription, distinctUntilChanged } from 'rxjs';
import { FamilyInfoSerivce } from '../family-info.service';

@Component({
  selector: 'app-family-info-edit',
  templateUrl: './family-info-edit.component.html',
  styleUrls: ['./family-info-edit.component.scss']
})
export class FamilyInfoEditComponent extends BaseEditComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];
  employeeId!: number;

  relationshipOptions$ = new BehaviorSubject<ICoreDropdownOption[]>([]);
  relationshipGetByIdObject$ = new BehaviorSubject<any>(null);
  relationshipGetByIdApi = api.SYS_OTHERLIST_READ;

  genderOptions$ = new BehaviorSubject<ICoreDropdownOption[]>([]);
  genderGetByIdObject$ = new BehaviorSubject<any>(null);
  genderGetByIdApi = api.SYS_OTHERLIST_READ;

  nationalityOptions$ = new BehaviorSubject<ICoreDropdownOption[]>([]);
  nationalityGetByIdObject$ = new BehaviorSubject<any>(null);
  nationalityGetByIdApi = api.SYS_OTHERLIST_READ;

  provinceOptions$ = new BehaviorSubject<ICoreDropdownOption[]>([]);
  provinceGetByIdObject$ = new BehaviorSubject<any>(null);
  provinceGetByIdApi = api.HU_FAMILY_PROVINCE_READ;

  wardOptions$ = new BehaviorSubject<ICoreDropdownOption[]>([]);
  wardGetByIdObject$ = new BehaviorSubject<any>(null);
  wardGetByIdApi = api.HU_FAMILY_WARD_READ;

  districtOptions$ = new BehaviorSubject<ICoreDropdownOption[]>([]);
  districtGetByIdObject$ = new BehaviorSubject<any>(null);
  districtGetByIdApi = api.HU_FAMILY_DISTRICT_READ;
  sections: ICoreFormSection[] = [
    {
      rows: [
        [
          {
            flexSize: 0,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_DISCIPLINE_DISCIPLINE_ID,
            field: 'id',
            value: 0,
            controlType: EnumFormBaseContolType.TEXTBOX,
            readonly: true,
            hidden: true,
            type: 'number'
          },
        ],
        [
          {
            flexSize: 3,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_FAMILY_FULLNAME,
            field: 'fullname',
            value: '',
            controlType: EnumFormBaseContolType.TEXTBOX,
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
            flexSize: 3,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_FAMILY_RELATIONSHIP,
            field: 'relationshipId',
            value: '',
            controlType: EnumFormBaseContolType.DROPDOWN,
            getByIdObject$: this.relationshipGetByIdObject$,
            getByIdApi: this.relationshipGetByIdApi,
            shownFrom: 'name',
            dropdownOptions$: this.relationshipOptions$,
            type: 'number',
            validators: [
              {
                name: 'required',
                validator: Validators.required,
                errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
              },
              {
                name: 'minLength',
                validator: Validators.min(1),
                errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
              }
            ]
          },
          {
            flexSize: 3,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_FAMILY_GENDER,
            field: 'gender',
            value: '',
            controlType: EnumFormBaseContolType.DROPDOWN,
            getByIdObject$: this.relationshipGetByIdObject$,
            getByIdApi: this.relationshipGetByIdApi,
            shownFrom: 'name',
            dropdownOptions$: this.genderOptions$,
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
            flexSize: 3,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_FAMILY_BIRTH_DATE,
            field: 'birthDate',
            value: null,
            controlType: EnumFormBaseContolType.DATEPICKER,
            type: 'date',
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
            flexSize: 3,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_FAMILY_PIT_CODE,
            field: 'pitCode',
            value: '',
            controlType: EnumFormBaseContolType.TEXTBOX,
            type: 'text'
          },
          {
            flexSize: 3,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_FAMILY_SAME_COMPANY,
            field: 'sameCompany',
            value: '',
            controlType: EnumFormBaseContolType.CHECKBOX,
            type: 'boolean'
          },
          {
            flexSize: 3,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_FAMILY_IS_DEAD,
            field: 'isDead',
            value: '',
            controlType: EnumFormBaseContolType.CHECKBOX,
            type: 'boolean'
          },
          {
            flexSize: 3,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_FAMILY_IS_DEDUCT,
            field: 'isDeduct',
            value: '',
            controlType: EnumFormBaseContolType.CHECKBOX,
            type: 'boolean'
          }
        ],
        [
          {
            flexSize: 3,
            hidden: false,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_FAMILY_REGIST_DEDUCT_DATE,
            field: 'registDeductDate',
            value: null,
            controlType: EnumFormBaseContolType.DATEPICKER,
            type: 'date'
          },
          {
            flexSize: 3,
            hidden: false,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_FAMILY_DEDUCT_FROM,
            field: 'deductFrom',
            value: null,
            controlType: EnumFormBaseContolType.DATEPICKER,
            type: 'date'
          },
          {
            flexSize: 3,
            hidden: false,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_FAMILY_DEDUCT_TO,
            field: 'deductTo',
            value: null,
            controlType: EnumFormBaseContolType.DATEPICKER,
            type: 'date'
          },
          {
            flexSize: 3,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_FAMILY_ID_NO,
            field: 'idNo',
            value: '',
            controlType: EnumFormBaseContolType.TEXTBOX,
            type: 'number'
          },
        ],
        [
          {
            flexSize: 3,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_FAMILY_NATIONALITY,
            field: 'nationality',
            value: '',
            controlType: EnumFormBaseContolType.DROPDOWN,
            getByIdObject$: this.nationalityGetByIdObject$,
            getByIdApi: this.nationalityGetByIdApi,
            shownFrom: 'name',
            dropdownOptions$: this.nationalityOptions$,
            type: 'number'
          },
          {
            flexSize: 3,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_FAMILY_BIRTH_CER_PROVINCE,
            field: 'birthCerProvince',
            value: '',
            controlType: EnumFormBaseContolType.DROPDOWN,
            getByIdObject$: this.provinceGetByIdObject$,
            getByIdApi: this.provinceGetByIdApi,
            shownFrom: 'name',
            dropdownOptions$: this.provinceOptions$,
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
            flexSize: 3,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_FAMILY_BIRTH_CER_DISTRICT,
            field: 'birthCerDistrict',
            value: '',
            controlType: EnumFormBaseContolType.DROPDOWN,
            getByIdObject$: this.districtGetByIdObject$,
            getByIdApi: this.districtGetByIdApi,
            shownFrom: 'name',
            dropdownOptions$: this.districtOptions$,
            type: 'number',
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
            flexSize: 3,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_FAMILY_BIRTH_CER_WARD,
            field: 'birthCerWard',
            value: '',
            controlType: EnumFormBaseContolType.DROPDOWN,
            getByIdObject$: this.wardGetByIdObject$,
            getByIdApi: this.wardGetByIdApi,
            shownFrom: 'name',
            dropdownOptions$: this.wardOptions$,
            type: 'number',
            disabled: true,
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
            flexSize: 3,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_FAMILY_CAREER,
            field: 'career',
            value: '',
            controlType: EnumFormBaseContolType.TEXTBOX,
            type: 'text'
          },
          {
            flexSize: 6,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_FAMILY_NOTE,
            field: 'note',
            value: '',
            controlType: EnumFormBaseContolType.TEXTBOX,
            type: 'text'
          },
          {
            flexSize: 0,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_FAMILY_NOTE,
            field: 'employeeId',
            value: this.authService.data$.value?.employeeId,
            controlType: EnumFormBaseContolType.TEXTBOX,
            type: 'number',
            hidden: true
          },
          {
            flexSize: 0,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_FAMILY_NOTE,
            field: 'isSavePortal',
            value: '',
            controlType: EnumFormBaseContolType.TEXTBOX,
            type: 'bool',
            hidden: true
          },
          {
            flexSize: 0,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_FAMILY_NOTE,
            field: 'huFamilyId',
            value: '',
            controlType: EnumFormBaseContolType.TEXTBOX,
            type: 'number',
            hidden: true
          },

        ]
      ]
    }
  ]
  crud!: ICorePageEditCRUD;
  override entityTable = "PORTAL_FAMILY_INFO"
  constructor(
    public override dialogService: DialogService,
    private mls: MultiLanguageService,
    private appService: AppService,
    private familyInfoService: FamilyInfoSerivce,
    private authService: AuthService,
    private urlService: UrlService,
    private coreFormService: CoreFormService
  ) {
    super(dialogService);

    this.crud = {
      c: api.PORTAL_HU_FAMILY_CREATE,
      r: api.PORTAL_HU_FAMILY_READ,
      u: api.PORTAL_HU_FAMILY_UPDATE,
      d: api.PORTAL_HU_FAMILY_DELETE,
      s: api.PORTAL_HU_FAMILY_SAVE
    };
  }


  ngOnInit(): void {
    this.urlService.previousRouteUrl$.next('/profile/family-info')
    this.subscriptions.push(
      this.appService
        .get(api.SYS_OTHERLIST_GETOTHERLISTBYTYPE + "RELATION")
        .subscribe((res: any) => {
          if (!!res.ok && res.status === 200) {
            const body: IFormatedResponse = res.body
            if (body.statusCode === 200 && !!body.innerBody) {
              const options: { value: number | null; text: string; }[] = [];
              res.body.innerBody.map((g: any) => {
                options.push({
                  value: g.id,
                  text: g.name
                })
              })
              this.relationshipOptions$.next(options);
            }
          }
        })
    )
    this.subscriptions.push(
      this.appService
        .get(api.SYS_OTHERLIST_GETOTHERLISTBYTYPE + "GENDER")
        .subscribe((res: any) => {
          if (!!res.ok && res.status === 200) {
            const body: IFormatedResponse = res.body
            if (body.statusCode === 200 && !!body.innerBody) {
              const options: { value: number | null; text: string; }[] = [];
              res.body.innerBody.map((g: any) => {
                options.push({
                  value: g.id,
                  text: g.name
                })
              })
              this.genderOptions$.next(options);
            }
          }
        })
    )
    this.subscriptions.push(
      this.appService
        .get(api.HU_FAMILY_NATIONALITY_LIST)
        .subscribe((res: any) => {
          if (!!res.ok && res.status === 200) {
            const body: IFormatedResponse = res.body
            if (body.statusCode === 200 && !!body.innerBody) {
              const options: { value: number | null; text: string; }[] = [];
              res.body.innerBody.map((g: any) => {
                options.push({
                  value: g.id,
                  text: g.name
                })
              })
              this.nationalityOptions$.next(options);
            }
          }
        })
    )
    this.subscriptions.push(
      this.familyInfoService
        .getProvince(api.HU_FAMILY_PROVINCE_LIST)
        .subscribe((res: any) => {
          if (!!res.ok && res.status === 200) {
            const body: IFormatedResponse = res.body
            if (body.statusCode === 200 && !!body.innerBody) {
              const options: { value: number | null; text: string; }[] = [];
              res.body.innerBody.map((g: any) => {
                options.push({
                  value: g.id,
                  text: g.name
                })
              })
              this.provinceOptions$.next(options);
            }
          }
        })
    )
  }
  onFormCreated(e: FormGroup) {
    this.form = e;
    if (this.familyInfoService.familyId != 0) {
      this.subscriptions.push(
        this.appService.get(api.PORTAL_HU_FAMILY_READ + `?id=${this.familyInfoService.familyId}`)
          .subscribe(x => {
            if (x.ok && x.status === 200) {
              this.form.patchValue(x.body.innerBody)
            }
          })
      )
    }
    if (this.familyInfoService.familyEditId != 0) {
      this.subscriptions.push(
        this.appService.get(api.PORTAL_HU_FAMILY_EDIT_GET_SAVE_BY_ID + `?id=${this.familyInfoService.familyEditId}`)
          .subscribe(x => {
            if (x.ok && x.status === 200) {
              this.form.patchValue(x.body.innerBody)
            }
          })
      )

    }
    this.subscriptions.push( // <== Outer push
      this.form.get('birthCerProvince')?.valueChanges.pipe(distinctUntilChanged()).subscribe(x => {
        if (!!x) {
          this.form.get('birthCerDistrict')?.enable();
          this.subscriptions.push( // <== Inner push
            this.appService
              .get(api.HU_FAMILY_DISTRICT_LIST + x)
              .subscribe((res: any) => {
                if (!!res.ok && res.status === 200) {
                  const body: IFormatedResponse = res.body
                  if (body.statusCode === 200 && !!body.innerBody) {
                    const options: { value: number | null; text: string }[] = [];
                    res.body.innerBody.map((g: any) => {
                      options.push({
                        value: g.id,
                        text: g.name,
                      })
                    })
                    this.districtOptions$.next(options);
                  }
                }
              })
          )
        } else {
        }
      })!
    )
    this.subscriptions.push( // <== Outer push
      this.form.get('birthCerDistrict')?.valueChanges.pipe(distinctUntilChanged()).subscribe(x => {
        if (!!x) {
          this.form.get('birthCerWard')?.enable();
          this.subscriptions.push( // <== Inner push
            this.appService
              .get(api.HU_FAMILY_WARD_LIST + x)
              .subscribe((res: any) => {
                if (!!res.ok && res.status === 200) {
                  const body: IFormatedResponse = res.body
                  if (body.statusCode === 200 && !!body.innerBody) {
                    const options: { value: number | null; text: string }[] = [];
                    res.body.innerBody.map((g: any) => {
                      options.push({
                        value: g.id,
                        text: g.name,
                      })
                    })
                    this.wardOptions$.next(options);
                  }
                }
              })
          )
        } else {
        }
      })!
    )
    this.form.get('registDeductDate')?.valueChanges.subscribe(x => {
      if(!!x){
        this.form.get('deductFrom')?.setValue(x)
      }
    })
  }
  onFormReinit(e: string): void {
    this.formInitStringValue = e;
  }
  ngOnDestroy(): void {
    this.familyInfoService.familyId = 0
    this.familyInfoService.familyEditId = 0
    this.urlService.currentRouteUrl$.next('/profile/family-info')
  }
}
