import { Component, ViewEncapsulation } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { EnumTranslateKey, api } from 'alpha-global-constants';
import { AppService, BaseEditComponent, DialogService, EnumFormBaseContolType, ICoreDropdownOption, ICoreFormSection, ICorePageEditCRUD, ICorePageEditColumnComposition } from 'ngx-histaff-alpha';
import { BehaviorSubject, Subscription, map } from 'rxjs';

@Component({
  selector: 'app-allowance-edit',
  templateUrl: './allowance-edit.component.html',
  styleUrls: ['./allowance-edit.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AllowanceEditComponent extends BaseEditComponent {
  override entityTable = 'HU_ALLOWANCE';
  captionCode!: EnumTranslateKey;
  loading: boolean = false;
  TypeOptions$ = new BehaviorSubject<ICoreDropdownOption[]>([]);
  formComposition!: ICorePageEditColumnComposition[][];
  TypeGetByIdObject$ = new BehaviorSubject<any>(null);
  sysOtherlistGetByIdApi = api.SYS_OTHERLIST_READ;
  crud!: ICorePageEditCRUD;
  subsctiptions: Subscription[] = [];
  sections: ICoreFormSection[] = [
    {
      // caption: ...,
      // iconClass: ...,
      rows: [
        [
          {
            flexSize: 0,
            label: EnumTranslateKey.UI_COMPONENT_LABEL_ALLOWANCE_ID,
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
            flexSize: 12,
            label: EnumTranslateKey.UI_COMPONENT_LABEL_ALLOWANCE_CODE,
            field: 'code',
            value: '',
            controlType: EnumFormBaseContolType.TEXTBOX,
            readonly: true,
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
            flexSize: 12,
            label: EnumTranslateKey.UI_COMPONENT_LABEL_ALLOWANCE_NAME,
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
              flexSize: 12,
              label: EnumTranslateKey.UI_COMPONENT_LABEL_ALLOWANCE_TYPE,
              field: 'typeId',
              value: '',
              controlType: EnumFormBaseContolType.DROPDOWN,
              dropdownOptions$: this.TypeOptions$,
              getByIdObject$: this.TypeGetByIdObject$,
              getByIdApi: this.sysOtherlistGetByIdApi,
              type: 'number',
              shownFrom: 'name',
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
            label: EnumTranslateKey.UI_COMPONENT_LABEL_ALLOWANCE_ISINSURANCE,
            field: 'isInsurance',
            value: '',
            controlType: EnumFormBaseContolType.CHECKBOX,
            readonly: false,
            type: 'boolean'
          },
          {
            flexSize: 4,
            label: EnumTranslateKey.UI_COMPONENT_LABEL_ALLOWANCE_ISCOEFICIENT,
            field: 'isCoefficient',
            value: '',
            controlType: EnumFormBaseContolType.CHECKBOX,
            readonly: false,
            type: 'boolean'
          },
          {
            flexSize: 4,
            label: EnumTranslateKey.UI_COMPONENT_LABEL_ALLOWANCE_ISSAL,
            field: 'isSal',
            value: '',
            controlType: EnumFormBaseContolType.CHECKBOX,
            readonly: false,
            type: 'boolean'
          },
        ],
        [
          {
            flexSize: 12,
            label: EnumTranslateKey.UI_COMPONENT_LABEL_ALLOWANCE_NOTE,
            field: 'note',
            value: '',
            controlType: EnumFormBaseContolType.TEXTAREA,
            readonly: false,
            type: 'text',
          },
        ],
      ],
    },
  ];
  constructor(
    public override dialogService: DialogService,
    private appService: AppService,
  ) {
    super(dialogService);

    this.captionCode = EnumTranslateKey.UI_COMPONENT_TITLE_ALLOWANCE;

    this.crud = {
      c: api.HU_ALLOWANCE_CREATE,
      r: api.HU_ALLOWANCE_READ,
      u: api.HU_ALLOWANCE_UPDATE,
      d: api.HU_ALLOWANCE_DELETE,
    };
  }
  ngOnInit(): void {
    this.loading = true;
    this.appService
    .get(api.SYS_OTHERLIST_GETOTHERLISTBYTYPE + 'ALLOWANCE_TYPE')
    .subscribe((res: any) => {
      const options: { value: number; text: string; }[] = [];
      res.body.innerBody.map((g: any) => {
        options.push({
          value: g.id,
          text: g.name
        })
      })
      this.TypeOptions$.next(options);
    })
  }
  onFormCreated(e: FormGroup): void {
    this.form = e;
    this.subsctiptions.push(
      this.appService.get(api.HU_ALLOWANCE_GETCODE)
        .pipe(
          map((f: any) => {
            let options: string = "";
            options = f.body.innerBody.code;
            return options;
          })
        )
        .subscribe(response => {
          //console.log(this.form.get('code'));
          if(this.form.get('code')?.value == "") this.form.get('code')?.patchValue(response);
        })
    )!
  }
  onFormReinit(e: string): void {
    this.formInitStringValue = e;
    console.log('xon' + e);
  }
}
