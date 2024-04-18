import { Component, ViewEncapsulation, AfterViewInit, ViewChild, TemplateRef } from "@angular/core";
import { api, EnumTranslateKey } from 'alpha-global-constants';
import { BaseComponent, IAlertOptions, ICorePageListApiDefinition, ICorePageListCRUD, ICoreTableColumnItem, ICorePageListEditRouting, MultiLanguageService, AlertService, AppService } from "ngx-histaff-alpha";
import { BehaviorSubject } from "rxjs";

@Component({
  selector: 'cms-app-job',
  templateUrl: './job.component.html',
  styleUrls: ['./job.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class JobComponent extends BaseComponent implements AfterViewInit {
  @ViewChild('sticker') sticker!: TemplateRef<any>;

  orgId!: number;
  
  selectedIds: number[] = [];
  /* END: Local filter params */

  /*
  Properties being passed to core-page-list
  */

  //list!: any[]

  outerParam$ = new BehaviorSubject<any>(null);

  alertOptions: IAlertOptions = {
    autoClose: false,
    keepAfterRouteChange: true
  };
  apiDefinition: ICorePageListApiDefinition = {
    queryListRelativePath: api.HU_JOB_QUERY_LIST,
  };
  title = EnumTranslateKey.UI_COMPONENT_TITLE_JOB;
  crud: ICorePageListCRUD = {
    deleteIds: api.HU_JOB_DELETE_IDS,
    toggleActiveIds: api.HU_JOB_CHANGESTATUS
  };

  columns: ICoreTableColumnItem[] = [
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_JOB_ID,
      field: 'id',
      hidden: true,
      type: 'number',
      align: 'left',
      width: 200,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_JOB_IS_ACTIVE,
      field: 'actflg',
      type: 'string',
      align: 'center',
      width: 130,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_JOB_CODE,
      field: 'code',
      type: 'string',
      align: 'left',
      width: 110,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_JOB_NAMEVN,
      field: 'nameVN',
      type: 'string',
      align: 'left',
      width: 350,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_JOB_NAMEEN,
      field: 'nameEN',
      type: 'string',
      align: 'left',
      width: 350,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_JOB_PURPOSE,
      field: 'purpose',
      type: 'string',
      align: 'left',
      width: 200,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_JOB_JOB_FAMILY,
      field: 'jobFamilyID',
      type: 'string',
      align: 'left',
      width: 150,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_JOB_NOTE,
      field: 'note',
      type: 'string',
      align: 'left',
      width: 200,
    },
   
  ];

  editRoute: ICorePageListEditRouting = {
    auxiliary: 'popupAux',
  };
  /* End Properties being passed to core-page-type-a */

  constructor(public override mls: MultiLanguageService,
    private alertService : AlertService,
    private appService: AppService) {
    super(mls);
  }
  ngAfterViewInit(): void {
    const stickerFilter = this.columns.filter(c => c.field === 'actflg');
    if (!!stickerFilter.length) stickerFilter[0].templateRef = this.sticker;
  }
  
}
