import { Component, ViewEncapsulation, AfterViewInit, ViewChild, TemplateRef } from "@angular/core";
import { EnumTranslateKey, api } from 'alpha-global-constants';
import { BaseComponent, ICorePageListApiDefinition, ICorePageListCRUD, ICoreTableColumnItem, ICorePageListEditRouting, MultiLanguageService } from "ngx-histaff-alpha";
import { BehaviorSubject } from "rxjs";


@Component({
  selector: 'cms-period-standard',
  templateUrl: './periodstandard.component.html',
  styleUrls: ['./periodstandard.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class PeriodStandardComponent extends BaseComponent implements AfterViewInit {
  @ViewChild('sticker') sticker!: TemplateRef<any>;

  /* START: Local filter params */
  orgId!: number;
  /* END: Local filter params */

  /*
  Properties being passed to core-page-list
  */

  //list!: any[]
  outerParam$ = new BehaviorSubject<any>(null);

  title = EnumTranslateKey.UI_COMPONENT_TITLE_AT_PERIOD_STANDARD;

  apiDefinition: ICorePageListApiDefinition = {
    queryListRelativePath: api.AT_PERIOD_STANDARD_QUERY_LIST,
  };

  // USER TABLE IS THE ONLY TABLE WHICH HAS ID OF TYPE STRING. ALL THE OTHERS MUST HAVE ID OF TYPE NUMBER (bigint/long)
  crud: ICorePageListCRUD = {
    deleteIds: api.AT_PERIOD_STANDARD_DELETE_IDS,
    toggleActiveIds: api.AT_PERIOD_STANDARD_TOGGLE_ACTIVE_IDS,
  };

  columns: ICoreTableColumnItem[] = [
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_COMMON_ID,
      field: 'id',
      hidden: true,
      type: 'string',
      align: 'left',
      width: 30,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_AT_PERIOD_STANDARD_STATUS,
      field: 'status',
      type: 'string',
      align: 'center',
      width: 130,
      templateRef: this.sticker
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_AT_PERIOD_STANDARD_YEAR,
      field: 'year',
      type: 'number',
      align: 'left',
      width: 200,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_AT_PERIOD_STANDARD_PERIOD_NAME,
      field: 'periodName',
      type: 'string',
      align: 'left',
      width: 200,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_AT_PERIOD_STANDARD_OBJECT_NAME,
      field: 'objectName',
      type: 'string',
      align: 'left',
      width: 250,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_AT_PERIOD_STANDARD_PERIOD_STANDARD,
      field: 'periodStandard',
      type: 'number',
      align: 'center',
      width: 150,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_AT_PERIOD_STANDARD_PERIOD_STANDARD_NIGHT,
      field: 'periodStandardNight',
      type: 'number',
      align: 'left',
      width: 150,
    },

    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_AT_STANDARD_PERIOD_NOTE,
      field: 'note',
      type: 'string',
      align: 'left',
      width: 500,
    },
  ];

  editRoute: ICorePageListEditRouting = {
    auxiliary: 'popupAux',
  };
  /* End Properties being passed to core-page-type-a */

  constructor(public override mls: MultiLanguageService) {
    super(mls);
  }

  onOrgIdChange(orgId: number) {
    if (!!this.outerParam$.value) {
      const newOuterParam = JSON.parse(JSON.stringify(this.outerParam$.value));
      newOuterParam['orgId'] = orgId;
      this.outerParam$.next(newOuterParam);
    } else {
      this.outerParam$.next({ orgId });
    }
  }

  ngAfterViewInit(): void {
    setTimeout(() =>{
      this.columns.filter(x => x.field === 'status')[0].templateRef = this.sticker
    })
  }
}
