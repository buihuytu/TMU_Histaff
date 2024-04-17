import { Component, OnInit, AfterViewInit, OnDestroy, ViewChild, TemplateRef } from "@angular/core";
import { EnumTranslateKey, api } from 'alpha-global-constants';
import { ICorePageListApiDefinition, ICorePageListCRUD, ICoreTableColumnItem, ICorePageListEditRouting, AppService, CorePageListService } from "ngx-histaff-alpha";

@Component({
  selector: 'app-hu-ward',
  templateUrl: './hu-ward.component.html',
  styleUrls: ['./hu-ward.component.scss']
})
export class HuWardComponent implements OnInit, AfterViewInit , OnDestroy {
  @ViewChild('sticker') sticker!: TemplateRef<any>;

  /*
  Properties being passed to core-page-list
  */
  title = EnumTranslateKey.UI_COMPONENT_TITLE_HU_WARD;

  apiDefinition: ICorePageListApiDefinition = {
    queryListRelativePath: api.HU_WARD_QUERY_LIST,
  }

  avatarTemplate!: TemplateRef<any>;

  // USER TABLE IS THE ONLY TABLE WHICH HAS ID OF TYPE STRING. ALL THE OTHERS MUST HAVE ID OF TYPE NUMBER (bigint/long)
  crud: ICorePageListCRUD = {
    deleteIds: api.HU_WARD_DELETE_IDS,
    toggleActiveIds: api.HU_WARD_TOGGLER_ACTIVE_IDS
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
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_WARD_IS_ACTIVE,
      field: 'status',
      type: 'string',
      align: 'center',
      width: 130
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_WARD_CODE,
      field: 'code',
      type: 'string',
      align: 'left',
      width: 200
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_WARD_NAME,
      field: 'name',
      type: 'string',
      align: 'left',
      width: 250,
    },

    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_DISTRICT_NAME,
      field: 'districtName',
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
      width: 300
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
    setTimeout(() =>{
      const stickerFilter = this.columns.filter(c => c.field === 'status');
      if (!!stickerFilter.length) stickerFilter[0].templateRef = this.sticker;
    })  
  }

  ngOnDestroy(): void {
  }


}
