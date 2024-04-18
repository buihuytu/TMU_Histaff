import { Component, OnInit, OnDestroy } from '@angular/core';
import { EnumTranslateKey, api } from 'alpha-global-constants';
import { ICorePageListApiDefinition, ICorePageListCRUD, ICoreTableColumnItem, ICorePageListEditRouting } from 'ngx-histaff-alpha';

@Component({
  selector: 'core-hrm-infotype',
  templateUrl: './infotype.component.html',
  styleUrls: ['./infotype.component.scss']
})
export class InfotypeComponent implements OnInit, OnDestroy {

  /*
  Properties being passed to core-page-list
  */
  title = EnumTranslateKey.UI_COMPONENT_TITLE_CORE_HRM_INFOTYPE;

  apiDefinition: ICorePageListApiDefinition = {
    queryListRelativePath: api.HRM_INFOTYPE_QUERY_LIST,
  }

  crud: ICorePageListCRUD = {
    deleteIds: api.HRM_INFOTYPE_DELETE_IDS
  }

  columns: ICoreTableColumnItem[] = [
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_COMMON_ID,
      field: 'id',
      type: 'number',
      hidden: true,
      align: 'left',
      width: 100,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_HRM_INFOTYPE_CODE,
      field: 'code',
      type: 'string',
      align: 'left',
      width: 100,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_HRM_INFOTYPE_NAME_CODE,
      field: 'nameCode',
      type: 'string',
      align: 'left',
      width: 150,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_HRM_INFOTYPE_NAME_EN,
      field: 'nameEn',
      type: 'string',
      align: 'left',
      width: 150,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_HRM_INFOTYPE_NAME_VN,
      field: 'nameVn',
      type: 'string',
      align: 'left',
      width: 150,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_HRM_INFOTYPE_DESCRIPTION,
      field: 'description',
      type: 'string',
      align: 'left',
      width: 1000,
    },
  ]

  editRoute: ICorePageListEditRouting = {
    auxiliary: 'popupAux'
  }
  /* End Properties being passed to core-page-list */

  constructor() { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
  }

}
