import { AfterViewInit, Component, ViewEncapsulation } from "@angular/core";
import { BaseComponent, ICorePageListApiDefinition,ICorePageListCRUD, ICoreTableColumnItem, EnumCoreTablePipeType, ICorePageListEditRouting, MultiLanguageService } from "ngx-histaff-alpha";
import { BehaviorSubject } from "rxjs/internal/BehaviorSubject";

@Component({
  selector: "app-ortherlist",
  templateUrl: "./ortherlist.component.html",
  styleUrls: ["./ortherlist.component.scss"],
})

export class OrtherListComponent extends BaseComponent implements AfterViewInit {
  orgId!: number;

  outerParam$ = new BehaviorSubject<any>(null);

  apiDefinition: ICorePageListApiDefinition = {
    queryListRelativePath: api.SYS_OTHERLIST_QUERY_LIST,
  }

  crud: ICorePageListCRUD = {
    deleteIds: api.SYS_OTHERLIST_DELETE_IDS
  }

  columns: ICoreTableColumnItem[] = [
    {
      caption: 'ContractType.ID',
      field: 'id',
      hidden: true,
      type: 'number',
      align: 'left',
      width: 200,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_POSITION_CODE,
      field: 'code',
      type: 'string',
      align: 'left',
      width: 110,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_POSITION_NAME,
      field: 'name',
      type: 'string',
      align: 'left',
      width: 200,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_POSITION_ORGNAME,
      field: 'orgName',
      type: 'string',
      align: 'left',
      width: 200,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_POSITION_JOB_DESC,
      field: 'jobDesc ',
      type: 'string',
      align: 'left',
      width: 200,
    },

    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_POSITION_IS_ACTIVE,
      field: 'isActive',
      pipe: EnumCoreTablePipeType.BOOLEAN_TO_YES_NO,
      type: 'string',
      align: 'left',
      width: 100,
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
  ngAfterViewInit(): void {
    
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