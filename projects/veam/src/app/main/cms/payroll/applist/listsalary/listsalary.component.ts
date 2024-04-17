import { Component, ViewEncapsulation, AfterViewInit, ViewChild, TemplateRef, Input } from "@angular/core";
import { EnumTranslateKey, api } from 'alpha-global-constants';
import { BaseComponent, IFilterOperator, EnumFilterOperator, ICorePageListApiDefinition, ICorePageListCRUD, ICoreTableColumnItem, ICorePageListEditRouting, MultiLanguageService, RandomAvatarService } from "ngx-histaff-alpha";
import { BehaviorSubject } from "rxjs";

@Component({
  selector: 'app-listsalary',
  templateUrl: './listsalary.component.html',
  styleUrls: ['./listsalary.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ListSalaryComponent extends BaseComponent implements AfterViewInit {
  @ViewChild('sticker') sticker!: TemplateRef<any>;

  @Input() hideHeader!: boolean;

  orgId!: number;

  title = EnumTranslateKey.UI_COMPONENT_TITLE_PA_LISTSAL;

  outerParam$ = new BehaviorSubject<any>(null);
  outerFilterOperators: IFilterOperator[] = [
    {
      field: 'orgId',
      operator: EnumFilterOperator.EQUAL,
    },
  ];

  apiDefinition: ICorePageListApiDefinition = {
    queryListRelativePath: api.PA_LISTSAL_QUERY_LIST,
  };

  crud: ICorePageListCRUD = {
    deleteIds: api.PA_LISTSAL_DELETE_IDS,
    toggleActiveIds: api.PA_LISTSAL_TOGGLE_ACTIVE_IDS,
  };

  avatarTemplate!: TemplateRef<any>;

  columns: ICoreTableColumnItem[] = [
    {
      // đây là trường số thứ tự
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_PA_LISTSAL_STT,
      field: 'order',
      type: 'string',
      align: 'center',
      width: 100,
    },
    {
      // đây là trường id bị ẩn
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_PA_LISTSAL_ID,
      field: 'id',
      hidden: true,
      type: 'number',
      align: 'right',
      width: 1,
    },
    {
      // đây là trường trạng thái
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_PA_LISTSAL_IS_ACTIVE,
      field: 'isActiveStr',
      type: 'string',
      align: 'center',
      width: 130,
    },
    {
      // đây là trường mã danh mục lương
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_PA_LISTSAL_CODE,
      field: 'codeListsal',
      type: 'string',
      align: 'left',
      width: 160,
    },
    {
      // đây là trường tên tiếng Việt
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_PA_LISTSAL_NAME_VN,
      field: 'nameVn',
      type: 'string',
      align: 'left',
      width: 150,
    },
    {
      // đây là trường tên tiếng Anh
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_PA_LISTSAL_NAME_EN,
      field: 'nameEn',
      type: 'string',
      align: 'left',
      width: 150,
    },
    {
      // đây là trường kiểu dữ liệu
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_PA_LISTSAL_DATA_TYPE_NAME,
      field: 'dataTypeName',
      type: 'string',
      align: 'left',
      width: 150,
    },
    {
      // đây là trường nhóm ký hiệu
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_PA_LISTSAL_LIST_KH_NAME,
      field: 'listKyHieuName',
      type: 'string',
      align: 'left',
      width: 150,
    },
    {
      // đây là trường thứ tự
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_PA_LISTSAL_ORDERLY,
      field: 'thuTu',
      type: 'string',
      align: 'center',
      width: 150,
    },
    
    {
      // đây là trường ghi chú
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_PA_LISTSAL_NOTE,
      field: 'note',
      type: 'string',
      align: 'left',
      width: 150,
    },
  ];

  defaultAvatar!: string;

  editRoute: ICorePageListEditRouting = {
    auxiliary: 'popupAux',
  };
  /* End Properties being passed to core-page-type-a */

  constructor(public override mls: MultiLanguageService, private ras: RandomAvatarService) {
    super(mls);
    this.defaultAvatar = ras.get();
  }
  ngAfterViewInit(): void {
    setTimeout(() => {
      this.columns.filter((c) => c.field === 'isActiveStr')[0].templateRef = this.sticker
    })
  }

  onOrgIdChange(orgId: number) {
    if (!!this.outerParam$.value) {
      const newOuterParam = JSON.parse(JSON.stringify(this.outerParam$.value));
      newOuterParam['orgId'] = orgId;
      this.outerParam$.next(newOuterParam);
    } else {
      this.outerParam$.next({ orgId });
    }
  }
}
