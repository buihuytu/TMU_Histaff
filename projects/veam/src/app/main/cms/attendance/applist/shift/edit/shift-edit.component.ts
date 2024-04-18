import { Component } from '@angular/core';
import { Validators, FormGroup } from '@angular/forms';
import { EnumTranslateKey, api } from 'alpha-global-constants';
import { BaseEditComponent, ICoreDropdownOption, ICorePageEditColumnComposition, ICorePageEditCRUD, ICoreFormSection, EnumFormBaseContolType, AppService, DialogService } from 'ngx-histaff-alpha';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-shidt-edit',
  templateUrl: './shift-edit.component.html',
  styleUrls: ['./shift-edit.component.scss'],
})
export class ShiftEditComponent extends BaseEditComponent {
  /* Properties to be passed into core-page-edit */
  loading: boolean = false;
  override entityTable = 'AT_SHIFT';
  timeTypeOptions$ = new BehaviorSubject<ICoreDropdownOption[]>([]);
  timeTypeOptionsGetByIdObject$ = new BehaviorSubject<any>(null);
  //timeTypeGetByIdApi = api.AT_SHIFT_TIME_TYPE_BY_ID;
  timeTypeGetByIdApi = api.AT_SHIFT_GET_TIME_TYPE_BY_ID;

  saturdayOptions$ = new BehaviorSubject<ICoreDropdownOption[]>([]);
  saturdayOptionsGetByIdObject$ = new BehaviorSubject<any>(null);
  saturdayGetByIdApi = api.AT_SHIFT_READ;

  sundayOptions$ = new BehaviorSubject<ICoreDropdownOption[]>([]);
  sundayOptionsGetByIdObject$ = new BehaviorSubject<any>(null);
  sundayGetByIdApi = api.AT_SHIFT_READ;

  captionCode!: EnumTranslateKey;
  formComposition!: ICorePageEditColumnComposition[][];
  crud!: ICorePageEditCRUD;
  sections: ICoreFormSection[] = [
    {
      rows: [
        [
          {
            flexSize: 6,
            label: EnumTranslateKey.UI_COMPONENT_LABEL_SHIFT_ID,
            field: 'id',
            value: '',
            controlType: EnumFormBaseContolType.TEXTBOX,
            readonly: true,
            hidden: true,
            type: 'text',
          },
        ],
        [
          {
            flexSize: 6,
            label: EnumTranslateKey.UI_COMPONENT_LABEL_SHIFT_CODE,
            field: 'code',
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
            ],
          },
          {
            flexSize: 6,
            label: EnumTranslateKey.UI_COMPONENT_LABEL_SHIFT_NAME,
            field: 'name',
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
            ],
          },
        ],
        [
          {
            flexSize: 6,
            label: EnumTranslateKey.UI_COMPONENT_LABEL_SHIFT_TIME_TYPE_ID,
            field: 'timeTypeId',
            value: '',
            getByIdObject$: this.timeTypeOptionsGetByIdObject$,
            getByIdApi: this.timeTypeGetByIdApi,
            controlType: EnumFormBaseContolType.DROPDOWN,
            shownFrom: 'name',
            dropdownOptions$: this.timeTypeOptions$,
            type: 'text',
            validators: [
              {
                name: 'required',
                validator: Validators.required,
                errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
              },
            ],
          },
          {
            flexSize: 6,
            label: EnumTranslateKey.UI_COMPONENT_LABEL_SHIFT_MIN_HOUR,
            field: 'minHoursWork',
            value: '',
            controlType: EnumFormBaseContolType.TEXTBOX,
            readonly: false,
            type: 'number',
          },
        ],
        [
          {
            flexSize: 6,
            label: EnumTranslateKey.UI_COMPONENT_LABEL_SHIFT_SATURDAY,
            field: 'saturday',
            value: '',
            getByIdObject$: this.saturdayOptionsGetByIdObject$,
            getByIdApi: this.saturdayGetByIdApi,
            controlType: EnumFormBaseContolType.DROPDOWN,
            shownFrom: 'name',
            dropdownOptions$: this.saturdayOptions$,
            type: 'text',
            validators: [
              {
                name: 'required',
                validator: Validators.required,
                errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
              },
            ],
          },
          {
            flexSize: 6,
            label: EnumTranslateKey.UI_COMPONENT_LABEL_SHIFT_SUNDAY,
            field: 'sunday',
            value: '',
            getByIdObject$: this.sundayOptionsGetByIdObject$,
            getByIdApi: this.sundayGetByIdApi,
            controlType: EnumFormBaseContolType.DROPDOWN,
            shownFrom: 'name',
            dropdownOptions$: this.sundayOptions$,
            type: 'text',
            validators: [
              {
                name: 'required',
                validator: Validators.required,
                errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
              },
            ],
          },
        ],
        [
          {
            flexSize: 6,
            label: EnumTranslateKey.UI_COMPONENT_LABEL_SHIFT_HOURS_START,
            field: 'hoursStartStr',
            value: '',
            controlType: EnumFormBaseContolType.TEXTBOX,
            readonly: false,
            type: 'time',
            validators: [
              {
                name: 'required',
                validator: Validators.required,
                errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
              },
            ],
          },
          {
            flexSize: 6,
            label: EnumTranslateKey.UI_COMPONENT_LABEL_SHIFT_HOURS_STOP,
            field: 'hoursStopStr',
            value: '',
            controlType: EnumFormBaseContolType.TEXTBOX,
            readonly: false,
            type: 'time',
            validators: [
              {
                name: 'required',
                validator: Validators.required,
                errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
              },
            ],
          },
        ],

        [
          {
            flexSize: 6,
            label: EnumTranslateKey.UI_COMPONENT_LABEL_SHIFT_BREAKS_FROM,
            field: 'breaksFromStr',
            value: '',
            controlType: EnumFormBaseContolType.TEXTBOX,
            readonly: false,
            type: 'time',
          },
          {
            flexSize: 6,
            label: EnumTranslateKey.UI_COMPONENT_LABEL_SHIFT_BREAKS_TO,
            field: 'breaksToStr',
            value: '',
            controlType: EnumFormBaseContolType.TEXTBOX,
            readonly: false,
            type: 'time',
          },
        ],
        [
          {
            flexSize: 6,
            label: EnumTranslateKey.UI_COMPONENT_LABEL_SHIFT_TIME_LATE,
            field: 'timeLate',
            value: 0,
            controlType: EnumFormBaseContolType.TEXTBOX,
            readonly: false,
            type: 'number',
          },
          {
            flexSize: 6,
            label: EnumTranslateKey.UI_COMPONENT_LABEL_SHIFT_TIME_EARLY,
            field: 'timeEarly',
            value: 0,
            controlType: EnumFormBaseContolType.TEXTBOX,
            readonly: false,
            type: 'number',
          },
        ],
        [
          {
            flexSize: 3,
            label: EnumTranslateKey.UI_COMPONENT_LABEL_SHIFT_IS_BREAK,
            field: 'isBoquacc',
            value: '',
            controlType: EnumFormBaseContolType.CHECKBOX,
            readonly: false,
            type: 'boolean',
          },
          {
            flexSize: 3,
            label: EnumTranslateKey.UI_COMPONENT_LABEL_SHIFT_IS_SUNDAY,
            field: 'isSunday',
            value: '',
            controlType: EnumFormBaseContolType.CHECKBOX,
            readonly: false,
            type: 'boolean',
          },
          {
            flexSize: 3,
            label: EnumTranslateKey.UI_COMPONENT_LABEL_SHIFT_IS_NIGHT,
            field: 'isNight',
            value: '',
            controlType: EnumFormBaseContolType.CHECKBOX,
            readonly: false,
            type: 'boolean',
          },
        ],
        [
          {
            flexSize: 12,
            label: EnumTranslateKey.UI_COMPONENT_LABEL_SHIFT_NOTE,
            field: 'note',
            value: '',
            controlType: EnumFormBaseContolType.TEXTBOX,
            readonly: false,
            type: 'text',
          },
          {
            flexSize: 12,
            label: EnumTranslateKey.UI_COMPONENT_LABEL_SHIFT_NOTE,
            field: 'isActive',
            value: '',
            controlType: EnumFormBaseContolType.TEXTBOX,
            readonly: false,
            hidden: true,
            type: 'boolean',
          },
        ],
      ],
    },
  ];
  constructor(
    private appService: AppService,
    public override dialogService: DialogService
  ) {
    super(dialogService);

    this.captionCode = EnumTranslateKey.UI_COMPONENT_TITLE_SHIFT_EDIT;

    this.crud = {
      c: api.AT_SHIFT_CREATE,
      r: api.AT_SHIFT_READ,
      u: api.AT_SHIFT_UPDATE,
      d: api.AT_SHIFT_DELETE,
    };
  }

  ngOnInit(): void {
    this.loading = true;
    this.appService.get(api.AT_SHIFT_TIME_TYPE).subscribe((res: any) => {
      const options: { value: number; text: string }[] = [];
      res.body.innerBody.map((g: any) => {
        options.push({
          value: g.id,
          text: g.name,
        });
      });
      this.timeTypeOptions$.next(options);
      this.loading = false;
    });
    this.appService.get(api.AT_SHIFT_GETLISTTOIMPORT).subscribe((res: any) => {
      const options: { value: number; text: string }[] = [];
      res.body.innerBody.map((g: any) => {
        options.push({
          value: g.id,
          text: g.name,
        });
      });
      this.saturdayOptions$.next(options);
      this.sundayOptions$.next(options);
      this.loading = false;
    });
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
