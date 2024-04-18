import { Component, OnInit, ViewEncapsulation, OnDestroy, isDevMode, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginInterface } from './login.interface';
import { Subscription } from 'rxjs';
import { AlertService, AppConfigService, AppInitializationService, AuthService, IAuthData, IClientLoginRequest, IFormatedResponse, MultiLanguageService, alertOptions } from 'ngx-histaff-alpha';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class LoginComponent implements OnInit, OnDestroy {
  form: FormGroup;
  showRePassword = false;
  showPassword: boolean = false;
  passwordInputType: string = 'password';
  loading!: boolean;

  initializationError!: string;

  logo!: string;

  subscriptions: Subscription[] = [];

  model: LoginInterface = new LoginInterface();
  authService = inject(AuthService)
  appConfigService = inject(AppConfigService)
  mls = inject(MultiLanguageService)
  alertService = inject(AlertService)
  public appInitializationService = inject(AppInitializationService)

  constructor(
    private fb: FormBuilder,
    private router: Router,

  ) {
    this.form = this.fb.group({
      username: this.fb.control('', [
        Validators.required,
        Validators.maxLength(50),
      ]),
      password: this.fb.control('', [
        Validators.required,
        Validators.maxLength(50),
      ]),
      appType: this.fb.control('WEBAPP'),
      remember: this.fb.control(''),
    });
  }

  ngOnInit(): void { }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.logo = this.appConfigService.LOGO_LOGIN;
    })
  }

  onSubmit() {
    if (!!this.appInitializationService.primaryInitialized) {
      this.loading = true;
      this.subscriptions.push(
        this.authService
          .userLogin(this.form.getRawValue() as IClientLoginRequest)
          .subscribe((x) => {
            this.loading = false;
            if (x.ok && x.status === 200) {
              const body: IFormatedResponse = x.body;
              //this.responseService.resolve(body)
              if (body.statusCode === 200) {
                const newAuthData: IAuthData = {
                  ...body.innerBody,
                  loginTime: new Date().getTime(),
                };
                this.authService.data$.next(newAuthData);
                //this.responseService.resolve(body);
                this.router.navigate(['/cms/dashboard']);
              } else {
                this.alertService.info(
                  this.mls.trans(x.body.message),
                  alertOptions
                );
              }
            } else {
              if (isDevMode()) {
                //this.alertService.error(JSON.stringify(x, null, 2), noneAutoClosedAlertOptions);
              } else {
                this.alertService.info('Login failed', alertOptions);
              }
            }
          })
      );
    } else {
      window.location.reload();
    }
  }

  toggleShowPassword() {
    this.showPassword = !this.showPassword;
    this.passwordInputType = this.showPassword ? 'text' : 'password';
  }

  showForgotPassword: boolean = false;

  onClickForgotPassword(): void {
    this.showForgotPassword = true;
  }

  onClickButtonSkip(value: any): void {
    this.showForgotPassword = false;
  }

  onLoadingFullscreen(value: any): void {
    this.loading = value;
  }

  ngOnDestroy(): void {
    this.subscriptions.map((x) => {
      if (x) x.unsubscribe();
    });
  }
}
