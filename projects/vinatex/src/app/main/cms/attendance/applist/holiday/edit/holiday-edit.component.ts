import { Component, ViewEncapsulation } from '@angular/core';
import { Validators, FormGroup, AbstractControl } from '@angular/forms';
import { EnumTranslateKey, api } from 'alpha-global-constants';
import { BaseEditComponent, ICorePageEditCRUD, ICoreFormSection, EnumFormBaseContolType, DialogService, CustomValidators } from 'ngx-histaff-alpha';
import { Subscription, map, distinctUntilChanged } from 'rxjs';
import { HolidayEditService } from './holiday-edit.service';

@Component({
  selector: 'app-holiday-edit',
  templateUrl: './holiday-edit.component.html',
  styleUrls: ['./holiday-edit.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class HolidayEditComponent extends BaseEditComponent {
  /* Properties to be passed into core-page-edit */
  loading: boolean = false;
  override entityTable = 'AT_HOLIDAY';
  subsctiptions: Subscription[] = [];
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
            type: 'text',
            hidden: true,
          },
          {
            flexSize: 0,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_COMMON_ID,
            field: 'isActive',
            value: 0,
            controlType: EnumFormBaseContolType.TEXTBOX,
            readonly: true,
            type: 'boolean',
            hidden: true,
          },
          {
            flexSize: 6,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_AT_HOLIDAY_CODE,
            field: 'code',
            value: '',
            controlType: EnumFormBaseContolType.TEXTBOX,
            type: 'text',
            readonly: true,
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
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_AT_HOLIDAY_NAME,
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
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_AT_HOLIDAY_START_DAYOFF,
            field: 'startDayoff',
            value: '',
            controlType: EnumFormBaseContolType.DATEPICKER,
            type: 'date',
            validators: [
              {
                name: 'required',
                validator: Validators.required,
                errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
              },
              {
                name: 'checkFromDate',
                validator: HolidayEditComponent.checkFromDate,
                errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
              },
            ],
          },
          {
            flexSize: 6,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_AT_HOLIDAY_END_DAYOFF,
            field: 'endDayoff',
            value: '',
            controlType: EnumFormBaseContolType.DATEPICKER,
            type: 'date',
            validators: [
              {
                name: 'required',
                validator: Validators.required,
                errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
              },
              {
                name: 'checkToDate',
                validator: HolidayEditComponent.checkToDate,
                errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
              },
            ],
          },
        ],
        [
          {
            flexSize: 12,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_AT_HOLIDAY_NOTE,
            field: 'note',
            value: '',
            controlType: EnumFormBaseContolType.TEXTBOX,
            type: 'text',
          },
        ],
      ],
    },
  ];

  constructor(public override dialogService: DialogService, private holidayEditService: HolidayEditService) {
    super(dialogService);

    this.captionCode = EnumTranslateKey.UI_COMPONENT_TITLE_AT_HOLIDAY_EDIT;

    this.crud = {
      c: api.AT_HOLIDAY_CREATE,
      r: api.AT_HOLIDAY_READ,
      u: api.AT_HOLIDAY_UPDATE,
      d: api.AT_HOLIDAY_DELETE,
    };
  }

  ngOnInit(): void {
    this.loading = true;

    this.subsctiptions.push(
      this.holidayEditService
        .getCode()
        .pipe(
          map((f: any) => {
            let code = '';
            code = f.body.innerBody.code;
            return code;
          }),
        )
        .subscribe((response) => {
          this.form.get('code')?.patchValue(response);
          this.loading = false;
        }),
    );
  }

  /* GET FormGroup Instance */
  onFormCreated(e: FormGroup): void {
    this.form = e;
  }

  /* To allow form to be deactivated */
  onFormReinit(e: string): void {
    this.formInitStringValue = e;
    this.subsctiptions.push(
      this.form
        .get('endDayoff')
        ?.valueChanges.pipe(distinctUntilChanged())
        .subscribe((x) => {
          if (this.form.get('startDayoff')?.value !== null) {
            this.form.get('startDayoff')?.setValue(this.form.get('startDayoff')?.value);
          }
        })!,

      this.form
        .get('startDayoff')
        ?.valueChanges.pipe(distinctUntilChanged())
        .subscribe((x) => {
          if (this.form.get('endDayoff')?.value !== null) {
            this.form.get('endDayoff')?.setValue(this.form.get('endDayoff')?.value);
          }
        })!,
    );
  }
  static checkFromDate(control: AbstractControl): any | null {
    let valid = true;
    let errorMessage: string = '';
    const fromDate = new Date(control.value);
    const toDate = new Date(control.parent?.get('endDayoff')?.value);
    if (new Date(fromDate.toLocaleDateString('en-US')) > new Date(toDate.toLocaleDateString('en-US'))) {
      valid = false;
      errorMessage = EnumTranslateKey.UI_FORM_CONTROL_INSURANCE_REGIMES_MNG_ERROR_FROM_DATE_MORE_THAN_TO_DATE;
    }
    return CustomValidators.core('checkFromDate', valid, errorMessage)(control);
  }

  static checkToDate(control: AbstractControl): any | null {
    let valid = true;
    let errorMessage: string = '';
    const toDate = new Date(control.value);
    const fromDate = new Date(control.parent?.get('startDayoff')?.value);
    if (new Date(toDate.toLocaleDateString('en-US')) < new Date(fromDate.toLocaleDateString('en-US'))) {
      valid = false;
      errorMessage = EnumTranslateKey.UI_FORM_CONTROL_INSURANCE_REGIMES_MNG_ERROR_TO_DATE_LESS_THAN_FROM_DATE;
    }
    return CustomValidators.core('checkToDate', valid, errorMessage)(control);
  }
}
