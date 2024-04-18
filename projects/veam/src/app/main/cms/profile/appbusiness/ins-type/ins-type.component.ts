import { AfterViewInit, Component, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { EnumTranslateKey, api } from 'alpha-global-constants';
import { ICorePageListApiDefinition, ICorePageListCRUD, ICorePageListEditRouting, ICoreTableColumnItem } from 'ngx-histaff-alpha';

@Component({
  selector: 'app-ins-type',
  templateUrl: './ins-type.component.html',
  styleUrls: ['./ins-type.component.scss'],
})
export class InsTypeComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('sticker') sticker!: TemplateRef<any>;

  title = EnumTranslateKey.UI_COMPONENT_TITLE_INS_TYPE;

  apiDefinition: ICorePageListApiDefinition = {
    queryListRelativePath: api.INS_TYPE_QUERY_LIST,
  };
  crud: ICorePageListCRUD = {
    deleteIds: api.INS_TYPE_DELETE_IDS,
    toggleActiveIds: api.INS_TYPE_TOGGLE_ACTIVE_IDS,
  };
  editRoute: ICorePageListEditRouting = {
    auxiliary: 'popupAux',
  };

  columns: ICoreTableColumnItem[] = [
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_COMMON_ID,
      field: 'id',
      hidden: true,
      type: 'number',
      align: 'right',
      width: 30,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_INS_TYPE_IS_ACTIVE,
      field: 'status',
      type: 'string',
      align: 'center',
      width: 130,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_INS_TYPE_CODE,
      field: 'code',
      type: 'string',
      align: 'left',
      width: 200,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_INS_TYPE_NAME,
      field: 'name',
      type: 'string',
      align: 'left',
      width: 250,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_INS_TYPE_TYPE_NAME,
      field: 'typeName',
      type: 'string',
      align: 'left',
      width: 200,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_INS_REGION_NOTE,
      field: 'note',
      type: 'string',
      align: 'left',
      width: 300,
    },
    
  ];
  constructor() { }
  ngOnDestroy(): void {

  }
  ngAfterViewInit(): void {
    setTimeout(() => {
      const stickerFilter = this.columns.filter(c => c.field === 'status');
      if (!!stickerFilter.length) stickerFilter[0].templateRef = this.sticker;
    })
  }

  ngOnInit(): void { }

}
