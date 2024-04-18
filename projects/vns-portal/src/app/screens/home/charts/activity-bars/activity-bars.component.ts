import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { Color, ScaleType } from '@swimlane/ngx-charts';

import { activity_data_to_clicks_script } from '../../../../../../src/assets/js/user_activity_wk';
import { CoreNavigationTrackerComponent, BaseComponent, MultiLanguageService, LayoutService, UserActivityService, AuthService } from 'ngx-histaff-alpha';

@Component({
  selector: 'app-activity-bars',
  templateUrl: './activity-bars.component.html',
  styleUrl: './activity-bars.component.scss',
  providers: [CoreNavigationTrackerComponent]
})
export class ActivityBarsComponent extends BaseComponent implements AfterViewInit, OnDestroy {

  width: number = 700;
  height: number = 240;
  fitContainer: boolean = true;

  view: [number, number] = [600, 240];
  // options for the chart
  showXAxis = false;
  showYAxis = false;
  gradient = true;
  showLegend = false;
  showXAxisLabel = false;
  xAxisLabel = 'Screen';
  showYAxisLabel = false;
  yAxisLabel = 'Count';
  timeline = true;
  doughnut = true;
  colorScheme: Color = {
    name: 'myScheme',
    selectable: true,
    group: ScaleType.Ordinal,
    domain: ['#9370DB', '#87CEFA', '#FA8072', '#FF7F50', '#90EE90', '#9370DB']
  };
  //pie
  showLabels = true;
  labelFormatting = (x: any) => x

  // data goes here
  single = [];

  worker!: Worker;

  constructor(
    public override mls: MultiLanguageService,
    public layoutService: LayoutService,
    private userActivityService: UserActivityService,
    public authService: AuthService,
    private coreNavigationTrackerComponent: CoreNavigationTrackerComponent
  ) {
    super(mls)


    if (typeof Worker !== 'undefined') {
      console.log("🟢🟢 Worker works");
      this.worker = new Worker(activity_data_to_clicks_script);
      this.worker.addEventListener('message', ({ data }) => {
        this.single = data.single;
      });
    }


  }

  onActivityHistoryReset(): void {
    this.coreNavigationTrackerComponent.resetActivityHistory();
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.subscriptions.push(
        this.userActivityService.userActivity$.subscribe(data => {
          if (this.worker) {
            this.worker.postMessage({
              activities: data
            });
          }
        })
      )
    })
  }

  override ngOnDestroy(): void {
    this.subscriptions.map(x => x?.unsubscribe());
    this.worker.terminate();
  }

}
