import { Component, AfterViewInit, isDevMode } from "@angular/core";
import { FormGroup, AbstractControl } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { EnumTranslateKey, api } from 'alpha-global-constants';
import { BaseComponent, MultiLanguageService, AppService, CoreFormService, ResponseService, AlertService, UrlService, CorePageListService, LayoutService, IFormatedResponse, ICoreListOption, ISysGroup, ICorePageListApiDefinition, ICoreTableColumnItem, ICorePageListEditRouting, EnumCoreButtonVNSCode, ICoreFormSection, EnumFormBaseContolType, IDynamicFormEmitOnFormCreated, ICoreButtonVNS, alertOptions } from "ngx-histaff-alpha";
import { Subscription, BehaviorSubject } from "rxjs";
import { PayrollFormulaService } from "../payrollformula.service";

@Component({
  selector: "cms-attendance-payrollformula-edit",
  templateUrl: "./payrollformula-edit.component.html",
  styleUrls: ["./payrollformula-edit.component.scss"],
})
export class PayrollFormulaEditComponent extends BaseComponent implements AfterViewInit {


  title: EnumTranslateKey = EnumTranslateKey.UI_COMPONENT_TITLE_SYS_PA_FORMULA;
  errorRequired = EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED;
  tableHeight!: number;
  typeName!: string;
  objSalary!: number;
  titleEdit!: EnumTranslateKey;
  formulaId!: number
  loading: boolean = false;
  colName!: string;
  subsctiptions: Subscription[] = [];
  listInstance!: number;
  isDevMode!: boolean;
  payLoad = '';
  validatorOverview: any;
  formulaOrders!: number;
  displayInputOrder: boolean = false;
  showRequiredOrders: boolean = false;
  disabledTextArea: boolean = true;

  constructor(
    public override mls: MultiLanguageService,
    private appService: AppService, // CoreService is DEPRECATED!!!,
    private coreFormService: CoreFormService,
    private payrollFormulaService: PayrollFormulaService,
    private responseService: ResponseService,
    private alertService: AlertService,
    private urlService: UrlService,
    private router: Router,
    private route: ActivatedRoute,
    private corePageListService: CorePageListService,
    private layoutService: LayoutService
  ) {
    super(mls)
    // get year + salary period from create/edit page
    //this.payrollFormulaService.currentObjSalary.subscribe(id => this.objSalary = id);
    //console.log(this.objSalary);
    this.isDevMode = isDevMode();
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.subscriptions.push(
        this.layoutService.contentContainerHeight$.subscribe(x => {
          this.tableHeight = x - 280;
        })
      )

    })
    this.subscriptions.push(
      this.route.params.subscribe(x => {
        console.log("this.route.params.subscribe", x)
        this.objSalary = Number(atob(x['id']));
        
      })
    )

    this.outerParam$.next({
      salaryTypeId: this.objSalary,
    })

    this.subscriptions.push(
      this.appService.post(api.PA_LISTSALARIES_GET_NAME_CODE, { objSalId: this.objSalary }).subscribe((x) => {
        if (x.ok && x.status === 200) {
          const body: IFormatedResponse = x.body;
          if (body.statusCode === 200) {

            this.typeList = x.body.innerBody;
            const newGroupOptions: ICoreListOption[] = [];

            (x.body.innerBody as ISysGroup[]).map((x) => {
              newGroupOptions.push({
                value: x.id,
                text: x.name,
              });
            });
            this.listSalaries = newGroupOptions;
          }
        }
      })
    );
  }

  // LEFT
  apiDefinitionLeft: ICorePageListApiDefinition = {
    queryListRelativePath: api.SYS_PA_FORMULA_QUERY_LIST,
  };
  outerParam$ = new BehaviorSubject<any>(null);


  columnsLeft: ICoreTableColumnItem[] = [
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_COMMON_ID,
      field: 'id',
      type: 'string',
      align: 'left',
      width: 100,
      hidden: true,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SALARY_TYPE_STT,
      field: 'orders',
      type: 'string',
      align: 'left',
      width: 100,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SALARY_TYPE_CODE,
      field: 'colName',
      type: 'string',
      align: 'left',
      width: 200
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SALARY_TYPE_NAME,
      field: 'objSalary',
      type: 'string',
      align: 'left',
      width: 500,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SALARY_TYPE_NAME,
      field: 'formula',
      type: 'string',
      align: 'left',
      width: 500,
    },
  ]

  editRoute: ICorePageListEditRouting = {
    auxiliary: 'popupAux',
  };



  // CENTER
  captionCode!: EnumTranslateKey;
  buttonItems: EnumCoreButtonVNSCode[] = [
    EnumCoreButtonVNSCode.HEADER_CREATE,
    EnumCoreButtonVNSCode.HEADER_ACTIVATE
  ];

  formulaText: string = "";
  showTitle: boolean = false;

  submitText!: EnumTranslateKey;
  showCaptionButton: boolean = true;
  leftInputSections!: ICoreFormSection[];
  leftInputSectionsFlexSize!: number;

  form!: FormGroup;


  sections: ICoreFormSection[] =
    [
      {
        rows: [
          [
            {
              flexSize: 0,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_COMMON_ID,
              field: 'id',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              readonly: true,
              hidden: true,
              type: 'text'
            },
            {
              flexSize: 12,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_PA_FORMULA_FORMULA,
              field: 'note',
              textareaRows: 8,
              value: '',
              controlType: EnumFormBaseContolType.TEXTAREA,
              type: 'text',
            },
          ],
        ]
      },
    ];



  onFormCreated(e: IDynamicFormEmitOnFormCreated): void {
    this.form = e.formGroup;
    console.log(e);


  }

  onFormReinit(e: string): void {
  }


  onRowDoubleClick(e: any): void {
    console.log("onRowDoubleClick ", e);
    this.titleEdit = EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_PA_FORMULA_ORDER
    this.formulaId = e.id
    this.colName = e.colName
    console.log(e.formula)
    this.formulaText = (e.formula == null ? "" : e.formula)
    this.displayInputOrder = true;
    this.formulaOrders = (e.orders == null ? "" : e.orders);
    this.disabledTextArea = false;
  }

  onFormulaOrdersChange(order: number): void {
    console.log(order);
  }

  // RIGHT
  listSalaries: ICoreListOption[] = [];


  onListSalariesChange(id: number) {
    const filter = this.typeList.filter(X => X.id === id)
    if (!!filter.length) {
      console.log(filter[0].code)
      // var formula = this.coreFormService.getFormBaseControlByName(this.sections, 'note');
      // formula!.value = filter[0].code
      // let currentValue = this.form.get('note')?.value
      // currentValue += filter[0].code;
      // this.form.get('note')?.patchValue(currentValue);
      // console.log(formula?.value);
      this.formulaText += filter[0].code

    }
  }

  typeList!: any[];

  override ngOnInit(): void {
    this.subscriptions.push(
      this.mls.lang$.subscribe(x => this.lang = x)
    )

  }

  onButtonClick(e: ICoreButtonVNS) {
    if (this.formulaText === "") {
      this.alertService.error(this.mls.trans('common.error.enter.input') + '!', alertOptions)
    }

    else {
      if (e.code == EnumCoreButtonVNSCode.HEADER_CREATE) {
        console.log("create/update");
        this.loading = true;
        if (this.formulaOrders == null) {
          console.log("asdfasdf");
          this.showRequiredOrders = true;
        }
        else {
          this.subsctiptions.push(
            this.appService.post(api.SYS_PA_FORMULA_UPDATE, { salaryTypeId: this.objSalary, colName: this.colName, formula: this.formulaText, orders: this.formulaOrders }).subscribe(x => {
              if (x.ok && x.status === 200) {
                const body: IFormatedResponse = x.body
                if (body.statusCode === 200) {

                  const listInstances = this.corePageListService.instances.filter(y => y.instanceNumber === this.listInstance)
                  if (!!listInstances.length) {
                    listInstances[0].reloadFlag$.next(!!!listInstances[0].reloadFlag$.value)
                  }

                  this.alertService.success(body.messageCode, alertOptions)
                  this.formulaText = "";
                  this.formulaOrders = 0;
                  this.showRequiredOrders = false;
                  this.disabledTextArea = true;

                } else {
                  //this.responseService.resolve(body)
                }
              } else {
                //this.alertService.error(JSON.stringify(x), alertOptions)
              }
              this.loading = false;
            })
          )
        }
      }
      else {
        console.log("check formula");
        console.log(this.colName);
        this.subsctiptions.push(
          this.appService.post(api.SYS_PA_FORMULA_CHECK_VALID, { salaryTypeId: this.objSalary, colName: this.colName, formula: this.formulaText }).subscribe(x => {
            if (x.ok && x.status === 200) {
              const body: IFormatedResponse = x.body
              if (body.statusCode === 200) {
                window.confirm(
                  this.mls.trans('formula.valid'),
                );
              } else {
                //this.responseService.resolve(body)
                window.confirm(
                  this.mls.trans('formula.invalid'),
                );
              }
            } else {
              //this.alertService.error(JSON.stringify(x), alertOptions)
            }
            this.loading = false;
          })
        )
      }
    }
  }

  onCancel(): void {
    if (!!this.urlService.previousRouteUrl$.value.length) {
      this.router.navigateByUrl(this.urlService.previousRouteUrl$.value);
    } else {
      this.router.navigate(['../'], { relativeTo: this.route });
    }
  }

  onInstanceCreated(event: number) {
    this.listInstance = event;
  }

  updatePayload(): void {
    // to-do
    this.payLoad = JSON.stringify(this.form?.getRawValue(), null, 2);
    console.log(this.form);
    console.log(this.payLoad);
  }

  updateValidorOverview(): void {
    // to-do
    const result: { key: string; errors: any[] }[] = [];
    Object.keys(this.form.controls).forEach((key) => {
      const control: AbstractControl = this.form.get(key)!;
      const errors: any[] = [];
      if (!!control.invalid) {
        Object.keys(control.errors!).forEach((key) => {
          errors.push(key);
        });
      }
      result.push({
        key,
        errors,
      });
    });
    this.validatorOverview = JSON.stringify(result, null, 2);
  }

}