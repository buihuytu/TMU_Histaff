import { Component } from "@angular/core";
import { Validators, FormGroup, AbstractControl } from "@angular/forms";
import { api, EnumTranslateKey } from 'alpha-global-constants';
import { BaseEditComponent, ICoreDropdownOption, ICorePageEditColumnComposition, ICorePageEditCRUD, ICoreFormSection, EnumFormBaseContolType, EnumCoreFormControlSeekerSourceType, DialogService, CoreFormService, AppService, IFormatedResponse, CustomValidators } from "ngx-histaff-alpha";
import { Subscription, BehaviorSubject, distinctUntilChanged } from "rxjs";
import { FamilyEditService } from "./family-edit.service";

@Component({
  selector: 'app-family-edit',
  templateUrl: './family-edit.component.html',
  styleUrls: ['./family-edit.component.scss'],
})
export class FamilyEditComponent extends BaseEditComponent {
  /* Properties to be passed into core-page-edit */

  override entityTable = 'HU_FAMILY';

  loading: boolean = false;
  subscriptions: Subscription[] = [];

  employeeGetByIdObject$ = new BehaviorSubject<any>(null);
  employeeGetByIdApi = api.HU_EMPLOYEE_READ;

  relationshipOptions$ = new BehaviorSubject<ICoreDropdownOption[]>([]);
  relationshipGetByIdObject$ = new BehaviorSubject<any>(null);
  relationshipGetByIdApi = api.SYS_OTHERLIST_READ;

  nationalityOptions$ = new BehaviorSubject<ICoreDropdownOption[]>([]);
  nationalityGetByIdObject$ = new BehaviorSubject<any>(null);
  nationalityGetByIdApi = api.HU_NATION_READ;

  genderOptions$ = new BehaviorSubject<ICoreDropdownOption[]>([]);
  genderGetByIdObject$ = new BehaviorSubject<any>(null);
  genderGetByIdApi = api.HU_FAMILY_GET_GENDER;

  provinceOptions$ = new BehaviorSubject<ICoreDropdownOption[]>([]);
  provinceGetByIdObject$ = new BehaviorSubject<any>(null);
  provinceGetByIdApi = api.HU_FAMILY_PROVINCE_READ;

  districtOptions$ = new BehaviorSubject<ICoreDropdownOption[]>([]);
  districtGetByIdObject$ = new BehaviorSubject<any>(null);
  districtGetByIdApi = api.HU_FAMILY_DISTRICT_READ;

  wardOptions$ = new BehaviorSubject<ICoreDropdownOption[]>([]);
  wardGetByIdObject$ = new BehaviorSubject<any>(null);
  wardGetByIdApi = api.HU_FAMILY_WARD_READ;

  captionCode!: EnumTranslateKey;
  formComposition!: ICorePageEditColumnComposition[][];
  crud!: ICorePageEditCRUD;
  sections: ICoreFormSection[] = [
    {
      rows: [
        [
          {
            flexSize: 0,
            label:
              EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_DISCIPLINE_DISCIPLINE_ID,
            field: 'id',
            value: 0,
            controlType: EnumFormBaseContolType.TEXTBOX,
            readonly: true,
            hidden: true,
            type: 'number',
          },
          {
            flexSize: 0,
            label:
              EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_DISCIPLINE_DISCIPLINE_ID,
            field: 'statusId',
            value: 0,
            controlType: EnumFormBaseContolType.TEXTBOX,
            readonly: true,
            hidden: true,
            type: 'number',
          },
          {
            flexSize: 3,
            label:
              EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_FAMILY_EMPLOYEE_CODE,
            field: 'employeeId',
            value: null,
            controlType: EnumFormBaseContolType.SEEKER,
            /* 
                START: WHEN USING controlType === EnumFormBaseContolType.SEEKER
                we must pass the three properties bellow:
               */
            seekerSourceType: EnumCoreFormControlSeekerSourceType.EMPLOYEE_SEEK,
            getByIdObject$: this.employeeGetByIdObject$,
            getByIdApi: this.employeeGetByIdApi,
            boundFrom: 'id',
            shownFrom: 'code',
            alsoBindTo: [
              { takeFrom: 'positionName', bindTo: 'positionName' },
              { takeFrom: 'fullname', bindTo: 'employeeName' },
              { takeFrom: 'orgName', bindTo: 'orgName' },
            ],
            /* END: WHEN USING controlType === EnumFormBaseContolType.SEEKER */
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
                errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
              },
            ],
          },
          {
            flexSize: 3,
            label:
              EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_FAMILY_EMPLOYEE_NAME,
            field: 'employeeName',
            value: '',
            controlType: EnumFormBaseContolType.TEXTBOX,
            type: 'text',
            disabled: true,
          },
          {
            flexSize: 3,
            label:
              EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_FAMILY_POSITION_NAME,
            field: 'positionName',
            value: '',
            controlType: EnumFormBaseContolType.TEXTBOX,
            type: 'text',
            disabled: true,
          },
          {
            flexSize: 3,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_FAMILY_ORG_NAME,
            field: 'orgName',
            value: '',
            controlType: EnumFormBaseContolType.TEXTBOX,
            type: 'text',
            disabled: true,
          },
        ],
      ],
    },
    {
      rows: [
        [
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
              },
            ],
          },
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
              },
            ],
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
              },
            ],
          },
        ],
      ],
    },
    {
      rows: [
        [
          {
            flexSize: 3,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_FAMILY_PIT_CODE,
            field: 'pitCode',
            value: '',
            controlType: EnumFormBaseContolType.TEXTBOX,
            type: 'text',
          },
          {
            flexSize: 3,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_FAMILY_SAME_COMPANY,
            field: 'sameCompany',
            value: '',
            controlType: EnumFormBaseContolType.CHECKBOX,
            type: 'boolean',
          },
          {
            flexSize: 3,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_FAMILY_IS_DEAD,
            field: 'isDead',
            value: '',
            controlType: EnumFormBaseContolType.CHECKBOX,
            type: 'boolean',
          },
          {
            flexSize: 3,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_FAMILY_IS_DEDUCT,
            field: 'isDeduct',
            value: '',
            controlType: EnumFormBaseContolType.CHECKBOX,
            type: 'boolean',
          },
        ],
      ],
    },
    {
      rows: [
        [
          {
            flexSize: 3,
            hidden: false,
            label:
              EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_FAMILY_REGIST_DEDUCT_DATE,
            field: 'registDeductDate',
            value: new Date(),
            controlType: EnumFormBaseContolType.DATEPICKER,
            type: 'date',
            validators: [
              {
                name: 'required',
                validator: Validators.required,
                errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
              }
            ]
          },
          {
            // ngày bắt đầu giảm trừ
            flexSize: 3,
            hidden: false,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_FAMILY_DEDUCT_FROM,
            field: 'deductFrom',
            value: new Date(),
            controlType: EnumFormBaseContolType.DATEPICKER,
            type: 'date',
            validators: [
              {
                name: 'required',
                validator: Validators.required,
                errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
              },
              {
                name: 'deductFrom',
                validator: FamilyEditComponent.deductFrom,
                errorMessage: EnumTranslateKey.UI_FORM_CONTROL_DEDUCT_FROM_GREAT_THAN_DEDUCT_TO,
              },
            ]
          },
          {
            // ngày kết thúc giảm trừ
            flexSize: 3,
            hidden: false,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_FAMILY_DEDUCT_TO,
            field: 'deductTo',
            value: '',
            controlType: EnumFormBaseContolType.DATEPICKER,
            type: 'date',
            validators: [
              {
                name: 'deductTo',
                validator: FamilyEditComponent.deductTo,
                errorMessage: EnumTranslateKey.UI_FORM_CONTROL_DEDUCT_TO_GREAT_THAN_DEDUCT_FROM,
              },
            ]
          },
          // Tiến BA bảo là bỏ trường là chủ hộ
          // {
          //   flexSize: 3,
          //   label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_FAMILY_IS_HOUSEHOLD,
          //   field: 'isHousehold',
          //   value: '',
          //   controlType: EnumFormBaseContolType.CHECKBOX,
          //   type: 'boolean',
          // },
        ],
      ],
    },
    {
      rows: [
        [
          {
            flexSize: 3,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_FAMILY_ID_NO,
            field: 'idNo',
            value: '',
            controlType: EnumFormBaseContolType.TEXTBOX,
            type: 'number',
          },
          {
            flexSize: 3,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_FAMILY_CAREER,
            field: 'career',
            value: '',
            controlType: EnumFormBaseContolType.TEXTBOX,
            type: 'text',
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
          },
        ],
      ],
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_FAMILY_BIRTH_CER_PLACE,
      rows: [
        [
          {
            flexSize: 3,
            label:
              EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_FAMILY_BIRTH_CER_PLACE,
            field: 'birthCerPlace',
            value: '',
            controlType: EnumFormBaseContolType.TEXTBOX,
            type: 'text',
          },
          {
            flexSize: 3,
            label:
              EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_FAMILY_BIRTH_CER_PROVINCE,
            field: 'birthCerProvince',
            value: '',
            controlType: EnumFormBaseContolType.DROPDOWN,
            getByIdObject$: this.provinceGetByIdObject$,
            getByIdApi: this.provinceGetByIdApi,
            shownFrom: 'name',
            dropdownOptions$: this.provinceOptions$,
            type: 'number',
          },
          {
            flexSize: 3,
            label:
              EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_FAMILY_BIRTH_CER_DISTRICT,
            field: 'birthCerDistrict',
            value: '',
            controlType: EnumFormBaseContolType.DROPDOWN,
            getByIdObject$: this.districtGetByIdObject$,
            getByIdApi: this.districtGetByIdApi,
            shownFrom: 'name',
            dropdownOptions$: this.districtOptions$,
            type: 'number',
          },
          {
            flexSize: 3,
            label:
              EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_FAMILY_BIRTH_CER_WARD,
            field: 'birthCerWard',
            value: '',
            controlType: EnumFormBaseContolType.DROPDOWN,
            getByIdObject$: this.wardGetByIdObject$,
            getByIdApi: this.wardGetByIdApi,
            shownFrom: 'name',
            dropdownOptions$: this.wardOptions$,
            type: 'number',
          },
        ],
      ],
    },
    {
      rows: [
        [
          {
            flexSize: 3,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_FAMILY_NOTE,
            field: 'note',
            value: '',
            controlType: EnumFormBaseContolType.TEXTBOX,
            type: 'text',
          },
          {
            flexSize: 3,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_FAMILY_UPLOAD_FILE,
            field: 'uploadFileBuffer',
            value: null,
            controlType: EnumFormBaseContolType.ATTACHMENT,
            assignTo: 'uploadFile',
            type: 'object',
          },
        ],
      ],
    },
  ];
  constructor(
    public override dialogService: DialogService,
    private familyEditService: FamilyEditService,
    private coreFormService: CoreFormService,
    private appService: AppService // CoreService is DEPRECATED!!!
  ) {
    super(dialogService);

    this.captionCode = EnumTranslateKey.UI_COMPONENT_TITLE_FAMILY_EDIT;

    this.crud = {
      c: api.HU_FAMILY_CREATE,
      r: api.HU_FAMILY_READ,
      u: api.HU_FAMILY_UPDATE,
      d: api.HU_FAMILY_DELETE,
    };
  }

  ngOnInit(): void {
    this.loading = true;
    this.subscriptions.push(
      this.appService
        .get(api.SYS_OTHERLIST_GETOTHERLISTBYTYPE + 'RELATION')
        .subscribe((res: any) => {
          if (!!res.ok && res.status === 200) {
            const body: IFormatedResponse = res.body;
            if (body.statusCode === 200 && !!body.innerBody) {
              const options: { value: number | null; text: string }[] = [];
              options.push({
                value: Number(),
                text: '',
              });
              res.body.innerBody.map((g: any) => {
                options.push({
                  value: g.id,
                  text: g.name,
                });
              });
              this.relationshipOptions$.next(options);
            }
          }
        })
    );
    this.subscriptions.push(
      this.appService
        .get(api.SYS_OTHERLIST_GETOTHERLISTBYTYPE + 'GENDER')
        .subscribe((res: any) => {
          if (!!res.ok && res.status === 200) {
            const body: IFormatedResponse = res.body;
            if (body.statusCode === 200 && !!body.innerBody) {
              const options: { value: number | null; text: string }[] = [];
              options.push({
                value: Number(),
                text: '',
              });
              res.body.innerBody.map((g: any) => {
                options.push({
                  value: g.id,
                  text: g.name,
                });
              });
              this.genderOptions$.next(options);
            }
          }
        })
    );
    this.subscriptions.push(
      this.appService
        .get(api.HU_FAMILY_NATIONALITY_LIST)
        .subscribe((res: any) => {
          if (!!res.ok && res.status === 200) {
            const body: IFormatedResponse = res.body;
            if (body.statusCode === 200 && !!body.innerBody) {
              const options: { value: number | null; text: string }[] = [];
              options.push({
                value: Number(),
                text: '',
              });
              res.body.innerBody.map((g: any) => {
                options.push({
                  value: g.id,
                  text: g.name,
                });
              });
              this.nationalityOptions$.next(options);
            }
          }
        })
    );
    this.subscriptions.push(
      this.familyEditService.GetProvince(api.HU_FAMILY_PROVINCE_LIST).subscribe(
        (res: any) => {
          if (!!res.ok && res.status === 200) {
            const body: IFormatedResponse = res.body;
            if (body.statusCode === 200 && !!body.innerBody) {
              const options: { value: number | null; text: string }[] = [];
              options.push({
                value: Number(),
                text: '',
              });
              res.body.innerBody.map((g: any) => {
                options.push({
                  value: g.id,
                  text: g.name,
                });
              });
              this.provinceOptions$.next(options);
            }
          }
        }
      )
    );
  }
  /* GET FormGroup Instance */
  onFormCreated(e: FormGroup): void {
    this.form = e as FormGroup;
    /*
    if (this.form.get('statusId')?.value === 994) {
      console.log('first');
      this.form.disable();
    }
    */
    this.subscriptions.push(
      // <== Outer push
      this.form
        .get('birthCerProvince')
        ?.valueChanges.pipe(distinctUntilChanged())
        .subscribe((x) => {
          if (!!x) {
            this.subscriptions.push(
              // <== Inner push
              this.appService
                .get(api.HU_FAMILY_DISTRICT_LIST + x)
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
                      this.districtOptions$.next(options);
                    }
                  }
                })
            );
          } else {
          }
        })!
    );
    this.subscriptions.push(
      // <== Outer push
      this.form
        .get('birthCerDistrict')
        ?.valueChanges.pipe(distinctUntilChanged())
        .subscribe((x) => {
          if (!!x) {
            this.subscriptions.push(
              // <== Inner push
              this.appService
                .get(api.HU_FAMILY_WARD_LIST + x)
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
                      this.wardOptions$.next(options);
                    }
                  }
                })
            );
          } else {
          }
        })!
    );
    

    this.form.get("registDeductDate")?.valueChanges.subscribe((x: any) => {
      // this.form.get("deductFrom")?.setValue(x);

      // Kiểm tra x có giá trị không null hoặc undefined
      if (x) {
        // Tạo đối tượng Date mới từ x
        // newDate là ngày hôm nay
        const newDate = new Date(x);

        if(x.getDate() == newDate.getDate()){
          this.form.get("deductFrom")?.setValue(x);
        }
        else if(x.getDate() < newDate.getDate()){
          // Trừ đi 1 ngày từ newDate
          newDate.setDate(newDate.getDate() - 1);

          // Đặt giá trị mới cho deductFrom
          this.form.get("deductFrom")?.setValue(newDate);
        }
        else if(x.getDate() > newDate.getDate()){
          // Tăng 1 ngày từ newDate
          newDate.setDate(newDate.getDate() + 1);

          // Đặt giá trị mới cho deductFrom
          this.form.get("deductFrom")?.setValue(newDate);
        }
      }
    });
    

    setTimeout(() => {
      if (this.form.get('id')?.value === 0) {
        var deductFromObj = this.coreFormService.getFormBaseControlByName(
          this.sections,
          'deductFrom'
        );
        var deductToObj = this.coreFormService.getFormBaseControlByName(
          this.sections,
          'deductTo'
        );
        var registDeductDateObj = this.coreFormService.getFormBaseControlByName(
          this.sections,
          'registDeductDate'
        );
        if (deductFromObj) {
          deductFromObj.hidden = true;
          deductFromObj.flexSize = 0;
        }
        if (deductToObj) {
          deductToObj.hidden = true;
          deductToObj.flexSize = 0;
        }
        if (registDeductDateObj) {
          registDeductDateObj.hidden = true;
          registDeductDateObj.flexSize = 0;
        }
      }
    }, 10);
    this.subscriptions.push(
      this.form.get('isDeduct')?.valueChanges.subscribe((x) => {
        var deductFromObj = this.coreFormService.getFormBaseControlByName(
          this.sections,
          'deductFrom'
        );
        var deductToObj = this.coreFormService.getFormBaseControlByName(
          this.sections,
          'deductTo'
        );
        var registDeductDateObj = this.coreFormService.getFormBaseControlByName(
          this.sections,
          'registDeductDate'
        );
        
        if (x) {
          if (deductFromObj) {
            deductFromObj.hidden = false;
            deductFromObj.flexSize = 3;
            this.form.get('deductFrom')?.reset();
          }
          if (deductToObj) {
            deductToObj.hidden = false;
            deductToObj.flexSize = 3;
            this.form.get('deductTo')?.reset();
          }
          if (registDeductDateObj) {
            registDeductDateObj.hidden = false;
            registDeductDateObj.flexSize = 3;
            this.form.get('registDeductDate')?.reset();
          }
        } else {
          if (deductFromObj) {
            deductFromObj.hidden = true;
            deductFromObj.flexSize = 0;
            this.form.get('deductFrom')?.patchValue(new Date());
          }
          if (deductToObj) {
            deductToObj.hidden = true;
            deductToObj.flexSize = 0;
            this.form.get('deductTo')?.patchValue(null);
          }
          if (registDeductDateObj) {
            registDeductDateObj.hidden = true;
            registDeductDateObj.flexSize = 0;
            this.form.get('registDeductDate')?.patchValue(new Date());
          }
        }
      })!
    );
  }
  /* To allow form to be deactivated */
  onFormReinit(e: string): void {
    this.formInitStringValue = e;
  }



  protected static deductFrom(date: AbstractControl): any | null {
    let valid = true;
    let errorMessage = "";
    const deductFrom = date.value;
    const deductTo = date.parent?.get("deductTo")?.value;
    if (deductTo != "" && deductTo != null && deductFrom != null) {
      if (deductFrom > new Date(deductTo)) {
        valid = false;
        errorMessage = EnumTranslateKey.UI_FORM_CONTROL_DEDUCT_FROM_GREAT_THAN_DEDUCT_TO
        return CustomValidators.core("deductFrom", false, errorMessage)(date)
      } else {
        date.parent?.get("deductFrom")?.setErrors(null);
        date.parent?.get("deductTo")?.setErrors(null);
      }
    }
  }



  protected static deductTo(date: AbstractControl): any | null {
    let valid = true;
    let errorMessage = "";
    const deductFrom = date.parent?.get("deductFrom")?.value;
    const deductTo = date.value;
    if (deductTo != "" && deductTo != null) {
      if (deductFrom != "" && deductFrom != null && deductTo < new Date(deductFrom)) {
        valid = false;
        errorMessage = EnumTranslateKey.UI_FORM_CONTROL_DEDUCT_TO_GREAT_THAN_DEDUCT_FROM
        return CustomValidators.core("deductTo", false, errorMessage)(date)
      } else {
        date.parent?.get("deductFrom")?.setErrors(null);
        date.parent?.get("deductTo")?.setErrors(null);
      }
    } else {
      // date.parent?.get("deductFrom")?.setErrors(null);
      date.parent?.get("deductTo")?.setErrors(null);
    }
  }
}
