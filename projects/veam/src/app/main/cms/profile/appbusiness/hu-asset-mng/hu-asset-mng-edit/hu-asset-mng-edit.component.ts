import { Component } from '@angular/core';
import { Validators, FormGroup } from '@angular/forms';
import { api, EnumTranslateKey } from 'alpha-global-constants';
import { CorePageListComponent, CoreListComponent, CorePageHeaderComponent, CoreOrgTreeComponent, CorePageEditComponent, CoreStatusStickerComponent, BaseEditComponent, ICoreChecklistOption, ICorePageEditColumnComposition, ICorePageEditCRUD, ICoreFormSection, EnumFormBaseContolType, EnumCoreFormControlSeekerSourceType, EnumCoreTablePipeType, DialogService } from 'ngx-histaff-alpha';
import { Subscription, BehaviorSubject, map } from 'rxjs';
import { HuAssetMngEditService } from './hu-asset-mng-edit.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-hu-asset-mng-edit',
  standalone: true,
  imports: [
    CommonModule,
    CorePageListComponent,
    CoreListComponent,
    CorePageHeaderComponent,
    CoreOrgTreeComponent,
    CorePageEditComponent,
    CoreStatusStickerComponent
  ],
  templateUrl: './hu-asset-mng-edit.component.html',
  styleUrl: './hu-asset-mng-edit.component.scss'
})
export class HuAssetMngEditComponent extends BaseEditComponent {
  override entityTable = 'HU_ASSET_MNG';
  loading: boolean = false;
  subscriptions: Subscription[] =[];

  huEmployeeOptions$ = new BehaviorSubject<any>(null);
  huEmployeeGetByIdObject$ = new BehaviorSubject<any>(null);
  huEmployeeGetByIdApi = api.HU_EMPLOYEE_READ;

  otherlistOptions$ = new BehaviorSubject<any>(null);
  otherlistGetByIdObject$ = new BehaviorSubject<any>(null);
  otherlistGetByIdApi = api.SYS_OTHERLIST_READ;

  huAssetOptions$ = new BehaviorSubject<ICoreChecklistOption[]>([]);
  huAssetGetByIdObject$ = new BehaviorSubject<any>(null);

  captionCode!: EnumTranslateKey;
  formComposition!: ICorePageEditColumnComposition[][];
  crud!: ICorePageEditCRUD;
  check: any[] = [];
  period: any[] = [];

  sections: ICoreFormSection[] =
  [
    {
      rows: [
        [
          {
            flexSize: 6,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_COMMON_ID,
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
            flexSize: 4,
            label: EnumTranslateKey.UI_COMPONENT_LABEL_WAGE_EMPLOYEE_CODE,
            field: 'employeeId',
            value: '',
            controlType: EnumFormBaseContolType.SEEKER,
            seekerSourceType: EnumCoreFormControlSeekerSourceType.EMPLOYEE_SEEK,
            //dropdownOptions$: this.organizationOptions$,
            getByIdObject$: this.huEmployeeGetByIdObject$,
            getByIdApi: this.huEmployeeGetByIdApi,
            boundFrom: 'id',
            shownFrom: 'code',
            alsoBindTo: [
              {takeFrom: 'fullName', bindTo: 'fullName'},
              {takeFrom: 'orgName', bindTo: 'organizationName'},
              {takeFrom: 'positionName', bindTo: 'positionName'},
              {takeFrom: 'jobName', bindTo: 'jobName'}
            ],
            readonly: true,
            type: 'text',
            validators: [
              {
                name: 'required',
                validator: Validators.required,
                errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
              }
            ]
          },
          {
            flexSize: 4,
            label: EnumTranslateKey.UI_COMPONENT_LABEL_WAGE_EMPLOYEE_NAME,
            field: 'employeeName',
            value: '',
            controlType: EnumFormBaseContolType.TEXTBOX,
            type: 'text',
            readonly: false,
            disabled: true,
          },
          {
            flexSize: 4,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SWIPE_DATA_ORGANIZATION_NAME,
            field: 'organizationName',
            value: '',
            controlType: EnumFormBaseContolType.TEXTBOX,
            type: 'text',
            readonly: false,
            disabled: true,
          },
        ],
        [
          {
            flexSize: 4,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_ARISING_POSITION_NAME,
            field: 'positionName',
            value: '',
            controlType: EnumFormBaseContolType.TEXTBOX,
            type: 'text',
            readonly: false,
            disabled: true,
          },
          {
            flexSize: 4,
            label: EnumTranslateKey.UI_ENTITY_FIELD_HU_ASSET_MNG_POSITION_JOB,
            field: 'jobName',
            value: '',
            controlType: EnumFormBaseContolType.TEXTBOX,
            type: 'text',
            readonly: false,
            disabled: true,
          },
          {
            flexSize: 4,
            label: EnumTranslateKey.UI_ENTITY_FIELD_HU_ASSET_MNG_CODE_TYPE_ASSET,//ma loai tai san
            field: 'listAssetId',
            value: [""],
            controlType: EnumFormBaseContolType.CHECKLIST,
            checklistOptions$: this.huAssetOptions$,
            getByIdObject$: this.huAssetGetByIdObject$,
            shownFrom: 'name',
            // getByIdApi: this.atSymbolGetByIdApi,
            type: 'string',
            readonly: true,
          },
        ],
        [
          {
            flexSize: 4,
            label: EnumTranslateKey.UI_ENTITY_FIELD_HU_ASSET_MNG_SERIAl_NUMBER,
            field: 'serialNum',
            value: '',
            controlType: EnumFormBaseContolType.TEXTBOX,
            type: 'string',
            readonly: false,
          },
          {
            flexSize: 4,
            label: EnumTranslateKey.UI_ENTITY_FIELD_HU_ASSET_MNG_VALUE_ASSET,
            field: 'valueAsset',
            value: '',
            controlType: EnumFormBaseContolType.CURRENCY,
            pipe: EnumCoreTablePipeType.NUMBER,
            type: 'number',
            readonly: false,
          },
        ],
        [
          {
            flexSize: 4,
            label: EnumTranslateKey.UI_ENTITY_FIELD_HU_ASSET_MNG_DATE_ISSUE,
            field: 'dateIssue',
            value: '',
            controlType:EnumFormBaseContolType.DATEPICKER,
            readonly: false,
            type: 'date',
            validators: [
              {
                name: 'required',
                validator: Validators.required,
                errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
              }
            ]
          },
          {
            flexSize: 4,
            label: EnumTranslateKey.UI_ENTITY_FIELD_HU_ASSET_MNG_REVOCATION_DATE,
            field: 'revocationDate',
            value: '',
            controlType: EnumFormBaseContolType.DATEPICKER,
            readonly: false,
            type: 'date',
          },
          {
            flexSize: 4,
            label: EnumTranslateKey.UI_ENTITY_FIELD_HU_ASSET_MNG_STATUS_ASSET,
            field: 'statusAssetId',
            value: '',
            controlType: EnumFormBaseContolType.DROPDOWN,
            getByIdObject$: this.otherlistGetByIdObject$,
            dropdownOptions$: this.otherlistOptions$,
            getByIdApi: this.otherlistGetByIdApi,
            shownFrom: "name",
            type: 'number',
            readonly: false,
          }
        ],
        [
          {
            flexSize: 12,
            label: EnumTranslateKey.UI_COMPONENT_TITLE_PA_PHASE_ADVANCE_NOTE,
            field: 'note',
            value: '',
            controlType: EnumFormBaseContolType.TEXTBOX,
            type: 'text',
            readonly: false,
          },
        ]
      ]
    },
  ];

  constructor(
    public override dialogService: DialogService,
    private slrService: HuAssetMngEditService,
  ) {
    super(dialogService);

    this.captionCode = EnumTranslateKey.UI_COMPONENT_TITLE_HU_ASSET_MNG;
    this.crud = {
      c: api.PA_PHASE_ADVANCE_CREATE,
      r: api.PA_PHASE_ADVANCE_READ,
      u: api.PA_PHASE_ADVANCE_UPDATE,
      d: api.PA_PHASE_ADVANCE_DELETE_IDS,
    };
  }

  ngAfterViewInit(): void{
    this.loading  = true;
  }

    ngOnInit(): void {
    this.loading = true;
    this.slrService
      .getAsset()
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
      .subscribe((response: any) => {
        this.huAssetOptions$.next(response);
        this.loading = false;
      });

      this.slrService
      .getStatusAsset()
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
      .subscribe((response: any) => {
        this.otherlistOptions$.next(response);
        this.loading = false;
      });
  }


  /* GET FormGroup Instance */
  onFormCreated(e: FormGroup): void {
    this.form = e as FormGroup;
  }

  /* To allow form to be deactivated */
  onFormReinit(e: string): void {
    this.formInitStringValue = e;
  }
}
