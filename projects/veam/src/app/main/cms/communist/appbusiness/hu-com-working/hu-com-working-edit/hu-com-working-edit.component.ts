import { AfterViewInit, Component } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { EnumTranslateKey, api } from 'alpha-global-constants';
import { CorePageEditComponent, BaseEditComponent, ICorePageEditCRUD, ICoreChecklistOption, ICoreDropdownOption, ICoreFormSection, EnumFormBaseContolType, EnumCoreFormControlSeekerSourceType, DialogService, AppService, IFormatedResponse } from 'ngx-histaff-alpha';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-hu-com-working-edit',
  standalone: true,
  imports: [
    CorePageEditComponent,
  ],
  templateUrl: './hu-com-working-edit.component.html',
  styleUrl: './hu-com-working-edit.component.scss'
})
export class HuComWorkingEditComponent extends BaseEditComponent implements AfterViewInit {
  override entityTable = 'HU_EVALUATE';
  crud!: ICorePageEditCRUD;
  captionCode: EnumTranslateKey = EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_HU_COM_WORKING;



  employeeGetByIdObject$ = new BehaviorSubject<any>(null);
  employeeGetByIdApi = api.HU_EMPLOYEE_READ;


  positionOptions$ = new BehaviorSubject<ICoreChecklistOption[]>([]);
  positionGetByIdObject$ = new BehaviorSubject<any>(null);

  tranferTypeGroupOptions$ = new BehaviorSubject<ICoreDropdownOption[]>([]);
  tranferTypeGetByIdObject$ = new BehaviorSubject<any>(null);
  tranferTypeGetByIdApi = api.HU_SALARY_RANK_READ;

  sections: ICoreFormSection[] = [
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_HU_COM_WORKING_INFO_COM,
      rows: [
        [
          {
            flexSize: 0,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_COMMON_ID,
            field: 'id',
            value: '',
            controlType: EnumFormBaseContolType.TEXTBOX,
            readonly: true,
            type: 'text',
            hidden: true,
          },
          {
            flexSize: 3,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_HU_COM_WORKING_COM_CODE,
            field: 'comEmployeeId',
            value: '',
            type: 'string',
            controlType: EnumFormBaseContolType.SEEKER,
            seekerSourceType: EnumCoreFormControlSeekerSourceType.EMPLOYEE_SEEK,
            getByIdObject$: this.employeeGetByIdObject$,
            getByIdApi: this.employeeGetByIdApi,
            boundFrom: 'id',
            shownFrom: 'fullname',
            alsoBindTo: [
              { takeFrom: 'positionName', bindTo: 'positionName' },
              { takeFrom: 'fullname', bindTo: 'signName' },
            ],
            validators: [
              {
                name: 'required',
                validator: Validators.required,
                errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
              }
            ]
          },
          {
            flexSize: 3,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_HU_COM_WORKING_COM_NAME,
            field: 'comEmployeeName',
            value: '',
            controlType: EnumFormBaseContolType.TEXTBOX,
            disabled: true,
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
            flexSize: 3,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_HU_COM_WORKING_POS,
            field: 'positionCur',
            value: [],
            readonly: true,
            disabled: true,
            controlType: EnumFormBaseContolType.CHECKLIST,
            checklistOptions$: this.positionOptions$,
            getByIdObject$: this.positionGetByIdObject$,
            shownFrom: 'text',
          },
          {
            flexSize: 3,
            label: EnumTranslateKey.UI_COMPONENT_LABEL_HU_EVALUATION_COM_LIVING_AREA,
            field: 'areaCur',
            value: '',
            controlType: EnumFormBaseContolType.TEXTBOX,
            disabled: true,
            type: 'text',
          },
        ],
        [
          {
            flexSize: 3,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_HU_COM_WORKING_TYPE_TRANSFER,
            field: 'typeTranferCur',
            value: '',
            getByIdObject$: this.tranferTypeGetByIdObject$,
            getByIdApi: this.tranferTypeGetByIdApi,
            shownFrom: 'name',
            controlType: EnumFormBaseContolType.DROPDOWN,
            dropdownOptions$: this.tranferTypeGroupOptions$,
            type: 'number',
          },
          {
            flexSize: 3,
            label: EnumTranslateKey.UI_COMPONENT_TITLE_HU_COMMEND_NO,
            field: 'decisionNoCur',
            value: '',
            controlType: EnumFormBaseContolType.TEXTBOX,
            disabled: true,
            type: 'text',
          },
          {
            flexSize: 3,
            label: EnumTranslateKey.UI_COMPONENT_TITLE_HU_COMMEND_EFFECT_DATE,
            field: 'effectDateCur',
            value: '',
            controlType: EnumFormBaseContolType.DATEPICKER,
            disabled: true,
            type: 'date',
          },
          {
            flexSize: 3,
            label: EnumTranslateKey.UI_LABEL_TR_CLASS_NOTE,
            field: 'noteCur',
            value: '',
            type: 'text',
            disabled: true,
            controlType: EnumFormBaseContolType.TEXTAREA,
            textareaRows: 1,
          },
        ],
        [
          {
            flexSize: 3,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_HU_WORKING_SIGN_DATE,
            field: 'signDateCur',
            value: '',
            type: 'text',
            disabled: true,
            controlType: EnumFormBaseContolType.TEXTBOX,
          },
          {
            flexSize: 3,
            label: EnumTranslateKey.UI_COMPONENT_TITLE_HU_COMMEND_SIGN_NAME,
            field: 'signNameCur',
            value: '',
            controlType: EnumFormBaseContolType.TEXTBOX,
            disabled: true,
            type: 'text',
          },
          {
            flexSize: 3,
            label: EnumTranslateKey.UI_COMPONENT_TITLE_HU_COMMEND_POSITION_PAYMENT_NAME,
            field: 'signPositionCur',
            value: '',
            controlType: EnumFormBaseContolType.TEXTBOX,
            disabled: true,
            type: 'text',
          },
          {
            flexSize: 3,
            label: EnumTranslateKey.UI_LABEL_TR_CLASS_NOTE,
            field: 'noteSignCur',
            value: '',
            type: 'text',
            disabled: true,
            controlType: EnumFormBaseContolType.TEXTAREA,
            textareaRows: 1,
          },
        ],
      ],
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_HU_COM_WORKING_INFO_COM_TRANFER,
      rows: [
        [
          {
            flexSize: 3,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_HU_COM_WORKING_TYPE_TRANSFER,
            field: 'tranferTypeId',
            value: '',
            getByIdObject$: this.tranferTypeGetByIdObject$,
            getByIdApi: this.tranferTypeGetByIdApi,
            shownFrom: 'name',
            controlType: EnumFormBaseContolType.DROPDOWN,
            dropdownOptions$: this.tranferTypeGroupOptions$,
            type: 'number',
            validators: [
              {
                name: 'required',
                validator: Validators.required,
                errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
              }
            ]
          },
          {
            flexSize: 3,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_HU_COM_WORKING_POS,
            field: 'positionList',
            value: '',
            controlType: EnumFormBaseContolType.CHECKLIST,
            checklistOptions$: this.positionOptions$,
            getByIdObject$: this.positionGetByIdObject$,
            shownFrom: 'text',
            validators: [
              {
                name: 'required',
                validator: Validators.required,
                errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
              }
            ]
          },
          {
            flexSize: 3,
            label: EnumTranslateKey.UI_COMPONENT_LABEL_HU_EVALUATION_COM_LIVING_AREA,
            field: 'orgId',
            value: '',
            controlType: EnumFormBaseContolType.TEXTBOX,
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
            flexSize: 3,
            label: EnumTranslateKey.UI_COMPONENT_TITLE_HU_COMMEND_NO,
            field: 'decisionNo',
            value: '',
            controlType: EnumFormBaseContolType.TEXTBOX,
            type: 'text',
          },
        ],
        [
          {
            flexSize: 3,
            label: EnumTranslateKey.UI_COMPONENT_TITLE_HU_COMMEND_EFFECT_DATE,
            field: 'effectDate',
            value: '',
            controlType: EnumFormBaseContolType.DATEPICKER,
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
            flexSize: 3,
            label: EnumTranslateKey.UI_LABEL_TR_CLASS_NOTE,
            field: 'note',
            value: '',
            type: 'text',
            controlType: EnumFormBaseContolType.TEXTAREA,
            textareaRows: 1,
          },
        ],
        [
          {
            flexSize: 3,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_HU_WORKING_SIGN_DATE,
            field: 'signDate',
            value: '',
            type: 'text',
            controlType: EnumFormBaseContolType.TEXTBOX,
          },
          {
            flexSize: 3,
            label: EnumTranslateKey.UI_COMPONENT_TITLE_HU_COMMEND_SIGN_NAME,
            field: 'signName',
            value: '',
            controlType: EnumFormBaseContolType.TEXTBOX,
            type: 'text',
          },
          {
            flexSize: 3,
            label: EnumTranslateKey.UI_COMPONENT_TITLE_HU_COMMEND_POSITION_PAYMENT_NAME,
            field: 'signPosition',
            value: '',
            controlType: EnumFormBaseContolType.TEXTBOX,
            type: 'text',
          },
          {
            flexSize: 3,
            label: EnumTranslateKey.UI_LABEL_TR_CLASS_NOTE,
            field: 'notePd',
            value: '',
            type: 'text',
            controlType: EnumFormBaseContolType.TEXTAREA,
            textareaRows: 1,
          },
        ],
        [
          {
            flexSize: 3,
            label: EnumTranslateKey.UI_LABEL_TRAINING_CENTER_ATTACHED_FILE,
            field: 'attachedFileBuffer',
            value: '',
            controlType: EnumFormBaseContolType.ATTACHMENT,
            assignTo: 'attachedFile',
            type: 'string',
          },
        ]
      ],
    },
  ];

  constructor(
    public override dialogService: DialogService,
    private appService: AppService

  ) {
    super(dialogService);
    this.crud = {
      c: api.HU_EVALUATE_CREATE,
      r: api.HU_EVALUATE_READ,
      u: api.HU_EVALUATE_UPDATE,
      d: api.HU_EVALUATE_DELETE_IDS,
    };
  }
  ngAfterViewInit(): void {
    setTimeout(() => {
      this.appService.get(api.SYS_OTHERLIST_GETOTHERLISTBYTYPE + 'COMMUNIST_POSITION').pipe().subscribe((res: any) => {
        if (!!res.ok && res.status === 200) {
          const body: IFormatedResponse = res.body
          if (body.statusCode === 200 && !!body.innerBody) {
            const options: { value: number | null; text: string; checked: boolean }[] = [];
            res.body.innerBody.map((g: any) => {
              options.push({
                value: g.id,
                text: g.name,
                checked: false
              })
            })
            this.positionOptions$.next(options);
          }
        }
      }),
        this.appService.get(api.SYS_OTHERLIST_GETOTHERLISTBYTYPE + 'TRANFER_TYPE').pipe().subscribe((res: any) => {
          if (!!res.ok && res.status === 200) {
            const body: IFormatedResponse = res.body
            if (body.statusCode === 200 && !!body.innerBody) {
              const options: { value: number | null; text: string; }[] = [];
              res.body.innerBody.map((g: any) => {
                options.push({
                  value: g.id,
                  text: g.name,
                })
              })
              this.tranferTypeGroupOptions$.next(options);
            }
          }
        })
    });
  }
  onFormCreated(e: FormGroup): void {
    this.form = e;
  }
  onFormReinit(e: string): void {
    this.formInitStringValue = e;
  }
}
