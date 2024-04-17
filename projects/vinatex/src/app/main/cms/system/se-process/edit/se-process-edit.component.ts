import { AfterViewInit, Component } from '@angular/core';
import { Validators, FormGroup } from '@angular/forms';
import { BaseEditComponent, ICoreDropdownOption, ICorePageEditColumnComposition, ICorePageEditCRUD, ICoreFormSection, EnumFormBaseContolType, DialogService } from 'ngx-histaff-alpha';
import { Subscription, BehaviorSubject, map } from 'rxjs';
import { SeProcessEditService } from './se-process-edit.service';
import { EnumTranslateKey, api } from 'alpha-global-constants';

@Component({
  selector: 'app-se-process-edit',
  templateUrl: './se-process-edit.component.html',
  styleUrls: ['./se-process-edit.component.scss'],
})
export class SeProcessEditComponent
  extends BaseEditComponent
  implements AfterViewInit
{
  /* Properties to be passed into core-page-edit */
  override entityTable = 'SE_PROCESS';

  loading: boolean = false;
  subscriptions: Subscription[] = [];

  processTypeOptions$ = new BehaviorSubject<ICoreDropdownOption[]>([]);
  processTypeGetByIdObject$ = new BehaviorSubject<any>(null);
  processTypeGetByIdAPI = api.SE_PROCESS_GET_PROCESS_TYPE_BY_ID;
  //chưa có trong db
  approvedContentOptions$ = new BehaviorSubject<ICoreDropdownOption[]>([
    {
      text: 'ND1',
      value: 1,
    },
    {
      text: 'ND2',
      value: 2,
    },
    {
      text: 'ND3',
      value: 3,
    },
  ]);
  approvedContentGetByIdObject$ = new BehaviorSubject<any>(null);
  approvedContentGetByIdAPI = api.HU_ORGANIZATION_READ;
  //chưa có trong db
  approvedSucessContentOptions$ = new BehaviorSubject<ICoreDropdownOption[]>([
    {
      text: 'ND1',
      value: 1,
    },
    {
      text: 'ND2',
      value: 2,
    },
    {
      text: 'ND3',
      value: 3,
    },
  ]);
  approvedSucessContentGetByIdObject$ = new BehaviorSubject<any>(null);
  approvedSucessContentGetByIdAPI = api.PA_PHASE_ADVANCE_READ;
  //chưa có trong db
  notApprovedContentOptions$ = new BehaviorSubject<ICoreDropdownOption[]>([
    {
      text: 'ND1',
      value: 1,
    },
    {
      text: 'ND2',
      value: 2,
    },
    {
      text: 'ND3',
      value: 3,
    },
  ]);
  notApprovedContentGetByIdObject$ = new BehaviorSubject<any>(null);
  notApprovedContentGetByIdAPI = api.PA_PHASE_ADVANCE_READ;

  captionCode!: EnumTranslateKey;
  formComposition!: ICorePageEditColumnComposition[][];
  crud!: ICorePageEditCRUD;

  sections: ICoreFormSection[] = [
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
            type: 'text',
          },
        ],
        [
          {
            flexSize: 4,
            label: EnumTranslateKey.UI_COMPONENT_LABEL_SE_PROCESS_CODE,
            field: 'code',
            value: '',
            controlType: EnumFormBaseContolType.TEXTBOX,
            readonly: false,
            type: 'string',
            validators: [
              {
                name: 'required',
                validator: Validators.required,
                errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
              },
            ],
          },
          {
            flexSize: 4,
            label: EnumTranslateKey.UI_COMPONENT_LABEL_SE_PROCESS_NAME,
            field: 'name',
            value: '',
            controlType: EnumFormBaseContolType.TEXTBOX,
            readonly: false,
            type: 'string',
            validators: [
              {
                name: 'required',
                validator: Validators.required,
                errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
              },
            ],
          },
          {
            flexSize: 4,
            label: EnumTranslateKey.UI_COMPONENT_LABEL_SE_PROCESS_TYPE,
            field: 'processTypeId',
            value: '',
            controlType: EnumFormBaseContolType.DROPDOWN,
            dropdownOptions$: this.processTypeOptions$,
            getByIdObject$: this.processTypeGetByIdObject$,
            getByIdApi: this.processTypeGetByIdAPI,
            shownFrom: 'name',
            readonly: false,
            type: 'number',
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
            flexSize: 4,
            label:
              EnumTranslateKey.UI_COMPONENT_LABEL_SE_PROCESS_CONTENT_APPROVE,
            field: 'approvedContent',
            value: '',
            controlType: EnumFormBaseContolType.TEXTBOX,
            readonly: false,
            type: 'string',
            validators: [
              {
                name: 'required',
                validator: Validators.required,
                errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
              },
            ],
          },
          {
            flexSize: 4,
            label:
              EnumTranslateKey.UI_COMPONENT_LABEL_SE_PROCESS_CONTENT_APPROVE_SUCCESS,
            field: 'approvedSucessContent',
            value: '',
            controlType: EnumFormBaseContolType.TEXTBOX,
            readonly: false,
            type: 'string',
            validators: [
              {
                name: 'required',
                validator: Validators.required,
                errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
              },
            ],
          },
          {
            flexSize: 4,
            label:
              EnumTranslateKey.UI_COMPONENT_LABEL_SE_PROCESS_CONTENT_NOT_APPROVE,
            field: 'notApprovedContent',
            value: '',
            controlType: EnumFormBaseContolType.TEXTBOX,
            readonly: false,
            type: 'string',
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
            flexSize: 4,
            label:
              EnumTranslateKey.UI_COMPONENT_LABEL_SE_PROCESS_IS_NOTI_APPROVE,
            field: 'isNotiApprove',
            value: '',
            controlType: EnumFormBaseContolType.CHECKBOX,
            readonly: false,
            type: 'boolean',
          },
          {
            flexSize: 4,
            label:
              EnumTranslateKey.UI_COMPONENT_LABEL_SE_PROCESS_IS_NOTI_NOT_APPROVE,
            field: 'isNotiNotApprove',
            value: '',
            controlType: EnumFormBaseContolType.CHECKBOX,
            readonly: false,
            type: 'boolean',
          },
          {
            flexSize: 4,
            label:
              EnumTranslateKey.UI_COMPONENT_LABEL_SE_PROCESS_IS_NOTI_APPROVE_SS,
            field: 'isNotiApproveSuccess',
            value: '',
            controlType: EnumFormBaseContolType.CHECKBOX,
            readonly: false,
            type: 'boolean',
          },
        ],
        [
          {
            flexSize: 12,
            label: EnumTranslateKey.UI_COMPONENT_LABEL_SE_PROCESS_DESCRIPTION,
            field: 'proDescription',
            value: '',
            controlType: EnumFormBaseContolType.TEXTAREA,
            readonly: false,
            type: 'string',
          },
        ],
        // [
        //   {
        //     flexSize: 12,
        //     label: EnumTranslateKey.UI_COMPONENT_LABEL_SE_PROCESS_APPROVE,
        //     field: 'approve',
        //     value: '',
        //     controlType: EnumFormBaseContolType.TEXTAREA,
        //     readonly: false,
        //     type: 'string',
        //   },
        // ],
        // [
        //   {
        //     flexSize: 12,
        //     label: EnumTranslateKey.UI_COMPONENT_LABEL_SE_PROCESS_REFUSE,
        //     field: 'refuse',
        //     value: '',
        //     controlType: EnumFormBaseContolType.TEXTAREA,
        //     readonly: false,
        //     type: 'string',
        //   },
        // ],
        [
          {
            flexSize: 12,
            label:
              EnumTranslateKey.UI_COMPONENT_LABEL_SE_PROCESS_ADJUSTMENT_PARAM,
            field: 'adjustmentParam',
            value: '',
            controlType: EnumFormBaseContolType.TEXTAREA,
            readonly: false,
            type: 'string',
          },
        ],
      ],
    },
  ];

  constructor(
    public override dialogService: DialogService,
    private spService: SeProcessEditService
  ) {
    super(dialogService);

    this.captionCode = EnumTranslateKey.UI_COMPONENT_TITLE_SE_PROCESS;

    this.crud = {
      c: api.SE_PROCESS_CREATE,
      r: api.SE_PROCESS_READ,
      u: api.SE_PROCESS_UPDATE,
      d: api.SE_PROCESS_DELETE_IDS,
    };
  }
  ngAfterViewInit(): void {
    this.subscriptions.push(
      this.spService
        .CreateNewCode()
        .pipe(
          map((f: any) => {
            let options: string = '';
            options = f.body.innerBody.code;
            return options;
          })
        )
        .subscribe((response: any) => {
          if (this.form.get('code')?.value == '')
            this.form.get('code')?.patchValue(response);
        }),

      this.spService
        .GetProcessType()
        .pipe(
          map((x: any) => {
            if (x.ok && x.status === 200) {
              const options: { value: number; text: string; code: string }[] =
                [];
              x.body.innerBody.map((g: any) => {
                options.push({
                  value: g.id,
                  text: g.name,
                  code: g.code,
                });
              });
              return options;
            } else {
              return [];
            }
          })
        )
        .subscribe((response: any) => {
          this.processTypeOptions$.next(response);
          this.loading = false;
        })
    );
  }

  ngOnInit(): void {
    this.loading = true;
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
