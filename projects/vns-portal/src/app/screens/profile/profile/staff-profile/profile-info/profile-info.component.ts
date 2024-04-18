import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { api } from 'alpha-global-constants';
import { BaseComponent, MultiLanguageService, LayoutService, AuthService, AppService, RandomAvatarService, UrlService, IFormatedResponse } from 'ngx-histaff-alpha';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-profile-info',
  templateUrl: './profile-info.component.html',
  styleUrls: ['./profile-info.component.scss']
})
export class ProfileInfoComponent extends BaseComponent implements OnInit, AfterViewInit {
  employeeId!: number | undefined;
  subsctiptions: Subscription[] = [];
  data: any;
  defaultAvatar!: string;
  override lang = 'vi'

  constructor(
    public override mls: MultiLanguageService,
    private layoutService: LayoutService,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    private appService: AppService,
    private ras: RandomAvatarService,
    private urlService: UrlService
  ) {
    super(mls);
    this.defaultAvatar = ras.get();
    urlService.currentRouteUrl$.next('/profile/staff-profile')
  }

  override ngOnInit(): void {
    this.subscriptions.push(
      this.mls.lang$.subscribe(x => this.lang = x)
    )
  }
  ngAfterViewInit(): void {
    this.subsctiptions.push(
      this.authService.data$.subscribe(x => {
        if (!!x) {
          this.employeeId = x.employeeId
          if (!!this.employeeId) {
            this.appService.get(api.PORTAL_PROFILE_INFO + `?employeeId=${this.employeeId}`).subscribe(res => {
              const body: IFormatedResponse = res.body
              if (body.statusCode === 200) {
                this.data = body.innerBody
                console.log(this.data);
                
              }
            })

          }
        }
      })

    )
  }
}

