import { Component } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { EnumTranslateKey, api } from 'alpha-global-constants';
import { BaseEditComponent, ICoreDropdownOption, ICorePageEditCRUD, ICoreFormSection, EnumFormBaseContolType, EnumCoreFormControlSeekerSourceType, DialogService, AppService, IFormatedResponse } from 'ngx-histaff-alpha';
import { Subscription, BehaviorSubject, distinctUntilChanged } from 'rxjs';

interface OptionContext {
  value: number;
  text: string;
}

@Component({
  selector: 'app-at-time-work-standard-edit',
  templateUrl: './at-time-work-standard-edit.component.html',
  styleUrl: './at-time-work-standard-edit.component.scss'
})

export class AtTimeWorkStandardEditComponent extends BaseEditComponent {
  override entityTable = 'AT_TIME_WORK_STANDARD';
  
  subscriptions: Subscription[] = [];
  
  captionCode!: EnumTranslateKey;


  // seeker to choose organization
  orgUnitGetByIdApi = api.OM_ORGANIZATION_READ;
  orgUnitGetByIdObject$ = new BehaviorSubject<any>(null);


  // "drop down list" to choose object employee
  objEmployeeGetByIdApi = api.SYS_OTHERLIST_READ;
  objEmployeeGetByIdObject$ = new BehaviorSubject<any>(null);
  objEmployeeOptions$ = new BehaviorSubject<ICoreDropdownOption[]>([]);


  // "drop down list" to choose work environment
  workEnvironmentGetByIdApi = api.SYS_OTHERLIST_READ;
  workEnvironmentGetByIdObject$ = new BehaviorSubject<any>(null);
  workEnvironmentOptions$ = new BehaviorSubject<ICoreDropdownOption[]>([]);
  

  loading: boolean = false;
  
  crud!: ICorePageEditCRUD;

  sections: ICoreFormSection[] =
    [
      {
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
            }
          ],
          [
            {
              flexSize: 6,
              label: EnumTranslateKey.UI_ENTITY_FIELD_EFFECTIVE_YEAR,
              field: 'effectiveYear',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              type: 'number',
              validators: [
                {
                  name: 'required',
                  validator: Validators.required,
                  errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED
                }
              ]
            },
            {
              flexSize: 6,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_POSITION_COMPANY,
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
          ],
          [
            {
              flexSize: 6,
              label: EnumTranslateKey.UI_LABEL_TIME_IMPORT_EMPLOYEE_OBJ,
              field: 'objEmployeeId',
              value: '',
              type: 'string',
              controlType: EnumFormBaseContolType.DROPDOWN,
              getByIdApi: this.objEmployeeGetByIdApi,
              getByIdObject$: this.objEmployeeGetByIdObject$,
              dropdownOptions$: this.objEmployeeOptions$,
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
              flexSize: 6,
              label: EnumTranslateKey.UI_ENTITY_FIELD_WORK_ENVIRONMENT,
              field: 'workEnvironmentId',
              value: '',
              type: 'string',
              controlType: EnumFormBaseContolType.DROPDOWN,
              getByIdApi: this.workEnvironmentGetByIdApi,
              getByIdObject$: this.workEnvironmentGetByIdObject$,
              dropdownOptions$: this.workEnvironmentOptions$,
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
              flexSize: 3,
              label: EnumTranslateKey.UI_ENTITY_FIELD_IS_NOT_SATURDAY_INCLUDED,
              field: 'isNotSaturdayIncluded',
              value: '',
              controlType: EnumFormBaseContolType.CHECKBOX,
              type: 'boolean'
            },
            {
              flexSize: 3,
              label: EnumTranslateKey.UI_ENTITY_FIELD_IS_NOT_SUNDAY_INCLUDED,
              field: 'isNotSundayIncluded',
              value: '',
              controlType: EnumFormBaseContolType.CHECKBOX,
              type: 'boolean'
            }
          ],
          [
            {
              flexSize: 3,
              label: EnumTranslateKey.UI_ENTITY_FIELD_IS_NOT_HALF_SATURDAY_INCLUDED,
              field: 'isNotHalfSaturdayIncluded',
              value: '',
              controlType: EnumFormBaseContolType.CHECKBOX,
              type: 'boolean'
            },
            {
              flexSize: 3,
              label: EnumTranslateKey.UI_ENTITY_FIELD_IS_NOT_TWO_SATURDAYS,
              field: 'isNotTwoSaturdays',
              value: '',
              controlType: EnumFormBaseContolType.CHECKBOX,
              type: 'boolean'
            }
          ],
          [
            {
              flexSize: 4,
              label: EnumTranslateKey.UI_ENTITY_FIELD_DEDUCT_WORK_DURING_MONTH,
              field: 'deductWorkDuringMonth',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              type: 'number'
            },
            {
              flexSize: 4,
              label: EnumTranslateKey.UI_ENTITY_FIELD_DEFAULT_PUBLIC,
              field: 'defaultWork',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              type: 'number'
            },
            {
              flexSize: 4,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CONVERSION_COEFFICIENT,
              field: 'coefficient',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              type: 'number'
            }
          ],
          [
            {
              flexSize: 2,
              label: EnumTranslateKey.UI_COMPONENT_TITLE_RC_YEAR_PLAINING_T1,
              field: 't1',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              type: 'number'
            },
            {
              flexSize: 2,
              label: EnumTranslateKey.UI_COMPONENT_TITLE_RC_YEAR_PLAINING_T2,
              field: 't2',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              type: 'number'
            },
            {
              flexSize: 2,
              label: EnumTranslateKey.UI_COMPONENT_TITLE_RC_YEAR_PLAINING_T3,
              field: 't3',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              type: 'number'
            },
            {
              flexSize: 2,
              label: EnumTranslateKey.UI_COMPONENT_TITLE_RC_YEAR_PLAINING_T4,
              field: 't4',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              type: 'number'
            },
            {
              flexSize: 2,
              label: EnumTranslateKey.UI_COMPONENT_TITLE_RC_YEAR_PLAINING_T5,
              field: 't5',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              type: 'number'
            },
            {
              flexSize: 2,
              label: EnumTranslateKey.UI_COMPONENT_TITLE_RC_YEAR_PLAINING_T6,
              field: 't6',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              type: 'number'
            }
          ],
          [
            {
              flexSize: 2,
              label: EnumTranslateKey.UI_COMPONENT_TITLE_RC_YEAR_PLAINING_T7,
              field: 't7',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              type: 'number'
            },
            {
              flexSize: 2,
              label: EnumTranslateKey.UI_COMPONENT_TITLE_RC_YEAR_PLAINING_T8,
              field: 't8',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              type: 'number'
            },
            {
              flexSize: 2,
              label: EnumTranslateKey.UI_COMPONENT_TITLE_RC_YEAR_PLAINING_T9,
              field: 't9',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              type: 'number'
            },
            {
              flexSize: 2,
              label: EnumTranslateKey.UI_COMPONENT_TITLE_RC_YEAR_PLAINING_T10,
              field: 't10',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              type: 'number'
            },
            {
              flexSize: 2,
              label: EnumTranslateKey.UI_COMPONENT_TITLE_RC_YEAR_PLAINING_T11,
              field: 't11',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              type: 'number'
            },
            {
              flexSize: 2,
              label: EnumTranslateKey.UI_COMPONENT_TITLE_RC_YEAR_PLAINING_T12,
              field: 't12',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              type: 'number'
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

    this.captionCode = EnumTranslateKey.UI_COMPONENT_TITLE_AT_TIME_WORK_STANDARD_EDIT;

    this.crud = {
      c: api.AT_TIME_WORK_STANDARD_CREATE,
      r: api.AT_TIME_WORK_STANDARD_READ,
      u: api.AT_TIME_WORK_STANDARD_UPDATE,
      d: api.AT_TIME_WORK_STANDARD_DELETE,
    };
  }

  ngOnInit(): void {
    this.subscriptions.push(
      this.appService.get(api.SYS_OTHERLIST_GETOTHERLISTBYTYPE + "OBJECT_EMPLOYEE").subscribe(res => {
        const options: OptionContext[] = [];
        
        res.body.innerBody.map((g: any) => {
          options.push({
            value: g.id,
            text: g.name
          })
        });

        this.objEmployeeOptions$.next(options);
      })
    );

    this.subscriptions.push(
      this.appService.get(api.SYS_OTHERLIST_GETOTHERLISTBYTYPE + "WORK_ENVI").subscribe(res => {
        const options: OptionContext[] = [];
        
        res.body.innerBody.map((g: any) => {
          options.push({
            value: g.id,
            text: g.name
          })
        });

        this.workEnvironmentOptions$.next(options);
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