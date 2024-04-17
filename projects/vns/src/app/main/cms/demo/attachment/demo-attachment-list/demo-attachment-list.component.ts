import { Component, OnInit, TemplateRef } from '@angular/core';
import { EnumTranslateKey, api } from 'alpha-global-constants';
import { ICoreChecklistOption, ICorePageListApiDefinition, ICorePageListCRUD, ICoreTableColumnItem, EnumCoreTablePipeType, ICorePageListEditRouting, AppService } from 'ngx-histaff-alpha';
import { Subscription, BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-demo-attachment-list',
  templateUrl: './demo-attachment-list.component.html',
  styleUrls: ['./demo-attachment-list.component.scss']
})
export class DemoAttachmentListComponent implements OnInit {

  /*
  Properties being passed to core-page-list
  */
  title = EnumTranslateKey.UI_COMPONENT_TITLE_DEMO_ATTACHMENT;

  subscriptions: Subscription[] = [];

  attachmentStatusOptions$ = new BehaviorSubject<ICoreChecklistOption[]>([])

  apiDefinition: ICorePageListApiDefinition = {
    queryListRelativePath: api.DEMO_ATTACHMENT_QUERY_LIST,
  }

  avatarTemplate!: TemplateRef<any>;

  // USER TABLE IS THE ONLY TABLE WHICH HAS ID OF TYPE STRING. ALL THE OTHERS MUST HAVE ID OF TYPE NUMBER (bigint/long)
  crud: ICorePageListCRUD = {
    deleteIds: api.DEMO_ATTACHMENT_DELETE_IDS
  }

  /* Bellow are three props to pass to CoreCommonParamKit */
  datePeriodComparisonFor: string = 'createdDate';
  datePeriodComparisonForLabelKey: EnumTranslateKey = EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_COMMON_CREATED_DATE;
  statusInclusionFor: string = 'statusId';
  statusInclusionForLabelKey: EnumTranslateKey = EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_DEMO_ATTACHMENT_STATUS_ID;
  statusOptionsApi: api = api.DEMO_ATTACHMENT_GET_ATTACHMENT_STATUS_LIST;
  /*********************/

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
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_DEMO_ATTACHMENT_NAME,
      field: 'name',
      type: 'string',
      align: 'left',
      width: 150,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_COMMON_EFFECT_DATE,
      field: 'effectDate',
      type: 'date',
      align: 'left',
      width: 200,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_DEMO_ATTACHMENT_ATTACHMENT1,
      field: 'firstAttachment',
      type: 'string',
      align: 'left',
      width: 200,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_DEMO_ATTACHMENT_ATTACHMENT2,
      field: 'secondAttachment',
      type: 'string',
      align: 'left',
      width: 200,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_DEMO_ATTACHMENT_STATUS_ID,
      field: 'statusName',
      type: 'string',
      align: 'left',
      width: 200,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_COMMON_CREATED_DATE,
      field: 'createdDate',
      type: 'string',
      align: 'left',
      width: 100,
      pipe: EnumCoreTablePipeType.DATE
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_COMMON_CREATED_BY_USERNAME,
      field: 'createdByUsername',
      type: 'string',
      align: 'left',
      width: 100,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_DEMO_ATTACHMENT_STATUS_ID,
      field: 'statusName',
      type: 'string',
      align: 'left',
      width: 100,
    },
  ]

  editRoute: ICorePageListEditRouting = {
    auxiliary: 'popupAux'
  }
  /* End Properties being passed to core-page-type-a */

  constructor(private appService: AppService) { }

  ngOnInit(): void {
  }

}