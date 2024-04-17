import { Component } from '@angular/core';
import { Validators, FormGroup } from '@angular/forms';
import { BehaviorSubject, Subscription } from 'rxjs';
import { AtSetupWifiEditService } from './at-setup-wifi-edit.service';
import { api, EnumTranslateKey } from 'alpha-global-constants';
import { BaseEditComponent, ICorePageEditColumnComposition, ICorePageEditCRUD, ICoreFormSection, EnumFormBaseContolType, EnumCoreFormControlSeekerSourceType, DialogService } from 'ngx-histaff-alpha';

@Component({
  selector: 'app-at-setup-wifi-edit',
  templateUrl: './at-setup-wifi-edit.component.html',
  styleUrls: ['./at-setup-wifi-edit.component.scss']
})
export class AtSetupWifiEditComponent extends BaseEditComponent {
  override entityTable = 'AT_SETUP_WIFI';
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
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_AT_SETUP_NAME,
            field: 'nameVn',
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
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_AT_SETUP_WIFI_NAME,
            field: 'nameWifi',
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
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_AT_SETUP_IP,
            field: 'ip',
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
            flexSize: 12,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_INS_LIST_CONTRACT_NOTE,
            field: 'note',
            value: '',
            controlType: EnumFormBaseContolType.TEXTBOX,
            readonly: false,
            type: 'text',
          },
        ],
      ],
    },
  ];

  constructor(
    public override dialogService: DialogService, 
    private wifiService: AtSetupWifiEditService
    ) {
    super(dialogService);

    this.captionCode = EnumTranslateKey.UI_COMPONENT_TITLE_AT_SETUP_WIFI;

    this.crud = {
      c: api.AT_SETUP_WIFI_CREATE,
      r: api.AT_SETUP_WIFI_READ,
      u: api.AT_SETUP_WIFI_UPDATE,
      d: api.AT_SETUP_WIFI_DELETE_IDS,
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
        // this.wifiService
        //   .getListYearPeroid()
        //   .pipe(
        //     map((x: any) => {
        //       if (x.ok && x.status === 200) {
        //         const options: { value: number; text: string }[] = [];
        //         x.body.innerBody.map((g: any) => {
        //           options.push({
        //             value: g,
        //             text: g.toString(),
        //           });
        //         });
        //         return options;
        //       } else {
        //         return [];
        //       }
        //     })
        //   )
        //   .subscribe((response) => {
        //     this.yearPeroidOptions$.next(response);
        //     this.loading = false;
        //   })
    });
  }
}
