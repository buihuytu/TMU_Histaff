import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, TemplateRef, ViewChild } from '@angular/core';
import { EnumTranslateKey, api } from 'alpha-global-constants';
import { CorePageListComponent, FullscreenModalLoaderComponent, CoreCheckboxComponent, CoreStatusStickerComponent, BaseComponent, ICorePageListApiDefinition,ICorePageListCRUD, ICorePageListEditRouting, ICoreTableColumnItem, EnumCoreTablePipeType, MultiLanguageService } from 'ngx-histaff-alpha';


@Component({
  selector: 'app-hu-asset',
  standalone: true,
  imports: [
    CorePageListComponent,
    FullscreenModalLoaderComponent,
    CommonModule,
    CoreCheckboxComponent, 
    CoreStatusStickerComponent
  ],
  templateUrl: './hu-asset.component.html',
  styleUrl: './hu-asset.component.scss'
})
export class HuAssetComponent extends BaseComponent implements AfterViewInit {

  @ViewChild('sticker') sticker!: TemplateRef<any>;
  selectedIds: string[] | number[] = [];
  title = EnumTranslateKey.UI_COMPONENT_TITLE_HU_ASSET;
  id: any;
  loading!: boolean;
  apiDefinition: ICorePageListApiDefinition = {
    queryListRelativePath: api.HU_ASSET_QUERY_LIST,
  };
  crud: ICorePageListCRUD = {
    deleteIds: api.HU_ASSET_DELETE_IDS,
    toggleActiveIds: api.HU_ASSET_TOGGLE_ACTIVE_IDS,
  };
  editRoute: ICorePageListEditRouting = {
    auxiliary: 'popupAux',
  };

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
      caption: 'ASSET.status',
      field: 'status',
      type: 'string',
      align: 'center',
      pipe: EnumCoreTablePipeType.BOOLEAN_TO_ACTIVE_INACTIVE,
      width: 130,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_HU_ASSET_CODE,//code
      field: 'code',
      type: 'string',
      align: 'left',
      width: 200,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_HU_ASSET_NAME,//ten tai san
      field: 'name',
      type: 'string',
      align: 'left',
      width: 200,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_HU_ASSET_GROUP,//nhom tai san
      field: 'groupAssetName',
      type: 'string',
      align: 'left',
      width: 200,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_INS_MATERNITY_NOTE,//ghi chu
      field: 'note',
      type: 'string',
      align: 'left',
      width: 500,
    },
  ];

  constructor(
    public override mls: MultiLanguageService
  ){
    super(mls);
  }

  onRowClick(e: any) {
    this.id = e.id
  }

  onSelectedIdsChange(e: number[]) {
    this.selectedIds = e;
  }

  ngAfterViewInit(): void {
    const stickerFilter = this.columns.filter(c => c.field === 'status');
    if (!!stickerFilter.length) stickerFilter[0].templateRef = this.sticker;
  }

}
