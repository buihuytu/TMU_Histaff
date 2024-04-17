import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  TemplateRef,
  isDevMode,
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BaseEditComponent, ICorePageListCRUD, ICoreTableColumnItem, IFormBaseControl, ICoreButtonVNS, ICoreDropdownOption, EnumCoreButtonVNSCode, IAlertOptions, DialogService, CorePageEditService, AlertService, ResponseService, MultiLanguageService, CorePageListService, IFormatedResponse, alertOptions, IIdsRequest } from 'ngx-histaff-alpha';
import { BehaviorSubject, Subscription } from 'rxjs';
import { WarningService } from '../warning-service';
import { IWarningItem } from './IWarningItem';
import { EnumTranslateKey } from 'alpha-global-constants';

interface ISubmitItem {
  id: number;
  code: string;
  value: number;
  isActive: boolean;
  errorMessage?: EnumTranslateKey
}

@Component({
  selector: 'app-warning-edit',
  templateUrl: './warning-edit.component.html',
  styleUrls: ['./warning-edit.component.scss'],
})
export class WarningEditComponent extends BaseEditComponent {
  @Input() hideHeader!: boolean;
  @Input() left!: TemplateRef<any>;
  @Input() selfResolveCorePageHeaderButtonClick!: boolean;
  @Input() normalMode!: boolean;
  @Input() crud!: ICorePageListCRUD;
  @Input() columns!: ICoreTableColumnItem[];
  @Input() seekerMode!: boolean;
  @Input() hideButtonGroup!: boolean;
  @Input() control!: IFormBaseControl;

  @Output() corePageHeaderButtonClick = new EventEmitter<ICoreButtonVNS>();
  @Output() onCancal = new EventEmitter();
  @Output() buttonClick = new EventEmitter<ICoreButtonVNS>();
  @Output() onInitialValueStringReady = new EventEmitter<string>();
  corePageListInstanceNumber!: number;
  loading: boolean = false;
  lang!: string;
  selectedIds: string[] | number[] = [];
  subscriptions: Subscription[] = [];
  forceReloadingFlag$ = new BehaviorSubject<boolean>(false);
  list!: any[];
  options$ = new BehaviorSubject<ICoreDropdownOption[]>([]);
  checkError$ = new BehaviorSubject<boolean>(false);
  errorMessage : EnumTranslateKey = EnumTranslateKey.UI_COMPONENT_LABEL_NOT_NULL_ALERT

  override entityTable!: 'SE_REMINDER';
  buttonItems: EnumCoreButtonVNSCode[] = [
    EnumCoreButtonVNSCode.NONE_HEADER_SAVE,
    EnumCoreButtonVNSCode.NONE_HEADER_CANCEL,
  ];
  alertOptions: IAlertOptions = {
    autoClose: false,
    keepAfterRouteChange: true,
  };

  listWarning: IWarningItem[][] = [
    [
      {
        id: 27,
        label: EnumTranslateKey.UI_COMPONENT_LABEL_CONTRACT_EXPIRATION_DATE,
        warningOn: EnumTranslateKey.UI_COMPONENT_LABEL_NOTICE_PERIOD,
        unit: EnumTranslateKey.UI_COMPONENT_LABEL_DATE,
        value: 1,
        otherListCode: 'WARN01',
        isActive: true,
        errorMessage: EnumTranslateKey.UI_COMPONENT_LABEL_NOT_NULL_ALERT
      },
      {
        id: 26,
        label:
          EnumTranslateKey.UI_COMPONENT_LABEL_OFFICIAL_CONTRACT_EXPIRATION_DATE,
        warningOn: EnumTranslateKey.UI_COMPONENT_LABEL_NOTICE_PERIOD,
        unit: EnumTranslateKey.UI_COMPONENT_LABEL_MONTH,
        otherListCode: 'WARN02',
        value: 1,
        isActive: true,
        errorMessage: EnumTranslateKey.UI_COMPONENT_LABEL_NOT_NULL_ALERT
      },
      {
        id: 25,
        label: EnumTranslateKey.UI_COMPONENT_LABEL_BIRTHDAY_IS_COMING_UP,
        warningOn: EnumTranslateKey.UI_COMPONENT_LABEL_NOTICE_PERIOD,
        unit: EnumTranslateKey.UI_COMPONENT_LABEL_DATE,
        otherListCode: 'WARN03',
        value: 1,
        isActive: true,
        errorMessage: EnumTranslateKey.UI_COMPONENT_LABEL_NOT_NULL_ALERT
      },
    ],
    [
      {
        id: 24,
        label:
          EnumTranslateKey.UI_COMPONENT_LABEL_NOT_SUBMITED_ENOUGH_DOCUMENT_UPON_RECEIPT,
        warningOn: EnumTranslateKey.UI_COMPONENT_LABEL_NOTICE_TIME_LATER,
        unit: EnumTranslateKey.UI_COMPONENT_LABEL_DATE,
        otherListCode: 'WARN04',
        value: 1,
        isActive: true,
        errorMessage: EnumTranslateKey.UI_COMPONENT_LABEL_NOT_NULL_ALERT
      },
      {
        id: 23,
        label: EnumTranslateKey.UI_COMPONENT_LABEL_LEAVES_WORK_FOR_MONTH,
        warningOn: EnumTranslateKey.UI_COMPONENT_LABEL_NOTICE_PERIOD,
        unit: EnumTranslateKey.UI_COMPONENT_LABEL_DATE,
        otherListCode: 'WARN05',
        value: 1,
        isActive: true,
        errorMessage: EnumTranslateKey.UI_COMPONENT_LABEL_NOT_NULL_ALERT
      },
      {
        id: 22,
        label: EnumTranslateKey.UI_COMPONENT_LABEL_NEW_CREATIVE_INSURANCE,
        warningOn: EnumTranslateKey.UI_COMPONENT_LABEL_NOTICE_TIME_LATER,
        unit: EnumTranslateKey.UI_COMPONENT_LABEL_DATE,
        otherListCode: 'WARN06',
        value: 1,
        isActive: true,
        errorMessage: EnumTranslateKey.UI_COMPONENT_LABEL_NOT_NULL_ALERT
      },
    ],
    [
      {
        id: 21,
        label:
          EnumTranslateKey.UI_COMPONENT_LABEL_ON_MATERNITY_LEAVE_PREPARE_TO_GO_BACK_TO_WORK,
        warningOn: EnumTranslateKey.UI_COMPONENT_LABEL_NOTICE_PERIOD,
        unit: EnumTranslateKey.UI_COMPONENT_LABEL_DATE,
        otherListCode: 'WARN07',
        value: 1,
        isActive: true,
        errorMessage: EnumTranslateKey.UI_COMPONENT_LABEL_NOT_NULL_ALERT
      },
      {
        id: 20,
        label: EnumTranslateKey.UI_COMPONENT_LABEL_REACH_RETIREMENT_AGE,
        warningOn: EnumTranslateKey.UI_COMPONENT_LABEL_NOTICE_PERIOD,
        unit: EnumTranslateKey.UI_COMPONENT_LABEL_MONTH,
        otherListCode: 'WARN08',
        value: 1,
        isActive: true,
        errorMessage: EnumTranslateKey.UI_COMPONENT_LABEL_NOT_NULL_ALERT
      },
      {
        id: 19,
        label: EnumTranslateKey.UI_COMPONENT_LABEL_EXPIRED_CERTIFICATE,
        warningOn: EnumTranslateKey.UI_COMPONENT_LABEL_NOTICE_PERIOD,
        unit: EnumTranslateKey.UI_COMPONENT_LABEL_MONTH,
        otherListCode: 'WARN09',
        value: 1,
        isActive: true,
        errorMessage: EnumTranslateKey.UI_COMPONENT_LABEL_NOT_NULL_ALERT
      },
    ],
    [
      {
        id: 18,
        label: EnumTranslateKey.UI_COMPONENT_LABEL_CUMULATIVE_EXPIRATION_DATE,
        warningOn: EnumTranslateKey.UI_COMPONENT_LABEL_NOTICE_PERIOD,
        unit: EnumTranslateKey.UI_COMPONENT_LABEL_DATE,
        otherListCode: 'WARN10',
        value: 1,
        isActive: true,
        errorMessage: EnumTranslateKey.UI_COMPONENT_LABEL_NOT_NULL_ALERT
      },
      {
        id: 17,
        label: EnumTranslateKey.UI_COMPONENT_LABEL_END_OF_FAMILY_DISCOUNT,
        warningOn: EnumTranslateKey.UI_COMPONENT_LABEL_NOTICE_PERIOD,
        unit: EnumTranslateKey.UI_COMPONENT_LABEL_DATE,
        otherListCode: 'WARN11',
        value: 1,
        isActive: true,
        errorMessage: EnumTranslateKey.UI_COMPONENT_LABEL_NOT_NULL_ALERT
      },
      {
        id: 16,
        label:
          EnumTranslateKey.UI_COMPONENT_LABEL_RETIREMENT_MANAGEMENT_LEADERSHIP,
        warningOn: EnumTranslateKey.UI_COMPONENT_LABEL_NOTICE_PERIOD,
        unit: EnumTranslateKey.UI_COMPONENT_LABEL_MONTH,
        otherListCode: 'WARN12',
        value: 1,
        isActive: true,
        errorMessage: EnumTranslateKey.UI_COMPONENT_LABEL_NOT_NULL_ALERT
      },
    ],
    [
      {
        id: 14,
        label: EnumTranslateKey.UI_COMPONENT_LABEL_APPOINTED_LEADERSHIP,
        warningOn: EnumTranslateKey.UI_COMPONENT_LABEL_NOTICE_PERIOD,
        unit: EnumTranslateKey.UI_COMPONENT_LABEL_DATE,
        otherListCode: 'WARN13',
        value: 1,
        isActive: true,
        errorMessage: EnumTranslateKey.UI_COMPONENT_LABEL_NOT_NULL_ALERT
      },
      {
        id: 15,
        label: EnumTranslateKey.UI_COMPONENT_LABEL_APPOINTED_EMPLOYEE,
        warningOn: EnumTranslateKey.UI_COMPONENT_LABEL_NOTICE_PERIOD,
        unit: EnumTranslateKey.UI_COMPONENT_LABEL_DATE,
        otherListCode: 'WARN14',
        value: 1,
        isActive: true,
        errorMessage: EnumTranslateKey.UI_COMPONENT_LABEL_NOT_NULL_ALERT
      },
      {
        id: 13,
        label: EnumTranslateKey.UI_COMPONENT_LABEL_SALARY_INCREASE,
        warningOn: EnumTranslateKey.UI_COMPONENT_LABEL_NOTICE_PERIOD,
        unit: EnumTranslateKey.UI_COMPONENT_LABEL_DATE,
        otherListCode: 'WARN15',
        value: 1,
        isActive: true,
        errorMessage: EnumTranslateKey.UI_COMPONENT_LABEL_NOT_NULL_ALERT

      },
      // {
      //   id: 12,
      //   label: EnumTranslateKey.UI_COMPONENT_LABEL_NOT_COMPLETING_THE_TASK,
      //   warningOn: EnumTranslateKey.UI_COMPONENT_LABEL_NOTICE_TIME_LATER,
      //   unit: EnumTranslateKey.UI_COMPONENT_LABEL_MONTH,
      //   otherListCode: 'WARN16',
      //   value: 1,
      //   isActive: true,
      //   errorMessage: EnumTranslateKey.UI_COMPONENT_LABEL_NOT_NULL_ALERT

      // },
      {
        id: 11,
        label: EnumTranslateKey.UI_COMPONENT_LABEL_EMPLOYEES_RESUME_EDITING_STAFF,
        warningOn: EnumTranslateKey.UI_COMPONENT_LABEL_TIME_TO_HIDE_NOTIFICATIONS,
        unit: EnumTranslateKey.UI_COMPONENT_LABEL_MONTH,
        otherListCode: 'WARN17',
        value: 1,
        isActive: true,
        errorMessage: EnumTranslateKey.UI_COMPONENT_LABEL_NOT_NULL_ALERT

      },
      {
        id: 10,
        label: EnumTranslateKey.UI_COMPONENT_LABEL_EMPLOYEES_STAFF_EDITS_RELATIVE_INF,
        warningOn: EnumTranslateKey.UI_COMPONENT_LABEL_TIME_TO_HIDE_NOTIFICATIONS,
        unit: EnumTranslateKey.UI_COMPONENT_LABEL_MONTH,
        otherListCode: 'WARN18',
        value: 1,
        isActive: true,
        errorMessage: EnumTranslateKey.UI_COMPONENT_LABEL_NOT_NULL_ALERT

      },
      {
        id: 9,
        label: EnumTranslateKey.UI_COMPONENT_LABEL_EMPLOYEES_EDUCATION_LEVEL,
        warningOn: EnumTranslateKey.UI_COMPONENT_LABEL_TIME_TO_HIDE_NOTIFICATIONS,
        unit: EnumTranslateKey.UI_COMPONENT_LABEL_MONTH,
        otherListCode: 'WARN19',
        value: 1,
        isActive: true,
        errorMessage: EnumTranslateKey.UI_COMPONENT_LABEL_NOT_NULL_ALERT

      },
      {
        id: 8,
        label: EnumTranslateKey.UI_COMPONENT_LABEL_EMPLOYEES_CHANGE_QUALIFICATIONS_CERTIFICATES,
        warningOn: EnumTranslateKey.UI_COMPONENT_LABEL_TIME_TO_HIDE_NOTIFICATIONS,
        unit: EnumTranslateKey.UI_COMPONENT_LABEL_MONTH,
        otherListCode: 'WARN20',
        value: 1,
        isActive: true,
        errorMessage: EnumTranslateKey.UI_COMPONENT_LABEL_NOT_NULL_ALERT

      },
      {
        id: 7,
        label: EnumTranslateKey.UI_COMPONENT_LABEL_EMPLOYEES_ARE_ABOUT_TO_EXPIRE_ON_TRANSFER_OR_SECONDMENT,
        warningOn: EnumTranslateKey.UI_COMPONENT_LABEL_TIME_TO_HIDE_NOTIFICATIONS,
        unit: EnumTranslateKey.UI_COMPONENT_LABEL_MONTH,
        otherListCode: 'WARN21',
        value: 1,
        isActive: true,
        errorMessage: EnumTranslateKey.UI_COMPONENT_LABEL_NOT_NULL_ALERT

      },
      {
        id: 6,
        label: EnumTranslateKey.UI_COMPONENT_LABEL_ADJUST_EMPLOYEE_RECORDS,
        warningOn: EnumTranslateKey.UI_COMPONENT_LABEL_TIME_TO_HIDE_NOTIFICATIONS,
        unit: EnumTranslateKey.UI_COMPONENT_LABEL_MONTH,
        otherListCode: 'WARN22',
        value: 1,
        isActive: true,
        errorMessage: EnumTranslateKey.UI_COMPONENT_LABEL_NOT_NULL_ALERT

      },
      {
        id: 5,
        label: EnumTranslateKey.UI_COMPONENT_LABEL_ADJUST_RELATIVE_INFORMATION,
        warningOn: EnumTranslateKey.UI_COMPONENT_LABEL_TIME_TO_HIDE_NOTIFICATIONS,
        unit: EnumTranslateKey.UI_COMPONENT_LABEL_MONTH,
        otherListCode: 'WARN23',
        value: 1,
        isActive: true,
        errorMessage: EnumTranslateKey.UI_COMPONENT_LABEL_NOT_NULL_ALERT

      },
      {
        id: 4,
        label: EnumTranslateKey.UI_COMPONENT_LABEL_ADJUST_DEGREES_AND_CERTIFICATE,
        warningOn: EnumTranslateKey.UI_COMPONENT_LABEL_TIME_TO_HIDE_NOTIFICATIONS,
        unit: EnumTranslateKey.UI_COMPONENT_LABEL_MONTH,
        otherListCode: 'WARN24',
        value: 1,
        isActive: true,
        errorMessage: EnumTranslateKey.UI_COMPONENT_LABEL_NOT_NULL_ALERT

      },
      {
        id: 3,
        label: EnumTranslateKey.UI_COMPONENT_LABEL_REQUEST_TO_ADJUST_WORK_PROCESS,
        warningOn: EnumTranslateKey.UI_COMPONENT_LABEL_TIME_TO_HIDE_NOTIFICATIONS,
        unit: EnumTranslateKey.UI_COMPONENT_LABEL_MONTH,
        otherListCode: 'WARN25',
        value: 1,
        isActive: true,
        errorMessage: EnumTranslateKey.UI_COMPONENT_LABEL_NOT_NULL_ALERT

      },
      {
        id: 2,
        label: EnumTranslateKey.UI_COMPONENT_LABEL_REQUEST_ADJUSTMENTS_TO_PREVIOUS_WORK_PROCESS,
        warningOn: EnumTranslateKey.UI_COMPONENT_LABEL_TIME_TO_HIDE_NOTIFICATIONS,
        unit: EnumTranslateKey.UI_COMPONENT_LABEL_MONTH,
        otherListCode: 'WARN26',
        value: 1,
        isActive: true,
        errorMessage: EnumTranslateKey.UI_COMPONENT_LABEL_NOT_NULL_ALERT

      },
      {
        id: 1,
        label: EnumTranslateKey.UI_COMPONENT_LABEL_EMPLOYEES_ALLOWANCES_HAVE_EXPIRED,
        warningOn: EnumTranslateKey.UI_COMPONENT_LABEL_NOTICE_PERIOD,
        unit: EnumTranslateKey.UI_COMPONENT_LABEL_DATE,
        otherListCode: 'WARN27',
        value: 1,
        isActive: true,
        errorMessage: EnumTranslateKey.UI_COMPONENT_LABEL_NOT_NULL_ALERT

      },
    ],
  ];
  text!: string;
  toggleAllText: EnumTranslateKey =
    EnumTranslateKey.UI_CORE_CONTROL_CHECKLIST_TOGGLE_CHECK_ALL;
  toggleAllValue: boolean = false;

  constructor(
    public override dialogService: DialogService,
    private corePageEditService: CorePageEditService,
    private route: ActivatedRoute,
    private warningService: WarningService,
    private router: Router,
    private alertService: AlertService,
    private responseService: ResponseService,
    private mls: MultiLanguageService,
    private fb: FormBuilder,
    private corePageListService: CorePageListService
  ) {
    super(dialogService);
  }

  title = EnumTranslateKey.UI_COMPONENT_LABEL_SETTING_WARNING;
  ngOnInit(): void {
    this.loading = true;
    this.form = this.fb.group({
      listWarning: [null],
    });
    this.subscriptions.push(this.mls.lang$.subscribe((x) => (this.lang = x)));
    console.log(this.listWarning);
    // this.subscriptions.push(
    //   this.form.get("isActive")?.valueChanges.subscribe((x) =>{
        
    //   })!
    // )
    this.subscriptions.push(
      this.warningService.readAll().subscribe((x) => {
        const body: IFormatedResponse = x.body;

        if (body.statusCode === 200) {
          const itemGet: any[] = [];
          x.body.innerBody.map((x: any) => {
            itemGet.push({
              id: x.id,
              otherListCode: x.code,
              value: x.value,
              isActive: x.isActive,
              
            });
          });
          this.listWarning.map((row) => {
            row.map((item) => {
              itemGet.map((obj) => {
                if (item.otherListCode === obj.otherListCode) {
                  item.value = obj.value;
                  item.isActive = obj.isActive;
                }
              });
              this.formInitStringValue = JSON.stringify(
                this.form.getRawValue()
              );
            });
          });
        }
        // console.log(this.form.getRawValue());
      })
    );
  }

  onNgModelChange(value: number, item: IWarningItem) {
    item.value = value;
  }
  onCheckedChange(e: boolean, item: IWarningItem) {}
  onButtonClick(e: ICoreButtonVNS): void {
    if (e.code == EnumCoreButtonVNSCode.NONE_HEADER_CANCEL) {
      
      this.onCancelLocal();
    }
    if (e.code == EnumCoreButtonVNSCode.NONE_HEADER_SAVE) {
      this.onFormSubmit();
    }
  }
  onCancelLocal() {
    
    this.onCancal.emit(null);
    
    // this.router.navigateByUrl('/menu');
  }
  onFormSubmit() {
    let error = false;
    var newItems : ISubmitItem[] = []
    this.listWarning.map((row) => {
      row.map((item) => {
        newItems.push({
          id : item.id,
          value: item.value,
          isActive : item.isActive,
          code: item.otherListCode,
          errorMessage : this.errorMessage
        })
        if (item.isActive && item.value === null) {
          error = true;
        }
      });
    });

    if (!!error) {
      return;
    }
      
    this.subscriptions.push(
      this.warningService.updateRange(newItems).subscribe((x: any) => {
        if (x.ok === true && x.body.statusCode === 200) {
          const body: IFormatedResponse = x.body;
          if (body.statusCode == 200) {
          } else {
            //if (isDevMode()) this.responseService.resolve(body);
          }
          
        } else {
          if (isDevMode()) {
            //this.alertService.error(JSON.stringify(x, null, 2), alertOptions);
          }
        }
      })
      /*
      this.warningService.createRange(newItems).subscribe((rs : any) => {
        if(rs.ok == true && rs.body.statusCode == 200){
          const body : IFormatedResponse = rs.body
          if (body.statusCode === 200) {
            
          } else {
            if (isDevMode())
            //this.responseService.resolve(body)
        }
      } else {
        
        if (isDevMode())
        //this.alertService.error(JSON.stringify(rs, null, 2), alertOptions)
      
    }
  })
  */
    );
    setTimeout(() => this.checkError$.next(false), 3000);
  }
  onCorePageHeaderButtonClick(e: ICoreButtonVNS): void {
    if (!!!this.selfResolveCorePageHeaderButtonClick) {
      switch (e.code) {
        case EnumCoreButtonVNSCode.HEADER_CREATE:
          this.corePageEditService.fromUrl = this.router.url;

          if (this.normalMode) {
            this.router.navigate(
              [btoa('0'), { listInstance: this.corePageListInstanceNumber }],
              {
                relativeTo: this.route.parent,
              }
            );
          } else {
            this.router.navigate(
              [
                {
                  outlets: {
                    corePageListAux: [
                      btoa('0'),
                      { listInstance: this.corePageListInstanceNumber },
                    ],
                  },
                },
              ],
              { relativeTo: this.route }
            );
          }

          break;
        case EnumCoreButtonVNSCode.HEADER_EDIT:
          alert('Please');
          break;
        case EnumCoreButtonVNSCode.HEADER_DELETE:
          if (!!this.selectedIds.length) {
            if (
              typeof this.selectedIds[0] !== 'number' &&
              typeof this.selectedIds[0] !== 'string'
            ) {
              this.alertService.info(
                this.mls.trans(
                  'CORE_PAGE_LIST_DELETE_IDS_METHOD_SUPORTS_ONLY_NUMBER_AND_STRING_TYPES'
                )
              );
              break;
            }
          } else {
            this.alertService.error(
              this.mls.trans('NO_SELECTED_ID_TO_DELETE'),
              alertOptions
            );
            break;
          }

          // this.dialogService.body$.next(EnumTranslateKey.UI_CONFIRM_DIALOG_DELETE);
          // this.dialogService.showConfirmDialog$.next(true);

          const confirm = window.confirm(
            this.mls.trans('common.confirm.delete.prefix') +
              JSON.stringify(this.selectedIds) +
              '?'
          );
          if (confirm) {
            const request: IIdsRequest = {
              ids: this.selectedIds as number[],
            };

            this.subscriptions.push(
              this.corePageListService
                .deleteIds(request, this.crud.deleteIds!)
                .subscribe((x) => {
                  if (x.ok && x.status === 200) {
                    const body: IFormatedResponse = x.body;
                    if (body.statusCode === 200 || x.body.statusCode == '200') {
                      this.forceReloadingFlag$.next(
                        !!!this.forceReloadingFlag$.value
                      );
                      this.alertService.info(
                        this.mls.trans('DELETE_SUCCESS') +
                          JSON.stringify(this.selectedIds),
                        alertOptions
                      );
                      request.ids = [];
                    } else if (body.statusCode === 400) {
                      this.alertService.warn(
                        this.mls.trans(body.messageCode),
                        alertOptions
                      );
                    }
                  }
                })
            );
          }
          break;
        case EnumCoreButtonVNSCode.HEADER_EXPORTEXEL:
          // let row1: ICoreTableColumnItem[]
          // let listData : any[] = Object.assign(this.list)
          // row1 = this.columns.filter(x => x.field != 'id')
          // row1.map(x => {
          //   x.caption = this.mls.trans(x.caption)
          // })
          // listData.map(row => {
          //   Object.keys(row).forEach(key => {
          //     const filter = row1.filter(x => x.field === key)
          //     if (!filter.length) {
          //       delete row[key];
          //     }
          //   })
          // })

          const csvData: any[][] = [];

          let row1: any[] = [];
          this.columns = this.columns.filter((x) => x.field != 'id');
          this.columns.map((x) => {
            row1.push(this.mls.trans(x.caption));
          });
          csvData.push(row1);

          this.list.map((row, index) => {
            const currentRow: any[] = [];
            this.columns.map((column) => {
              if (column.field != 'id') {
                let currentCell = row[column.field];
                if (typeof currentCell?.replaceAll === 'function') {
                  currentCell = currentCell.replaceAll(',', ';');
                }
                // const cellData = { [column.field]: currentCell };
                currentRow.push(currentCell);
              }
            });

            csvData.push(currentRow);
          });

          // let request = {
          //   headers: row1,
          //   listData: csvData,
          // }
          // debugger
          // this.corePageListService.ExportExel(request, api.EXPORT_EXEL).subscribe((rs: any) => {
          //   const excelUrl = window.URL.createObjectURL(rs.body);
          //   const link = document.createElement('a');
          //   link.href = excelUrl;
          //   link.download = 'ExportExel.xlsx';
          //   link.click();
          //   window.URL.revokeObjectURL(excelUrl);
          // })

          let csvContent = csvData.map((e) => e.join(',')).join('\n');

          var link = document.createElement('a');
          link.setAttribute(
            'href',
            'data:text/csv;charset=utf-8,%EF%BB%BF' + encodeURI(csvContent)
          );
          link.setAttribute('download', 'ExportExel.csv');
          document.body.appendChild(link);
          link.click();
          break;
        default:
          break;
      }
    } else {
      switch (e.code) {
        case EnumCoreButtonVNSCode.HEADER_EDIT:
          console.log(this.left);
          break;
        default:
          break;
      }

      this.corePageHeaderButtonClick.emit(e);
    }
  }
  onToggleAllValueChange(e: boolean) {
    let newText = '';
    let newValue: any[] = [];
  }
}
