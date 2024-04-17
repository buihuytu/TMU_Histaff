import { AfterViewInit, Component, Input, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { EnumTranslateKey, api } from 'alpha-global-constants';
import { BaseComponent, ICorePageListApiDefinition, ICorePageListCRUD, ICoreTableColumnItem, EnumCoreTablePipeType, ICorePageListEditRouting, MultiLanguageService, RandomAvatarService } from 'ngx-histaff-alpha';

@Component({
  selector: 'app-ins-list-program',
  templateUrl: './ins-list-program.component.html',
  styleUrls: ['./ins-list-program.component.scss']
})
export class InsListProgramComponent extends BaseComponent implements AfterViewInit {
  @ViewChild('sticker') sticker!: TemplateRef<any>;
  @Input() hideHeader!: boolean;
  
  title = EnumTranslateKey.UI_COMPONENT_TITLE_INS_LIST_PROGRAM
  outerParam$ = new BehaviorSubject<any>(null);


  apiDefinition: ICorePageListApiDefinition = {
    queryListRelativePath: api.INS_LIST_PROGRAM_QUERY_LIST,
  }

  crud: ICorePageListCRUD = {
    deleteIds: api.INS_LIST_PROGRAM_DELETE_IDS,
    toggleActiveIds: api.INS_LIST_PROGRAM_TOGGLE_ACTIVE_IDS,
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
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_INS_LIST_PROGRAM_CODE,
      field: 'code',
      type: 'string',
      align: 'center',
      width: 300,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_INS_LIST_PROGRAM_NAME,
      field: 'name',
      type: 'string',
      align: 'center',
      width: 300,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_INS_LIST_PROGRAM_NOTE,
      field: 'note',
      type: 'string',
      align: 'left',
      width: 300,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_INS_LIST_PROGRAM_STATUS,
      field: 'isActive',
      type: 'string',
      align: 'left',
      width: 300,
      pipe: EnumCoreTablePipeType.BOOLEAN_TO_ACTIVE_INACTIVE,
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
    private router: Router,
    private route: ActivatedRoute,
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
