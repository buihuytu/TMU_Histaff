import { Component } from "@angular/core";
import { Validators, FormGroup } from "@angular/forms";
import { api, EnumTranslateKey } from 'alpha-global-constants';
import { BaseEditComponent, ICoreDropdownOption, ICorePageEditColumnComposition, ICorePageEditCRUD, ICoreFormSection, EnumFormBaseContolType, EnumCoreFormControlSeekerSourceType, DialogService, MultiLanguageService, AppService, IFormatedResponse } from "ngx-histaff-alpha";
import { BehaviorSubject, Subscription } from "rxjs";


@Component({
  selector: 'app-sign-default-edit',
  templateUrl: './signdefault-edit.component.html',
  styleUrls: ['./signdefault-edit.component.scss']
})
export class SignDefaultEditComponent extends BaseEditComponent {

  /* Properties to be passed into core-page-edit */

  override entityTable = "AT_SIGN_DEFAULT";

  employeeGetByIdObject$ = new BehaviorSubject<any>(null);
  employeeGetByIdApi = api.HU_EMPLOYEE_READ;

  shiftOptions$ = new BehaviorSubject<ICoreDropdownOption[]>([]);
  atShiftGetByIdObject$ = new BehaviorSubject<any>(null);
  atShiftGetByIdApi = api.AT_SHIFT_READ;

  loading: boolean = false;

  subsctiptions: Subscription[] = [];

  captionCode!: EnumTranslateKey;
  formComposition!: ICorePageEditColumnComposition[][];
  crud!: ICorePageEditCRUD;
  sections: ICoreFormSection[] =
    [
      {
        rows: [
          [
            {
              flexSize: 0,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_COMMON_ID,
              field: 'id',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              readonly: true,
              hidden:true,
              type: 'text'
            },
            {
              flexSize: 0,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_WELFARE_MNG_DEPARTMENT_NAME,
              field: 'orgId',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              type: 'text',
              hidden: true,
            },
          ],
          [
            {
              flexSize: 4,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SIGN_DEFAULT_EMPLOYEE_CODE,
              field: 'employeeId',
              value: '',
              controlType: EnumFormBaseContolType.SEEKER,
              /* 
                START: WHEN USING controlType === EnumFormBaseContolType.SEEKER
                we must pass the three properties bellow:
               */
              seekerSourceType: EnumCoreFormControlSeekerSourceType.EMPLOYEE_SEEK,
              getByIdObject$: this.employeeGetByIdObject$,
              getByIdApi: this.employeeGetByIdApi,
              boundFrom: 'id',
              shownFrom: 'code',
              alsoBindTo: [
                            { takeFrom: 'fullname', bindTo: 'employeeName' },
                            { takeFrom: 'positionName', bindTo: 'positionName' },
                            { takeFrom: 'orgId', bindTo: 'orgId' },
                            { takeFrom: 'orgName', bindTo: 'orgName' }],
              /* END: WHEN USING controlType === EnumFormBaseContolType.SEEKER */
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
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SIGN_DEFAULT_EMPLOYEE_NAME,
              field: 'employeeName',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              readonly: false,
              type: 'text', 
              disabled: true, 
            },
            {
              flexSize: 4,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SIGN_DEFAULT_DEPARTMENT_NAME,
              field: 'orgName',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              readonly: false,
              type: 'text',
              disabled: true,
              
            },
          ],
          [
            {
              flexSize: 6,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SIGN_DEFAULT_POSITION_NAME,
              field: 'positionName',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              readonly: false,
              type: 'text',
              disabled: true,
            },
            {
              flexSize: 6,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SIGN_DEFAULT_SHIFT,
              field: 'signDefault',
              value: '',
              controlType: EnumFormBaseContolType.DROPDOWN,
              dropdownOptions$: this.shiftOptions$,
              getByIdObject$: this.atShiftGetByIdObject$,
              getByIdApi: this.atShiftGetByIdApi,
              shownFrom: 'name',
              readonly: false,
              type: 'number',
              validators: [
                {
                  name: 'required',
                  validator: Validators.required,
                  errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
                }
              ]
            },
          ], 
          [
            {
              flexSize: 6,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SIGN_DEFAULT_EFFECT_DATE_FROM,
              field: 'effectDateFrom',
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
              flexSize: 6,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SIGN_DEFAULT_EFFECT_DATE_TO,
              field: 'effectDateTo',
              value: '',
              controlType: EnumFormBaseContolType.DATEPICKER,
              type: 'date',
            }
          ],
          [
            {
              flexSize: 0,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_WELFARE_MNG_STATUS,
              field: 'isActive',
              value: 1,
              controlType: EnumFormBaseContolType.TEXTBOX,
              readonly: true,
              hidden: true,
              type: 'text'
            },
            {
              flexSize: 12,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_WELFARE_MNG_NOTE,
              field: 'note',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              type: 'text',
            },
          ],
        ]
      },  
    ];
  constructor(
    public override dialogService: DialogService,
    private mls: MultiLanguageService,
    private appService: AppService // CoreService is DEPRECATED!!!
  ) {

    super(dialogService);

    this.captionCode = EnumTranslateKey.UI_COMPONENT_TITLE_AT_SIGN_DEFAULT;

    this.crud = {
      c: api.AT_SIGN_DEFAULT_CREATE,
      r: api.AT_SIGN_DEFAULT_READ,
      u: api.AT_SIGN_DEFAULT_UPDATE,
      d: api.AT_SIGN_DEFAULT_DELETE,
    };

  }
  ngOnInit(): void {    
    this.loading = true;
    this.subsctiptions.push(
      this.appService
      .get(api.AT_SHIFT_GETLISTTOIMPORT)
      .subscribe((res: any) => {

        if (!!res.ok && res.status === 200) {
          const body: IFormatedResponse = res.body
          if (body.statusCode === 200 && !!body.innerBody) {


        const options: { value: number | null; text: string; }[] = [];
        options.push({
          value: Number(),
          text: ''
        })
        res.body.innerBody.map((g: any) => {
          options.push({
            value: g.id,
            text: g.name
          })
        })
        this.shiftOptions$.next(options);
      }}
      })
    )
    
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