import { Component, Input, OnChanges, OnInit, SimpleChanges, AfterViewInit } from '@angular/core';

import * as Highcharts from "highcharts/highstock";
import { DASHBOARD_BAR_COLOR, MENU_OPTIONS_PRINT } from '../../../../../constants';
import { EnumTranslateKey, api } from 'alpha-global-constants';
import { CustomPrintChartComponent } from '../custom-print-chart/custom-print-chart.component';
import { BaseComponent, EnumIconClass, MultiLanguageService, AppService, IFormatedResponse } from 'ngx-histaff-alpha';


@Component({
  selector: 'app-new-emp-month-chart',
  templateUrl: './new-emp-month-chart.component.html',
  styleUrls: ['./new-emp-month-chart.component.scss'],
  providers: [CustomPrintChartComponent],
})
export class NewEmpMonthChartComponent extends BaseComponent implements OnChanges, OnInit, AfterViewInit {

  @Input() width!: number;
  @Input() height!: number;
  @Input() orgIds!: number[];

  isHidden: boolean = true;
  Highcharts = Highcharts;
  titleChart = EnumTranslateKey.UI_COMPONENT_TITLE_INCREASED_BY_MONTH;
  chartNo: boolean = false;
  defaultValue: any = [49.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4];
  newData!: any;
  menu = [
    {
      translateCode: EnumTranslateKey.UI_AUTH_PROFILE_MENU_SEE_PROFILE,
      iconClass: EnumIconClass.FEATHER_USER,
    },
    {
      translateCode: EnumTranslateKey.UI_AUTH_PROFILE_MENU_CHANGE_PASSWORD,
      iconClass: EnumIconClass.FEATHER_LOCK,
    },
  ]
  menuPrint = MENU_OPTIONS_PRINT;
  expandStateList: boolean = false;
  expandStateListPrint: boolean = false;
  options!: Highcharts.Options;
  dataExport!: any;

  constructor(
    public override mls: MultiLanguageService,
    private appService: AppService,
    private printChart: CustomPrintChartComponent,
  ) {
    super(mls)
  }

  resetOption(height: number) {
    this.options = {
      chart: {
        renderTo: "container",
        height: height - 50,

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
        categories: ['T1', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'T8', 'T9', 'T10', 'T11', 'T12'],
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
          text: 'Số lượng nhân viên',
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
        enabled: false,
        backgroundColor:
          Highcharts.defaultOptions.legend!.backgroundColor || // theme
          'rgba(255,255,255,0.25)'
      },

      series: [
        {
          name: 'Số lượng',
          type: 'column',
          yAxis: 1,
          data: this.newData ?? this.defaultValue,
          color: DASHBOARD_BAR_COLOR,
          states: {
            hover: {
              color: 'rgb(255, 141, 93)',
            }
          },
          tooltip: {
            valueSuffix: ' nhân viên'
          }
        },
        // {
        //   name: 'Tăng mới',
        //   type: 'spline',
        //   data: [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6],
        //   color: DASHBOARD_BAR_SECOND_SERIE,
        //   tooltip: {
        //     valueSuffix: ' nhân sự'
        //   }
        // }
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
          data: data,
          color: DASHBOARD_BAR_COLOR,
          states: {
            hover: {
              color: 'rgb(255, 141, 93)',
            }
          },
          tooltip: {
            valueSuffix: ' nhân viên'
          }
        },
        // {
        //   name: 'Tăng mới',
        //   type: 'spline',
        //   data: data[1],
        //   color: DASHBOARD_BAR_SECOND_SERIE,
        //   tooltip: {
        //     valueSuffix: ' nhân sự'
        //   }
        // }
      ]
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['height']) {
      this.resetOption(changes['height'].currentValue);
    }
    if (changes['orgIds']) {
      this.appService.post(api.HU_CONTRACT_DASHBOARD_NEW_EMP_MONTH, { orgIds: this.orgIds }).subscribe(x => {
        if (x.ok && x.status === 200) {
          const body = x.body as IFormatedResponse
          if (body.statusCode === 200) {
            this.newData = body.innerBody;
            this.dataExport = {
              xAxis: this.options.xAxis,
              data: body.innerBody,
            }
            this.bindData(body.innerBody)
          }
        }
      })
    }
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.subscriptions.push(
        this.appService.post(api.HU_CONTRACT_DASHBOARD_NEW_EMP_MONTH, { orgIds: [] }).subscribe(x => {
          if (x.ok && x.status === 200) {
            const body = x.body as IFormatedResponse
            if (body.statusCode === 200) {
              this.newData = body.innerBody;
              this.dataExport = {
                xAxis: this.options.xAxis,
                data: body.innerBody,
              }
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
  onAvatarBlockClick(): void {
    this.expandStateListPrint = false;
    this.expandStateList = !this.expandStateList;
  }
  onMenuItemClick(item: any): void {
    this.expandStateList = !this.expandStateList;
    // this.onHandleClickChange(item.value);
  }
  onMenuPrintBlockClick(): void {
    this.expandStateList = false;
    this.expandStateListPrint = !this.expandStateListPrint;
  }
  onMenuItemClickPrint(item: any): void {
    this.expandStateListPrint = !this.expandStateListPrint;
    this.isHidden = false
    setTimeout(() => {
      this.printChart.printChartColumn(item.fileData);
      this.isHidden = true;
    }, 1500)
  }
  onHandleClickChange() {
    this.chartNo = !this.chartNo;
  }
}
