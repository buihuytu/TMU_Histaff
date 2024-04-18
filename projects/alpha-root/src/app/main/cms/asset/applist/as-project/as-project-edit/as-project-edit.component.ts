import { Component } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { EnumTranslateKey, api } from 'alpha-global-constants';
import { BaseEditComponent, ICorePageEditCRUD, ICoreFormSection, EnumFormBaseContolType, DialogService, AppService } from 'ngx-histaff-alpha';

@Component({
  selector: 'app-as-project-edit',
  templateUrl: './as-project-edit.component.html',
  styleUrl: './as-project-edit.component.scss'
})

export class AsProjectEditComponent extends BaseEditComponent {
  override entityTable = 'AS_PROJECT';

  captionCode!: EnumTranslateKey;

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
              flexSize: 6,
              label: EnumTranslateKey.UI_ENTITY_FIEL_PROJECT_CODE,
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
              label: EnumTranslateKey.UI_ENTITY_FIEL_PROJECT_NAME,
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
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_CSS_VAR_DESCRIPTION,
              field: 'description',
              value: '',
              controlType: EnumFormBaseContolType.TEXTAREA,
              type: 'string'
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

    this.captionCode = EnumTranslateKey.UI_COMPONENT_TITLE_AS_PROJECT;

    this.crud = {
      c: api.AS_PROJECT_CREATE,
      r: api.AS_PROJECT_READ,
      u: api.AS_PROJECT_UPDATE,
      d: api.AS_PROJECT_DELETE,
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