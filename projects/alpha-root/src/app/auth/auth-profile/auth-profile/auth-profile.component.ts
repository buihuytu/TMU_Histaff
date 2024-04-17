import { AfterViewInit, Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EnumTranslateKey } from 'alpha-global-constants';
import { EnumIconClass, BaseDropdownComponent, MultiLanguageService, DomService, AuthService, OrganizationService, HubConnectionService, DialogService, IAuthData, RandomAvatarService, AppConfigService } from 'ngx-histaff-alpha';
import { Observable, filter, fromEvent } from 'rxjs';

interface IAuthProfileMenuItem {
  translateCode: EnumTranslateKey;
  iconClass: EnumIconClass;
}

@Component({
  selector: 'app-auth-profile',
  templateUrl: './auth-profile.component.html',
  styleUrls: ['./auth-profile.component.scss']
})
export class AuthProfileComponent extends BaseDropdownComponent implements OnInit, AfterViewInit {

  id!: string;
  fullname!: string;
  avatar!: string;
  smartAvatar!: string;

  avatarError$!: Observable<any>;

  @ViewChild('avatarImg') avatarImg!: ElementRef;

  menu: IAuthProfileMenuItem[] = [
    {
      translateCode: EnumTranslateKey.UI_AUTH_PROFILE_MENU_SEE_PROFILE,
      iconClass: EnumIconClass.FEATHER_USER,
    },
    {
      translateCode: EnumTranslateKey.UI_AUTH_PROFILE_MENU_CHANGE_PASSWORD,
      iconClass: EnumIconClass.FEATHER_LOCK,
    },
    {
      translateCode: EnumTranslateKey.UI_AUTH_PROFILE_MENU_LOG_OUT,
      iconClass: EnumIconClass.FEATHER_LOG_OUT,
    },
  ]

  constructor(
    public override mls: MultiLanguageService,
    public override renderer: Renderer2,
    public override domService: DomService,
    private authService: AuthService,
    private router: Router,
    private appConfigService: AppConfigService,
    private dialogService: DialogService,
    private ras: RandomAvatarService,
  ) {
    super(mls, renderer, domService);
    this.smartAvatar = this.appConfigService.BASE_URL + "/static/avatars/" + (this.authService.data$.value?.avatar || this.authService.profileAvatar || "");
  }

  override ngOnInit(): void {
    this.subscriptions.push(
      this.mls.lang$.subscribe(x => this.lang = x)
    )
    this.subscriptions.push(
      this.authService.data$.pipe(filter(x => !!x)).subscribe((x: IAuthData | null) => {
        this.id = x?.id!;
        this.fullname = x?.fullName!;
        this.avatar = x?.avatar!;
      })
    )
  }

  ngAfterViewInit(): void {

    setTimeout(() => {

      this.listenerFn = this.renderer.listen('window', 'click', (e: Event) => {
        /*
         * handle click outside
         */
        if (this.container && !!!this.container.nativeElement.contains(e.target)) {
          this.expandState = false;
        }
      })

      const maxZIndex = this.domService.getMaxZIndex();
      this.container.nativeElement.style.setProperty('--max-z-index', maxZIndex + 1);
      if (!!this.height) this.container.nativeElement.style.setProperty('--height', this.height);

      this.avatarError$ = fromEvent(this.avatarImg.nativeElement, 'error');

      this.subscriptions.push(
        this.avatarError$.subscribe(_ => this.smartAvatar = this.ras.get())
      )

    })

  }

  onAvatarBlockClick(): void {
    this.expandState = !this.expandState;
  }

  onMenuItemClick(item: IAuthProfileMenuItem): void {
    switch (item.translateCode) {
      case EnumTranslateKey.UI_AUTH_PROFILE_MENU_SEE_PROFILE:
        var empId;
        this.authService.data$.subscribe((data) => (empId = data?.employeeId));
        console.log(empId);
        if (!!empId) {
          this.router.navigateByUrl(`/cms/profile/business/staffprofile/${btoa(empId)}/personnel-profile`);
        } else {
          // to-do
          this.dialogService.title$.next(EnumTranslateKey.UI_CORE_DIALOG_SERVICE_INFO)
          this.dialogService.body$.next(EnumTranslateKey.ACCOUNT_NOT_EXITS_EMPLOYEE)
          this.dialogService.okButtonText$.next(EnumTranslateKey.UI_CORE_CONFIRM_DIALOG_BUTTON_CONFIRM)
          this.dialogService.cancelButtonText$.next(EnumTranslateKey.UI_CORE_CONFIRM_DIALOG_BUTTON_GO_BACK_TO_EDIT_FORM)
          this.dialogService.showCancelOnly$.next(false);
          this.dialogService.busy = true;
          this.dialogService.showConfirmDialog$.next(true);
        }
        break;
      case EnumTranslateKey.UI_AUTH_PROFILE_MENU_CHANGE_PASSWORD:
        this.router.navigate(['cms', 'change-password', btoa((this.authService.data$.value as IAuthData).refreshToken.user)]);
        break;
      case EnumTranslateKey.UI_AUTH_PROFILE_MENU_LOG_OUT:
        this.subscriptions.push(
          this.authService.userLogout().subscribe(x => {
            if (x.ok && x.status === 200) {
              this.authService.postLogout();
            }
          })
        )
        break;
      default:
    }
    this.expandState = !this.expandState;
  }

}
