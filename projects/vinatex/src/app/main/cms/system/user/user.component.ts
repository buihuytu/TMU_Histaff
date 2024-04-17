import { Component, OnInit, OnDestroy, TemplateRef, AfterViewInit, ViewChild } from '@angular/core';
import { EnumTranslateKey, api } from 'alpha-global-constants';
import { BaseComponent, ICorePageListApiDefinition,EnumCoreButtonVNSCode, ICorePageListCRUD, ICoreTableColumnItem, EnumCoreTablePipeType, ICorePageListEditRouting, MultiLanguageService, AppService, DialogService, CorePageListService, IFormatedResponse, ICoreButtonVNS } from 'ngx-histaff-alpha';
import { filter } from 'rxjs';


@Component({
  selector: 'cms-app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})

export class UserComponent extends BaseComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('avatar') avatar!: TemplateRef<any>;
  @ViewChild('isWebapp') isWebapp!: TemplateRef<any>;
  @ViewChild('isPortal') isPortal!: TemplateRef<any>;
  @ViewChild('isLock') isLock!: TemplateRef<any>;

  /*
  Properties being passed to core-page-list
  */
  title = EnumTranslateKey.UI_COMPONENT_TITLE_SYS_USER;

  apiDefinition: ICorePageListApiDefinition = {
    queryListRelativePath: api.SYS_USER_QUERY_LIST,
  }

  avatarTemplate!: TemplateRef<any>;

  pendingAction!: EnumCoreButtonVNSCode;

  corePageListInstanceNumber!: number;

  // USER TABLE IS THE ONLY TABLE WHICH HAS ID OF TYPE STRING. ALL THE OTHERS MUST HAVE ID OF TYPE NUMBER (bigint/long)
  crud: ICorePageListCRUD = {
    deleteIds: api.SYS_USER_DELETE_STRING_IDS
  }

  columns: ICoreTableColumnItem[] = [
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_COMMON_ID,
      field: 'id',
      hidden: true,
      type: 'string',
      align: 'left',
      width: 30,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_USER_USER_NAME,
      field: 'username',
      type: 'string',
      align: 'left',
      width: 150,
      pipe: EnumCoreTablePipeType.LOWERCASE
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_USER_AVATAR,
      field: 'avatar',
      type: 'string',
      align: 'center',
      hideSearchBox: true,
      width: 80,
      templateRef: this.avatarTemplate,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_USER_EMPLOYEE_CODE,
      field: 'employeeCode',
      type: 'string',
      align: 'left',
      width: 150,
    },
    // {
    //   caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_USER_EMAIL,
    //   field: 'email',
    //   type: 'string',
    //   align: 'left',
    //   width: 150
    // },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_TENANT_GROUP_NAME,
      field: 'groupName',
      type: 'string',
      align: 'left',
      width: 150
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_USER_FULLNAME,
      field: 'fullname',
      type: 'string',
      align: 'left',
      width: 250
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_USER_IS_WEBAPP,
      field: 'isWebapp',
      type: 'boolean',
      align: 'left',
      width: 180,
      templateRef: this.isWebapp,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_USER_IS_PORTAL,
      field: 'isPortal',
      type: 'boolean',
      align: 'center',
      width: 180,
      templateRef: this.isPortal,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_USER_IS_LOCK,
      field: 'isLock',
      type: 'boolean',
      align: 'center',
      width: 180,
      templateRef: this.isLock,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_USER_LEAVE_JOB_DATE,
      field: 'leaveJobDate',
      type: 'string',
      align: 'left',
      width: 250,
      pipe: EnumCoreTablePipeType.DATE
    },

  ]

  editRoute: ICorePageListEditRouting = {
    auxiliary: 'popupAux'
  }
  loading!: boolean;
  userIds!: string[];
  selectedData!: any[];
  /* End Properties being passed to core-page-type-a */

  constructor(
    public override mls: MultiLanguageService,
    private appService: AppService,
    private dialogService: DialogService,
    private corePageListService: CorePageListService
  ) {
    super(mls)
  }

  override ngOnInit(): void {
    this.subscriptions.push(
      this.mls.lang$.subscribe(x => this.lang = x)
    )

    this.subscriptions.push(
      this.dialogService.dialogConfirmed$.pipe(filter(x => !!x?.confirmed)).subscribe(x => {
        switch (this.pendingAction) {
          case EnumCoreButtonVNSCode.HEADER_LOCK:
          case EnumCoreButtonVNSCode.HEADER_UNLOCK:
            let apiPoint: api;
            if (this.pendingAction === EnumCoreButtonVNSCode.HEADER_LOCK) {
              apiPoint = api.SYS_USER_RESET_LOCK_ACCOUNTS
            } else {
              apiPoint = api.SYS_USER_RESET_UNLOCK_ACCOUNTS
            }
            this.subscriptions.push(
              this.appService.post(apiPoint, {
                userIds: this.userIds
              }).subscribe(x => {
                if (x.ok && x.status === 200) {
                  const body: IFormatedResponse = x.body;
                  if (body.statusCode === 200) {
                    const tryFind = this.corePageListService.instances.filter(m => m.instanceNumber === this.corePageListInstanceNumber);
                    if (!!tryFind.length) {
                      tryFind[0].reloadFlag$.next(!tryFind[0].reloadFlag$.value)
                    }
                  }
                }
              })
            )
            break;
          default:
            break;
        }
      })
    )
  }

  onInstanceCreated(e: number) {
    this.corePageListInstanceNumber = e;
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.columns.filter(c => c.field === 'avatar')[0].templateRef = this.avatar;
      this.columns.filter(c => c.field === 'isWebapp')[0].templateRef = this.isWebapp;
      this.columns.filter(c => c.field === 'isPortal')[0].templateRef = this.isPortal;
      this.columns.filter(c => c.field === 'isLock')[0].templateRef = this.isLock;
    })
  }

  onSelectedIdsChange(e: string[]) {
    this.userIds = e;

  }
  onSelectedDataChange(e: any[]) {
    this.selectedData = e;
  }
  onCorePageHeaderButtonClick(e: ICoreButtonVNS): void {
    switch (e.code) {
      case EnumCoreButtonVNSCode.HEADER_SYNCHRONOUS:
        this.loading = true
        this.appService.get(api.SYS_USER_SYNC_ACCOUNTS).subscribe((rs: any) => {
          if (!!rs) {
            this.loading = false;
          }
        })
        break;
      case EnumCoreButtonVNSCode.HEADER_RESET:
        let request = {
          userIds: this.userIds
        }
        this.loading = true
        this.appService.post(api.SYS_USER_RESET_ACCOUNTS, request).subscribe((rs: any) => {
          if (!!rs) {
            this.loading = false;
          }
        })

        break;
      case EnumCoreButtonVNSCode.HEADER_LOCK:
        if (!!this.selectedData && !!this.selectedData.length) {
          const items: string[] = [];
          this.selectedData.map(x => items.push(x.username.toLowerCase()))
          this.pendingAction = e.code;
          this.dialogService.createNew(undefined, undefined, undefined, undefined,
            EnumTranslateKey.UI_CORE_DIALOG_COMFIRM_SYS_USER_LOCK_ACCOUNT, items
          )
        }
        break;
      case EnumCoreButtonVNSCode.HEADER_UNLOCK:
        if (!!this.selectedData && !!this.selectedData.length) {
          const items: string[] = [];
          this.selectedData.map(x => items.push(x.username.toLowerCase()))
          this.pendingAction = e.code;
          this.dialogService.createNew(undefined, undefined, undefined, undefined,
            EnumTranslateKey.UI_CORE_DIALOG_COMFIRM_SYS_USER_UNLOCK_ACCOUNT, items
          )
        }
        break;
      default:
        break;
    }
  }

}