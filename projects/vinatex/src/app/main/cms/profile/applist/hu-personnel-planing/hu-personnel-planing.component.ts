import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, TemplateRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EnumTranslateKey, api } from 'alpha-global-constants';
import { BaseComponent, CoreOrgTreeComponent, CorePageListComponent, CoreStatusStickerComponent, EnumCoreButtonVNSCode, EnumCoreTablePipeType, ICoreButtonVNS, ICorePageListApiDefinition, ICorePageListCRUD, ICorePageListEditRouting, ICoreTableColumnItem, IGenerateTemplateRequest, IInOperator, MultiLanguageService, OrganizationService } from 'ngx-histaff-alpha';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-hu-personnel-planing',
  standalone: true,
  imports: [
    CorePageListComponent,
    CommonModule,
    FormsModule,
    CoreStatusStickerComponent,
    CoreOrgTreeComponent
  ],
  templateUrl: './hu-personnel-planing.component.html',
  styleUrl: './hu-personnel-planing.component.scss'
})
export class HuPersonnelPlaningComponent extends BaseComponent implements AfterViewInit {
  @ViewChild('sticker') sticker!: TemplateRef<any>;
  outerParam$ = new BehaviorSubject<any>(null);
  apiDefinition: ICorePageListApiDefinition = {
    queryListRelativePath: api.HU_PERSONNEL_PLANING_QUERY_LIST,
  }

  generateTemplateRequest!: IGenerateTemplateRequest;
  orgIds!: number[];
  title = EnumTranslateKey.UI_COMPONENT_TITLE_HU_PERSONNEL;
  editRoute: ICorePageListEditRouting = {
    auxiliary: 'popupAux'
  }

  crud: ICorePageListCRUD = {
    deleteIds: api.HU_PERSONNEL_PLANING_DELETE_ID,
    toggleActiveIds: api.HU_PERSONNEL_PLANING_CHANGE_STATUS
  }

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
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_NATION_IS_ACTIVE,
      field: 'active',
      type: 'string',
      align: 'center',
      width: 150
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_HU_PERSONNEL_PLANING_YEAR,
      field: 'yearStr',
      type: 'string',
      align: 'left',
      width: 150
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_HU_PERSONNEL_PLANING_ORG_NAME,
      field: 'orgName',
      type: 'string',
      align: 'left',
      width: 250
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_HU_PERSONNEL_PLANING_NAME,
      field: 'name',
      type: 'string',
      align: 'left',
      width: 250
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_HU_PERSONNEL_PLANING_EFFECT_DATE,
      field: 'effectDate',
      type: 'string',
      align: 'left',
      width: 150,
      pipe: EnumCoreTablePipeType.DATE
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_HU_PERSONNEL_PLANING_NOTE,
      field: 'note',
      type: 'string',
      align: 'left',
      width: 300
    },
  ]

  constructor(public override mls: MultiLanguageService,
    private organizationService: OrganizationService){
    super( mls);
    const newOrgIds: number[] = [];
    organizationService.status$.value.activeKeys.map(x => newOrgIds.push(Number(x)));
    this.onOrgIdChange(newOrgIds);
  }
  ngAfterViewInit(): void {
    setTimeout(() => {
      const stickerFilter = this.columns.filter(c => c.field === 'active');
      if (!!stickerFilter.length) stickerFilter[0].templateRef = this.sticker;
    })
  }
  onCorePageHeaderButtonClick(e: ICoreButtonVNS) {
    switch (e.code) {
      case EnumCoreButtonVNSCode.HEADER_ACTIVATE:
        break;
      default:
        break;
    }
  }
  onOrgIdChange(orgIds: number[]) {
    this.orgIds = orgIds;
    this.outerInOperators = [
      {
        field: 'orgId',
        values: orgIds,
      },
    ];
  }
  outerInOperators: IInOperator[] = [
    {
      field: 'orgId',
      values: this.orgIds || [],
    },
  ];
  onSelectedIdsChange(e: any) {
   
  }

  override ngOnInit(): void {
    this.mls.lang$.subscribe(x => {
      this.lang = x;
      this.generateTemplateRequest = {
        exCode: 'HU_PERSONNEL_PLANING',
        lang: x
      }
    })
  }

}
