import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { EnumTranslateKey, api } from 'alpha-global-constants';
import { AppService, BaseEditComponent, CorePageEditComponent, DialogService, EnumFormBaseContolType, ICoreFormSection, ICorePageEditCRUD, ICorePageEditColumnComposition, MultiLanguageService } from 'ngx-histaff-alpha';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-tr-criteria-edit',
  standalone: true,
  imports: [
    CommonModule,
    CorePageEditComponent,
  ],
  templateUrl: './tr-criteria-edit.component.html',
  styleUrl: './tr-criteria-edit.component.scss'
})
export class TrCriteriaEditComponent extends BaseEditComponent{
  /* Properties to be passed into core-page-edit */

  override entityTable = "TR_CRITERIA";

  loading: boolean = false;

  subsctiptions: Subscription[] = [];

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
              readonly: true,
              hidden:true,
              type: 'text'
            },
          ],
          [
            {
              flexSize: 6,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_TR_CRITERIA_CODE,
              field: 'code',
              value: '',
              type: 'text',
              controlType: EnumFormBaseContolType.TEXTBOX,
              validators: [
                {
                  name: 'required',
                  validator: Validators.required,
                  errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
                }
              ]
            },
            {
              flexSize: 6,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_TR_CRITERIA_NAME,
              field: 'name',
              value: '',
              type: 'text',
              controlType: EnumFormBaseContolType.TEXTBOX,
              validators: [
                {
                  name: 'required',
                  validator: Validators.required,
                  errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
                }
              ]
            },
          ],
          [
            {
              flexSize: 6,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_TR_CRITERIA_MAX_SCORE,
              field: 'maxScore',
              value: '',
              type: 'number',
              controlType: EnumFormBaseContolType.TEXTBOX,
              validators: [
                {
                  name: 'required',
                  validator: Validators.required,
                  errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
                }
              ]
            },
            {
              flexSize: 6,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_TR_CRITERIA_NOTE,
              field: 'note',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              type: 'text', 
            },
            {
              flexSize: 0,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_COMMON_ID,
              field: 'isActive',
              value: 1,
              controlType: EnumFormBaseContolType.TEXTBOX,
              readonly: true,
              type: 'boolean',
              hidden: true,
            },
          ], 
        ]
      },  
    ];
  constructor(
    public override dialogService: DialogService,
    private mls: MultiLanguageService,
    private appService: AppService // CoreService is DEPRECATED!!!
  ) {

    super(dialogService);

    this.captionCode = EnumTranslateKey.UI_COMPONENT_TITLE_TR_CRITERIA;

    this.crud = {
      c: api.TR_CRITERIA_CREATE,
      r: api.TR_CRITERIA_READ,
      u: api.TR_CRITERIA_UPDATE,
      d: api.TR_CRITERIA_DELETE,
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
