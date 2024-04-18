import { Component, AfterViewInit } from "@angular/core";
import { EnumTranslateKey, api } from 'alpha-global-constants';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  BaseComponent,
  EnumCoreTablePipeType,
  ICorePageListApiDefinition,
  ICorePageListCRUD,
  ICoreTableColumnItem,
  IInOperator,
  MultiLanguageService,
  CorePageListComponent,
  CoreOrgTreeComponent
} from "ngx-histaff-alpha";

@Component({
  selector: 'app-tr-request-year',
  standalone: true,
  imports: [
    CommonModule,
    CorePageListComponent,
    CoreOrgTreeComponent,
    FormsModule,
  ],
  templateUrl: './tr-request-year.component.html',
  styleUrl: './tr-request-year.component.scss'
})

export class TrRequestYearComponent extends BaseComponent implements AfterViewInit {
  title = EnumTranslateKey.UI_COMPONENT_TITLE_TR_REQUEST_YEAR;

  apiDefinition: ICorePageListApiDefinition = {
    queryListRelativePath: api.TR_REQUEST_YEAR_QUERY_LIST,
  };

  crud: ICorePageListCRUD = {
    deleteIds: api.TR_REQUEST_YEAR_DELETE_IDS
  };

  orgIds!: number[];

  outerInOperators: IInOperator[] = [
    {
      field: 'orgId',
      values: this.orgIds || []
    }
  ];

  columns: ICoreTableColumnItem[] = [
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_DEPARTMENT_SENDS_REQUEST,
      field: 'orgName',
      type: 'string',
      align: 'left',
      width: 200
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_DATE_REQUEST,
      field: 'dateOfRequest',
      type: 'date',
      align: 'left',
      width: 200,
      pipe: EnumCoreTablePipeType.DATE
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_TR_PLAN_COURSE,
      field: 'trCourseName',
      type: 'string',
      align: 'left',
      width: 200
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_CERTIFICATE_CONTENTTRAIN,
      field: 'content',
      type: 'string',
      align: 'left',
      width: 200
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_TRAINING_HOST_UNIT,
      field: 'companyName',
      type: 'string',
      align: 'left',
      width: 230
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_PARTICIPANTS,
      field: 'participants',
      type: 'string',
      align: 'left',
      width: 200
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_NUMBER_ATTENDING,
      field: 'quantityPeople',
      type: 'number',
      align: 'left',
      width: 200
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_EXPECTED_TIME,
      field: 'quarterName',
      type: 'string',
      align: 'left',
      width: 200
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_ORGANIZATION_LOCATION,
      field: 'initializationLocationStr',
      type: 'string',
      align: 'left',
      width: 200
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LEVEL_PRIORITY,
      field: 'priorityLevelStr',
      type: 'string',
      align: 'left',
      width: 200
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_ESTIMATED_COST,
      field: 'money',
      type: 'number',
      align: 'left',
      width: 200,
      pipe: EnumCoreTablePipeType.NUMBER
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_TR_PLAN_NOTE,
      field: 'note',
      type: 'string',
      align: 'left',
      width: 200,
    },
    {
      caption: EnumTranslateKey.UI_LABEL_TIME_IMPORT_STATUS,
      field: 'statusName',
      type: 'string',
      align: 'left',
      width: 200
    },
    {
      caption: EnumTranslateKey.UI_LABEL_COMPARE_MONEY,
      field: 'so_sanh_chi_phi',
      type: 'string',
      align: 'left',
      width: 200
    },
    {
      caption: EnumTranslateKey.UI_LABEL_REASON_FOR_DISAPPROVAL,
      field: 'ly_do_khong_phe_duyet',
      type: 'string',
      align: 'left',
      width: 200
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_HU_EVALUATION_COM_ID,
      field: 'id',
      type: 'number',
      align: 'left',
      hidden: true,
      width: 1
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_HU_EVALUATION_COM_ID,
      field: 'orgId',
      type: 'number',
      align: 'left',
      hidden: true,
      width: 1
    }
  ];

  constructor(
    public override mls: MultiLanguageService
  ) {
    super(mls);
  }

  ngAfterViewInit(): void {

  }

  onOrgIdsChange(orgIds: number[]) {
    this.orgIds = orgIds;
    
    this.outerInOperators = [
      {
        field: 'orgId',
        values: orgIds
      }
    ];
  }
}