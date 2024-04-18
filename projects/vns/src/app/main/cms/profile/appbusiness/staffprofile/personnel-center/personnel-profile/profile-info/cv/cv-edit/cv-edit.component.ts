import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { api, EnumTranslateKey } from 'alpha-global-constants';
import { BaseEditComponent, ICoreDropdownOption, ICorePageEditCRUD, ICoreFormSection, EnumFormBaseContolType, DialogService, AppService, CustomValidators, IFormatedResponse } from 'ngx-histaff-alpha';
import { BehaviorSubject, Subscription, forkJoin } from 'rxjs';
import { PersonnelCenterService } from '../../../../personnel-center.service';
import { FamilyEditService } from '../../../../../../family/family-edit/family-edit.service';


@Component({
  selector: 'app-cv-edit',
  templateUrl: './cv-edit.component.html',
  styleUrls: ['./cv-edit.component.scss']
})
export class CvEditComponent extends BaseEditComponent implements OnInit, OnDestroy {

  override entityTable = "HU_EMPLOYEE_CV";

  subscriptions: Subscription[] = []
  genderGetById$ = new BehaviorSubject<any>(null);
  genderGetByIdApi = api.SYS_OTHERLIST_READ;
  genderOptions$ = new BehaviorSubject<any>(null);


  nationalityGetById$ = new BehaviorSubject<any>(null);
  nationalityGetByIdApi = api.SYS_OTHERLIST_READ;
  nationalityOptions$ = new BehaviorSubject<any>(null);

  nationGetById$ = new BehaviorSubject<any>(null);
  nationGetByIdApi = api.SYS_OTHERLIST_READ;
  nationOptions$ = new BehaviorSubject<any>(null);

  religionGetById$ = new BehaviorSubject<any>(null);
  religionGetByIdApi = api.SYS_OTHERLIST_READ;
  religionOptions$ = new BehaviorSubject<any>(null);

  maritalStatusGetById$ = new BehaviorSubject<any>(null);
  maritalStatusGetByIdApi = api.SYS_OTHERLIST_READ;
  maritalStatusOptions$ = new BehaviorSubject<any>(null);

  identityAddressOptions$ = new BehaviorSubject<ICoreDropdownOption[]>([]);
  identityAddressGetById$ = new BehaviorSubject<any>(null);
  identityAddressGetByIdApi = api.HU_FAMILY_PROVINCE_READ;
  
  taxCodeAddressOptions$ = new BehaviorSubject<ICoreDropdownOption[]>([]);
  taxCodeAddressGetById$ = new BehaviorSubject<any>(null);
  taxCodeAddressGetByIdApi = api.HU_FAMILY_PROVINCE_READ;

  captionCode!: EnumTranslateKey.UI_COMPONENT_TITLE_CURRUCULUM_EDIT;
  crud!: ICorePageEditCRUD;

  apiParams : string[] = ['GENDER', 'NATION', 'NATIONALITY', 'FAMILY_STATUS', 'RELIGION'];
  optionsMap: { [key: string]: BehaviorSubject<any[]> } = {};
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
              validators: [
                {
                  name: 'required',
                  validator: Validators.required,
                  errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
                }
              ],
            },
            {
              flexSize: 4,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_STAFF_PROFILE_BIRTH_DATE,
              field: 'birthDay',
              value: '',
              controlType: EnumFormBaseContolType.DATEPICKER,
              validators: [
                {
                  name: 'required',
                  validator: Validators.required,
                  errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
                }
              ],
            },
            {
              flexSize: 4,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_USER_NATION,
              field: 'nationId',
              value: '',
              getByIdObject$: this.nationGetById$,
              getByIdApi: this.nationGetByIdApi,
              boundFrom: 'id',
              shownFrom: 'name',
              dropdownOptions$: this.nationOptions$,
              controlType: EnumFormBaseContolType.DROPDOWN,
            }
          ],
          [
            {
              flexSize: 3,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_USER_NATIONALITY,
              field: 'nationalityId',
              value: '',
              getByIdObject$: this.nationalityGetById$,
              getByIdApi: this.nationalityGetByIdApi,
              boundFrom: 'id',
              shownFrom: 'name',
              dropdownOptions$: this.nationalityOptions$,
              controlType: EnumFormBaseContolType.DROPDOWN,
            },
            {
              flexSize: 9,
              field: 'birthRegisAddress',
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_USER_BIRTH_REGIS_ADDRESS,
              controlType: EnumFormBaseContolType.TEXTBOX,
              type: 'string',
              value: '',
            },
          ],
          [
            {
              flexSize: 6,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_USER_DOMICILE,
              field: 'domicile',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
            },
            {
              flexSize: 6,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_USER_BIRTH_ADDRESS,
              field: 'birthPlace',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
            },
          ],
          [
            {
              flexSize: 4,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_USER_BIRTH_RELIGION,
              field: 'religionId',
              getByIdObject$: this.religionGetById$,
              getByIdApi: this.religionGetByIdApi,
              boundFrom: 'id',
              shownFrom: 'name',
              dropdownOptions$: this.religionOptions$,
              value: '',
              controlType: EnumFormBaseContolType.DROPDOWN,
            },
            {
              flexSize: 4,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_USER_MARITAL_STATUS,
              field: 'maritalStatusId',
              getByIdObject$: this.maritalStatusGetById$,
              getByIdApi: this.maritalStatusGetByIdApi,
              boundFrom: 'id',
              type : 'number',
              shownFrom: 'name',
              dropdownOptions$: this.maritalStatusOptions$,
              value: '',
              controlType: EnumFormBaseContolType.DROPDOWN,
            },
            {
              flexSize: 4,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_USER_IDENTITY_NUMBER,
              field: 'identityNumber',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
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
          ],
          [
            {
              flexSize: 3,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_USER_IDENTITY_NUMBER_DATE,
              field: 'identityNumberDate',
              value: '',
              controlType: EnumFormBaseContolType.DATEPICKER,
            },
            {
              flexSize: 9,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_USER_IDENTITY_NUMBER_ADDRESS,
              field: 'identityNumberAddress',
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
          [
            {
              flexSize: 4,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_USER_TAX_CODE,
              field: 'taxCode',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              // validators: [
              //   {
              //     name: 'required',
              //     validator: Validators.required,
              //     errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
              //   },
              // ],
            },
            {
              flexSize: 4,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_USER_TAX_CODE_DATE,
              field: 'taxCodeDate',
              value: '',
              controlType: EnumFormBaseContolType.DATEPICKER,
            },
            {
              flexSize: 4,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_USER_TAX_CODE_ADDRESS,
              field: 'taxCodeAddress',
              value: '',
              controlType: EnumFormBaseContolType.DROPDOWN,
              getByIdObject$: this.taxCodeAddressGetById$,
              getByIdApi: this.taxCodeAddressGetByIdApi,
              boundFrom: 'id',
              shownFrom: 'name',
              dropdownOptions$: this.taxCodeAddressOptions$,
              type: 'number',
            },
          ],
          [
            {
              flexSize: 4,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_USER_BLOODGROUP,
              field: 'bloodGroup',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
            },
            {
              flexSize: 4,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_USER_HEIGHT,
              field: 'height',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
            },
            {
              flexSize: 4,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_USER_WEIGHT,
              field: 'weight',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
            },
          ],
          [
            {
              flexSize: 4,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_USER_BLOOD_PRESSURE,
              field: 'bloodPressure',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
            },
            {
              flexSize: 4,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_USER_HEATH_TYPE,
              field: 'heathType',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
            },
            {
              flexSize: 4,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_USER_LEFT_EYE,
              field: 'leftEye',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
            },
           
          ],
          [
            {
              flexSize: 4,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_USER_RIGHT_EYE,
              field: 'rightEye',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
            },
            {
              flexSize: 4,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_USER_HEART,
              field: 'heart',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
            },
            {
              flexSize: 4,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_USER_DATE_MEDICAL_EXAM,
              field: 'dateExam',
              value: '',
              controlType: EnumFormBaseContolType.DATEPICKER,
            },
          ],
          [
            {
              flexSize: 12,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_USER_HEALTH_NOTE,
              field: 'healthNote',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
            },
          ]
        ]
      },
    ];

  constructor(
    public override dialogService: DialogService,
    private personnelCenterService: PersonnelCenterService,
    private appService: AppService,
    private familyEditService: FamilyEditService
  ) {

    super(dialogService);

    this.captionCode = EnumTranslateKey.UI_COMPONENT_TITLE_CURRUCULUM_EDIT;

    this.crud = {
      r: api.HU_EMPLOYEE_CV_CURRUCULUM_READ,
      u: api.HU_EMPLOYEE_CV_CURRUCULUM_UPDATE,
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
                this.nationOptions$.next(options);
                break;
              case 'NATIONALITY':
                this.nationalityOptions$.next(options);
                break;
              case 'FAMILY_STATUS':
                this.maritalStatusOptions$.next(options);
                break;
              case 'RELIGION':
                this.religionOptions$.next(options);
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
          this.identityAddressOptions$.next(options);
          this.taxCodeAddressOptions$.next(options);
        }}
        })
      )
  }
  ngAfterViewInit(){
    this.getAllValueDropdown();
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
