import { Component } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { EnumTranslateKey, api } from 'alpha-global-constants';
import { BaseEditComponent, ICoreDropdownOption, ICorePageEditCRUD, ICoreFormSection, EnumFormBaseContolType, DialogService, AppService } from 'ngx-histaff-alpha';
import { Subscription, BehaviorSubject } from 'rxjs';
interface OptionContext {
  value: number;
  text: string;
}

@Component({
  selector: 'app-pe-capacity-framework-edit',
  templateUrl: './pe-capacity-framework-edit.component.html',
  styleUrl: './pe-capacity-framework-edit.component.scss'
})

export class PeCapacityFrameworkEditComponent extends BaseEditComponent {
  override entityTable = 'PE_CAPACITY_FRAMEWORK';
  
  subscriptions: Subscription[] = [];
  
  captionCode!: EnumTranslateKey;


  // "drop down list" to choose "Total score is not required"
  totalScoreIsNotRequiredGetByIdApi = api.SYS_OTHERLIST_READ;
  totalScoreIsNotRequiredGetByIdObject$ = new BehaviorSubject<any>(null);
  totalScoreIsNotRequiredOptions$ = new BehaviorSubject<ICoreDropdownOption[]>([]);


  loading: boolean = false;
  
  crud!: ICorePageEditCRUD;

  sections: ICoreFormSection[] =
    [
      {
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
              type: 'text'
            },
          ],
          [
            {
              flexSize: 6,
              label: EnumTranslateKey.UI_ENTITY_FIELD_WORD_RESPONSE_RATE,
              field: 'ratioFrom',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              type: 'number',
              validators: [
                {
                  name: 'required',
                  validator: Validators.required,
                  errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED
                }
              ]
            },
            {
              flexSize: 6,
              label: EnumTranslateKey.UI_ENTITY_FIELD_INCOMING_RESPONSE_RATE,
              field: 'ratioTo',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              type: 'number',
              validators: [
                {
                  name: 'required',
                  validator: Validators.required,
                  errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED
                }
              ]
            }
          ],
          [
            {
              flexSize: 6,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_RATING,
              field: 'rating',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              type: 'text',
              validators: [
                {
                  name: 'required',
                  validator: Validators.required,
                  errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED
                }
              ]
            },
            {
              flexSize: 6,
              label: EnumTranslateKey.UI_ENTITY_FIELD_TOTAL_SCORE_NOT_REQUIRED,
              field: 'scoreNotRequired',
              value: '',
              type: 'string',
              controlType: EnumFormBaseContolType.DROPDOWN,
              getByIdApi: this.totalScoreIsNotRequiredGetByIdApi,
              getByIdObject$: this.totalScoreIsNotRequiredGetByIdObject$,
              dropdownOptions$: this.totalScoreIsNotRequiredOptions$,
              shownFrom: 'name'
            }
          ],
          [
            {
              flexSize: 12,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_WELFARE_MNG_NOTE,
              field: 'description',
              value: '',
              controlType: EnumFormBaseContolType.TEXTAREA,
              type: 'string',
              validators: [
                {
                  name: 'required',
                  validator: Validators.required,
                  errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED
                }
              ]
            },
          ]
        ]
      }
    ];

  constructor (
    public override dialogService: DialogService,
    private appService: AppService,
  ) {
    super(dialogService);

    this.captionCode = EnumTranslateKey.UI_COMPONENT_TITLE_PE_CAPACITY_FRAMEWORK;

    this.crud = {
      c: api.PE_CAPACITY_FRAMEWORK_CREATE,
      r: api.PE_CAPACITY_FRAMEWORK_READ,
      u: api.PE_CAPACITY_FRAMEWORK_UPDATE,
      d: api.PE_CAPACITY_FRAMEWORK_DELETE,
    };
  }

  ngOnInit(): void {

  }

  onFormCreated(e: FormGroup): void {
    this.form = e;

    this.subscriptions.push(
      this.appService.get(api.SYS_OTHERLIST_GETOTHERLISTBYTYPE + "SCORE_NOT_REQUIRED").subscribe(res => {
        const options: OptionContext[] = [];
        
        res.body.innerBody.map((g: any) => {
          options.push({
            value: g.id,
            text: g.name
          })
        });

        this.totalScoreIsNotRequiredOptions$.next(options);
      })
    );
  }

  onFormReinit(e: string): void {
    this.formInitStringValue = e;
  }
}