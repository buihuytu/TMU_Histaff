import { Component, OnInit, OnDestroy  } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { api, EnumTranslateKey } from 'alpha-global-constants';
import { BaseEditComponent, ICorePageEditCRUD, ICoreDropdownOption, ICoreFormSection, EnumFormBaseContolType, DialogService, AppService, AuthService, UrlService, IFormatedResponse } from 'ngx-histaff-alpha';
import { BehaviorSubject, Subscription } from 'rxjs';
import { ContactService } from '../contact.service';

@Component({
  selector: 'app-contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrls: ['./contact-edit.component.scss']
})
export class ContactEditComponent extends BaseEditComponent implements OnInit, OnDestroy {
  override entityTable = 'PORTAL_CONTACT_INFO';
  crud!: ICorePageEditCRUD;
  subcriptions: Subscription[] = [];
  provinceIdGetByIdObject$ = new BehaviorSubject<any>(null);
  provinceIdGetByIdApi = api.HU_FAMILY_PROVINCE_READ;
  provinceIdOptions$ = new BehaviorSubject<ICoreDropdownOption[]>([]);

  districtIdGetByIdObject$ = new BehaviorSubject<any>(null);
  districtIdGetByIdApi = api.HU_FAMILY_DISTRICT_READ;
  districtIdOptions$ = new BehaviorSubject<ICoreDropdownOption[]>([]);

  wardIdGetByIdObject$ = new BehaviorSubject<any>(null);
  wardIdGetByIdApi = api.HU_FAMILY_WARD_READ;
  wardIdOptions$ = new BehaviorSubject<ICoreDropdownOption[]>([]);

  curProvinceIdGetByIdObject$ = new BehaviorSubject<any>(null);
  curProvinceIdGetByIdApi = api.HU_FAMILY_PROVINCE_READ;
  curProvinceIdOptions$ = new BehaviorSubject<ICoreDropdownOption[]>([]);

  curDistrictIdGetByIdObject$ = new BehaviorSubject<any>(null);
  curDistrictIdGetByIdApi = api.HU_FAMILY_DISTRICT_READ;
  curDistrictIdOptions$ = new BehaviorSubject<ICoreDropdownOption[]>([]);

  curWardIdGetByIdObject$ = new BehaviorSubject<any>(null);
  curWardIdGetByIdApi = api.HU_FAMILY_WARD_READ;
  curWardIdOptions$ = new BehaviorSubject<ICoreDropdownOption[]>([]);

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
            hidden: true,
            type: 'number'
          },
        ],
        [
          {
            flexSize: 4,
            label: EnumTranslateKey.UI_ENTITY_FIELD_HU_EMPLOYEE_CV_EDIT_EMAIL,
            field: 'email',
            value: '',
            controlType: EnumFormBaseContolType.TEXTBOX,
            type: 'string'
          },
          {
            flexSize: 4,
            label: EnumTranslateKey.UI_ENTITY_FIELD_HU_EMPLOYEE_CV_EDIT_MOBILE_PHONE_LAND,
            field: 'mobilePhoneLand',
            value: '',
            controlType: EnumFormBaseContolType.TEXTBOX,
            type: 'string'
          },
          {
            flexSize: 4,
            label: EnumTranslateKey.UI_ENTITY_FIELD_HU_EMPLOYEE_CV_EDIT_MOBILE_PHONE,
            field: 'mobilePhone',
            value: '',
            controlType: EnumFormBaseContolType.TEXTBOX,
            type: 'string'
          },
        ],
        [
          {
            flexSize: 3,
            label: EnumTranslateKey.UI_ENTITY_FIELD_HU_EMPLOYEE_CV_EDIT_PROVINCE,
            field: 'provinceId',
            value: '',
            controlType: EnumFormBaseContolType.DROPDOWN,
            getByIdObject$: this.provinceIdGetByIdObject$,
            getByIdApi: this.provinceIdGetByIdApi,
            shownFrom: 'name',
            dropdownOptions$: this.provinceIdOptions$,
            type: 'number'
          },
          {
            flexSize: 3,
            label: EnumTranslateKey.UI_ENTITY_FIELD_HU_EMPLOYEE_CV_EDIT_DISTRICT,
            field: 'districtId',
            value: '',
            controlType: EnumFormBaseContolType.DROPDOWN,
            getByIdObject$: this.districtIdGetByIdObject$,
            getByIdApi: this.districtIdGetByIdApi,
            shownFrom: 'name',
            dropdownOptions$: this.districtIdOptions$,
            type: 'number'
          },
          {
            flexSize: 3,
            label: EnumTranslateKey.UI_ENTITY_FIELD_HU_EMPLOYEE_CV_EDIT_WARD,
            field: 'wardId',
            value: '',
            controlType: EnumFormBaseContolType.DROPDOWN,
            getByIdObject$: this.wardIdGetByIdObject$,
            getByIdApi: this.wardIdGetByIdApi,
            shownFrom: 'name',
            dropdownOptions$: this.wardIdOptions$,
            type: 'number'
          }, {
            flexSize: 3,
            label: EnumTranslateKey.UI_ENTITY_FIELD_HU_EMPLOYEE_CV_EDIT_ADDRESS,
            field: 'address',
            value: '',
            controlType: EnumFormBaseContolType.TEXTBOX,
            type: 'string'
          },
        ],
        [
          {
            flexSize: 3,
            label: EnumTranslateKey.UI_ENTITY_FIELD_HU_EMPLOYEE_CV_EDIT_CUR_PROVINCE,
            field: 'curProvinceId',
            value: '',
            controlType: EnumFormBaseContolType.DROPDOWN,
            getByIdObject$: this.curProvinceIdGetByIdObject$,
            getByIdApi: this.curProvinceIdGetByIdApi,
            shownFrom: 'name',
            dropdownOptions$: this.curProvinceIdOptions$,
            type: 'number'
          },
          {
            flexSize: 3,
            label: EnumTranslateKey.UI_ENTITY_FIELD_HU_EMPLOYEE_CV_EDIT_CUR_DISTRICT,
            field: 'curDistrictId',
            value: '',
            controlType: EnumFormBaseContolType.DROPDOWN,
            getByIdObject$: this.curDistrictIdGetByIdObject$,
            getByIdApi: this.curDistrictIdGetByIdApi,
            shownFrom: 'name',
            dropdownOptions$: this.curDistrictIdOptions$,
            type: 'number'
          },
          {
            flexSize: 3,
            label: EnumTranslateKey.UI_ENTITY_FIELD_HU_EMPLOYEE_CV_EDIT_CUR_WARD,
            field: 'curWardId',
            value: '',
            controlType: EnumFormBaseContolType.DROPDOWN,
            getByIdObject$: this.curWardIdGetByIdObject$,
            getByIdApi: this.curWardIdGetByIdApi,
            shownFrom: 'name',
            dropdownOptions$: this.curWardIdOptions$,
            type: 'number'
          }, {
            flexSize: 3,
            label: EnumTranslateKey.UI_ENTITY_FIELD_HU_EMPLOYEE_CV_EDIT_CUR_ADDRESS,
            field: 'curAddress',
            value: '',
            controlType: EnumFormBaseContolType.TEXTBOX,
            type: 'string'
          },
        ],
        [
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
            field: 'isSaveContact',
            value: null,
            controlType: EnumFormBaseContolType.TEXTBOX,
            type: 'bool',
            hidden: true
          },
        ]
      ]
    }
  ]

  constructor(public override dialogService: DialogService,
    private appService: AppService,
    private authService: AuthService,
    private contactService: ContactService,
    private urlService: UrlService) {
    super(dialogService)
    this.crud = {
      c: api.HU_EMPLOYEE_CV_EDIT_INSERT_CONTACT_INFO,
      r: api.HU_EMPLOYEE_CV_READ,
      u: api.HU_EMPLOYEE_CV_EDIT_INSERT_CONTACT_INFO,
      s: api.HU_EMPLOYEE_CV_EDIT_CONTACT_INFO_SAVE

    }
  }
  ngOnInit(): void {
    this.urlService.previousRouteUrl$.next('/profile/staff-profile/contact')
    this.subcriptions.push(
      this.appService.get(api.HU_FAMILY_PROVINCE_LIST)
        .subscribe((x: any) => {
          if (x.ok && x.status === 200) {
            const body: IFormatedResponse = x.body;
            if (body.statusCode === 200) {
              const opstions: ICoreDropdownOption[] = [];
              body.innerBody.map((y: any) => {
                opstions.push({
                  value: y.id,
                  text: y.name,

                })
              });
              this.provinceIdOptions$.next(opstions);
              this.curProvinceIdOptions$.next(opstions)
            }
          }
        })
    )

  }
  onFormCreated(e: FormGroup) {
    this.form = e;

    if (this.contactService.contactId != 0) {
      this.subcriptions.push(
        this.appService.get(api.HU_EMPLOYEE_CV_EDIT_CONTACT_INFO_GET_SAVE_BY_ID + `?id=${this.contactService.contactId}`)
          .subscribe(x => {
            if (x.ok && x.status === 200) {
              const body: IFormatedResponse = x.body;
              this.form.patchValue(body.innerBody)
              console.log(this.form);

            }
          })
      )
    } else {
      this.subcriptions.push(
        this.appService.get(api.HU_EMPLOYEE_GET_CONTACT_BY_EMPLOYEE_ID + `?employeeId=${this.authService.data$.value?.employeeId}`)
          .subscribe(x => {
            if (x.ok && x.status === 200) {
              const body: IFormatedResponse = x.body;
              this.form.patchValue(body.innerBody)
              console.log(this.form);

            }
          })
      )
    }



    this.form.get('provinceId')?.valueChanges.subscribe(x => {
      if (!!x) {
        this.appService.get(api.HU_FAMILY_DISTRICT_LIST + x)
          .subscribe((x: any) => {
            if (x.ok && x.status === 200) {
              const body: IFormatedResponse = x.body;
              if (body.statusCode === 200) {
                const options: ICoreDropdownOption[] = [];
                body.innerBody.map((y: any) => {
                  options.push({
                    value: y.id,
                    text: y.name
                  })
                })
                this.districtIdOptions$.next(options)
              }
            }
          })
      }
    })!
    this.form.get('curProvinceId')?.valueChanges.subscribe(x => {
      if (!!x) {
        this.appService.get(api.HU_FAMILY_DISTRICT_LIST + x)
          .subscribe((x: any) => {
            if (x.ok && x.status === 200) {
              const body: IFormatedResponse = x.body;
              if (body.statusCode === 200) {
                const options: ICoreDropdownOption[] = [];
                body.innerBody.map((y: any) => {
                  options.push({
                    value: y.id,
                    text: y.name
                  })
                })
                this.curDistrictIdOptions$.next(options)
              }
            }
          })
      }
    })!
    this.form.get('districtId')?.valueChanges.subscribe(x => {
      if (!!x) {
        this.appService.get(api.HU_FAMILY_WARD_LIST + x)
          .subscribe((x: any) => {
            if (x.ok && x.status === 200) {
              const body: IFormatedResponse = x.body;
              if (body.statusCode === 200) {
                const options: ICoreDropdownOption[] = [];
                body.innerBody.map((y: any) => {
                  options.push({
                    value: y.id,
                    text: y.name
                  })
                })
                this.wardIdOptions$.next(options)
              }
            }
          })
      }
    })!
    this.form.get('curDistrictId')?.valueChanges.subscribe(x => {
      if (!!x) {
        this.appService.get(api.HU_FAMILY_WARD_LIST + x)
          .subscribe((x: any) => {
            if (x.ok && x.status === 200) {
              const body: IFormatedResponse = x.body;
              if (body.statusCode === 200) {
                const options: ICoreDropdownOption[] = [];
                body.innerBody.map((y: any) => {
                  options.push({
                    value: y.id,
                    text: y.name
                  })
                })
                this.curWardIdOptions$.next(options)
              }
            }
          })
      }
    })!
  }
  onFormReinit(e: string): void {
    this.formInitStringValue = e
  }
  // ngAfterViewInit(): void {
  //   this.contactService.transportData$.subscribe((x: any) => {
  //     this.form.get("id")?.setValue(x.id);
  //     this.form.get("email")?.setValue(x.email);
  //     this.form.get("mobilePhoneLand")?.setValue(x.mobilePhoneLand);
  //     this.form.get("mobilePhone")?.setValue(x.mobilePhone);
  //     this.form.get("provinceId")?.setValue(x.provinceId);
  //     this.form.get("districtId")?.setValue(x.districtId);
  //     this.form.get("wardId")?.setValue(x.wardId);
  //     this.form.get("address")?.setValue(x.address);
  //     this.form.get("curProvinceId")?.setValue(x.curProvinceId);
  //     this.form.get("curDistrictId")?.setValue(x.curDistrictId);
  //     this.form.get("curWardId")?.setValue(x.curWardId);
  //     this.form.get("curAddress")?.setValue(x.curAddress);
  //     this.form.get("employeeId")?.setValue(x.employeeId);
  //     this.form.get("isSaveContact")?.setValue(x.isSaveContact);
  //   });
  // }
  ngOnDestroy(): void {
    this.contactService.contactId = 0;
    this.urlService.currentRouteUrl$.next('/profile/staff-profile/contact')
  } 
}
