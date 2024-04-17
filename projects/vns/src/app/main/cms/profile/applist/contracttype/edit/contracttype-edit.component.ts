import { Component } from '@angular/core';

import { ContractTypeEditService } from './contracttype.edit.service';
import { Validators, FormGroup } from '@angular/forms';
import { BaseEditComponent, ICoreDropdownOption, ICorePageEditColumnComposition, ICorePageEditCRUD, ICoreFormSection, EnumFormBaseContolType, DialogService, MultiLanguageService, AppService, CoreFormService, IFormatedResponse } from 'ngx-histaff-alpha';
import { BehaviorSubject, Subscription, map, distinctUntilChanged } from 'rxjs';
import { EnumTranslateKey, api } from 'alpha-global-constants';

@Component({
  selector: 'app-contracttype-edit',
  templateUrl: './contracttype-edit.component.html',
  styleUrls: ['./contracttype-edit.component.scss'],
})
export class ContractTypeEditComponent extends BaseEditComponent {
  /* Properties to be passed into core-page-edit */

  override entityTable = 'HU_CONTRACT_TYPE';
  defTimeContract: string = '';
  originalName!: string;

  contractTypeOptions$ = new BehaviorSubject<ICoreDropdownOption[]>([]);
  huContractTypeGetByIdObject$ = new BehaviorSubject<any>(null);
  hucontractTypeGetByIdApi = api.HU_CONTRACT_TYPE_GET_BY_ID_CONTRACT_TYPE_SYS;

  loading: boolean = false;
  subsctiptions: Subscription[] = [];

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
            type: 'number',
          },
        ],
        [
          {
            flexSize: 6,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_CONTRACT_TYPE_CODE,
            field: 'code',
            value: '',
            controlType: EnumFormBaseContolType.TEXTBOX,
            readonly: true,
            type: 'text',
            disabled: true,
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
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_CONTRACT_TYPE_NAME,
            field: 'name',
            value: '',
            controlType: EnumFormBaseContolType.TEXTBOX,
            type: 'text',
            focus$: new BehaviorSubject<any>(null),
            blur$: new BehaviorSubject<any>(null),
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
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_CONTRACT_TYPE_TYPE,
            field: 'typeId',
            value: '',
            controlType: EnumFormBaseContolType.DROPDOWN,
            dropdownOptions$: this.contractTypeOptions$,
            getByIdObject$: this.huContractTypeGetByIdObject$,
            getByIdApi: this.hucontractTypeGetByIdApi,
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
          {
            flexSize: 6,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_CONTRACT_TYPE_PERIOD,
            field: 'period',
            value: null,
            controlType: EnumFormBaseContolType.TEXTBOX,
            type: 'number',
          },
        ],
        [
          {
            flexSize: 3,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_CONTRACT_TYPE_BHXH,
            field: 'isBhxh',
            value: '',
            controlType: EnumFormBaseContolType.CHECKBOX,
            type: 'boolean',
          },
          {
            flexSize: 3,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_CONTRACT_TYPE_BHYT,
            field: 'isBhyt',
            value: '',
            controlType: EnumFormBaseContolType.CHECKBOX,
            type: 'boolean',
          },
          {
            flexSize: 3,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_CONTRACT_TYPE_BHTN,
            field: 'isBhtn',
            value: '',
            controlType: EnumFormBaseContolType.CHECKBOX,
            type: 'boolean',
          },
          {
            flexSize: 3,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_CONTRACT_TYPE_BHTNLD_BNN,
            field: 'isBhtnldBnn',
            value: '',
            controlType: EnumFormBaseContolType.CHECKBOX,
            type: 'boolean',
          },
        ],
        [
          {
            flexSize: 0,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_CONTRACT_TYPE_STATUS,
            field: 'isActive',
            value: 1,
            controlType: EnumFormBaseContolType.TEXTBOX,
            readonly: true,
            hidden: true,
            type: 'text',
          },
          {
            flexSize: 12,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_CONTRACT_TYPE_NOTE,
            field: 'note',
            value: '',
            controlType: EnumFormBaseContolType.TEXTBOX,
            type: 'text',
          },
        ],
      ],
    },
  ];
  constructor(
    public override dialogService: DialogService,
    private mls: MultiLanguageService,
    private appService: AppService, // CoreService is DEPRECATED!!!
    private coreFormService: CoreFormService,
    private contractTypeService: ContractTypeEditService,
  ) {
    super(dialogService);

    this.captionCode = EnumTranslateKey.UI_COMPONENT_TITLE_CONTRACT_TYPE_EDIT;

    this.crud = {
      c: api.HU_CONTRACT_TYPE_CREATE,
      r: api.HU_CONTRACT_TYPE_READ,
      u: api.HU_CONTRACT_TYPE_UPDATE,
      d: api.HU_CONTRACT_TYPE_DELETE,
    };
  }

  ngOnInit(): void {
    this.loading = true;
    this.subsctiptions.push(
      this.appService.get(api.HU_CONTRACT_TYPE_GET_CONTRACT_TYPE_SYS).subscribe((res: any) => {
        if (!!res.ok && res.status === 200) {
          const body: IFormatedResponse = res.body;
          if (body.statusCode === 200 && !!body.innerBody) {
            const options: { value: number | null; text: string }[] = [];
            options.push({
              value: Number(),
              text: '',
            });
            res.body.innerBody.map((g: any) => {
              options.push({
                value: g.id,
                text: g.name,
              });
            });
            this.contractTypeOptions$.next(options);
          }
        }
      }),
    );

    this.coreFormService.getFormBaseControlByName(this.sections, 'name')?.focus$?.subscribe(x => {
      console.log("name focused")
    })

    this.coreFormService.getFormBaseControlByName(this.sections, 'name')?.blur$?.subscribe(x => {
      console.log("name unfocused")
      console.log("name",this.form.get('name')?.value == null);
      if(this.form.get('name')?.value != ""){
        console.log(this.originalName);
        this.subsctiptions.push(
          this.contractTypeService.checkCodeExists(this.originalName)
            .pipe(
              map((f: any) => {
                let options: string = "";
                options = f.body.innerBody.code;
                return options;
              })
            )
            .subscribe(response => {
              console.log(this.form.get('code')?.value);
              console.log(response);
              if(this.originalName != response) 
                this.form.get('code')?.patchValue(response);
            })
        )!
      }
    })
  }

  /* GET FormGroup Instance */
  onFormCreated(e: FormGroup): void {
    this.form = e;
    const reg =
      /[ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ]+/;
    this.form
      .get('name')
      ?.valueChanges.pipe(distinctUntilChanged())
      .subscribe((x) => {
        if (!!x) {
          var codeNew = x
            .split(' ')
            .map((x1: string) => (!isNaN(Number(x1)) ? x1 : x1.charAt(0)))
            .join('')
            .toUpperCase();
          codeNew = codeNew.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, 'a');
          codeNew = codeNew.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, 'e');
          codeNew = codeNew.replace(/I|Í|Ì|Ĩ|Ị/g, 'I');
          codeNew = codeNew.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, 'o');
          codeNew = codeNew.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, 'u');
          codeNew = codeNew.replace(/Y|Ý|Ỳ|Ỹ|Ỵ/g, 'Y');
          codeNew = codeNew.replace(/Đ/g, 'D');
          this.form.get('code')?.setValue(codeNew);
          this.originalName = codeNew;
        } else {
          this.form.get('code')?.setValue('');        
        }
      })!;

    const regex: any = /^[0-9]+$/;
    this.subsctiptions.push(
      (this.defTimeContract = this.form.get('period')?.value),
      //check costs
      this.form
        .get('period')
        ?.valueChanges.pipe(distinctUntilChanged())
        .subscribe((x) => {
          setTimeout(() => {
            if (regex.test(this.form.get('period')?.value) || this.form.get('period')?.value == '') {
              this.defTimeContract = this.form.get('period')?.value;
            }
            this.form.get('period')?.setValue(this.defTimeContract);
          }, 20);
        })!,
    );
  }

  /* To allow form to be deactivated */
  onFormReinit(e: string): void {
    this.formInitStringValue = e;
  }
}
