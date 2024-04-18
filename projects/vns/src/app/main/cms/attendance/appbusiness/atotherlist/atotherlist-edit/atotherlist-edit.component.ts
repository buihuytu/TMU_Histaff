import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { EnumTranslateKey, api } from 'alpha-global-constants';
import { BaseEditComponent, ICorePageEditCRUD, ICoreFormSection, EnumFormBaseContolType, EnumCoreTablePipeType, DialogService } from 'ngx-histaff-alpha';

@Component({
  selector: 'app-atotherlist-edit',
  templateUrl: './atotherlist-edit.component.html',
  styleUrls: ['./atotherlist-edit.component.scss']
})
export class AtotherlistEditComponent extends BaseEditComponent implements OnInit {

  override entityTable = 'AT_OTHER_LIST'
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
              value: 0,
              controlType: EnumFormBaseContolType.TEXTBOX,
              readonly: true,
              hidden: true,
              type: 'text'
            }
          ],
          [
            {
              flexSize: 4,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_AT_OTHER_LIST_EFFECT_DATE,
              field: 'effectDate',
              value: '',
              controlType: EnumFormBaseContolType.DATEPICKER,
              type: 'date',
              validators: [
                {
                  name: 'required',
                  validator: Validators.required,
                  errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
                },
              ]
            },
            {
              flexSize: 4,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_AT_OTHER_LIST_EXPIRATION_DATE,
              field: 'expirationDate',
              value: '',
              controlType: EnumFormBaseContolType.DATEPICKER,
              type: 'date',
            },
            {
              flexSize: 4,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_AT_OTHER_LIST_IS_ENTITE_YEAR,
              field: 'isEntireYear',
              value: '',
              controlType: EnumFormBaseContolType.CHECKBOX,
              type: 'bool',
            },
          ],
          [
            {
              flexSize: 4,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_AT_OTHER_LIST_MAX_WORKING_MONTH,
              field: 'maxWorkingMonth',
              value: null,
              controlType: EnumFormBaseContolType.TEXTBOX,
              type: 'number',
            },
            {
              flexSize: 4,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_AT_OTHER_LIST_MAX_WORKING_YEAR,
              field: 'maxWorkingYear',
              value: null,
              controlType: EnumFormBaseContolType.TEXTBOX,
              type: 'number',
            },
            {
              flexSize: 4,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_AT_OTHER_LIST_OVERTIME_DAY_WEEKDAY,
              field: 'overtimeDayWeekday',
              value: null,
              controlType: EnumFormBaseContolType.TEXTBOX,
              type: 'number',
            },
          ],
          [
            {
              flexSize: 4,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_AT_OTHER_LIST_OVERTIME_DAY_HOLIDAY,
              field: 'overtimeDayHoliday',
              value: null,
              controlType: EnumFormBaseContolType.TEXTBOX,
              type: 'number',
            },
            {
              flexSize: 4,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_AT_OTHER_LIST_OVERTIME_DAY_OFF,
              field: 'overtimeDayOff',
              value: null,
              controlType: EnumFormBaseContolType.TEXTBOX,
              type: 'number',
            },
            {
              flexSize: 4,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_AT_OTHER_LIST_OVERTIME_NIGHT_WEEKDAY,
              field: 'overtimeNightWeekday',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              type: 'text',
            },
          ],
          [
            {
              flexSize: 4,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_AT_OTHER_LIST_OVERTIME_NIGHT_HOLIDAY,
              field: 'overtimeNightHoliday',
              value: null,
              controlType: EnumFormBaseContolType.TEXTBOX,
              type: 'number',
            },
            {
              flexSize: 4,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_AT_OTHER_LIST_OVERTIME_NIGHT_OFF,
              field: 'overtimeNightOff',
              value: null,
              controlType: EnumFormBaseContolType.TEXTBOX,
              type: 'number',
            },
            {
              flexSize: 4,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_AT_OTHER_LIST_WORKDAY_UNIT_PRICE,
              field: 'workdayUnitPrice',
              value: null,
              controlType: EnumFormBaseContolType.CURRENCY,
              pipe: EnumCoreTablePipeType.NUMBER, 
              type: 'number',
            },

          ],
          [
            {
              flexSize: 4,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_AT_OTHER_LIST_SELT_DEDUCTION_AMOUNT,
              field: 'selfDeductionAmount',
              value: null,
              controlType: EnumFormBaseContolType.TEXTBOX,
              type: 'number',
            },
            {
              flexSize: 4,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_AT_OTHER_LIST_PERSONAL_DEDUCTION_AMOUNT,
              field: 'personalDeductionAmount',
              value: null,
              controlType: EnumFormBaseContolType.TEXTBOX,
              type: 'number',
            },
            {
              flexSize: 4,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_AT_OTHER_LIST_BASE_SALARY,
              field: 'baseSalary',
              value: null,
              controlType: EnumFormBaseContolType.TEXTBOX,
              type: 'number',
            },
          ],
          [
            {
              flexSize: 12,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_AT_OTHER_LIST_NOTE,
              field: 'note',
              value: '',
              controlType: EnumFormBaseContolType.TEXTAREA,
              type: 'text',
            },
          ]
        ]
      }
    ]
  constructor(
    public override dialogService: DialogService,

  ) {
    super(dialogService);
    this.crud = {
      c: api.AT_OTHER_LIST_CREATE,
      r: api.AT_OTHER_LIST_READ,
      u: api.AT_OTHER_LIST_UPDATE,
      d: api.AT_OTHER_LIST_DELETE_IDS,
    };
  }
  onFormCreated(e: FormGroup): void {
    this.form = e;
  }
  ngOnInit(): void {
  }
  onFormReinit(e: string): void {
    this.formInitStringValue = e;
  }
}
