import { Component, TemplateRef, ViewChild } from '@angular/core';
import { EnumTranslateKey, api } from 'alpha-global-constants';
import { ActivatedRoute, Router } from '@angular/router';
import { CorePageListComponent, CoreAccordionComponent, CorePageEditComponent, CorePageHeaderComponent, CoreCompositionComponent, CoreStatusStickerComponent, CoreCheckboxComponent, ICorePageListApiDefinition, ICorePageListCRUD, ICoreTableColumnItem, EnumCoreTablePipeType, ICorePageListEditRouting } from 'ngx-histaff-alpha';
import { InsHealthInsuranceRoutingModule } from '../../insurance/appbusiness/ins-health-insurance/ins-health-insurance-routing.module';


@Component({
  selector: 'app-se-config',
  standalone: true,
  imports: [
    CorePageListComponent,
    CoreAccordionComponent,
    CorePageEditComponent,
    InsHealthInsuranceRoutingModule,
    CorePageHeaderComponent,
    CoreCompositionComponent,
    CoreStatusStickerComponent,
    CoreCheckboxComponent
  ],
  templateUrl: './se-config.component.html',
  styleUrl: './se-config.component.scss'
})
export class SeConfigComponent {
  /*
  Properties being passed to core-page-list
  */
  title = EnumTranslateKey.UI_COMPONENT_TITLE_SE_CONFIG;

  @ViewChild('isAuthSsl') isAuthSsl!: TemplateRef<any>;
  @ViewChild('isAuthSendingMail') isAuthSendingMail!: TemplateRef<any>;
  checkboxTemplate!: TemplateRef<any>;

  apiDefinition: ICorePageListApiDefinition = {
    queryListRelativePath: api.SE_CONFIG_QUERY_LIST,
  };

  crud: ICorePageListCRUD = {
    deleteIds: api.SE_CONFIG_DELETE_IDS
  };

  columns: ICoreTableColumnItem[] = [
    {
      caption: EnumTranslateKey.UI_LABEL_INSURANCE_GROUP_ID,
      field: 'id',
      type: 'number',
      hidden: true,
      align: 'left',
      width: 10,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SE_CONFIG_SMTP_SERVER,
      field: 'name',
      type: 'string',
      align: 'center',
      width: 250,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SE_CONFIG_PORT,
      field: 'module',
      type: 'string',
      align: 'left',
      width: 200,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SE_CONFIG_EMAIL_ADDRESS,
      field: 'value',
      type: 'string',
      align: 'left',
      width: 250,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SE_CONFIG_IS_AUTH_SSL,
      field: 'isAuthSsl',
      type: 'bool',
      pipe: EnumCoreTablePipeType.BOOLEAN_TO_TRUE_FALSE,
      align: 'center',
      hideSearchBox: true,
      width: 150,
      templateRef: this.checkboxTemplate,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SE_CONFIG_ACCOUNT,
      field: 'account',
      type: 'string',
      align: 'left',
      width: 250,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SE_CONFIG_PASSWORD,
      field: 'password',
      type: 'string',
      align: 'center',
      width: 250,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SE_CONFIG_IS_AUTH_SENDING_MAIL,
      field: 'isAuthSendingMail',
      type: 'bool',
      pipe: EnumCoreTablePipeType.BOOLEAN_TO_TRUE_FALSE,
      align: 'center',
      hideSearchBox: true,
      width: 150,
      templateRef: this.checkboxTemplate,
    }, 
  ];

  editRoute: ICorePageListEditRouting = {
    auxiliary: 'popupAux',
  };
  constructor(
    private router: Router, 
    private route: ActivatedRoute
  ) 
  { 
  }

  ngOnInit(): void { }

  ngAfterViewInit(): void {
    this.columns.filter((c) => c.field === 'isAuthSsl')[0].templateRef =
      this.isAuthSsl;
    this.columns.filter((c) => c.field === 'isAuthSendingMail')[0].templateRef =
      this.isAuthSendingMail;
  }
  ngOnDestroy(): void { }
}
