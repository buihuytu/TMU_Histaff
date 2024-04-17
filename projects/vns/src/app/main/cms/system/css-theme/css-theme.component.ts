import { Component, OnDestroy, OnInit } from '@angular/core';
import { EnumTranslateKey, api } from 'alpha-global-constants';
import { ICorePageListApiDefinition, ICoreTableColumnItem, EnumCoreTablePipeType } from 'ngx-histaff-alpha';

@Component({
  selector: 'app-css-theme',
  templateUrl: './css-theme.component.html',
  styleUrls: ['./css-theme.component.scss'],
})
export class CssThemeComponent implements OnInit, OnDestroy {
  title = EnumTranslateKey.UI_COMPONENT_TITLE_CSS_VAR;
  apiDefinition: ICorePageListApiDefinition = {
    queryListRelativePath: api.CSS_THEME_QUERY_LIST,
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
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_CSS_VAR_NAME,
      field: 'name',
      type: 'string',
      align: 'left',
      width: 150,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_CSS_VAR_DESCRIPTION,
      field: 'description',
      type: 'string',
      align: 'left',
      width: 400,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_COMMON_CREATED_BY,
      field: 'createdByUsername',
      type: 'string',
      align: 'left',
      width: 150,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_COMMON_UPDATED_BY,
      field: 'updatedByUsername',
      type: 'string',
      align: 'left',
      width: 150,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_COMMON_CREATED_DATE,
      field: 'createdDate',
      type: 'string',
      align: 'left',
      width: 150,
      pipe: EnumCoreTablePipeType.DATE_TIME,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_COMMON_UPDATED_DATE,
      field: 'updatedDate',
      type: 'string',
      align: 'left',
      width: 150,
      pipe: EnumCoreTablePipeType.DATE_TIME,
    },
  ];

  constructor() {}
  ngOnDestroy(): void {}

  ngOnInit(): void {}
}
