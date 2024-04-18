import {
  Component,
  OnInit,
  ViewChild,
  ViewEncapsulation,
  Inject,
  AfterViewInit,
  TemplateRef,
} from '@angular/core';
import { BaseComponent, ICoreListOption, IFilterOperator, EnumFilterOperator, ICorePageListApiDefinition,ICorePageListCRUD, ICoreTableColumnItem, EnumCoreTablePipeType, ICorePageListEditRouting, MultiLanguageService, ISysGroup } from 'ngx-histaff-alpha';
import { BehaviorSubject, Subject, Subscription } from 'rxjs';
import { SysOrtherlistEditService } from '../sys-otherlist-edit/sys-ortherlist.edit.service';
import { EnumTranslateKey, api } from 'alpha-global-constants';

@Component({
  selector: 'app-sys-otherlist',
  templateUrl: './sys-otherlist.component.html',
  styleUrls: ['./sys-otherlist.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SysOtherlistComponent
  extends BaseComponent
  implements AfterViewInit, OnInit
{
  @ViewChild('sticker') sticker!: TemplateRef<any>;

  override subscriptions: Subscription[] = [];
  otherListOption: ICoreListOption[] = [];
  typeId!: number;
  outerFilterOperators: IFilterOperator[] = [
    {
      field: 'typeId',
      operator: EnumFilterOperator.EQUAL,
    },
  ];

  outerParam$ = new BehaviorSubject<any>(null);
  title = EnumTranslateKey.UI_COMPONENT_TITLE_ORTHERLIST;

  apiDefinition: ICorePageListApiDefinition = {
    queryListRelativePath: api.SYS_OTHERLIST_QUERY_LIST,
  };

  crud: ICorePageListCRUD = {
    deleteIds: api.SYS_OTHERLIST_DELETE_IDS,
    toggleActiveIds: api.SYS_OTHER_LIST_ACTIVE
  };

  columns: ICoreTableColumnItem[] = [
    {
      caption: 'ContractType.ID',
      field: 'id',
      hidden: true,
      type: 'number',
      align: 'left',
      width: 200,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_ORTHERLIST_IS_ACTIVE,
      field: 'status',
      type: 'string',
      align: 'center',
      width: 130,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_ORTHERLIST_CODE,
      field: 'code',
      type: 'string',
      align: 'left',
      width: 160,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_ORTHERLIST_NAME,
      field: 'name',
      type: 'string',
      align: 'left',
      width: 300,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_ORTHERLIST_TYPENAME,
      field: 'typeName',
      type: 'string',
      align: 'left',
      width: 250,
    },
    {
      caption:
        EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_ORTHERLIST_EFFECTIVE_DATE,
      field: 'effectiveDate',
      type: 'date',
      align: 'left',
      width: 250,
      pipe: EnumCoreTablePipeType.DATE
    },
    {
      caption:
        EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_ORTHERLIST_EXPIRATION_DATE,
      field: 'expirationDate',
      type: 'date',
      align: 'left',
      width: 250,
      pipe: EnumCoreTablePipeType.DATE
    },
    
    {
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_OTHERLIST_NOTE,
      field: 'note',
      type: 'string',
      align: 'left',
      width: 250,
    },
    
  ];

  editRoute: ICorePageListEditRouting = {
    auxiliary: 'popupAux',
  };
  /* End Properties being passed to core-page-type-a */

  constructor(
    public override mls: MultiLanguageService,
    private sysOtherListService: SysOrtherlistEditService
  ) {
    super(mls);
  }
  ngAfterViewInit() {
    setTimeout(() => {
      const stickerFilter = this.columns.filter(c => c.field === 'status');
      if (!!stickerFilter.length) stickerFilter[0].templateRef = this.sticker;
    })
  }
  override ngOnInit(): void {
    this.subscriptions.push(
      this.sysOtherListService.GetAllGroupOtherListType().subscribe((x) => {
        if (x.ok && x.status === 200) {
          const newGroupOptions: ICoreListOption[] = [];
          (x.body.innerBody as ISysGroup[]).map((x) => {
            newGroupOptions.push({
              value: x.id,
              text: x.name,
            });
          });
          this.otherListOption = newGroupOptions;
        }
      })
    );
  }

  onOtherListTypeChange(typeId: number) {
    if (!!this.outerParam$.value) {
      const newOuterFilterParam = JSON.parse(
        JSON.stringify(this.outerParam$.value)
      );
      newOuterFilterParam['typeId'] = typeId;
      this.outerParam$.next(newOuterFilterParam);
      this.subscriptions.push();
    } else {
      this.outerParam$.next({ typeId });
    }

    this.sysOtherListService.typeId = typeId;
  }
}
