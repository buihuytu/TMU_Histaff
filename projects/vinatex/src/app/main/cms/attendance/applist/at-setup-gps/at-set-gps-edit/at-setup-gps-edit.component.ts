import { Component } from '@angular/core';
import { Validators, FormGroup } from '@angular/forms';
import { BehaviorSubject, Subscription } from 'rxjs';
import { EnumTranslateKey, api } from 'alpha-global-constants';
import { BaseEditComponent, ICorePageEditColumnComposition, ICorePageEditCRUD, ICoreFormSection, EnumFormBaseContolType, EnumCoreFormControlSeekerSourceType, DialogService } from 'ngx-histaff-alpha';

@Component({
  selector: 'app-at-setup-gps-edit',
  templateUrl: './at-setup-gps-edit.component.html',
  styleUrls: ['./at-setup-gps-edit.component.scss']
})
export class AtSetupGpsEditComponent extends BaseEditComponent {
  override entityTable = 'AT_SETUP_GPS';
  subscriptions: Subscription[] = [];

  loading: boolean = false;

  organizationGetByIdObject$ = new BehaviorSubject<any>(null);
  organizationGetByIdApi = api.HU_ORGANIZATION_READ;

  captionCode!: EnumTranslateKey;
  formComposition!: ICorePageEditColumnComposition[][];
  crud!: ICorePageEditCRUD;
  sections: ICoreFormSection[] = [
    {
      rows: [
        [
          {
            flexSize: 0,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_INS_GROUP_ID,
            field: 'id',
            value: '',
            hidden: true,
            controlType: EnumFormBaseContolType.TEXTBOX,
          },
          {
            flexSize: 6,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_AT_TIME_TIMESHEET_DAILY_DEPARTMENT_NAME,
            field: 'orgId',
            value: '',
            controlType: EnumFormBaseContolType.SEEKER,
            seekerSourceType: EnumCoreFormControlSeekerSourceType.ORGANIZATION_UNIT_SEEK,
            getByIdObject$: this.organizationGetByIdObject$,
            getByIdApi: this.organizationGetByIdApi,
            boundFrom: 'id',
            shownFrom: 'name',
            //alsoBindTo: [{ takeFrom: 'name', bindTo: 'orgId' }],
            /* END: WHEN USING controlType === EnumFormBaseContolType.SEEKER */
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
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_AT_SETUP_GPS_NAME,
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
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_AT_SETUP_GPS_ADDRESS,
            field: 'address',
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
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_AT_SETUP_GPS_LAT,
            field: 'latVd',
            value: '',
            controlType: EnumFormBaseContolType.TEXTBOX,
            type: 'text',
            readonly: false,
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
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_AT_SETUP_GPS_LONG,
            field: 'longKd',
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
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_AT_SETUP_GPS_RADIUS,
            field: 'radius',
            value: '',
            controlType: EnumFormBaseContolType.TEXTBOX,
            type: 'number',
            readonly: false,
            validators: [
              {
                name: 'required',
                validator: Validators.required,
                errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
              },
            ],
          },
        ],
      ],
    },
  ];

  constructor(
    public override dialogService: DialogService, 
    ) {
    super(dialogService);

    this.captionCode = EnumTranslateKey.UI_COMPONENT_TITLE_AT_SETUP_GPS;

    this.crud = {
      c: api.AT_SETUP_GPS_CREATE,
      r: api.AT_SETUP_GPS_READ,
      u: api.AT_SETUP_GPS_UPDATE,
      d: api.AT_SETUP_GPS_DELETE_IDS,
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

  ngOnInit(): void {}
  ngAfterViewInit(): void {
    this.loading = true;
    setTimeout(() => {
    });
  }
}
