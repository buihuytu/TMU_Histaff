import { Component, Input, OnChanges, OnInit, SimpleChanges, ViewEncapsulation,AfterViewInit } from '@angular/core';

import * as Highcharts from "highcharts/highstock";
import { DASHBOARD_BAR_COLOR, DASHBOARD_BAR_SECOND_SERIE } from '@vns-portal/constants';
import { api } from '@vns-portal/constants/api/apiDefinitions';
import { BaseComponent } from '@vns-portal/libraries/base-component/base/base.component';
import { MultiLanguageService } from '@vns-portal/services/multi-language.service';
import { AppService } from '@vns-portal/services/app.service';
import { IFormatedResponse } from '@vns-portal/interfaces/IFormatedResponse';
import { LayoutService } from '@vns-portal/services/layout.service';


@Component({
  selector: 'app-seniority-chart',
  templateUrl: './seniority-chart.component.html',
  styleUrls: ['./seniority-chart.component.scss']
})
export class SeniorityChartComponent extends BaseComponent implements OnChanges, OnInit,AfterViewInit {

  @Input() width!: number;
  @Input() height!: number;

  Highcharts = Highcharts;

  options!: Highcharts.Options

  constructor(
    public override mls: MultiLanguageService,
    public override layoutService: LayoutService,
    private appService: AppService
  ) {
    super(mls, layoutService)
  }

  resetOption(height: number) {
    this.options = {
      chart: {
        renderTo: "container",
        height: height - 100,
        // zoomType: 'xy',
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
        categories: ['Dưới 1 năm', 'Từ 1 đến 3 năm', 'Từ 3 đến 5 năm', 'Trên 5 năm'],
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
          text: 'Số lượng nhân viên ',
          style: {
            color: DASHBOARD_BAR_COLOR
          }
        }
      }, { // Secondary yAxis
        title: {
          text: 'Số lượng nhân viên ',
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

      series: [{
        name: 'Số lượng',
        type: 'column',
        yAxis: 1,
        data: [49, 10, 15, 20],
        color: DASHBOARD_BAR_COLOR,
        tooltip: {
          valueSuffix: ' nhân sự'
        }
      }]
    };
  }

  bindData(data: any[]) {
    this.options = {
      ...this.options,
      series: [
        {
          type: 'column',
          yAxis: 1,
          data: data,
          color: DASHBOARD_BAR_COLOR,
          tooltip: {
            valueSuffix: ' nhân sự'
          }  
        },
      ],
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['height']) {
      this.resetOption(changes['height'].currentValue);
    }
  }

 override ngOnInit(): void {
    this.subscriptions.push(
      this.mls.lang$.subscribe(x => this.lang = x)
    )

    this.resetOption(this.height)
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.subscriptions.push(
        this.appService.post(api.HU_CONTRACT_DASHBOARD_EMP_SENIORITY, {}).subscribe(x => {
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

}
