import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { EnumTranslateKey, api } from 'alpha-global-constants';
import { AlertService, EnumCoreButtonVNSCode, EnumCoreTablePipeType, EnumFilterOperator, ICoreButtonVNS, ICorePageListApiDefinition, ICorePageListCRUD, ICorePageListEditRouting, ICoreTableColumnItem, IFilterOperator, IInOperator, OrganizationService, alertOptions } from 'ngx-histaff-alpha';
import { BehaviorSubject } from 'rxjs';


@Component({
  selector: 'app-trplan',
  templateUrl: './trplan.component.html',
  styleUrls: ['./trplan.component.scss'],
})
export class TrplanComponent implements OnInit, OnDestroy {

  selectedIds: string[] | number[] = [];
  title = EnumTranslateKey.UI_COMPONENT_TITLE_TR_PLAN;
  outerParam$ = new BehaviorSubject<any>(null);
  id: any;
  loading!: boolean;
  orgIds!: number[];
  apiDefinition: ICorePageListApiDefinition = {
    queryListRelativePath: api.TR_PLAN_QUERY_LIST,
  };
  crud: ICorePageListCRUD = {
    deleteIds: api.TR_PLAN_DELETE_IDS,
  };
  editRoute: ICorePageListEditRouting = {
    auxiliary: 'popupAux',
  };
  outerFilterOperators: IFilterOperator[] = [
    {
      field: 'orgId',
      operator: EnumFilterOperator.EQUAL,
    },
  ];
  outerInOperators: IInOperator[] = [
    {
      field: 'orgId',
      values: this.orgIds || [],
    },
  ];
  columns: ICoreTableColumnItem[] = [
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_COMMON_ID,
      field: 'id',
      hidden: true,
      type: 'number',
      align: 'right',
      width: 30,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_TR_PLAN_CODE,
      field: 'code',
      type: 'string',
      align: 'left',
      width: 150,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_TR_PLAN_YEAR,
      field: 'year',
      type: 'string',
      align: 'left',
      width: 100,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_TR_PLAN_ORGANIZATION,
      field: 'orgName',
      type: 'string',
      align: 'left',
      width: 250,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_TR_PLAN_COURSE,
      field: 'courseName',
      type: 'string',
      align: 'left',
      width: 150,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_TR_PLAN_PROPERTITES_NEED_ID,
      field: 'propertiesNeedName',
      type: 'string',
      align: 'left',
      width: 150,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_TR_PLAN_FORM_TRAINING,
      field: 'formTrainingName',
      type: 'string',
      align: 'left',
      width: 150,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_TR_PLAN_NAME,
      field: 'name',
      type: 'string',
      align: 'left',
      width: 150,
    },


    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_TR_PLAN_START_DATE_PLAN,
      field: 'startDatePlan',
      type: 'date',
      align: 'left',
      width: 180,
      pipe: EnumCoreTablePipeType.DATE,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_TR_PLAN_END_DATE_REAL,
      field: 'endDatePlan',
      type: 'string',
      align: 'left',
      width: 180,
      pipe: EnumCoreTablePipeType.DATE,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_TR_PLAN_START_DATE_REAL,
      field: 'startDateReal',
      type: 'string',
      align: 'left',
      width: 180,
      pipe: EnumCoreTablePipeType.DATE,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_TR_PLAN_END_DATE_PLAN,
      field: 'endDateReal',
      type: 'string',
      align: 'left',
      width: 180,
      pipe: EnumCoreTablePipeType.DATE,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_TR_PLAN_PERSON_NUM_PLAN,
      field: 'personNumPlan',
      type: 'string',
      align: 'left',
      width: 100,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_TR_PLAN_PERSON_NUM_REAL,
      field: 'personNumReal',
      type: 'string',
      align: 'left',
      width: 100,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_TR_PLAN_EXPECTED_COST,
      field: 'expectedCost',
      type: 'string',
      align: 'left',
      pipe: EnumCoreTablePipeType.NUMBER,
      width: 150,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_TR_PLAN_ACTUAL_COST,
      field: 'actualCost',
      type: 'string',
      align: 'left',
      pipe: EnumCoreTablePipeType.NUMBER,
      width: 150,
    },

    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_TR_PLAN_CENTER,
      field: 'centerName',
      type: 'string',
      align: 'left',
      width: 150,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_TR_PLAN_CONTENT,
      field: 'content',
      type: 'string',
      align: 'left',
      width: 150,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_TR_PLAN_FORM_TRAINING,
      field: 'formTrainingName',
      type: 'string',
      align: 'left',
      width: 150,
      hidden: true,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_TR_PLAN_ADDRESS_TRAINING,
      field: 'addressTraining',
      type: 'string',
      align: 'left',
      width: 150,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_TR_PLAN_NOTE,
      field: 'note',
      type: 'string',
      align: 'left',
      width: 300,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_TR_PLAN_FILE_NAME,
      field: 'attachment',
      type: 'string',
      align: 'left',
      width: 300,
      hidden: true,
    },
  ];

  constructor(private organizationService: OrganizationService,
    private http: HttpClient,
    private alertService: AlertService
  ) {
    const newOrgIds: number[] = [];
    this.organizationService.status$.value.activeKeys.map((x) =>
      newOrgIds.push(Number(x))
    );
    this.onOrgIdsChange(newOrgIds);
  }

  ngOnDestroy(): void { }

  onOrgIdsChange(orgIds: number[]) {
    this.orgIds = orgIds;
    this.outerInOperators = [
      {
        field: 'orgId',
        values: orgIds,
      },
    ];
  }
  ngOnInit(): void { }

  onRowClick(e: any) {
    this.id = e.id
  }

  onSelectedIdsChange(e: number[]) {
    this.selectedIds = e;
  }

  onCorePageHeaderButtonClick(e: ICoreButtonVNS) {
    if (e.code == EnumCoreButtonVNSCode.HEADER_PRINT) {
      this.loading = true;
      this.http.get(api.TR_PLAN_GET_PRINT, {
        responseType: 'blob',
        params: { id: this.selectedIds.toString() }
      }).subscribe((response: Blob) => {
        if (response.type === 'application/octet-stream') {
          const downloadUrl = URL.createObjectURL(response);
          const link = document.createElement('a');
          link.href = downloadUrl;
          link.setAttribute('download', 'Tờ trình kế hoạch đào tạo.doc');
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          URL.revokeObjectURL(downloadUrl);
          this.loading = false;
        }
        else {
          const reader = new FileReader();
          reader.onload = () => {
            const jsonBody = reader.result as string;
            const data = JSON.parse(jsonBody);
            this.alertService.warn(data.messageCode, alertOptions);
          };
          reader.readAsText(response);
          this.loading = false;
        }

      });
    }
  }
}
