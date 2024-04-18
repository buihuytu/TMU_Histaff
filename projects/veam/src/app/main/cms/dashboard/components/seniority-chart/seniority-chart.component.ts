import { Component, Input, OnChanges, OnInit, SimpleChanges, AfterViewInit } from '@angular/core';

import * as Highcharts from "highcharts/highstock";
import { DASHBOARD_BAR_COLOR, MENU_OPTIONS_PRINT } from '../../../../../constants';
import { EnumTranslateKey, api } from 'alpha-global-constants';
import { CustomPrintChartComponent } from '../custom-print-chart/custom-print-chart.component';
import { BaseComponent, EnumIconClass, MultiLanguageService, AppService, IFormatedResponse } from 'ngx-histaff-alpha';


@Component({
  selector: 'app-seniority-chart',
  templateUrl: './seniority-chart.component.html',
  styleUrls: ['./seniority-chart.component.scss'],
  providers: [CustomPrintChartComponent],
})
export class SeniorityChartComponent extends BaseComponent implements OnChanges, OnInit, AfterViewInit {

  @Input() width!: number;
  @Input() height!: number;
  @Input() orgIds!: number[];

  isHidden: boolean = true;
  expandStateList: boolean = false;
  expandStateListPrint: boolean = false;
  titleChart = EnumTranslateKey.UI_AUTH_PROFILE_MENU_SEE_PROFILE;
  chartNo: number = 0;
  Highcharts = Highcharts;
  dataNew!: any;
  nameNew!: any;
  dataExport!: any;

  menu = [
    {
      translateCode: EnumTranslateKey.UI_COMPONENT_TITLE_LABOR_BY_AGE,//Biểu đồ thống kê lao động theo độ tuổi',// EnumTranslateKey.UI_AUTH_PROFILE_MENU_SEE_PROFILE,
      iconClass: EnumIconClass.FEATHER_USER,
      value: 0,
    },
    {
      translateCode: EnumTranslateKey.UI_COMPONENT_TITLE_TITLE_CHART,//'Biểu đồ thống kê chức danh',// EnumTranslateKey.UI_AUTH_PROFILE_MENU_CHANGE_PASSWORD,
      iconClass: EnumIconClass.FEATHER_LOCK,
      value: 1,
    },
    {
      translateCode: EnumTranslateKey.UI_COMPONENT_TITLE_TRAINING_LEVEL,//'Thống kê trình độ đào tạo',// EnumTranslateKey.UI_AUTH_PROFILE_MENU_CHANGE_PASSWORD,
      iconClass: EnumIconClass.FEATHER_LOCK,
      value: 2,
    },
  ]
  menuPrint = MENU_OPTIONS_PRINT;
  defaultValue: any = ['Dưới 1 năm', 'Từ 1 đến 3 năm', 'Từ 3 đến 5 năm', 'Trên 5 năm'];
  options!: Highcharts.Options

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
        categories: this.nameNew ?? this.defaultValue,
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
        enabled: false,
        backgroundColor:
          Highcharts.defaultOptions.legend!.backgroundColor || // theme
          'rgba(255,255,255,0.25)'
      },
      scrollbar: {
        barBackgroundColor: DASHBOARD_BAR_COLOR,
        enabled: true,
        height: 8,
        margin: 5
      },
      series: [{
        name: '',
        type: 'column',
        yAxis: 1,
        data: this.dataNew ?? [1, 23, 43, 23],
        color: DASHBOARD_BAR_COLOR,
        states: {
          hover: {
            color: 'rgb(255, 141, 93)',
          }
        },
        tooltip: {
          valueSuffix: ' nhân sự'
        }
      }]
    };
  }

  bindData(data: any[], dataName: any[], toolTip?: string) {
    this.options = {
      ...this.options,
      xAxis: [{
        categories: dataName,
        crosshair: true
      }],
      series: [
        {
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
            valueSuffix: toolTip ?? ' nhân sự',
          }
        },
      ],
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['height']) {
      this.resetOption(changes['height'].currentValue);
    }
    if (changes['orgIds']) {
      this.onHandleClickChange(undefined, false);
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
        this.appService.post(api.HU_CONTRACT_DASHBOARD_EMP_GETWORKINGAGEINFOMATIONDASHBOARD, { orgIds: [] }).subscribe(x => {
          if (x.ok && x.status === 200) {
            const body = x.body as IFormatedResponse
            if (body.statusCode === 200) {
              // body.innerBody.map((x: any) => {
              //   if (!!!x.name) x.name = this.mls.trans('UNDEFINED');
              // })
              this.dataNew = body.innerBody.listValue;
              this.nameNew = body.innerBody.listName;

              this.bindData(body.innerBody.listValue, body.innerBody.listName)

              this.dataExport = {
                xAxis: this.options.xAxis,
                data: this.dataNew,
              }
            }
          }
        })
      )
    })
  }
  onAvatarBlockClick(): void {
    this.expandStateListPrint = false;
    this.expandStateList = !this.expandStateList;
  }
  onMenuItemClick(item: any): void {
    this.expandStateList = !this.expandStateList;
    this.onHandleClickChange(item.value);
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
  onHandleClickChange(logic?: any, isChange?: any) {
    if (logic !== undefined) {
      this.chartNo = logic;
    }
    if (logic === undefined && isChange === undefined) {
      this.chartNo = (this.chartNo + 1) > 2 ? 0 : (this.chartNo + 1);
    }
    if (this.chartNo === 1) {
      this.appService.post(api.HU_CONTRACT_DASHBOARD_EMP_GETPOSITIONINFOMATIONDASHBOARD, { orgIds: this.orgIds }).subscribe(x => {
        if (x.ok && x.status === 200) {
          const body = x.body as IFormatedResponse
          if (body.statusCode === 200) {
            // body.innerBody.map((x: any) => {
            //   if (!!!x.name) x.name = this.mls.trans('UNDEFINED');
            // })
            this.dataNew = body.innerBody.listValue;
            this.nameNew = body.innerBody.listName;

            this.bindData(body.innerBody.listValue, body.innerBody.listName)
            this.titleChart = EnumTranslateKey.UI_COMPONENT_TITLE_TITLE_CHART;

            this.dataExport = {
              xAxis: this.options.xAxis,
              data: this.dataNew,
            }
          }
        }
      })
    }
    if (this.chartNo === 2) {
      this.appService.post(api.HU_CONTRACT_DASHBOARD_EMP_GETLEVELINFOMATIONDASHBOARD, { orgIds: this.orgIds }).subscribe(x => {
        if (x.ok && x.status === 200) {
          const body = x.body as IFormatedResponse
          if (body.statusCode === 200) {
            // body.innerBody.map((x: any) => {
            //   if (!!!x.name) x.name = this.mls.trans('UNDEFINED');
            // })
            this.dataNew = body.innerBody.listValue;
            this.nameNew = body.innerBody.listName;
            this.dataExport = {
              xAxis: this.nameNew,
              data: this.dataNew,
            }
            this.bindData(body.innerBody.listValue, body.innerBody.listName, '')
            this.titleChart = EnumTranslateKey.UI_COMPONENT_TITLE_TRAINING_LEVEL;
          }
        }
      })
    }
    if (this.chartNo === 0) {
      this.appService.post(api.HU_CONTRACT_DASHBOARD_EMP_GETWORKINGAGEINFOMATIONDASHBOARD, { orgIds: this.orgIds }).subscribe(x => {
        if (x.ok && x.status === 200) {
          const body = x.body as IFormatedResponse
          if (body.statusCode === 200) {
            // body.innerBody.map((x: any) => {
            //   if (!!!x.name) x.name = this.mls.trans('UNDEFINED');
            // })
            this.dataNew = body.innerBody.listValue;
            this.nameNew = body.innerBody.listName;

            this.bindData(body.innerBody.listValue, body.innerBody.listName)
            this.titleChart = EnumTranslateKey.UI_COMPONENT_TITLE_LABOR_BY_AGE;

            this.dataExport = {
              xAxis: this.options.xAxis,
              data: this.dataNew,
            }
          }
        }
      })
    }
  }
}
