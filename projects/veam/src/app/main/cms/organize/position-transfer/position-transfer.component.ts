import { AfterViewInit, Component, OnDestroy, inject } from '@angular/core';
import { PositionModule } from '../../profile/applist/position/position.module';
import { CommonModule } from '@angular/common';

import { EnumTranslateKey, api } from 'alpha-global-constants';
import { CorePageHeaderComponent, CoreButtonGroupVnsComponent, BaseComponent, EnumCoreButtonVNSCode, IAlertOptions, ICoreButtonVNS, AppService, CorePageListService, MultiLanguageService, PositionTransferService, EvaluateDialogService, AlertService, AuthService, CoreApiProgressComponent, EvaluateDialogComponent, TranslatePipe } from 'ngx-histaff-alpha';
import { filter } from 'rxjs';
import { PositionExtendedComponent } from './position-extended.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-position-transfer',
  standalone: true,
  imports: [
    CommonModule,
    CorePageHeaderComponent,
    PositionModule,
    CoreButtonGroupVnsComponent,
    PositionExtendedComponent,
    EvaluateDialogComponent,
    CoreApiProgressComponent,
    FormsModule,
    TranslatePipe,
  ],
  providers: [
    PositionExtendedComponent,
  ],
  templateUrl: './position-transfer.component.html',
  styleUrl: './position-transfer.component.scss'
})
export class PositionTransferComponent extends BaseComponent implements AfterViewInit, OnDestroy {
  showmButtonTransfer: EnumCoreButtonVNSCode[] = [
    EnumCoreButtonVNSCode.NONE_HEADER_TRANSFER,
  ]
  showmCloning: EnumCoreButtonVNSCode[] = [EnumCoreButtonVNSCode.NONE_HEADER_CLONING];
  showmPositionTransferSave: EnumCoreButtonVNSCode[] = [EnumCoreButtonVNSCode.NONE_HEADER_POSITION_TRANSFER_SAVE]
  showmRevert: EnumCoreButtonVNSCode[] = [EnumCoreButtonVNSCode.NONE_HEADER_REVERT];
  showmRecruit: EnumCoreButtonVNSCode[] = [EnumCoreButtonVNSCode.NONE_HEADER_RECRUIT];
  buttonItems: EnumCoreButtonVNSCode[] = [
    EnumCoreButtonVNSCode.NONE_HEADER_CANCEL,
    EnumCoreButtonVNSCode.NONE_HEADER_CONFIRM
  ];
  leftInstanceNumber!: number;
  rightInstanceNumber!: number;
  longApiRunning!: boolean
  isCheckDataTransfer: boolean = false;
  pendingAction!: EnumCoreButtonVNSCode;
  alertOptions: IAlertOptions = {
    autoClose: true,
    keepAfterRouteChange: true,
    timeClose: 10000
  };
  onCorePageHeaderButtonClick($event: ICoreButtonVNS) {
    switch ($event.code) {
      case EnumCoreButtonVNSCode.NONE_HEADER_TRANSFER:
        this.transferPosition(this.positionTransferService.selectedIds, this.positionTransferService.selectOrgId);
        break;
      case EnumCoreButtonVNSCode.NONE_HEADER_CLONING:
        this.pendingAction = $event.code;
        this.evaluateDialogService.showConfirmDialog$.next(true);
        this.evaluateDialogService.createNew(undefined, undefined, undefined, undefined,
          EnumTranslateKey.UI_COMPONENT_TITLE_HU_EVALUATE_CHOOSE_FILE_TYPE_WANT_IMPORT, undefined, false, false, true);
        break;
      case EnumCoreButtonVNSCode.NONE_HEADER_POSITION_TRANSFER_SAVE:
        this.positionTransferSave();
        break;
      case EnumCoreButtonVNSCode.NONE_HEADER_REVERT:
        this.positionTransferRevert()
        break;
      default:
    }
  }
  instanceNumber!: number;
  title = EnumTranslateKey.UI_COMPONENT_TITLE_OM_POSITION_TRANSFER;
  appService = inject(AppService);
  corePageListService = inject(CorePageListService)

  constructor(public override mls: MultiLanguageService,
    private positionExtenedComponent: PositionExtendedComponent,
    private positionTransferService: PositionTransferService,
    public evaluateDialogService: EvaluateDialogService,
    private alertService: AlertService,
    private authService: AuthService) {
    super(mls)
  }

  override ngOnInit(): void {
    this.subscriptions.push(
      this.evaluateDialogService.dialogConfirmed$.pipe(
        filter(x => !!x)
      ).subscribe(x => {
        if (x?.confirmed) {
          if (this.pendingAction === EnumCoreButtonVNSCode.NONE_HEADER_CLONING) {
            this.cloningPosition(this.positionTransferService.selectedIds,
              this.positionTransferService.selectOrgId,
              this.evaluateDialogService.numberInput)
          }
        }
      })
    )
  }
  ngAfterViewInit(): void {
    setTimeout(() => {

    })
  }
  transferPosition(ids: number[], selectedIds: number) {
    if (ids == null) {
      this.alertService.warn(this.mls.trans('YOU_DO_NOT_CHOOSE_RECORD_NEED_TRANSFER'), this.alertOptions)
    }
    else if (selectedIds == null) {
      this.alertService.warn(this.mls.trans('YOU_DO_NOT_CHOOSE_ORGANIZATION_NEED_TRANSFER'), this.alertOptions)
    }
    else {
      const userId = this.authService.data$.value?.id;
      const request = { listId: ids, orgIdTransfer: selectedIds, userId: userId }
      this.subscriptions.push(
        this.appService.post(api.HU_POSITION_TRANSFER_POSITION, request)
          .subscribe(x => {
            if (x.ok && x.status === 200 && x.body?.statusCode === 200) {
              const leftRef = this.corePageListService.instances.filter(x => x.instanceNumber === this.leftInstanceNumber)
              const rightRef = this.corePageListService.instances.filter(x => x.instanceNumber === this.rightInstanceNumber)
              if (!!leftRef.length && !!rightRef.length) {
                leftRef[0].reloadFlag$.next(!leftRef[0].reloadFlag$.value)
                rightRef[0].reloadFlag$.next(!rightRef[0].reloadFlag$.value)
              }
              this.isCheckDataTransfer = true;
            }
          })
      )
    }
  }

  leftInstanceNumberSetter(e: any) {
    this.leftInstanceNumber = e;
  }

  rightInstanceNumberSetter(e: any) {
    this.rightInstanceNumber = e;
  }
  onProgressWindowClose(_: any) {
    this.longApiRunning = false;
  }

  cloningPosition(ids: number[], orgId: number, amount: number) {
    if (ids == null) {
      this.alertService.warn(this.mls.trans('YOU_DO_NOT_CHOOSE_RECORD_NEED_CLONING'), this.alertOptions)
    }
    else if (orgId == null) {
      this.alertService.warn(this.mls.trans('YOU_DO_NOT_CHOOSE_ORGANIZAITION_NEED_CLONING'), this.alertOptions)
    }
    else if (amount < 1) {
      this.alertService.warn(this.mls.trans('YOU_DO_NOT_CHOOSE_ORGANIZAITION_NEED_CLONING'), this.alertOptions)
    }
    else {
      const userId = this.authService.data$.value?.id;
      const request = { listId: ids, orgIdTransfer: orgId, amount: amount, userId: userId };
      this.subscriptions.push(
        this.appService.post(api.HU_POSITION_CLONING_POSITION, request)
          .subscribe(x => {
            if (x.ok && x.status === 200 && x.body?.statusCode === 200) {
              const leftRef = this.corePageListService.instances.filter(x => x.instanceNumber === this.leftInstanceNumber)
              const rightRef = this.corePageListService.instances.filter(x => x.instanceNumber === this.rightInstanceNumber)
              if (!!leftRef.length && !!rightRef.length) {
                leftRef[0].reloadFlag$.next(!leftRef[0].reloadFlag$.value)
                rightRef[0].reloadFlag$.next(!rightRef[0].reloadFlag$.value)
              }
              this.isCheckDataTransfer = true
            }
          })
      )
    }
  }
  positionTransferSave() {
    const userId = this.authService.data$.value?.id;
    const request = { userId: userId }
    this.subscriptions.push(
      this.appService.post(api.HU_POSITION_POSTION_TRANSFER_SAVE, request)
        .subscribe(x => {
          if (x.ok && x.status === 200 && x.body?.statusCode === 200) {
            const leftRef = this.corePageListService.instances.filter(x => x.instanceNumber === this.leftInstanceNumber)
            const rightRef = this.corePageListService.instances.filter(x => x.instanceNumber === this.rightInstanceNumber)
            if (!!leftRef.length && !!rightRef.length) {
              leftRef[0].reloadFlag$.next(!leftRef[0].reloadFlag$.value)
              rightRef[0].reloadFlag$.next(!rightRef[0].reloadFlag$.value)
            }
          }
        })
    )
  }
  positionTransferRevert() {
    const userId = this.authService.data$.value?.id;
    const request = { userId: userId };
    this.subscriptions.push(
      this.appService.post(api.HU_POSITION_POSTION_TRANSFER_REVERT, request)
        .subscribe(x => {
          if (x.ok && x.status === 200 && x.body?.statusCode === 200) {
            const leftRef = this.corePageListService.instances.filter(x => x.instanceNumber === this.leftInstanceNumber)
            const rightRef = this.corePageListService.instances.filter(x => x.instanceNumber === this.rightInstanceNumber)
            if (!!leftRef.length && !!rightRef.length) {
              leftRef[0].reloadFlag$.next(!leftRef[0].reloadFlag$.value)
              rightRef[0].reloadFlag$.next(!rightRef[0].reloadFlag$.value)
            }
          }
        })
    )

  }
  override ngOnDestroy(): void {
    const userId = this.authService.data$.value?.id;
    const request = { userId: userId }
    if (this.isCheckDataTransfer === true) {
      this.subscriptions.push(
        this.appService.post(api.HU_POSITION_POSTION_TRANSFER_DELETE, request)
          .subscribe(x => {
            console.log('ok');

          })
      )
    }
    this.isCheckDataTransfer = false
  }

}
