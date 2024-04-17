import { Component, OnInit } from '@angular/core';
import { PersonnelCenterService } from '../personnel-center.service';
import { Subscription, map } from 'rxjs';
import { CommendService } from './commend.service';
import { EnumTranslateKey } from 'alpha-global-constants';
import { MultiLanguageService } from 'ngx-histaff-alpha';
@Component({
  selector: 'app-commend',
  templateUrl: './commend.component.html',
  styleUrls: ['./commend.component.scss'],
})
export class CommendComponent implements OnInit {
  subscriptions: Subscription[] = [];
  no = EnumTranslateKey.UI_COMPONENT_TITLE_HU_COMMEND_NO;
  title = EnumTranslateKey.UI_COMPONENT_TITLE_HU_COMMEND_INFO;
  signDate = EnumTranslateKey.UI_COMPONENT_TITLE_HU_COMMEND_SIGN_DATE;
  effectDate = EnumTranslateKey.UI_COMPONENT_TITLE_HU_COMMEND_EFFECT_DATE;
  money = EnumTranslateKey.UI_COMPONENT_TITLE_HU_COMMEND_MONEY;
  reason = EnumTranslateKey.UI_COMPONENT_TITLE_HU_COMMEND_REASON;
  commendType = EnumTranslateKey.UI_COMPONENT_TITLE_HU_COMMEND_TYPE;
  rewardName = EnumTranslateKey.UI_COMPONENT_TITLE_HU_COMMEND_REWARD;
  orgLevelName =
    EnumTranslateKey.UI_COMPONENT_TITLE_HU_COMMEND_COMMEND_ORG_LEVEL;
  year = EnumTranslateKey.UI_COMPONENT_TITLE_HU_COMMEND_YEAR;
  paymentNo = EnumTranslateKey.UI_COMPONENT_TITLE_HU_COMMEND_PAYMENT_NO;
  signPaymentDate =
    EnumTranslateKey.UI_COMPONENT_TITLE_HU_COMMEND_SIGN_PAYMENT_DATE;
  rewardLevelName = EnumTranslateKey.UI_COMPONENT_TITLE_HU_COMMEND_REWARD_LEVEL;

  awardTitleName = EnumTranslateKey.UI_COMPONENT_TITLE_HU_COMMEND_AWARD_TITLE;

  lang!: string;
  commends!: any[];
  employee: any;
  constructor(
    private personnelCenterService: PersonnelCenterService,
    private mls: MultiLanguageService,
    private commendService: CommendService
  ) {}

  ngOnInit(): void {
    (this.personnelCenterService.leftMenuActiveItemIndex = 5),
      this.subscriptions.push(this.mls.lang$.subscribe((x) => (this.lang = x)));
    this.subscriptions.push(
      this.personnelCenterService.employee$.subscribe((x) => {
        this.employee = x;
        this.subscriptions.push(
          this.commendService
            .getListComendByEmployee(x.id)
            .pipe(
              map((commends: any) => {
                return commends.body.innerBody;
              })
            )
            .subscribe((response) => {
              this.commends = response;
            })
        );
      })
    );
  }
}
