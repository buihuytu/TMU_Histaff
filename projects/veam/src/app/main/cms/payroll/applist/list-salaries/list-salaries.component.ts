import { Component, ViewEncapsulation, OnInit, OnDestroy, AfterViewInit, TemplateRef, ViewChild } from '@angular/core';
import { BehaviorSubject, Subscription, switchMap } from 'rxjs';
import { EnumTranslateKey, api } from 'alpha-global-constants';
import { ListSalariesService } from './list-salaries.service';
import { ICoreDropdownOption, ICorePageListApiDefinition, EnumCoreButtonVNSCode, ICorePageListCRUD, ICoreTableColumnItem, EnumCoreTablePipeType, ICorePageListEditRouting, MultiLanguageService, AppService, ResponseService, AlertService, IFormatedResponse, ICoreButtonVNS, ISortItem, EnumSortDirection } from 'ngx-histaff-alpha';
import { ListSalariesEditService } from './list-salaries-edit/list-salaries-edit.service';

@Component({
  selector: 'app-list-salaries',
  templateUrl: './list-salaries.component.html',
  styleUrls: ['./list-salaries.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ListSalariesComponent implements OnInit, OnDestroy, AfterViewInit {

  /*
  Properties being passed to core-page-list
  */
  checkboxTemplate!: TemplateRef<any>;
  subscriptions: Subscription[] = [];
  idSymbol!: number;
  objSalId!: number;
  shownFrom!: string;
  onObjectSal!: number;

  @ViewChild('isFormula') isFormula!: TemplateRef<any>;
  @ViewChild('isSumFormula') isSumFormula!: TemplateRef<any>;
  @ViewChild('isPayback') isPayback!: TemplateRef<any>;
  @ViewChild('isVisible') isVisible!: TemplateRef<any>;
  @ViewChild('isImport') isImport!: TemplateRef<any>;
  @ViewChild('isQlTypeTn') isQlTypeTn!: TemplateRef<any>;
  @ViewChild('sticker') sticker!: TemplateRef<any>;


  objectSalOptions$ = new BehaviorSubject<ICoreDropdownOption[]>([]);
  objectSalGetByIdObject$ = new BehaviorSubject<any>(null);
  objectSalGetByIdApi = api.PA_LISTSALARIES_READ_OBJ_SAL;

  outerParam$ = new BehaviorSubject<any>(null);

  title = EnumTranslateKey.UI_COMPONENT_TITLE_PA_LISTSALARIES;
  listSalariesInclusionFor: string = 'objSalId';
  listSalariesInclusionForLabelKey: EnumTranslateKey =
    EnumTranslateKey.UI_COMPONENT_TITLE_PA_LISTSALARIES_OBJSAL_NAME;
  listSalariesOptionsApi: api = api.PA_LISTSALARIES_READ_OBJ_SAL;
  apiDefinition: ICorePageListApiDefinition = {
    queryListRelativePath: api.PA_LISTSALARIES_QUERY_LIST,
  };

  loading!: boolean;
  innerBody!: any;

  buttonItems: EnumCoreButtonVNSCode[] = [EnumCoreButtonVNSCode.NONE_HEADER_SEARCH];

  crud: ICorePageListCRUD = {
    deleteIds: api.PA_LISTSALARIES_DELETE_IDS,
  };

  // Sắp xếp lưới hiển thị theo cấp chức danh
  outerSort: ISortItem[] = [
    {
      field: "colIndexIS_FORMULA",
      sortDirection: EnumSortDirection.ASC
    }
  ]

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
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_PA_LISTSALARIES_STATUS, //trang thai
      field: 'status',
      type: 'string',
      align: 'center',
      width: 130,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_PA_LISTSALARIES_CODE, //ma danh muc luong
      field: 'codeSalName',
      type: 'string',
      align: 'left',
      width: 150,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_PA_LISTSALARIES_NAME, //ten ket cau
      field: 'name',
      type: 'string',
      align: 'left',
      width: 200,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_PA_LISTSALARIES_OBJSAL_NAME, //nhom cong thuc/doi tuong luong
      field: 'objSalName',
      type: 'string',
      align: 'left',
      width: 200,
    },
    {
      caption:
        EnumTranslateKey.UI_COMPONENT_TITLE_PA_LISTSALARIES_GROUP_TYPE_NAME, //nhom danh muc luong
      field: 'groupTypeName',
      type: 'string',
      align: 'left',
      width: 200,
    },
    {
      caption:
        EnumTranslateKey.UI_COMPONENT_TITLE_PA_LISTSALARIES_EFFECTIVE_DATE, //ngay hieu luc
      field: 'effectiveDate',
      type: 'date',
      pipe: EnumCoreTablePipeType.DATE,
      readonly: true,
      align: 'left',
      width: 200,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_PA_LISTSALARIES_COL_INDEX, //thu tu
      field: 'colIndex',
      type: 'number',
      align: 'left',
      width: 150,
    },
    
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_PA_LISTSALARIES_IS_FORMULA, //conG thuc theo bien dong
      field: 'isFormula',
      type: 'bool',
      align: 'center',
      pipe: EnumCoreTablePipeType.BOOLEAN_TO_TRUE_FALSE,
      templateRef: this.checkboxTemplate,
      readonly: true,
      width: 200,
    },
    {
      caption:
        EnumTranslateKey.UI_COMPONENT_TITLE_PA_LISTSALARIES_IS_SUM_FORMULA, //tong cong thuc theo bien dong
      field: 'isSumFormula',
      type: 'bool',
      align: 'center',
      pipe: EnumCoreTablePipeType.BOOLEAN_TO_TRUE_FALSE,
      templateRef: this.checkboxTemplate,
      readonly: true,
      width: 200,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_PA_LISTSALARIES_IS_PAYBACK, //payback
      field: 'isPayback',
      type: 'bool',
      align: 'center',
      pipe: EnumCoreTablePipeType.BOOLEAN_TO_TRUE_FALSE,
      templateRef: this.checkboxTemplate,
      readonly: true,
      width: 150,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_PA_LISTSALARIES_IS_VISIBLE, //hien thi trong bang luong
      field: 'isVisible',
      type: 'bool',
      align: 'center',
      pipe: EnumCoreTablePipeType.BOOLEAN_TO_TRUE_FALSE,
      templateRef: this.checkboxTemplate,
      readonly: true,
      width: 150,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_PA_LISTSALARIES_IS_IMPORT, //du lieu import
      field: 'isImport',
      type: 'bool',
      align: 'center',
      pipe: EnumCoreTablePipeType.BOOLEAN_TO_TRUE_FALSE,
      templateRef: this.checkboxTemplate,
      readonly: true,
      width: 150,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_PA_LISTSALARIES_IS_QL, //QL
      field: 'isQlTypeTn',
      type: 'bool',
      align: 'center',
      pipe: EnumCoreTablePipeType.BOOLEAN_TO_TRUE_FALSE,
      readonly: true,
      templateRef: this.checkboxTemplate,
      width: 150,
    },
  ];

  //----///
  staticColumns = JSON.parse(JSON.stringify(this.columns));

  editRoute: ICorePageListEditRouting = {
    auxiliary: 'popupAux',
  };
  constructor(
    public mls: MultiLanguageService,
    private appService: AppService, // CoreService is DEPRECATED!!!,
    private responseService: ResponseService,
    private alertService: AlertService,
    private listSalariesEditService: ListSalariesEditService,
    private listSalariestService: ListSalariesService,

  ) {
    // this.listSalariesEditService.currentobjectId.subscribe(
    //   (id) => (this.objSalId = id)
    // );
    this.objSalId = this.listSalariestService.objectId;
    this.shownFrom = "name"
  }
  ngAfterViewInit(): void {
    setTimeout(() => {
      this.columns.filter((c) => c.field === 'isFormula')[0].templateRef =
        this.isFormula;
      this.columns.filter((c) => c.field === 'isSumFormula')[0].templateRef =
        this.isSumFormula;
      this.columns.filter((c) => c.field === 'isPayback')[0].templateRef =
        this.isPayback;
      this.columns.filter((c) => c.field === 'isVisible')[0].templateRef =
        this.isVisible;
      this.columns.filter((c) => c.field === 'isImport')[0].templateRef =
        this.isImport;
      this.columns.filter((c) => c.field === 'isQlTypeTn')[0].templateRef =
        this.isQlTypeTn;
      this.columns.filter((c) => c.field === 'status')[0].templateRef = this.sticker


      this.subscriptions.push(
        this.appService.get(api.PA_LISTSALARIES_READ_OBJ_SAL).subscribe((x) => {
          if (x.ok && x.status === 200) {
            const body: IFormatedResponse = x.body;
            if (body.statusCode === 200) {
              const options: { value: number; text: string }[] = [];
              body.innerBody.map((get: any) => {
                options.push({
                  value: get.id,
                  text: get.name,
                });
              });
              this.objectSalOptions$.next(options);
              // debugger
              // this.onObjectSal = options[0].value;
            } else {
              //this.responseService.resolve(body);
            }
          } else {
            //this.alertService.error(JSON.stringify(x), alertOptions);
          }
        }),

      );
      this.onObjectSal = this.listSalariestService.objectId === undefined ? 1526 : this.listSalariestService.objectId;
      this.outerParam$.next({
        objSalId: this.onObjectSal,
      })
      this.objSalId = this.onObjectSal;
    });
  }

  ngOnInit(): void {
    // this.outerParam$.next({
    //   objSalId: this.onObjectSal,
    // })
  }

  ngOnDestroy(): void { }

  onObjectSalChange(objectId: number) {
    this.objSalId = objectId;
    this.listSalariestService.objectId = objectId;
  }

  onButtonClick(e: ICoreButtonVNS) {
    if (e.code === EnumCoreButtonVNSCode.NONE_HEADER_SEARCH) {

      this.outerParam$.next({
        objSalId: this.objSalId,
      })

    }
  }
}
