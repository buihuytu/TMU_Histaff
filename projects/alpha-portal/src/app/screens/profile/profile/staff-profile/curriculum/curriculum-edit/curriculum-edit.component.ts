import { Component, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { EnumTranslateKey, api } from 'alpha-global-constants';
import { BaseEditComponent, ICorePageEditCRUD, IAlertOptions, ICoreDropdownOption, ICoreFormSection, EnumFormBaseContolType, DialogService, AppService, AuthService, AlertService, MultiLanguageService, UrlService, IFormatedResponse } from 'ngx-histaff-alpha';
import { BehaviorSubject, Subscription } from 'rxjs';
import { CurriculumService } from '../curriculum.service';


@Component({
  selector: 'app-curriculum-edit',
  templateUrl: './curriculum-edit.component.html',
  styleUrls: ['./curriculum-edit.component.scss']
})
export class CurriculumEditComponent extends BaseEditComponent implements OnDestroy, OnDestroy {
  loading: boolean = false;
  override entityTable = "HU_EMPLOYEE_CV_EDIT_ADDITIONAL";
  captionCode!: EnumTranslateKey;
  subsctiptions: Subscription[] = [];
  crud!: ICorePageEditCRUD;
  apiParams: string[] = ['NATION', 'NATIONALITY', 'FAMILY_STATUS', 'RELIGION'];
  alertOptions: IAlertOptions = {
    autoClose: false,
    keepAfterRouteChange: true
  };
  nationalityOptions$ = new BehaviorSubject<ICoreDropdownOption[]>([]);
  nationalityGetByIdObject$ = new BehaviorSubject<any>(null);
  nationalityGetByIdApi = api.SYS_OTHERLIST_READ;

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
              readonly: true,
              type: 'number',
              hidden: true
            },

            {
              flexSize: 12,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_COMMON_ID,
              field: 'isSaveCv',
              value: null,
              controlType: EnumFormBaseContolType.TEXTBOX,
              readonly: true,
              type: 'bool',
              hidden: true
            },
          ],
          [
            {
              flexSize: 3,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_USER_BIRTH_RELIGION,
              field: 'religionId',
              value: '',
              controlType: EnumFormBaseContolType.DROPDOWN,
              getByIdObject$: this.religionGetById$,
              getByIdApi: this.religionGetByIdApi,
              shownFrom: 'name',
              dropdownOptions$: this.religionOptions$,
              type: 'number'
            },
            {
              flexSize: 3,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_USER_NATIVE,
              field: 'nativeId',
              value: '',
              controlType: EnumFormBaseContolType.DROPDOWN,
              getByIdObject$: this.nationalityGetByIdObject$,
              getByIdApi: this.nationalityGetByIdApi,
              shownFrom: 'name',
              dropdownOptions$: this.nationOptions$,
              type: 'number'
            },
            {
              flexSize: 3,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_USER_MARITAL_STATUS,
              field: 'maritalStatusId',
              getByIdObject$: this.maritalStatusGetById$,
              getByIdApi: this.maritalStatusGetByIdApi,
              boundFrom: 'id',
              type: 'number',
              shownFrom: 'name',
              dropdownOptions$: this.maritalStatusOptions$,
              value: '',
              controlType: EnumFormBaseContolType.DROPDOWN,

            },
          ],
          [
            {
              flexSize: 3,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_USER_IDENTITY_NUMBER,
              field: 'idNo',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              type: 'string',
            },
            {
              flexSize: 3,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_USER_IDENTITY_NUMBER_DATE,
              field: 'idDate',
              value: '',
              controlType: EnumFormBaseContolType.DATEPICKER,
              type: 'date',
            },
            // {
            //   flexSize: 3,
            //   label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_USER_IDENTITY_NUMBER_EXPIRE_DATE,
            //   field: 'idExpireDate',
            //   value: '',
            //   controlType: EnumFormBaseContolType.DATEPICKER,
            //   type: 'date',
            // },
            {
              flexSize: 6,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_USER_IDENTITY_NUMBER_ADDRESS,
              controlType: EnumFormBaseContolType.DROPDOWN,
              field: 'identityAddress',
              getByIdObject$: this.identityAddressOptions$,
              getByIdApi: this.identityAddressGetByIdApi,
              boundFrom: 'id',
              shownFrom: 'nameVn',
              dropdownOptions$: this.identityAddressOptions$,
              type: 'number',
              value: '',
            },
          ],
          [
            {
              flexSize: 12,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_USER_NOTE,
              field: 'note',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              type: 'string',
            },
          ],
          [
            {
              flexSize: 12,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_COMMON_ID,
              field: 'employeeId',
              value: this.authService.data$.value?.employeeId!,
              controlType: EnumFormBaseContolType.TEXTBOX,
              type: 'number',
              hidden: true
            },
          ]
          // [
          //   {
          //     flexSize: 12,
          //     label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_USER_BIRTH_ADDRESS,
          //     field: 'birthPlace',
          //     value: '',
          //     controlType: EnumFormBaseContolType.TEXTBOX,
          //     type: 'string',
          //   },
          // ],
          // [
          //   {
          //     flexSize: 12,
          //     label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_USER_NATIONALITY,
          //     field: 'nationalityId',
          //     value: '',
          //     controlType: EnumFormBaseContolType.DROPDOWN,
          //     getByIdObject$: this.nationalityGetByIdObject$,
          //     getByIdApi: this.nationalityGetByIdApi,
          //     shownFrom: 'name',
          //     dropdownOptions$: this.nationalityOptions$,
          //     type: 'number'
          //   },
          // ],
          // [
          //   {
          //     flexSize: 6,
          //     label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_USER_BIRTH_RELIGION,
          //     field: 'religionId',
          //     value: '',
          //     controlType: EnumFormBaseContolType.DROPDOWN,
          //     getByIdObject$: this.religionGetById$,
          //     getByIdApi: this.religionGetByIdApi,
          //     shownFrom: 'name',
          //     dropdownOptions$: this.religionOptions$,
          //     type: 'number'
          //   },
          //   {
          //     flexSize: 6,
          //     label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_USER_MARITAL_STATUS,
          //     field: 'maritalStatusId',
          //     getByIdObject$: this.maritalStatusGetById$,
          //     getByIdApi: this.maritalStatusGetByIdApi,
          //     boundFrom: 'id',
          //     type : 'number',
          //     shownFrom: 'name',
          //     dropdownOptions$: this.maritalStatusOptions$,
          //     value: '',
          //     controlType: EnumFormBaseContolType.DROPDOWN,

          //   },
          // ],

          // [
          //   {
          //     flexSize: 6,
          //     label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_USER_IDENTITY_NUMBER_DATE,
          //     field: 'identityNumberDate',
          //     value: '',
          //     controlType: EnumFormBaseContolType.DATEPICKER,
          //     type: 'date',
          //   },
          //   {
          //     flexSize: 9,
          //     label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_USER_IDENTITY_NUMBER_ADDRESS,
          //     field: 'identityNumberAddress',
          //     value: '',
          //     controlType: EnumFormBaseContolType.DROPDOWN,
          //     getByIdObject$: this.identityAddressGetById$,
          //     getByIdApi: this.identityAddressGetByIdApi,
          //     boundFrom: 'id',
          //     shownFrom: 'name',
          //     dropdownOptions$: this.identityAddressOptions$,
          //     type: 'number',

          //   },

          // ],
          // [
          //   {
          //     flexSize: 4,
          //     label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_USER_TAX_CODE,
          //     field: 'taxCode',
          //     value: '',
          //     controlType: EnumFormBaseContolType.TEXTBOX,
          //   },
          //   {
          //     flexSize: 4,
          //     label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_USER_TAX_CODE_DATE,
          //     field: 'taxCodeDate',
          //     value: '',
          //     controlType: EnumFormBaseContolType.DATEPICKER,
          //   },
          //   {
          //     flexSize: 4,
          //     label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_USER_TAX_CODE_ADDRESS,
          //     field: 'taxCodeAddress',
          //     value: '',
          //     controlType: EnumFormBaseContolType.DROPDOWN,
          //     getByIdObject$: this.taxCodeAddressGetById$,
          //     getByIdApi: this.taxCodeAddressGetByIdApi,
          //     boundFrom: 'id',
          //     shownFrom: 'name',
          //     dropdownOptions$: this.taxCodeAddressOptions$,
          //     type: 'number',
          //   },
          // ],
        ]
      },
    ];
  showCaptionButton: boolean = true;
  isSendPortal!: boolean;
  isApprovedPortal!: boolean;;



  constructor(
    public override dialogService: DialogService,
    private appService: AppService,
    private curriculumService: CurriculumService,
    private authService: AuthService,
    private alertService: AlertService,
    public mls: MultiLanguageService,
    public urlService: UrlService,
  ) {

    super(dialogService);

    this.captionCode = EnumTranslateKey.UI_COMPONENT_TITLE_SALARY_LEVEL_EDIT;

    this.crud = {
      c: api.HU_CURRICULUM_CREATE_AS_UPDATE,
      r: api.HU_SALARY_LEVEL_UPDATE,
      u: api.HU_CURRICULUM_CREATE_AS_UPDATE,
      s: api.HU_EMPLOYEE_CV_EDIT_CV_SAVE
    };


  }

  ngOnInit(): void {


    this.urlService.previousRouteUrl$.next('/profile/staff-profile/curriculum');
    // this.getAllValueDropdown()\
    this.subsctiptions.push(
      this.curriculumService
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
            }
          }
        })
    )
    this.subsctiptions.push(
      this.appService
        .get(api.SYS_OTHERLIST_GETOTHERLISTBYTYPE + `NATION`)
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
              this.nationOptions$.next(options);
            }
          }
        })
    )
    this.subsctiptions.push(
      this.appService
        .get(api.SYS_OTHERLIST_GETOTHERLISTBYTYPE + `NATIONALITY`)
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
    this.subsctiptions.push(
      this.appService
        .get(api.SYS_OTHERLIST_GETOTHERLISTBYTYPE + `FAMILY_STATUS`)
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
              this.maritalStatusOptions$.next(options);
            }
          }
        })
    )
    this.subsctiptions.push(
      this.appService
        .get(api.SYS_OTHERLIST_GETOTHERLISTBYTYPE + `RELIGION`)
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
              this.religionOptions$.next(options);
            }
          }
        })
    )

  }

  /* GET FormGroup Instance */
  onFormCreated(e: FormGroup): void {
    this.form = e;
    console.log(this.form);
    console.log(this.authService.data$.value?.employeeId)
    if (this.curriculumService.curriculumId != 0) {
      this.subsctiptions.push(
        this.appService.get(api.HU_EMPLOYEE_GET_CURRICULUM_SAVE_BY_ID + `?id=${this.curriculumService.curriculumId}`).subscribe(x => {
          if (x.body.statusCode == 200 && x.ok == true) {
            let body = x.body.innerBody
            // this.isSendPortal = body.isSendPortal;
            // this.isApprovedPortal = body.isApprovedPortal;
            this.form.patchValue(body);
          }
        })
      )
    } else {
      this.subsctiptions.push(
        this.appService.get(api.HU_EMPLOYEE_GET_CURRICULUM_BY_ID + `?id=${this.authService.data$.value?.employeeId}`).subscribe(x => {
          if (x.body.statusCode == 200 && x.ok == true) {
            let body = x.body.innerBody
            // this.isSendPortal = body.isSendPortal;
            // this.isApprovedPortal = body.isApprovedPortal;
            this.form.patchValue(body);
          }
        })
      )
    }

  }

  /* To allow form to be deactivated */
  onFormReinit(e: string): void {
    this.formInitStringValue = e;
  }

  ngOnDestroy(): void {
    this.subsctiptions.map(x => x?.unsubscribe());
    this.curriculumService.aprrovingEditId = 0;
    this.curriculumService.curriculumId = 0;
    this.urlService.currentRouteUrl$.next('/profile/staff-profile/curriculum')
  }
  submit(e: any) {
    console.log(e)
  }
  // getAllValueDropdown() {
  //   forkJoin(this.apiParams.map(param => this.appService.get(api.SYS_OTHERLIST_GETOTHERLISTBYTYPE + param)))
  //     .subscribe(responses => {
  //       responses.forEach((item, index) => {
  //         if (item.body.statusCode == 200 && item.ok == true) {
  //           const options: { value: number | null; text: string; }[] = [];
  //           item.body.innerBody.map((g: any) => {
  //             options.push({
  //               value: g.id,
  //               text: g.name
  //             });
  //           });
  //           const param = this.apiParams[index];
  //           switch (param) {
  //             case 'NATION':
  //               this.nationOptions$.next(options);
  //               break;
  //             case 'NATIONALITY':
  //               this.nationalityOptions$.next(options);
  //               break;
  //             case 'FAMILY_STATUS':
  //               this.maritalStatusOptions$.next(options);
  //               break;
  //             case 'RELIGION':
  //               this.religionOptions$.next(options);
  //               break;
  //             default:
  //               break;
  //           }
  //         }

  //       });
  //     });
  // }


}
