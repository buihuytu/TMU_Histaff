import { AfterViewInit, Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild, isDevMode } from '@angular/core';
import { EnumTranslateKey, api } from 'alpha-global-constants';
import { IDataItem, BaseComponent, EnumCoreButtonVNSCode, ICoreDropdownOption, MultiLanguageService, LayoutService, CoreDatetimeService, AppService, AuthService, AlertService, ResponseService, IMonthIdentity, IAlertOptions, IAuthData, ICalendarBody, IFormatedResponse } from 'ngx-histaff-alpha';
import { BehaviorSubject, Observable, fromEvent, filter, debounceTime, map } from 'rxjs';
import { TimeAttendanceMockupService } from '../../register-off/explain-work/time-attendance-mockup.service';
export interface ILocalDataItem extends IDataItem {
  timePoint1?: string;
  timePoint4?: string;
  late?: number;
  status?: string;
  offRegistered?: boolean;
  manualCode?: string;
}

export interface ILocalDataRow {
  items: ILocalDataItem[];
  mixed: boolean;
}

@Component({
  selector: 'app-home-explain-work',
  templateUrl: './home-explain-work.component.html',
  styleUrl: './home-explain-work.component.scss'
})
export class HomeExplainWorkComponent extends BaseComponent implements OnInit, OnChanges, AfterViewInit {
  @Input() caption!: string;
  day!: Date;
  arrAttendant!: any[];
  isRequired: boolean = false;
  columnCount!: number;
  standardNumber: number = 0;
  realAtNumber: number = 0;
  paidAtNumber: number = 0;
  paidLeaveNumber: number = 0;
  notPaidLeaveNumber: number = 0;
  tardinessEarlyNumber: number = 0;
  totalOt: number = 0;
  standard = EnumTranslateKey.UI_COMPONENT_EXPLAIN_WORK_THE_STANDARD;
  actualWork = EnumTranslateKey.UI_COMPONENT_EXPLAIN_WORK_ACTUAL_WORK;
  salCalculator = EnumTranslateKey.UI_COMPONENT_EXPLAIN_WORK_SALARY_CALCULATION;
  paidLeave = EnumTranslateKey.UI_COMPONENT_EXPLAIN_WORK_PAID_LEAVE;
  unpaidLeave = EnumTranslateKey.UI_COMPONENT_EXPLAIN_WORK_UNPAID_LEAVE;
  leaveEarly = EnumTranslateKey.UI_COMPONENT_EXPLAIN_WORK_LEAVE_EARLY_AND_LEAVE_LATE;
  overtime = EnumTranslateKey.UI_COMPONENT_EXPLAIN_WORK_OVERTIME;
  work = EnumTranslateKey.UI_COMPONENT_EXPLAIN_WORK_WORK;
  onLeave = EnumTranslateKey.UI_COMPONENT_EXPLAIN_WORK_ON_LEAVE;
  missingAtendance = EnumTranslateKey.UI_COMPONENT_EXPLAIN_WORK_MISSING_TARDINESS_EARLY;
  tardinessEarly = EnumTranslateKey.UI_COMPONENT_EXPLAIN_WORK_MISSING_TARDINESS_EARLY;
  dataChange = EnumTranslateKey.UI_COMPONENT_EXPLAIN_WORK_MISSING_DATA_CHANGE;
  holiday = EnumTranslateKey.UI_COMPONENT_EXPLAIN_WORK_HOLIDAY;
  explaintionDay = EnumTranslateKey.UI_COMPONENT_EXPLAIN_WORK_EXPLANATION_DAY;
  typeOfWork = EnumTranslateKey.UI_COMPONENT_EXPLAIN_WORK_TYPE_OF_WORK;
  reason = EnumTranslateKey.UI_COMPONENT_EXPLAIN_WORK_REASON;
  btnSend = EnumTranslateKey.UI_COMPONENT_EXPLAIN_WORK_BTN_SEND;
  btnShow = EnumTranslateKey.UI_COMPONENT_EXPLAIN_WORK_BTN_SHOW;
  buttonItems: EnumCoreButtonVNSCode[] = [EnumCoreButtonVNSCode.SEND];
  isExplanationShown!: boolean;
  isSenBtn!: boolean;
  reasonText!: string;
  lateText!: any;
  comebackOutText!: any;
  employeeId!: number;
  disabled: boolean = true;
  symbolTypeOptions$ = new BehaviorSubject<ICoreDropdownOption[]>([]);
  symbolTypeGetByIdObject$ = new BehaviorSubject<any>(null);
  symbolType!: number;
  explainDate!: Date;
  override lang = 'vi';

  constructor(
    public override mls: MultiLanguageService,
    public layoutService: LayoutService,
    private coreDatetimeService: CoreDatetimeService,
    private timeAttendanceMockupService: TimeAttendanceMockupService,
    private appService: AppService,
    private authService: AuthService,
    private alertService: AlertService,
    private responseService: ResponseService,
  ) {
    super(mls);
    this.headerWeekdays = this.coreDatetimeService.getShortWeekdays(this.lang);
    const newDate = new Date();
    this.currentMonth$ = new BehaviorSubject<IMonthIdentity>({
      year: newDate.getFullYear(),
      monthIndex: newDate.getMonth(),
    });
  }
  alertOptions: IAlertOptions = {
    autoClose: false,
    keepAfterRouteChange: true,
  };
  late!: number;
  comebackOut!: number;

  data$ = new BehaviorSubject<ILocalDataRow[]>([]);
  currentMonthText!: string;
  currentMonth$!: BehaviorSubject<IMonthIdentity>;
  currentYear!: number; // calculated base on currentMonth$
  headerWeekdays!: string[];
  cellHeight: number = 120;
  monthPickerActive: boolean = false;
  yearPickerActive: boolean = false;
  resizeStream$!: Observable<any>;
  @ViewChild('container') container!: ElementRef;
  @ViewChild('calendarContainer') calendarContainer!: ElementRef;
  @ViewChild('calendarBody') calendarBody!: ElementRef;
  @Input() width!: number;

  override ngOnInit(): void {
    this.subscriptions.push(this.mls.lang$.subscribe((x) => (this.lang = x)));
    this.resizeStream$ = fromEvent(window, 'resize');
    this.isExplanationShown = true;
    this.authService.data$.subscribe((x: IAuthData | null) => (this.employeeId = x?.employeeId!));
  }

  private setCss(): void {
    const rect = this.calendarContainer.nativeElement.getBoundingClientRect();
    const cellWidth = (rect.width - 6 * 8) / 7;
    const cellHeight = (cellWidth / 7) * 3 + 2;
    // const cellHeight = cellWidth;
    this.container.nativeElement.style.setProperty('--calendar-width', rect.width + 'px');
    this.container.nativeElement.style.setProperty('--spot-height', cellHeight + 'px');
    this.container.nativeElement.style.setProperty('--spot-width', cellWidth + 'px');
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['width']) {
      if (changes['width'].currentValue) {
        this.columnCount = Math.floor((changes['width'].currentValue - this.layoutService.basicSpacing) / (this.layoutService.comingSoonAvatarSize + this.layoutService.basicSpacing))
      }
    }
  }
  ngAfterViewInit(): void {
    const rect = this.calendarContainer.nativeElement.getBoundingClientRect();
    const cellWidth = (rect.width - 6 * 8) / 7;
    const cellHeight = (cellWidth / 7) * 3 + 2;
    // if (rect.width < 768) {
    this.data$.pipe(filter((x) => !!x.length)).subscribe((x) => {
      setTimeout(() => {
        this.container.nativeElement.style.setProperty('--spot-height', cellHeight + 'px');
        this.container.nativeElement.style.setProperty('--calendar-width', rect.width + 'px');
        this.container.nativeElement.style.setProperty('--calendar-body-height', x.length * cellHeight + 'px');
        const el = this.calendarBody.nativeElement;
        el.classList.remove('fade-in');
        el.offsetWidth;
        el.classList.add('fade-in');
        this.setCss();
      });
    });

    setTimeout(() => {
      this.setCss();
      this.subscriptions.push(
        this.resizeStream$.pipe(debounceTime(100)).subscribe((x) => {
          this.setCss();
        }),
      );

      this.subscriptions.push(
        this.currentMonth$.pipe(filter((x) => !!x)).subscribe((x) => {
          this.currentMonthText = this.coreDatetimeService.getMonthText(this.lang, x.monthIndex);
          const equivalent = new Date(x.year, x.monthIndex);
          this.currentYear = equivalent.getFullYear();
          const year = equivalent.getFullYear();
          const monthIndex = equivalent.getMonth();
          const calendarData: ICalendarBody = this.coreDatetimeService.getCalendarBody(year, monthIndex);
          this.timeAttendanceMockupService.emitateOverviewData(calendarData, { year, monthIndex }).subscribe((x) => {
            this.data$.next(x);
          });
        }),
      );
    });
    this.getInfobyMonth();
  }

  goBackward() {
    this.currentMonth$.next({
      year: this.currentMonth$.value.year,
      monthIndex: this.currentMonth$.value.monthIndex - 1,
    });
    this.getInfobyMonth();
  }

  getInfobyMonth() {
    this.appService
      .post('/api/PortalAtTimeTimesheetDaily/GetInfoByMonth', {
        employeeId: this.authService.data$.value?.employeeId,
        year: this.currentMonth$.value.year,
        monthIndex: this.currentMonth$.value.monthIndex,
        lastDay: 20,
      })
      .subscribe((x) => {
        if (x.ok && x.status === 200) {
          const body = x.body;
          if (body.statusCode === 200) {
            this.standardNumber = body.innerBody.standard;
            this.realAtNumber = body.innerBody.realAt;
            this.paidAtNumber = body.innerBody.paidAt;
            this.paidLeaveNumber = body.innerBody.paidLeave;
            this.notPaidLeaveNumber = body.innerBody.notPaidLeave;
            this.tardinessEarlyNumber = body.innerBody.tardinessEarly;
          }
        }
      });
  }
  goForeward() {
    this.currentMonth$.next({
      year: this.currentMonth$.value.year,
      monthIndex: this.currentMonth$.value.monthIndex + 1,
    });
    this.getInfobyMonth();
  }

  onMonthObjectChange(e: IMonthIdentity) {
    this.currentMonth$.next(e);
    this.monthPickerActive = false;
  }

  onMonthPickerYearClick(e: number) {
    this.monthPickerActive = false;
    this.yearPickerActive = true;
  }

  onYearPickerChange(e: number) {
    this.currentMonth$.next({
      year: e,
      monthIndex: this.currentMonth$.value.monthIndex,
    });
    this.monthPickerActive = true;
    this.yearPickerActive = false;
  }

  onButtonClick(e: any) { }

  onSymbolTypeChange(symbolType: number) {
    this.symbolType = symbolType;
  }

  showExplanation() {
    this.isSenBtn = true;
    this.subscriptions.push(
      this.appService.get(api.AT_TIME_TIMESHEET_DAILY_GET_LIST_SYMBOL_TYPE).subscribe((x) => {
        if (x.ok && x.status === 200) {
          const body: IFormatedResponse = x.body;
          if (body.statusCode === 200) {
            const optons: { value: number; text: string }[] = [];
            body.innerBody.map((y: any) => {
              optons.push({
                value: y.id,
                text: '[' + y.code + ']' + ' ' + y.name,
              });
            });
            this.symbolTypeOptions$.next(optons);
          }
        }
      }),
    );
    this.isExplanationShown = false;
  }

  clickExplanation(item: any, e: any) {
    this.explainDate = item.dateValue;
    this.lateText = null;
    this.comebackOutText = null;
    const warningDiv = item?.manualCode === 'T';
    this.isSenBtn = false;
    let date = item?.date;
    if (item.manualCode === "" || !!!item?.currentMonth) {
      return;
    }
    if (warningDiv) {
      this.isExplanationShown = true;
      this.subscriptions.push(
        this.currentMonth$.pipe(filter((x) => !!x)).subscribe((x) => {
          this.day = new Date(x.year, x.monthIndex, date);
          this.appService
            .post(api.AT_TIME_TIMESHEET_DAILY_GET_ATTANDENT_BY_DAY, {
              employeeId: this.employeeId,
              year: x.year,
              monthIndex: x.monthIndex,
              date,
            })
            .pipe(
              map((x: any) => {
                return x.body.innerBody;
              }),
            )
            .subscribe((response) => {
              this.arrAttendant = response.info;
              this.late = response.late;
              this.comebackOut = response.comebackOut;
              this.totalOt = response.totalOt;
              console.log(this.arrAttendant);
            });
        }),
      );
    } else {
      this.isExplanationShown = false;
      this.isSenBtn = false;
      this.subscriptions.push(
        this.currentMonth$.pipe(filter((x) => !!x)).subscribe((x) => {
          this.day = new Date(x.year, x.monthIndex, date);
          this.appService
            .post(api.AT_TIME_TIMESHEET_DAILY_GET_ATTANDENT_BY_DAY, {
              employeeId: this.employeeId,
              year: x.year,
              monthIndex: x.monthIndex,
              date,
            })
            .pipe(
              map((x: any) => {
                return x.body.innerBody;
              }),
            )
            .subscribe((response) => {
              this.arrAttendant = response.info;
              this.late = response.late;
              this.comebackOut = response.comebackOut;
            });
        })!,
      );
    }
  }

  sendExplainTime(e: any) {

    if (((this.late > 0 && this.lateText == null) || (this.comebackOut > 0 && this.comebackOutText == null)) && this.arrAttendant[0].valin1 !== null && this.arrAttendant[0].valin4 !== null) {
      this.isRequired = true;
      return;
    }
    this.subscriptions.push(
      this.appService
        .post(api.PORTAL_REGISTER_OFF_CREATE, {
          employeeId: this.employeeId,
          workingDay: this.explainDate,
          dateStart: this.explainDate,
          dateEnd: this.explainDate,
          note: this.reasonText,
          typeCode: 'EXPLAINWORK',
          timeTypeId: this.symbolType,
          timeLate: this.lateText,
          timeEarly: this.comebackOutText,
          typeId: this.lateText > 0 || this.comebackOutText > 0 ? 1 : 0,
        })
        .subscribe((x: any) => {
          if (x.ok && x.status === 200) {
            const body: IFormatedResponse = x.body;
            if (body.statusCode === 200) {
              this.alertService.success(`${this.mls.trans(x.body.messageCode)}`, this.alertOptions);
              this.symbolType = 0;
              this.late = 0;
              this.comebackOut = 0;
              this.arrAttendant = [];
              this.isRequired = false;
              this.reasonText = '';
              this.totalOt = 0;
            } else {
              if (isDevMode()) this.responseService.resolve(body);
            }
          } else {
            if (isDevMode()) {
              this.alertService.error(JSON.stringify(x, null, 2), this.alertOptions);
            }
          }
        }),
    );
  }
}
