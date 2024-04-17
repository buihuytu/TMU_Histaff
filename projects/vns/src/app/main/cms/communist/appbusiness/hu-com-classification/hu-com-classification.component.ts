import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EnumTranslateKey, api } from 'alpha-global-constants';
import { CorePageListComponent, FullscreenModalLoaderComponent, CoreOrgTreeComponent, BaseComponent, ICorePageListApiDefinition, ICorePageListCRUD, ICorePageListEditRouting, IFilterOperator, EnumFilterOperator, IInOperator, ICoreTableColumnItem, MultiLanguageService, OrganizationService } from 'ngx-histaff-alpha';
import { BehaviorSubject } from 'rxjs';

@Component({
  standalone: true,
  selector: 'app-hu-com-classification',
  templateUrl: './hu-com-classification.component.html',
  styleUrl: './hu-com-classification.component.scss',
  imports: [
    CorePageListComponent,
    CommonModule,
    FormsModule,
    FullscreenModalLoaderComponent,
    CoreOrgTreeComponent
  ]
})
export class HuComClassificationComponent extends BaseComponent {
  selectedIds: string[] | number[] = [];
  title = EnumTranslateKey.UI_COMPONENT_TITLE_HU_COM_CLASSIFICATION;
  outerParam$ = new BehaviorSubject<any>(null);
  id: any;
  loading!: boolean;
  orgIds!: number[];
  apiDefinition: ICorePageListApiDefinition = {
    queryListRelativePath: api.HU_COM_CASSIFICATION_QUERY_LIST,
  };
  crud: ICorePageListCRUD = {
    deleteIds: api.HU_COM_CASSIFICATION_DELETE_IDS,
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
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_HU_COM_CLASSIFICATION_NUM,//SO LY LICH DANG VIEN
      field: 'partyMemberProfileNum',
      type: 'string',
      align: 'left',
      width: 150,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_EMPLOYEE_FULLNAME,//ho ten
      field: 'fullName',
      type: 'string',
      align: 'left',
      width: 150,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_HU_COM_CLASSIFICATION_AFFILIATED_PARTY_COMMITTE,//dang bo truc thuoc
      field: 'affiliatedPartyCommitte',
      type: 'string',
      align: 'left',
      width: 250,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_HU_COM_CLASSIFICATION_PARTY_CELL,//Chi bo Dang
      field: 'partyCellName',
      type: 'string',
      align: 'left',
      width: 150,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_HU_COM_CLASSIFICATION_POSITION,//Chuc danh dang
      field: 'positionName',
      type: 'string',
      align: 'left',
      width: 150,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_HU_COM_CLASSIFICATION_GOVERNMENT_POSITION,//Chuc danh chinh quyen
      field: 'governmentPosName',
      type: 'string',
      align: 'left',
      width: 150,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_HU_COM_CLASSIFICATION_CLASSIFICATION,//Xep loai
      field: 'classificationName',
      type: 'string',
      align: 'left',
      width: 150,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_TR_PLAN_YEAR,//Nam
      field: 'year',
      type: 'string',
      align: 'left',
      width: 100,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_TR_PLAN_NOTE,//Note
      field: 'note',
      type: 'string',
      align: 'left',
      width: 300,
    }
  ];

  constructor(
    public override mls: MultiLanguageService,
    private organizationService: OrganizationService,
  ) {
    super(mls);
    const newOrgIds: number[] = [];
    this.organizationService.status$.value.activeKeys.map(x => newOrgIds.push(Number(x)))
    this.onOrgIdsChange(newOrgIds)
  }

  override ngOnDestroy(): void { }

  onOrgIdsChange(orgIds: number[]) {
    this.orgIds = orgIds;
    this.outerInOperators = [
      {
        field: 'orgId',
        values: orgIds,
      },
    ];
  }

  onRowClick(e: any) {
    this.id = e.id
  }

  onSelectedIdsChange(e: number[]) {
    this.selectedIds = e;
  }
}
