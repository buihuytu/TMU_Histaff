import { AfterViewInit, Component, Input, TemplateRef, ViewChild } from '@angular/core';
import { EnumTranslateKey, api } from 'alpha-global-constants';
import { BaseComponent, CorePageListComponent, CoreStatusStickerComponent, ICorePageListApiDefinition, ICorePageListCRUD, ICorePageListEditRouting, ICoreTableColumnItem, MultiLanguageService, RandomAvatarService } from 'ngx-histaff-alpha';
import { BehaviorSubject } from 'rxjs';


@Component({
  selector: 'app-tr-criteria',
  standalone: true,
  imports: [
    CorePageListComponent,
    CoreStatusStickerComponent
  ],
  templateUrl: './tr-criteria.component.html',
  styleUrl: './tr-criteria.component.scss'
})
export class TrCriteriaComponent extends BaseComponent implements AfterViewInit {
  
  @ViewChild('sticker') sticker!: TemplateRef<any>;
  @Input() hideHeader!: boolean;
  
  title = EnumTranslateKey.UI_COMPONENT_TITLE_TR_CRITERIA
  outerParam$ = new BehaviorSubject<any>(null);


  apiDefinition: ICorePageListApiDefinition = {
    queryListRelativePath: api.TR_CRITERIA_QUERY_LIST,
  }

  crud: ICorePageListCRUD = {
    deleteIds: api.TR_CRITERIA_DELETE_IDS,
    toggleActiveIds: api.TR_CRITERIA_TOGGLE_ACTIVE_IDS,
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
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_TR_CRITERIA_STATUS,
      field: 'status',
      type: 'string',
      align: 'center',
      width: 130,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_TR_CRITERIA_CODE,
      field: 'code',
      type: 'string',
      align: 'center',
      width: 300,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_TR_CRITERIA_NAME,
      field: 'name',
      type: 'string',
      align: 'center',
      width: 300,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_TR_CRITERIA_MAX_SCORE,
      field: 'maxScore',
      type: 'string',
      align: 'center',
      width: 300,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_TR_CRITERIA_NOTE,
      field: 'note',
      type: 'string',
      align: 'left',
      width: 300,
    },
  ]

  defaultAvatar!: string;

  editRoute: ICorePageListEditRouting = {
    auxiliary: 'popupAux'
  }
  /* End Properties being passed to core-page-type-a */

  constructor(
    public override mls: MultiLanguageService,
    private ras: RandomAvatarService,
  ) {
    super(mls);
    this.defaultAvatar = ras.get();
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      const stickerFilter = this.columns.filter(c => c.field === 'status');
      if (!!stickerFilter.length) stickerFilter[0].templateRef = this.sticker;
    })
  }

}
