import { Component, Input, OnChanges, OnInit, SimpleChanges,AfterViewInit } from '@angular/core';

import * as Highcharts from "highcharts/highstock";
import { PIE_COLORS } from '@vns-portal/constants';

import { api } from '@vns-portal/constants/api/apiDefinitions';
import { BaseComponent } from '@vns-portal/libraries/base-component/base/base.component';
import { MultiLanguageService } from '@vns-portal/services/multi-language.service';
import { AppService } from '@vns-portal/services/app.service';
import { IFormatedResponse } from '@vns-portal/interfaces/IFormatedResponse';
import { LayoutService } from '@vns-portal/services/layout.service';

@Component({
  selector: 'app-contract-chart',
  templateUrl: './contract-chart.component.html',
  styleUrls: ['./contract-chart.component.scss']
})
export class ContractChartComponent  extends BaseComponent implements OnChanges, OnInit,AfterViewInit {

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


  ngOnChanges(changes: SimpleChanges): void {
    if (changes['height']) {
      this.resetOption(changes['height'].currentValue);
    }
  }

  resetOption(height: number) {
    this.options = {
      chart: {
        renderTo: "container",
        plotShadow: false,
        height: height - 100,
        type: "pie",
        style: {
          fontFamily: "Roboto",
        },
      },
      credits: {
        enabled: false,
      },
  
      title: {
        text: '',
        style: {
          display: 'none'
        }
      },
      tooltip: {
        pointFormat: "<b>{point.y}/{point.total}</b>  ",
      },
      accessibility: {
        point: {
          valueSuffix: "%",
        },
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: "pointer",
          dataLabels: {
            enabled: true,
            format: "<b>{point.name}</b>: {point.percentage:.1f} %",
          },
          showInLegend: false,
          colors: PIE_COLORS,
  
        }
      },
      series: [
        {
          type: "pie",
          data: [
            {
              // ID: 7,
              name: "Hợp đồng học viêc",
              y: 1,
            },
            {
              // ID: 8,
              name: "Hợp đồng thử việc",
              y: 1,
            },
            {
              // ID: 9,
              name: "Hợp đồng chính thức",
              y: 1,
            },
          ],
        },
      ],
    };
  }

  bindData(data: any[]) {

    this.options = {
      ...this.options,
      series: [
        {
          type: "pie",
          data: data
        },
      ],
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
        this.appService.post(api.HU_CONTRACT_TYPE_DASHBOARD_CONTRACT, {}).subscribe(x => {
          if (x.ok && x.status === 200) {
            const body = x.body as IFormatedResponse
            if (body.statusCode === 200) {
              body.innerBody.map((x: any) => {
                if (!!!x.name) x.name = this.mls.trans('UNDEFINED');
              })
              this.bindData(body.innerBody)
            }
          }
        })
      )
    })
  }
}
