import { Component, Input, OnInit } from '@angular/core';
import { EnumTranslateKey, api } from 'alpha-global-constants';
import { ICorePageListApiDefinition,ICorePageListCRUD, ICoreTableColumnItem, ICorePageListEditRouting } from 'ngx-histaff-alpha';
import { BehaviorSubject } from 'rxjs';


@Component({
  selector: 'app-otherlist-type',
  templateUrl: './otherlist-type.component.html',
  styleUrls: ['./otherlist-type.component.scss']
})
export class OtherlistTypeComponent implements OnInit {

  @Input() hideHeader!: boolean;
  /*
  Properties being passed to core-page-list
  */
  title = EnumTranslateKey.UI_COMPONENT_TITLE_ORTHERLIST_TYPE

  outerParam$ = new BehaviorSubject<any>(null);
  apiDefinition: ICorePageListApiDefinition = {
    queryListRelativePath: api.SYS_OTHERLIST_TYPE_QUERY_LIST,
  }

  crud: ICorePageListCRUD = {
    deleteIds: api.SYS_OTHERLIST_TYPE_DELETE_IDS,
  }

  columns: ICoreTableColumnItem[] = [
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_COMMON_ID,
      field: 'id',
      hidden: true,
      type: 'number',
      align: 'right',
      width: 400,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_OTHERLIST_TYPE_CODE, 
      field: 'code',
      type: 'string',
      align: 'left',
      width: 400,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_OTHERLIST_TYPE_NAME, 
      field: 'name',
      type: 'string',
      align: 'left',
      width: 400,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_OTHERLIST_TYPE_STATUS, 
      field: 'status',
      type: 'string',
      align: 'left',
      width: 400,
    },
  ];

  defaultAvatar!: string;

  editRoute: ICorePageListEditRouting = {
    auxiliary: 'popupAux'
  }
  /* End Properties being passed to core-page-type-a */

  constructor(
  ) {
  }
  ngOnInit(): void {
    
  }
}
