import { Component, AfterViewInit, ViewChild, TemplateRef } from "@angular/core";
import { EnumTranslateKey, api } from 'alpha-global-constants';
import { BaseComponent, ICorePageListApiDefinition, ICorePageListCRUD, ICoreTableColumnItem, MultiLanguageService } from "ngx-histaff-alpha";

@Component({
  selector: 'app-pe-capacity-framework',
  templateUrl: './pe-capacity-framework.component.html',
  styleUrl: './pe-capacity-framework.component.scss'
})

export class PeCapacityFrameworkComponent extends BaseComponent implements AfterViewInit {
  title = EnumTranslateKey.UI_COMPONENT_TITLE_PE_CAPACITY_FRAMEWORK;

  @ViewChild('sticker') sticker!: TemplateRef<any>;

  apiDefinition: ICorePageListApiDefinition = {
    queryListRelativePath: api.PE_CAPACITY_FRAMEWORK_QUERY_LIST,
  };

  crud: ICorePageListCRUD = {
    deleteIds: api.PE_CAPACITY_FRAMEWORK_DELETE_IDS,
    toggleActiveIds: api.PE_CAPACITY_FRAMEWORK_TOGGLER_ACTIVE_IDS,
  };

  columns: ICoreTableColumnItem[] = [
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_INS_TYPE_IS_ACTIVE,
      field: 'status',
      type: 'string',
      align: 'left',
      width: 200
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_WORD_RESPONSE_RATE,
      field: 'ratioFrom',
      type: 'string',
      align: 'left',
      width: 200,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_INCOMING_RESPONSE_RATE,
      field: 'ratioTo',
      type: 'string',
      align: 'left',
      width: 200,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_RATING,
      field: 'rating',
      type: 'string',
      align: 'left',
      width: 200,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_TOTAL_SCORE_NOT_REQUIRED,
      field: 'scoreNotRequiredStr',
      type: 'string',
      align: 'left',
      width: 200,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_CSS_VAR_DESCRIPTION,
      field: 'description',
      type: 'string',
      align: 'left',
      width: 200,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_HU_EVALUATION_COM_ID,
      field: 'id',
      type: 'number',
      align: 'left',
      hidden: true,
      width: 1,
    }
  ];

  constructor(
    public override mls: MultiLanguageService
  ) {
    super(mls);
  }

  ngAfterViewInit(): void {
    this.columns.filter((c) => c.field === 'status')[0].templateRef = this.sticker
  }
}