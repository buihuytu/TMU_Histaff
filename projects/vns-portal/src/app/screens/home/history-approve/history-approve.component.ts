import { AfterViewInit, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { EnumTranslateKey, api } from 'alpha-global-constants';
import { BaseComponent, MultiLanguageService, LayoutService, AppService, AuthService } from 'ngx-histaff-alpha';
import { Subscription } from 'rxjs';

export interface IHistoryApprove{
  typeName: string;
  date: Date;
  statusName: string;
}

@Component({
  selector: 'app-history-approve',
  templateUrl: './history-approve.component.html',
  styleUrl: './history-approve.component.scss'
})
export class HistoryApproveComponent extends BaseComponent implements OnChanges, AfterViewInit {
  @Input() width!: number;
  @Input() caption!: EnumTranslateKey;
  @Input() apiPath!: api;
  columnCount!: number;
  list: IHistoryApprove[] = [];
  override subscriptions: Subscription[] = [];
  time!: number;
  constructor(
    public override mls: MultiLanguageService,
    public layoutService: LayoutService,
    private appService: AppService,
    private authService: AuthService
  ){
    super(mls)
    this.time = new Date().getSeconds()
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['width']) {
      if (changes['width'].currentValue) {
        this.columnCount = Math.floor((changes['width'].currentValue - this.layoutService.basicSpacing) / (this.layoutService.comingSoonAvatarSize + this.layoutService.basicSpacing))
      }
    }
  }
  ngAfterViewInit(): void {
    setTimeout(() => {
      this.subscriptions.push(
        this.appService.get(this.apiPath + `?employeeId=${this.authService.data$.value?.employeeId}&time=${this.time}`)
        .subscribe(x => {
          this.list = x.body.innerBody
        })
      )
    })
  }
}
