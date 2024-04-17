import { Component, ViewEncapsulation } from "@angular/core";
import { api, EnumTranslateKey } from 'alpha-global-constants';
import { BaseComponent, ICorePageListApiDefinition, ICorePageListCRUD, ICoreTableColumnItem, ICorePageListEditRouting, MultiLanguageService } from "ngx-histaff-alpha";
import { BehaviorSubject } from "rxjs";

@Component({
  selector: 'cms-app-job-band',
  templateUrl: './job-band.component.html',
  styleUrls: ['./job-band.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class JobBandComponent extends BaseComponent {
  orgId!: number;
  /* END: Local filter params */

  /*
  Properties being passed to core-page-list
  */

  //list!: any[]

  outerParam$ = new BehaviorSubject<any>(null);

  apiDefinition: ICorePageListApiDefinition = {
    queryListRelativePath: api.HU_JOB_BAND_QUERY_LIST,
  };
  title = EnumTranslateKey.UI_COMPONENT_TITLE_JOB_BAND;
  crud: ICorePageListCRUD = {
    deleteIds: api.HU_JOB_BAND_DELETE_IDS,
  };

  columns: ICoreTableColumnItem[] = [
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_JOB_BAND_ID,
      field: 'id',
      hidden: true,
      type: 'number',
      align: 'left',
      width: 200,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_JOB_BAND_NAMEVN,
      field: 'nameVN',
      type: 'string',
      align: 'left',
      width: 350,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_JOB_BAND_NAMEVN,
      field: 'nameEN',
      type: 'string',
      align: 'left',
      width: 350,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_JOB_BAND_LEVELFROM,
      field: 'levelFrom',
      type: 'string',
      align: 'left',
      width: 110,
    },
  ];

  editRoute: ICorePageListEditRouting = {
    auxiliary: 'popupAux',
  };
  /* End Properties being passed to core-page-type-a */

  constructor(public override mls: MultiLanguageService) {
    super(mls);
  }

}
