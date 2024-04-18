import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { EnumTranslateKey, api } from 'alpha-global-constants';
import { AppService, BaseEditComponent, CorePageEditComponent, DialogService, EnumCoreFormControlSeekerSourceType, EnumFormBaseContolType, ICoreFormSection, ICorePageEditCRUD, IFormBaseControl, MultiLanguageService } from 'ngx-histaff-alpha';
import { BehaviorSubject, Subscription, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-hu-personnel-planing-edit',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    CorePageEditComponent
  ],
  templateUrl: './hu-personnel-planing-edit.component.html',
  styleUrl: './hu-personnel-planing-edit.component.scss'
})
export class HuPersonnelPlaningEditComponent extends BaseEditComponent implements OnInit {
  title = EnumTranslateKey.UI_COMPONENT_TITLE_HU_PERSONNEL;
  orgIdOptions$ = new BehaviorSubject<any>(null);
  orgIdGetByIdObject$ = new BehaviorSubject<any>(null);
  orgIdGetByIdApi = api.HU_ORGANIZATION_READ;
  override entityTable = "HU_PERSONNEL_PLANING";
  subsctiptions: Subscription[] = [];
  captionCode: EnumTranslateKey = EnumTranslateKey.UI_COMPONENT_TITLE_HU_PERSONNEL;
  crud!: ICorePageEditCRUD;
  sections: ICoreFormSection[] =
    [
      {
        rows: [
          [
            {
              flexSize: 6,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_COMMON_ID,
              field: 'id',
              value: '',
              hidden: true,
              controlType: EnumFormBaseContolType.TEXTBOX,
              readonly: true,
              type: 'text'
            }
          ],

        ]
      },
      {
        caption: EnumTranslateKey.UI_COMPONENT_TITLE_HU_PERSONNEL_PLANING_PLANING_INFORMATION,
        rows: [
          [
            {
              flexSize: 3,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_POSITION_ORGNAME,
              field: 'orgId',
              value: '',
              controlType: EnumFormBaseContolType.SEEKER,

              /* 
                START: WHEN USING controlType === EnumFormBaseContolType.SEEKER
                we must pass the three properties bellow:
               */
              seekerSourceType: EnumCoreFormControlSeekerSourceType.ORGANIZATION_UNIT_SEEK,
              getByIdObject$: this.orgIdGetByIdObject$,
              getByIdApi: this.orgIdGetByIdApi,
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
                }
              ],
            },
            {
              flexSize: 3,
              field: 'year',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              type: 'number',
              label: EnumTranslateKey.UI_COMPONENT_TITLE_HU_PERSONNEL_PLANING_YEAR,
            },
            {
              flexSize: 3,
              field: 'name',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              type: 'text',
              label: EnumTranslateKey.UI_COMPONENT_TITLE_HU_PERSONNEL_PLANING_NAME,
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
              field: 'note',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              type: 'text',
              label: EnumTranslateKey.UI_COMPONENT_TITLE_HU_PERSONNEL_PLANING_NOTE,
            },
          ],
          [
            {
              flexSize: 3,
              field: 'effectDate',
              value: '',
              controlType: EnumFormBaseContolType.DATEPICKER,
              type: 'number',
              label: EnumTranslateKey.UI_COMPONENT_TITLE_HU_PERSONNEL_PLANING_EFFECT_DATE,
            },
          ]
        ]
      },
      {
        caption: EnumTranslateKey.UI_COMPONENT_TITLE_HU_PERSONNEL_PLANING_PLANING_DETAIL,
        rows: [
          [
            {
              flexSize: 4,
              field: 'currentNumber',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              type: 'number',
              disabled: true,
              label: EnumTranslateKey.UI_COMPONENT_TITLE_HU_PERSONNEL_PLANING_CURRENT_NUM,
            },
            {
              flexSize: 4,
              field: 'planNumber',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              type: 'number',
              label: EnumTranslateKey.UI_COMPONENT_TITLE_HU_PERSONNEL_PLANING_PLAN_NUMBER,
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
              field: 'newRecruit',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              type: 'number',
              label: EnumTranslateKey.UI_COMPONENT_TITLE_HU_PERSONNEL_PLANING_NEW_RECRUIT,
            },
            {
              flexSize: 4,
              field: 'tranferNum',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              type: 'number',
              label: EnumTranslateKey.UI_COMPONENT_TITLE_HU_PERSONNEL_PLANING_TRANFER_NUM,
            },
            {
              flexSize: 4,
              field: 'totalNum',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              type: 'number',
              disabled: true,
              label: EnumTranslateKey.UI_COMPONENT_TITLE_HU_PERSONNEL_PLANING_TOLTAL_NUM,
            },
          ],
          [
            {
              flexSize: 4,
              field: 'retirement',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              type: 'number',
              label: EnumTranslateKey.UI_COMPONENT_TITLE_HU_PERSONNEL_PLANING_RETITEMENT,
            },
            {
              flexSize: 4,
              field: 'quantityDifference',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              type: 'number',
              disabled: true,
              label: EnumTranslateKey.UI_COMPONENT_TITLE_HU_PERSONNEL_PLANING_QUANTITY_DIFFERENCE,
            },
          ],
          [
            {
              flexSize: 6,
              field: 'planProPosed',
              value: '',
              controlType: EnumFormBaseContolType.TEXTAREA,
              type: 'text',
              label: EnumTranslateKey.UI_COMPONENT_TITLE_HU_PERSONNEL_PLANING_PLAN,
            },
            {
              flexSize: 6,
              field: 'description',
              value: '',
              controlType: EnumFormBaseContolType.TEXTAREA,
              type: 'text',
              label: EnumTranslateKey.UI_COMPONENT_TITLE_HU_PERSONNEL_PLANING_DESCRIPTION,
            }
          ]
        ]
      }
    ]
  constructor(public override dialogService: DialogService,
    public mls: MultiLanguageService,
    private appService: AppService) {
    super(dialogService);
    this.crud = {
      c: api.HU_PERSONNEL_PLANING_CREATE,
      r: api.HU_PERSONNEL_PLANING_READ,
      u: api.HU_PERSONNEL_PLANING_UPDATE,
      d: api.HU_PERSONNEL_PLANING_DELETE_ID,
    };
  }
  ngOnInit(): void {

  }
  onFormCreated(e: FormGroup): void {
    this.form = e;
    let currentNum: number = 0;
    let planNumber: number = 0;
    let newRecruit: number = 0;
    let tranferNum: number = 0;
    let retirement: number = 0;
    if(this.form.get('id')?.value != 0 || this.form.get('id')?.value != null){
      currentNum = this.form.get('currentNumber')?.value;
      planNumber = this.form.get('planNumber')?.value;
      newRecruit = this.form.get('newRecruit')?.value;
      tranferNum = this.form.get('tranferNum')?.value;
      retirement = this.form.get('retirement')?.value;
    }
    
    this.form.get('orgId')?.valueChanges.pipe(distinctUntilChanged()).subscribe(x => {
      if (!!x) {
        this.appService.get(api.HU_PERSONNEL_PLANING_GET_TOTAL_EMPLOYEE_BY_ORG_ID + `?orgId=${x}`).subscribe(x => {
          if (x.ok && x.status === 200 && x.body.statusCode === 200) {
            this.form.get('currentNumber')?.patchValue(x.body.innerBody);
            currentNum = x.body.innerBody;
          }
        })
      }
    })
    this.form.get('planNumber')?.valueChanges.pipe(distinctUntilChanged()).subscribe(x => {
      planNumber = x;
      this.form.get('quantityDifference')?.setValue(Number(planNumber) - Number(newRecruit) - Number(tranferNum) - Number(retirement) - Number(currentNum))

    })
    this.form.get('newRecruit')?.valueChanges.pipe(distinctUntilChanged()).subscribe(x => {
      newRecruit = x;
      this.form.get('totalNum')?.setValue(Number(x) + Number(tranferNum));
      this.form.get('quantityDifference')?.setValue(Number(planNumber) - Number(newRecruit) - Number(tranferNum) - Number(retirement) - Number(currentNum))
    });
    this.form.get('tranferNum')?.valueChanges.pipe(distinctUntilChanged()).subscribe(x => {
      tranferNum = x;
      this.form.get('totalNum')?.setValue(Number(x) + Number(newRecruit));
      this.form.get('quantityDifference')?.setValue(Number(planNumber) - Number(newRecruit) - Number(tranferNum) - Number(retirement) - Number(currentNum))
    });
    this.form.get('retirement')?.valueChanges.pipe(distinctUntilChanged()).subscribe(x => {
      retirement = x;
      this.form.get('quantityDifference')?.setValue(Number(planNumber) - Number(newRecruit) - Number(tranferNum) - Number(retirement) - Number(currentNum))
    });
  }
  onFormReinit(e: string): void {
    this.formInitStringValue = e;
  }
}
