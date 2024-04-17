import { Component } from '@angular/core';
import { BehaviorSubject, Subscription, map } from 'rxjs';

import { FormGroup, Validators } from '@angular/forms';
import { BaseEditComponent, DialogService, EnumFormBaseContolType, ICoreChecklistOption, ICoreDropdownOption, ICoreFormSection, ICorePageEditCRUD } from 'ngx-histaff-alpha';
import { BankBranchEditService } from './bank-branch.edit.service';
import { api, EnumTranslateKey } from 'alpha-global-constants';

@Component({
  selector: 'app-bank-branch-edit',
  templateUrl: './bank-branch-edit.component.html',
  styleUrls: ['./bank-branch-edit.component.scss'],
})
export class BankBranchEditComponent extends BaseEditComponent {
  loading: boolean = false;
  override entityTable = 'HU_BANK';
  checklistOptions$ = new BehaviorSubject<ICoreChecklistOption[]>([]);

  subsctiptions: Subscription[] = [];
  scaleOptions$ = new BehaviorSubject<ICoreDropdownOption[]>([]);
  huBankGetByIdObject$ = new BehaviorSubject<any>(null);
  huBankGetByIdApi = api.HU_BANK_READ;
  captionCode!: EnumTranslateKey;
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
            type: 'text',
            hidden: true,
          },
        ],
        [
          {
            flexSize: 6,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_BANK_BRANCH_CODE,
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
            ],
          },
          {
            flexSize: 6,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_BANK_BRANCH_NAME,
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
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_BANK_NAME,
            field: 'bankId',
            value: '',
            controlType: EnumFormBaseContolType.DROPDOWN,
            dropdownOptions$: this.scaleOptions$,
            getByIdObject$: this.huBankGetByIdObject$,
            getByIdApi: this.huBankGetByIdApi,
            shownFrom: 'name',
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
            flexSize: 0,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_BANK_BRANCH_IS_ACTIVE,
            field: 'isActive',
            value: 1,
            controlType: EnumFormBaseContolType.TEXTBOX,
            readonly: true,
            hidden: true,
            type: 'text'
          },
          {
            flexSize: 12,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_BANK_BRANCH_NOTE,
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
    private slrService: BankBranchEditService
  ) {
    super(dialogService);

    this.captionCode = EnumTranslateKey.UI_COMPONENT_TITLE_BANK_BRANCH_EDIT;

    this.crud = {
      c: api.HU_BANK_BRANCH_CREATE,
      r: api.HU_BANK_BRANCH_READ,
      u: api.HU_BANK_BRANCH_UPDATE,
      d: api.HU_BANK_BRANCH_DELETE_IDS,
    };
  }

  ngOnInit(): void {
    this.loading = true;
    this.slrService
      .getListBank()
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
        this.scaleOptions$.next(response);
        this.loading = false;
      });
  }

  /* GET FormGroup Instance */
  onFormCreated(e: FormGroup): void {
    this.form = e;
    this.subsctiptions.push(
      this.slrService.getCode()
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
