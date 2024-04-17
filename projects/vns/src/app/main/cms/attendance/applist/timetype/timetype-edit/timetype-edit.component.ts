import { Component } from '@angular/core';
import { Validators, FormGroup } from '@angular/forms';
import { EnumTranslateKey, api } from 'alpha-global-constants';
import { BaseEditComponent, ICoreDropdownOption, ICorePageEditColumnComposition, ICorePageEditCRUD, ICoreFormSection, EnumFormBaseContolType, DialogService } from 'ngx-histaff-alpha';
import { Subscription, BehaviorSubject, map } from 'rxjs';
import { TimeTypeEditService } from './timetype-edit.service';

@Component({
  selector: 'app-timetype-edit',
  templateUrl: './timetype-edit.component.html',
  styleUrls: ['./timetype-edit.component.scss'],
})
export class TimeTypeEditComponent extends BaseEditComponent {
  /* Properties to be passed into core-page-edit */

  override entityTable = 'AT_TIME_TYPE';

  loading: boolean = false;
  subsctiptions: Subscription[] = [];
  groupOptions$ = new BehaviorSubject<ICoreDropdownOption[]>([]);

  typeMorningGetByIdObject$ = new BehaviorSubject<any>(null);
  typeMorningGetByIdApi = api.AT_SHIFT_TIME_TYPE_BY_ID;

  typeAfternoonGetByIdObject$ = new BehaviorSubject<any>(null);
  typeAfternoonGetByIdApi = api.AT_SHIFT_TIME_TYPE_BY_ID;

  captionCode!: EnumTranslateKey;
  formComposition!: ICorePageEditColumnComposition[][];
  crud!: ICorePageEditCRUD;
  sections: ICoreFormSection[] = [
    {
      rows: [
        [
          {
            flexSize: 0,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_TIME_TYPE_ID,
            field: 'id',
            value: 0,
            controlType: EnumFormBaseContolType.TEXTBOX,
            readonly: true,
            hidden: true,
            type: 'text',
          },
          {
            flexSize: 6,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_TIME_TYPE_CODE,
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
            ],
          },
          {
            flexSize: 6,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_TIME_TYPE_NAME,
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
            ],
          },
        ],
        [
          {
            flexSize: 6,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_TIME_TYPE_MORNING,
            field: 'morningId',
            value: '',
            getByIdObject$: this.typeMorningGetByIdObject$,
            getByIdApi: this.typeMorningGetByIdApi,
            controlType: EnumFormBaseContolType.DROPDOWN,
            shownFrom: 'name',
            dropdownOptions$: this.groupOptions$,
            type: 'number',
            validators: [
              {
                name: 'required',
                validator: Validators.required,
                errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
              },
              {
                name: 'minLength',
                validator: Validators.min(1),
                errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
              },
            ],
          },
          {
            flexSize: 6,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_TIME_TYPE_AFTERNOON,
            field: 'afternoonId',
            value: '',
            getByIdObject$: this.typeAfternoonGetByIdObject$,
            getByIdApi: this.typeAfternoonGetByIdApi,
            shownFrom: 'name',
            controlType: EnumFormBaseContolType.DROPDOWN,
            dropdownOptions$: this.groupOptions$,
            type: 'number',
            validators: [
              {
                name: 'required',
                validator: Validators.required,
                errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
              },
              {
                name: 'minLength',
                validator: Validators.min(1),
                errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
              },
            ],
          },
        ],
        [
          {
            flexSize: 6,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_TIME_TYPE_ORDERS,
            field: 'orders',
            value: null,
            controlType: EnumFormBaseContolType.TEXTBOX,
            type: 'number',
          },
          {
            flexSize: 6,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_TIME_TYPE_NOTE,
            field: 'note',
            value: '',
            controlType: EnumFormBaseContolType.TEXTBOX,
            type: 'text',
          },
        ],
        [
          {
            flexSize: 12,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_TIME_TYPE_IS_OFF,
            field: 'isOff',
            value: false,
            controlType: EnumFormBaseContolType.CHECKBOX,
            type: 'boolean',
          },
        ],
      ],
    },
  ];
  constructor(
    public override dialogService: DialogService,
    private timeTypeEditService: TimeTypeEditService
  ) {
    super(dialogService);

    this.captionCode = EnumTranslateKey.UI_COMPONENT_TITLE_TIME_TYPE_EDIT;

    this.crud = {
      c: api.AT_TIME_TYPE_CREATE,
      r: api.AT_TIME_TYPE_READ,
      u: api.AT_TIME_TYPE_UPDATE,
      d: api.AT_TIME_TYPE_DELETE,
    };
  }

  ngOnInit(): void {
    this.loading = true;

    this.subsctiptions.push(
      this.timeTypeEditService
        .geTimeTypeList()
        .pipe(
          map((x: any) => {
            if (x.ok && x.status === 200) {
              const options: { value: number; text: string }[] = [];
              x.body.innerBody.map((g: any) => {
                options.push({
                  value: g.id,
                  text: g.name,
                });
              });
              return options;
            } else {
              return [];
            }
          })
        )
        .subscribe((response) => {
          this.groupOptions$.next(response);
          this.loading = false;
        })
    );
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
