import { Component, OnDestroy, OnInit } from '@angular/core';
import { Validators, FormGroup } from '@angular/forms';
import { EnumTranslateKey, api } from 'alpha-global-constants';
import { BaseEditComponent, ICoreDropdownOption, ICorePageEditColumnComposition, ICorePageEditCRUD, ICoreFormSection, EnumFormBaseContolType, EnumCoreFormControlSeekerSourceType, AppService, DialogService, MultiLanguageService, IFormatedResponse } from 'ngx-histaff-alpha';
import { Subscription, BehaviorSubject, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-qualification-edit',
  templateUrl: './qualification-edit.component.html',
  styleUrls: ['./qualification-edit.component.scss']
})
export class QualificationEditComponent extends BaseEditComponent implements OnInit, OnDestroy {

  override entityTable = "HU_CERTIFICATE";

  loading: boolean = false;

  subsctiptions: Subscription[] = [];

  sysOtherlistGetByIdObject$ = new BehaviorSubject<any>(null);
  sysOtherlistGetByIdApi = api.SYS_OTHERLIST_READ;

  sysOtherlistGetByIdObject1$ = new BehaviorSubject<any>(null);
  sysOtherlistGetByIdApi1 = api.SYS_OTHERLIST_READ;

  sysOtherlistGetByIdObject2$ = new BehaviorSubject<any>(null);
  sysOtherlistGetByIdApi2 = api.SYS_OTHERLIST_READ;

  sysOtherlistGetByIdObject3$ = new BehaviorSubject<any>(null);
  sysOtherlistGetByIdApi3 = api.SYS_OTHERLIST_READ;

  sysOtherlistGetByIdObject4$ = new BehaviorSubject<any>(null);
  sysOtherlistGetByIdApi4 = api.SYS_OTHERLIST_READ;

  employeeGetByIdObject$ = new BehaviorSubject<any>(null);
  employeeGetByIdApi = api.HU_EMPLOYEE_READ;

  typeCertificate$ = new BehaviorSubject<ICoreDropdownOption[]>([]);

  school$ = new BehaviorSubject<ICoreDropdownOption[]>([]);

  trainType$ = new BehaviorSubject<ICoreDropdownOption[]>([]);

  levelTrain$ = new BehaviorSubject<ICoreDropdownOption[]>([]);

  level$ = new BehaviorSubject<ICoreDropdownOption[]>([]);

  captionCode!: EnumTranslateKey;
  formComposition!: ICorePageEditColumnComposition[][];
  crud!: ICorePageEditCRUD;
  sections: ICoreFormSection[] =
    [
      {
        rows: [
          [
            {
              flexSize: 6,
              label: EnumTranslateKey.UI_COMPONENT_LABEL_CERTIFICATE_ID,
              field: 'id',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              readonly: true,
              hidden:true,
              type: 'text'
            },
          ],
          [
            {
              flexSize: 6,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_EMPLOYEE_CODE,
              field: 'employeeId',
              type: 'number',
              value: '',
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
                { takeFrom: 'fullname', bindTo: 'employeeFullName' },
              ],
              /* END: WHEN USING controlType === EnumFormBaseContolType.SEEKER */
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
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_EMPLOYEE_FULLNAME,
              field: 'employeeFullName',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              readonly: true, // We will update this field programatically
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
              label: EnumTranslateKey.UI_COMPONENT_LABEL_CERTIFICATE_IS_PRIME,
              field: 'isPrime',
              value: false,
              controlType: EnumFormBaseContolType.CHECKBOX,
              readonly: false,
              type: 'text'
            },
            {
              flexSize: 6,
              label: EnumTranslateKey.UI_COMPONENT_LABEL_CERTIFICATE_TYPECERTIFICATENAME,
              field: 'typeCertificate',
              value: '',
              getByIdObject$: this.sysOtherlistGetByIdObject1$,
              getByIdApi: this.sysOtherlistGetByIdApi1,
              shownFrom: 'name',
              controlType: EnumFormBaseContolType.DROPDOWN,
              dropdownOptions$: this.typeCertificate$,
              type: 'text',
              validators: [
                {
                  name: 'required',
                  validator: Validators.required,
                  errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
                }
              ]
            },
        ],
        [
          {
            flexSize: 6,
            label: EnumTranslateKey.UI_COMPONENT_LABEL_CERTIFICATE_NAME,
            field: 'name',
            value: '',
            controlType: EnumFormBaseContolType.TEXTBOX,
            readonly: false,
            type: 'text',
            disabled: true,
            // validators: [
            //   {
            //     name: 'required',
            //     validator: Validators.required,
            //     errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
            //   }
            // ]
          },
          {
            flexSize: 6,
            label: EnumTranslateKey.UI_COMPONENT_LABEL_CERTIFICATE_SCHOOLNAME,
            field: 'schoolId',
            value: '',
            getByIdObject$: this.sysOtherlistGetByIdObject2$,
            getByIdApi: this.sysOtherlistGetByIdApi2,
            shownFrom: 'name',
            controlType: EnumFormBaseContolType.DROPDOWN,
            dropdownOptions$: this.school$,
            type: 'text',
            validators: [
              {
                name: 'required',
                validator: Validators.required,
                errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
              }
            ]
          },
        ],
        [
          {
            flexSize: 6,
            label: EnumTranslateKey.UI_COMPONENT_LABEL_CERTIFICATE_LEVELTRAINNAME,
            field: 'levelTrain',
            value: '',
            getByIdObject$: this.sysOtherlistGetByIdObject$,
            getByIdApi: this.sysOtherlistGetByIdApi,
            shownFrom: 'name',
            controlType: EnumFormBaseContolType.DROPDOWN,
            dropdownOptions$: this.levelTrain$,
            type: 'text',
            disabled: true,
            // validators: [
            //   {
            //     name: 'required',
            //     validator: Validators.required,
            //     errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
            //   }
            // ]
          },
          {
            flexSize: 6,
            label: EnumTranslateKey.UI_COMPONENT_LABEL_CERTIFICATE_LEVEL,
            field: 'levelId',
            value: '',
            getByIdObject$: this.sysOtherlistGetByIdObject4$,
            getByIdApi: this.sysOtherlistGetByIdApi4,
            shownFrom: 'name',
            controlType: EnumFormBaseContolType.DROPDOWN,
            dropdownOptions$: this.level$,
            type: 'text',
            disabled: true,
          },
          
        ],
          [
            {
              flexSize: 6,
              label: EnumTranslateKey.UI_COMPONENT_LABEL_CERTIFICATE_TYPETRAINNAME,
              field: 'typeTrain',
              value: '',
              getByIdObject$: this.sysOtherlistGetByIdObject3$,
              getByIdApi: this.sysOtherlistGetByIdApi3,
              shownFrom: 'name',
              controlType: EnumFormBaseContolType.DROPDOWN,
              dropdownOptions$: this.trainType$,
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
              flexSize: 6,
              label: EnumTranslateKey.UI_COMPONENT_LABEL_CERTIFICATE_YEAR,
              field: 'year',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              type: 'number',
              validators: [
                {
                  name: 'required',
                  validator: Validators.required,
                  errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
                }
              ]
            },
          ],
          [
            {
              flexSize: 6,
              label: EnumTranslateKey.UI_COMPONENT_LABEL_CERTIFICATE_CONTENTTRAIN,
              field: 'contentTrain',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              readonly: false,
              type: 'text'
            },
            {
              flexSize: 6,
              label: EnumTranslateKey.UI_COMPONENT_LABEL_CERTIFICATE_MARK,
              field: 'mark',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              readonly: false,
              type: 'number',
            },
          ],
          [
            {
              flexSize: 6,
              label: EnumTranslateKey.UI_COMPONENT_LABEL_CERTIFICATE_TRAIN_FROM,
              field: 'trainFromDate',
              value: '',
              controlType: EnumFormBaseContolType.DATEPICKER,
              type: 'date'
            },
            {
              flexSize: 6,
              label: EnumTranslateKey.UI_COMPONENT_LABEL_CERTIFICATE_TRAIN_TO,
              field: 'trainToDate',
              value: '',
              controlType: EnumFormBaseContolType.DATEPICKER,
              type: 'date'
            },
          ],
          [
            {
              flexSize: 6,
              label: EnumTranslateKey.UI_COMPONENT_LABEL_CERTIFICATE_EFFECT_DATE,
              field: 'effectFrom',
              value: '',
              controlType: EnumFormBaseContolType.DATEPICKER,
              type: 'date',
            },
            {
              flexSize: 6,
              label: EnumTranslateKey.UI_COMPONENT_LABEL_CERTIFICATE_EXPIRE_DATE,
              field: 'effectTo',
              value: '',
              controlType: EnumFormBaseContolType.DATEPICKER,
              type: 'date',
            },
          ],
          [
            // Bỏ trường: chuyên môn theo yêu cầu của BA Tiến
            // {
            //   flexSize: 6,
            //   label: EnumTranslateKey.UI_COMPONENT_LABEL_CERTIFICATE_MAJOR,
            //   field: 'major',
            //   value: '',
            //   controlType: EnumFormBaseContolType.TEXTBOX,
            //   readonly: false,
            //   type: 'text',
            //   validators: [
            //     {
            //       name: 'required',
            //       validator: Validators.required,
            //       errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
            //     }
            //   ]
            // },
            {
              flexSize: 6,
              label: EnumTranslateKey.UI_COMPONENT_LABEL_CERTIFICATE_CLASSIFICATION,
              field: 'classification',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              readonly: false,
              type: 'text'
            },
            
            {
              flexSize: 6,
              label: EnumTranslateKey.UI_COMPONENT_LABEL_CERTIFICATE_FILE,
              field: 'firstAttachmentBuffer',
              value: null,
              controlType: EnumFormBaseContolType.ATTACHMENT,
              assignTo: 'fileName',
              type: 'object',
            }
          ],
          
          [
            {
              flexSize: 12,
              label: EnumTranslateKey.UI_COMPONENT_LABEL_CERTIFICATE_NOTE,
              field: 'remark',
              value: '',
              controlType: EnumFormBaseContolType.TEXTAREA,
              textareaRows: 3,
              readonly: false,
              type: 'text'
            }
          ],
        ]
      },
    ];
  constructor(
    private appService: AppService ,
    public override dialogService: DialogService,
    private mls: MultiLanguageService,
  ) {

    super(dialogService);

    this.captionCode = EnumTranslateKey.UI_COMPONENT_TITLE_CERTIFICATE_EDIT;

    this.crud = {
      c: api.HU_CERTIFICATE_CREATE,
      r: api.HU_CERTIFICATE_READ,
      u: api.HU_CERTIFICATE_UPDATE,
      d: api.HU_CERTIFICATE_DELETE,
    };

  }
  
  ngOnInit(): void {
    this.loading = true;



    this.subsctiptions.push(
      this.appService
      .get(api.SYS_OTHERLIST_GETOTHERLISTBYTYPE + 'LEARNING_LEVEL')
      .subscribe((res: any) => {

        if (!!res.ok && res.status === 200) {
          const body: IFormatedResponse = res.body
          if (body.statusCode === 200 && !!body.innerBody) {
            const options: { value: number | null; text: string; }[] = [];
            options.push({
              value: null,
              text: ''
            })
            res.body.innerBody.map((g: any) => {
              options.push({
                value: g.id,
                text: g.name
              })
            })
            this.level$.next(options);
            // END ONE LOGIC
          }
        }

      }),
      this.appService
      .get(api.SYS_OTHERLIST_GETOTHERLISTBYTYPE + 'MAJOR')
      .subscribe((res: any) => {

        if (!!res.ok && res.status === 200) {
          const body: IFormatedResponse = res.body
          if (body.statusCode === 200 && !!body.innerBody) {
            const options: { value: number | null; text: string; }[] = [];
            options.push({
              value: null,
              text: ''
            })
            res.body.innerBody.map((g: any) => {
              options.push({
                value: g.id,
                text: g.name
              })
            })
            this.levelTrain$.next(options);
            // END ONE LOGIC
          }
        }

      }),
      this.appService
      .get(api.SYS_OTHERLIST_GETOTHERLISTBYTYPE + 'GRADUATE_SCHOOL')
      .subscribe((res: any) => {

        if (!!res.ok && res.status === 200) {
          const body: IFormatedResponse = res.body
          if (body.statusCode === 200 && !!body.innerBody) {
            const options: { value: number | null; text: string; }[] = [];
            options.push({
              value: null,
              text: ''
            })
            res.body.innerBody.map((g: any) => {
              options.push({
                value: g.id,
                text: g.name
              })
            })
            this.school$.next(options);
            // END ONE LOGIC
          }
        }

      }),
      this.appService
      .get(api.SYS_OTHERLIST_GETOTHERLISTBYTYPE + 'TRAINING_FORM')
      .subscribe((res: any) => {

        if (!!res.ok && res.status === 200) {
          const body: IFormatedResponse = res.body
          if (body.statusCode === 200 && !!body.innerBody) {
            const options: { value: number | null; text: string; }[] = [];
            options.push({
              value: null,
              text: ''
            })
            res.body.innerBody.map((g: any) => {
              options.push({
                value: g.id,
                text: g.name
              })
            })
            this.trainType$.next(options);
            // END ONE LOGIC
          }
        }

      }),
      this.appService
      .get(api.SYS_OTHERLIST_GETOTHERLISTBYTYPE + 'TYPE_BCCC')
      .subscribe((res: any) => {

        if (!!res.ok && res.status === 200) {
          const body: IFormatedResponse = res.body
          if (body.statusCode === 200 && !!body.innerBody) {
            const options: { value: number | null; text: string; }[] = [];
            options.push({
              value: null,
              text: ''
            })
            res.body.innerBody.map((g: any) => {
              options.push({
                value: g.id,
                text: g.name
              })
            })
            this.typeCertificate$.next(options);
            // END ONE LOGIC
          }
        }

      }),
      this.appService
      .get(api.HU_CERTIFICATE_GET_ID_OF_TYPE_CERTIFICATE + "LCT002")
      .subscribe(res => {
        if (!!res.ok && res.status === 200) {
          const body: IFormatedResponse = res.body
          if (body.statusCode === 200 && !!body.innerBody) {
            this.get_id_of_typeCertificate_by_code = body.innerBody.id;
          }
        }
      })

    )
  }

  get_id_of_typeCertificate_by_code!: number;

  /* GET FormGroup Instance */
  onFormCreated(e: FormGroup): void {
    this.form = e;
    this.subsctiptions.push(
      this.form.get('typeCertificate')?.valueChanges.pipe(distinctUntilChanged()).subscribe(x=>{
        if(!! x && x === this.get_id_of_typeCertificate_by_code){
          this.form.get('name')?.enable();
          this.form.get('levelTrain')?.disable();
          this.form.get('levelId')?.disable();
        }else{
          this.form.get('name')?.disable();
          this.form.get('levelTrain')?.enable();
          this.form.get('levelId')?.enable();
        }
      })!,
    )
  }

  /* To allow form to be deactivated */
  onFormReinit(e: string): void {
    this.formInitStringValue = e;
  }

  ngOnDestroy(): void {
    this.subsctiptions.map(x => x?.unsubscribe())
  }
}
