import { AfterViewInit, Component, Input, TemplateRef, ViewChild } from '@angular/core';
import { EnumTranslateKey, api } from 'alpha-global-constants';
import { BaseComponent, CorePageListComponent, CoreStatusStickerComponent, EnumCoreTablePipeType, ICorePageListApiDefinition, ICorePageListCRUD, ICorePageListEditRouting, ICoreTableColumnItem, MultiLanguageService, RandomAvatarService } from 'ngx-histaff-alpha';
import { BehaviorSubject } from 'rxjs';


@Component({
  selector: 'app-tr-classification',
  standalone: true,
  imports: [
    CorePageListComponent,
    CoreStatusStickerComponent
  ],
  templateUrl: './tr-classification.component.html',
  styleUrl: './tr-classification.component.scss'
})
export class TrClassificationComponent extends BaseComponent implements AfterViewInit{
  @ViewChild('sticker') sticker!: TemplateRef<any>;
  @Input() hideHeader!: boolean;
  
  title = EnumTranslateKey.UI_COMPONENT_TITLE_TR_CLASSIFICATION
  outerParam$ = new BehaviorSubject<any>(null);


  apiDefinition: ICorePageListApiDefinition = {
    queryListRelativePath: api.TR_CLASSIFICATION_QUERY_LIST,
  }

  crud: ICorePageListCRUD = {
    deleteIds: api.TR_CLASSIFICATION_DELETE_IDS,
    toggleActiveIds: api.TR_CLASSIFICATION_TOGGLE_ACTIVE_IDS,
  }

  avatarTemplate!: TemplateRef<any>;

  columns: ICoreTableColumnItem[] = [
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_COMMON_ID,
      field: 'id',
      hidden: true,
      type: 'string',
      align: 'left',
      width: 30,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_TR_CLASSIFICATION_STATUS,
      field: 'status',
      type: 'string',
      align: 'center',
      width: 130,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_TR_CLASSIFICATION_NAME,
      field: 'name',
      type: 'string',
      align: 'center',
      width: 300,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_TR_CLASSIFICATION_DESC_ID,
      field: 'descName',
      type: 'string',
      align: 'center',
      width: 300,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_TR_CLASSIFICATION_SCORE_FROM,
      field: 'scoreFrom',
      type: 'string',
      align: 'center',
      width: 300,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_TR_CLASSIFICATION_SCORE_TO,
      field: 'scoreTo',
      type: 'string',
      align: 'left',
      width: 300,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_TR_CLASSIFICATION_EFFECT_DATE,
      field: 'effectDate',
      type: 'date',
      pipe: EnumCoreTablePipeType.DATE,
      align: 'left',
      width: 300,
    },
  ]

  editRoute: ICorePageListEditRouting = {
    auxiliary: 'popupAux'
  }
  /* End Properties being passed to core-page-type-a */

  constructor(
    public override mls: MultiLanguageService,
  ) {
    super(mls);
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      const stickerFilter = this.columns.filter(c => c.field === 'status');
      if (!!stickerFilter.length) stickerFilter[0].templateRef = this.sticker;
    })
  }
}
