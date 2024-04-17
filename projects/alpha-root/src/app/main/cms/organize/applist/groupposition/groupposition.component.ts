import { Component, ViewEncapsulation } from "@angular/core";
import { EnumTranslateKey, api } from 'alpha-global-constants';
import { BaseComponent, ICorePageListApiDefinition, ICorePageListCRUD, ICoreTableColumnItem, ICorePageListEditRouting, MultiLanguageService } from "ngx-histaff-alpha";
import { BehaviorSubject } from "rxjs";

@Component({
  selector: "cms-app-groupposition",
  templateUrl: "./groupposition.component.html",
  styleUrls: ["./groupposition.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class GroupPositionComponent extends BaseComponent {

  title = EnumTranslateKey.UI_COMPONENT_TITLE_GROUP_POSITION;

  /* START: Local filter params */
  orgId!: number;
  /* END: Local filter params */

  /*
  Properties being passed to core-page-list
  */

  //list!: any[]
  outerParam$ = new BehaviorSubject<any>(null);



  apiDefinition: ICorePageListApiDefinition = {
    queryListRelativePath: api.HU_GROUP_POSITION_QUERY_LIST,
  }

  crud: ICorePageListCRUD = {
    deleteIds: api.HU_GROUP_POSITION_DELETE_IDS
  }

  columns: ICoreTableColumnItem[] = [
    {
      caption: 'GroupPosition.ID',
      field: 'id',
      hidden: true,
      type: 'number',
      align: 'left',
      width: 200,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_GROUP_POSITION_CODE,
      field: 'code',
      type: 'string',
      align: 'left',
      width: 400,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_GROUP_POSITION_NAME,
      field: 'name',
      type: 'string',
      align: 'left',
      width: 500,
    },  
   
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_GROUP_POSITION_NOTE,
      field: 'note',
      type: 'string',
      align: 'left',
      width: 400,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_GROUP_POSITION_STATUS,
      field: 'statusName',
      type: 'string',
      align: 'left',
      width: 100
    },
  ]

  editRoute: ICorePageListEditRouting = {
    auxiliary: 'popupAux'
  }
  /* End Properties being passed to core-page-type-a */

  constructor(
    public override mls: MultiLanguageService,
  ) {
    super(mls);
  }

  onOrgIdChange(orgId: number) {
    if (!!this.outerParam$.value) {
      const newOuterParam = JSON.parse(JSON.stringify(this.outerParam$.value))
      newOuterParam['orgId'] = orgId;
      this.outerParam$.next(newOuterParam);
    } else {
      this.outerParam$.next({ orgId });
    }
  }
}