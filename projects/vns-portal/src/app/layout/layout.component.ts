import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild, inject } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Location } from '@angular/common';

import { Subscription, filter } from 'rxjs';
import { SwPush, SwUpdate } from '@angular/service-worker';
import { EnumTranslateKey, api } from 'alpha-global-constants';
import { IAuthData, UrlService, ICoreButtonVNS, IAlertOptions, AuthService, RoutingService, MultiLanguageService, LayoutService, SocketService, AppService, AlertService, CheckForUpdateService, EnumSwUpdateVersionUpdatesEventType, PushNotificationService, alertOptions } from 'ngx-histaff-alpha';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit, AfterViewInit, OnDestroy {

  subscriptions: Subscription[] = [];
  authData!: IAuthData | null;
  avatar!: string;
  headerCode!: string;
  lang!: string;
  landscapeMode!: boolean;
  // cần fetch từ API hoặc lấy từ servcie
  iAmHome: boolean = false;

  appInitializing!: boolean;
  loading!: boolean;
  submitting!: boolean;
  menuOpen!: boolean;
  leftbarReduced!: boolean;
  keyword!: string;
  sid!: string;
  username!: string;
  expiresAt!: string;

  currentScreenCaption!: string;

  urlService = inject(UrlService)

  @ViewChild('container') container!: ElementRef;

  readonly VAPID_KEYS = {
    publicKey: "BDhmn-qXm0vst6gSexlnGMWw6HSawOaUTiCN-sri3L4DbxerPzdkNkEJ7_Z1HB4zSf2SMmytAaztXv15E4pA_aA",
    privateKey: "iUIMopUXR-8DzAyzo8K248f71VttCtNIFrDj70X1xlk"
  }
  buttonClick: ICoreButtonVNS[] = [];

  alertOptions: IAlertOptions = {
    autoClose: true,
    keepAfterRouteChange: false,
    timeClose: 5000,
  };

  currentVersion!: string;

  constructor(
    private authService: AuthService,
    private routingService: RoutingService,
    private router: Router,
    private route: ActivatedRoute,
    private mls: MultiLanguageService,
    private swPush: SwPush,
    public layoutService: LayoutService,
    private location: Location,
    private socketService: SocketService,
    private appService: AppService,
    public checkForUpdateService: CheckForUpdateService,
    swUpdate: SwUpdate,
    private alertService: AlertService,
    private pushNotificationService: PushNotificationService
  ) {

    swUpdate.versionUpdates.subscribe(evt => {
      if (evt.type === EnumSwUpdateVersionUpdatesEventType.NO_NEW_VERSION_DETECTED) {
        this.currentVersion = evt.version.hash
      }
    })


    layoutService.cellHeight = Number(
      getComputedStyle(document.documentElement)
        .getPropertyValue('--cell-height')
        .replace('px', '')
    );

    checkForUpdateService.pendingAction = "";
  }

  ngOnInit(): void {
    this.subscriptions.push(
      this.authService.data$.pipe(
        filter(data => !!data && !!!this.authService.stopSubscription),
      ).subscribe((authData: IAuthData | null) => {
        this.sid = authData!.refreshToken.user;
        this.avatar = authData!.avatar;
        this.username = authData!.userName;
        const { exp } = this.authService.parseJwt(this.authService.data$.value?.token!);
        this.expiresAt = new Date(exp).toLocaleTimeString();
        this.socketService.createHubConnection();
      })
    )
    this.subscriptions.push(
      this.appService.get(api.GET_COUNT_NOTIFY_UNREAD + this.authService.data$.value?.employeeId).subscribe((x: any) => {
        if (!!x && x.status == 200) {
          this.layoutService.notificationCount$.next(x.body.innerBody)
        }
      })
    )
    this.subscriptions.push(
      this.authService.data$.subscribe(x => this.authData = x)
    )
    this.subscriptions.push(
      this.mls.lang$.subscribe(x => this.lang = x)
    )
    this.iAmHome = (this.route.snapshot as any)._routerState.url === '/home';

    this.subscriptions.push(
      this.router.events.subscribe(event => {
        if (event instanceof NavigationEnd) {
          this.iAmHome = event.url === '/home'
        }
      })
    )

    this.subscriptions.push(
      this.layoutService.landscapeMode$.subscribe(x => {
        this.landscapeMode = x

        this.layoutService.availableHeight$.next(
          window.innerHeight
          - this.layoutService.headerHeight - this.layoutService.basicSpacing
        )
      })
    )

    this.subscriptions.push(
      this.routingService.navigationHeaderCode$.subscribe(x => {
        setTimeout(() => this.headerCode = x)
      })
    )

    this.subscriptions.push(
      this.layoutService.clickEdit$.subscribe(x => this.buttonClick = x)
    )

    this.subscriptions.push(
      this.routingService.currentScreenCaption$.subscribe(x => {
        console.log("routingService.currentScreenCaption$.value", x || "undefined")
        this.currentScreenCaption = x
      })
    )

    this.subscriptions.push(
      this.pushNotificationService.pushSubscription$.pipe(filter(x => !!x)).subscribe(x => {
        if (this.authService.data$.value?.id) {

          this.subscriptions.push(
            this.appService.post(api.SW_PUSH_SUBSCRIPTION_FIND_SUBSCRIPTION, {
              userId: this.authService.data$.value?.id!,
              endpoint: x?.endpoint,
            }).subscribe(x1 => {
              if (x1.ok && x1.status === 200 && x1.body?.statusCode === 200 && x1.body?.innerBody === false) {

                // Finally adding to db
                this.subscriptions.push(
                  this.appService.post(api.SW_PUSH_SUBSCRIPTION_CREATE, {
                    userId: this.authService.data$.value?.id!,
                    endpoint: x?.endpoint,
                    expirationTime: x?.expirationTime,
                    subscription: JSON.stringify(x)
                  }).subscribe(x => {
                    if (x.ok && x.status === 200 && x.body?.statusCode === 200) {
                      this.alertService.success(EnumTranslateKey.UI_SW_PUSH_SUBSCRIPTION_CREATED, alertOptions)
                    } else {
                      this.alertService.error(EnumTranslateKey.UI_SW_PUSH_SUBSCRIPTION_CREATE_FAILED, alertOptions)
                    }
                  })
                )

              }
            })
          )
        }
      })
    )

  }
  editChange(event: any) {
    if (event) {
      console.log(this.router.url)
      switch (this.router.url) {
        case "/profile/staff-profile/curriculum":
          this.router.navigateByUrl(`/profile/staff-profile/curriculum/curriculum-edit`)
          break;
        default:
          break;
      }
    }
  }
  clickChange(event: any) {
    if (event) {
      console.log(this.router.url)
      switch (this.router.url) {
        case "/profile/staff-profile/curriculum":
          this.router.navigateByUrl(`/profile/staff-profile/curriculum/curriculum-edit`)
          break;
        case "/profile/family-info":
          this.router.navigateByUrl(`/profile/family-info/family-info-edit`)
          break;
        case "/profile/certificate":
          this.router.navigateByUrl(`/profile/certificate/certificate-edit`)
          break;
        default:
          break;
      }
    }
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.pushNotificationService.subscribeToNotifications();
    })
  }

  subscribeToNotifications() {

    this.swPush.requestSubscription({
      serverPublicKey: this.VAPID_KEYS.publicKey
    })
      .then(sub => {
        console.log("sub", sub)
        /*
        this.newsletterService.addPushSubscriber(sub).subscribe()
        */
      })
      .catch(err => console.error("Could not subscribe to notifications", err));
  }

  goBack(): void {
    if (!!this.urlService.previousRouteUrl$.value) {
      this.router.navigateByUrl(this.urlService.previousRouteUrl$.value);
    } else {
      this.location.back()
    }

  }

  ngOnDestroy(): void {
    this.subscriptions.map(x => x?.unsubscribe())
  }

  goBackHome(): void {
    this.router.navigateByUrl("/home");
  }

  goToNotification(): void {
    this.router.navigateByUrl("/notification");
  }

  goInfo(): void {
    this.router.navigateByUrl("/profile");
  }

  goChangePassword(): void {
    this.router.navigateByUrl("/change-password");
  }

  logout(): void {
    this.subscriptions.push(
      this.authService.userLogout().subscribe(x => {
        if (x.ok && x.status === 200 && x.body?.statusCode === 200) {
          this.authService.data$.next(null);
          this.authService.postLogout();
          this.alertService.info(this.mls.trans(x.body.innerBody), this.alertOptions)
        }
      })
    )
  }

}
