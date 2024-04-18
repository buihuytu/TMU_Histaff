import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Validators, FormGroup } from '@angular/forms';
import { InsListContractEditService } from '../../../insurance/appbusiness/ins-list-contract/ins-list-contract-edit/ins-list-contract-edit.service';
import { CorePageListComponent, CoreAccordionComponent, CorePageEditComponent, CorePageHeaderComponent, CoreCompositionComponent, CoreStatusStickerComponent, BaseEditComponent, ICorePageEditColumnComposition, ICorePageEditCRUD, ICoreFormSection, EnumFormBaseContolType, DialogService } from 'ngx-histaff-alpha';
import { Subscription } from 'rxjs';
import { EnumTranslateKey, api } from 'alpha-global-constants';
@Component({
  selector: 'app-se-config',
  standalone: true,
  imports: [
    CorePageListComponent,
    CoreAccordionComponent,
    CorePageEditComponent,
    CorePageHeaderComponent,
    CoreCompositionComponent,
    CoreStatusStickerComponent,
    CommonModule,
  ],
  templateUrl: './se-config-edit.component.html',
  styleUrl: './se-config-edit.component.scss'
})
export class SeConfigEditComponent extends BaseEditComponent{
    override entityTable = 'SE_CONFIG';
    subscriptions: Subscription[] = [];
  
    loading: boolean = false;
  
    captionCode!: EnumTranslateKey;
    formComposition!: ICorePageEditColumnComposition[][];
    crud!: ICorePageEditCRUD;
    sections: ICoreFormSection[] = [
      {
        rows: [
          [
            {
              flexSize: 0,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_INS_GROUP_ID,
              field: 'id',
              value: '',
              hidden: true,
              controlType: EnumFormBaseContolType.TEXTBOX,
            },
            {
              flexSize: 6,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SE_CONFIG_SMTP_SERVER,
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
              ]
            },
            {
                flexSize: 6,
                label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SE_CONFIG_PORT,
                field: 'module',
                value: '',
                controlType: EnumFormBaseContolType.TEXTBOX,
                type: 'text',
                validators: [
                  {
                    name: 'required',
                    validator: Validators.required,
                    errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
                  },
                ]
              },
          ],
          
          [
            {
              flexSize: 6,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SE_CONFIG_EMAIL_ADDRESS,
              field: 'value',
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
            {
              flexSize: 6,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SE_CONFIG_IS_AUTH_SSL,
              field: 'isAuthSsl',
              value: '',
              controlType: EnumFormBaseContolType.CHECKBOX,
              type: 'boolean',
            },
          ],
          [
            {
              flexSize: 6,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SE_CONFIG_ACCOUNT,
              field: 'account',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              type: 'text',
            },
            {
              flexSize: 6,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SE_CONFIG_PASSWORD,
              field: 'password',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              type: 'text',
            },
          ],
          [
            {
              flexSize: 6,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SE_CONFIG_IS_AUTH_SENDING_MAIL,
              field: 'isAuthSendingMail',
              value: '',
              controlType: EnumFormBaseContolType.CHECKBOX,
              type: 'boolean',
            },
          ],
        ],
      },
    ];
  
    constructor(
      public override dialogService: DialogService,
      private ilcService: InsListContractEditService
    ) {
      super(dialogService);
  
      this.captionCode = EnumTranslateKey.UI_COMPONENT_TITLE_SE_CONFIG;
  
      this.crud = {
        c: api.SE_CONFIG_CREATE,
        r: api.SE_CONFIG_READ,
        u: api.SE_CONFIG_UPDATE,
        d: api.SE_CONFIG_DELETE_IDS,
      };
    }
  
    /* GET FormGroup Instance */
    onFormCreated(e: FormGroup): void {
      this.form = e;
    }
  
    /* To allow form to be deactivated */
    onFormReinit(e: string): void {
      this.formInitStringValue = e;
      
    }
  
    ngOnInit(): void { }
    ngAfterViewInit(): void {
    }
}
