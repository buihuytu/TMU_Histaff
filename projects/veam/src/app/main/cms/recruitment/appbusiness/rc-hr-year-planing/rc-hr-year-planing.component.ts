import { AfterViewInit, Component, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EnumTranslateKey, api } from 'alpha-global-constants';
import { BaseComponent, ICorePageListApiDefinition, ICorePageListCRUD, ICoreTableColumnItem, EnumCoreTablePipeType, ICorePageListEditRouting, MultiLanguageService } from 'ngx-histaff-alpha';


@Component({
  selector: 'app-rc-hr-year-planing',
  templateUrl: './rc-hr-year-planing.component.html',
  styleUrl: './rc-hr-year-planing.component.scss'
})
export class RcHrYearPlaningComponent extends BaseComponent implements AfterViewInit {

  @ViewChild('detail') detail!: TemplateRef<any>;

  title = EnumTranslateKey.UI_COMPONENT_TITLE_RC_YEAR_PLAINING

  apiDefinition: ICorePageListApiDefinition = {
    queryListRelativePath: api.RC_YEAR_PLANING_QUERY_LIST,
  }

  crud: ICorePageListCRUD = {
    deleteIds: api.RC_YEAR_PLANING_DELETE_IDS,
  }
  corePageListInstanceNumber: any;

  columns: ICoreTableColumnItem[] = [
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_TR_PLAN_YEAR,
      field: 'id',
      type: 'string',
      align: 'left',
      width: 0,
      hidden: true,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_TR_PLAN_YEAR,
      field: 'year',
      type: 'string',
      align: 'left',
      width: 150,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_RC_YEAR_PLAINING_VERSION,
      field: 'version',
      type: 'string',
      align: 'left',
      width: 200,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_HU_COMMEND_EFFECT_DATE,
      field: 'effectDate',
      type: 'string',
      align: 'left',
      width: 220,
      pipe: EnumCoreTablePipeType.DATE
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_TR_PLAN_NOTE,
      field: 'note',
      type: 'string',
      align: 'left',
      width: 230,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_RC_YEAR_PLAINING_DETAILED_BOUNDARIES,
      field: 'detail',
      type: 'string',
      align: 'left',
      width: 200,
    },
  ]
  editRoute: ICorePageListEditRouting = {
    auxiliary: 'popupAux',
  };
  constructor(
    public override mls: MultiLanguageService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    super(mls);
    this.corePageListInstanceNumber = new Date().getTime();
  }

  ngAfterViewInit(): void {
    this.columns.filter((c) => c.field === 'detail')[0].templateRef = this.detail;
  }

  onHandleClickDetail(e: any) {
    this.router.navigate(
      [btoa(e.id), { listInstance: this.corePageListInstanceNumber }],
      {
        relativeTo: this.route, state: { selectedData: e.id }
      }
    );
  }
  corePageHeaderButtonClick(e: any) {
    console.log(e)
  }

  rowDoubleClick(e: any) {
    console.log(e)
  }
}