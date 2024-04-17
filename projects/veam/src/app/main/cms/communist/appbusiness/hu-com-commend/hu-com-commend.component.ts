import { Component } from '@angular/core';
import { EnumTranslateKey, api } from 'alpha-global-constants';
import { CorePageListComponent, CoreOrgTreeComponent, BaseComponent, ICorePageListApiDefinition, ICorePageListEditRouting, ICorePageListCRUD, IInOperator, ICoreTableColumnItem } from 'ngx-histaff-alpha';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-hu-com-commend',
  standalone: true,
  imports: [CorePageListComponent, CoreOrgTreeComponent],
  templateUrl: './hu-com-commend.component.html',
  styleUrl: './hu-com-commend.component.scss'
})
export class HuComCommendComponent extends BaseComponent {

  title: EnumTranslateKey = EnumTranslateKey.UI_COMPONENT_TITLE_HU_COM_COMMEND;
  orgIds!: number[];
  outerParam$ = new BehaviorSubject<any>(null);
  
  apiDefinition: ICorePageListApiDefinition = {
    queryListRelativePath: api.HU_COM_COMMEND_QUERY_LIST,
  };
  editRoute: ICorePageListEditRouting = {
    auxiliary: 'popupAux',
  };
  crud: ICorePageListCRUD = {
    deleteIds: api.HU_COMMEND_EMPLOYEE_DELETE_IDS,
    toggleApproveIds: api.HU_COMMEND_APPROVE_ACTIVE
  };
  outerInOperators: IInOperator[] = [
    {
      field: 'orgId',
      values: this.orgIds || [],
    },
  ];
  
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
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_HU_COMMEND_COMMEND_OBJ_ID,
      field: 'year',
      type: 'string',
      align: 'left',
      width: 100,
    },
  ]

  onOrgIdsChange(orgIds: any) {
    this.orgIds = orgIds;
    this.outerInOperators = [
      {
        field: 'orgId',
        values: orgIds,
      },
    ];
  }
}
