import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { AppService, BaseEditComponent, CoreFormService, CustomValidators, DialogService, EnumCoreFormControlSeekerSourceType, EnumFormBaseContolType, ICoreChecklistOption, ICoreDropdownOption, ICoreFormSection, ICorePageEditCRUD, ICorePageEditColumnComposition, IFormatedResponse } from 'ngx-histaff-alpha';
import { BehaviorSubject, Subscription, distinctUntilChanged, filter, forkJoin, map } from 'rxjs';
import { TrPlanEditService } from './TrPlanEditService';
import { EnumTranslateKey, api } from 'alpha-global-constants';

@Component({
  selector: 'app-trplan-edit',
  templateUrl: './trplan-edit.component.html',
  styleUrls: ['./trplan-edit.component.scss'],
})
export class TrplanEditComponent extends BaseEditComponent {
  loading: boolean = false;
  override entityTable = 'TR_PLAN';
  subsctiptions: Subscription[] = [];
  captionCode!: EnumTranslateKey;
  formComposition!: ICorePageEditColumnComposition[][];

  orgGetByIdObject$ = new BehaviorSubject<any>(null);
  orgGetByIdApi = api.HU_ORGANIZATION_READ;

  courseOptions$ = new BehaviorSubject<ICoreDropdownOption[]>([]);
  courseGetByIdObject$ = new BehaviorSubject<any>(null);
  courseGetByIdApi = api.TR_COURSE_READ;

  trFormOptions$ = new BehaviorSubject<ICoreDropdownOption[]>([]);
  trFormGetByIdObject$ = new BehaviorSubject<any>(null);
  trFormGetByIdApi = api.SYS_OTHERLIST_READ;

  propNeedOptions$ = new BehaviorSubject<ICoreDropdownOption[]>([]);
  propNeedGetByIdObject$ = new BehaviorSubject<any>(null);
  propNeedGetByIdApi = api.SYS_OTHERLIST_READ;

  typeTrainOptions$ = new BehaviorSubject<ICoreDropdownOption[]>([]);
  typeTrainGetByIdObject$ = new BehaviorSubject<any>(null);
  typeTrainGetByIdApi = api.SYS_OTHERLIST_READ;

  jobFamilyOptions$ = new BehaviorSubject<ICoreDropdownOption[]>([]);
  jobFamilyGetByIdObject$ = new BehaviorSubject<any>(null);
  jobFamilyGetByIdApi = api.TR_PLAN_GET_BY_TYPE_ID;

  jobcheckListFamilyOptions$ = new BehaviorSubject<ICoreChecklistOption[]>([]);
  // jobcheckListFamilyOptions$ = api.

  jobOptions$ = new BehaviorSubject<ICoreChecklistOption[]>([]);
  jobGetByIdObject$ = new BehaviorSubject<any>(null);
  jobGetByIdApi = api.HU_JOB_READ;

  centerOptions$ = new BehaviorSubject<ICoreDropdownOption[]>([]);
  centerGetByIdObject$ = new BehaviorSubject<any>(null);
  centerGetByIdApi = api.TR_CENTER_READ;

  apiParams: string[] = [
    'PROPERTIES_NEED',
    'TRAINING_FORM',
    'TYPE_TRAINING',
    'HU_JOB_FAMILY'
  ];

  crud!: ICorePageEditCRUD;
  sections: ICoreFormSection[] = [
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_GENERAL_INFO,
      rows: [
        [
          {
            flexSize: 0,
            label: EnumTranslateKey.UI_COMPONENT_LABEL_LANGUAGE_ID,
            field: 'id',
            value: '',
            controlType: EnumFormBaseContolType.TEXTBOX,
            readonly: true,
            hidden: true,
            type: 'text',
          },
          {
            flexSize: 6,
            label: EnumTranslateKey.UI_COMPONENT_TITLE_TR_PLAN_ORGANIZATION,
            field: 'orgId',
            value: null,
            controlType: EnumFormBaseContolType.SEEKER,
            seekerSourceType: EnumCoreFormControlSeekerSourceType.ORGANIZATION_UNIT_SEEK,
            getByIdObject$: this.orgGetByIdObject$,
            getByIdApi: this.orgGetByIdApi,
            boundFrom: 'id',
            shownFrom: 'name',
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
            label: EnumTranslateKey.UI_COMPONENT_TITLE_TR_PLAN_YEAR,
            field: 'year',
            value: '',
            controlType: EnumFormBaseContolType.TEXTBOX,
            readonly: false,
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
                errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_MIN_LENGTH,
              },
            ],
          },
        ],
        [
          {
            flexSize: 6,
            label: EnumTranslateKey.UI_COMPONENT_TITLE_TR_PLAN_CODE,
            field: 'code',
            value: '',
            controlType: EnumFormBaseContolType.TEXTBOX,
            readonly: false,
            type: 'text',
            disabled: true,
            // hidden: true,
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
            flexSize: 3,
            label: EnumTranslateKey.UI_COMPONENT_TITLE_TR_PLAN_COURSE,
            field: 'courseId',
            value: null,
            getByIdObject$: this.courseGetByIdObject$,
            getByIdApi: this.courseGetByIdApi,
            controlType: EnumFormBaseContolType.DROPDOWN,
            shownFrom: 'courseName',
            dropdownOptions$: this.courseOptions$,
            type: 'text',
          },
          {
            flexSize: 3,
            label: EnumTranslateKey.UI_LABEL_TRAINING_COURSE_TRAIN_FEILD,
            field: 'trTrainFeildName',
            value: null,
            controlType: EnumFormBaseContolType.TEXTBOX,
            readonly: true,
            type: 'string',
          },
        ],
        [
          {
            flexSize: 3,
            label: EnumTranslateKey.UI_COMPONENT_TITLE_TR_PLAN_FORM_TRAINING,
            field: 'formTrainingId',
            value: '',
            controlType: EnumFormBaseContolType.DROPDOWN,
            readonly: false,
            type: 'number',
            shownFrom: 'name',
            getByIdObject$: this.trFormGetByIdObject$,
            getByIdApi: this.trFormGetByIdApi,
            dropdownOptions$: this.trFormOptions$,
          },
          {
            flexSize: 3,
            label: EnumTranslateKey.UI_COMPONENT_TITLE_TR_PLAN_PROPERTITES_NEED_ID,
            field: 'propertiesNeedId',
            value: '',
            controlType: EnumFormBaseContolType.DROPDOWN,
            readonly: false,
            type: 'number',
            shownFrom: 'name',
            getByIdObject$: this.propNeedGetByIdObject$,
            getByIdApi: this.propNeedGetByIdApi,
            dropdownOptions$: this.propNeedOptions$,
          },
          {
            flexSize: 6,
            label: EnumTranslateKey.UI_COMPONENT_TITLE_TR_PLAN_ADDRESS_TRAINING,
            field: 'addressTraining',
            value: '',
            controlType: EnumFormBaseContolType.TEXTBOX,
            readonly: false,
            type: 'text',
          },
        ],
        [
          {
            flexSize: 6,
            label: EnumTranslateKey.UI_COMPONENT_TITLE_TR_PLAN_CONTENT,
            field: 'content',
            value: '',
            controlType: EnumFormBaseContolType.TEXTAREA,
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
          {
            flexSize: 6,
            label: EnumTranslateKey.UI_COMPONENT_TITLE_TR_PLAN_NAME,
            field: 'name',
            value: '',
            controlType: EnumFormBaseContolType.TEXTAREA,
            readonly: false,
            type: 'text',
          },
        ],
        // [
        //   {
        //     flexSize: 6,
        //     label: EnumTranslateKey.UI_COMPONENT_TITLE_TR_PLAN_START_DATE_REAL,
        //     field: 'startDateReal',
        //     value: '',
        //     controlType: EnumFormBaseContolType.DATEPICKER,
        //     readonly: false,
        //     type: 'date',
        //     validators: [
        //       {
        //         name: 'startDateReal',
        //         validator: TrplanEditComponent.startDateReal,
        //         errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_MIN,
        //       },
        //     ]
        //   },
        //   {
        //     flexSize: 6,
        //     label: EnumTranslateKey.UI_COMPONENT_TITLE_TR_PLAN_END_DATE_REAL,
        //     field: 'endDateReal',
        //     value: '',
        //     controlType: EnumFormBaseContolType.DATEPICKER,
        //     readonly: false,
        //     type: 'date',
        //     validators: [
        //       {
        //         name: 'endDateReal',
        //         validator: TrplanEditComponent.endDateReal,
        //         errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_MIN,
        //       },
        //     ]
        //   },
        // ],
        [
          {
            flexSize: 3,
            label: EnumTranslateKey.UI_COMPONENT_TITLE_TR_PLAN_PERSON_NUM_REAL,
            field: 'personNumReal',
            value: '',
            controlType: EnumFormBaseContolType.TEXTBOX,
            readonly: false,
            type: 'number',
          },
          {
            flexSize: 3,
            label: EnumTranslateKey.UI_COMPONENT_TITLE_TR_PLAN_PERSON_NUM_PLAN,
            field: 'personNumPlan',
            value: '',
            controlType: EnumFormBaseContolType.TEXTBOX,
            readonly: false,
            type: 'number',
          },
          {
            flexSize: 3,
            label: EnumTranslateKey.UI_COMPONENT_TITLE_TR_PLAN_START_DATE_PLAN,
            field: 'startDatePlan',
            value: '',
            controlType: EnumFormBaseContolType.DATEPICKER,
            readonly: false,
            type: 'date',
            validators: [
              {
                name: 'startDatePlan',
                validator: TrplanEditComponent.startDatePlan,
                errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_MIN,
              },
            ]
          },
          {
            flexSize: 3,
            label: EnumTranslateKey.UI_COMPONENT_TITLE_TR_PLAN_END_DATE_PLAN,
            field: 'endDatePlan',
            value: '',
            controlType: EnumFormBaseContolType.DATEPICKER,
            readonly: false,
            type: 'date',
            validators: [
              {
                name: 'endDatePlan',
                validator: TrplanEditComponent.endDatePlan,
                errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_MIN,
              },
            ]
          },
        ],
        [
          {
            flexSize: 3,
            label: EnumTranslateKey.UI_COMPONENT_TITLE_TR_PLAN_EXPECTED_COST,
            field: 'expectedCost',
            value: '',
            controlType: EnumFormBaseContolType.CURRENCY,
            readonly: false,
            type: 'number',
          },
          {
            flexSize: 3,
            label: EnumTranslateKey.UI_COMPONENT_TITLE_TR_PLAN_ACTUAL_COST,
            field: 'actualCost',
            value: '',
            controlType: EnumFormBaseContolType.CURRENCY,
            readonly: false,
            type: 'number',
          },
          {
            flexSize: 3,
            label: EnumTranslateKey.UI_COMPONENT_TITLE_TR_PLAN_CENTER,
            field: 'centerId',
            value: null,
            getByIdObject$: this.centerGetByIdObject$,
            controlType: EnumFormBaseContolType.DROPDOWN,
            getByIdApi: this.centerGetByIdApi,
            shownFrom: 'nameCenter',
            dropdownOptions$: this.centerOptions$,
            type: 'number',
          },
          {
            flexSize: 3,
            label: EnumTranslateKey.UI_COMPONENT_TITLE_TR_PLAN_TYPE_TRAINING_ID,
            field: 'typeTrainingId',
            value: '',
            controlType: EnumFormBaseContolType.DROPDOWN,
            readonly: false,
            type: 'number',
            shownFrom: 'name',
            getByIdObject$: this.typeTrainGetByIdObject$,
            getByIdApi: this.typeTrainGetByIdApi,
            dropdownOptions$: this.typeTrainOptions$,
          },
        ],
        [
          {
            flexSize: 3,
            label: EnumTranslateKey.UI_COMPONENT_TITLE_TR_PLAN_EVALUATION_DUE_DATE1,
            field: 'evaluationDueDate1',
            value: '',
            controlType: EnumFormBaseContolType.DATEPICKER,
            type: 'date',
            hidden: false
          },
          {
            flexSize: 3,
            label: EnumTranslateKey.UI_COMPONENT_TITLE_TR_PLAN_EVALUATION_DUE_DATE2,
            field: 'evaluationDueDate2',
            value: '',
            controlType: EnumFormBaseContolType.DATEPICKER,
            type: 'date',
            // pipe: EnumCoreTablePipeType.DATE,
            hidden: false
          },
          {
            flexSize: 3,
            label: EnumTranslateKey.UI_COMPONENT_TITLE_TR_PLAN_EVALUATION_DUE_DATE3,
            field: 'evaluationDueDate3',
            value: '',
            controlType: EnumFormBaseContolType.DATEPICKER,
            type: 'date',
            // pipe: EnumCoreTablePipeType.DATE,
            hidden: false
          }
        ],
        [
          {
            flexSize: 3,
            label: EnumTranslateKey.UI_COMPONENT_TITLE_TR_PLAN_EXPECT_CLASS,
            field: 'expectClass',
            value: '',
            controlType: EnumFormBaseContolType.TEXTBOX,
            type: 'string',
          },
          {
            flexSize: 3,
            label: EnumTranslateKey.UI_COMPONENT_TITLE_TR_PLAN_IS_COMMIT_TRAIN,
            field: 'isCommitTrain',
            value: '',
            controlType: EnumFormBaseContolType.CHECKBOX,
            type: 'boolean',
          },
          {
            flexSize: 3,
            label: EnumTranslateKey.UI_COMPONENT_TITLE_TR_PLAN_IS_POST_TRAIN,
            field: 'isPostTrain',
            value: '',
            controlType: EnumFormBaseContolType.CHECKBOX,
            type: 'boolean',
          },
          {
            flexSize: 3,
            label: EnumTranslateKey.UI_COMPONENT_TITLE_TR_PLAN_IS_CERTIFICATE,
            field: 'isCertificate',
            value: '',
            controlType: EnumFormBaseContolType.CHECKBOX,
            type: 'boolean',
          }
        ],
        [
          {
            flexSize: 3,
            label: EnumTranslateKey.UI_COMPONENT_TITLE_TR_PLAN_CERTIFICATE_NAME,
            field: 'certificateName',
            value: '',
            controlType: EnumFormBaseContolType.TEXTBOX,
            readonly: false,
            hidden: true,
            type: 'string',
           validators: [
              {
                name: 'required',
                validator: Validators.required,
                errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
              },
            ]
          },
        ]
      ],
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_LIST_GROUP_TRAINING,
      rows:[
        [
          {
            flexSize: 4,
            label: EnumTranslateKey.UI_COMPONENT_TITLE_TR_PLAN_GROUP_POS,
            field: 'listJobFamilyIds',
            value: [],
            controlType: EnumFormBaseContolType.CHECKLIST,
            checklistOptions$: this.jobcheckListFamilyOptions$,
            getByIdObject$: this.jobFamilyGetByIdObject$,
            shownFrom: 'name',
            type: 'string',
            readonly: false,
          },
          {
            flexSize: 4,
            label: EnumTranslateKey.UI_LABEL_TIME_IMPORT_POSITION_NAME,
            field: 'listJobIds',
            value: [],
            controlType: EnumFormBaseContolType.CHECKLIST,
            readonly: false,
            type: 'number',
            shownFrom: 'name',
            getByIdObject$: this.jobGetByIdObject$,
            // getByIdApi: this.jobGetByIdApi,
            checklistOptions$: this.jobOptions$,
          },
          {
            flexSize: 4,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_FAMILY_UPLOAD_FILE,
            field: 'attachmentBuffer',
            value: null,
            controlType: EnumFormBaseContolType.ATTACHMENT,
            assignTo: 'attachment',
            type: 'object',
          },
        ],
        [
          {
            flexSize: 12,
            label: EnumTranslateKey.UI_COMPONENT_TITLE_TR_PLAN_NOTE,
            field: 'note',
            value: '',
            controlType: EnumFormBaseContolType.TEXTBOX,
            type: 'text',
          },
        ],
      ]
    }
  ];
  constructor(
    public override dialogService: DialogService,
    private trPlanEditService: TrPlanEditService,
    private appService: AppService,
    private coreFormService: CoreFormService,
  ) {
    super(dialogService);

    this.captionCode = EnumTranslateKey.UI_COMPONENT_TITLE_TR_PLAN;

    this.crud = {
      c: api.TR_PLAN_CREATE,
      r: api.TR_PLAN_READ,
      u: api.TR_PLAN_UPDATE,
      d: api.TR_PLAN_DELETE_IDS,
    };
  }

  /* GET FormGroup Instance */
  onFormCreated(e: FormGroup): void {
    this.form = e;
    setTimeout(() => {
      this.form.get('certificateName')?.clearValidators();
      this.form.get('certificateName')?.updateValueAndValidity();
      if (this.form.get('id')?.value === 0) {
        var certificateObj = this.coreFormService.getFormBaseControlByName(
          this.sections, 'certificateName'
        );
        if (certificateObj) {
          certificateObj.hidden = true;
          certificateObj.flexSize = 0;
        }
      }
    }, 10);
    this.subsctiptions.push(
      this.form.get('isCertificate')?.valueChanges.subscribe((x) => {
        var certificateObj = this.coreFormService.getFormBaseControlByName(
          this.sections, 'certificateName'
        );
        
        if (!!x) {
          if (certificateObj) {
            certificateObj.hidden = false;
            certificateObj.flexSize = 3;
            this.form.get('certificateName')?.setValidators([Validators.required]);
            this.form.get('certificateName')?.updateValueAndValidity();
            this.form.get('certificateName')?.reset();
          }
        } else {
          if (certificateObj) {
            certificateObj.hidden = true;
            certificateObj.flexSize = 0;
            this.form.get('certificateName')?.clearValidators();
            this.form.get('certificateName')?.updateValueAndValidity();
            this.form.get('certificateName')?.patchValue(null);
          }
        }
      })!
    );

    this.subsctiptions.push(
      this.form.get('typeTrainingId')?.valueChanges.pipe(distinctUntilChanged()).subscribe(x=>{
        var date1Obj = this.coreFormService.getFormBaseControlByName(
          this.sections, 'evaluationDueDate1'
        );
        var date2Obj = this.coreFormService.getFormBaseControlByName(
          this.sections, 'evaluationDueDate2'
        );
        var date3Obj = this.coreFormService.getFormBaseControlByName(
          this.sections, 'evaluationDueDate3'
        );
        if (!! x && x === 11772){ 
          if(date1Obj){
            date1Obj.hidden = false;
            date1Obj.flexSize = 3;
            this.form.get('evaluationDueDate1')?.reset();
          }
          if(date2Obj){
            date2Obj.hidden = false;
            date2Obj.flexSize = 3;
            this.form.get('evaluationDueDate2')?.reset();
          }
          if(date3Obj){
            date3Obj.hidden = false;
            date3Obj.flexSize = 3;
            this.form.get('evaluationDueDate3')?.reset();
          }
        } else{
          if (date1Obj) {
            date1Obj.hidden = true;
            date1Obj.flexSize = 0;
            this.form.get('evaluationDueDate1')?.patchValue(new Date());
          }
          if (date2Obj) {
            date2Obj.hidden = true;
            date2Obj.flexSize = 0;
            this.form.get('evaluationDueDate2')?.patchValue(new Date());
          }
          if (date3Obj) {
            date3Obj.hidden = true;
            date3Obj.flexSize = 0;
            this.form.get('evaluationDueDate3')?.patchValue(new Date());
          }
        }
      })!,
    )

    this.subsctiptions.push(
      this.appService.get(api.TR_PLAN_GET_CODE)
      .pipe(
        map((x: any) => {
          let y: string = '';
          y = x.body.innerBody.code;
          return y;
        })
      ).subscribe((response) =>{
        if(this.form.get('code')?.value == '')
        this.form.get('code')?.patchValue(response)
      })
    )
  }


  /* To allow form to be deactivated */
  onFormReinit(e: string): void {
    this.formInitStringValue = e;
    setTimeout(() =>{
      this.form.get('courseId')?.valueChanges.pipe(distinctUntilChanged())
      .pipe(
        filter(_ => {
          const touched = this.form.get('courseId')?.touched;
          return !!touched
        })
      ).subscribe(x => {
        if (!!x) {
          this.subsctiptions.push( // <== Inner push
            this.appService
              .get(api.TR_COURSE_READ + '?id=' + x)
              .subscribe((res: any) => {
                if (!!res.ok && res.status === 200) {
                  const body: IFormatedResponse = res.body
                  if (body.statusCode === 200 && !!body.innerBody) {
                    this.form.get('trTrainFeildName')?.setValue(body.innerBody.trTrainFieldName);
                    this.form.get('expectedCost')?.setValue(body.innerBody.costs);
                    console.log(body.innerBody.trTrainFeildName);
                    console.log(body.innerBody.costs);
                  }
                }
              })
          ) // Close inner push
        } else {
          this.form.get('expectedCost')?.setValue(null);
          this.form.get('trTrainFeildName')?.setValue(null);
        }
      });
    });
    this.subsctiptions.push(
      this.form.get('listJobFamilyIds')?.valueChanges!.pipe(distinctUntilChanged())
        .subscribe((x: string[]) => {
          if (!!x) {
            this.trPlanEditService
              .getJobByJobFamId(x)
              .pipe(
                map((x: any) => {
                  if (x.ok && x.status == 200) {
                    const options: { value: number; text: string }[] = [];
                    x.body.innerBody.map((get: any) => {
                      options.push({
                        value: get.id,
                        text: get.name,
                      });
                    });
                    return options;
                  } else {
                    return [];
                  }
                })
              )
              .subscribe((response: any) => {
                this.jobOptions$.next(response);
                this.loading = false;
              });
          } 
        })!
    );
  }
  ngOnInit(): void {
    this.loading = true;
    this.subsctiptions.push(
      this.trPlanEditService
        .getAllCenter()
        .pipe(
          map((x: any) => {
            if (x.ok && x.status === 200) {
              const options: { value: number; text: string }[] = [];
              x.body.innerBody.map((y: any) => {
                options.push({
                  value: y.id,
                  text: y.nameCenter,
                });
              });
              return options;
            } else {
              return [];
            }
          })
        )
        .subscribe((response) => {
          this.centerOptions$.next(response);
          this.loading = false;
        })
    );
    this.subsctiptions.push(
      this.trPlanEditService
        .getAllCourse()
        .pipe(
          map((x: any) => {
            if (x.ok && x.status === 200) {
              const options: { value: number; text: string }[] = [];
              x.body.innerBody.map((y: any) => {
                options.push({
                  value: y.id,
                  text: y.courseName,
                });
              });
              return options;
            } else {
              return [];
            }
          })
        )
        .subscribe((response) => {
          this.courseOptions$.next(response);
          this.loading = false;
        })
    );
  }

  ngAfterViewInit() : void{
    setTimeout(() => {
      this.getValueDropdown();

      this.trPlanEditService.getALLJobFamilyByCode()
      .pipe(
        map((x: any) =>{
          if(x.ok && x.status == 200){
            const options: {value: number | null; text: string}[] =[];
            x.body.innerBody.map((g: any) => {
              options.push({
                value: g.id,
                text: g.name,
              });
            });
            return options;
          }else{
            return [];
          }
        })
      )
      .subscribe((response: any)=>{
        this.jobcheckListFamilyOptions$.next(response);
        this.loading = false;
      });

      var date1Obj = this.coreFormService.getFormBaseControlByName(
        this.sections,
        'evaluationDueDate1'
      );
      var date2Obj = this.coreFormService.getFormBaseControlByName(
        this.sections,
        'evaluationDueDate2'
      );
      var date3Obj = this.coreFormService.getFormBaseControlByName(
        this.sections,
        'evaluationDueDate3'
      );
      if (date1Obj) {
        date1Obj.hidden = true;
        date1Obj.flexSize = 0;
      }
      if (date2Obj) {
        date2Obj.hidden = true;
        date2Obj.flexSize = 0;
      }
      if (date3Obj) {
        date3Obj.hidden = true;
        date3Obj.flexSize = 0;
      }
    })
  }

  getValueDropdown() {
    forkJoin(
      this.apiParams.map((param) =>
        this.appService.get(api.SYS_OTHERLIST_GETOTHERLISTBYTYPE + param)
      )
    ).subscribe((responses) => {
      responses.forEach((item, index) => {
        if (item.body.statusCode == 200 && item.ok == true) {
          const options: { value: number | null; text: string }[] = [];
          item.body.innerBody.map((g: any) => {
            options.push({
              value: g.id,
              text: g.name,
            });
          });
          const param = this.apiParams[index];
          switch (param) {
            case 'TRAINING_FORM':
              this.trFormOptions$.next(options);
              break;
            case 'PROPERTIES_NEED':
              this.propNeedOptions$.next(options);
              break;
            case 'TYPE_TRAINING':
              this.typeTrainOptions$.next(options);
              break;
            default:
              break;
          }
        }
      });
    });
  }

  protected static startDatePlan(date: AbstractControl): any | null {
    let valid = true;
    let errorMessage = '';
    const startDatePlan = date.value;
    const endDatePlan = date.parent?.get('endDatePlan')?.value;
    if (endDatePlan != '' && endDatePlan != null && startDatePlan != null) {
      if (startDatePlan > new Date(endDatePlan)) {
        valid = false;
        errorMessage = EnumTranslateKey.UI_COMPONENT_TITLE_TR_PLAN_START_DATE_LESS_THAN_END_DATE;
        return CustomValidators.core('startDatePlan', false, errorMessage)(date);
      } else {
        date.parent?.get('startDatePlan')?.setErrors(null);
        date.parent?.get('endDatePlan')?.setErrors(null);
      }
    }
  }

  protected static endDatePlan(date: AbstractControl): any | null {
    let valid = true;
    let errorMessage = '';
    const startDatePlan = date.parent?.get('startDatePlan')?.value;
    const endDatePlan = date.value;
    if (endDatePlan != '' && endDatePlan != null) {
      if (startDatePlan != '' && startDatePlan != null && endDatePlan < new Date(startDatePlan)) {
        valid = false;
        errorMessage = EnumTranslateKey.UI_COMPONENT_TITLE_TR_PLAN_END_DATE_PLAN_MORE_THAN_START_DATE_PLAN;
        return CustomValidators.core('endDatePlan', false, errorMessage)(date);
      } else {
        date.parent?.get('startDatePlan')?.setErrors(null);
        date.parent?.get('endDatePlan')?.setErrors(null);
      }
    } else {
      // date.parent?.get("effectiveDate")?.setErrors(null);
      date.parent?.get('endDatePlan')?.setErrors(null);
    }
  }

  protected static startDateReal(date: AbstractControl): any | null {
    let valid = true;
    let errorMessage = '';
    const startDateReal = date.value;
    const endDateReal = date.parent?.get('endDateReal')?.value;
    if (endDateReal != '' && endDateReal != null && startDateReal != null) {
      if (startDateReal > new Date(endDateReal)) {
        valid = false;
        errorMessage = EnumTranslateKey.UI_COMPONENT_TITLE_TR_PLAN_START_DATE_REAL_LESS_THAN_END_DATE_REAL;
        return CustomValidators.core('startDateReal', false, errorMessage)(date);
      } else {
        date.parent?.get('startDateReal')?.setErrors(null);
        date.parent?.get('endDateReal')?.setErrors(null);
      }
    }
  }

  protected static endDateReal(date: AbstractControl): any | null {
    let valid = true;
    let errorMessage = '';
    const startDateReal = date.parent?.get('startDateReal')?.value;
    const endDateReal = date.value;
    if (endDateReal != '' && endDateReal != null) {
      if (startDateReal != '' && startDateReal != null && endDateReal < new Date(startDateReal)) {
        valid = false;
        errorMessage = EnumTranslateKey.UI_COMPONENT_TITLE_TR_PLAN_END_DATE_REAL_MORE_THAN_START_DATE_REAL;
        return CustomValidators.core('endDateReal', false, errorMessage)(date);
      } else {
        date.parent?.get('startDateReal')?.setErrors(null);
        date.parent?.get('endDateReal')?.setErrors(null);
      }
    } else {
      // date.parent?.get("effectiveDate")?.setErrors(null);
      date.parent?.get('endDateReal')?.setErrors(null);
    }
  }
}
