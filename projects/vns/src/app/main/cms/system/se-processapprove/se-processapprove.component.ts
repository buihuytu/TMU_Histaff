import {
  Component,
  TemplateRef,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Router } from 'express';
import { AlertService, AppService, BaseComponent, CorePageListService, EnumCoreButtonVNSCode, EnumCoreFormControlSeekerSourceType, EnumCoreTablePipeType, EnumFilterOperator, EnumFormBaseContolType, IAlertOptions, ICoreButtonVNS, ICoreChecklistOption, ICoreDropdownOption, ICoreFormSection, ICoreListOption, ICorePageEditCRUD, ICorePageListApiDefinition, ICorePageListCRUD, ICoreRadioOption, ICoreTableColumnItem, IDynamicFormEmitOnFormCreated, IFilterOperator, IFormatedResponse, ISysGroup, MultiLanguageService, ResponseService, UrlService, alertOptions } from 'ngx-histaff-alpha';
import { BehaviorSubject, Subscription } from 'rxjs';
import { SeProcessApproveEditService } from './se-process-approve.service';
import { EnumTranslateKey, api } from 'alpha-global-constants';

@Component({
  selector: 'app-se-processapprove',
  templateUrl: './se-processapprove.component.html',
  styleUrls: ['./se-processapprove.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SeProcessApproveComponent extends BaseComponent {
  title = EnumTranslateKey.UI_COMPONENT_TITLE_SE_PROCESS_APPROVE;
  checkboxTemplate!: TemplateRef<any>;
  outerParam$ = new BehaviorSubject<any>(null);
  processId!: number;
  crudEdit!: ICorePageEditCRUD;
  corePageListHeight!: number;
  corePageListInstanceNumber!: number;
  forceReloadingFlag$ = new BehaviorSubject<boolean>(false);
  listInstance!: number;
  ids!: number[];
  alertOptions: IAlertOptions = {
    autoClose: true,
    keepAfterRouteChange: true,
  };

  positionGetByIdObject$ = new BehaviorSubject<any>(null);
  positionGetByIdApi = api.HU_POSITION_READ;

  checklistOptions$ = new BehaviorSubject<ICoreChecklistOption[]>([
    {
      value: 1,
      text: 'Bỏ qua nếu vị trí phê duyệt trống.',
      checked: false,
    },
    {
      value: 2,
      text: 'Bỏ qua nếu trùng người phê duyệt',
      checked: false,
    },
  ]);
  radioOptions$ = new BehaviorSubject<ICoreRadioOption[]>([
    {
      value: 1,
      text: 'Quản lý trực tiếp',
    },
    {
      value: 2,
      text: 'Quản lý phòng ban trực thuộc',
    },
    {
      value: 3,
      text: 'Quản lý phòng ban cấp trên',
    },
    {
      value: 4,
      text: 'Quản lý trực tiếp của quản lý trực tiếp'
    }
  ])
  insuranceGetByIdObject$ = new BehaviorSubject<any>(null);
  processListOption: ICoreListOption[] = [];
  outerFilterOperators: IFilterOperator[] = [
    {
      field: 'processId',
      operator: EnumFilterOperator.EQUAL,
    },
  ];

  submitText!: EnumTranslateKey;
  leftInputSections!: ICoreFormSection[];
  leftInputSectionsFlexSize!: number;
  showCaptionButton: boolean = true;
  form!: FormGroup;
  entityTable = 'SE_PROCESS_APPROVE';

  @ViewChild('managerSuperiorDepartments')
  managerSuperiorDepartments!: TemplateRef<any>;
  @ViewChild('managerAffiliatedDepartments')
  managerAffiliatedDepartments!: TemplateRef<any>;
  @ViewChild('directManager') directManager!: TemplateRef<any>;
  @ViewChild('approvalPosition') approvalPosition!: TemplateRef<any>;
  @ViewChild('sameApprover') sameApprover!: TemplateRef<any>;

  crud: ICorePageListCRUD = {
    deleteIds: api.SE_PROCESS_APPROVE_DELETE_IDS,
  };

  subsctiptions: Subscription[] = [];
  captionCode!: EnumTranslateKey;
  loading: boolean = false;
  checkError$ = new BehaviorSubject<boolean>(false);

  levelOrderOptions$ = new BehaviorSubject<ICoreDropdownOption[]>([]);
  levelOrderGetByIdObject$ = new BehaviorSubject<any>(null);
  levelOrderGetByApi = api.SYS_OTHERLIST_READ;

  processOptions$ = new BehaviorSubject<ICoreDropdownOption[]>([]);
  processGetByIdObject$ = new BehaviorSubject<any>(null);
  processGetByIdApi = api.SE_PROCESS_READ;

  //posOptions$ = new BehaviorSubject<ICoreDropdownOption[]>([]);
  posGetByIdObject$ = new BehaviorSubject<any>(null);
  posGetByIdApi = api.HU_POSITION_READ;
  //posObjectList$ = new BehaviorSubject<any>(null);
  posObjectList$ = new BehaviorSubject<any[]>([]);

  //col process approve
  columns: ICoreTableColumnItem[] = [
    {
      caption: 'ID',
      field: 'id',
      hidden: true,
      type: 'number',
      align: 'left',
      width: 10,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_SE_PROCESS_APPROVE_NAME, //ten cap phe duyet
      field: 'approvalLevelName',
      type: 'string',
      align: 'left',
      width: 150,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_SE_PROCESS_APPROVE_ORDER, //thu tu cap
      field: 'levelOrderId',
      type: 'string',
      align: 'left',
      width: 150,
    },
    {
      caption:
        EnumTranslateKey.UI_COMPONENT_TITLE_SE_PROCESS_APPROVE_POS_APPROVAL, //vi tri trong
      field: 'approvalPosition',
      type: 'bool',
      align: 'left',
      width: 150,
      pipe: EnumCoreTablePipeType.BOOLEAN_TO_TRUE_FALSE,
    },
    {
      caption:
        EnumTranslateKey.UI_COMPONENT_TITLE_SE_PROCESS_APPROVE_SAME_APPROVER, //trung nguoi phe duyet
      field: 'sameApprover',
      type: 'bool',
      align: 'left',
      width: 150,
      pipe: EnumCoreTablePipeType.BOOLEAN_TO_TRUE_FALSE,
    },
    {
      caption:
        EnumTranslateKey.UI_COMPONENT_TITLE_SE_PROCESS_APPROVE_POCESS_NAME, //quy trinh
      field: 'processName',
      type: 'string',
      align: 'left',
      width: 250,
    },
    {
      caption:
        EnumTranslateKey.UI_COMPONENT_TITLE_SE_PROCESS_APPROVE_MNG_DIERECT, //quan ly truc tiep
      field: 'directManager',
      type: 'bool',
      pipe: EnumCoreTablePipeType.BOOLEAN_TO_TRUE_FALSE,
      align: 'left',
      width: 150,
    },
    {
      caption:
        EnumTranslateKey.UI_COMPONENT_TITLE_SE_PROCESS_APPROVE_MNG_AFF_DPM, //quan ly phong ban truc thuoc
      field: 'managerAffiliatedDepartments',
      type: 'bool',
      pipe: EnumCoreTablePipeType.BOOLEAN_TO_TRUE_FALSE,
      align: 'left',
      width: 150,
    },
    {
      caption:
        EnumTranslateKey.UI_COMPONENT_TITLE_SE_PROCESS_APPROVE_MNG_SUP_DPM, //quan ly phong ban cap tren
      field: 'managerSuperiorDepartments',
      type: 'bool',
      pipe: EnumCoreTablePipeType.BOOLEAN_TO_TRUE_FALSE,
      align: 'left',
      width: 150,
    },
    {
      caption:
        EnumTranslateKey.UI_COMPONENT_TITLE_SE_PROCESS_APPROVE_IS_APPROVE, //phe duyet
      field: 'approve',
      type: 'string',
      align: 'left',
      width: 200,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_SE_PROCESS_APPROVE_IS_REFUSE, //tu choi
      field: 'refuse',
      type: 'string',
      align: 'left',
      width: 200,
    },
    {
      caption:
        EnumTranslateKey.UI_COMPONENT_TITLE_SE_PROCESS_APPROVE_CHOOSE_APPROVER, //lua chon nguoi phe duyet
      field: 'chooseAnApprover',
      type: 'string',
      align: 'left',
      width: 200,
    },
  ];

  //col process
  columnsProcess: ICoreTableColumnItem[] = [
    {
      caption: 'ID',
      field: 'id',
      hidden: true,
      type: 'number',
      align: 'left',
      width: 10,
    },
    {
      caption: 'Tên quy trình',
      field: 'name',
      type: 'string',
      align: 'left',
      width: 200,
    },
  ];

  preDefinedOuterParam$ = new BehaviorSubject<any>({})

  constructor(
    public override mls: MultiLanguageService,
    public processApproveService: SeProcessApproveEditService,
    public appService: AppService,
    private corePageListService: CorePageListService,
    private alertService: AlertService,
    private responseService: ResponseService,
    private router: Router,
    private route: ActivatedRoute,
    private urlService: UrlService
  ) {
    super(mls);
    this.loading = false;
    // this.captionCode =
    //   EnumTranslateKey.UI_COMPONENT_TITLE_SE_PROCESS_APPROVE_EDIT;

    this.crudEdit = {
      c: api.SE_PROCESS_APPROVE_CREATE,
      r: api.SE_PROCESS_APPROVE_READ,
      u: api.SE_PROCESS_APPROVE_UPDATE,
      d: api.SE_PROCESS_DELETE_IDS,
    };
  }

  apiDefinition: ICorePageListApiDefinition = {
    queryListRelativePath: api.SE_PROCESS_APPROVE_QUERY_LIST,
  };

  apiDefinitionProcess: ICorePageListApiDefinition = {
    queryListRelativePath: api.SE_PROCESS_QUERY_LIST,
  };

  //form edit
  sections: ICoreFormSection[] = [
    {
      rows: [
        [
          {
            flexSize: 0,
            label: EnumTranslateKey.UI_COMPONENT_TITLE_SE_PROCESS_APPROVE_ID,
            field: 'id',
            value: '',
            controlType: EnumFormBaseContolType.TEXTBOX,
            readonly: true,
            hidden: true,
            type: 'number',
          },
        ],
        [
          {
            flexSize: 0,
            label: EnumTranslateKey.UI_COMPONENT_TITLE_SE_PROCESS_APPROVE_NAME, //Ten cap phe duyet
            field: 'processId',
            value: '',
            controlType: EnumFormBaseContolType.TEXTBOX,
            type: 'number',
            readonly: false,
            hidden: true,
            // validators: [
            //   {
            //     name: 'required',
            //     validator: Validators.required,
            //     errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
            //   },
            // ],
          },
          {
            flexSize: 4,
            label: EnumTranslateKey.UI_COMPONENT_TITLE_SE_PROCESS_APPROVE_NAME, //Ten cap phe duyet
            field: 'approvalLevelName',
            value: '',
            controlType: EnumFormBaseContolType.TEXTBOX,
            type: 'text',
            readonly: false,
            validators: [
              {
                name: 'required',
                validator: Validators.required,
                errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
              },
            ],
          },
          {
            flexSize: 4,
            label: EnumTranslateKey.UI_COMPONENT_TITLE_SE_PROCESS_APPROVE_ORDER, //Thu tu cap
            field: 'levelOrderId',
            value: '',
            controlType: EnumFormBaseContolType.TEXTBOX,
            pipe: EnumCoreTablePipeType.NUMBER,
            type: 'number',
            readonly: false,
            validators: [
              {
                name: 'required',
                validator: Validators.required,
                errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
              },
              {
                name: 'minLength',
                validator: Validators.min(1),
                errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_MIN,
              },
              {
                name: 'maxLength',
                validator: Validators.max(10),
                errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_MAX,
              },
            ],
          },
          {
            flexSize: 4,
            label: EnumTranslateKey.UI_COMPONENT_TITLE_SE_PROCESS_APPROVE_EXITS,
            field: 'checkList',
            value: [],
            readonly: false,
            disabled: false,
            controlType: EnumFormBaseContolType.CHECKLIST,
            checklistOptions$: this.checklistOptions$,
            getByIdObject$: this.insuranceGetByIdObject$,
            shownFrom: 'text',
            type: 'string',
          },
        ],
        [
          {
            flexSize: 4,
            label:
              EnumTranslateKey.UI_COMPONENT_TITLE_SE_PROCESS_APPROVE_IS_APPROVE, //Phe duyet
            field: 'approve',
            value: '',
            controlType: EnumFormBaseContolType.TEXTAREA,
            type: 'string',
            readonly: false,
          },
          {
            flexSize: 4,
            label:
              EnumTranslateKey.UI_COMPONENT_TITLE_SE_PROCESS_APPROVE_IS_REFUSE, //tu choi
            field: 'refuse',
            value: '',
            controlType: EnumFormBaseContolType.TEXTAREA,
            type: 'string',
            readonly: false,
          },
          {
            flexSize: 4,
            label: EnumTranslateKey.UI_COMPONENT_TITLE_SE_PROCESS_APPROVE_AUTO_CHOOSE_APPROVE,
            field: 'listCheck',
            value: '',
            readonly: false,
            disabled: false,
            controlType: EnumFormBaseContolType.RADIOGROUP,
            radioGroupOptions$: this.radioOptions$,
            verticalMode:true, 
            //getByIdObject$: this.insuranceGetByIdObject$,
            shownFrom: 'text',
            type: 'string',
            validators: [
              // {
              //   name: 'required',
              //   validator: Validators.required,
              //   errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
              // },
            ]
          },
        ],
        [
          {
            flexSize: 12,
            label:
              EnumTranslateKey.UI_COMPONENT_TITLE_SE_PROCESS_APPROVE_CHOOSE_APPROVER, //lua chon nguoi phe duyet
            field: 'chooseAnApprover',
            value: '',
            controlType: EnumFormBaseContolType.TEXTAREA,
            type: 'text',
            readonly: false,
          },
        ],
      ],
    },
    {
      rows: [
        [
          {
            flexSize: 12,
            label:
              EnumTranslateKey.UI_COMPONENT_TITLE_SE_PROCESS_APPROVE_POSITION_NAME,
            field: 'posIds',
            value: [],
            controlType: EnumFormBaseContolType.SEEKER,
            type: 'object',
            /* 
                START: Thay đổi thuộc tính của SEEKER để có SELECTOR:
              */
            seekerSourceType: EnumCoreFormControlSeekerSourceType.POSITION_SEEK,
            multiMode: true,
            objectList$: this.posObjectList$,
            getObjectListFrom: 'posList',
            getByIdObject$: this.posGetByIdObject$,
            getByIdApi: this.posGetByIdApi,
            boundFrom: 'id',
            shownFrom: 'name',
            preDefinedOuterParam$ : this.preDefinedOuterParam$
            // alsoBindTo: [{ takeFrom: 'positionName', bindTo: 'signPosition' }],
            /* END: WHEN USING controlType === EnumFormBaseContolType.SEEKER */
          },
          {
            flexSize: 12,
            label: EnumTranslateKey.UI_COMMON_EMPTY_STRING,
            field: 'posList',
            value: [],
            controlType: EnumFormBaseContolType.HIDDEN,
            type: 'object',
          },
        ],
      ],
    },
  ];
  //end form edit
  typeList!: any[];
  selectedIds: number[] = [];

  override ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.loading = true;
      // this.processApproveService
      //   .getLevelOrder()
      //   .pipe(
      //     map((x: any) => {
      //       if (x.ok && x.status === 200) {
      //         const options: { value: number; text: string }[] = [];
      //         x.body.innerBody.map((g: any) => {
      //           options.push({
      //             value: g.levelOrderId,
      //             text: g.levelOrderName,
      //           });
      //         });
      //         return options;
      //       } else {
      //         return [];
      //       }
      //     })
      //   )
      //   .subscribe((response) => {
      //     this.levelOrderOptions$.next(response);
      //     this.loading = false;
      //   });

      //get list process
      this.subscriptions.push(
        this.processApproveService.getListProcess().subscribe((x) => {
          if (x.ok && x.status === 200) {
            const body: IFormatedResponse = x.body;
            if (body.statusCode === 200) {
              this.typeList = x.body.innerBody;
              console.log(this.typeList);
              const newGroupOptions: ICoreListOption[] = [];
              (x.body.innerBody as ISysGroup[]).map((x) => {
                newGroupOptions.push({
                  value: x.id,
                  text: x.name,
                });
              });
              this.processListOption = newGroupOptions;
              if (!!newGroupOptions.length) { this.processId = newGroupOptions[0].value; this.onFilterProcess(newGroupOptions[0].value) }
            }
          }
        })
      );

      //
      this.columns.filter(
        (c) => c.field === 'managerSuperiorDepartments'
      )[0].templateRef = this.managerSuperiorDepartments;
      this.columns.filter(
        (c) => c.field === 'managerAffiliatedDepartments'
      )[0].templateRef = this.managerAffiliatedDepartments;
      this.columns.filter((c) => c.field === 'directManager')[0].templateRef =
        this.directManager;
      this.columns.filter(
        (c) => c.field === 'approvalPosition'
      )[0].templateRef = this.approvalPosition;
      this.columns.filter((c) => c.field === 'sameApprover')[0].templateRef =
        this.sameApprover;
    });
  }

  onRowDoubleClick(e: any) {
    this.subsctiptions.push(
      this.appService
        .get(api.SE_PROCESS_APPROVE_READ + e.id)
        .subscribe((x: any) => {
          if (x.ok && x.status == 200) {
            this.form.patchValue(x.body.innerBody);
            this.posObjectList$.next(x.body.innerBody.posList);
          }
        })
    );
  }

  // selectProcess(processId: number) {
  //   console.log(this.processId)
  //   this.processId = processId;
  //   this.outerParam$.next({
  //     processId: this.processId,
  //   });
  //   //this.form.get('processId')?.patchValue(this.processId);
  // }

  onFilterProcess(processId: number) {
    this.form.reset();
    this.posObjectList$.next([]);
    this.outerParam$.next({ processId: processId });
    this.form.get('processId')?.patchValue(this.processId);
  }

  onFormCreated(e: IDynamicFormEmitOnFormCreated): void {
    this.form = e.formGroup;
  }

  onSelectedIdsChange(e: number[]) {
    this.selectedIds = e;
    //console.log(e);
  }

  onFormReinit(e: number[]): void {
    this.selectedIds = e || [];
  }
  onBufferFormCreated(form: FormGroup) {}

  onSubmit(): void {
    let url: string;
    this.checkError$.next(true);
    const request = this.form.getRawValue();
    if (!!this.form.valid) {
      if (!!this.form.get('id')?.value) {
        url = api.SE_PROCESS_APPROVE_UPDATE;
      } else {
        url = api.SE_PROCESS_APPROVE_CREATE;
      }
        this.appService.post(url, request).subscribe((x) => {
          if (x.ok && x.status === 200) {
            const body: IFormatedResponse = x.body;
            if (body.statusCode === 200) {
              const listInstances = this.corePageListService.instances.filter(
                (y) => y.instanceNumber === this.listInstance
              );
              if (!!listInstances.length) {
                listInstances[0].reloadFlag$.next(
                  !!!listInstances[0].reloadFlag$.value
                );
              }
              this.alertService.success(
                `${this.mls.trans(x.body.messageCode)}`,
                this.alertOptions
              );
              this.lang = JSON.stringify(this.form.getRawValue());
              this.onFilterProcess(this.form.get('processId')?.value);
            } else {
              this.alertService.error(
                `${this.mls.trans(x.body.messageCode)}`,
                this.alertOptions
              );
            }
          } else {
            this.alertService.error(
              `${this.mls.trans(x.body.messageCode)}`,
              this.alertOptions
            );
          }
        });
    }
  }

  onInstanceCreated(event: number) {
    this.listInstance = event;
  }
  onCancel(): void {}

  onCorePageHeaderButtonClick(e: ICoreButtonVNS): void {
    //console.log('e', e);
    switch (e.code) {
      case EnumCoreButtonVNSCode.HEADER_CREATE:
        this.form.reset();
        this.posObjectList$.next([]);
        break;
      case EnumCoreButtonVNSCode.HEADER_EDIT:
        break;
      case EnumCoreButtonVNSCode.HEADER_DELETE:
        if (this.selectedIds.length == 0) {
        } else {
          this.onDelete(this.selectedIds);
          this.onFilterProcess(this.processId);
        }
        break;
      default:
        break;
    }
  }

  onDelete(selectedIds: number[]): void {
    const confirm = window.confirm(
      this.mls.trans('common.confirm.delete.prefix') + '?'
    );
    if (confirm) {
      this.loading = true;
      this.subsctiptions.push(
        this.appService
          .post(api.SE_PROCESS_APPROVE_DELETE_BY_IDS, { ids: selectedIds })
          .subscribe((x) => {
            if (x.ok && x.status === 200) {
              const body: IFormatedResponse = x.body;
              if (body.statusCode === 200) {
                const listInstances = this.corePageListService.instances.filter(
                  (y) => y.instanceNumber === this.listInstance
                );
                if (!!listInstances.length) {
                  listInstances[0].reloadFlag$.next(
                    !!!listInstances[0].reloadFlag$.value
                  );
                }
                this.alertService.info(
                  this.mls.trans('DELETE_SUCCESS'),
                  this.alertOptions,
                );
              } else {
                this.responseService.resolve(body);
              }
            } else {
              this.alertService.error(JSON.stringify(x), alertOptions);
            }
            this.loading = false;
          })
      );
    } else {
      this.alertService.error(`Select Range Date to Delete!!!`, alertOptions);
    }
  }
}
