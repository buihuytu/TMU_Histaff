import { Component, ViewEncapsulation, AfterViewInit, ViewChild, TemplateRef } from "@angular/core";
import { FormGroup } from "@angular/forms";
import { EnumTranslateKey, api } from 'alpha-global-constants';
import { BaseComponent, EnumCoreOrgTreeaAccessorMode, ICorePageListApiDefinition, ICorePageListCRUD, ICoreTableColumnItem, EnumCoreTablePipeType, ICorePageListEditRouting, MultiLanguageService, AlertService, OrganizationService, AppService } from "ngx-histaff-alpha";
import { Subscription } from "rxjs";
import { SalaryPeriodService } from "./salaryperiod.service";


@Component({
  selector: 'cms-app-salaryperiod',
  templateUrl: './salaryperiod.component.html',
  styleUrls: ['./salaryperiod.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SalaryPeriodComponent
  extends BaseComponent
  implements AfterViewInit {
  @ViewChild('sticker') sticker!: TemplateRef<any>;

  title = EnumTranslateKey.UI_COMPONENT_TITLE_SALARY_PERIOD;

  subsctiptions: Subscription[] = [];
  //list!: any[]
  form!: FormGroup;
  accessorMode: EnumCoreOrgTreeaAccessorMode =
    EnumCoreOrgTreeaAccessorMode.CHECKED;

  apiDefinition: ICorePageListApiDefinition = {
    queryListRelativePath: api.AT_SALARY_PERIOD_QUERY_LIST,
  };

  crud: ICorePageListCRUD = {
    deleteIds: api.AT_SALARY_PERIOD_DELETE_IDS,
    toggleActiveIds: api.AT_SALARY_PERIOD_TOGGLE_ACTIVE_IDS
  };

  columns: ICoreTableColumnItem[] = [
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_COMMON_ID,
      field: 'id',
      hidden: true,
      type: 'number',
      align: 'left',
      width: 200,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_SALARY_PERIOD_IS_ACTIVE,
      field: 'actflg',
      type: 'string',
      align: 'center',
      width: 130,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_SALARY_PERIOD_YEAR,
      field: 'year',
      type: 'string',
      align: 'left',
      width: 200,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_SALARY_PERIOD_MONTH,
      field: 'month',
      type: 'string',
      align: 'left',
      width: 200,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_SALARY_PERIOD_NAME,
      field: 'name',
      type: 'string',
      align: 'left',
      width: 200,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_SALARY_PERIOD_DATE_START,
      field: 'startDate',
      type: 'string',
      align: 'left',
      width: 200,
      pipe: EnumCoreTablePipeType.DATE,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_SALARY_PERIOD_DATE_END,
      field: 'endDate',
      type: 'string',
      align: 'left',
      width: 200,
      pipe: EnumCoreTablePipeType.DATE,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_SALARY_PERIOD_IS_ACTIVE,
      field: 'actflg',
      type: 'string',
      align: 'left',
      width: 200,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_SALARY_PERIOD_NOTE,
      field: 'note',
      type: 'string',
      align: 'left',
      width: 200,
    },
  ];

  checkedOrgIds!: number[];

  editRoute: ICorePageListEditRouting = {
    auxiliary: 'popupAux',
  };
  /* End Properties being passed to core-page-type-a */

  constructor(
    public override mls: MultiLanguageService,
    private salaryPeriodService: SalaryPeriodService,
    private alertService: AlertService,
    private organizationService: OrganizationService,
    private appService: AppService

  ) {
    super(mls);
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.checkedOrgIds = [];
      const stickerFilter = this.columns.filter(c => c.field === 'actflg');
      if (!!stickerFilter.length) stickerFilter[0].templateRef = this.sticker;
    })
  }

  onRowClick(e: any) {

    this.checkedOrgIds = e.orgIds;

    /*
    if (e) {
      
      this.subsctiptions.push(
        this.appService.get(api.AT_SALARY_PERIOD_READ + `?id=${e.id}`)
          .subscribe(x => {
            if (x.ok && x.status === 200) {
              const body: IFormatedResponse = x.body;
              if (body.statusCode === 200) {
                this.checkedOrgIds = body.innerBody.orgIds;
                console.log(this.checkedOrgIds);
                
              }
            }
          })
      )!;
      
    }
    */

  }
}
