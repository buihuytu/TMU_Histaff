import { Component, Input, OnChanges, OnInit, SimpleChanges ,AfterViewInit} from '@angular/core';

import * as Highcharts from "highcharts/highstock";
import { DASHBOARD_BAR_COLOR, DASHBOARD_BAR_SECOND_SERIE } from '@vns-portal/constants';
import { api } from '@vns-portal/constants/api/apiDefinitions';
import { BaseComponent } from '@vns-portal/libraries/base-component/base/base.component';
import { MultiLanguageService } from '@vns-portal/services/multi-language.service';
import { AppService } from '@vns-portal/services/app.service';
import { IFormatedResponse } from '@vns-portal/interfaces/IFormatedResponse';
import { LayoutService } from '@vns-portal/services/layout.service';


@Component({
  selector: 'app-emp-month-chart',
  templateUrl: './emp-month-chart.component.html',
  styleUrls: ['./emp-month-chart.component.scss']
})
export class EmpMonthChartComponent extends BaseComponent implements OnChanges, OnInit,AfterViewInit {
  
  @Input() width!: number;
  @Input() height!: number;

  Highcharts = Highcharts;

  options!: Highcharts.Options;

  constructor(
    public override mls: MultiLanguageService,
    public override layoutService: LayoutService,
    private appService: AppService
  ) {
    super(mls, layoutService)
  }

  resetOption(height: number) {
    this.options ={
      chart: {
        renderTo: "container",
        height: height - 100,
        //zoomType: 'xy',
        style: {
          fontFamily: "Roboto",
        },
      },
      credits: {
        enabled: false,
      },
      title: {
        text: "Biểu đồ tổng số nhân viên theo tháng",
        style: {
          display: 'none'
        }
      },
      xAxis: [{
        categories: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6',
          'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'],
        crosshair: true
      }],
      yAxis: [{ // Primary yAxis
        labels: {
          format: '{value}',
          style: {
            color: DASHBOARD_BAR_COLOR
          }
        },
        title: {
          text: 'Tăng mới',
          style: {
            color: DASHBOARD_BAR_COLOR
          }
        }
      }, { // Secondary yAxis
        title: {
          text: 'Số lượng nhân viên',
          style: {
            color: DASHBOARD_BAR_COLOR
          }
        },
        labels: {
          format: '{value}',
          style: {
            color: DASHBOARD_BAR_COLOR
          }
        },
        opposite: true
      }],

      tooltip: {
        shared: true
      },
      legend: {
        layout: 'vertical',
        align: 'left',
        x: 460,
        verticalAlign: 'top',
        y: 50,
        floating: true,
        backgroundColor:
          Highcharts.defaultOptions.legend!.backgroundColor || // theme
          'rgba(255,255,255,0.25)'
      },

      series: [
        {
        name: 'Số lượng',
        type: 'column',
        yAxis: 1,
        data: [49.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4],
        color: DASHBOARD_BAR_COLOR,
        tooltip: {
          valueSuffix: ' nhân sự'
        }
      }, 
      {
        name: 'Tăng mới',
        type: 'spline',
        data: [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6],
        color: DASHBOARD_BAR_SECOND_SERIE,
        tooltip: {
          valueSuffix: ' nhân sự'
        }
      }
    ]
    };
  }

  bindData(data: any[]) {

    this.options = {
      ...this.options,
      series: [
        {
        name: 'Số lượng',
        type: 'column',
        yAxis: 1,
        data: data[0],
        color: DASHBOARD_BAR_COLOR,
        tooltip: {
          valueSuffix: ' nhân sự'
        }
      }, 
      {
        name: 'Tăng mới',
        type: 'spline',
        data: data[1],
        color: DASHBOARD_BAR_SECOND_SERIE,
        tooltip: {
          valueSuffix: ' nhân sự'
        }
      }
    ]
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['height']) {
      this.resetOption(changes['height'].currentValue);
    }
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.subscriptions.push(
        this.appService.post(api.HU_CONTRACT_DASHBOARD_EMP_MONTH, {}).subscribe(x => {
          if (x.ok && x.status === 200) {
            const body = x.body as IFormatedResponse
            if (body.statusCode === 200) {
              this.bindData(body.innerBody)
            }
          }
        })
      )
    })
  }
  override ngOnInit(): void {
    this.subscriptions.push(
      this.mls.lang$.subscribe(x => this.lang = x)
    )

    this.resetOption(this.height)
  }

}
