import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { EnumTranslateKey, api } from 'alpha-global-constants';
import { AppService, BaseEditComponent, CommonHttpRequestService, CorePageEditComponent, CorePageHeaderComponent, CorePageListComponent, DialogService, EnumFormBaseContolType, ICoreDropdownOption, ICoreFormSection, ICorePageEditCRUD, ICoreParamControl, MultiLanguageService } from 'ngx-histaff-alpha';
import { BehaviorSubject, Subscription } from 'rxjs';
import { HuProvinceEditService } from '../../hu-province/hu-province-edit/hu-province-edit.services';

@Component({
  selector: 'app-personnel-directory-edit',
  standalone: true,
  imports: [
    CommonModule,
    CorePageListComponent,
    CorePageHeaderComponent,
    CorePageEditComponent,
  ],
  templateUrl: './personnel-directory-edit.component.html',
  styleUrl: './personnel-directory-edit.component.scss'
})
export class PersonnelDirectoryEditComponent extends BaseEditComponent{

  loading: boolean = false;
  subsctiptions: Subscription[] = [];
  override entityTable = "HU_EMPLOYEE";
  captionCode!: EnumTranslateKey;
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
          [
            {
              flexSize: 4,
              label: EnumTranslateKey.UI_COMPONENT_LABEL_CONTRACT_EMPLOYEECODE,
              field: 'employeeCode',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              type: 'text',
              disabled: true,
            },
            
            {
              flexSize: 4,
              label: EnumTranslateKey.UI_COMPONENT_LABEL_CONTRACT_EMPLOYEENAME,
              field: 'employeeName',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              type: 'text',
              disabled: true
            },
            {
              flexSize: 4,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_STAFF_PROFILE_POSITION_NAME,
              field: 'positionName',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              type: 'text',
              disabled: true
            },
          ],

          [
            {
              flexSize: 4,
              label: EnumTranslateKey.UI_COMPONENT_LABEL_CONTRACT_ORGNAME,
              field: 'orgName',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              type: 'text',
              disabled: true,
              
            },
            
            {
              flexSize: 4,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_STAFF_PROFILE_BIRTH_DATE,
              field: 'birthDate',
              value: '',
              controlType: EnumFormBaseContolType.DATEPICKER,
              type: 'date',
              disabled: true
            },
            {
              flexSize: 4,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_RC_RECRUITMENT_GENDER,
              field: 'genderName',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              type: 'text',
              disabled: true
            },
          ],

          [
            {
              flexSize: 4,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_PHONE_NUMBER,
              field: 'mobilePhone',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              type: 'text',
              disabled: true,
              
            },
            
            {
              flexSize: 4,
              label: EnumTranslateKey.UI_COMPONENT_TITLE_APPROVE_EMPLOYEE_EDIT_EMAIL,
              field: 'email',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              type: 'text',
              disabled: true
            },
            {
              flexSize: 4,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_PERMANENT_EMAIL_COMPANY,
              field: 'workEmail',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              type: 'text',
              disabled: true
            },
          ],
        ]
      }
    ];

  constructor(
    public override dialogService: DialogService,
    private appService: AppService ,
    private slrService: HuProvinceEditService,
    private commonHttpRequestService :CommonHttpRequestService
  ) {

    super(dialogService);
    this.captionCode = EnumTranslateKey.UI_COMPONENT_TITLE_HU_PERSONNEL_DIRECTORY;

    this.crud = {
      c: api.HU_PROVINCE_CREATE,
      r: api.HU_EMPLOYEE_PERSONNEL_DIRECTOTY_READ,
      u: api.HU_PROVINCE_UPDATE,
      d: api.HU_PROVINCE_DELETE,
    };

  }

  ngOnInit(): void {
    this.loading = true;
  }


  /* GET FormGroup Instance */
  onFormCreated(e: FormGroup): void {
    this.form = e;
  }

  /* To allow form to be deactivated */
  onFormReinit(e: string): void {
    this.formInitStringValue = e;
  }

}
