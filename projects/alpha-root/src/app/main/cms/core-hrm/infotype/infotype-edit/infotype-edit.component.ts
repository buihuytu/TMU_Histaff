import { Component } from '@angular/core';
import { Validators, FormGroup } from '@angular/forms';
import { EnumTranslateKey, api } from 'alpha-global-constants';
import { BaseEditComponent, ICorePageEditColumnComposition, ICorePageEditCRUD, ICoreFormSection, EnumFormBaseContolType, DialogService } from 'ngx-histaff-alpha';

@Component({
  selector: 'app-infotype-edit',
  templateUrl: './infotype-edit.component.html',
  styleUrls: ['./infotype-edit.component.scss']
})
export class InfotypeEditComponent extends BaseEditComponent {

  /* Properties to be passed into core-page-edit */

  override entityTable = "HRM_INFOTYPE";

  captionCode!: EnumTranslateKey;
  formComposition!: ICorePageEditColumnComposition[][];
  crud!: ICorePageEditCRUD;
  sections: ICoreFormSection[] =
    [
      {
        rows: [
          [
            {
              flexSize: 0,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_COMMON_ID,
              field: 'id',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              hidden: true,
              type: 'number'
            },
            {
              flexSize: 3,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_HRM_INFOTYPE_CODE,
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
                  name: 'fixedLength',
                  validator: Validators.pattern('^[0-9]{4}$'),
                  errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_FIXED_LENGTH,
                }
              ]

            },

            {
              flexSize: 9,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_HRM_INFOTYPE_NAME_CODE,
              field: 'nameCode',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              readonly: false,
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
                }
              ]
            },
          ],
          [
            {
              flexSize: 6,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_HRM_INFOTYPE_NAME_EN,
              field: 'nameEn',
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
                }
              ]
            },
            {
              flexSize: 6,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_HRM_INFOTYPE_NAME_VN,
              field: 'nameVn',
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
                }
              ]
            },
          ],
          [
            {
              flexSize: 12,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_HRM_INFOTYPE_DESCRIPTION,
              field: 'description',
              value: '',
              controlType: EnumFormBaseContolType.TEXTAREA,
              textareaRows: 12,
              readonly: false,
              type: 'text',
            },
          ]
        ]
      }
    ];
  constructor(
    public override dialogService: DialogService
  ) {

    super(dialogService);

    this.captionCode = EnumTranslateKey.UI_COMPONENT_TITLE_CORE_HRM_INFOTYPE;

    this.crud = {
      c: api.HRM_INFOTYPE_CREATE,
      r: api.HRM_INFOTYPE_READ,
      u: api.HRM_INFOTYPE_UPDATE,
      d: api.HRM_INFOTYPE_DELETE,
    };

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
