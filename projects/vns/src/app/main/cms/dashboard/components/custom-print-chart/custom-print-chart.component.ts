import { Component, OnInit, AfterViewInit, Input } from '@angular/core';
import { DASHBOARD_BAR_COLOR, PIE_COLORS } from '../../../../../constants';
import { EnumTranslateKey } from 'alpha-global-constants';

import * as Highcharts from "highcharts/highstock";
import { BaseComponent, MultiLanguageService } from 'ngx-histaff-alpha';

declare let html2canvas: any;

@Component({
  selector: 'app-custom-print-chart',
  templateUrl: './custom-print-chart.component.html',
  styleUrls: ['./custom-print-chart.component.scss']
})
export class CustomPrintChartComponent extends BaseComponent implements OnInit, AfterViewInit {
  @Input() optionCharts!: any;
  @Input() optionChartColumns!: any;
  @Input() titleCharts!: EnumTranslateKey;

  Highcharts = Highcharts;
  options!: Highcharts.Options;
  optionsColumn!: Highcharts.Options;

  constructor(
    public override mls: MultiLanguageService,
  ) {
    super(mls)
  }

  bindDataPie(data: any) {
    this.options = {
      chart: {
        renderTo: "container",
        plotShadow: false,
        type: "pie",
        style: {
          fontFamily: "Roboto",
        },
      },
      credits: {
        enabled: false,
      },
      title: {
        text: this.mls.trans(this.titleCharts, this.lang).toUpperCase(),
      },
      tooltip: {
        pointFormat: "<b>{point.y}/{point.total}</b>  ",
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: "pointer",
          dataLabels: {
            enabled: true,
            format: "{point.percentage:.1f}%",
            distance: -20,
          },
          showInLegend: true,
          colors: PIE_COLORS,
        },
      },
      series: [
        {
          type: "pie",
          data: data,
          innerSize: '75%',
        },
      ],
    };
  }
  bindDataColumn(data: any) {
    this.optionsColumn = {
      chart: {
        renderTo: "container",
        style: {
          fontFamily: "Roboto",
        },
      },
      credits: {
        enabled: false,
      },
      title: {
        text: this.mls.trans(this.titleCharts, this.lang).toUpperCase(),
      },
      xAxis: data.xAxis,
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
        x: 500,
        verticalAlign: 'top',
        y: 100,
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
          data: data.data,
          color: DASHBOARD_BAR_COLOR,
          states: {
            hover: {
              color: 'rgb(255, 141, 93)',
            }
          },
          dataLabels: {
            enabled: true,
            format: '{point.y:.0f}'
          },
          tooltip: {
            valueSuffix: ' nhân sự'
          }
        },
      ]
    };
  }

  override ngOnInit(): void {

    this.subscriptions.push(
      this.mls.lang$.subscribe(x => this.lang = x)
    )
  }

  ngAfterViewInit(): void {
    if (!!this.optionCharts) {
      this.bindDataPie(this.optionCharts);
    }
    if (!!this.optionChartColumns) {
      this.bindDataColumn(this.optionChartColumns);
    }
  }

  public printChartPie(fileData: string): void {
    const elementToExport = document.getElementById('content-print-pie');
    const exx = elementToExport?.getElementsByClassName('highcharts-container')[0];
    if (exx !== null && exx !== undefined) {
      if (fileData == 'pdf' || fileData == 'print' || fileData == 'svg') {
        const printHtml = window.open('', 'PRINT', 'height=800,width=1000');
        if (!!printHtml) {
          printHtml.document.write('<html><head>');
          printHtml.document.write(exx.innerHTML);
          printHtml.document.write('</body></html>');

          //printHtml.document.close();
          printHtml.focus();
          printHtml.print();
          printHtml.close();

        }
      } else {
        html2canvas(exx).then((canvas: any) => {
          const dataURL = canvas.toDataURL('image/' + fileData);
          const downloadLink = document.createElement('a');
          downloadLink.href = dataURL;
          downloadLink.download = 'chart.' + fileData;
          downloadLink.click();
        });
      }
    }
  }

  public printChartColumn(fileData: string): void {
    const elementToExport = document.getElementById('content-print-column');
    const exx = elementToExport?.getElementsByClassName('highcharts-container')[0];
    if (exx !== null && exx !== undefined) {
      if (fileData == 'pdf' || fileData == 'print') {
        const printHtml = window.open('', 'PRINT', 'height=800,width=1000');
        if (!!printHtml) {
          printHtml.document.write('<html><head>');
          printHtml.document.write(exx.innerHTML);
          printHtml.document.write('</body></html>');

          //printHtml.document.close();
          printHtml.focus();
          printHtml.print();
          printHtml.close();

        }
      } else {
        html2canvas(exx).then((canvas: any) => {
          const dataURL = canvas.toDataURL('image/' + fileData);
          const downloadLink = document.createElement('a');
          downloadLink.href = dataURL;
          downloadLink.download = 'chart.' + fileData;
          downloadLink.click();
        });
      }
    }
  }
}
