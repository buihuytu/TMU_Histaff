import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, Subscription, distinctUntilChanged } from 'rxjs';

import { HuFamilyEditService } from '../hufamily-edit.service';
import { AppService, AuthService, BaseEditComponent, DialogService, EnumFormBaseContolType, IAuthData, ICoreDropdownOption, ICoreFormSection, ICorePageEditCRUD, IFormatedResponse } from 'ngx-histaff-alpha';
import { api, EnumTranslateKey } from 'alpha-global-constants';

@Component({
  selector: 'app-hufamily-edit-detail',
  templateUrl: './hufamily-edit-detail.component.html',
  styleUrls: ['./hufamily-edit-detail.component.scss']
})
export class HufamilyEditDetailComponent extends BaseEditComponent {
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

  statusOptions$ = new BehaviorSubject<ICoreDropdownOption[]>([]);
  statusGetByIdObject$ = new BehaviorSubject<any>(null);
  statusGetByIdApi = api.SYS_OTHERLIST_READ;
  override entityTable = 'HU_FAMAILY_EDIT';
  crud!: ICorePageEditCRUD;
  captionCode: EnumTranslateKey = EnumTranslateKey.UI_COMPONENT_TITLE_APPROVE_FAMILY_EDIT;

  sections: ICoreFormSection[] =
    [
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
              disabled: true
              
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
              disabled: true
              
            },
            {
              flexSize: 3,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_FAMILY_GENDER,
              field: 'gender',
              value: '',
              controlType: EnumFormBaseContolType.DROPDOWN,
              getByIdObject$: this.genderGetByIdObject$,
              getByIdApi: this.genderGetByIdApi,
              shownFrom: 'name',
              dropdownOptions$: this.genderOptions$,
              type: 'number',
              disabled: true
            },
            {
              flexSize: 3,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_FAMILY_BIRTH_DATE,
              field: 'birthDate',
              value: null,
              controlType: EnumFormBaseContolType.DATEPICKER,
              type: 'date',
              disabled: true
            }
          ],
          [
            {
              flexSize: 3,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_FAMILY_PIT_CODE,
              field: 'pitCode',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              type: 'text',
              disabled: true
            },
            {
              flexSize: 3,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_FAMILY_SAME_COMPANY,
              field: 'sameCompany',
              value: '',
              controlType: EnumFormBaseContolType.CHECKBOX,
              type: 'boolean',
              disabled: true
            },
            {
              flexSize: 3,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_FAMILY_IS_DEAD,
              field: 'isDead',
              value: '',
              controlType: EnumFormBaseContolType.CHECKBOX,
              type: 'boolean',
              disabled: true
            },
            {
              flexSize: 3,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_FAMILY_IS_DEDUCT,
              field: 'isDeduct',
              value: '',
              controlType: EnumFormBaseContolType.CHECKBOX,
              type: 'boolean',
              disabled: true
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
              type: 'date',
              disabled: true
            },
            {
              flexSize: 3,
              hidden: false,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_FAMILY_DEDUCT_FROM,
              field: 'deductFrom',
              value: null,
              controlType: EnumFormBaseContolType.DATEPICKER,
              type: 'date',
              disabled: true
            },
            {
              flexSize: 3,
              hidden: false,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_FAMILY_DEDUCT_TO,
              field: 'deductTo',
              value: null,
              controlType: EnumFormBaseContolType.DATEPICKER,
              type: 'date',
              disabled: true
            },
            {
              flexSize: 3,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_FAMILY_IS_HOUSEHOLD,
              field: 'isHousehold',
              value: '',
              controlType: EnumFormBaseContolType.CHECKBOX,
              type: 'boolean',
              disabled: true
            }
          ],
          [
            {
              flexSize: 3,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_FAMILY_ID_NO,
              field: 'idNo',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              type: 'number',
              disabled: true
            },
            {
              flexSize: 3,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_FAMILY_CAREER,
              field: 'career',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              type: 'text',
              disabled: true
            },
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
              type: 'number',
              disabled: true
            }
          ],
          [
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
              disabled: true
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
              disabled: true
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
              disabled: true
            }
          ],
          [
            {
              flexSize: 3,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_FAMILY_NOTE,
              field: 'note',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              type: 'text',
              disabled: true
            },
            {
              flexSize: 4,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_FAMILY_STATUS,
              field: 'statusId',
              value: '',
              controlType: EnumFormBaseContolType.DROPDOWN,
              getByIdObject$: this.statusGetByIdObject$,
              getByIdApi: this.statusGetByIdApi,
              shownFrom: 'name',
              dropdownOptions$: this.statusOptions$,
              type: 'number'
            },
  
          ]
        ]
      }
    ]

  constructor(
    public override dialogService: DialogService,
    private authService: AuthService,
    private appService: AppService,
    private huFamilyEditServie: HuFamilyEditService){

    super(dialogService);
    this.crud = {
      c: api.SYS_OTHERLIST_CREATE,
      r: api.HU_FAMILY_EDIT_READ,
      u: api.HU_FAMILY_EDIT_UPDATE,
      d: api.SYS_OTHERLIST_DELETE_IDS,
    };
  }

  ngOnInit(): void {
    this.subscriptions.push(
      this.authService.data$.subscribe((x: IAuthData | null) => this.employeeId = x?.employeeId!),
      // this.appService.get(api.HU_FAMILY_EDIT_READ + `?id=${this.huFamilyEditServie.familyId}`)
      //   .subscribe(x => {
      //     const body: IFormatedResponse = x.body;
      //     if (x.ok && x.status === 200) {
      //       this.form.patchValue(body.innerBody)
      //     }
      //   }),
      this.appService
        .get(api.SYS_OTHERLIST_GETOTHERLISTBYTYPE + "RELATION")
        .subscribe((res: any) => {
          if (!!res.ok && res.status === 200) {
            const body: IFormatedResponse = res.body
            if (body.statusCode === 200 && !!body.innerBody) {
              const options: { value: number | null; text: string; }[] = [];
              options.push({
                value: Number(),
                text: ''
              })
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
              options.push({
                value: Number(),
                text: ''
              })
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
              options.push({
                value: Number(),
                text: ''
              })
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
      this.appService
        .get(api.HU_FAMILY_PROVINCE_LIST)
        .subscribe((res: any) => {
          if (!!res.ok && res.status === 200) {
            const body: IFormatedResponse = res.body
            if (body.statusCode === 200 && !!body.innerBody) {
              const options: { value: number | null; text: string; }[] = [];
              options.push({
                value: Number(),
                text: ''
              })
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

    this.subscriptions.push(
      this.appService.get(api.HU_FAMAILY_EDIT_GET_STATUS_APPROVE)
      .subscribe((res: any) =>{
        if(res.ok && res.status === 200){
          const options: {value: number; text: string}[] = [];
          res.body.innerBody.map((o: any) =>{
            options.push({
              value: o.id,
              text: o.name
            })
          })
          this.statusOptions$.next(options)
        }
      })
    )
  }

  onFormCreated(e: FormGroup): void {
    this.form = e;
    this.subscriptions.push( // <== Outer push
      this.form.get('birthCerProvince')?.valueChanges.pipe(distinctUntilChanged()).subscribe(x => {
        if (!!x) {
          this.subscriptions.push( // <== Inner push
            this.appService
              .get(api.HU_FAMILY_DISTRICT_LIST + x)
              .subscribe((res: any) => {
                if (!!res.ok && res.status === 200) {
                  const body: IFormatedResponse = res.body
                  if (body.statusCode === 200 && !!body.innerBody) {
                    const options: { value: number | null; text: string }[] = [];
                    options.push({
                      value: null,
                      text: '',
                    })
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
          this.subscriptions.push( // <== Inner push
            this.appService
              .get(api.HU_FAMILY_WARD_LIST + x)
              .subscribe((res: any) => {
                if (!!res.ok && res.status === 200) {
                  const body: IFormatedResponse = res.body
                  if (body.statusCode === 200 && !!body.innerBody) {
                    const options: { value: number | null; text: string }[] = [];
                    options.push({
                      value: null,
                      text: '',
                    })
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
  }


  onFormReinit(e: string): void {
    this.formInitStringValue = e;
  }

}
