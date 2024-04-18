import { Component, Input, OnChanges, OnInit, SimpleChanges, AfterViewInit } from '@angular/core';

import * as Highcharts from "highcharts/highstock";
import { MENU_OPTIONS_PRINT, PIE_COLORS, PIE_COLORS_V2 } from '../../../../../constants';

import { EnumTranslateKey, api } from 'alpha-global-constants';
import { BaseComponent, MultiLanguageService, AppService, IFormatedResponse } from 'ngx-histaff-alpha';
import { CustomPrintChartComponent } from '../custom-print-chart/custom-print-chart.component';

@Component({
  selector: 'app-contract-chart',
  templateUrl: './contract-chart.component.html',
  styleUrls: ['./contract-chart.component.scss'],
  providers: [CustomPrintChartComponent],
})
export class ContractChartComponent extends BaseComponent implements OnChanges, OnInit, AfterViewInit {

  @Input() width!: number;
  @Input() height!: number;
  @Input() orgIds!: number[];

  titleChart = EnumTranslateKey.UI_COMPONENT_TITLE_PARTY_MEMBER_PERSONNEL;
  chartNo: boolean = false;
  expandStateList: boolean = false;
  expandStateListPrint: boolean = false;
  isHidden: boolean = true;
  Highcharts = Highcharts;
  dataNew!: any;
  defaultValue: any = [13, 23, 50];
  options!: Highcharts.Options;

  colorCode!: any[];
  colorReset = PIE_COLORS_V2;
  //<!-- MENU CHON BIEU DO -->
  menu = [
    {
      translateCode: EnumTranslateKey.UI_COMPONENT_TITLE_PARTY_MEMBER_PERSONNEL, //'Thống kê nhân sự  đảng viên',
      value: false,
    },
    {
      translateCode: EnumTranslateKey.UI_COMPONENT_TITLE_MANPOWER_TYPE,//'Biểu đồ loại nhân lực',
      value: true,
    },
  ]
  //<!-- MENU CHON KIEU XUAT DU LIEU -->
  menuPrint = MENU_OPTIONS_PRINT;

  constructor(
    public override mls: MultiLanguageService,
    private appService: AppService,
    private printChart: CustomPrintChartComponent
  ) {
    super(mls)
  }


  ngOnChanges(changes: SimpleChanges): void {
    if (changes['height']) {
      this.resetOption(changes['height'].currentValue);
    }
    if (changes['orgIds']) {
      this.onHandleClickChange(undefined, false);
    }
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
            enabled: false,
            format: "<b>{point.name}</b>: {point.percentage:.1f} %",
          },
          showInLegend: false,
          colors: this.colorReset,
        }
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
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: "pointer",
          dataLabels: {
            enabled: false,
            format: "<b>{point.name}</b>: {point.percentage:.1f} %",
          },
          showInLegend: false,
          colors: this.colorReset,
        }
      },
      series: [
        {
          type: "pie",
          data: data,
          innerSize: '75%',
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
        this.appService.post(api.HU_CONTRACT_DASHBOARD_EMP_GETMEMBERINFOMATIONDASHBOARD, { orgIds: [] }).subscribe(x => {
          if (x.ok && x.status === 200) {
            const body = x.body as IFormatedResponse
            if (body.statusCode === 200) {
              var i = 0;
              this.colorCode = [];
              body.innerBody.map((x: any) => {
                var a = {
                  name: x.name,
                  code: this.colorReset[i],
                }
                i++;
                if (i === this.colorReset.length) i = 0;
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
      this.colorReset = PIE_COLORS;
      this.appService.post(api.HU_CONTRACT_DASHBOARD_EMP_GETJOBINFOMATIONDASHBOARD, { orgIds: this.orgIds }).subscribe(x => {
        if (x.ok && x.status === 200) {
          const body = x.body as IFormatedResponse
          if (body.statusCode === 200) {
            var i = 0;
            this.colorCode = [];
            body.innerBody.map((x: any) => {
              var a = {
                name: x.name,
                code: this.colorReset[i],
              }
              i++;
              if (i === this.colorReset.length) i = 0;
              this.colorCode.push(a)
              if (!!!x.name) x.name = this.mls.trans('UNDEFINED');
            })
            this.dataNew = body.innerBody;
            this.bindData(body.innerBody)
            this.titleChart = EnumTranslateKey.UI_COMPONENT_TITLE_MANPOWER_TYPE;
          }
        }
      })
    } else {
      this.colorReset = PIE_COLORS_V2;
      this.appService.post(api.HU_CONTRACT_DASHBOARD_EMP_GETMEMBERINFOMATIONDASHBOARD, { orgIds: this.orgIds }).subscribe(x => {
        if (x.ok && x.status === 200) {
          const body = x.body as IFormatedResponse
          if (body.statusCode === 200) {
            var i = 0;
            this.colorCode = [];
            body.innerBody.map((x: any) => {
              var a = {
                name: x.name,
                code: this.colorReset[i],
              }
              i++;
              if (i === this.colorReset.length) i = 0;
              this.colorCode.push(a)
              if (!!!x.name) x.name = this.mls.trans('UNDEFINED');
            })
            this.dataNew = body.innerBody;
            this.bindData(body.innerBody)
            this.titleChart = EnumTranslateKey.UI_COMPONENT_TITLE_PARTY_MEMBER_PERSONNEL;
          }
        }
      })
    }
  }



  onHandleClickLegend(i?: any): void {
    console.log(this.Highcharts)
  }
}
