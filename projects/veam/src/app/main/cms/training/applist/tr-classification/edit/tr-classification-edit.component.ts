import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, Subscription, map } from 'rxjs';
import { TrClassificationService } from '../tr-classification.service';
import { AppService, BaseEditComponent, CorePageEditComponent, DialogService, EnumFormBaseContolType, ICoreDropdownOption, ICoreFormSection, ICorePageEditCRUD, ICorePageEditColumnComposition, MultiLanguageService } from 'ngx-histaff-alpha';
import { EnumTranslateKey, api } from 'alpha-global-constants';

@Component({
  selector: 'app-tr-classification-edit',
  standalone: true,
  imports: [
    CommonModule,
    CorePageEditComponent,
  ],
  templateUrl: './tr-classification-edit.component.html',
  styleUrl: './tr-classification-edit.component.scss'
})
export class TrClassificationEditComponent extends BaseEditComponent{
  override entityTable = "TR_CLASSIFICATION";

  loading: boolean = false;

  subsctiptions: Subscription[] = [];

  captionCode!: EnumTranslateKey;
  formComposition!: ICorePageEditColumnComposition[][];
  crud!: ICorePageEditCRUD;
  subscriptions: Subscription[] = [];
  
  descNameGetByIdApi = api.SYS_OTHERLIST_READ;
  descNameGetByIdObject$ = new BehaviorSubject<any>(null);
  descNameOptions$ = new BehaviorSubject<ICoreDropdownOption[]>([]);

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
          ],
          [
            {
              flexSize: 6,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_TR_CLASSIFICATION_NAME,
              field: 'name',
              value: '',
              type: 'text',
              controlType: EnumFormBaseContolType.TEXTBOX,
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
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_TR_CLASSIFICATION_DESC_ID,
              field: 'descId',
              value: '',
              type: 'string',
              controlType: EnumFormBaseContolType.DROPDOWN,
              getByIdApi: this.descNameGetByIdApi,
              getByIdObject$: this.descNameGetByIdObject$,
              dropdownOptions$: this.descNameOptions$,
              shownFrom: 'name',
              validators: [
                {
                  name: 'required',
                  validator: Validators.required,
                  errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED
                }
              ]
            },
          ],
          [
            {
              flexSize: 6,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_TR_CLASSIFICATION_SCORE_FROM,
              field: 'scoreFrom',
              value: '',
              type: 'number',
              controlType: EnumFormBaseContolType.TEXTBOX,
            },
            {
              flexSize: 6,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_TR_CLASSIFICATION_SCORE_TO,
              field: 'scoreTo',
              value: '',
              type: 'number',
              controlType: EnumFormBaseContolType.TEXTBOX,
            },
          ],
          [
            {
              flexSize: 6,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_TR_CLASSIFICATION_EFFECT_DATE,
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
              flexSize: 0,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_COMMON_ID,
              field: 'isActive',
              value: 1,
              controlType: EnumFormBaseContolType.TEXTBOX,
              readonly: true,
              type: 'boolean',
              hidden: true,
            },
          ], 
        ]
      },  
    ];
  constructor(
    public override dialogService: DialogService,
    private mls: MultiLanguageService,
    private appService: AppService, // CoreService is DEPRECATED!!!
    private trClassificationService: TrClassificationService
  ) {

    super(dialogService);

    this.captionCode = EnumTranslateKey.UI_COMPONENT_TITLE_TR_CLASSIFICATION;

    this.crud = {
      c: api.TR_CLASSIFICATION_CREATE,
      r: api.TR_CLASSIFICATION_READ,
      u: api.TR_CLASSIFICATION_UPDATE,
      d: api.TR_CLASSIFICATION_DELETE,
    };
  }

  getListDesc(){
    this.subscriptions.push(
      this.trClassificationService
        .getALLDescClassByKey()
        .pipe(
          map((x: any) => {
            const options: { value: number; text: string; code: string }[] = [];
            x.body.innerBody.map((g: any) => {
              options.push({
                value: g.id,
                text: g.name,
                code: g.code,
              });
            });
            return options;
          })
        )
        .subscribe((response) => {
          this.descNameOptions$.next(response);
        })
    );
  }

  /* GET FormGroup Instance */
  onFormCreated(e: FormGroup): void {
    this.form = e;
    this.getListDesc();
  }

  /* To allow form to be deactivated */
  onFormReinit(e: string): void {
    this.formInitStringValue = e;
  }

  ngOnDestroy(): void {
    this.subscriptions.map(x => x?.unsubscribe())
  }
}
