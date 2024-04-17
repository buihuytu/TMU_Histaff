import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ProfileRecruitmentCenterService } from './profile-recruitment-center.service';
import { ActivatedRoute, Router } from '@angular/router';
import { EnumTranslateKey } from 'alpha-global-constants';
import { BaseComponent, MultiLanguageService, DialogService, IFormatedResponse, ICoreButtonVNS } from 'ngx-histaff-alpha';
import { Subscription, filter, Observable, of } from 'rxjs';

interface IRecruitmentCenterButtonClickState {
  buttonCode: string;
  leftMenuItemIndex: number;
  leftMenuItemCode: EnumTranslateKey;
  tabIndex: number;
  tabHeaderCode: EnumTranslateKey;
  accordionSectorIndex: number;
  accordionSectorCode: EnumTranslateKey;
}

@Component({
  selector: 'app-profile-recruitment-center',
  templateUrl: './profile-recruitment-center.component.html',
  styleUrl: './profile-recruitment-center.component.scss'
})
export class ProfileRecruitmentCenterComponent extends BaseComponent implements OnInit, OnDestroy {
  title = EnumTranslateKey.UI_COMPONENT_TITLE_PERSONNEL_CANDIDATE

  employeeCvId!: number;
  employeeId!: number;
  employee: any;
  employeeCv: any;
  getPersonDataSubscription!: Subscription;

  constructor(
    public override mls: MultiLanguageService,
    private profileRecruitmentCenterService: ProfileRecruitmentCenterService,
    private router: Router,
    private route: ActivatedRoute,
    private dialogService: DialogService
  ) {
    super(mls);

    this.getPersonDataSubscription = this.route.paramMap.subscribe(x => {
      this.employeeId = Number(atob(x.get('id')!));
      this.getPersonData();
    })


    this.router = router;

  }

  getPersonData(): void {

    this.profileRecruitmentCenterService.getCandidateById({ id: this.employeeId }).subscribe(x => {
      if (x.ok && x.status === 200) {
        const body: IFormatedResponse = x.body;
        if (body.statusCode === 200) {
          this.employee = body.innerBody
          this.profileRecruitmentCenterService.candidate$.next(body.innerBody)
          this.profileRecruitmentCenterService
          this.subscriptions.push(
            this.profileRecruitmentCenterService.getCandidateCvById({ id: body.innerBody.profileId }).subscribe(y => {
              if (y.ok && y.status === 200) {
                const cvBody: IFormatedResponse = y.body;
                if (cvBody.statusCode === 200) {
                  this.employeeCv = cvBody.innerBody
                  this.profileRecruitmentCenterService.candidateCv$.next(cvBody.innerBody)
                }
              }
            })
          )
        }
      }

      this.profileRecruitmentCenterService.reloadFlag$.next(false);

    })

  }

  override ngOnInit(): void {
    this.subscriptions.push(
      this.mls.lang$.subscribe(x => this.lang = x)
    )

    this.subscriptions.push(
      this.profileRecruitmentCenterService.reloadFlag$.pipe(filter(m => !!m)).subscribe(x => {
        this.getPersonData()
      })
    )

    // load 2 basic objects for the first time
    this.profileRecruitmentCenterService.reloadFlag$.next(true);

  }

  onCorePageHeaderButtonClick(e: ICoreButtonVNS): void {
    const state: IRecruitmentCenterButtonClickState = {
      buttonCode: e.code,
      leftMenuItemIndex: this.profileRecruitmentCenterService.leftMenuActiveItemIndex,
      leftMenuItemCode: this.profileRecruitmentCenterService.leftMenuActiveItemCode,
      tabIndex: this.profileRecruitmentCenterService.tabActiveIndex,
      tabHeaderCode: this.profileRecruitmentCenterService.tabActiveHeader,
      accordionSectorIndex: this.profileRecruitmentCenterService.accordionActiveSectorIndex,
      accordionSectorCode: this.profileRecruitmentCenterService.accordionActiveSectorCode
    }
    // alert(JSON.stringify(state, null, 2))
    if (state.buttonCode === "CREATE") {
      if (state.tabHeaderCode === EnumTranslateKey.UI_WORKING_HISTORY_TAB_OUTSIDE_COMPANY) {
        this.router.navigateByUrl('/cms/profile/business/working-before');
      } else if (state.tabHeaderCode === EnumTranslateKey.UI_PERSONNEL_MENU_ITEM_FAMILY) {
        this.router.navigateByUrl('/cms/profile/business/family');
      } else if (state.tabHeaderCode === EnumTranslateKey.UI_PERSONNEL_MENU_ITEM_TERMINATE) {
        this.router.navigateByUrl('/cms/profile/business/leavejob');
      } else if (state.tabHeaderCode === EnumTranslateKey.UI_PERSONNEL_MENU_ITEM_DISCIPLINE) {
        this.router.navigateByUrl('/cms/profile/business/discipline');
      } else if (state.tabHeaderCode === EnumTranslateKey.UI_PERSONNEL_CENTER_TAB_CONTRACTINFO) {
        const paramAdd = window.btoa('0');
        this.router.navigate(["/cms/profile/business/contractinfor/", paramAdd]);
      } else if (state.tabHeaderCode === EnumTranslateKey.UI_PERSONNEL_CENTER_TAB_CONTRACTAPPENDIX) {
        const paramAdd = window.btoa('0');
        this.router.navigate(["/cms/profile/business/contractappendix/", paramAdd]);
      }
    }
  }

  canDeactivate(): Observable<boolean> | boolean {
    if (this.profileRecruitmentCenterService.avatar === this.profileRecruitmentCenterService.pendingAvatar || !!!this.profileRecruitmentCenterService.avatar && !!!this.profileRecruitmentCenterService.pendingAvatar) {
      return of(true);
    } else {
      this.dialogService.busy = true;
      this.dialogService.showConfirmDialog$.next(true);
      this.dialogService.title$.next(EnumTranslateKey.UI_CORE_CONFIRM_DIALOG_TITLE);
      this.dialogService.body$.next(EnumTranslateKey.UI_CORE_CONFIRM_DIALOG_BODY_CHANGES_WILL_BE_LOST);
      this.dialogService.okButtonText$.next(EnumTranslateKey.UI_CORE_CONFIRM_DIALOG_BUTTON_CONFIRM);
      this.dialogService.cancelButtonText$.next(EnumTranslateKey.UI_CORE_CONFIRM_DIALOG_BUTTON_GO_BACK_TO_EDIT_FORM);
      const observable = this.dialogService.canDeactivate$.asObservable();
      return observable;
    }
  }

  override ngOnDestroy(): void {
    this.getPersonDataSubscription?.unsubscribe()
    this.subscriptions.map(x => x?.unsubscribe())
    this.profileRecruitmentCenterService.avatar = null;
    this.profileRecruitmentCenterService.pendingAvatar = null;
  }
}
