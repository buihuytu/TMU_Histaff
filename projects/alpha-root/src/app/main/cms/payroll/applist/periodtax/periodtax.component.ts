import { Component, ViewEncapsulation, AfterViewInit, TemplateRef, ViewChild } from '@angular/core';
import { EnumTranslateKey, api } from 'alpha-global-constants';
import { BaseComponent, ICorePageListApiDefinition, ICorePageListCRUD, ICoreTableColumnItem, EnumCoreTablePipeType, ICorePageListEditRouting, MultiLanguageService } from 'ngx-histaff-alpha';
import { BehaviorSubject } from 'rxjs';


@Component({
  selector: 'app-periodtax',
  templateUrl: './periodtax.component.html',
  styleUrls: ['./periodtax.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class PeriodTaxComponent extends BaseComponent implements AfterViewInit  {
  @ViewChild('sticker') sticker!: TemplateRef<any>;

  /* START: Local filter params */
  orgId!: number;
  /* END: Local filter params */

  /*
  Properties being passed to core-page-list
  */

  //list!: any[]
  outerParam$ = new BehaviorSubject<any>(null);

  title = EnumTranslateKey.UI_COMPONENT_TITLE_PA_PERIOD_TAX;

  apiDefinition: ICorePageListApiDefinition = {
    queryListRelativePath: api.PA_PERIOD_TAX_QUERY_LIST
  };

  // USER TABLE IS THE ONLY TABLE WHICH HAS ID OF TYPE STRING. ALL THE OTHERS MUST HAVE ID OF TYPE NUMBER (bigint/long)
  crud: ICorePageListCRUD = {
    deleteIds: api.PA_PERIOD_TAX_DELETE_IDS,
    toggleActiveIds: api.PA_PERIOD_TAX_TOGGLE_ACTIVE_IDS,
  };

  columns: ICoreTableColumnItem[] = [
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_PA_PERIOD_TAX_ID,
      field: 'id',
      hidden: true,
      type: 'string',
      align: 'center',
      width: 30,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_PA_PERIOD_TAX_STATUS,
      field: 'status',
      type: 'string',
      align: 'center',
      width: 130,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_PA_PERIOD_TAX_YEAR,
      field: 'year',
      type: 'string',
      align: 'left',
      width: 200,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_PA_PERIOD_TAX_MONTH,
      field: 'taxMonth',
      type: 'string',
      align: 'left',
      width: 300,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_PA_PERIOD_TAX_DATE,
      field: 'taxDate',
      type: 'string',
      align: 'left',
      width: 200,
      pipe:EnumCoreTablePipeType.DATE,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_PA_PERIOD_TAX_FROM_DATE,
      field: 'calculateTaxFromDate',
      type: 'string',
      align: 'left',
      width: 200,
      pipe:EnumCoreTablePipeType.DATE,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_PA_PERIOD_TAX_TO_DATE,
      field: 'calculateTaxToDate',
      type: 'string',
      align: 'left',
      width: 200,
      pipe:EnumCoreTablePipeType.DATE,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_PA_PERIOD_TAX_STATUS,
      field: 'status',
      type: 'string',
      align: 'left',
      width: 200,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_PA_PERIOD_TAX_NOTE,
      field: 'note',
      type: 'string',
      align: 'left',
      width: 300,
    },
  ];

  editRoute: ICorePageListEditRouting = {
    auxiliary: 'popupAux',
  };
  /* End Properties being passed to core-page-type-a */

  constructor(public override mls: MultiLanguageService) {
    super(mls);
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.columns.filter((c) => c.field === 'status')[0].templateRef = this.sticker

    })
  }

}
