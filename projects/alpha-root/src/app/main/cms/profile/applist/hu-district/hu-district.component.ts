import { Component, OnInit, OnDestroy, TemplateRef, ViewEncapsulation, ViewChild, AfterViewInit} from '@angular/core';
import { EnumTranslateKey, api } from 'alpha-global-constants';
import { ICorePageListApiDefinition,ICorePageListCRUD, ICoreTableColumnItem, ICorePageListEditRouting, AppService, CorePageListService } from 'ngx-histaff-alpha';


@Component({
  selector: 'app-hu-district',
  templateUrl: './hu-district.component.html',
  styleUrls: ['./hu-district.component.scss']
})
export class HuDistrictComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('sticker') sticker!: TemplateRef<any>;

  /*
  Properties being passed to core-page-list
  */
  title = EnumTranslateKey.UI_COMPONENT_TITLE_HU_DISTRICT;

  apiDefinition: ICorePageListApiDefinition = {
    queryListRelativePath: api.HU_DISTRICT_QUERY_LIST,
  }

  avatarTemplate!: TemplateRef<any>;

  // USER TABLE IS THE ONLY TABLE WHICH HAS ID OF TYPE STRING. ALL THE OTHERS MUST HAVE ID OF TYPE NUMBER (bigint/long)
  crud: ICorePageListCRUD = {
    deleteIds: api.HU_DISTRICT_DELETE_IDS,
    toggleActiveIds: api.AT_DISTRICT_TOGGLER_ACTIVE_IDS
  }

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
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_DISTRICT_IS_ACTIVE,
      field: 'isActiveStr',
      type: 'string',
      align: 'center',
      width: 130
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_DISTRICT_CODE,
      field: 'code',
      type: 'string',
      align: 'left',
      width: 200
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_DISTRICT_NAME,
      field: 'name',
      type: 'string',
      align: 'left',
      width: 250,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_PROVINCE_NAME,
      field: 'provinceName',
      type: 'string',
      align: 'left',
      width: 250,
    },

    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_NATION_NAME,
      field: 'nationName',
      type: 'string',
      align: 'left',
      width: 250,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_WARD_NOTE,
      field: 'note',
      type: 'string',
      align: 'left',
      width: 500
    },
    
  ]

  editRoute: ICorePageListEditRouting = {
    auxiliary: 'popupAux'
  }
  /* End Properties being passed to core-page-type-a */

  constructor(
    private appService: AppService,
    public corePageListService : CorePageListService
  ) {}

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      const stickerFilter = this.columns.filter(c => c.field === 'isActiveStr');
      if (!!stickerFilter.length) stickerFilter[0].templateRef = this.sticker;
    })
  }

  ngOnDestroy(): void {
  }

}
