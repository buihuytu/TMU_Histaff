import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, Renderer2, ViewChild, ViewEncapsulation } from '@angular/core';
import { BehaviorSubject, Subject, Subscription, fromEvent, zip } from 'rxjs';
import { buffer, debounceTime, filter, map } from 'rxjs/operators';
import { Router } from '@angular/router';

import { HubConnection, HubConnectionState } from '@microsoft/signalr';
import { AlertService, AppConfigService, AppInitializationService, AppService, AuthService, CheckForUpdateService, ConfigService, DESKTOP_SCREEN_HEDER_HEIGHT, DialogService, EnumSignalRType, EnumSwUpdateVersionUpdatesEventType, HubConnectionService, IAuthData, IFormatedResponse, IHubConnectionActivity, INavigatorItem, IOrgTreeItem, LayoutService, MOBILE_SCREEN_HEDER_HEIGHT, MenuService, MultiLanguageService, NavigatorService, OrganizationService, PushNotificationService, RecursiveService, RoutingService, SocketService, alertOptions, liner_to_nested_array_script } from 'ngx-histaff-alpha';
import { EnumTranslateKey, api } from 'alpha-global-constants';
import { SwUpdate } from '@angular/service-worker';

@Component({
    selector: 'app-layout',
    templateUrl: './applayout.component.html',
    styleUrls: ['./applayout.component.scss'],
    encapsulation: ViewEncapsulation.Emulated
})
export class AppLayoutCompnent implements OnInit, OnDestroy, AfterViewInit {

    @ViewChild('appNavigating') appNavigating!: ElementRef;
    @ViewChild('container') container!: ElementRef;

    secretLeftClickStream$ = new BehaviorSubject<any>(null)
    secretRightClickStream$ = new BehaviorSubject<any>(null)
    avatarClickStream$ = new BehaviorSubject<any>(null)

    resizeStream$ = fromEvent(window, 'resize');
    hubConnection!: HubConnection;
    hubConnectionState!: HubConnectionState;
    showDialogState: boolean | undefined = true;
    navigating!: boolean;
    url!: string;

    headerHeight!: number;

    // appIsStable!: boolean;

    lang!: string;

    appConfig: any = {
        showLayout: 'false'
    };

    unsubscribe = new Subject<void>();

    logo!: string;

    /*
    MKF
    */
    appInitializing!: boolean;
    loading!: boolean;
    submitting!: boolean;
    menuOpen!: boolean;
    leftbarReduced!: boolean;
    keyword!: string;
    sid!: string;
    username!: string;
    expiresAt!: string;
    avatar!: string;
    /*=============================*/

    mouseclickListenerFn!: () => void;
    mouseclick$: Subject<number> = new Subject<number>();
    newlayoutVersion: boolean = true;

    authenticated!: boolean;

    subscriptions: Subscription[] = [];


    scale: number = 1;

    currentVersion!: string;

    constructor(
        private _configService: ConfigService,
        private renderer: Renderer2,
        private authService: AuthService,
        private menuService: MenuService,
        private navigatorService: NavigatorService,
        public routingService: RoutingService,
        private mls: MultiLanguageService,
        private router: Router,
        private appInitializationService: AppInitializationService,
        public layoutService: LayoutService,
        private hubConnectionService: HubConnectionService,
        private socketService: SocketService,
        private recursiveService: RecursiveService,
        private organizationService: OrganizationService,
        private dialogService: DialogService,
        private appConfigService: AppConfigService,
        private appService: AppService,
        public checkForUpdateService: CheckForUpdateService,
        swUpdate: SwUpdate,
        private pushNotificationService: PushNotificationService,
        private alertService: AlertService
    ) {

        this.layoutService.headerHeight$.subscribe(x => this.headerHeight = x);

        swUpdate.versionUpdates.subscribe(evt => {
            if (evt.type === EnumSwUpdateVersionUpdatesEventType.NO_NEW_VERSION_DETECTED) {
                this.currentVersion = evt.version.hash
            }
        })

        let currentItem = localStorage.getItem("currentItem");
        if (currentItem != null) {
            this.navigatorService.clickedItem$.next(JSON.parse(currentItem))
        }
        checkForUpdateService.pendingAction = "";
    }

    private resetCssVariables(leftbarReduced: boolean, isMenuOpen: boolean): void {

        const full = getComputedStyle(document.documentElement).getPropertyValue('--size-left-bar-full-width');
        const compact = getComputedStyle(document.documentElement).getPropertyValue('--size-left-bar-compact-width');

        let left = "0px";
        if (window.innerWidth <= 992) {
            if (!!isMenuOpen) {
                if (!!leftbarReduced) {
                    left = compact;
                } else {
                    left = full;
                }
            } else {
                left = '0px';
            }
        } else {
            if (!!leftbarReduced) {
                left = compact;
            } else {
                left = full;
            }
        }
        document.documentElement.style.setProperty('--size-left-bar-current-width',
            !!leftbarReduced ? compact : full
        )
        //document.documentElement.style.setProperty('--position-core-composition-left-left', left)
    }


    ngOnInit(): void {

        this.subscriptions.push(
            this.mls.lang$.subscribe(x => this.lang = x)
        )

        this.subscriptions.push(
            this.routingService.navigationUrl$.subscribe(x => this.url = x)
        )

        this.subscriptions.push(
            this.navigatorService.clickedItem$.pipe(filter(x => !!x))
                .subscribe((item: INavigatorItem | null) => {
                    if (!!item?.sysMenuServiceMethod) {
                        console.log(item?.sysMenuServiceMethod)
                        switch (item?.sysMenuServiceMethod) {
                            case 'CHANGE_LANGUAGE:vi':
                                this.mls.lang$.next("vi")
                                break;
                            case 'CHANGE_LANGUAGE:en':
                                this.mls.lang$.next("en")
                                break;
                            case 'LOG_OUT':
                                this.authService.userLogout().subscribe(x => {
                                    if (x.ok && x.status === 200) {
                                        this.authService.postLogout();
                                    }
                                });
                                break;
                            case 'ONLINE-USERS':
                                this.router.navigate([{ outlets: { popupAux2: ['online-users'] } }]);
                                break;
                            default:
                                break;
                        }
                    }
                })
        )

        this.subscriptions.push(
            this._configService._configSubject.subscribe(data => {
                this.appConfig.showLayout = data;
            })
        )

        this.subscriptions.push(
            this.authService.data$.subscribe(x => this.authenticated = !!x)
        )

        this.subscriptions.push(
            this.appInitializationService.initializing$.subscribe(x => this.appInitializing = x)
        )

        this.subscriptions.push(
            this.mouseclick$.pipe(
                buffer(this.mouseclick$.pipe(debounceTime(250))),
                map(clicks => clicks.length),
                filter(clicksLength => clicksLength >= 10))
                .subscribe(_ => {
                    this.newlayoutVersion = !this.newlayoutVersion;
                })
        )
        this.subscriptions.push(
            this.menuService.isOpen$.subscribe(x => this.menuOpen = x)
        )

        /* START: Subscription for resize event */
        this.subscriptions.push(
            this.resizeStream$.pipe(
                debounceTime(200)
            ).subscribe((e: any) => {

                const innerWidth = e.target.innerWidth;
                if (innerWidth > 992) {
                    this.layoutService.headerHeight$.next(DESKTOP_SCREEN_HEDER_HEIGHT);
                } else {
                    this.layoutService.headerHeight$.next(MOBILE_SCREEN_HEDER_HEIGHT);
                }

                this.resetAppLayoutServiceProps();

                this.resetCssVariables(this.leftbarReduced, this.menuOpen);

            })
        )
        /* END: Subscription for resize event */

        this.subscriptions.push(
            this.hubConnectionService.hubConnection$.subscribe(connection => {
                this.hubConnection = connection!;
                this.hubConnectionState = connection?.state!;
                if (!!connection) {
                    const message: IHubConnectionActivity = {
                        sid: this.sid,
                        username: this.username,
                        avatar: this.avatar,
                        signalType: EnumSignalRType.LOG_IN,
                        message: `${this.username} has logged in`,
                        loginTime: this.authService.data$.value?.loginTime!,
                        data: null,

                    }
                    connection.invoke("SendMessage", message);
                }
            })
        )


        this.subscriptions.push(
            this.dialogService.dialogStateOpen$.subscribe(x => this.showDialogState = x)
        )

        this.subscriptions.push(
            this.secretLeftClickStream$.pipe(
                buffer(this.secretLeftClickStream$.pipe(debounceTime(250))),
                map(m => m.length),
                filter(s => s >= 5)
            ).subscribe(_ => this.dialogService.dialogStateOpen$.next(true))
        )

        this.subscriptions.push(
            this.secretRightClickStream$.pipe(
                buffer(this.secretRightClickStream$.pipe(debounceTime(250))),
                map(m => m.length),
                filter(s => s >= 5)
            ).subscribe(_ => this.router.navigateByUrl('/root/in-memory'))
        )

        this.subscriptions.push(
            this.avatarClickStream$.pipe(
                buffer(this.avatarClickStream$.pipe(debounceTime(250))),
                map(m => m.length),
                filter(s => s >= 5)
            ).subscribe(_ => this.router.navigateByUrl("/cms/system/mutation-log"))
        )

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

                const orgLinerData = authData?.orgIds;
                this.organizationService.linerData$.next(orgLinerData! as IOrgTreeItem[])
                const cloneCopy = JSON.parse(JSON.stringify(orgLinerData))

                console.group("orgLinerData...", orgLinerData);

                if (!!orgLinerData) {

                    if (typeof Worker !== 'undefined') {

                        console.log('🟢 Worker works')
                        // Create a new
                        const worker = new Worker(liner_to_nested_array_script)
                        worker.addEventListener("message", ({ data }) => {

                            console.log("OrgTreeData calculation finished!", new Date().getTime())
                            this.organizationService.loading = false;
                            this.organizationService.orgTreeData$.next(data.list);
                            this.organizationService.linerData$.next(data.rawList);

                        })


                        console.log("OrgTreeData is being calculated by Worker...");
                        console.log("this.organizationService.status$.value", this.organizationService.status$.value);

                        worker.postMessage({
                            list: cloneCopy,
                            keyField: 'id',
                            titleField: 'name',
                            parentField: 'parentId',
                            activeField: 'active',
                            checkedField: 'checked',
                            expandedField: 'expanded',
                            status: this.organizationService.status$.value, // <=== this had been already retrieved on app-initialization
                            orderBy: 'orderNum'
                        });

                    } else {
                        // Web workers are not supported in this environment.
                        // You should add a fallback so that your program still executes correctly.

                        console.log("this.organizationService.status$.value", this.organizationService.status$.value)

                        this.subscriptions.push(
                            this.recursiveService.linerArrayToNestedArray(
                                cloneCopy,
                                'id',
                                'name',
                                'parentId',
                                'active',
                                'checked',
                                'expand',
                                this.organizationService.status$.value // <=== this had been already retrieved on app-initialization
                            )
                                .subscribe(data => {
                                    console.log("data", data)
                                    this.organizationService.orgTreeData$.next(data.list);
                                    this.organizationService.linerData$.next(data.rawList);
                                })
                        )
                    }
                }

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

    resetAppLayoutServiceProps(): void {
        const leftBarCurrentWidth = this.layoutService.leftBarCurrentWidth$.value;
        const layoutHeaderHeight = this.layoutService.layoutHeaderHeight$.value;
        this.layoutService.contentContainerWidth$.next(window.innerWidth - leftBarCurrentWidth);
        this.layoutService.contentContainerHeight$.next(window.innerHeight - layoutHeaderHeight);

        document.documentElement.style.setProperty('--content-container-width', this.layoutService.contentContainerWidth$.value + 'px')
        document.documentElement.style.setProperty('--content-container-height', this.layoutService.contentContainerHeight$.value + 'px')
    }

    ngAfterViewInit(): void {

        setTimeout(() => {

            this.subscriptions.push(
                this.routingService.navigating$.subscribe(x => {
                    this.navigating = x
                })
            )

            this.resetCssVariables(this.layoutService.leftbarReduced$.value, this.menuOpen);
            //this.layoutService.leftbarReduced$.next(true)
            this.subscriptions.push(
                this.layoutService.leftbarReduced$.subscribe(x => {
                    if (localStorage) {
                        localStorage.setItem('leftbarReduced', JSON.stringify(x))
                    }
                    this.leftbarReduced = x;
                    //console.warn("this.layoutService.leftbarReduced$.subscribe => this.resetCssVariables")
                    this.resetCssVariables(x, this.menuOpen);

                })
            )

            this.logo = this.appConfigService.LOGO_HEADER;
        })



        this.mouseclickListenerFn = this.renderer.listen('window', 'click', (e: MouseEvent) => {
            if (e.which === 1) {
                this.mouseclick$.next(0);
            }
        })

        setTimeout(() => {
            this.subscriptions.push(
                zip([
                    this.appInitializationService.initializing$.pipe(
                        filter(x => !!!x)
                    ),
                    this.authService.data$.pipe(
                        filter(x => !!x)
                    )
                ]).subscribe(_ => {

                    setTimeout(() => {
                        this.resetAppLayoutServiceProps();
                    })

                })
            )
        })

        setTimeout(() => {
            //Loading 
            this.subscriptions.push(
                this.appService.get(api.SYS_USER_QUERY_ORG_LIST_WITH_POSITIONS).subscribe(x => {
                    this.loading = false;
                    if (x.ok && x.status === 200) {
                        const body: IFormatedResponse = x.body
                        if (body.statusCode === 200) {
                            const linearItems = body.innerBody;
                            const copy = JSON.parse(JSON.stringify(linearItems))
                            this.recursiveService.buildTreeData(copy).then(x => {
                                this.organizationService.orgTreeDataWithPositions$.next(x)
                            }).catch(error => {
                                console.log(error)
                            })
                        }
                    }
                })
            )
        })

        setTimeout(() => {
            this.pushNotificationService.subscribeToNotifications();
        })

    }

    onClickSecretLeft(): void {
        this.secretLeftClickStream$.next(new Date().getTime())
    }

    onClickSecretRight(): void {
        this.secretRightClickStream$.next(new Date().getTime())
    }

    onClickAvatar(): void {
        this.avatarClickStream$.next(new Date().getTime())
    }

    onKeywordChange(args: any) {

    }

    switchLanguage(): void {
        if (this.mls.lang$.value === 'vi') {
            this.mls.lang$.next('en')
        } else {
            this.mls.lang$.next('vi')
        }
    }

    onLeftbarRecucerClick() {
        this.layoutService.leftbarReduced$.next(!this.layoutService.leftbarReduced$.value);
        const leftBar = getComputedStyle(document.documentElement).getPropertyValue('--size-left-bar-current-width');
        this.layoutService.leftBarCurrentWidth$.next(Number(leftBar))
        this.layoutService.contentContainerWidth$.next(window.innerWidth - Number(leftBar))
        document.documentElement.style.setProperty('--content-container-width', window.innerWidth - Number(leftBar) + 'px')
    }

    onIsOpenChange(e: boolean) {
        this.menuService.isOpen$.next(e);
    }

    ngOnDestroy(): void {
        this.unsubscribe.unsubscribe();
        if (this.mouseclickListenerFn) this.mouseclickListenerFn();
        this.subscriptions.map(x => {
            if (x) x.unsubscribe();
        })
    }
}
