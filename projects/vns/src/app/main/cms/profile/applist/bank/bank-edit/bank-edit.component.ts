import { Component } from "@angular/core";
import { Validators, FormGroup } from "@angular/forms";
import { EnumTranslateKey, api } from 'alpha-global-constants';
import { BaseEditComponent, ICoreDropdownOption, ICorePageEditCRUD, ICoreFormSection, EnumFormBaseContolType, DialogService } from "ngx-histaff-alpha";
import { BehaviorSubject, Subscription, map } from "rxjs";
import { BankEditService } from "./bank-edit.service";

@Component({
  selector: 'app-bank-edit',
  templateUrl: './bank-edit.component.html',
  styleUrls: ['./bank-edit.component.scss']
})
export class BankEditComponent  extends BaseEditComponent {

  /* Properties to be passed into core-page-edit */
  loading: boolean = false;
  override entityTable = "HU_BANK";
  scaleOptions$ = new BehaviorSubject<ICoreDropdownOption[]>([]);
  captionCode!: EnumTranslateKey;
  subsctiptions: Subscription[] = [];
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
              type: 'text',
              hidden :true
            }
          ],
          [
            {
              flexSize: 12,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_BANK_CODE,
              field: 'code',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              type: 'text',
              readonly: true,
              disabled:true,
              validators: [
                {
                  name: 'required',
                  validator: Validators.required,
                  errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
                },
                {
                  name: 'minLength',
                  validator: Validators.minLength(1),
                  errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_MIN_LENGTH,
                }
              ]
            },
          ],
          [
            {
              flexSize: 12,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_BANK_NAME,
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
                {
                  name: 'minLength',
                  validator: Validators.minLength(1),
                  errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_MIN_LENGTH,
                }
              ]
            },
          ],
          [
            {
              flexSize: 12,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_BANK_SHORT_NAME,
              field: 'shortName',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              type: 'text', 
            },
          ],
          [
            {
              flexSize: 0,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_BANK_IS_ACTIVE,
              field: 'isActive',
              value: 1,
              controlType: EnumFormBaseContolType.TEXTBOX,
              readonly: true,
              hidden: true,
              type: 'text'
            },
            {
              flexSize: 12,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_BANK_NOTE,
              field: 'note',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              type: 'text',
            },
          ]
        ]
      }
    ];

  constructor(
    public override dialogService: DialogService,
    private beService: BankEditService
  ) {

    super(dialogService);

    this.captionCode = EnumTranslateKey.UI_COMPONENT_TITLE_BANK_EDIT;

    this.crud = {
      c: api.HU_BANK_CREATE,
      r: api.HU_BANK_READ,
      u: api.HU_BANK_UPDATE,
      d: api.HU_BANK_DELETE,
    };

  }

  ngOnInit(): void {
    this.loading = true;
  }

  /* GET FormGroup Instance */
  onFormCreated(e: FormGroup): void {
    this.form = e;
    this.subsctiptions.push(
      this.beService.getCode()
        .pipe(
          map((f: any) => {
            let options: string = "";
            options = f.body.innerBody.code;
            return options;
          })
        )
        .subscribe(response => {
          console.log(this.form.get('code'));
          if(this.form.get('code')?.value == "") 
            this.form.get('code')?.patchValue(response);
        })
    )
}

  /* To allow form to be deactivated */
  onFormReinit(e: string): void {
    this.formInitStringValue = e;
  }

}
