import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { EnumTranslateKey, api } from 'alpha-global-constants';
import { BehaviorSubject, Subscription, distinctUntilChanged, forkJoin } from 'rxjs';
import { FamilyEditService } from '../../../../../../../../../../main/cms/profile/appbusiness/family/family-edit/family-edit.service';
import { BaseEditComponent, ICoreDropdownOption, ICorePageEditCRUD, ICoreFormSection, EnumFormBaseContolType, DialogService, AppService, IFormatedResponse } from 'ngx-histaff-alpha';
import { PersonnelCenterService } from '../../../../personnel-center.service';

@Component({
  selector: 'app-contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrls: ['./contact-edit.component.scss']
})
export class ContactEditComponent extends BaseEditComponent implements OnInit, OnDestroy {

  override entityTable = "HU_EMPLOYEE_CV";
  subscriptions: Subscription[] = []

  cityOptions$ = new BehaviorSubject<ICoreDropdownOption[]>([]);
  cityGetById$ = new BehaviorSubject<any>(null);
  cityGetByIdApi = api.HU_FAMILY_PROVINCE_READ;

  districtOptions$ = new BehaviorSubject<ICoreDropdownOption[]>([]);
  districtGetById$ = new BehaviorSubject<any>(null);
  districtGetByIdApi = api.HU_FAMILY_DISTRICT_READ;

  wardOptions$ = new BehaviorSubject<ICoreDropdownOption[]>([]);
  wardGetById$ = new BehaviorSubject<any>(null);
  wardGetByIdApi = api.HU_FAMILY_WARD_READ;

  curCityOptions$ = new BehaviorSubject<ICoreDropdownOption[]>([]);
  curCityGetById$ = new BehaviorSubject<any>(null);
  curCityGetByIdApi = api.HU_FAMILY_PROVINCE_READ;
  
  curWardOptions$ = new BehaviorSubject<ICoreDropdownOption[]>([]);
  curWardGetById$ = new BehaviorSubject<any>(null);
  curWardGetByIdApi =api.HU_FAMILY_WARD_READ;

  curDistrictOptions$ = new BehaviorSubject<ICoreDropdownOption[]>([]);
  curDistrictGetById$ = new BehaviorSubject<any>(null);
  curDistrictGetByIdApi = api.HU_FAMILY_DISTRICT_READ;
  

  captionCode!: EnumTranslateKey.UI_COMPONENT_TITLE_CONTACT_EDIT;
  crud!: ICorePageEditCRUD;
  sections: ICoreFormSection[] =
  [
    {
      rows: [
        [
          {
            flexSize: 12,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_COMMON_ID,
            field: 'id',
            value: '',
            controlType: EnumFormBaseContolType.TEXTBOX,
            hidden : true
          },
        ],
        [
          {
            flexSize: 3,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_PERMANENT_TELEPHONE,
            field: 'telephone',
            value: '',
            controlType: EnumFormBaseContolType.TEXTBOX,
          },
          {
            flexSize: 3,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_PERMANENT_LANDLINE_PHONE,
            field: 'landlinePhone',
            value: '',
            controlType: EnumFormBaseContolType.TEXTBOX,
          },
          {
            flexSize: 3,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_PERMANENT_EMAIL_COMPANY,
            field: 'emailCompany',
            value: '',
            controlType: EnumFormBaseContolType.TEXTBOX,
          },
          {
            flexSize: 3,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_PERMANENT_EMAIL_PERSONAL,
            field: 'emailPersonal',
            value: '',
            controlType: EnumFormBaseContolType.TEXTBOX,
          },
        ],
        [
          {
            flexSize: 3,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_PERMANENT_CITY,
            field: 'provinceId',
            value: '',
            controlType: EnumFormBaseContolType.DROPDOWN,
            dropdownOptions$ : this.cityOptions$,
            shownFrom: 'name',
            boundFrom: 'id',
            getByIdObject$ : this.cityGetById$,
            getByIdApi : this.cityGetByIdApi,
            validators: [
              {
                name: 'required',
                validator: Validators.required,
                errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
              },
            ],
          },
          {
            flexSize: 3,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_PERMANENT_DISTRICT,
            field: 'districtId',
            value: '',
            controlType: EnumFormBaseContolType.DROPDOWN,
            dropdownOptions$ : this.districtOptions$,
            shownFrom: 'name',
            boundFrom: 'id',
            getByIdObject$ : this.districtGetById$,
            getByIdApi : this.districtGetByIdApi,
            validators: [
              {
                name: 'required',
                validator: Validators.required,
                errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
              },
            ],
          },
          {
            flexSize: 3,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_PERMANENT_WARD,
            field: 'wardId',
            value: '',
            controlType: EnumFormBaseContolType.DROPDOWN,
            dropdownOptions$ : this.wardOptions$,
            shownFrom: 'name',
            boundFrom: 'id',
            getByIdObject$ : this.wardGetById$,
            getByIdApi : this.wardGetByIdApi,
            validators: [
              {
                name: 'required',
                validator: Validators.required,
                errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
              },
            ],
          },
          {
            flexSize: 3,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_PERMANENT_ADDRESS,
            field: 'address',
            value: '',
            controlType: EnumFormBaseContolType.TEXTBOX,
            validators: [
              {
                name: 'required',
                validator: Validators.required,
                errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
              },
            ],
          }
        ],
        [
          {
            flexSize: 3,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_PERMANENT_CUR_CITY,
            field: 'curProvinceId',
            value: '',
            shownFrom: 'name',
            boundFrom: 'id',
            controlType: EnumFormBaseContolType.DROPDOWN,
            dropdownOptions$ : this.curCityOptions$,
            getByIdObject$ : this.curCityGetById$,
            getByIdApi : this.curCityGetByIdApi,
          },
          {
            flexSize: 3,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_PERMANENT_CUR_DISTRICT,
            field: 'curDistrictId',
            value: '',
            controlType: EnumFormBaseContolType.DROPDOWN,
            dropdownOptions$ : this.curDistrictOptions$,
            shownFrom: 'name',
            boundFrom: 'id',
            getByIdObject$ : this.curDistrictGetById$,
            getByIdApi : this.curDistrictGetByIdApi,
          },
          {
            flexSize: 3,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_PERMANENT_CUR_WARD,
            field: 'curWardId',
            value: '',
            controlType: EnumFormBaseContolType.DROPDOWN,
            dropdownOptions$ : this.curWardOptions$,
            shownFrom: 'name',
            boundFrom: 'id',
            getByIdObject$ : this.curWardGetById$,
            getByIdApi : this.curWardGetByIdApi,
          },
          {
            flexSize: 3,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_PERMANENT_CUR_ADDRESS,
            field: 'curAddress',
            value: '',
            controlType: EnumFormBaseContolType.TEXTBOX,
          }
        ],
        [
          {
            flexSize: 3,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_HOUSEHOLD_NUMBER,
            field: 'householdNumber',
            value: '',
            controlType: EnumFormBaseContolType.TEXTBOX,
          },
          {
            flexSize: 3,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_HOUSEHOLD_CODE,
            field: 'householdCode',
            value: '',
            controlType: EnumFormBaseContolType.TEXTBOX,
          },
          {
            flexSize: 3,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_HOST,
            field: 'isHost',
            value: '',
            controlType: EnumFormBaseContolType.CHECKBOX,
          }
        ],
      ]
    },
  ];
  
  constructor(
    public override dialogService: DialogService,
    private personnelCenterService: PersonnelCenterService,
    private appService: AppService,
    private familyEditService: FamilyEditService,
  ) {

    super(dialogService);

    this.captionCode = EnumTranslateKey.UI_COMPONENT_TITLE_CONTACT_EDIT;

    this.crud = {
      r: api.HU_EMPLOYEE_CV_GET_CONTACT_ID,
      u: api.HU_EMPLOYEE_CV_UPDATE_CONTACT_ID,
    };

  }

  ngOnInit(): void {
    
    
  
  }


  /* GET FormGroup Instance */
  onFormCreated(e: FormGroup): void {
    this.form = e;
    this.subscriptions.push(
      this.familyEditService
      .GetProvince(api.HU_FAMILY_PROVINCE_LIST)
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
        this.cityOptions$.next(options);
        this.curCityOptions$.next(options);
      }}
      })
    )
    
    this.subscriptions.push( // <== Outer push
      this.form.get('provinceId')?.valueChanges.subscribe(x => {
        if (!!x) {
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
        }
      })!
    )
    this.subscriptions.push( // <== Outer push
      this.form.get('curProvinceId')?.valueChanges.subscribe(x => {
        if (!!x) {
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
                    this.curDistrictOptions$.next(options);
                  }
                }
              })
          )
        }
      })!
    )

    this.form.get('districtId')?.valueChanges.subscribe(x => {
      if (!!x) {
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
      }
    })!
    this.form.get('curDistrictId')?.valueChanges.subscribe(x => {
      if (!!x) {
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
                  this.curWardOptions$.next(options);
                }
              }
            })
        )
      }
    })!
  }

  /* To allow form to be deactivated */
  onFormReinit(e: string): void {
    this.formInitStringValue = e;
  }

  ngOnDestroy(): void {
    this.personnelCenterService.reloadFlag$.next(true);
    this.subscriptions.map(x => x?.unsubscribe());
  }

}
