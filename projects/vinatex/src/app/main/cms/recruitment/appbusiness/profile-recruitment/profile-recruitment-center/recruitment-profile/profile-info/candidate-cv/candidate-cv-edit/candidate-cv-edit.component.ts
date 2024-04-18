import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProfileRecruitmentCenterService } from '../../../../profile-recruitment-center.service';
import { Validators, AbstractControl, FormGroup } from '@angular/forms';
import { api, EnumTranslateKey } from 'alpha-global-constants';
import { BaseEditComponent, ICoreDropdownOption, ICorePageEditCRUD, ICoreFormSection, EnumFormBaseContolType, EnumCoreTablePipeType, DialogService, AppService, CustomValidators, IFormatedResponse } from 'ngx-histaff-alpha';
import { Subscription, BehaviorSubject, forkJoin } from 'rxjs';
import { CvEditComponent } from '../../../../../../../../profile/appbusiness/staffprofile/personnel-center/personnel-profile/profile-info/cv/cv-edit/cv-edit.component';
import { FamilyEditService } from '../../../../../../../../../cms/profile/appbusiness/family/family-edit/family-edit.service';

@Component({
  selector: 'app-candidate-cv-edit',
  standalone: false,
  templateUrl: './candidate-cv-edit.component.html',
  styleUrl: './candidate-cv-edit.component.scss'
})
export class CandidateCvEditComponent extends BaseEditComponent implements OnInit, OnDestroy{
  override entityTable = "HU_EMPLOYEE_CV";

  subscriptions: Subscription[] = []
  genderGetById$ = new BehaviorSubject<any>(null);
  genderGetByIdApi = api.SYS_OTHERLIST_READ;
  genderOptions$ = new BehaviorSubject<any>(null);


  nationalityGetById$ = new BehaviorSubject<any>(null);
  nationalityGetByIdApi = api.SYS_OTHERLIST_READ;
  nationalityOption$ = new BehaviorSubject<any>(null);

  nationGetById$ = new BehaviorSubject<any>(null);
  nationGetByIdApi = api.SYS_OTHERLIST_READ;
  nationOption$ = new BehaviorSubject<any>(null);

  religionGetById$ = new BehaviorSubject<any>(null);
  religionGetByIdApi = api.SYS_OTHERLIST_READ;
  religionOption$ = new BehaviorSubject<any>(null);

  maritalStatusGetById$ = new BehaviorSubject<any>(null);
  maritalStatusGetByIdApi = api.SYS_OTHERLIST_READ;
  maritalStatusOptions$ = new BehaviorSubject<any>(null);

  identityAddressOptions$ = new BehaviorSubject<ICoreDropdownOption[]>([]);
  identityAddressGetById$ = new BehaviorSubject<any>(null);
  identityAddressGetByIdApi = api.HU_FAMILY_PROVINCE_READ;
  
  perCityOptions$ = new BehaviorSubject<ICoreDropdownOption[]>([]);
  perCityGetById$ = new BehaviorSubject<any>(null);
  perCityGetByIdApi = api.HU_FAMILY_PROVINCE_READ;

  perDistrictOptions$ = new BehaviorSubject<ICoreDropdownOption[]>([]);
  perDistrictGetById$ = new BehaviorSubject<any>(null);
  perDistrictGetByIdApi = api.HU_FAMILY_DISTRICT_READ;

  perWardOptions$ = new BehaviorSubject<ICoreDropdownOption[]>([]);
  perWardGetById$ = new BehaviorSubject<any>(null);
  perWardGetByIdApi = api.HU_FAMILY_WARD_READ;

  contactProvinceTempOptions$ = new BehaviorSubject<ICoreDropdownOption[]>([]);
  contactProvinceTempGetById$ = new BehaviorSubject<any>(null);
  contactProvinceTempGetByIdApi = api.HU_FAMILY_PROVINCE_READ;
  
  contactWardTempOptions$ = new BehaviorSubject<ICoreDropdownOption[]>([]);
  contactWardTempGetById$ = new BehaviorSubject<any>(null);
  contactWardTempGetByIdApi =api.HU_FAMILY_WARD_READ;

  contactDistrictTempOptions$ = new BehaviorSubject<ICoreDropdownOption[]>([]);
  contactDistrictTempGetById$ = new BehaviorSubject<any>(null);
  contactDistrictTempGetByIdApi = api.HU_FAMILY_DISTRICT_READ;

  captionCode!: EnumTranslateKey.UI_COMPONENT_TITLE_CURRUCULUM_EDIT;
  crud!: ICorePageEditCRUD;

  apiParams : string[] = ['GENDER', 'NATION', 'NATIONALITY', 'FAMILY_STATUS', 'RELIGION'];
  optionsMap: { [key: string]: BehaviorSubject<any[]> } = {};
  sections: ICoreFormSection[] =
    [
      /* --------------- Thông tin cá nhân --------------- */
      {
        caption: EnumTranslateKey.UI_COMPONENT_TITLE_PERSONAL_INFORMATION,
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
            //Giới tính - RC_CANDIDATE
            {
              flexSize: 4,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_USER_GENDER,
              field: 'genderId',
              value: '',
              controlType: EnumFormBaseContolType.DROPDOWN,
              getByIdObject$: this.genderGetById$,
              getByIdApi: this.genderGetByIdApi,
              boundFrom: 'id',
              shownFrom: 'name',
              dropdownOptions$: this.genderOptions$,
              type: 'number',
              validators: [
                {
                  name: 'required',
                  validator: Validators.required,
                  errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
                }
              ],
            },
            //Tình trạng hôn nhân - RC_CANDIDATE_CV
            {
              flexSize: 4,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_USER_MARITAL_STATUS,
              field: 'maritalStatus',
              value: '',
              controlType: EnumFormBaseContolType.DROPDOWN,
              getByIdObject$: this.maritalStatusGetById$,
              getByIdApi: this.maritalStatusGetByIdApi,
              boundFrom: 'id',
              shownFrom: 'name',
              type: 'number',
              dropdownOptions$: this.maritalStatusOptions$
            },
            //Dân tộc - RC_CANDIDATE_CV
            {
              flexSize: 4,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_USER_NATION,
              field: 'nationId',
              value: '',
              getByIdObject$: this.nationGetById$,
              getByIdApi: this.nationGetByIdApi,
              boundFrom: 'id',
              shownFrom: 'name',
              dropdownOptions$: this.nationOption$,
              type: 'number',
              controlType: EnumFormBaseContolType.DROPDOWN,
            }
          ],
          [
            //Tôn giáo - RC_CANDIDATE_CV
            {
              flexSize: 4,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_USER_BIRTH_RELIGION,
              field: 'religionId',
              value: '',
              getByIdObject$: this.religionGetById$,
              getByIdApi: this.religionGetByIdApi,
              boundFrom: 'id',
              shownFrom: 'name',
              dropdownOptions$: this.religionOption$,
              controlType: EnumFormBaseContolType.DROPDOWN,
              type: 'number',
            },
            //Quốc tịch - RC_CANDIDATE_CV
            {
              flexSize: 4,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_USER_NATIONALITY,
              field: 'nationalityId',
              value: '',
              getByIdObject$: this.nationalityGetById$,
              getByIdApi: this.nationalityGetByIdApi,
              boundFrom: 'id',
              shownFrom: 'name',
              dropdownOptions$: this.nationalityOption$,
              controlType: EnumFormBaseContolType.DROPDOWN,
              type: 'number',
            },
          ],
          [
            //Ngày sinh - RC_CANDIDATE_CV
            {
              flexSize: 4,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_USER_BIRTHDAY,
              field: 'birthDate',
              value: '',
              controlType: EnumFormBaseContolType.DATEPICKER,
              pipe:  EnumCoreTablePipeType.DATE_TIME,
              type: 'date',
            },
            //Nơi sinh - RC_CANDIDATE_CV
            {
              flexSize: 8,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_USER_BIRTH_ADDRESS,
              field: 'birthAddress',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              type: 'string',
            },
          ],
          [
            //Số CMND/CCCD - RC_CANDIDATE_CV
            {
              flexSize: 4,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_USER_IDENTITY_NUMBER,
              field: 'idNo',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              type: 'string',
              validators: [
                {
                  name: 'required',
                  validator: Validators.required,
                  errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
                },
                {
                  name: 'validateLength',
                  validator: CvEditComponent.validateLength,
                  errorMessage: EnumTranslateKey.UI_COMPONENT_TITLE_CHECK_LENGTH_INDENTITY,
                },
              ],
            },
            //Ngày cấp CCCD - RC_CANDIDATE_CV
            {
              flexSize: 4,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_USER_IDENTITY_NUMBER_DATE,
              field: 'idDate',
              value: '',
              controlType: EnumFormBaseContolType.DATEPICKER,
              type: 'date',
              pipe: EnumCoreTablePipeType.DATE_TIME,
            },
            //Ngày hết hạn CCCD - RC_CANDIDATE_CV
            {
              flexSize: 4,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_USER_IDENTITY_NUMBER_DATE_EXPIRE,
              field: 'idDateExpire',
              value: '',
              controlType: EnumFormBaseContolType.DATEPICKER,
              pipe: EnumCoreTablePipeType.DATE_TIME,
              type: 'date',
            },
          ],
          [
            //Địa chỉ cấp CCCD - RC_CANDIDATE_CV
            {
              flexSize: 4,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_USER_IDENTITY_NUMBER_ADDRESS,
              field: 'idPlace',
              value: '',
              controlType: EnumFormBaseContolType.DROPDOWN,
              getByIdObject$: this.identityAddressGetById$,
              getByIdApi: this.identityAddressGetByIdApi,
              boundFrom: 'id',
              shownFrom: 'name',
              dropdownOptions$: this.identityAddressOptions$,
              type: 'number',
              
            },
          ],
        ]
      },
      /* --------------- Thông tin liên hệ --------------- */
      {
        caption: EnumTranslateKey.UI_COMPONENT_TITLE_CONTACT_INFO,
        rows: [
          [
            // Địa chỉ thường trú - RC_CANDIDATE_CV
            {
              flexSize: 12,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_PERMANENT_ADDRESS,
              field: 'perAddress',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              type: 'string',
            },
          ],
          [
            // Tỉnh/thành phố(thường trú) - RC_CANDIDATE_CV
            {
              flexSize: 4,
              controlType: EnumFormBaseContolType.DROPDOWN,
              field: 'perProvince',
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_PERMANENT_CITY,
              getByIdObject$: this.perCityGetById$,
              getByIdApi: this.perCityGetByIdApi,
              boundFrom: 'id',
              shownFrom: 'name',
              dropdownOptions$: this.perCityOptions$,
              type: 'number',
              value: '',
            },
            // Quận/huyện thường trú - RC_CANDIDATE_CV
            {
              flexSize: 4,
              controlType: EnumFormBaseContolType.DROPDOWN,
              field: 'perDistrict',
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_PERMANENT_DISTRICT,
              getByIdObject$: this.perDistrictGetById$,
              getByIdApi: this.perDistrictGetByIdApi,
              boundFrom: 'id',
              shownFrom: 'name',
              dropdownOptions$: this.perDistrictOptions$,
              type: 'number',
              value: '',
            },
            // Xã/phường(thường trú) - RC_CANDIDATE_CV
            {
              flexSize: 4,
              controlType: EnumFormBaseContolType.DROPDOWN,
              field: 'perWard',
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_PERMANENT_WARD,
              getByIdObject$: this.perWardGetById$,
              getByIdApi: this.perWardGetByIdApi,
              boundFrom: 'id',
              shownFrom: 'name',
              dropdownOptions$: this.perWardOptions$,
              type: 'number',
              value: '',
            }
          ],
          [
            // Địa chỉ tạm trú - RC_CANDIDATE_CV
            {
              flexSize: 12,
              controlType: EnumFormBaseContolType.TEXTBOX,
              field: 'contactAddressTemp',
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_PERMANENT_CUR_ADDRESS,
              type: 'string',
              value: '',
            },
          ],
          [
            // Tỉnh/thành(tạm trú) - RC_CANDIDATE_CV
            {
              flexSize: 4,
              controlType: EnumFormBaseContolType.DROPDOWN,
              field: 'contactProvinceTemp',
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_PERMANENT_CUR_CITY,
              getByIdObject$: this.contactProvinceTempGetById$,
              getByIdApi: this.contactProvinceTempGetByIdApi,
              boundFrom: 'id',
              shownFrom: 'name',
              dropdownOptions$: this.contactProvinceTempOptions$,
              type: 'number',
              value: '',
            },
            // Quận/huyện(tạm trú) - RC_CANDIDATE_CV
            {
              flexSize: 4,
              controlType: EnumFormBaseContolType.DROPDOWN,
              field: 'contactDistrictTemp',
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_PERMANENT_CUR_DISTRICT,
              getByIdObject$: this.contactDistrictTempGetById$,
              getByIdApi: this.contactDistrictTempGetByIdApi,
              boundFrom: 'id',
              shownFrom: 'name',
              dropdownOptions$: this.contactDistrictTempOptions$,
              type: 'number',
              value: '',
            },
            // Xã/phường(tạm trú) - RC_CANDIDATE_CV
            {
              flexSize: 4,
              controlType: EnumFormBaseContolType.DROPDOWN,
              field: 'contactWardTemp',
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_PERMANENT_CUR_WARD,
              getByIdObject$: this.contactWardTempGetById$,
              getByIdApi: this.contactWardTempGetByIdApi,
              boundFrom: 'id',
              shownFrom: 'name',
              dropdownOptions$: this.contactWardTempOptions$,
              type: 'number',
              value: '',
            }
          ],
          [
            // email cá nhân - RC_CANDIDATE_CV
            {
              flexSize: 4,
              controlType: EnumFormBaseContolType.TEXTBOX,
              field: 'perEmail',
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_PERMANENT_EMAIL_PERSONAL,
              type: 'string',
              value: '',
            },
            // SĐT di động - RC_CANDIDATE_CV
            {
              flexSize: 4,
              controlType: EnumFormBaseContolType.TEXTBOX,
              field: 'mobilePhone',
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_PERMANENT_TELEPHONE,
              type: 'string',
              value: '',
            },
            // Điện thoại cố định - RC_CANDIDATE_CV
            {
              flexSize: 4,
              controlType: EnumFormBaseContolType.TEXTBOX,
              field: 'finderSdt',
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_PERMANENT_LANDLINE_PHONE,
              type: 'string',
              value: '',
            }
          ],
          [
            // Đã có GPLĐ - RC_CANDIDATE_CV
            {
              flexSize: 6,
              controlType: EnumFormBaseContolType.CHECKBOX,
              field: 'isWorkPermit',
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_RC_RECRUITMENT_IS_PERMIT,
              type: 'boolean',
              value: '',
            },
          ]
        ]
      }
      
    ];

  constructor(
    public override dialogService: DialogService,
    private appService: AppService,
    private familyEditService : FamilyEditService,
    private profileRecruitmentCenterService: ProfileRecruitmentCenterService,
  ) {

    super(dialogService);

    this.captionCode = EnumTranslateKey.UI_COMPONENT_TITLE_CURRUCULUM_EDIT;

    this.crud = {
      r: api.RC_CANDIDATE_CV_GET_CV_BY_ID,
      u: api.RC_CANDIDATE_CV_UPDATE,
    };

  }

  ngOnInit(): void {
  }

  static validateLength(control : AbstractControl) : any | null{
    let valid = true;
    const value = control?.value;
    if (value?.length === 9 || value?.length === 12) {
      return null; // Hợp lệ
    }
    valid = false;
    let errorMessage = EnumTranslateKey.UI_COMPONENT_TITLE_CHECK_LENGTH_INDENTITY_1;
    return CustomValidators.core('validateLength', valid, errorMessage)(control);
  }

  getAllValueDropdown() {
    forkJoin(this.apiParams.map(param => this.appService.get(api.SYS_OTHERLIST_GETOTHERLISTBYTYPE + param)))
      .subscribe(responses => {
        responses.forEach((item, index) => {
          if (item.body.statusCode == 200 && item.ok == true) {
            const options: { value: number | null; text: string; }[] = [];
            item.body.innerBody.map((g: any) => {
              options.push({
                value: g.id,
                text: g.name
              });
            });
            const param = this.apiParams[index];
            switch (param) {
              case 'GENDER':
                this.genderOptions$.next(options);
                break;
              case 'NATION':
                this.nationOption$.next(options);
                break;
              case 'NATIONALITY':
                this.nationalityOption$.next(options);
                break;
              case 'FAMILY_STATUS':
                this.maritalStatusOptions$.next(options);
                break;
              case 'RELIGION':
                this.religionOption$.next(options);
                break;
              default:
                break;
            }
          }

        });
      });
  }

 

  /* GET FormGroup Instance */
  onFormCreated(e: FormGroup): void {
    this.form = e;
    console.log(this.form)
    
  }

  ngAfterViewInit(){
    this.getAllValueDropdown();

    setTimeout(() => {
      // Nơi cấp CMND/CCCD + Thành phố thường trú + Tỉnh/Thành phố tạm trú
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
              this.perCityOptions$.next(options);
              this.contactProvinceTempOptions$.next(options);
              this.identityAddressOptions$.next(options);
            }
          }
        })
      )
      
      // Quận huyện thường trú
      this.subscriptions.push( // <== Outer push
        this.form.get('perProvince')?.valueChanges.subscribe(x => {
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
                      this.perDistrictOptions$.next(options);
                    }
                  }
                })
            )
          }
        })!
      )

      // Quận/Huyện tạm trú
      this.subscriptions.push( // <== Outer push
        this.form.get('contactProvinceTemp')?.valueChanges.subscribe(x => {
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
                      this.contactDistrictTempOptions$.next(options);
                    }
                  }
                })
            )
          }
        })!
      )
  
      // Xã phường thường trú
      this.form.get('perDistrict')?.valueChanges.subscribe(x => {
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
                    this.perWardOptions$.next(options);
                  }
                }
              })
          )
        }
      })!

      // Xã phường tạm trú
      this.form.get('contactDistrictTemp')?.valueChanges.subscribe(x => {
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
                    this.contactWardTempOptions$.next(options);
                  }
                }
              })
          )
        }
      })!
    })
  }

  /* To allow form to be deactivated */
  onFormReinit(e: string): void {
    this.formInitStringValue = e;
  }

  ngOnDestroy(): void {
    this.profileRecruitmentCenterService.reloadFlag$.next(true);
    this.subscriptions.map(x => x?.unsubscribe());
  }
}
