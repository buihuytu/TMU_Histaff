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
  selector: 'app-rc-exams-edit',
  templateUrl: './rc-exams-edit.component.html',
  styleUrls: ['./rc-exams-edit.component.scss']
})

export class RcExamsEditComponent extends BaseEditComponent {
  override entityTable = 'RC_EXAMS';
  
  subscriptions: Subscription[] = [];
  
  captionCode!: EnumTranslateKey;


  // seeker to choose organization
  orgUnitGetByIdApi = api.OM_ORGANIZATION_READ;
  orgUnitGetByIdObject$ = new BehaviorSubject<any>(null);


  // "drop down list" to choose position
  positionGetByIdApi = api.HU_POSITION_READ;
  positionGetByIdObject$ = new BehaviorSubject<any>(null);
  positionOptions$ = new BehaviorSubject<ICoreDropdownOption[]>([]);
  

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
            },
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
            }
          ],
          [
            {
              flexSize: 4,
              label: EnumTranslateKey.UI_COMPONENT_TITLE_EXAM_SUBJECT_NAME,
              field: 'name',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              type: 'text',
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
              label: EnumTranslateKey.UI_COMPONENT_TITLE_POINT_LADDER,
              field: 'pointLadder',
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
              flexSize: 4,
              label: EnumTranslateKey.UI_COMPONENT_LABEL_SHIFT_COEFFICIENT,
              field: 'coefficient',
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
            }
          ],
          [
            {
              flexSize: 4,
              label: EnumTranslateKey.UI_COMPONENT_TITLE_POINT_PASS,
              field: 'pointPass',
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
              flexSize: 4,
              label: EnumTranslateKey.UI_COMPONENT_TITLE_EXAMS_ORDER,
              field: 'examsOrder',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              type: 'number'
            },
            {
              flexSize: 4,
              label: EnumTranslateKey.UI_COMPONENT_TITLE_IS_PV,
              field: 'isPv',
              value: '',
              controlType: EnumFormBaseContolType.CHECKBOX,
              type: 'boolean'
            }
          ],
          [
            {
              flexSize: 12,
              label: EnumTranslateKey.UI_COMPONENT_TITLE_TR_PLAN_NOTE,
              field: 'note',
              value: '',
              controlType: EnumFormBaseContolType.TEXTAREA,
              type: 'string'
            },
          ]
        ]
      }
    ];

  constructor (
    public override dialogService: DialogService,
    private appService: AppService,
  ) {
    super(dialogService);

    this.captionCode = EnumTranslateKey.UI_COMPONENT_TITLE_RC_EXAMS_EDIT;

    this.crud = {
      c: api.RC_EXAMS_CREATE,
      r: api.RC_EXAMS_READ,
      u: api.RC_EXAMS_UPDATE,
      d: api.RC_EXAMS_DELETE,
    };
  }

  ngOnInit(): void {

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