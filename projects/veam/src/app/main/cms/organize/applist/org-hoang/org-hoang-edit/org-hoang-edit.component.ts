import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, Validators } from '@angular/forms';
import { EnumTranslateKey, api } from 'alpha-global-constants';
import { Subscription, BehaviorSubject } from 'rxjs';
import {
  BaseEditComponent,
  ICoreDropdownOption,
  ICorePageEditCRUD,
  ICoreFormSection,
  EnumFormBaseContolType,
  EnumCoreFormControlSeekerSourceType,
  DialogService,
  AppService,
  CorePageEditComponent,
  EnumCoreTablePipeType
}
from 'ngx-histaff-alpha';

interface OptionContext {
  value: number;
  text: string;
}

@Component({
  selector: 'app-org-hoang-edit',
  standalone: true,
  imports: [
    CommonModule,
    CorePageEditComponent
  ],
  templateUrl: './org-hoang-edit.component.html',
  styleUrl: './org-hoang-edit.component.scss'
})

export class OrgHoangEditComponent extends BaseEditComponent {
  override entityTable = 'TR_REQUEST_YEAR';
  
  subscriptions: Subscription[] = [];
  
  captionCode!: EnumTranslateKey;


  // seeker to choose organization
  orgUnitGetByIdApi = api.OM_ORGANIZATION_READ;
  orgUnitGetByIdObject$ = new BehaviorSubject<any>(null);


  // "drop down list" to choose "quarter"
  quarterIdGetByIdApi = api.SYS_OTHERLIST_READ;
  quarterIdGetByIdObject$ = new BehaviorSubject<any>(null);
  quarterIdOptions$ = new BehaviorSubject<ICoreDropdownOption[]>([]);

  // "drop down list" to choose "training course"
  trCourseIdGetByIdApi = api.TR_COURSE_READ;
  trCourseIdGetByIdObject$ = new BehaviorSubject<any>(null);
  trCourseIdOptions$ = new BehaviorSubject<ICoreDropdownOption[]>([]);

  // "drop down list" to choose "company"
  companyIdGetByIdApi = api.HU_COMPANY_READ;
  companyIdGetByIdObject$ = new BehaviorSubject<any>(null);
  companyIdOptions$ = new BehaviorSubject<ICoreDropdownOption[]>([]);

  // "drop down list" to choose "initialization location"
  initializationLocationGetByIdApi = api.SYS_OTHERLIST_READ;
  initializationLocationGetByIdObject$ = new BehaviorSubject<any>(null);
  initializationLocationOptions$ = new BehaviorSubject<ICoreDropdownOption[]>([]);

  // "drop down list" to choose "priority level"
  priorityLevelGetByIdApi = api.SYS_OTHERLIST_READ;
  priorityLevelGetByIdObject$ = new BehaviorSubject<any>(null);
  priorityLevelOptions$ = new BehaviorSubject<ICoreDropdownOption[]>([]);

  // "drop down list" to choose "status"
  statusIdGetByIdApi = api.SYS_OTHERLIST_READ;
  statusIdGetByIdObject$ = new BehaviorSubject<any>(null);
  statusIdOptions$ = new BehaviorSubject<ICoreDropdownOption[]>([]);
  

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
            {
              flexSize: 0,
              label: EnumTranslateKey.UI_COMPONENT_LABEL_ALLOWANCE_ID,
              field: 'parentId',
              value: 12233,
              controlType: EnumFormBaseContolType.TEXTBOX,
              readonly: true,
              hidden: true,
              type: 'number'
            },
            {
              flexSize: 0,
              label: EnumTranslateKey.UI_COMPONENT_LABEL_ALLOWANCE_ID,
              field: 'status',
              value: true,
              controlType: EnumFormBaseContolType.TEXTBOX,
              readonly: true,
              hidden: true,
              type: 'number'
            },
          ],
          [
            {
              flexSize: 6,
              label: EnumTranslateKey.UI_COMPONENT_TITLE_CODE_ORG,
              field: 'code',
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
              flexSize: 6,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_STAFF_PROFILE_ORG_NAME,
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
            }
          ],
          [
            {
              flexSize: 12,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_HU_ORGANIZATION_PARENT_ID,
              field: 'parentName',
              value: 'Công ty Cổ phần Tư vấn Quản trị Doanh nghiệp Tinh Vân',
              controlType: EnumFormBaseContolType.TEXTBOX,
              type: 'text',
              disabled: true
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

    this.captionCode = EnumTranslateKey.UI_COMPONENT_TITLE_ORG_HOANG;

    this.crud = {
      c: api.HU_ORGANIZATION_CREATE,
      r: api.HU_ORGANIZATION_READ,
      u: api.HU_ORGANIZATION_UPDATE2,
      d: api.HU_ORGANIZATION_DELETE,
    };
  }

  ngOnInit(): void {

  }

  onFormCreated(e: FormGroup): void {
    this.form = e;
  }

  onFormReinit(e: string): void {
    this.formInitStringValue = e;
  }
}