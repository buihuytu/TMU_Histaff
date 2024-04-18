import { AfterViewInit, Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { EnumTranslateKey, api } from 'alpha-global-constants';
import { IFilterOperator, EnumFilterOperator, ICorePageListApiDefinition, ICorePageListCRUD, ICoreTableColumnItem, ICorePageListEditRouting } from 'ngx-histaff-alpha';

@Component({
  selector: 'app-organization-level',
  templateUrl: './organization-level.component.html',
  styleUrls: ['./organization-level.component.scss']
})
export class OrganizationLevelComponent implements OnInit, AfterViewInit {
  @ViewChild('sticker') sticker!: TemplateRef<any>;

  ngOnInit(): void {

  }
  @Input() hideHeader!: boolean;


  title = EnumTranslateKey.UI_COMPONENT_TITLE_ORGANIZATION_LEVEL

  outerParam$ = new BehaviorSubject<any>(null);
  outerFilterOperators: IFilterOperator[] = [
    {
      field: 'id',
      operator: EnumFilterOperator.EQUAL
    }
  ]

  apiDefinition: ICorePageListApiDefinition = {
    queryListRelativePath: api.HU_ORG_LEVEL_QUERY_LIST,
  }

  crud: ICorePageListCRUD = {
    deleteIds: api.HU_ORG_LEVEL_DELETE_IDS,
    toggleActiveIds: api.HU_ORG_LEVEL_TOGGLE_ACTIVE_IDS
  }

  avatarTemplate!: TemplateRef<any>;

  columns: ICoreTableColumnItem[] = [
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_COMMON_ID,
      field: 'id',
      hidden: true,
      type: 'number',
      align: 'right',
      width: 0,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SALARY_TYPE_STATUS,
      field: 'status',
      type: 'string',
      align: 'center',
      width: 130,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_HU_ORG_LEVEL_CODE,
      field: 'code',
      type: 'string',
      align: 'left',
      width: 100,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_HU_ORG_LEVEL_NAME,
      field: 'name',
      type: 'string',
      align: 'left',
      width: 200,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_HU_ORG_LEVEL_NOTE,
      field: 'note',
      type: 'string',
      align: 'left',
      width: 800,
    },

  ]

  defaultAvatar!: string;

  editRoute: ICorePageListEditRouting = {
    auxiliary: 'popupAux'
  }
  /* End Properties being passed to core-page-type-a */

  constructor(
  ) {
  }
  ngAfterViewInit(): void {
    const stickerFilter = this.columns.filter(c => c.field === 'status');
    if (!!stickerFilter.length) stickerFilter[0].templateRef = this.sticker;
  }
}
