import { Component } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, Subscription, map } from 'rxjs';
import { EnumTranslateKey, api } from 'alpha-global-constants';
import { BaseEditComponent, ICoreDropdownOption, ICorePageEditCRUD, ICoreFormSection, EnumFormBaseContolType, DialogService } from 'ngx-histaff-alpha';
import { ListFundSourceEditService } from './list-fund-source.edit.service';

@Component({
  selector: 'app-list-fund-source-edit',
  templateUrl: './list-fund-source-edit.component.html',
  styleUrls: ['./list-fund-source-edit.component.scss'],
})
export class ListFundSourceEditComponent extends BaseEditComponent {
  override entityTable = 'PA_LIST_FUND_SOURCE';
  subsctiptions: Subscription[] = [];
  loading: boolean = false;

  captionCode!: EnumTranslateKey;
  companyOptions$ = new BehaviorSubject<ICoreDropdownOption[]>([]);
  companyGetByIdObject$ = new BehaviorSubject<any>(null);
  companyGetByIdApi = api.HU_COMPANY_READ;

  crud!: ICorePageEditCRUD;
  sections: ICoreFormSection[] = [
    {
      rows: [
        [
          {
            flexSize: 0,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_INS_GROUP_ID,
            value: '',
            controlType: EnumFormBaseContolType.TEXTBOX,
            field: 'id',
            readonly: true,
            hidden: true,
            type: 'text',
          },
          {
            flexSize: 6,
            label: EnumTranslateKey.UI_COMPONENT_LABEL_PA_LIST_FUND_SOURCE_CODE,
            value: '',
            controlType: EnumFormBaseContolType.TEXTBOX,
            field: 'code',
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
          {
            flexSize: 6,
            label: EnumTranslateKey.UI_COMPONENT_LABEL_PA_LIST_FUND_SOURCE_NAME,
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
      ],
    },
    {
      rows: [
        [
          {
            flexSize: 6,
            label: EnumTranslateKey.UI_COMPONENT_LABEL_PA_LIST_FUND_SOURCE_COMPANY_NAME,
            field: 'companyId',
            value: '',
            controlType: EnumFormBaseContolType.DROPDOWN,
            dropdownOptions$: this.companyOptions$,
            getByIdObject$: this.companyGetByIdObject$,
            getByIdApi: this.companyGetByIdApi,
            shownFrom: 'nameVn',
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
            flexSize: 6,
            label: EnumTranslateKey.UI_COMPONENT_LABEL_PA_LIST_FUND_SOURCE_NOTE,
            field: 'note',
            value: '',
            controlType: EnumFormBaseContolType.TEXTBOX,
            readonly: false,
            type: 'string',
          },
        ],
      ],
    },
  ];

  constructor(public override dialogService: DialogService, private lseService: ListFundSourceEditService) {
    super(dialogService);

    this.captionCode = EnumTranslateKey.UI_COMPONENT_TITLE_SE_LDAP_EDIT;

    this.crud = {
      c: api.PA_LIST_FUND_SOURCE_CREATE,
      r: api.PA_LIST_FUND_SOURCE_READ,
      u: api.PA_LIST_FUND_SOURCE_UPDATE,
      d: api.PA_LIST_FUND_SOURCE_DELETE_IDS,
    };
  }

  /* GET FormGroup Instance */
  onFormCreated(e: FormGroup): void {
    this.form = e;
    this.subsctiptions.push(
      this.lseService
        .CreateNewCode()
        .pipe(
          map((f: any) => {
            let options: string = '';
            options = f.body.innerBody.code;
            return options;
          }),
        )
        .subscribe((response: any) => {
          console.log(this.form.get('code'));
          if (this.form.get('code')?.value == '') this.form.get('code')?.patchValue(response);
        }),
    );
  }

  /* To allow form to be deactivated */
  onFormReinit(e: string): void {
    this.formInitStringValue = e;
  }

  ngOnInit(): void {
    this.loading = true;
    this.lseService
      .getCompany()
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
        }),
      )
      .subscribe((response) => {
        this.companyOptions$.next(response);
        this.loading = false;
      });
  }
}
