import { Component, OnInit, isDevMode } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EnumTranslateKey } from 'alpha-global-constants';
import { BaseComponent, IAlertOptions, MultiLanguageService, LayoutService, AuthService, ResponseService, AlertService, AppConfigService, IClientLoginRequest, IFormatedResponse, IAuthData, alertOptions } from 'ngx-histaff-alpha';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends BaseComponent implements OnInit {

  form: FormGroup;
  loading!: boolean;
  visiblePassword!: boolean;
  webSsoEnabled!: boolean;

  alertOptions: IAlertOptions = {
    autoClose: true,
    keepAfterRouteChange: false,
    timeClose: 5000,
  };
  constructor(
    public override mls: MultiLanguageService,
    private layoutService: LayoutService,
    private authService: AuthService,
    private fb: FormBuilder,
    private responseService: ResponseService,
    private alertService: AlertService,
    private router: Router,
    private appConfigService: AppConfigService
  ) {
    super(mls);
    this.form = this.fb.group({
      username: ["", [Validators.required, Validators.minLength(5)]],
      password: ["", [Validators.required, Validators.minLength(6)]],
      appType: ["PORTAL"],
      remember: [""]
    });
  }

  override ngOnInit(): void {
    this.webSsoEnabled = this.appConfigService.SAML2ADFS_ENABLED;
    this.subscriptions.push(
      this.mls.lang$.subscribe(x => this.lang = x)
    )
  }

  onSubmit() {

    this.loading = true;

    this.subscriptions.push(
      this.authService.userLogin(this.form.getRawValue() as IClientLoginRequest).subscribe(x => {
        this.loading = false;

        console.log(x)

        if (x.ok && x.status === 200) {
          const body: IFormatedResponse = x.body;
          this.responseService.resolve(body)

          if (body.statusCode === 200) {
            const newAuthData: IAuthData = {
              ...x.body.innerBody,
              loginTime: new Date().getTime()
            }
            this.authService.data$.next(newAuthData);
            this.router.navigateByUrl("/home")
          }
          // else{
          //   this.alertService.error(this.mls.trans(x.body.messageCode), alertOptions)
          // }

        } else {
          this.alertService.info(JSON.stringify(x, null, 2), alertOptions)
        }
      }
      )
    )

  }

  toggglePassword(event: any) {
    if (!!event) {
      var x = document.getElementById("passWord") as HTMLInputElement
      if (x?.type === "password") {
        x.type = "text";
        this.visiblePassword = true;
      } else {
        x.type = "password";
        this.visiblePassword = false;
      }
    }
  }

  ssoLogin(): void {
    if (!this.appConfigService.SAML2ADFS_ENABLED) {
      this.alertService.info(EnumTranslateKey.SSO_WAS_DISABLED)
    } else {
      const authorizationUrl = `${this.appConfigService.SAML2ADFS_IDP}?` +
        `wtrealm=${this.appConfigService.SAML2ADFS_IDENTIFIER}` +
        `&wa=${this.appConfigService.SAML2ADFS_WA_SIGNIN || 'wsignin1.0'}` +
        `&wreply=${this.appConfigService.BASE_URL}${this.appConfigService.SAML2ADFS_WREPLY}`

      if (isDevMode() || !!this.appConfigService.DEBUG_ENABLED) {
        alert(authorizationUrl);
      }

      window.location.href = authorizationUrl;
    }
  }

}
