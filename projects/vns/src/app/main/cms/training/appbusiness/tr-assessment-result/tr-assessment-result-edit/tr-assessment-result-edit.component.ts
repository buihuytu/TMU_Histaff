import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { EnumTranslateKey, api } from 'alpha-global-constants';
import { BaseEditComponent, ICorePageEditCRUD, ICoreFormSection, EnumFormBaseContolType, DialogService } from 'ngx-histaff-alpha';


@Component({
  selector: 'app-tr-assessment-result-edit',
  templateUrl: './tr-assessment-result-edit.component.html',
  styleUrl: './tr-assessment-result-edit.component.scss'
})

export class TrAssessmentResultEditComponent extends BaseEditComponent {
  override entityTable = 'TR_RESULT_EVALUATION';
  
  captionCode!: EnumTranslateKey;
  
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
              field: 'trAssessmentResultId',
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
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_TR_CRITERIA_CODE,
              field: 'criteriaCode',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              type: 'string',
              disabled: true
            },
            {
              flexSize: 6,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_TR_CRITERIA_NAME,
              field: 'criteriaName',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              type: 'string',
              disabled: true
            }
          ],
          [
            {
              flexSize: 6,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_TR_SETTING_CRI_DETAIL_RATIO,
              field: 'ratio',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              type: 'string',
              disabled: true
            },
            {
              flexSize: 6,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_TR_SETTING_CRI_DETAIL_POINT_MAX,
              field: 'pointMax',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              type: 'string',
              disabled: true
            }
          ],
          [
            {
              flexSize: 6,
              label: EnumTranslateKey.UI_COMPONENT_LABEL_HU_EVALUATION_COM_POINT_EVALUATION,
              field: 'pointEvaluate',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              type: 'number'
            },
            {
              flexSize: 6,
              label: EnumTranslateKey.UI_COMPONENT_TITLE_GENERAL_OPINION,
              field: 'generalOpinion',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              type: 'string'
            }
          ],
          [
            {
              flexSize: 12,
              label: EnumTranslateKey.UI_QUESTION_1,
              field: 'question1',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              type: 'string'
            }
          ],
          [
            {
              flexSize: 12,
              label: EnumTranslateKey.UI_QUESTION_2,
              field: 'question2',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              type: 'string'
            }
          ],
          [
            {
              flexSize: 12,
              label: EnumTranslateKey.UI_QUESTION_3,
              field: 'question3',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              type: 'string'
            }
          ],
          [
            {
              flexSize: 12,
              label: EnumTranslateKey.UI_QUESTION_4,
              field: 'question4',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              type: 'string'
            }
          ]
        ]
      }
    ];

  constructor (
    public override dialogService: DialogService
  ) {
    super(dialogService);

    this.captionCode = EnumTranslateKey.UI_COMPONENT_TITLE_RESULT_EVALUATE;

    this.crud = {
      c: api.TR_RESULT_EVALUATION_CREATE,
      r: api.TR_RESULT_EVALUATION_READ,
      u: api.TR_RESULT_EVALUATION_UPDATE,
      d: api.TR_RESULT_EVALUATION_DELETE,
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