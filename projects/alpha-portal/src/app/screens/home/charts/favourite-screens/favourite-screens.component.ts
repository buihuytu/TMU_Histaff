import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { Color, ScaleType } from '@swimlane/ngx-charts';

import { favourite_screens_script } from '../../../../../../src/assets/js/favourite_screens_wk';
import { BaseComponent, MultiLanguageService, LayoutService, UserActivityService } from 'ngx-histaff-alpha';

@Component({
  selector: 'app-favourite-screens',
  templateUrl: './favourite-screens.component.html',
  styleUrl: './favourite-screens.component.scss'
})
export class FavouriteScreensComponent extends BaseComponent implements AfterViewInit, OnDestroy {

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
  showYAxisLabel = true;
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
    private userActivityService: UserActivityService
  ) {
    super(mls)


    if (typeof Worker !== 'undefined') {
      console.log("🟢🟢 Worker works");
      this.worker = new Worker(favourite_screens_script);
      this.worker.addEventListener('message', ({ data }) => {
        this.single = data.single;
      });
    }


  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.subscriptions.push(
        this.userActivityService.userActivity$.subscribe(data => {
          if (this.worker) {
            this.worker.postMessage({
              activities: data,
              currentSingle: JSON.parse(JSON.stringify(this.single)),
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
