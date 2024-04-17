import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { BehaviorSubject, Observable, debounceTime, filter, fromEvent, map } from 'rxjs';
import { PayrollNoteService } from './payroll-note.service';
import { EnumTranslateKey, api } from 'alpha-global-constants';
import { BaseComponent, ICoreDropdownOption, MultiLanguageService, AppService, ResponseService, AlertService, AuthService, LayoutService, IAuthData, IFormatedResponse, alertOptions, CoreDropdownComponent, TranslatePipe } from 'ngx-histaff-alpha';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-payroll-note',
  standalone: true,
  imports: [
    CommonModule,
    CoreDropdownComponent,
    FormsModule,
    TranslatePipe,
  ],
  templateUrl: './payroll-note.component.html',
  styleUrls: ['./payroll-note.component.scss']
})
export class PayrollNoteComponent extends BaseComponent implements OnInit, AfterViewInit {

  shownFrom!: string;
  checkData: boolean = true;

  // TRANSLATE
  listIncome:EnumTranslateKey = EnumTranslateKey.UI_ENTITY_FIELD_PORTAL_CAPTION_PAYROLL_NOTE_LIST_INCOME;
  totalIncome:EnumTranslateKey = EnumTranslateKey.UI_ENTITY_FIELD_PORTAL_CAPTION_PAYROLL_NOTE_LIST_INCOME;
  realityPayroll:EnumTranslateKey = EnumTranslateKey.UI_ENTITY_FIELD_PORTAL_CAPTION_PAYROLL_NOTE_REALITY_PAYROLL;

  // FILLTER FORM
  year!: number;
  salPeriod!: number;

  /* Drop down list */
  // Year
  yearOptions$ = new BehaviorSubject<ICoreDropdownOption[]>([]);
  yearGetByIdObject$ = new BehaviorSubject<any>(null);
  // Salary Period
  salaryPeridOptions$ = new BehaviorSubject<ICoreDropdownOption[]>([]);
  salaryPeriodGetByIdObject$ = new BehaviorSubject<any>(null);

  employeeId!: number;

  data = {
    cl10: "",
    cl4: "",
    cl6: "",
    cl7: "",
    cw1: "",
    cw2: "",
    cw3: "",
    cw4: "",
    cw5: "",
    deduct3: "",
    deduct4: "",
    deduct5: "",
    csum2: "",
    csum3: "",
    csum4: "",
    totalPayrollSub: "",
    totalIncome: "",
    totalInsurance: "",
    totalMinus: ""
  };

  constructor(
    public override mls: MultiLanguageService,
    private appService: AppService,
    private responseService: ResponseService,
    private alertService: AlertService,
    private authService: AuthService,
    private layoutService: LayoutService,
    private payrollNoteService : PayrollNoteService,
  ) {
    super(mls);
    this.shownFrom = "name";
  }

  override ngOnInit(): void {
    this.subscriptions.push(
      this.mls.lang$.subscribe(x => this.lang = x)
    )
    this.authService.data$.subscribe((x: IAuthData | null) => this.employeeId = x?.employeeId!);
    this.year = (new Date()).getFullYear();
    this.getListYear();
    this.getCurrentSalary();

    if (this.year != null) {
      this.getListPeriod(this.year);
    }

    if (this.year == (new Date()).getFullYear() && this.salPeriod == 0) {
      this.getCurrentSalary();
    }
  }

  ngAfterViewInit(): void {
    
  }

  

  onYearChange(year: number): void {
    this.salPeriod = 0;
    this.salPeriod = 0;
    this.salaryPeridOptions$.next([]);
    this.salaryPeriodGetByIdObject$.next(null);
    this.getListPeriod(year)
  }

  onSalPeriodChange(salPeriod: number): void {
    this.salPeriod = salPeriod;
    this.getPayrollNote();
  }

  // Function for List DropdownLists
  getListYear() {
    this.subscriptions.push(
      this.appService.get(api.AT_SALARY_PERIOD_GET_YEAR).subscribe((res: any) => {
        if (!!res.ok && res.status === 200) {
          const body: IFormatedResponse = res.body
          if (body.statusCode === 200 && !!body.innerBody) {
            const options: { value: number | null; text: string; }[] = [];
            options.push({
              value: Number(),
              text: ''
            })
            res.body.innerBody.map((g: any) => {
              options.push({
                value: g,
                text: g
              })
            })
            this.yearOptions$.next(options);

          }
        }
      })
    )
  }

  getListPeriod(year: number) {
    this.subscriptions.push(

      this.appService.post(api.AT_SALARY_PERIOD_GET_LIST_IN_YEAR, { year: year }).subscribe(x => {
        if (x.ok && x.status === 200) {
          const body: IFormatedResponse = x.body
          if (body.statusCode === 200 && !!body.innerBody) {
            const options: { value: number | null; text: string }[] = [];
            options.push({
              value: Number(),
              text: ''
            })
            body.innerBody.map((get: any) => {
              options.push({
                value: get.id,
                text: get.name,
              });
            });
            this.salaryPeridOptions$.next(options);
          } else {
            this.responseService.resolve(body)
          }
        } else {
          this.alertService.error(JSON.stringify(x), alertOptions)
        }
      })
    )
  }

  getPayrollNote(): void{
    this.subscriptions.push(
      this.appService
        .get(`/api/PaPayrollsheetSum/GetPayrollByEmployee?id=${this.employeeId}&salaryPeriodId=${this.salPeriod}`)
        .subscribe((x: any) => {
          if (x.ok && x.body.statusCode == 200) {
            var data = x.body.innerBody;
            //this.data = data;
            this.checkData = true;
            console.log(this.data);
            this.data = {
              cl10: data.cL10 == null ? "0" : data.cL10,
              cl4: data.cL4 == null ? "0" : data.cL4,
              cl6: data.cL6 == null ? "0" : data.cL6,
              cl7: data.cL7 == null ? "0" : data.cL7,
              cw1: data.cW1 == null ? "0" : data.cW1,
              cw2: data.cW2 == null ? "0" : data.cW2,
              cw3: data.cW3 == null ? "0" : data.cW3,
              cw4: data.cW4 == null ? "0" : data.cW4, 
              cw5: data.cW5 == null ? "0" : data.cW5, 
              deduct3: data.deducT3 == null ? "0" : data.deducT3, 
              deduct4: data.deducT4 == null ? "0" : data.deducT4, 
              deduct5: data.deducT5 == null ? "0" : data.deducT5, 
              csum2: data.csuM2 == null ? "0" : data.csuM2,
              csum3: data.csuM3 == null ? "0" : data.csuM3,
              csum4: data.csuM4 == null ? "0" : data.csuM4,
              totalPayrollSub: data.totalPayrollSub == null ? "0" : data.totalPayrollSub,
              totalIncome: data.totalIncome,
              totalInsurance: data.totalInsurance,
              totalMinus: data.totalMinus
            }
          }else{
            this.checkData = false;
            this.data = {
              cl10: "",
              cl4:  "",
              cl6:  "",
              cl7:  "",
              cw1:  "",
              cw2:  "",
              cw3:  "",
              cw4:  "", 
              cw5:  "", 
              deduct3: "", 
              deduct4: "", 
              deduct5: "", 
              csum2: "",         	
              csum3: "",         	
              csum4: "",
              totalPayrollSub: "",
              totalIncome: "",
              totalInsurance: "",
              totalMinus: ""
            }
          }
        }),

      
    );

    
  }

  getCurrentSalary() {
    const dateNow = new Date()
    this.subscriptions.push(
      this.payrollNoteService.getCurrentPeriodSalary()
        .pipe(
          map((f: any) => {
            let id: number;
            id = f.body.innerBody.id;
            this.salPeriod = id;
            console.log(this.salPeriod);
            this.onSalPeriodChange(this.salPeriod)
            return id;
          })
        )
        .subscribe(response => {
          this.salPeriod = response;
        })
    )!
  }
}
