import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ILocalDataRow, ILocalDataItem } from './explain-work.component';
import { api } from 'alpha-global-constants';
import { CoreDatetimeService, AppService, AuthService, ICalendarBody, IMonthIdentity } from 'ngx-histaff-alpha';
import { HelperService } from './helper.service';

@Injectable({
  providedIn: 'root'
})
export class TimeAttendanceMockupService {
  listData: any[] = [];

  constructor(private helperService: HelperService,
    private coreDatetimeService: CoreDatetimeService,
    private appService: AppService,
    private authService: AuthService) { }

  emitateOverviewData(input: ICalendarBody, monthIdentity: IMonthIdentity): Observable<ILocalDataRow[]> {
    let localDataRows: ILocalDataRow[];
    let items: ILocalDataItem[];
    let dayIndex: number;
    let offRegistered: boolean;
    let isWorkingDay: boolean;
    let randH1: number;
    let randM1: number;
    let randH4: number;
    let randM4: number;
    let randHh1: string;
    let randMm1: string;
    let randHh4: string;
    let randMm4: string;
    let late1: number;
    let late4: number;
    let late: number;
    let currentMonth: boolean;
    let dateIndex: Date;
    let manualCode: string;
    const equivalent = new Date(monthIdentity.year, monthIdentity.monthIndex);
    const year = equivalent.getFullYear();
    const monthIndex = equivalent.getMonth();
    return new Observable<ILocalDataRow[]>((observer) => {
      localDataRows = [];
      const lastDateOfMonth = this.coreDatetimeService.getLastDateOfMonth(year, monthIndex);
      const lastDayOfMonth = lastDateOfMonth.getDate();
      const employeeId = this.authService.data$.value?.employeeId;
      this.appService.post(api.AT_TIME_TIMESHEET_DAILY_GET_ATTANDENT_NOTE_BY_MONTH, { employeeId, year: monthIdentity.year, monthIndex: monthIdentity.monthIndex, lastDay: lastDayOfMonth })
        .subscribe((x: any) => {
          let newData: [{ id: number, workingday: Date, manualId: number , manualCode: string}]
          if (x.ok && x.status === 200) {
            newData = x.body.innerBody;
            this.listData.push(...newData);
            const manualCodes = this.listData.map(item => item.manualCode);
            //console.log(manualIds);
            input.rows.map(row => {
              items = [];
              row.items.map(item => {
                dayIndex = item.dateValue.getDay();
                dateIndex = item.dateValue;
                // giảm xác xuất ngày off = 1/10
                // offRegistered = this.helperService.getRandomInt(0, 9) === 0 ? true : false;
                isWorkingDay = !offRegistered && dayIndex > 0 && dayIndex < 6;
                currentMonth = item.dateValue.getFullYear() === year && item.dateValue.getMonth() === monthIndex;
                const itemListdata = this.listData.filter(x => new Date(x.workingday).toLocaleString("en-US") === dateIndex.toLocaleString("en-US"))[0];
                if (itemListdata == undefined ) {
                  manualCode = '';
                } else {
                  manualCode = itemListdata["manualCode"];
                }
                if (isWorkingDay) {

                  items.push({
                    manualCode: manualCode,
                    timePoint1: randHh1 + ":" + randMm1,
                    timePoint4: randHh4 + ":" + randMm4,
                    late: late,
                    //status: !!late ? 'warning' : 'ok',
                    date: item.date,
                    dateValue: item.dateValue,
                    currentMonth
                  })
                } else if (offRegistered) {
                  items.push({
                    manualCode: manualCode,
                    date: item.date,
                    dateValue: item.dateValue,
                    offRegistered: true,
                    currentMonth
                  })
                } else {
                  items.push({
                    manualCode: manualCode,
                    date: item.date,
                    dateValue: item.dateValue,
                    currentMonth
                  })
                }
              })
              localDataRows.push({
                mixed: row.mixed,
                items
              })
            })
            observer.next(localDataRows);
          }
        })


    })
  }

}
