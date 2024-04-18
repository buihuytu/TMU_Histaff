import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EnumTranslateKey, api } from 'alpha-global-constants';
import { AlertService, AppService, BaseComponent, CoreButtonGroupVnsComponent, CorePageListComponent, CorePageListService, CoreTableComponent, EnumCoreButtonVNSCode, EnumCoreTablePipeType, EnumSortDirection, FullscreenModalLoaderComponent, ICoreButtonVNS, ICorePageListApiDefinition, ICoreTableColumnItem, IFormatedResponse, ISortItem, IXlsxImportObject, MultiLanguageService, TranslatePipe } from 'ngx-histaff-alpha';

@Component({
  selector: 'app-hu-personnel-planing-import',
  standalone: true,
  imports: [
    CommonModule,
    CorePageListComponent,
    CoreButtonGroupVnsComponent,
    FullscreenModalLoaderComponent,
    TranslatePipe
  ],
  templateUrl: './hu-personnel-planing-import.component.html',
  styleUrl: './hu-personnel-planing-import.component.scss'
})
export class HuPersonnelPlaningImportComponent extends BaseComponent implements OnInit {


  captionCode: EnumTranslateKey = EnumTranslateKey.UI_COMPONENT_TITLE_HU_PERSONNEL_IMPORT
  callerListInstance!: number;

  shownButtonItems: EnumCoreButtonVNSCode[] = [
    EnumCoreButtonVNSCode.NONE_HEADER_SAVE,
    EnumCoreButtonVNSCode.NONE_HEADER_CANCEL
  ]

  apiDefinition: ICorePageListApiDefinition = {
    queryListRelativePath: api.XLSX_HU_PERSONNEL_PLANING_IMPORT_QUERY_LIST,
  }

  importPreviewOuterParam!: IXlsxImportObject;
  loading!: boolean;

  outerSort: ISortItem[] = [
    {
      field: 'xlsxRow',
      sortDirection: EnumSortDirection.ASC
    }
  ];
  columns: ICoreTableColumnItem[] = [
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_COMMON_ID,
      field: 'id',
      type: 'number',
      align: 'right',
      hidden: true,
      width: 100,
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
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_HU_PERSONNEL_PLANING_PLAN_NUMBER,
      field: 'planNumberStr',
      type: 'string',
      align: 'left',
      width: 300
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_HU_PERSONNEL_PLANING_NEW_RECRUIT,
      field: 'newRecruitStr',
      type: 'string',
      align: 'left',
      width: 300
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_HU_PERSONNEL_PLANING_TRANFER_NUM,
      field: 'tranferNumStr',
      type: 'string',
      align: 'left',
      width: 300
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_HU_PERSONNEL_PLANING_RETITEMENT,
      field: 'retirementStr',
      type: 'string',
      align: 'left',
      width: 300
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_HU_PERSONNEL_PLANING_PLAN,
      field: 'planProPosed',
      type: 'string',
      align: 'left',
      width: 300
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_HU_PERSONNEL_PLANING_DESCRIPTION,
      field: 'description',
      type: 'string',
      align: 'left',
      width: 300
    },
  ]

  constructor(
    public override mls: MultiLanguageService,
    private router: Router,
    private route: ActivatedRoute,
    private corePageListService: CorePageListService,
    private appService: AppService,
  ) {
    super(mls);
    const navigation = this.router.getCurrentNavigation();

    this.importPreviewOuterParam = navigation?.extras?.state!['importPreviewOuterParam'];

    this.callerListInstance = Number(
      this.route.snapshot.paramMap.get('listInstance')!
    );

  }
  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  onCoreButtonGroupVNSClick(e: ICoreButtonVNS) {
    if (e.code === EnumCoreButtonVNSCode.NONE_HEADER_CANCEL) {
      this.onCancel();
    } else if (e.code === EnumCoreButtonVNSCode.NONE_HEADER_SAVE) {

      this.loading = true;

      this.subscriptions.push(
        this.appService.post(api.XLSX_HU_PERSONNEL_PLANING_IMPORT_SAVE, this.importPreviewOuterParam).subscribe(x => {
          this.loading = false;
          if (x.ok && x.status === 200) {
            const body: IFormatedResponse = x.body;
            if (body.statusCode === 200) {
              const instanceFilter = this.corePageListService.instances.filter(x => x.instanceNumber === this.callerListInstance)
              if (!!instanceFilter.length) {
                instanceFilter[0].reloadFlag$.next(!instanceFilter[0].reloadFlag$.value)
              }
              this.onCancel();
            } else {
              // this.alertService.info(this.mls.trans(body.messageCode, this.lang), alertOptions)
            }
          } else {
            console.log("Save failed", x)
          }
        })

      )
    }
  }
}
