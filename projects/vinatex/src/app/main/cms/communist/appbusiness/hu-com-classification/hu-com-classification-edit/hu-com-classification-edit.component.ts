import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, FormsModule } from '@angular/forms';
import { EnumTranslateKey, api } from 'alpha-global-constants';
import { CorePageEditComponent, BaseEditComponent, ICorePageEditCRUD, ICoreDropdownOption, ICoreFormSection, EnumFormBaseContolType, EnumCoreFormControlSeekerSourceType, DialogService, AppService } from 'ngx-histaff-alpha';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-hu-com-classification-edit',
  standalone: true,
  imports: [
    CorePageEditComponent,
    CommonModule,
    FormsModule
  ],
  templateUrl: './hu-com-classification-edit.component.html',
  styleUrl: './hu-com-classification-edit.component.scss'
})
export class HuComClassificationEditComponent extends BaseEditComponent {
  override entityTable = 'HU_COM_CLASSIFICATION';
  crud!: ICorePageEditCRUD;
  captionCode!: EnumTranslateKey;

  employeeGetByIdObject$ = new BehaviorSubject<any>(null);
  employeeGetByIdApi = api.HU_EMPLOYEE_READ;
  yearGetByIdObject$ = new BehaviorSubject<any>(null);
  groupOptionsYear$ = new BehaviorSubject<ICoreDropdownOption[]>([]);

  classificationGetByIdObject$ = new BehaviorSubject<any>(null);
  classificationOptions$ = new BehaviorSubject<ICoreDropdownOption[]>([]);
  classificationGetIdApi = api.SYS_OTHERLIST_READ;

  sections: ICoreFormSection[] = [
    {
      rows:[
          [    {
            flexSize: 0,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_COMMON_ID,
            field: 'id',
            value: '',
            controlType: EnumFormBaseContolType.TEXTBOX,
            readonly: true,
            type: 'text',
            hidden: true,
          },
          {
            flexSize: 3,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_HU_COM_WORKING_COM_CODE,
            field: 'employeeId',
            value: '',
            type: 'string',
            controlType: EnumFormBaseContolType.SEEKER,
            seekerSourceType: EnumCoreFormControlSeekerSourceType.EMPLOYEE_SEEK,
            getByIdObject$: this.employeeGetByIdObject$,
            getByIdApi: this.employeeGetByIdApi,
            boundFrom: 'id',
            shownFrom: 'fullname',
            alsoBindTo: [
              { takeFrom: 'positionName', bindTo: 'positionName' },
              { takeFrom: 'fullname', bindTo: 'signName' },
            ],

          },
          {
            flexSize: 3,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_HU_COM_WORKING_COM_NAME,
            field: 'employeeName',
            value: '',
            controlType: EnumFormBaseContolType.TEXTBOX,
            // disabled: true,
            type: 'text',
          },
          {
            flexSize: 3,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_HU_COM_CLASSIFICATION_AFFILIATED_PARTY_COMMITTE,
            field: 'affiliatedPartyCommitte',
            value: '',
            controlType: EnumFormBaseContolType.TEXTBOX,
            // disabled: true,
            readonly: true,
            type: 'text',
          },
        ],
        [
          {
            flexSize: 3,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_HU_COM_CLASSIFICATION_POSITION,
            field: 'positionName',
            value: '',
            type: 'text',
            // disabled: true,
            readonly: true,
            controlType: EnumFormBaseContolType.TEXTBOX,
          },
          {
            flexSize: 3,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_HU_COM_CLASSIFICATION_GOVERNMENT_POSITION,
            field: 'governmentPosName',
            value: '',
            controlType: EnumFormBaseContolType.TEXTBOX,
            // disabled: true,
            type: 'text',
          },
          {
            flexSize: 3,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_HU_COM_CLASSIFICATION_CLASSIFICATION,
            field: 'classificationId',
            value: '',
            controlType: EnumFormBaseContolType.DROPDOWN,
            type: 'number',
            dropdownOptions$: this.classificationOptions$,
            getByIdObject$: this.classificationGetByIdObject$,
            shownFrom:'name',
            getByIdApi: this.classificationGetIdApi,
          },
          {
            flexSize: 3,
            label: EnumTranslateKey.UI_COMPONENT_TITLE_TR_PLAN_YEAR,
            field: 'year',
            value: '',
            controlType: EnumFormBaseContolType.DROPDOWN,
            dropdownOptions$: this.groupOptionsYear$,
            getByIdObject$: this.yearGetByIdObject$,
            // getByIdApi: this.,
            shownFrom: 'name',
            type: 'number',
          },
        ],
        [
          {
            flexSize: 12,
            label: EnumTranslateKey.UI_LABEL_TR_CLASS_NOTE,
            field: 'note',
            value: '',
            type: 'text',
            // disabled: true,
            controlType: EnumFormBaseContolType.TEXTAREA,
            textareaRows: 2,
          },
        ]
      ]
    }
  ];

  constructor(
    public override dialogService: DialogService,
    private appService: AppService

  ) {
    super(dialogService);
    this.captionCode = EnumTranslateKey.UI_COMPONENT_TITLE_HU_COM_CLASSIFICATION;
    this.crud = {
      c: api.HU_COM_CASSIFICATION_CREATE,
      r: api.HU_COM_CASSIFICATION_READ,
      u: api.HU_COM_CASSIFICATION_UPDATE,
      d: api.HU_COM_CASSIFICATION_DELETE_IDS,
    };
  }

  onFormCreated(e: FormGroup): void {
    this.form = e;
  }

  /* To allow form to be deactivated */
  onFormReinit(e: string): void {
    this.formInitStringValue = e;
  }

  ngOnInit(): void {
    
  }
}
