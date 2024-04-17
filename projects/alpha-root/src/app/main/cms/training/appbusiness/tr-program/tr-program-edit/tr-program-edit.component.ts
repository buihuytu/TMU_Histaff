import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnDestroy, OnInit, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { AbstractControl, FormGroup, FormsModule, Validators } from '@angular/forms';
import { Subscription, BehaviorSubject, distinctUntilChanged, filter, map } from 'rxjs';

import { TrSettingCriCourseService } from '../../../applist/tr-setting-cri-course/tr-setting-cri-course.service';
import { TrRequestService } from '../../tr-request/tr-request.service';
import { CorePageEditComponent, BaseEditComponent, ICoreDropdownOption, ICoreChecklistOption, ICorePageEditCRUD, ICoreFormSection, EnumFormBaseContolType, EnumCoreFormControlSeekerSourceType, DialogService, AppService, IFormatedResponse } from 'ngx-histaff-alpha';
import { EnumTranslateKey, api } from 'alpha-global-constants';

@Component({
  selector: 'app-tr-program-edit',
  standalone: true,
  imports: [
    CommonModule,
    CorePageEditComponent,
    FormsModule
  ],
  templateUrl: './tr-program-edit.component.html',
  styleUrl: './tr-program-edit.component.scss',
  encapsulation: ViewEncapsulation.Emulated,
})
export class TrProgramEditComponent extends BaseEditComponent implements OnInit, AfterViewInit, OnDestroy {

  /* Properties to be passed into core-page-edit */
  override entityTable = "HU_WORKING";

  @ViewChild('allowanceType') allowanceType!: TemplateRef<any>; // Tham chiếu đến template

  loading: boolean = false;
  bufferForm!: FormGroup;
  subscriptions: Subscription[] = [];
  defauleValueTaxtable: number = 1006; // sửa thánh getIdbycode sau
  defauleValueStatus: number = 993; // sửa thánh getIdbycode sau

  public preDefinedOuterParam$ = new BehaviorSubject<any>({
    isLeaveWork: false,
  })
  groupOptionsSalType$ = new BehaviorSubject<ICoreDropdownOption[]>([]);
  groupOptionsSalScale$ = new BehaviorSubject<ICoreDropdownOption[]>([]);
  groupOptionsSalRank$ = new BehaviorSubject<ICoreDropdownOption[]>([]);
  groupOptionsSalLevel$ = new BehaviorSubject<ICoreDropdownOption[]>([]);
  groupOptionsPosition$ = new BehaviorSubject<ICoreDropdownOption[]>([]);
  groupOptionsStatus$ = new BehaviorSubject<ICoreDropdownOption[]>([]);
  groupOptionsTitle$ = new BehaviorSubject<ICoreDropdownOption[]>([]);
  groupOptionsPropertiesNeed$ = new BehaviorSubject<ICoreDropdownOption[]>([]);
  groupOptionsAllowanceType$ = new BehaviorSubject<ICoreDropdownOption[]>([]);
  groupOptionsTaxtable$ = new BehaviorSubject<ICoreDropdownOption[]>([]);
  groupOptionsRegion$ = new BehaviorSubject<ICoreDropdownOption[]>([]);
  groupOptionsSalScaleDCV$ = new BehaviorSubject<ICoreDropdownOption[]>([]);
  groupOptionsSalRankDCV$ = new BehaviorSubject<ICoreDropdownOption[]>([]);
  groupOptionsSalLevelDCV$ = new BehaviorSubject<ICoreDropdownOption[]>([]);
  groupOptionsEmployeeObj$ = new BehaviorSubject<ICoreDropdownOption[]>([]);

  //subscriptionsStatus: Subscription[] = [];
  checkListJobGetByIdObject$ = new BehaviorSubject<any>(null);
  checkListJobOptions$ = new BehaviorSubject<ICoreChecklistOption[]>([])

  bhtypeGetByIdApi = null;

  employeeGetByIdObject$ = new BehaviorSubject<any>(null);
  employeeGetByIdApi = api.HU_EMPLOYEE_READ;

  signGetByIdObject$ = new BehaviorSubject<any>(null);
  signGetByIdApi = api.HU_EMPLOYEE_READ;

  employeeObjGetByIdObject$ = new BehaviorSubject<any>(null);
  employeeObjGetByIdApi = api.SYS_OTHERLIST_READ;

  orgUnitGetByIdObject$ = new BehaviorSubject<any>(null);
  orgUnitGetByIdApi = api.OM_ORGANIZATION_READ;

  salScaleGetByIdObject$ = new BehaviorSubject<any>(null);
  salScaleGetByIdApi = api.HU_SALARY_SCALE_READ;

  salRankGetByIdObject$ = new BehaviorSubject<any>(null);
  salRankGetByIdApi = api.HU_SALARY_RANK_READ;

  salLevelGetByIdObject$ = new BehaviorSubject<any>(null);
  salLevelGetByIdApi = api.HU_SALARY_LEVEL_READ;

  statusGetByIdObject$ = new BehaviorSubject<any>(null);
  statusGetByIdApi = api.SYS_OTHERLIST_READ;

  propertiesNeedGetByIdObject$ = new BehaviorSubject<any>(null);
  propertiesNeedGetByIdApi = api.SYS_OTHERLIST_READ;

  taxTableGetByIdObject$ = new BehaviorSubject<any>(null);
  taxTableGetByIdApi = api.SYS_OTHERLIST_READ;

  allowanceTypeGetByIdObject$ = new BehaviorSubject<any>(null);
  allowanceTypeGetByIdApi = api.HU_ALLOWANCE_READ;

  salScaleDCVGetByIdObject$ = new BehaviorSubject<any>(null);
  salScaleDCVGetByIdApi = api.HU_SALARY_SCALE_READ;

  salRankDCVGetByIdObject$ = new BehaviorSubject<any>(null);
  salRankDCVGetByIdApi = api.HU_SALARY_RANK_READ;

  salLevelDCVGetByIdObject$ = new BehaviorSubject<any>(null);
  salLevelDCVGetByIdApi = api.HU_SALARY_RANK_READ;

  salaryTypeGetByIdObject$ = new BehaviorSubject<any>(null);
  salaryTypeGetByIdApi = api.HU_SALARY_TYPE_READ;

  captionCode!: EnumTranslateKey;
  crud!: ICorePageEditCRUD;

  trCourseIdGetByIdApi = api.TR_COURSE_READ;
  trCourseIdGetByIdObject$ = new BehaviorSubject<any>(null);
  trCourseIdOptions$ = new BehaviorSubject<ICoreDropdownOption[]>([]);

  trTypeGetByIdApi = api.TR_COURSE_READ;
  trTypeGetByIdObject$ = new BehaviorSubject<any>(null);
  trTypeOptions$ = new BehaviorSubject<ICoreDropdownOption[]>([]);

  trainFormGetByIdApi = api.TR_COURSE_READ;
  trainFormGetByIdObject$ = new BehaviorSubject<any>(null);
  trainFormOptions$ = new BehaviorSubject<ICoreDropdownOption[]>([]);

  trCurrencyGetByIdApi = api.TR_COURSE_READ;
  trCurrencyGetByIdObject$ = new BehaviorSubject<any>(null);
  trCurrencyOptions$ = new BehaviorSubject<ICoreDropdownOption[]>([]);

  trCenterGetByIdApi = api.GET_BY_ID_TR_CENTER;
  trCenterGetByIdObject$ = new BehaviorSubject<any>(null);
  trCenterOptions$ = new BehaviorSubject<ICoreChecklistOption[]>([]);

  trLecturesGetByIdApi = api.GET_BY_ID_TR_CENTER;
  trLecturesGetByIdObject$ = new BehaviorSubject<any>(null);
  trLecturesOptions$ = new BehaviorSubject<ICoreChecklistOption[]>([]);


  sections: ICoreFormSection[] =
    [
      {
        rows: [
          [
            {
              flexSize: 6,
              label: EnumTranslateKey.UI_COMPONENT_LABEL_WAGE_ID,
              field: 'id',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              readonly: true,
              hidden: true,
              type: 'number'
            },
          ],
        ]
      },
      {
        caption: EnumTranslateKey.UI_COMPONENT_TITLE_TR_PROGRAM_DECLARATION_OF_DETAILED_TRAINING_REQUIREMENTS, //Khai báo yêu cầu đào tạo chi tiết
        rows: [
          [
            {
              flexSize: 3,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_TR_PROGRAM_YEAR_TRAIN, //Năm
              field: 'year',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              type: 'number',
              readonly: false,
              validators: [
                {
                  name: 'required',
                  validator: Validators.required,
                  errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
                }
              ],
            },
            {
              flexSize: 3,
              label: EnumTranslateKey.UI_COMPONENT_LABEL_DECISION_ORG_NAME, //Phòng ban
              field: 'orgId',
              value: '',
              controlType: EnumFormBaseContolType.SEEKER,
              seekerSourceType: EnumCoreFormControlSeekerSourceType.ORGANIZATION_UNIT_SEEK,
              getByIdObject$: this.orgUnitGetByIdObject$,
              getByIdApi: this.orgUnitGetByIdApi,
              boundFrom: 'id',
              shownFrom: 'name',
              /* END: WHEN USING controlType === EnumFormBaseContolType.SEEKER */
              type: 'text',
              readonly: true,
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
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_TR_PROGRAM_TYPE_TRAIN_DX, //Đột xuất
              field: 'isPlanDx',
              value: false,
              controlType: EnumFormBaseContolType.CHECKBOX,
              type: 'boolean',
            },
            {
              flexSize: 3,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_TR_PROGRAM_TYPE_TRAIN, //Theo nhu cầu
              field: 'isPlanNc',
              value: false,
              controlType: EnumFormBaseContolType.CHECKBOX,
              type: 'boolean',
            },
          ],
          [
            {
              flexSize: 3,
              label: EnumTranslateKey.UI_LABEL_TRAINING_COURSE_CODE, //Mã khóa đào tạo
              field: 'trProgramCode',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              type: 'text',
              validators: [
                {
                  name: 'required',
                  validator: Validators.required,
                  errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
                }
              ],
            },
            {
              flexSize: 3,
              label: EnumTranslateKey.UI_COMPONENT_TITLE_TRAINING_COURSE,
              field: 'trCourseId',
              value: '',
              type: 'number',
              controlType: EnumFormBaseContolType.DROPDOWN,
              getByIdApi: this.trCourseIdGetByIdApi,
              getByIdObject$: this.trCourseIdGetByIdObject$,
              dropdownOptions$: this.trCourseIdOptions$,
              shownFrom: 'name',
              validators: [
                {
                  name: 'required',
                  validator: Validators.required,
                  errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED
                }
              ]
            },
            {
              flexSize: 3,
              label: EnumTranslateKey.UI_LABEL_TRAINING_CENTER_TRAINING_FILED,
              field: 'trTrainField',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              type: 'text',
            },
          ],
          [
            {
              flexSize: 3,
              label: EnumTranslateKey.UI_COMPONENT_TITLE_TR_PLAN_FORM_TRAINING,
              field: 'trainFormId',
              value: '',
              getByIdObject$: this.trainFormGetByIdObject$,
              getByIdApi: this.trainFormGetByIdApi,
              shownFrom: 'name',
              controlType: EnumFormBaseContolType.DROPDOWN,
              dropdownOptions$: this.trainFormOptions$,
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
              flexSize: 3,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_TR_PROGRAM_PROPERTIES, //tính chất nhu cầu
              field: 'propertiesNeedId',
              value: '',
              getByIdObject$: this.propertiesNeedGetByIdObject$,
              getByIdApi: this.propertiesNeedGetByIdApi,
              shownFrom: 'name',
              controlType: EnumFormBaseContolType.DROPDOWN,
              dropdownOptions$: this.groupOptionsPropertiesNeed$,
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
              flexSize: 3,
              label: EnumTranslateKey.UI_COMPONENT_TITLE_TR_PLAN_ADDRESS_TRAINING, //địa chỉ đào tạo
              field: 'venue',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              type: 'text',
            },
          ],
          [
            {
              flexSize: 12,
              label: EnumTranslateKey.UI_COMPONENT_LABEL_CERTIFICATE_CONTENTTRAIN, //ghi chú
              field: 'content',
              value: '',
              controlType: EnumFormBaseContolType.TEXTAREA,
              type: 'text',
            },
          ],
          [
            {
              flexSize: 12,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_TR_PROGRAM_TARGET, //mục tiêu đào tạo
              field: 'targetTrain',
              value: '',
              controlType: EnumFormBaseContolType.TEXTAREA,
              type: 'text',
            },
          ],
          [
            {
              flexSize: 12,
              label: EnumTranslateKey.UI_COMPONENT_TITLE_TR_PLAN_NOTE,
              field: 'note',
              value: '',
              controlType: EnumFormBaseContolType.TEXTAREA,
              type: 'text',
            },
          ]
        ]
      },
      {
        caption: EnumTranslateKey.UI_COMPONENT_TITLE_TR_PROGRAM_TIME_TRAINING, //Thời gian đào tạo
        rows:
          [
            [
              {
                flexSize: 3,
                label: EnumTranslateKey.UI_LABEL_TIME_IMPORT_FROM_DATE,
                field: 'startDate',
                value: '',
                controlType: EnumFormBaseContolType.DATEPICKER,
                type: 'date',
                validators: [
                  {
                    name: 'required',
                    validator: Validators.required,
                    errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
                  }
                ],
              },
              {
                flexSize: 3,
                label: EnumTranslateKey.UI_LABEL_TIME_IMPORT_TO_DATE,
                field: 'endDate',
                value: '',
                controlType: EnumFormBaseContolType.DATEPICKER,
                type: 'date',
                validators: [
                  {
                    name: 'required',
                    validator: Validators.required,
                    errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
                  }
                ],
              },
            ],
          ]
      },
      {
        caption: EnumTranslateKey.UI_COMPONENT_TITLE_TR_PROGRAM_PORTAL_REGISTRATION, //Đăng kí Portal
        rows:
          [
            [
              {
                flexSize: 3,
                label: EnumTranslateKey.UI_COMPONENT_TITLE_TR_PROGRAM_IS_PORTAL,
                field: 'isPublic',
                value: '',
                controlType: EnumFormBaseContolType.CHECKBOX,
                type: 'bool',
              },
              {
                flexSize: 3,
                label: EnumTranslateKey.UI_COMPONENT_TITLE_TR_PROGRAM_PUBLIC_PORTAL,
                field: 'publicStatus',
                value: '',
                getByIdObject$: this.propertiesNeedGetByIdObject$,
                getByIdApi: this.propertiesNeedGetByIdApi,
                shownFrom: 'name',
                controlType: EnumFormBaseContolType.DROPDOWN,
                dropdownOptions$: this.groupOptionsPropertiesNeed$,
                type: 'number',
              },
              {
                flexSize: 3,
                label: EnumTranslateKey.UI_COMPONENT_TITLE_TR_PROGRAM_PORTAL_REGIS_FROM,
                field: 'portalRegistFrom',
                value: '',
                controlType: EnumFormBaseContolType.DATEPICKER,
                type: 'date',
              },
              {
                flexSize: 3,
                label: EnumTranslateKey.UI_COMPONENT_TITLE_TR_PROGRAM_PORTAL_REGIS_TO,
                field: 'portalRegistTo',
                value: '',
                controlType: EnumFormBaseContolType.DATEPICKER,
                type: 'date',
              },
            ],
          ]
      },
      {
        caption: EnumTranslateKey.UI_LABEL_TRAINING_COURSE_COSTS, //Chi phí đào tạo
        rows:
          [
            [
              {
                flexSize: 3,
                label: EnumTranslateKey.UI_COMPONENT_TITLE_TR_PROGRAM_STUDENT_NUM,
                field: 'studentNumber',
                value: '',
                controlType: EnumFormBaseContolType.TEXTBOX,
                type: 'number',
              },
              {
                flexSize: 3,
                label: EnumTranslateKey.UI_COMPONENT_TITLE_TR_PROGRAM_EXPECT_CLASS,
                field: 'expectClass',
                value: '',
                controlType: EnumFormBaseContolType.TEXTBOX,
                type: 'number',
              },
              {
                flexSize: 3,
                label: EnumTranslateKey.UI_LABEL_TRAINING_COURSE_COSTS,
                field: 'costStudent',
                value: '',
                controlType: EnumFormBaseContolType.CURRENCY,
                type: 'number',
              },
              {
                flexSize: 3,
                label: EnumTranslateKey.UI_COMPONENT_TITLE_TR_PROGRAM_CURRENCY,
                field: 'trCurrencyId',
                value: '',
                getByIdObject$: this.trCurrencyGetByIdObject$,
                getByIdApi: this.trCurrencyGetByIdApi,
                shownFrom: 'name',
                controlType: EnumFormBaseContolType.DROPDOWN,
                dropdownOptions$: this.trCurrencyOptions$,
                type: 'number',
              },
            ],
          ]
      },
      {
        caption: EnumTranslateKey.UI_COMPONENT_TITLE_TR_LECTURE, //Giảng viên đào tạo
        rows:
          [
            [
              {
                flexSize: 3,
                label: EnumTranslateKey.UI_COMPONENT_TITLE_TR_PROGRAM_CENTER,
                field: 'listCenter',
                value: [],
                type: 'number',
                controlType: EnumFormBaseContolType.CHECKLIST,
                getByIdObject$: this.trCenterGetByIdObject$,
                checklistOptions$: this.trCenterOptions$,
                shownFrom: 'name',
                validators: [
                  {
                    name: 'required',
                    validator: Validators.required,
                    errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED
                  }
                ]
              },
              {
                flexSize: 3,
                label: EnumTranslateKey.UI_COMPONENT_TITLE_TR_PROGRAM_CENTER_LECTURES,
                field: 'listLecture',
                value: [],
                type: 'number',
                controlType: EnumFormBaseContolType.CHECKLIST,
                getByIdObject$: this.trLecturesGetByIdObject$,
                checklistOptions$: this.trLecturesOptions$,
                shownFrom: 'name',
                validators: [
                  {
                    name: 'required',
                    validator: Validators.required,
                    errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED
                  }
                ]
              },
              {
                flexSize: 3,
                label: EnumTranslateKey.UI_COMPONENT_TITLE_SE_DOCUMENT_EDIT,
                field: 'attachmentBuffer',
                value: null,
                controlType: EnumFormBaseContolType.ATTACHMENT,
                assignTo: 'attachedFile',
                type: 'object',
              },
            ],
          ]
      },
      {
        caption: EnumTranslateKey.UI_COMPONENT_TITLE_TR_PROGRAM_POST_TRAINING_EVALUATION, //Đánh giá sau đào tạo
        rows:
          [
            [
              {
                flexSize: 3,
                label: EnumTranslateKey.UI_COMPONENT_TITLE_TR_PROGRAM_CERTIFICATIONS_ACHIEVED,
                field: 'certificate',
                value: '',
                controlType: EnumFormBaseContolType.CHECKBOX,
                type: 'bool',
              },
              {
                flexSize: 3,
                label: EnumTranslateKey.UI_COMPONENT_TITLE_TR_PROGRAM_POST_TRAINING_EVALUATION,
                field: 'trAfterTrain',
                value: '',
                controlType: EnumFormBaseContolType.CHECKBOX,
                type: 'bool',
              },
              {
                flexSize: 3,
                label: EnumTranslateKey.UI_COMPONENT_TITLE_TR_PROGRAM_COMMITMENT_TO_TRAINING,
                field: 'trCommit',
                value: '',
                controlType: EnumFormBaseContolType.CHECKBOX,
                type: 'bool',
              },
              {
                flexSize: 3,
                label: EnumTranslateKey.UI_COMPONENT_TITLE_TR_PROGRAM_DETAIL_TYPE_TRAIN,
                field: 'trTypeId',
                value: '',
                getByIdObject$: this.trTypeGetByIdObject$,
                getByIdApi: this.trTypeGetByIdApi,
                shownFrom: 'name',
                controlType: EnumFormBaseContolType.DROPDOWN,
                dropdownOptions$: this.trTypeOptions$,
                type: 'number',
              },
            ],
          ]
      },
      {
        caption: EnumTranslateKey.UI_COMPONENT_TITLE_TR_PROGRAM_LIST_OF_TRAINING_GROUPS, //Danh sách nhóm đào tạo
        rows: [
          [
            // {
            //   flexSize: 3,
            //   label: EnumTranslateKey.UI_COMPONENT_TITLE_TR_PROGRAM_TITLE_GROUPS,
            //   field: 'listGroupPosition',
            //   value: [],
            //   controlType: EnumFormBaseContolType.CHECKLIST,
            //   shownFrom: 'text',
            //   type: 'string',
            //   checklistOptions$: this.checkListGroupPositionOptions$,
            //   getByIdObject$: this.checkListGroupPositionGetByIdObject$,
            // },
            {
              flexSize: 3,
              label: EnumTranslateKey.UI_LABEL_TIME_IMPORT_POSITION_NAME,
              field: 'listPosition',
              value: [],
              controlType: EnumFormBaseContolType.CHECKLIST,
              shownFrom: 'text',
              type: 'string',
              checklistOptions$: this.checkListJobOptions$,
              getByIdObject$: this.checkListJobGetByIdObject$,
            },
          ],
          [
            {
              flexSize: 12,
              label: EnumTranslateKey.UI_COMPONENT_TITLE_EMPLOYEE_CHECKER,
              field: 'employeeIds',
              value: [],
              controlType: EnumFormBaseContolType.SEEKER,
              type: 'object',
              /* 
                START: Thay đổi thuộc tính của SEEKER để có SELECTOR:
              */
              seekerSourceType: EnumCoreFormControlSeekerSourceType.EMPLOYEE_SEEK,
              multiMode: true,
              objectList$: new BehaviorSubject<any[]>([]),
              getObjectListFrom: 'employeeList',
              getByIdObject$: this.employeeGetByIdObject$,
              getByIdApi: this.employeeGetByIdApi,
              boundFrom: 'id',
              shownFrom: 'fullname',
              preDefinedOuterParam$: this.preDefinedOuterParam$,
              // alsoBindTo: [{ takeFrom: 'positionName', bindTo: 'signPosition' }],
              /* END: WHEN USING controlType === EnumFormBaseContolType.SEEKER */
            },
            {
              flexSize: 12,
              label: EnumTranslateKey.UI_COMMON_EMPTY_STRING,
              field: 'employeeList',
              value: [],
              controlType: EnumFormBaseContolType.HIDDEN,
              type: 'object',
            },
          ],
        ]
      },
    ];
  constructor(
    //private _coreService: CoreService,
    public override dialogService: DialogService,
    private appService: AppService, // CoreService is DEPRECATED!!!
    private trSettingCriCourseService: TrSettingCriCourseService,
    private trRequestService : TrRequestService
  ) {

    super(dialogService);

    this.captionCode = EnumTranslateKey.UI_COMPONENT_TITLE_TR_PROGRAM_DETAIL;

    this.crud = {
      c: api.TR_PROGRAM_CREATE,
      r: api.TR_PROGRAM_READ,
      u: api.TR_PROGRAM_UPDATE,
      d: api.TR_PROGRAM_DELETE,
    };

  }
  ngOnInit(): void { }

  ngAfterViewInit(): void {

    setTimeout(() => {
      this.loading = true;
      this.getListCourse();
      this.getListCenter();
      this.getAllFromSysOrther();
      this.getListJobs()
    })

    this.subscriptions.push(
      this.form.get('isPlanDx')?.valueChanges.subscribe(x => {
        if (!!x) {
          this.form.get('isPlanNc')?.setValue(false)
        }
      })!
    )
    this.subscriptions.push(
      this.form.get('isPlanNc')?.valueChanges.subscribe(x => {
        if (!!x) {
          this.form.get('isPlanDx')?.setValue(false)
        }
      })!
    )

  }

  getListTeacher(){
    console.log(this.form.get('listCenter')?.value);
    this.form.get('listCenter')?.valueChanges.pipe(distinctUntilChanged()).subscribe((x) => {

      if (this.form.get('listCenter')?.value != null && this.form.get('listCenter')?.value != "") {
        this.form.get('listLecture')?.enable();
      } else {
        this.form.get('listLecture')?.setValue(null);
        this.form.get('listLecture')?.disable();
      }
      if(!!x){
        this.trRequestService
        .getListTeacherByCenter(x)
        .pipe(
          map((x: any) => {
            if (x.ok && x.status === 200) {
              const options: { value: number; text: string; checked: boolean }[] = [];
              x.body.innerBody.map((g: any) => {
                options.push({
                  value: g.id,
                  text: g.name,
                  checked : false
                });
              });
              return options;
            } else {
              return [];
            }
          }),
        )
        .subscribe((response) => {
        //  this.form.get('insContractId')?.setValue(null);
        this.trLecturesOptions$.next(response);
        });
      }
      else{
        this.form.get('listLecture')?.setValue(null);
        this.form.get('listLecture')?.disable();
      }
      
    })
  }
  getListJobs() {
    this.subscriptions.push(
      this.appService
      .get(api.HU_JOB_GETLIST).subscribe((res: any) => {
        if (!!res.ok && res.status === 200) {
          const body: IFormatedResponse = res.body
          if (body.statusCode === 200 && !!body.innerBody) {
            // ONLY THEN YOU WILL IMPLEMENT YOUR LOGICS
            const options: { value: number | null; text: string;checked : boolean }[] = [];
            res.body.innerBody.map((g: any) => {
              options.push({
                value: g.id,
                text: g.name,
                checked: false
              })
            })
            this.checkListJobOptions$.next(options);
    
          }
        }
      })
    )
  }

  /* GET FormGroup Instance */
  onFormCreated = (e: FormGroup) => {
    this.form = e;
    this.getListTeacher()
  }
  /* To allow form to be deactivated */
  onFormReinit(e: string): void {
    this.formInitStringValue = e;
  }

  ngOnDestroy(): void {
    this.subscriptions.map(x => x?.unsubscribe())
  }
  getListCenter() {
    this.subscriptions.push(
      this.appService.get("/api/TrLecture/GetDropDownTrainingCenter").subscribe(x => {
        if (x.ok && x.status == 200) {
          const options: ICoreChecklistOption[] = [];
          x.body.innerBody.map((g: any) => {
            options.push({
              value: g.id,
              text: g.name,
              checked: false,
            });
          });
          this.trCenterOptions$.next(options);
        }
      })
    );
  }
  getListCourse() {
    this.subscriptions.push(
      this.trSettingCriCourseService
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
        .subscribe((response) => {
          this.trCourseIdOptions$.next(response);
        })
    );
  }
  getAllFromSysOrther() {
    this.subscriptions.push(
      //tinh chat bat buoc
      this.appService
        .get(api.SYS_OTHERLIST_GETOTHERLISTBYTYPE + 'PROPERTIES_NEED')
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
              this.groupOptionsPropertiesNeed$.next(options);
            }
          }
        }),
      //
      this.appService
        .get(api.SYS_OTHERLIST_GETOTHERLISTBYTYPE + 'TYPE_TRAINING')
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
              this.trTypeOptions$.next(options);
            }
          }
        }),
      //don vi tien te
      this.appService
        .get(api.SYS_OTHERLIST_GETOTHERLISTBYTYPE + 'CURRENCY')
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
              this.trCurrencyOptions$.next(options);
            }
          }
        }),
      //hinh thuc dao tao
      this.appService
        .get(api.SYS_OTHERLIST_GETOTHERLISTBYTYPE + 'TRAINING_FORM')
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
              this.trainFormOptions$.next(options);
            }
          }
        })
    )
  }
}