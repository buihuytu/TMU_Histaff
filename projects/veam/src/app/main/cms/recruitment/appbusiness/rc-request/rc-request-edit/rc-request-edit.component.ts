import { Component } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { EnumTranslateKey, api } from 'alpha-global-constants';
import { BaseEditComponent, ICoreDropdownOption, ICorePageEditCRUD, ICoreRadioOption, ICoreFormSection, EnumFormBaseContolType, EnumCoreFormControlSeekerSourceType, EnumCoreTablePipeType, DialogService, AppService, IFormatedResponse } from 'ngx-histaff-alpha';
import { BehaviorSubject, Subscription, distinctUntilChanged } from 'rxjs';



interface OptionContext {
  value: number;
  text: string;
}

@Component({
  selector: 'app-rc-request-edit',
  templateUrl: './rc-request-edit.component.html',
  styleUrls: ['./rc-request-edit.component.scss']
})

export class RcRequestEditComponent extends BaseEditComponent {
  override entityTable = 'RC_REQUEST';


  // seeker to choose organization
  orgUnitGetByIdApi = api.OM_ORGANIZATION_READ;
  orgUnitGetByIdObject$ = new BehaviorSubject<any>(null);


  // "drop down list" to choose position
  positionGetByIdApi = api.HU_POSITION_READ;
  positionGetByIdObject$ = new BehaviorSubject<any>(null);
  positionOptions$ = new BehaviorSubject<ICoreDropdownOption[]>([]);


  // seeker to choose "one person"
  petitionerGetByIdApi = api.HU_EMPLOYEE_READ;
  petitionerGetByIdObject$ = new BehaviorSubject<any>(null);
  petitionerPreDefinedOuterParam$ = new BehaviorSubject<any>({});


  // "drop down list" to choose "recruitment form"
  recruitmentFormGetByIdApi = api.SYS_OTHERLIST_READ;
  recruitmentFormGetByIdObject$ = new BehaviorSubject<any>(null);
  recruitmentFormOptions$ = new BehaviorSubject<ICoreDropdownOption[]>([]);


  // "drop down list" to choose "workplace"
  workplaceGetByIdApi = api.RC_REQUEST_READ_WORK_ADDRESS;
  workplaceGetByIdObject$ = new BehaviorSubject<any>(null);
  workplaceOptions$ = new BehaviorSubject<ICoreDropdownOption[]>([]);


  // "drop down list" to choose "recruitment reason"
  recruitmentReasonGetByIdApi = api.SYS_OTHERLIST_READ;
  recruitmentReasonGetByIdObject$ = new BehaviorSubject<any>(null);
  recruitmentReasonOptions$ = new BehaviorSubject<ICoreDropdownOption[]>([]);


  // "drop down list" to choose "education level"
  educationLevelGetByIdApi = api.SYS_OTHERLIST_READ;
  educationLevelGetByIdObject$ = new BehaviorSubject<any>(null);
  educationLevelOptions$ = new BehaviorSubject<ICoreDropdownOption[]>([]);


  // "drop down list" to choose "specialize level"
  specializeLevelGetByIdApi = api.SYS_OTHERLIST_READ;
  specializeLevelGetByIdObject$ = new BehaviorSubject<any>(null);
  specializeLevelOptions$ = new BehaviorSubject<ICoreDropdownOption[]>([]);


  // "drop down list" to choose "language"
  languageGetByIdApi = api.SYS_OTHERLIST_READ;
  languageGetByIdObject$ = new BehaviorSubject<any>(null);
  languageOptions$ = new BehaviorSubject<ICoreDropdownOption[]>([]);


  // "drop down list" to choose "language level"
  languageLevelGetByIdApi = api.SYS_OTHERLIST_READ;
  languageLevelGetByIdObject$ = new BehaviorSubject<any>(null);
  languageLevelOptions$ = new BehaviorSubject<ICoreDropdownOption[]>([]);


  // "drop down list" to choose "gender priority"
  genderPriorityGetByIdApi = api.SYS_OTHERLIST_READ;
  genderPriorityGetByIdObject$ = new BehaviorSubject<any>(null);
  genderPriorityOptions$ = new BehaviorSubject<ICoreDropdownOption[]>([]);


  // seeker to choose "one person"
  personInChargeGetByIdApi = api.HU_EMPLOYEE_READ;
  personInChargeGetByIdObject$ = new BehaviorSubject<any>(null);
  personInChargePreDefinedOuterParam$ = new BehaviorSubject<any>({});

  
  subscriptions: Subscription[] = [];
  
  captionCode!: EnumTranslateKey;

  loading: boolean = false;
  
  crud!: ICorePageEditCRUD;

  radioOptions$ = new BehaviorSubject<ICoreRadioOption[]>([
    {
      value: 1,
      text: 'Trong định biên',
    },
    {
      value: 2,
      text: 'Ngoài định biên',
    }
  ])

  sections: ICoreFormSection[] =
    [
      {
        caption: EnumTranslateKey.PERSONNEL_PROFILE_CENTER_PROFILE_INFO_BASIC,
        rows: [
          [
            {
              flexSize: 0,
              label: EnumTranslateKey.UI_COMPONENT_LABEL_ALLOWANCE_ID,
              field: 'id',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              readonly: true,
              hidden: true,
              type: 'text'
            },
          ],
          [
            {
              flexSize: 4,
              label: EnumTranslateKey.UI_COMPONENT_TITLE_CODE_YCTD,
              field: 'code',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              type: 'text'
            },
            {
              flexSize: 4,
              label: EnumTranslateKey.UI_COMPONENT_TITLE_NAME_YCTD,
              field: 'resterName',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              type: 'text'
            }
          ],
          [
            {
              flexSize: 4,
              label: EnumTranslateKey.UI_COMPONENT_TITLE_BOUNDARY_STATUS,
              field: 'listRadio',
              value: '',
              type: 'text',
              controlType: EnumFormBaseContolType.RADIOGROUP,
              radioGroupOptions$: this.radioOptions$,
              verticalMode: false,
              shownFrom: 'text'
            }
          ],
          [
            {
              flexSize: 4,
              label: EnumTranslateKey.UI_COMPONENT_LABEL_DECISION_ORG_NAME,
              field: 'orgId',
              value: '',
              type: 'text',
              controlType: EnumFormBaseContolType.SEEKER,
  
              /*
                START: WHEN USING controlType === EnumFormBaseContolType.SEEKER
                we must pass the three properties bellow:
              */
              seekerSourceType: EnumCoreFormControlSeekerSourceType.ORGANIZATION_UNIT_SEEK,
              getByIdObject$: this.orgUnitGetByIdObject$,
              getByIdApi: this.orgUnitGetByIdApi,
              boundFrom: 'id',
              shownFrom: 'name',
              /* END: WHEN USING controlType === EnumFormBaseContolType.SEEKER */
              
              validators: [
                {
                  name: 'required',
                  validator: Validators.required,
                  errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED
                }
              ]
            },
            {
              flexSize: 4,
              label: EnumTranslateKey.UI_COMPONENT_LABEL_DECISION_POSITION_NAME,
              field: 'positionId',
              value: '',
              type: 'string',
              controlType: EnumFormBaseContolType.DROPDOWN,
              getByIdApi: this.positionGetByIdApi,
              getByIdObject$: this.positionGetByIdObject$,
              dropdownOptions$: this.positionOptions$,
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
              flexSize: 4,
              label: EnumTranslateKey.UI_COMPONENT_TITLE_POSITION_GROUP_OF_RECRUITMENT,
              field: 'positionGroupOfRecruitment',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              type: 'text'
            }
          ],
          [
            {
              flexSize: 4,
              label: EnumTranslateKey.UI_COMPONENT_TITLE_PETITIONER,
              field: 'petitionerId',
              value: '',
              type: 'text',
              controlType: EnumFormBaseContolType.SEEKER,

              /* START: WHEN USING controlType === EnumFormBaseContolType.SEEKER */
              seekerSourceType: EnumCoreFormControlSeekerSourceType.EMPLOYEE_SEEK,
              getByIdApi: this.petitionerGetByIdApi,
              getByIdObject$: this.petitionerGetByIdObject$,
              preDefinedOuterParam$: this.petitionerPreDefinedOuterParam$,
              
              boundFrom: 'id',
              shownFrom: 'fullname',
              // alsoBindTo: [
              //   { takeFrom: 'fullname', bindTo: 'fullName' },
              //   { takeFrom: 'memberPosition', bindTo: 'memberPosition' },
              //   { takeFrom: 'livingCell', bindTo: 'livingCell' }
              // ],
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
              flexSize: 4,
              label: EnumTranslateKey.UI_COMPONENT_TITLE_DATE_REQUEST_WAS_SENT,
              field: 'dateVote',
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
              flexSize: 4,
              label: EnumTranslateKey.UI_COMPONENT_TITLE_RESPONSE_DATE_NEED,
              field: 'dateNeedResponse',
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
          [
            {
              flexSize: 4,
              label: EnumTranslateKey.UI_COMPONENT_TITLE_RECRUITMENT_FORM,
              field: 'recruitmentForm',
              value: '',
              type: 'string',
              controlType: EnumFormBaseContolType.DROPDOWN,
              getByIdApi: this.recruitmentFormGetByIdApi,
              getByIdObject$: this.recruitmentFormGetByIdObject$,
              dropdownOptions$: this.recruitmentFormOptions$,
              shownFrom: 'name'
            },
            {
              flexSize: 4,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_HU_EMPLOYEE_WORKING_ADDRESS,
              field: 'workplace',
              value: '',
              type: 'string',
              controlType: EnumFormBaseContolType.DROPDOWN,
              getByIdApi: this.workplaceGetByIdApi,
              getByIdObject$: this.workplaceGetByIdObject$,
              dropdownOptions$: this.workplaceOptions$,
              shownFrom: 'name'
            },
            {
              flexSize: 4,
              label: EnumTranslateKey.ER_SALARY_LEVEL,
              field: 'salaryLevel',
              value: '',
              controlType: EnumFormBaseContolType.CURRENCY,
              type: 'number',
              pipe: EnumCoreTablePipeType.NUMBER
            }
          ],
          [
            {
              flexSize: 4,
              label: EnumTranslateKey.UI_COMPONENT_TITLE_QUANTITY_AVAILABLE,
              field: 'quantityAvailable',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              type: 'number'
            },
            {
              flexSize: 4,
              label: EnumTranslateKey.UI_COMPONENT_TITLE_BOUNDARY_QUANTITY,
              field: 'boundaryQuantity',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              type: 'number'
            },
            {
              flexSize: 4,
              label: EnumTranslateKey.UI_COMPONENT_TITLE_PLAN_LEAVE,
              field: 'planLeave',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              type: 'number'
            }
          ],
          [
            {
              flexSize: 4,
              label: EnumTranslateKey.UI_COMPONENT_TITLE_REASON_FOR_RECRUITMENT,
              field: 'recruitmentReason',
              value: '',
              type: 'string',
              controlType: EnumFormBaseContolType.DROPDOWN,
              getByIdApi: this.recruitmentReasonGetByIdApi,
              getByIdObject$: this.recruitmentReasonGetByIdObject$,
              dropdownOptions$: this.recruitmentReasonOptions$,
              shownFrom: 'name'
            },
            {
              flexSize: 4,
              label: EnumTranslateKey.UI_COMPONENT_TITLE_NUMBER_TO_BE_RECRUITED,
              field: 'numberNeed',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              type: 'number'
            },
            {
              flexSize: 4,
              label: EnumTranslateKey.UI_COMPONENT_TITLE_IS_BEYOND_BOUNDARY,
              field: 'isBeyondBoundary',
              value: '',
              controlType: EnumFormBaseContolType.CHECKBOX,
              type: 'boolean'
            }
          ],
          [
            {
              flexSize: 4,
              label: EnumTranslateKey.UI_COMPONENT_TITLE_IS_REQUIRE_COMPUTER,
              field: 'isRequireComputer',
              value: '',
              controlType: EnumFormBaseContolType.CHECKBOX,
              type: 'boolean'
            }
          ],
          [
            {
              flexSize: 12,
              label: EnumTranslateKey.UI_COMPONENT_TITLE_DETAIL_EXPLANATION,
              field: 'detailExplanation',
              value: '',
              controlType: EnumFormBaseContolType.TEXTAREA,
              type: 'text'
            },
          ]
        ]
      },
      {
        caption: EnumTranslateKey.UI_COMPONENT_TITLE_DETAILS_REQUIREMENTS,
        rows: [
          [
            {
              flexSize: 4,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_LEARNING_LEVEL,
              field: 'educationLevelId',
              value: '',
              type: 'string',
              controlType: EnumFormBaseContolType.DROPDOWN,
              getByIdApi: this.educationLevelGetByIdApi,
              getByIdObject$: this.educationLevelGetByIdObject$,
              dropdownOptions$: this.educationLevelOptions$,
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
              flexSize: 4,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_HU_CERTIFICATE_LEVEL_TRAIN,
              field: 'specializeLevelId',
              value: '',
              type: 'string',
              controlType: EnumFormBaseContolType.DROPDOWN,
              getByIdApi: this.specializeLevelGetByIdApi,
              getByIdObject$: this.specializeLevelGetByIdObject$,
              dropdownOptions$: this.specializeLevelOptions$,
              shownFrom: 'name',
              validators: [
                {
                  name: 'required',
                  validator: Validators.required,
                  errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED
                }
              ]
            },
          ],
          [
            {
              flexSize: 8,
              label: EnumTranslateKey.UI_OTHER_PROFESSIONAL_QUALIFICATIONS,
              field: 'otherProfessionalQualifications',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              type: 'text'
            }
          ],
          [
            {
              flexSize: 4,
              label: EnumTranslateKey.UI_COMPONENT_TITLE_AGE_FROM,
              field: 'ageFrom',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              type: 'number'
            },
            {
              flexSize: 4,
              label: EnumTranslateKey.UI_COMPONENT_TITLE_AGE_TO,
              field: 'ageTo',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              type: 'number'
            }
          ],
          [
            {
              flexSize: 4,
              label: EnumTranslateKey.UI_COMPONENT_LANGUAGE,
              field: 'languageId',
              value: '',
              type: 'string',
              controlType: EnumFormBaseContolType.DROPDOWN,
              getByIdApi: this.languageGetByIdApi,
              getByIdObject$: this.languageGetByIdObject$,
              dropdownOptions$: this.languageOptions$,
              shownFrom: 'name'
            },
            {
              flexSize: 4,
              label: EnumTranslateKey.UI_COMPONENT_LANGUAGE_LEVEL,
              field: 'languageLevelId',
              value: '',
              type: 'string',
              controlType: EnumFormBaseContolType.DROPDOWN,
              getByIdApi: this.languageLevelGetByIdApi,
              getByIdObject$: this.languageLevelGetByIdObject$,
              dropdownOptions$: this.languageLevelOptions$,
              shownFrom: 'name'
            },
            {
              flexSize: 4,
              label: EnumTranslateKey.UI_COMPONENT_LANGUAGE_POINT,
              field: 'languagePoint',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              type: 'number'
            }
          ],
          [
            {
              flexSize: 4,
              label: EnumTranslateKey.UI_COMPONENT_FOREIGN_LANGUAGE_ABILITY,
              field: 'foreignLanguageAbility',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              type: 'text'
            }
          ],
          [
            {
              flexSize: 4,
              label: EnumTranslateKey.UI_COMPONENT_MINIMUM_YEAR_EXP,
              field: 'minimumYearExp',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              type: 'number'
            },
            {
              flexSize: 4,
              label: EnumTranslateKey.UI_COMPONENT_GENDER_PRIORITY,
              field: 'genderPriorityId',
              value: '',
              type: 'string',
              controlType: EnumFormBaseContolType.DROPDOWN,
              getByIdApi: this.genderPriorityGetByIdApi,
              getByIdObject$: this.genderPriorityGetByIdObject$,
              dropdownOptions$: this.genderPriorityOptions$,
              shownFrom: 'name'
            }
          ],
          [
            {
              flexSize: 8,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_COMPUTER_SKILL,
              field: 'computerLevel',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              type: 'text'
            }
          ],
          [
            {
              flexSize: 12,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_JOB_PURPOSE,
              field: 'jobDescription',
              value: '',
              controlType: EnumFormBaseContolType.TEXTAREA,
              type: 'text',
              validators: [
                {
                  name: 'required',
                  validator: Validators.required,
                  errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED
                }
              ]
            }
          ],
          [
            {
              flexSize: 8,
              label: EnumTranslateKey.UI_COMPONENT_LEVEL_PRIORITY,
              field: 'levelPriority',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              type: 'text'
            },
            {
              flexSize: 4,
              label: EnumTranslateKey.UI_COMPONENT_LABEL_DECISION_UPLOAD_FILE,
              field: 'attachmentBuffer',
              value: null,
              controlType: EnumFormBaseContolType.ATTACHMENT,
              assignTo: 'nameOfFile',
              type: 'object',
            },
          ],
          [
            {
              flexSize: 12,
              label: EnumTranslateKey.UI_COMPONENT_OTHER_REQUIRE,
              field: 'otherRequire',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              type: 'text'
            }
          ],
          [
            {
              flexSize: 4,
              label: EnumTranslateKey.UI_COMPONENT_RC_REQUEST_APPROVE,
              field: 'isApprove',
              value: '',
              controlType: EnumFormBaseContolType.CHECKBOX,
              type: 'boolean'
            }
          ],
          [
            {
              flexSize: 4,
              label: EnumTranslateKey.UI_COMPONENT_RC_PERSON_IN_CHARGE,
              field: 'personInCharge',
              value: '',
              type: 'text',
              controlType: EnumFormBaseContolType.SEEKER,

              /* START: WHEN USING controlType === EnumFormBaseContolType.SEEKER */
              seekerSourceType: EnumCoreFormControlSeekerSourceType.EMPLOYEE_SEEK,
              getByIdApi: this.personInChargeGetByIdApi,
              getByIdObject$: this.personInChargeGetByIdObject$,
              preDefinedOuterParam$: this.personInChargePreDefinedOuterParam$,
              
              boundFrom: 'id',
              shownFrom: 'fullname'
              /* END: WHEN USING controlType === EnumFormBaseContolType.SEEKER */
            }
          ]
        ]
      }
    ];

  constructor (
    public override dialogService: DialogService,
    private appService: AppService,
  ) {
    super(dialogService);

    this.captionCode = EnumTranslateKey.UI_COMPONENT_TITLE_RC_REQUEST_EDIT;

    this.crud = {
      c: api.RC_REQUEST_CREATE,
      r: api.RC_REQUEST_READ,
      u: api.RC_REQUEST_UPDATE,
      d: api.RC_REQUEST_DELETE,
    };
  }

  ngOnInit(): void {
    this.subscriptions.push(
      this.appService.get("/api/RcRequest/GetDropDownRecruitmentForm?code=RC_FORM").subscribe(res => {
        const options: OptionContext[] = [];
        
        res.body.innerBody.map((g: any) => {
          options.push({
            value: g.id,
            text: g.name
          })
        });

        this.recruitmentFormOptions$.next(options);
      })
    );

    this.subscriptions.push(
      this.appService.get("/api/RcRequest/GetDropDownRecruitmentReason?code=RC_REASON").subscribe(res => {
        const options: OptionContext[] = [];
        
        res.body.innerBody.map((g: any) => {
          options.push({
            value: g.id,
            text: g.name
          })
        });

        this.recruitmentReasonOptions$.next(options);
      })
    );

    this.subscriptions.push(
      this.appService.get(api.SYS_OTHERLIST_GETOTHERLISTBYTYPE + "LEARNING_LEVEL").subscribe(res => {
        const options: OptionContext[] = [];
        
        res.body.innerBody.map((g: any) => {
          options.push({
            value: g.id,
            text: g.name
          })
        });

        this.educationLevelOptions$.next(options);
      })
    );

    this.subscriptions.push(
      this.appService.get(api.SYS_OTHERLIST_GETOTHERLISTBYTYPE + "MAJOR").subscribe(res => {
        const options: OptionContext[] = [];
        
        res.body.innerBody.map((g: any) => {
          options.push({
            value: g.id,
            text: g.name
          })
        });

        this.specializeLevelOptions$.next(options);
      })
    );

    this.subscriptions.push(
      this.appService.get(api.SYS_OTHERLIST_GETOTHERLISTBYTYPE + "LANGUAGE").subscribe(res => {
        const options: OptionContext[] = [];
        
        res.body.innerBody.map((g: any) => {
          options.push({
            value: g.id,
            text: g.name
          })
        });

        this.languageOptions$.next(options);
      })
    );

    this.subscriptions.push(
      this.appService.get(api.SYS_OTHERLIST_GETOTHERLISTBYTYPE + "LANGUAGE_LEVEL").subscribe(res => {
        const options: OptionContext[] = [];
        
        res.body.innerBody.map((g: any) => {
          options.push({
            value: g.id,
            text: g.name
          })
        });

        this.languageLevelOptions$.next(options);
      })
    );

    this.subscriptions.push(
      this.appService.get(api.SYS_OTHERLIST_GETOTHERLISTBYTYPE + "GENDER").subscribe(res => {
        const options: OptionContext[] = [];
        
        res.body.innerBody.map((g: any) => {
          options.push({
            value: g.id,
            text: g.name
          })
        });

        this.genderPriorityOptions$.next(options);
      })
    );
  }

  onFormCreated(e: FormGroup): void {
    this.form = e;

    this.subscriptions.push(
      // <== Outer push
      this.form.get('orgId')?.valueChanges.pipe(distinctUntilChanged())
        .subscribe(x => {
          if (!!x) {
            this.subscriptions.push(
              // <== Inner push
              this.appService.get(this.orgUnitGetByIdApi + '?id=' + x).subscribe((o) => {
                if (o.ok && o.status === 200) {
                  const body: IFormatedResponse = o.body;
                  if (body.statusCode === 200 && !!body.innerBody) {
                    this.orgUnitGetByIdObject$.next(body.innerBody);
                  } else {
                    // write code logic when "else"
                  }
                }
              }),

              this.appService.get("/api/RcExams/GetPositionIsEmptyOwner?orgId=" + this.form.get("orgId")?.value).subscribe(res => {
                const options: OptionContext[] = [];
                
                res.body.innerBody.map((g: any) => {
                  options.push({
                    value: g.id,
                    text: g.name
                  })
                });
    
                this.positionOptions$.next(options);
              }),

              this.appService.get("/api/RcRequest/GetWorkingAddressAccordingToCompany?orgId=" + this.form.get("orgId")?.value).subscribe(res => {
                const options: OptionContext[] = [];
                
                res.body.innerBody.map((g: any) => {
                  options.push({
                    value: g.id,
                    text: g.name
                  })
                });
    
                this.workplaceOptions$.next(options);
              })
            );
          }
          else {
            // write code logic when "else"
          }
        })!
    );
  }

  onFormReinit(e: string): void {
    this.formInitStringValue = e;
  }
}