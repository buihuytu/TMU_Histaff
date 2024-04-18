import { AfterViewInit, Component, OnInit, Renderer2 } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EnumTranslateKey, api } from 'alpha-global-constants';
import { BaseDropdownComponent, MultiLanguageService, DomService, AuthService, DialogService, AppService, AlertService, RandomAvatarService, IAuthData, ICoreFormSection, EnumFormBaseContolType, IAlertOptions, EnumCoreButtonVNSCode } from 'ngx-histaff-alpha';
import { filter } from 'rxjs';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.scss'
})
export class ChangePasswordComponent extends BaseDropdownComponent implements OnInit, AfterViewInit {
  
  id!: string;
  fullname!: string;
  avatar!: string;
  blankAvatar!: string;

  //@ViewChild('container') override container!: ElementRef;

  instanceNumber!: number;
  isFirstLogin!: boolean;

  constructor(
    public override mls: MultiLanguageService,
    public override renderer: Renderer2,
    public override domService: DomService,
    public authService: AuthService,
    public dialogService: DialogService,
    private appService: AppService,
    private alertService: AlertService,
    private ras: RandomAvatarService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    super(mls, renderer, domService);
    this.blankAvatar = ras.get();

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
            this.router.navigateByUrl("/home");
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
    this.router.navigateByUrl("/home");
    
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
