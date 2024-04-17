import { Component, ViewEncapsulation } from '@angular/core';
import { Validators, FormGroup } from '@angular/forms';
import { EnumTranslateKey, api } from 'alpha-global-constants';
import { BaseEditComponent, ICorePageEditCRUD, ICoreFormSection, EnumFormBaseContolType, DialogService } from 'ngx-histaff-alpha';

@Component({
  selector: 'app-symbol-edit',
  templateUrl: './symbol-edit.component.html',
  styleUrls: ['./symbol-edit.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SymbolEditComponent extends BaseEditComponent {
  /* Properties to be passed into core-page-edit */
  loading: boolean = false;
  override entityTable = 'AT_SYMBOL';
  captionCode!: EnumTranslateKey;
  crud!: ICorePageEditCRUD;
  sections: ICoreFormSection[] = [
    {
      rows: [
        [
          {
            flexSize: 0,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_COMMON_ID,
            field: 'id',
            value: 0,
            controlType: EnumFormBaseContolType.TEXTBOX,
            readonly: true,
            hidden: true,
            type: 'text',
          },
          {
            flexSize: 6,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_AT_SYMBOL_CODE,
            field: 'code',
            value: '',
            controlType: EnumFormBaseContolType.TEXTBOX,
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
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_AT_SYMBOL_NAME,
            field: 'name',
            value: '',
            controlType: EnumFormBaseContolType.TEXTBOX,
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
        ],
        [
          {
            flexSize: 6,
            label:
              EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_AT_SYMBOL_WORKING_HOUR,
            field: 'workingHour',
            value: '',
            controlType: EnumFormBaseContolType.TEXTBOX,
            type: 'number',
            validators: [
              {
                name: 'required',
                validator: Validators.required,
                errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
              },
              {
                name: 'min',
                validator: Validators.min(0),
                errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_MIN,
              },
            ],
          },
          {
            flexSize: 3,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_AT_SYMBOL_IS_OFF,
            field: 'isOff',
            value: '',
            controlType: EnumFormBaseContolType.CHECKBOX,
            type: 'boolean',
          },
          {
            flexSize: 3,
            label:
              EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_AT_SYMBOL_IS_HOLIDAY_CAL,
            field: 'isHolidayCal',
            value: '',
            controlType: EnumFormBaseContolType.CHECKBOX,
            type: 'boolean',
          },
        ],
        [
          {
            flexSize: 3,
            label:
              EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_AT_SYMBOL_IS_INS_ARISING,
            field: 'isInsArising',
            value: '',
            controlType: EnumFormBaseContolType.CHECKBOX,
            type: 'boolean',
          },
          {
            flexSize: 3,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_AT_SYMBOL_IS_PORTAL,
            field: 'isPortal',
            value: '',
            controlType: EnumFormBaseContolType.CHECKBOX,
            type: 'boolean',
          },
          {
            flexSize: 3,
            label:
              EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_AT_SYMBOL_IS_REGISTER,
            field: 'isRegister',
            value: '',
            controlType: EnumFormBaseContolType.CHECKBOX,
            type: 'boolean',
          },
          {
            flexSize: 3,
            label:
              EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_AT_SYMBOL_IS_HAVE_SAL,
            field: 'isHaveSal',
            value: '',
            controlType: EnumFormBaseContolType.CHECKBOX,
            type: 'boolean',
          },
        ],
        [
          {
            flexSize: 12,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_AT_SYMBOL_NOTE,
            field: 'note',
            value: '',
            controlType: EnumFormBaseContolType.TEXTBOX,
            type: 'text',
          },
        ],
      ],
    },
  ];

  constructor(public override dialogService: DialogService) {
    super(dialogService);

    this.captionCode = EnumTranslateKey.UI_COMPONENT_TITLE_AT_SYMBOL_EDIT;

    this.crud = {
      c: api.AT_SYMBOL_CREATE,
      r: api.AT_SYMBOL_READ,
      u: api.AT_SYMBOL_UPDATE,
      d: api.AT_SYMBOL_DELETE,
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
