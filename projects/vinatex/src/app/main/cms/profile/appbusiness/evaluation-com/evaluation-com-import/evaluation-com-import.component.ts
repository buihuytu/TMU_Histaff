import { Component, OnInit, isDevMode } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { EnumTranslateKey, api } from 'alpha-global-constants';
import { BaseComponent, ICorePageListApiDefinition, ISortItem, EnumSortDirection, EnumCoreButtonVNSCode, IXlsxImportObject, ICoreTableColumnItem, MultiLanguageService, CorePageListService, AlertService, AppService, noneAutoClosedAlertOptions, ICoreButtonVNS, IFormatedResponse } from "ngx-histaff-alpha";

@Component({
  selector: 'app-evaluation-com-import',
  templateUrl: './evaluation-com-import.component.html',
  styleUrls: ['./evaluation-com-import.component.scss']
})
export class EvaluationComImportComponent extends BaseComponent implements OnInit {

  loading!: boolean;
  captionCode: EnumTranslateKey = EnumTranslateKey.UI_COMPONENT_TITLE_HU_EVALUATE_IMPORT
  apiDefinition: ICorePageListApiDefinition = {
    queryListRelativePath: api.XLSX_HU_EVALUATION_COM_IMPORT_QUERY_LIST,
  }
  outerSort: ISortItem[] = [
    {
      field: 'xlsxRow',
      sortDirection: EnumSortDirection.ASC
    }
  ];
  shownButtonItems: EnumCoreButtonVNSCode[] = [
    EnumCoreButtonVNSCode.NONE_HEADER_SAVE,
    EnumCoreButtonVNSCode.NONE_HEADER_CANCEL
  ]
  callerListInstance!: number;
  importPreviewOuterParam!: IXlsxImportObject;
  columns: ICoreTableColumnItem[] = [
    {
      // đây là trường năm đánh giá
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_HU_EVALUATION_COM_YEAR,
      field: 'yearEvaluationStr',
      type: 'string',
      align: 'left',
      width: 200,
    },
    {
      // đây là trường mã nhân viên
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_HU_EVALUATION_COM_CODE,
      field: 'employeeCode',
      type: 'string',
      align: 'left',
      width: 200,
    },
    {
      // đây là trường id bị ẩn
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_HU_EVALUATION_COM_ID,
      field: 'id',
      type: 'number',
      align: 'right',
      hidden: true,
      width: 1,
    },
    {
      // đây là trường họ và tên
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_HU_EVALUATION_COM_FULL_NAME,
      field: 'fullName',
      type: 'string',
      align: 'left',
      width: 200,
    },
    {
      // đây là trường chi bộ sinh hoạt "Living Area"

      // Thắng làm chi bộ sinh hoạt là "LivingCell"
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_HU_EVALUATION_COM_LIVING_AREA,
      field: 'livingCell',
      type: 'string',
      align: 'left',
      width: 200,
    },
    {
      // đây là trường chức vụ đảng "Position Communist"

      // Thắng đặt tên chức vụ đảng là "MemberPosition"
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_HU_EVALUATION_COM_POSITION_COMMUNIST,
      field: 'memberPosition',
      type: 'string',
      align: 'left',
      width: 200,
    },
    {
      // đây là trường xếp loại đánh giá "Evaluation Category"
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_HU_EVALUATION_COM_EVALUATION_CATEGORY,
      field: 'evaluationCategory',
      type: 'string',
      align: 'left',
      width: 250,
    },
    {
      // đây là trường điểm đánh giá "Point Evaluation"
      caption: EnumTranslateKey.UI_COMPONENT_LABEL_HU_EVALUATION_COM_POINT_EVALUATION,
      field: 'pointEvaluationStr',
      type: 'string',
      align: 'center',
      width: 200,
    },
  ]
  constructor(
    public override mls: MultiLanguageService,
    private router: Router,
    private route: ActivatedRoute,
    private corePageListService: CorePageListService,
    private alertService: AlertService,
    private appService: AppService,
  ) {
    super(mls);
    const navigation = this.router.getCurrentNavigation();

    this.importPreviewOuterParam = navigation?.extras?.state!['importPreviewOuterParam'];

    this.callerListInstance = Number(
      this.route.snapshot.paramMap.get('listInstance')!
    );

    const instancesFilter = this.corePageListService.instances.filter(
      (x) => x.instanceNumber === this.callerListInstance
    );
    if (!!instancesFilter.length) {
      const instance = instancesFilter[0];
    } else {
      if (isDevMode()) {
        this.alertService.info(`CorePageList instances do not include number ${this.callerListInstance}`, noneAutoClosedAlertOptions)
      }
    }
  }

  onCoreButtonGroupVNSClick(e: ICoreButtonVNS) {
    if (e.code === EnumCoreButtonVNSCode.NONE_HEADER_CANCEL) {
      this.onCancel();
    } else if (e.code === EnumCoreButtonVNSCode.NONE_HEADER_SAVE) {

      this.loading = true;

      this.subscriptions.push(
        this.appService.post(api.XLSX_HU_EVALUATION_COM_IMPORT_SAVE, this.importPreviewOuterParam).subscribe(x => {
          this.loading = false;
          if (x.ok && x.status === 200) {
            const body: IFormatedResponse = x.body;
            if (body.statusCode === 200) {
              const instanceFilter = this.corePageListService.instances.filter(x => x.instanceNumber === this.callerListInstance)
              if (!!instanceFilter.length) {
                instanceFilter[0].reloadFlag$.next(!instanceFilter[0].reloadFlag$.value)
              }
              this.onCancel();
            }
          } else {
            console.log("Save failed", x)
          }
        })

      )
    }
  }
  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}
