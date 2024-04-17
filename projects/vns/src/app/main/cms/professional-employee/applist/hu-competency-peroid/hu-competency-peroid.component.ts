import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import { EnumTranslateKey, api } from 'alpha-global-constants';
import { CorePageListComponent, FullscreenModalLoaderComponent, BaseComponent, ICorePageListApiDefinition, ICorePageListCRUD, ICorePageListEditRouting, ICoreTableColumnItem, MultiLanguageService } from 'ngx-histaff-alpha';

@Component({
  selector: 'app-hu-competency-peroid',
  standalone: true,
  imports: [
    CorePageListComponent,
    FullscreenModalLoaderComponent,
    CommonModule
  ],
  templateUrl: './hu-competency-peroid.component.html',
  styleUrl: './hu-competency-peroid.component.scss'
})
export class HuCompetencyPeroidComponent extends BaseComponent {

  selectedIds: string[] | number[] = [];
  title = EnumTranslateKey.UI_COMPONENT_TITLE_HU_COMPETENCY_PEROID;
  id: any;
  loading!: boolean;
  apiDefinition: ICorePageListApiDefinition = {
    queryListRelativePath: api.HU_COMPETENCY_PERIOD_QUERY_LIST,
  };
  crud: ICorePageListCRUD = {
    deleteIds: api.HU_COMPETENCY_PERIOD_DELETE_IDS,
    toggleActiveIds: api.HU_COMPETENCY_PERIOD_TOGGLE_ACTIVE_IDS,
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
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_TR_PLAN_YEAR,//Nam
      field: 'year',
      type: 'string',
      align: 'left',
      width: 100,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_HU_COMPETENCY_PERIOD_QUARTER,//Quy
      field: 'quarterName',
      type: 'string',
      align: 'left',
      width: 100,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_HU_COMPETENCY_PERIOD_CODE,//Ma ky danh gia
      field: 'code',
      type: 'string',
      align: 'left',
      width: 150,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_HU_COMPETENCY_PERIOD_NAME,//Ten ky danh gia
      field: 'name',
      type: 'string',
      align: 'left',
      width: 150,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_HU_COMPETENCY_PERIOD_EFFECTED_DATE,//Ngay hieu luc
      field: 'effectedDate',
      type: 'string',
      align: 'left',
      width: 150,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_HU_COMPETENCY_PERIOD_EXPRIED_DATE,//Ngay ket thuc
      field: 'expriedDate',
      type: 'string',
      align: 'left',
      width: 150,
    },

    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_HU_COMMEND_STATUS_ID,//Trang thai
      field: 'status',
      type: 'string',
      align: 'left',
      width: 150,
    }
  ];

  constructor(
    public override mls: MultiLanguageService
  ){
    super(mls);
  }

  onRowClick(e: any) {
    this.id = e.id
  }

  onSelectedIdsChange(e: number[]) {
    this.selectedIds = e;
  }
}
