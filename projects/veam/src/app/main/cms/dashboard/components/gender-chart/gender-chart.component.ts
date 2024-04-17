import { Component, Input, OnChanges, OnInit, SimpleChanges, AfterViewInit } from '@angular/core';

import * as Highcharts from "highcharts/highstock";
import { MENU_OPTIONS_PRINT, PIE_COLORS } from '../../../../../constants';

import { EnumTranslateKey, api } from 'alpha-global-constants';
import { CustomPrintChartComponent } from '../custom-print-chart/custom-print-chart.component';
import { BaseComponent, EnumIconClass, MultiLanguageService, AppService, IFormatedResponse } from 'ngx-histaff-alpha';



@Component({
  selector: 'app-gender-chart',
  templateUrl: './gender-chart.component.html',
  styleUrls: ['./gender-chart.component.scss'],
  providers: [CustomPrintChartComponent],
})
export class GenderChartComponent extends BaseComponent implements OnChanges, OnInit, AfterViewInit {

  @Input() width!: number;
  @Input() height!: number;
  @Input() orgIds!: number[];

  Highcharts = Highcharts;

  titleChart = EnumTranslateKey.UI_COMPONENT_TITLE_GENDER_RATIO;
  isHidden: boolean = true;
  chartNo: boolean = false;
  dataNew!: any;
  defaultValue: any = [13, 23, 50];
  menu = [
    {
      translateCode: EnumTranslateKey.UI_COMPONENT_TITLE_GENDER_RATIO,//"Thống kê tỷ lệ giới tính",//  EnumTranslateKey.UI_AUTH_PROFILE_MENU_SEE_PROFILE,
      iconClass: EnumIconClass.FEATHER_USER,
      value: false,
    },
    {
      translateCode: EnumTranslateKey.UI_COMPONENT_TITLE_ETHNICITY_PERSONNEL,//"Thống kê nhân sự theo dân tộc",// EnumTranslateKey.UI_AUTH_PROFILE_MENU_CHANGE_PASSWORD,
      iconClass: EnumIconClass.FEATHER_LOCK,
      value: true,
    },
  ];
  menuPrint = MENU_OPTIONS_PRINT;
  options!: Highcharts.Options;
  expandStateList: boolean = false;
  expandStateListPrint: boolean = false;
  colorCode!: any[];

  constructor(
    public override mls: MultiLanguageService,
    private appService: AppService,
    private printChart: CustomPrintChartComponent
  ) {
    super(mls)
  }

  resetOption(height: number) {
    this.options = {
      chart: {
        renderTo: "container",
        plotShadow: false,
        height: height - 50,
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
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: "pointer",
          dataLabels: {
            enabled: false,
            format: "<b>{point.name}</b>: {point.percentage:.1f} %",
            // distance: -50,
          },
          showInLegend: false,
          colors: PIE_COLORS,
        },
      },
      series: [
        {
          type: "pie",
          data: this.dataNew ?? this.defaultValue,
          innerSize: '75%',
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
          data: data,
          innerSize: '75%',
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
        this.appService.post(api.HU_EMPLOYEE_CV_DASHBOARD_GENDER, { orgIds: [] }).subscribe(x => {
          if (x.ok && x.status === 200) {
            const body = x.body as IFormatedResponse
            if (body.statusCode === 200) {
              var i = 0;
              this.colorCode = [];
              body.innerBody.map((x: any) => {
                var a = {
                  name: x.name,
                  code: PIE_COLORS[i],
                }
                i++;
                if (i === PIE_COLORS.length) i = 0;
                this.colorCode.push(a)
                if (!!!x.name) x.name = this.mls.trans('UNDEFINED');
              })
              this.dataNew = body.innerBody;

              this.bindData(body.innerBody)
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
      this.printChart.printChartPie(item.fileData);
      this.isHidden = true;
    }, 1500)

  }
  onHandleClickChange(logic?: any, isChange?: any) {
    if (logic !== undefined) {
      this.chartNo = logic;
    }
    if (logic === undefined && isChange === undefined) {
      this.chartNo = !this.chartNo;
    }
    if (!!this.chartNo) {
      this.appService.post(api.HU_CONTRACT_DASHBOARD_EMP_GETNATIVEINFOMATIONDASHBOARD, { orgIds: this.orgIds }).subscribe(x => {
        if (x.ok && x.status === 200) {
          const body = x.body as IFormatedResponse
          if (body.statusCode === 200) {
            var i = 0;
            this.colorCode = [];
            body.innerBody.map((x: any) => {
              var a = {
                name: x.name,
                code: PIE_COLORS[i],
              }
              i++;
              if (i === PIE_COLORS.length) i = 0;
              this.colorCode.push(a)
              if (!!!x.name) x.name = this.mls.trans('UNDEFINED');
            })
            this.dataNew = body.innerBody;
            this.bindData(body.innerBody)
            this.titleChart = EnumTranslateKey.UI_COMPONENT_TITLE_ETHNICITY_PERSONNEL;
          }
        }
      })
    } else {
      this.appService.post(api.HU_EMPLOYEE_CV_DASHBOARD_GENDER, { orgIds: this.orgIds }).subscribe(x => {
        if (x.ok && x.status === 200) {
          const body = x.body as IFormatedResponse
          if (body.statusCode === 200) {
            var i = 0;
            this.colorCode = [];
            body.innerBody.map((x: any) => {
              var a = {
                name: x.name,
                code: PIE_COLORS[i],
              }
              i++;
              if (i === PIE_COLORS.length) i = 0;
              this.colorCode.push(a)
              if (!!!x.name) x.name = this.mls.trans('UNDEFINED');
            })
            this.dataNew = body.innerBody;
            this.bindData(body.innerBody)
            this.titleChart = EnumTranslateKey.UI_COMPONENT_TITLE_GENDER_RATIO;
          }
        }
      })
    }
  }

}
