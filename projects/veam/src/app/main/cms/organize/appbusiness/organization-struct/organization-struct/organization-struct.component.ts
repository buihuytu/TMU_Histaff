import { AfterViewInit, Component, OnDestroy, OnInit, isDevMode } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EnumTranslateKey, api } from 'alpha-global-constants';
import { EnumCoreOrgTreeaAccessorMode, EnumCoreButtonVNSCode, OrganizationService, AlertService, MultiLanguageService, AppService, LayoutService, DialogService, CoreButtonGroupService, RecursiveService, noneAutoClosedAlertOptions, IFormatedResponse, IToggleActiveIdsRequest, ICoreButtonVNS, alertOptions } from 'ngx-histaff-alpha';
import { BehaviorSubject, Subscription, filter } from 'rxjs';
import { OrganizationStructService } from '../organization-struct.service';
@Component({
  selector: 'app-organization-struct',
  templateUrl: './organization-struct.component.html',
  styleUrls: ['./organization-struct.component.scss']
})
export class OrganizationStructComponent implements OnInit, AfterViewInit, OnDestroy {

  title: EnumTranslateKey = EnumTranslateKey.UI_COMPONENT_TITLE_ORGANIZATION_STRUCT

  compositionHeight!: number;

  coreOrgTreeAccessorMode: EnumCoreOrgTreeaAccessorMode = EnumCoreOrgTreeaAccessorMode.ACTIVATED_SINGLE;
  orgIds: number[] = [];

  currentOrgId!: number;

  loading: boolean = false;

  subscriptions: Subscription[] = [];

  forceReloadingFlag$ = new BehaviorSubject<boolean | undefined>(undefined);

  pendingAction!: EnumCoreButtonVNSCode;

  dialogInstanceNumber!: number;

  instanceNumber!: number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private organizationService: OrganizationService,
    private organizationStructService: OrganizationStructService,
    private alertService: AlertService,
    public mls: MultiLanguageService,
    private appService: AppService,
    public layoutService: LayoutService,
    private dialogService: DialogService,
    private coreButtonGroupService: CoreButtonGroupService,
    private recursiveService: RecursiveService
  ) {
  }

  /* Properties to be passed into core-page-edit */

  ngOnInit(): void {

    this.instanceNumber = new Date().getTime();

    this.subscriptions.push(
      this.organizationStructService.currentOrgIds$.pipe(
        filter(_ => !!!this.orgIds.length)
      ).subscribe(x => {
        setTimeout(() => this.orgIds = x);
      })
    )

    const selectedKey = this.organizationService.status$.value.selectedKey;
    const tryFind = this.organizationService.linerData$.value.filter(x => x.id === Number(selectedKey));
    if (!!tryFind.length) {
      const selectedObj = tryFind[0];
      if (!!selectedKey) {
        this.currentOrgId = Number(selectedKey);
        this.onOrgIdChange(selectedObj)
        this.router.navigate(
          [
            'view',
            btoa(selectedKey)
          ],
          { relativeTo: this.route.parent }
        );

      }
    } else {
      if (isDevMode()) {
        this.alertService.warn("Không tìm thấy ", noneAutoClosedAlertOptions)
      }
    }

    this.subscriptions.push(
      this.layoutService.contentContainerHeight$.subscribe(x => {
        this.compositionHeight = x - this.layoutService.basicSpacing - this.layoutService.corePageHeaderHeight;

      })
    )
  }

  toggleActive(payload: any): void {

    if (!!api.HU_ORGANIZATION_TOGGLE_ACTIVE_IDS) {
      this.loading = true;
      this.subscriptions.push(
        this.appService.post(api.HU_ORGANIZATION_TOGGLE_ACTIVE_IDS, payload)
          .subscribe((x) => {
            this.loading = false;
            if (x.ok && x.status === 200) {
              const body: IFormatedResponse = x.body;
              if (body.statusCode === 200 || x.body.statusCode == '200') {

                // remark nhanh
                const newData = this.organizationService.orgTreeData$.value;
                const curObj = this.recursiveService.findItemObjectByKey(body.innerBody[0].id.toString(), newData) as any;
                curObj.isActive = body.innerBody[0].isActive;
                this.organizationService.orgTreeData$.next(newData);
                this.forceReloadingFlag$.next(
                  !!!this.forceReloadingFlag$.value
                );
                this.onOrgIdChange(curObj);

              }
            }
          })
      );
    } else {
      if (isDevMode()) {
        this.alertService.warn(this.mls.trans(EnumTranslateKey.NO_API_END_POINT_PROVIDED_FOR_ACTIVATION), noneAutoClosedAlertOptions)
      }
    }

  }

  ngAfterViewInit(): void {

    setTimeout(() => {
      this.subscriptions.push( // outer-push
        this.dialogService.dialogConfirmed$.pipe(
          filter(i => !!!this.dialogService.busy && !!i?.confirmed && i.instanceNumber === this.dialogInstanceNumber)
        ).subscribe(() => {

          this.dialogService.resetService()

          switch (this.pendingAction) {
            case EnumCoreButtonVNSCode.HEADER_ACTIVATE:
            case EnumCoreButtonVNSCode.HEADER_INACTIVATE:
              const payload: IToggleActiveIdsRequest = {
                valueToBind: this.pendingAction === EnumCoreButtonVNSCode.HEADER_ACTIVATE ? true : false,
                ids: this.orgIds as number[],
              };
              this.toggleActive(payload);
              break;

            default:
              break;
          }
        })
      )

    })



  }

  onCorePageHeaderButtonClick(e: ICoreButtonVNS): void {
    switch (e.code) {
      case EnumCoreButtonVNSCode.HEADER_CREATE:
        this.router.navigate(['edit', btoa('0')], { relativeTo: this.route.parent });
        break;
      case EnumCoreButtonVNSCode.HEADER_EDIT:
        this.router.navigate(['edit', btoa(this.currentOrgId.toString())], { relativeTo: this.route.parent });
        break;
      case EnumCoreButtonVNSCode.HEADER_SAVE:
        this.organizationStructService.currentEditFormRef?.nativeElement.submit();
        break;
      case EnumCoreButtonVNSCode.HEADER_DELETE:
        alert(JSON.stringify(this.organizationStructService.currentViewFormData, null, 2))
        break;
      case EnumCoreButtonVNSCode.HEADER_ACTIVATE:
      case EnumCoreButtonVNSCode.HEADER_INACTIVATE:
        if (!!this.currentOrgId) {
          this.pendingAction = e.code;
          this.dialogService.createNew(undefined, undefined, undefined, undefined,
            e.code === EnumCoreButtonVNSCode.HEADER_ACTIVATE ? EnumTranslateKey.UI_CORE_DIALOG_SERVICE_ARE_YOU_SURE_TO_ACTIVE : EnumTranslateKey.UI_CORE_DIALOG_SERVICE_ARE_YOU_SURE_TO_INACTIVE,
            [this.organizationStructService.currentViewFormData.name]
          );

        } else {
          this.alertService.error(
            this.mls.trans('NO_SELECTED_ID_TO_INACTIVATE'),
            alertOptions
          );
          break;
        }

        break;
      default:
        break;
    }
  }

  onOrgIdChange(obj: any) {
    this.currentOrgId = obj.id;


    // Cập nhật các nút của button group
    setTimeout(() => {
      const filter = this.coreButtonGroupService.instances.filter(x => x.instanceNumber === this.instanceNumber)
      if (!filter.length && isDevMode()) {
        this.alertService.warn("Không tìm thấy instance number của button group trong service", noneAutoClosedAlertOptions)
      }
      if (!obj.isActive) {
        if (!!filter.length) {
          filter[0].mustBeHidden$.next([EnumCoreButtonVNSCode.HEADER_INACTIVATE])
        }
      } else {
        if (!!filter.length) {
          filter[0].mustBeHidden$.next([EnumCoreButtonVNSCode.HEADER_ACTIVATE])
        }
      }
    })

    this.router.navigate(
      ['view',
        btoa(obj.id.toString())
      ],
      { relativeTo: this.route.parent }
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.map(x => x?.unsubscribe())
  }

}
