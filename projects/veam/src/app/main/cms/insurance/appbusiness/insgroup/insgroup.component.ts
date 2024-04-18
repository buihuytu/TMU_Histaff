import { AfterViewInit, Component, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EnumTranslateKey, api } from 'alpha-global-constants';
import { ICorePageListApiDefinition, ICorePageListCRUD, ICoreTableColumnItem, ICorePageListEditRouting } from 'ngx-histaff-alpha';
@Component({
  selector: 'app-ins-group',
  templateUrl: './insgroup.component.html',
  styleUrls: ['./insgroup.component.scss'],
})
export class InsGroupComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('sticker') sticker!: TemplateRef<any>;

  /*
  Properties being passed to core-page-list
  */
  title = EnumTranslateKey.UI_COMPONENT_TITLE_INSURANCE_GROUP;

  apiDefinition: ICorePageListApiDefinition = {
    queryListRelativePath: api.INS_GROUP_QUERY_LIST,
  };

  crud: ICorePageListCRUD = {
    deleteIds: api.INS_GROUP_DELETE_IDS,
    toggleActiveIds: api.INS_GROUP_TOGGLER_ACTIVE_IDS,
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
      caption: EnumTranslateKey.UI_LABEL_INSURANCE_GROUP_STATUS,
      field: 'status',
      type: 'string',
      align: 'center',
      width: 130,
    },
    {
      caption: EnumTranslateKey.UI_LABEL_INSURANCE_GROUP_CODE,
      field: 'code',
      type: 'string',
      align: 'left',
      width: 300,
    },
    {
      caption: EnumTranslateKey.UI_LABEL_INSURANCE_GROUP_NAME,
      field: 'name',
      type: 'string',
      align: 'left',
      width: 450,
    },
    {
      caption: EnumTranslateKey.UI_LABEL_INSURANCE_GROUP_NOTE,
      field: 'note',
      type: 'string',
      align: 'left',
      width: 500,
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
