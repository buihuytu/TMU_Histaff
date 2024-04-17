import { Component, AfterViewInit, ViewChild, TemplateRef } from "@angular/core";
import { EnumTranslateKey, api } from 'alpha-global-constants';
import { BaseComponent, EnumCoreTablePipeType, ICorePageListApiDefinition, ICorePageListCRUD, ICoreTableColumnItem, IInOperator, MultiLanguageService } from "ngx-histaff-alpha";



@Component({
  selector: 'app-rc-request',
  templateUrl: './rc-request.component.html',
  styleUrls: ['./rc-request.component.scss']
})

export class RcRequestComponent extends BaseComponent implements AfterViewInit {
  @ViewChild('sticker') sticker!: TemplateRef<any>;

  title = EnumTranslateKey.UI_COMPONENT_TITLE_RC_REQUEST

  apiDefinition: ICorePageListApiDefinition = {
    queryListRelativePath: api.RC_REQUEST_QUERY_LIST,
  }

  crud: ICorePageListCRUD = {
    deleteIds: api.RC_REQUEST_DELETE_IDS,
  }

  orgIds!: number[];

  outerInOperators: IInOperator[] = [
    {
      field: 'orgId',
      values: this.orgIds || []
    }
  ];

  columns: ICoreTableColumnItem[] = [
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_INS_TYPE_IS_ACTIVE,
      field: 'statusName',
      type: 'string',
      align: 'left',
      width: 200,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_CODE_YCTD,
      field: 'code',
      type: 'string',
      align: 'left',
      width: 200,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_NAME_YCTD,
      field: 'resterName',
      type: 'string',
      align: 'left',
      width: 200,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_REQUEST_SENDER,
      field: 'petitionerName',
      type: 'string',
      align: 'left',
      width: 200,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_DATE_REQUEST_WAS_SENT,
      field: 'dateVote',
      type: 'string',
      align: 'left',
      width: 200,
      pipe: EnumCoreTablePipeType.DATE
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_RESPONSE_DATE,
      field: 'dateNeedResponse',
      type: 'string',
      align: 'left',
      width: 200,
      pipe: EnumCoreTablePipeType.DATE
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_DECISION_PARENT_NAME,
      field: 'orgName',
      type: 'string',
      align: 'left',
      width: 200,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_VACANCIES,
      field: 'positionName',
      type: 'string',
      align: 'left',
      width: 200,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_NUMBER_TO_BE_RECRUITED,
      field: 'numberNeed',
      type: 'string',
      align: 'left',
      width: 200,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_REASON_FOR_RECRUITMENT,
      field: 'recruitmentReasonStr',
      type: 'string',
      align: 'left',
      width: 200,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_PERSON_IN_CHARG_OF_YCTD,
      field: 'personInChargeStr',
      type: 'string',
      align: 'left',
      width: 200,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_REASON_FOR_CANCELING_YCTD,
      field: 'ly_do_huy_YCTD',
      type: 'string',
      align: 'left',
      width: 200,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_HU_EVALUATION_COM_ID,
      field: 'id',
      type: 'number',
      align: 'left',
      hidden: true,
      width: 1,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_HU_EVALUATION_COM_ID,
      field: 'orgId',
      type: 'number',
      align: 'left',
      hidden: true,
      width: 1,
    }
  ]

  constructor(
    public override mls: MultiLanguageService
  ) {
    super(mls);
  }

  ngAfterViewInit(): void {
    const stickerFilter = this.columns.filter(c => c.field === 'statusName');
    if (!!stickerFilter.length) stickerFilter[0].templateRef = this.sticker;
  }

  onOrgIdsChange(orgIds: number[]) {
    this.orgIds = orgIds;
    this.outerInOperators = [
      {
        field: 'orgId',
        values: orgIds,
      },
    ];
  }
}