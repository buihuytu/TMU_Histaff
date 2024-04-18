import { AfterViewInit, Component, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { EnumTranslateKey, api } from 'alpha-global-constants';
import { ICorePageListApiDefinition, ICorePageListCRUD, ICoreTableColumnItem, ICorePageListEditRouting } from 'ngx-histaff-alpha';

@Component({
  selector: 'cms-ins-regimes',
  templateUrl: './ins-regimes.component.html',
  styleUrls: ['./ins-regimes.component.scss'],
})
export class InsRegimesComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('sticker') sticker!: TemplateRef<any>;

  /*
  Properties being passed to core-page-list
  */
  title = EnumTranslateKey.UI_COMPONENT_TITLE_INS_REGIMES;

  apiDefinition: ICorePageListApiDefinition = {
    queryListRelativePath: api.INS_REGIMES_QUERY_LIST,
  };

  crud: ICorePageListCRUD = {
    deleteIds: api.INS_REGIMES_DELETE_IDS,
    toggleActiveIds: api.INS_REGIMES_CHANGESTATUSAPPROVE
  };

  columns: ICoreTableColumnItem[] = [
    {
      caption: EnumTranslateKey.UI_LABEL_INSURANCE_GROUP_ID,
      field: 'id',
      type: 'number',
      hidden: true,
      align: 'left',
      width: 10,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_INS_REGIMES_STATUS,
      field: 'status',
      type: 'string',
      align: 'center',
      width: 130,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_INS_REGIMES_CODE,
      field: 'code',
      type: 'string',
      align: 'left',
      width: 150,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_INS_REGIMES_NAME,
      field: 'name',
      type: 'string',
      align: 'left',
      width: 500,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_INS_REGIMES_GROUP_NAME,
      field: 'insGroupName',
      type: 'string',
      align: 'left',
      width: 250,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_INS_REGIMES_CAL_DATE_TYPE,
      field: 'calDateTypeString',
      type: 'string',
      align: 'left',
      width: 200,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_INS_REGIMES_TOTAL_DAY,
      field: 'totalDay',
      type: 'string',
      align: 'center',
      width: 105,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_INS_REGIMES_BENEFITS_LEVELS,
      field: 'benefitsLevels',
      type: 'string',
      align: 'center',
      width: 100,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_INS_REGIMES_NOTE,
      field: 'note',
      type: 'string',
      align: 'left',
      width: 200,
    },
    
  ];

  editRoute: ICorePageListEditRouting = {
    auxiliary: 'popupAux',
  };
  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void { }

  ngAfterViewInit(): void {
    setTimeout(() => {
      const stickerFilter = this.columns.filter(c => c.field === 'status');
      if (!!stickerFilter.length) stickerFilter[0].templateRef = this.sticker;
    })
  }
  ngOnDestroy(): void { }
}
