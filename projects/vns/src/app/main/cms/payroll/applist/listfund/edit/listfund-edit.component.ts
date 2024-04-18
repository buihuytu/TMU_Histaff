import { AfterViewInit, Component, ViewEncapsulation } from '@angular/core';
import { Validators, FormGroup } from '@angular/forms';
import { BehaviorSubject, Subscription, map } from 'rxjs';
import { EnumTranslateKey, api } from 'alpha-global-constants';
import { BaseEditComponent, ICoreDropdownOption, ICorePageEditCRUD, ICoreFormSection, EnumFormBaseContolType, DialogService, AppService } from 'ngx-histaff-alpha';
import { ListfundEditService } from './listfund-edit.service';

@Component({
  selector: 'app-listfund-edit',
  templateUrl: './listfund-edit.component.html',
  styleUrls: ['./listfund-edit.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ListfundEditComponent
  extends BaseEditComponent
  implements AfterViewInit
{
  /* Properties to be passed into core-page-edit */
  loading: boolean = false;
  override entityTable = 'PA_LISTFUND';

  huCompanyGetByIdObject$ = new BehaviorSubject<any>(null);
  huCompanyOptions$ = new BehaviorSubject<ICoreDropdownOption[]>([]);
  huCompanyGetByIdApi = api.HU_COMPANY_READ;

  subsctiptions: Subscription[] = [];

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
            hidden: true,
            type: 'text',
          },
        ],
        [
          {
            flexSize: 6,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_PA_LISTFUND_CODE,
            field: 'listfundCode',
            value: '',
            controlType: EnumFormBaseContolType.TEXTBOX,
            type: 'text',
            readonly: true,
            disabled: true,
          },
          {
            flexSize: 6,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_PA_LISTFUND_NAME,
            field: 'listfundName',
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
              {
                name: 'minLength',
                validator: Validators.minLength(1),
                errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_MIN_LENGTH,
              },
            ],
          },
        ],
        [
          {
            flexSize: 6,
            label:
              EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_PA_LISTFUND_COMPANY_NAME,
            field: 'companyId',
            value: '',
            controlType: EnumFormBaseContolType.DROPDOWN,
            dropdownOptions$: this.huCompanyOptions$,
            getByIdObject$: this.huCompanyGetByIdObject$,
            shownFrom: 'nameVn',
            getByIdApi: this.huCompanyGetByIdApi,
            readonly: false,
            type: 'number',
          },
          {
            flexSize: 6,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_PA_LISTFUND_NOTE,
            field: 'note',
            value: '',
            controlType: EnumFormBaseContolType.TEXTBOX,
            type: 'text',
            readonly: false,
          },
        ],
      ],
    },
  ];

  constructor(
    public override dialogService: DialogService,
    public appService: AppService,
    private slrService: ListfundEditService
  ) {
    super(dialogService);

    this.captionCode = EnumTranslateKey.UI_COMPONENT_TITLE_PA_LISTFUND_EDIT;

    this.crud = {
      c: api.PA_LISTFUND_CREATE,
      r: api.PA_LISTFUND_READ,
      u: api.PA_LISTFUND_UPDATE,
      d: api.PA_LISTFUND_DELETE_IDS,
    };
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.loading = true;
      this.slrService
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
          })
        )
        .subscribe((response) => {
          this.huCompanyOptions$.next(response);
          this.loading = false;
        });
    });
  }

  /* GET FormGroup Instance */
  onFormCreated(e: FormGroup): void {
    this.form = e;
    this.subsctiptions.push(
      this.slrService
        .CreateCodeNew()
        .pipe(
          map((f: any) => {
            let options: string = '';
            options = f.body.innerBody.listfundCode;
            return options;
          })
        )
        .subscribe((response: any) => {
          console.log(this.form.get('listfundCode'));
          if (this.form.get('listfundCode')?.value == '')
            this.form.get('listfundCode')?.patchValue(response);
        })
    );
  }

  /* To allow form to be deactivated */
  onFormReinit(e: string): void {
    this.formInitStringValue = e;
  }

  ngOnDestroy(): void {
    this.subsctiptions.map((x) => x?.unsubscribe());
  }
}
