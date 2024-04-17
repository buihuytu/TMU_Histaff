import { Component, OnInit, OnDestroy, ViewChild, TemplateRef, AfterViewInit } from '@angular/core';
import { EnumTranslateKey, api } from 'alpha-global-constants';
import { ICorePageListApiDefinition, ICorePageListCRUD, ICoreTableColumnItem, ICorePageListEditRouting } from 'ngx-histaff-alpha';

@Component({
  selector: 'cms-app-timetype',
  templateUrl: './timetype.component.html',
  styleUrls: ['./timetype.component.scss'],
})
export class TimeTypeComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('sticker') sticker!: TemplateRef<any>;

  /*
  Properties being passed to core-page-list
  */
  title = EnumTranslateKey.UI_COMPONENT_TITLE_TIME_TYPE;

  apiDefinition: ICorePageListApiDefinition = {
    queryListRelativePath: api.AT_TIME_TYPE_QUERY_LIST,
  };

  crud: ICorePageListCRUD = {
    deleteIds: api.AT_TIME_TYPE_DELETE_IDS,
    toggleActiveIds: api.AT_TIME_TYPE_TOGGLE_IDS,
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
      caption: EnumTranslateKey.IS_ACTIVE,
      field: 'isActiveStr',
      type: 'string',
      align: 'center',
      width: 130,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_TIME_TYPE_CODE,
      field: 'code',
      type: 'string',
      align: 'left',
      width: 300,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_TIME_TYPE_NAME,
      field: 'name',
      type: 'string',
      align: 'left',
      width: 500,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_TIME_TYPE_NOTE,
      field: 'note',
      type: 'string',
      align: 'left',
      width: 400,
    },
    
  ];

  editRoute: ICorePageListEditRouting = {
    auxiliary: 'popupAux',
  };
  /* End Properties being passed to core-page-type-a */

  constructor() { }

  ngOnInit(): void { }

  ngAfterViewInit(): void {
    const stickerFilter = this.columns.filter(c => c.field === 'isActiveStr');
    if (!!stickerFilter.length) stickerFilter[0].templateRef = this.sticker;
  }

  ngOnDestroy(): void { }
}
