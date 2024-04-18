import {
  Component,
  OnInit,
  OnDestroy,
  TemplateRef,
  ViewEncapsulation,
  ViewChild,
  AfterViewInit,
} from '@angular/core';
import { EnumTranslateKey, api } from 'alpha-global-constants';
import { ICorePageListApiDefinition,ICorePageListCRUD, ICoreTableColumnItem, ICorePageListEditRouting } from 'ngx-histaff-alpha';

@Component({
  selector: 'cms-app-classification',
  templateUrl: './classification.component.html',
  styleUrls: ['./classification.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ClassificationComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('sticker') sticker!: TemplateRef<any>;

  /*
  Properties being passed to core-page-list
  */
  title = EnumTranslateKey.UI_COMPONENT_TITLE_CLASSIFICATION;

  apiDefinition: ICorePageListApiDefinition = {
    queryListRelativePath: api.HU_CLASSIFICATION_QUERY_LIST,
  };

  avatarTemplate!: TemplateRef<any>;

  // USER TABLE IS THE ONLY TABLE WHICH HAS ID OF TYPE STRING. ALL THE OTHERS MUST HAVE ID OF TYPE NUMBER (bigint/long)
  crud: ICorePageListCRUD = {
    deleteIds: api.HU_CLASSIFICATION_DELETE_IDS,
    toggleActiveIds: api.HU_CLASSIFICATION_TOGGLE_ACTIVE_IDS,
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
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_CLASSIFICATION_STATUS,
      field: 'statusName',
      type: 'string',
      align: 'center',
      width: 130,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_CLASSIFICATION_CODE,
      field: 'code',
      type: 'string',
      align: 'left',
      width: 200,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_CLASSIFICATION_TYPE,
      field: 'classificationTypeName',
      type: 'string',
      align: 'left',
      width: 250,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_CLASSIFICATION_LEVEL,
      field: 'classificationLevelName',
      type: 'string',
      align: 'left',
      width: 250,
    },
    {
      caption:
        EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_CLASSIFICATION_POINT_FROM,
      field: 'pointFrom',
      type: 'number',
      align: 'center',
      // width: 150,
      hidden: true
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_CLASSIFICATION_POINT_TO,
      field: 'pointTo',
      type: 'number',
      align: 'center',
      // width: 150,
      hidden: true
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_CLASSIFICATION_NOTE,
      field: 'note',
      type: 'string',
      align: 'left',
      width: 250,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_CLASSIFICATION_STATUS,
      field: 'statusName',
      type: 'string',
      align: 'left',
      width: 150,
      hidden: true,
    },
  ];

  editRoute: ICorePageListEditRouting = {
    auxiliary: 'popupAux',
  };
  /* End Properties being passed to core-page-type-a */

  constructor() {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    setTimeout(() => {
      const stickerFilter = this.columns.filter(c => c.field === 'statusName');
      if (!!stickerFilter.length) stickerFilter[0].templateRef = this.sticker;
    })
  }

  ngOnDestroy(): void {}
}
