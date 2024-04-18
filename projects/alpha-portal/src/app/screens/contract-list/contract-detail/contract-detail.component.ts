import { Component, Input } from '@angular/core';
import { api } from 'alpha-global-constants';
import { BaseComponent, MultiLanguageService, LayoutService, AppService, RandomAvatarService, UrlService, IFormatedResponse } from 'ngx-histaff-alpha';
import { Subject, Subscription } from 'rxjs';
import { ContractListService } from '../contract-list/contract-list.service';

export interface IContractDetail {
  id: number,
  name: string;
  jobName: string,
  email: string,
  phone: string,
  employeeCode: string,
  positionName: string,
  birthdate: Date,
  gender: string
}

@Component({
  selector: 'app-contract-detail',
  templateUrl: './contract-detail.component.html',
  styleUrls: ['./contract-detail.component.scss']
})
export class ContractDetailComponent extends BaseComponent {
  override lang = 'vi'
  employeeObj: any;
  defaultAvatar!: string;

  constructor(
    public override mls: MultiLanguageService,
    public layoutService: LayoutService,
    private appService: AppService,
    private contractListService: ContractListService,
    private ras: RandomAvatarService,
    private urlService: UrlService
  ) {
    super(mls)
    this.defaultAvatar = ras.get();
    urlService.currentRouteUrl$.next('/contract-list')
  }
  override subscriptions!: Subscription[];

  override ngOnInit(): void {
    this.subscriptions.push(
      this.mls.lang$.subscribe(x => this.lang = x)
    )
    this.subscriptions.push(
      this.appService.get(api.HU_EMPLOYEE_CV_GET_CONTRACT_DETAIL + "?employeeId=" + this.contractListService.employeeCvId)
        .subscribe(x => {
          const body: IFormatedResponse = x.body;
          if (body.statusCode === 200) {
            this.employeeObj = body.innerBody
          }
        }
        )
    )
  }
}
