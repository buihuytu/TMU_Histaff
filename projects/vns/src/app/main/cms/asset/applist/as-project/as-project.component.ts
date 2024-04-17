import { Component, AfterViewInit, ViewChild, TemplateRef } from "@angular/core";
import { EnumTranslateKey, api } from 'alpha-global-constants';
import { BaseComponent, ICorePageListApiDefinition, ICorePageListCRUD, ICoreTableColumnItem, MultiLanguageService } from "ngx-histaff-alpha";

@Component({
  selector: 'app-as-project',
  templateUrl: './as-project.component.html',
  styleUrl: './as-project.component.scss'
})

export class AsProjectComponent extends BaseComponent implements AfterViewInit {
  title = EnumTranslateKey.UI_COMPONENT_TITLE_AS_PROJECT;

  @ViewChild('sticker') sticker!: TemplateRef<any>;

  apiDefinition: ICorePageListApiDefinition = {
    queryListRelativePath: api.AS_PROJECT_QUERY_LIST,
  };

  crud: ICorePageListCRUD = {
    deleteIds: api.AS_PROJECT_DELETE_IDS,
    toggleActiveIds: api.AS_PROJECT_TOGGLER_ACTIVE_IDS,
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
      caption: EnumTranslateKey.UI_ENTITY_FIEL_PROJECT_CODE,
      field: 'code',
      type: 'string',
      align: 'left',
      width: 200,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIEL_PROJECT_NAME,
      field: 'name',
      type: 'string',
      align: 'left',
      width: 200,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_WELFARE_MNG_NOTE,
      field: 'description',
      type: 'string',
      align: 'left',
      width: 200,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_TR_PLAN_NOTE,
      field: 'note',
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