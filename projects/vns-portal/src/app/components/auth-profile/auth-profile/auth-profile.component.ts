import { AfterViewInit, Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Observable, filter, fromEvent } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, Validators } from '@angular/forms';
import { EnumTranslateKey, api } from 'alpha-global-constants';
import { AppConfigService } from 'ngx-histaff-alpha';
import { EnumIconClass, BaseDropdownComponent, MultiLanguageService, DomService, AuthService, OrganizationService, HubConnectionService, DialogService, AppService, AlertService, RandomAvatarService, IAuthData, ICoreFormSection, EnumFormBaseContolType, IFormatedResponse, IAlertOptions, EnumCoreButtonVNSCode } from 'ngx-histaff-alpha';

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
  blankAvatar!: string;
  smartAvatar!: string;

  @ViewChild('avatarImg') avatarImg!: ElementRef;

  error$!: Observable<any>;

  menu: IAuthProfileMenuItem[] = [
    {
      translateCode: EnumTranslateKey.UI_AUTH_PROFILE_MENU_SEE_PROFILE,
      iconClass: EnumIconClass.FEATHER_USER,
    },
    {
      translateCode: EnumTranslateKey.UI_AUTH_PROFILE_MENU_CHANGE_PASSWORD,
      iconClass: EnumIconClass.FEATHER_LOCK,
    },
    // {
    //   translateCode: EnumTranslateKey.UI_AUTH_PROFILE_MENU_LOG_OUT,
    //   iconClass: EnumIconClass.FEATHER_LOG_OUT,
    // },
  ]

  instanceNumber!: number;
  isFirstLogin!: boolean;

  constructor(
    public override mls: MultiLanguageService,
    public override renderer: Renderer2,
    public override domService: DomService,
    public authService: AuthService,
    private router: Router,
    private appConfigService: AppConfigService,
    private route: ActivatedRoute,
    private organizationService: OrganizationService,
    private hubConnectionService: HubConnectionService,
    public dialogService: DialogService,
    private appService: AppService,
    private alertService: AlertService,
    private ras: RandomAvatarService
  ) {
    super(mls, renderer, domService);
    this.blankAvatar = ras.get();

    this.captionCode = EnumTranslateKey.UI_COMPONENT_TITLE_TENANT_USER_CHANGE_PASSWORD;
  }

  override ngOnInit(): void {
    this.subscriptions.push(
      this.mls.lang$.subscribe(x => this.lang = x)
    )
    this.subscriptions.push(

      this.authService.data$.pipe(filter(x => !!x)).subscribe((x: IAuthData | null) => {
        this.id = x?.id!;
        this.fullname = x?.fullName!;
        this.smartAvatar = this.appConfigService.BASE_URL + "/static/avatars/" + (x?.avatar || this.authService.profileAvatar || "");
        this.instanceNumber = new Date().getTime();
      }),
      this.appService.get("/api/SysUser/GetByStringIdPortal" + "?id=" + this.id + "&time=" + this.instanceNumber).subscribe(res => {

        this.isFirstLogin = res.body.innerBody.isFirstLogin;

        if (this.isFirstLogin == true) {
          this.showPopup = true;
        }
      })
    )
  }

  ngAfterViewInit(): void {

    setTimeout(() => {
      /**
      * This events get called by all clicks on the page
      */
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

      this.error$ = fromEvent(this.avatarImg.nativeElement, 'error');

      this.subscriptions.push(
        this.error$.subscribe(x => {
          this.smartAvatar = this.blankAvatar
        })
      )

    })



  }

  onAvatarBlockClick(): void {
    // Tiến BA yêu cầu bấm vào AVT
    // thì hiện ra dropdown
    this.expandState = !this.expandState;

    // this.router.navigateByUrl("/profile");
  }




  showPopup!: boolean;
  captionCode!: EnumTranslateKey;
  entityTable = "SYS_USER";
  form!: FormGroup;

  onFormCreated(e: FormGroup): void {
    this.form = e;
  }

  sections: ICoreFormSection[] =
    [
      {
        // caption: ...,
        // iconClass: ...,
        rows: [
          [
            {
              flexSize: 0,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_COMMON_ID,
              field: 'id',
              value: (this.authService.data$.value as IAuthData).refreshToken.user,
              controlType: EnumFormBaseContolType.TEXTBOX,
              type: 'string',
              hidden: true // To hide id field
            },
            {
              flexSize: 12,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_USER_OLD_PASSWORD,
              field: 'oldPassword',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              type: 'password',
              validators: [
                {
                  name: 'required',
                  validator: Validators.required,
                  errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
                },
                {
                  name: 'minLength',
                  validator: Validators.minLength(6),
                  errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_MIN_LENGTH,
                }
              ]
            },
          ],
          [
            {
              flexSize: 12,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_USER_NEW_PASSWORD,
              field: 'newPassword',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              type: 'password',
              validators: [
                {
                  name: 'required',
                  validator: Validators.required,
                  errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
                },
                {
                  name: 'minLength',
                  validator: Validators.minLength(8),
                  errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_MIN_LENGTH,
                }
              ]
            },
          ],
          [
            {
              flexSize: 12,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_USER_NEW_PASSWORD_CONFIRM,
              field: 'confirmNewPassword',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              type: 'password',
              validators: [
                {
                  name: 'required',
                  validator: Validators.required,
                  errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
                },
                {
                  name: 'minLength',
                  validator: Validators.minLength(8),
                  errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_MIN_LENGTH,
                }
              ]
            },
          ],
        ]
      }
    ];

  onMenuItemClick(item: IAuthProfileMenuItem): void {
    switch (item.translateCode) {
      case EnumTranslateKey.UI_AUTH_PROFILE_MENU_SEE_PROFILE:
        this.router.navigateByUrl("/profile");
        break;
      case EnumTranslateKey.UI_AUTH_PROFILE_MENU_CHANGE_PASSWORD:
        // bật pop up lên
        this.showPopup = true;
        break;
      case EnumTranslateKey.UI_AUTH_PROFILE_MENU_LOG_OUT:
        this.subscriptions.push(
          this.authService.userLogout().subscribe(x => {
            if (x.ok && x.status === 200) {
              const body: IFormatedResponse = x.body;
              if (body.statusCode === 200) {
                this.authService.postLogout();
              }
            }
          })
        )
        break;
      default:
    }
    this.expandState = !this.expandState;
  }

  alertOptions: IAlertOptions = {
    autoClose: true,
    keepAfterRouteChange: true,
    timeClose: 10000
  };

  onClickSubmit(event: any) {
    //LAM MUA LAM GIO O DAY

    if (!!event) {
      var payloadData = JSON.parse(event);

      this.appService.post(api.SYS_USER_CHANGE_PASSWOR_PORTAL, payloadData).subscribe(x => {
        if (x.ok && x.status == 200) {
          if (x.body.statusCode == 200) {
            // đóng pop up
            this.showPopup = false;
          }
          else {
            // không đóng pop up
            this.showPopup = true;
          }


          // show alert success
          this.alertService.info(this.mls.trans(x.body.messageCode, this.lang), this.alertOptions);
        } else {
          // show alert fail
          this.alertService.info(this.mls.trans(x.body.messageCode, this.lang), this.alertOptions);
        }
      });

    }
  }

  onClickCancel(event: any) {
    //LAM MUA LAM GIO O DAY
    this.showPopup = false;

    this.subscriptions.push(
      this.authService.userLogout().subscribe(x => {
        if (x.ok && x.status === 200) {
          if (this.isFirstLogin == true) {
            this.authService.data$.next(null);
            this.alertService.info(this.mls.trans(x.body.innerBody), this.alertOptions)
          }
        }
      })
    )
  }

  formInitStringValue!: string;

  onFormReinit(e: string): void {
    this.formInitStringValue = e;
  }

  buttonItems: EnumCoreButtonVNSCode[] = [
    EnumCoreButtonVNSCode.CANCEL,
    EnumCoreButtonVNSCode.SAVE_PASSWORD
  ];

}
