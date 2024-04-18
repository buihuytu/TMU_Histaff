import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormsModule, Validators } from '@angular/forms';
import { AppService, BaseEditComponent, CommonHttpRequestService, CoreControlComponent, CorePageEditComponent, DialogService, EnumCoreFormControlSeekerSourceType, EnumCoreTablePipeType, EnumFormBaseContolType, ICoreChecklistOption, ICoreFormSection, ICorePageEditCRUD, ICorePageEditColumnComposition, IFormatedResponse, MultiLanguageService, TranslatePipe, CoreFormService } from 'ngx-histaff-alpha';
import { BehaviorSubject, Subscription, distinctUntilChanged, map } from 'rxjs';
import { TrRequestService } from '../tr-request.service';
import { EnumTranslateKey, api } from 'alpha-global-constants';

@Component({
  selector: 'app-tr-request-edit',
  standalone: true,
  imports: [
    CommonModule,
    CorePageEditComponent,
    TranslatePipe,
    FormsModule,
    CoreControlComponent,
  ],
  templateUrl: './tr-request-edit.component.html',
  styleUrl: './tr-request-edit.component.scss'
})
export class TrRequestEditComponent extends BaseEditComponent implements OnInit, AfterViewInit, OnDestroy {
  /* Properties to be passed into core-page-edit */
  override entityTable = "TR_REQUEST";


  captionCode!: EnumTranslateKey;
  formComposition!: ICorePageEditColumnComposition[][];
  crud!: ICorePageEditCRUD;

  loading: boolean = false;
  bufferForm!: FormGroup;
  subscriptions: Subscription[] = [];

  defauleValueStatus: number = 993; // sửa thánh getIdbycode sau

  /*--------------------------- ORGANIZATION Unit Seeker ---------------------------*/ 
  organizationGetByIdObject$ = new BehaviorSubject<any>(null);
  organizationGetByIdApi = api.HU_ORGANIZATION_READ;

  /*--------------------------- Employee Seeker ---------------------------*/ 
  employeeGetByIdObject$ = new BehaviorSubject<any>(null);
  employeeGetByIdApi = api.HU_EMPLOYEE_READ;

  /*--------------------------- Dropdown List ---------------------------*/ 
  // YEAR
  yearOptions$ = new BehaviorSubject<any>([]);
  yearGetByIdObject$ = new BehaviorSubject<any>(null);
  yearGetByIdApi = api.AT_SALARY_PERIOD_READ;
  // COURSE
  courseOptions$ = new BehaviorSubject<any>([]);
  courseGetByIdObject$ = new BehaviorSubject<any>(null);
  courseGetByIdApi = api.TR_COURSE_READ;
  // CENTER
  centerOptions$ = new BehaviorSubject<ICoreChecklistOption[]>([]);
  centerGetByIdObject$ = new BehaviorSubject<any>(null);
  centerGetByIdApi = api.TR_COURSE_READ;
  // TEACHER
  teacherOptions$ = new BehaviorSubject<ICoreChecklistOption[]>([]);
  teacherGetByIdObject$ = new BehaviorSubject<any>(null);
  teacherGetByIdApi = api.TR_COURSE_READ;
  // PropertiesNeed
  propertiesNeedOptions$ = new BehaviorSubject<any>([]);
  propertiesNeedGetByIdObject$ = new BehaviorSubject<any>(null);
  propertiesNeedGetByIdApi = api.SYS_OTHERLIST_READ;
  // TrainingForm
  trainingFormOptions$ = new BehaviorSubject<any>([]);
  trainingFormGetByIdObject$ = new BehaviorSubject<any>(null);
  trainingFormGetByIdApi = api.SYS_OTHERLIST_READ;
  // CURRENCY
  currencyOptions$ = new BehaviorSubject<any>([]);
  currencyGetByIdObject$ = new BehaviorSubject<any>(null);
  currencyGetByIdApi = api.SYS_OTHERLIST_READ;
  // STATUS
  statusOptions$ = new BehaviorSubject<any>([]);
  statusGetByIdObject$ = new BehaviorSubject<any>(null);
  statusGetByIdApi = api.SYS_OTHERLIST_READ;

  /*--------------------------- Employee Seeker sub grid ---------------------------*/ 
  employeeObjectList$ = new BehaviorSubject<any[]>([]); // Đặt employeeObjectList$ ra ngoài
  employeesGetByIdObject$ = new BehaviorSubject<any>(null);
  employeesGetByIdApi = api.HU_EMPLOYEE_READ;
  
  public preDefinedOuterParam$ = new BehaviorSubject<any>({
    isLeaveWork: false,
  })
  
  sections: ICoreFormSection[] =
  [
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_TR_REQUEST_INFOR,
      rows: [
        [
          {
            flexSize: 0,
            label: EnumTranslateKey.UI_COMPONENT_LABEL_WAGE_ID,
            field: 'id',
            value: 0,
            controlType: EnumFormBaseContolType.TEXTBOX,
            readonly: true,
            hidden: true,
            type: 'number'
          },
          {
            flexSize: 4,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_TR_REQUEST_REQUEST_DATE,  // NGÀY GỬI YÊU CẦU
            field: 'requestDate',
            value: '',
            controlType: EnumFormBaseContolType.DATEPICKER,
            type: 'date',
            validators: [
              {
                name: 'required',
                validator: Validators.required,
                errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
              },
            ]
          },
          {
            flexSize: 4,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_TR_REQUEST_YEAR,     // Năm
            field: 'year',
            value: '',
            controlType: EnumFormBaseContolType.DROPDOWN,
            type: 'number',
            getByIdObject$: this.yearGetByIdObject$,
            getByIdApi: this.yearGetByIdApi,
            shownFrom: 'text',
            dropdownOptions$: this.yearOptions$,
            validators: [
              {
                name: 'required',
                validator: Validators.required,
                errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
              },
            ]
          },
          {
            flexSize: 4,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_TR_REQUEST_ORG_ID,   // Ban/Phòng
            field: 'orgId',
            value: '',
            controlType: EnumFormBaseContolType.SEEKER,

            /* 
              START: WHEN USING controlType === EnumFormBaseContolType.SEEKER
              we must pass the three properties bellow:
            */
            seekerSourceType: EnumCoreFormControlSeekerSourceType.ORGANIZATION_UNIT_SEEK,    
            getByIdObject$: this.organizationGetByIdObject$,
            getByIdApi: this.organizationGetByIdApi,
            boundFrom: 'id',
            shownFrom: 'name',
            /* END: WHEN USING controlType === EnumFormBaseContolType.SEEKER */
            type: 'text',
            validators: [
              {
                name: 'required',
                validator: Validators.required,
                errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
              }
            ],
          },
        ],
        [
          {
            flexSize: 4,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_TR_REQUEST_REQUEST_SENDER_NAME,  // NGƯỜI YÊU CẦU
            field: 'requestSenderId',
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
            shownFrom: 'fullname',
            alsoBindTo: [
              { takeFrom: 'workEmail', bindTo: 'senderEmail' },
              { takeFrom: 'mobilePhone', bindTo: 'senderPhoneNumber' },
            ],
            /* END: WHEN USING controlType === EnumFormBaseContolType.SEEKER */
            type: 'number',
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
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_TR_REQUEST_REQUEST_SENDER_EMAIL, // EMAIL NGƯỜI GỬI YÊU CẦU
            field: 'senderEmail',
            value: '',
            controlType: EnumFormBaseContolType.TEXTBOX,
            type: 'text',
            readonly: false,
            disabled: true,
          },
          {
            flexSize: 4,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_TR_REQUEST_REQUEST_SENDER_PHONE_NUMBER,   // ĐIỆN THOẠI NGƯỜI GỬI YÊU CẦU
            field: 'senderPhoneNumber',
            value: '',
            controlType: EnumFormBaseContolType.TEXTBOX,
            type: 'text',
            readonly: false,
            disabled: true,
          },
        ],
        [
          {
            flexSize: 4,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_TR_REQUEST_CODE, // MÃ YCĐT
            field: 'requestCode',
            value: '',
            controlType: EnumFormBaseContolType.TEXTBOX,
            type: 'text',
            validators: [
              {
                name: 'required',
                validator: Validators.required,
                errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
              },
            ]
          },
          {
            flexSize: 4,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_TR_REQUEST_TR_COURSE_NAME,  // KHÓA ĐÀO TẠO
            field: 'trCourseId',
            value: '',
            controlType: EnumFormBaseContolType.DROPDOWN,
            type: 'number',
            getByIdObject$: this.courseGetByIdObject$,
            getByIdApi: this.courseGetByIdApi,
            shownFrom: 'text',
            dropdownOptions$: this.courseOptions$,
            validators: [
              {
                name: 'required',
                validator: Validators.required,
                errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
              },
            ]
          },
        ],
        [
          {
            flexSize: 4,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_TR_REQUEST_TRAINING_FEILD, // Lĩnh vực đào tạo
            field: 'trTrainFeild',
            value: '',
            controlType: EnumFormBaseContolType.TEXTBOX,
            type: 'text',
            readonly: false,
            disabled: true,
          },
          {
            flexSize: 4,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_TR_REQUEST_TRAIN_FORM_NAME,  // Hình thức đào tạo
            field: 'trainFormId',
            value: '',
            controlType: EnumFormBaseContolType.DROPDOWN,
            type: 'number',
            getByIdObject$: this.trainingFormGetByIdObject$,
            getByIdApi: this.trainingFormGetByIdApi,
            shownFrom: 'text',
            dropdownOptions$: this.trainingFormOptions$,
            validators: [
              {
                name: 'required',
                validator: Validators.required,
                errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
              },
            ]
          },
          {
            flexSize: 4,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_TR_REQUEST_PROPERTIES_NEED_ID,  // Tính chất nhu cầu
            field: 'propertiesNeedId',
            value: '',
            controlType: EnumFormBaseContolType.DROPDOWN,
            type: 'number',
            getByIdObject$: this.propertiesNeedGetByIdObject$,
            getByIdApi: this.propertiesNeedGetByIdApi,
            shownFrom: 'text',
            dropdownOptions$: this.propertiesNeedOptions$,
            validators: [
              {
                name: 'required',
                validator: Validators.required,
                errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
              },
            ]
          },
        ],
        [
          {
            flexSize: 9,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_TR_REQUEST_TR_PLACE,  // NƠI ĐÀO TẠO
            field: 'trPlace',
            value: '',
            controlType: EnumFormBaseContolType.TEXTBOX,
            type: 'text',
          },
          
        ],
        [
          {
            flexSize: 9,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_TR_REQUEST_CONTENT,  // NỘI DUNG ĐÀO TẠO
            field: 'content',
            value: '',
            controlType: EnumFormBaseContolType.TEXTBOX,
            type: 'text',
            validators: [
              {
                name: 'required',
                validator: Validators.required,
                errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
              },
            ]
          },
          {
            flexSize: 3,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_TR_REQUEST_CERTIFICATE,  // 	CHỨNG NHẬN ĐẠT ĐƯỢC
            field: 'certificate',
            value: '',
            controlType: EnumFormBaseContolType.CHECKBOX,
            type: 'boolean',
          },
        ],
        [
          {
            flexSize: 9,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_TR_REQUEST_TARGET_TRAIN,  // MỤC TIÊU ĐÀO TẠO
            field: 'targetTrain',
            value: '',
            controlType: EnumFormBaseContolType.TEXTBOX,
            type: 'text',
          },
          {
            flexSize: 3,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_TR_REQUEST_TR_COMMIT,  // 	CAM KẾT ĐÀO TẠO
            field: 'trCommit',
            value: '',
            controlType: EnumFormBaseContolType.CHECKBOX,
            type: 'boolean',
          },
        ],
        [
          {
            flexSize: 3,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_TR_REQUEST_EXPECTED_DATE,  // THỜI GIAN DỰ KIẾN TỪ
            field: 'expectedDate',
            value: '',
            controlType: EnumFormBaseContolType.DATEPICKER,
            type: 'date',
            validators: [
              {
                name: 'required',
                validator: Validators.required,
                errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
              },
            ]
          },
          {
            flexSize: 3,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_TR_REQUEST_EXPECT_DATE_TO,   // 	THỜI GIAN DỰ KIẾN ĐẾN
            field: 'expectDateTo',
            value: '',
            controlType: EnumFormBaseContolType.DATEPICKER,
            type: 'date',
          },
          {
            flexSize: 3,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_TR_REQUEST_CENTERS,  // 	TRUNG TÂM ĐÀO TẠO
            field: 'listCentersId',
            value: [],
            controlType: EnumFormBaseContolType.CHECKLIST,
            getByIdObject$: this.centerGetByIdObject$,
            checklistOptions$: this.centerOptions$,
            shownFrom: 'text',
            type: 'string',
          },
          {
            flexSize: 3,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_TR_REQUEST_TEACHERS,  // 	GIẢNG VIÊN
            field: 'listTeachersId',
            value: [],
            controlType: EnumFormBaseContolType.CHECKLIST,
            type: 'string',
            getByIdObject$: this.teacherGetByIdObject$,
            shownFrom: 'text',
            checklistOptions$: this.teacherOptions$,
          },
        ],
        [
          {
            flexSize: 4,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_TR_REQUEST_TRAINER_NUMBER,  // 	SỐ HỌC VIÊN DỰ KIẾN
            field: 'trainerNumber',
            value: '',
            type: 'number',
            controlType: EnumFormBaseContolType.CURRENCY,
            pipe: EnumCoreTablePipeType.NUMBER,
          },
          {
            flexSize: 4,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_TR_REQUEST_EXPECTED_COST,  // 	CHI PHÍ DỰ KIẾN
            field: 'expectedCost',
            value: '',
            type: 'number',
            controlType: EnumFormBaseContolType.CURRENCY,
            pipe: EnumCoreTablePipeType.NUMBER,
          },
          {
            flexSize: 4,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_TR_REQUEST_TR_CURRENCY,  // 	Đơn vị tiền tệ
            field: 'trCurrencyId',
            value: '',
            getByIdObject$: this.currencyGetByIdObject$,
            getByIdApi: this.currencyGetByIdApi,
            shownFrom: 'name',
            controlType: EnumFormBaseContolType.DROPDOWN,
            dropdownOptions$: this.currencyOptions$,
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
            flexSize: 4,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_TR_REQUEST_REMARK, // 	GHI CHÚ
            field: 'remark',
            value: '',
            controlType: EnumFormBaseContolType.TEXTBOX,
            type: 'text',
          },
          {
            flexSize: 4,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_TR_REQUEST_ATTACH_FILE,  // 	Tập tin đính kèm
            field: 'attachedFileBuffer',
            value: '',
            controlType: EnumFormBaseContolType.ATTACHMENT,
            assignTo: 'attachFile',
            type: 'string',
          },
          {
            flexSize: 4,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_TR_REQUEST_STATUS,  // Trạng thái
            field: 'statusId',
            value: this.defauleValueStatus,
            getByIdObject$: this.statusGetByIdObject$,
            getByIdApi: this.statusGetByIdApi,
            shownFrom: 'name',
            controlType: EnumFormBaseContolType.DROPDOWN,
            dropdownOptions$: this.statusOptions$,
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
      ]
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_TR_REQUEST_INFOR_TRAINER,
      rows: [
        [
          {
            flexSize: 12,
            label: EnumTranslateKey.UI_COMPONENT_TITLE_EMPLOYEE_SEEKER,
            field: 'employeeIds',
            value: [],
            controlType: EnumFormBaseContolType.SEEKER,
            type: 'object',
            /* 
              START: Thay đổi thuộc tính của SEEKER để có SELECTOR:
            */
            seekerSourceType: EnumCoreFormControlSeekerSourceType.EMPLOYEE_SEEK,
            multiMode: true,
            objectList$: this.employeeObjectList$,
            getObjectListFrom: 'employeeList',
            getByIdObject$: this.employeesGetByIdObject$,
            getByIdApi: this.employeesGetByIdApi,
            boundFrom: 'id',
            shownFrom: 'fullname',
            preDefinedOuterParam$: this.preDefinedOuterParam$,
            // alsoBindTo: [{ takeFrom: 'positionName', bindTo: 'signPosition' }],
            /* END: WHEN USING controlType === EnumFormBaseContolType.SEEKER */
            validators: [
              {
                name: 'required',
                validator: Validators.required,
                errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
              }
            ]
          },
          {
            flexSize: 12,
            label: EnumTranslateKey.UI_COMMON_EMPTY_STRING,
            field: 'employeeList',
            value: [],
            controlType: EnumFormBaseContolType.HIDDEN,
            type: 'object',
          },
        ]
      ]
    },
  ]

  constructor(
    //private _coreService: CoreService,
    public override dialogService: DialogService,
    private mls: MultiLanguageService,
    private commonHttpRequestService: CommonHttpRequestService,
    private appService: AppService, // CoreService is DEPRECATED!!!
    private coreFormService: CoreFormService,
    private trRequestService: TrRequestService
  ) {
    super(dialogService);

    this.captionCode = EnumTranslateKey.UI_COMPONENT_TITLE_TR_REQUEST_EDIT;

    this.crud = {
      c: api.TR_REQUEST_CREATE,
      r: api.TR_REQUEST_READ,
      u: api.TR_REQUEST_UPDATE,
      d: api.TR_REQUEST_DELETE_IDS,
    };
  }

  /*====================== Function for Dropdown List ======================*/
  getListYear() {
    this.loading = true;
    this.subscriptions.push(
      this.appService.get(api.AT_SALARY_PERIOD_GET_YEAR).subscribe((res: any) => {
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
                value: g,
                text: g
              })
            })
            this.yearOptions$.next(options);
            this.loading = false;
          }
        }
      })
    )
  }

  getListCourse(){
    this.subscriptions.push(
      this.trRequestService 
        .getListCourse()
        .pipe(
          map((x: any) => {
            const options: { value: number; text: string; code: string }[] = [];
            x.body.innerBody.map((g: any) => {
              options.push({
                value: g.id,
                text: g.name,
                code: g.code,
              });
            });
            return options;
          })
        )
        .subscribe((response: any) => {
          this.courseOptions$.next(response);
          this.loading = false;
        })
    );
  }

  getListTrainingCenter(){
    this.subscriptions.push(
      this.trRequestService 
        .getListTrainingCenter()
        .pipe(
          map((x: any) => {
            if (x.ok && x.status === 200) {
              const options: ICoreChecklistOption[] = [];
              x.body.innerBody.map((g: any) => {
                options.push({
                  value: g.id,
                  text: g.name,
                  checked: false,
                });
              });
              return options;
            }
            else{
              return [];
            }
          })
        )
        .subscribe((response: any) => {
          this.centerOptions$.next(response);
          this.loading = false;
        })
    );
  }

  getListTeacher(){
    console.log("listCentersId:", this.form.get('listCentersId')?.value);
    this.form.get('listCentersId')?.valueChanges.pipe(distinctUntilChanged()).subscribe((x) => {
      console.log("1:L",x);
      if (this.form.get('listCentersId')?.value != null && this.form.get('listCentersId')?.value != "") {
        this.form.get('listTeachersId')?.enable();
      } else {
        this.form.get('listTeachersId')?.setValue(null);
        this.form.get('listTeachersId')?.disable();
      }
      if(!!x){
        this.trRequestService
        .getListTeacherByCenter(x)
        .pipe(
          map((x: any) => {
            if (x.ok && x.status === 200) {
              const options:  ICoreChecklistOption[] = [];
              x.body.innerBody.map((g: any) => {
                options.push({
                  value: g.id,
                  text: g.name,
                  checked: false,
                });
              });
              return options;
            } else {
              return [];
            }
          }),
        )
        .subscribe((response: any) => {
        //  this.form.get('insContractId')?.setValue(null);
          this.teacherOptions$.next(response);
          this.loading = false;
        });
      }
      else{
        this.form.get('listTeachersId')?.setValue(null);
        this.form.get('listTeachersId')?.disable();
      }
      
    })
  }

  
  getALLPropertiesNeed(){
    this.subscriptions.push(
      this.trRequestService
        .getALLPropertiesNeedByKey()
        .pipe(
          map((x: any) => {
            if(x.ok && x.status == 200){
              const options: { value: number; text: string; code: string }[] = [];
              x.body.innerBody.map((g: any) => {
                options.push({
                  value: g.id,
                  text: g.name,
                  code: g.code,
                });
              });
              return options;
            }
            else{
              return [];
            }
          })
        )
        .subscribe((response: any) => {
          this.propertiesNeedOptions$.next(response);
          this.loading = false;
        })
    );
  }

  getALLTrainingForm(){
    this.subscriptions.push(
      this.trRequestService
        .getALLTrainingFormByKey()
        .pipe(
          map((x: any) => {
            const options: { value: number; text: string; code: string }[] = [];
            x.body.innerBody.map((g: any) => {
              options.push({
                value: g.id,
                text: g.name,
                code: g.code,
              });
            });
            return options;
          })
        )
        .subscribe((response: any) => {
          this.trainingFormOptions$.next(response);
          this.loading = false;
        })
    );
  }

  getListCurrency(){
    this.subscriptions.push(
      this.trRequestService
        .getALLCurrencyByKey()
        .pipe(
          map((x: any) => {
            const options: { value: number; text: string; code: string }[] = [];
            x.body.innerBody.map((g: any) => {
              options.push({
                value: g.id,
                text: g.name,
                code: g.code,
              });
            });
            return options;
          })
        )
        .subscribe((response: any) => {
          this.currencyOptions$.next(response);
          this.loading = false;
        })
    );
  }

  getListStatus(){
    this.subscriptions.push(
      this.trRequestService
        .getALLStatusByKey()
        .pipe(
          map((x: any) => {
            const options: { value: number; text: string; code: string }[] = [];
            x.body.innerBody.map((g: any) => {
              options.push({
                value: g.id,
                text: g.name,
                code: g.code,
              });
            });
            return options;
          })
        )
        .subscribe((response: any) => {
          this.statusOptions$.next(response);
          this.loading = false;
        })
    );
  }


  onFormCreated(e: FormGroup): void {
    this.form = e;
    this.getListTeacher()
  }

  /* To allow form to be deactivated */
  onFormReinit(e: string): void {
    this.formInitStringValue = e;
  }

  ngOnInit(): void {

    
  }
  
  
  ngAfterViewInit(): void {
    this.loading = true;
    console.log(this.form);

    setTimeout(() => {
      this.getListYear();
      
      this.getListCourse();
  
      this.getListTrainingCenter();
  
      // this.getListTeacher();
  
      this.getALLPropertiesNeed();
         
      this.getALLTrainingForm();
  
      this.getListCurrency();
  
      this.getListStatus();
    }, 1000)
  }
  
  ngOnDestroy(): void {
    this.subscriptions.map(x => x?.unsubscribe())
  }
}
