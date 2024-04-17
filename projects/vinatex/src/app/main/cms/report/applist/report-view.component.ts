import { AfterViewInit, Component, OnInit, isDevMode } from '@angular/core';
import { BehaviorSubject, distinctUntilChanged, map } from 'rxjs';
import { EnumTranslateKey, api } from 'alpha-global-constants';
import { AlertService, AppService, AuthService, BaseComponent, CoreControlService, EnumCoreButtonVNSCode, EnumCoreFormControlSeekerSourceType, EnumCoreOrgTreeaAccessorMode, EnumFormBaseContolType, ICoreButtonVNS, ICoreDropdownOption, ICoreFormSection, ICoreListOption, IFormBaseControl, IFormatedResponse, ISysGroup, MultiLanguageService, ResponseService, alertOptions, noneAutoClosedAlertOptions } from 'ngx-histaff-alpha';
import { ReportService } from './report.service';
import { FormGroup } from '@angular/forms';


@Component({
  selector: 'cms-report-view',
  templateUrl: './report-view.component.html',
  styleUrls: ['./report-view.component.scss']
})
export class ReportViewComponent extends BaseComponent implements OnInit, AfterViewInit {

  /* Start Init Variable */
  loading!: boolean;
  checkError$ = new BehaviorSubject<boolean>(false);
  // CORE-PAGE-HEADER
  title = EnumTranslateKey.UI_COMPONENT_TITLE_STANDARD_REPORT
  shownItems: EnumCoreButtonVNSCode[] = [
    EnumCoreButtonVNSCode.HEADER_DELETE,
    EnumCoreButtonVNSCode.HEADER_EXPORTEXEL,
  ]
  form!: FormGroup;
  /*******************************/

  // CORE-ORG-TREE-CHECKBOX
  disableOrgTree: boolean = false;
  listOrgIds: number[] = [];
  accessorMode: EnumCoreOrgTreeaAccessorMode = EnumCoreOrgTreeaAccessorMode.CHECKED;

  // INPUT
  oldMenStart!: number;
  oldMenYearEnd!: number;
  oldMenMonthEnd!: number;
  oldWomenStart!: number;
  oldWoMenYearEnd!: number;
  oldWoMenMonthEnd!: number;

  menYearAge!: number;
  menMonthAge!: number;
  womenYearAge!: number;
  womenMonthAge!: number;

  /*******************************/

  // FILTER INPUT

  /// Check display
  displayYear: boolean = false;
  displaySalPeriod: boolean = false;
  displayObjSalary: boolean = false;
  displayStartDate: boolean = false;
  displayEndDate: boolean = false;
  displayMonth: boolean = false;
  displayEmployeeFirstName: boolean = false;
  displayEmployeeSecondName: boolean = false;
  isShowRetire: boolean = false;
  isShowRetireAge: boolean = false;
  displayExpiredDate: boolean = false;

  /// Label
  labelList = {
    year: EnumTranslateKey.UI_LABEL_CUSTOM_PARAM_KIT_YEAR,
    salPeriod: EnumTranslateKey.UI_LABEL_CUSTOM_PARAM_KIT_SALARY_PERIOD,
    objSalary: EnumTranslateKey.UI_LABEL_CUSTOM_PARAM_KIT_OBJ_SALARY,
    startDate: EnumTranslateKey.UI_LABEL_CUSTOM_PARAM_KIT_FROM_DATE,
    endDate: EnumTranslateKey.UI_LABEL_CUSTOM_PARAM_KIT_TO_DATE,
    month: EnumTranslateKey.UI_LABEL_CUSTOM_PARAM_KIT_MONTH,
    employeeDeclare: EnumTranslateKey.UI_LABEL_EMPLOYEE_DECLARE,
    employeeRepresentative: EnumTranslateKey.UI_LABEL_EMPLOYEE_REPRESENTATIVE,
    expiredDate : EnumTranslateKey.UI_LABEL_CUSTOM_EXPIRED_CONTRACT,
    man : EnumTranslateKey.UI_LABEL_CUSTOM_MAN,
    women : EnumTranslateKey.UI_LABEL_CUSTOM_WOMEN,
  }

  /*------------------------------------------*/


  ///CORE-EMPLOYEE-SEEKER
  employeeSeekerType: EnumCoreFormControlSeekerSourceType = EnumCoreFormControlSeekerSourceType.EMPLOYEE_SEEK;

  employeeDeclare!: string;
  employeeRepresentative!: string;
  employeeGetByIdObject$ = new BehaviorSubject<any>(null);
  public employeePreDefinedOuterParam$ = new BehaviorSubject<any>({
    isRepresentative: true,
  })
  /******--------------------------------*****/
  /// CORE-DROPDOWN
  year: number = (new Date()).getFullYear();
  salPeriod!: number;
  objSalary!: number;
  periodNow!: number;

  /* Drop down list */
  // Year
  yearOptions$ = new BehaviorSubject<ICoreDropdownOption[]>([]);
  yearGetByIdObject$ = new BehaviorSubject<any>(null);
  // Salary Period
  salaryPeridOptions$ = new BehaviorSubject<ICoreDropdownOption[]>([]);
  salaryPeriodGetByIdObject$ = new BehaviorSubject<any>(null);
  // Salary Object
  objSalaryOptions$ = new BehaviorSubject<ICoreDropdownOption[]>([]);
  objSalaryGetByIdObject$ = new BehaviorSubject<any>(null);

  shownFrom!: string;

  /*------------------------------------------*/

  /// CORE-DATEPICKER
  startDate: Date = new Date();
  endDate: Date = new Date();


  expiredDate: Date = new Date(); //Ngày hết hạn hợp đồng
  /// CORE-MONTHPICKER
  monthValue!: string;
  monthDropDown!: string;

  /*------------------------------------------*/

  /// INPUT
  
  // ------------------ STAFF_EXPECTED_TO_RETIRE_REPORT ------------------------
  //OLD OF MEN
  oldMenStartInput: IFormBaseControl = {
    flexSize: 6,
    controlType: EnumFormBaseContolType.TEXTBOX,
    field: 'oldMenStart',
    label: EnumTranslateKey.UI_COMPONENT_TITLE_REPORT_VIEW_OLD_MEN_START,
    type: 'number',
    value: '',
  };
  oldMenYearEndInput: IFormBaseControl = {
    flexSize: 6,
    controlType: EnumFormBaseContolType.TEXTBOX,
    field: 'oldMenYearEnd',
    label: EnumTranslateKey.UI_COMPONENT_TITLE_REPORT_VIEW_OLD_MEN_YEAR_END,
    type: 'number',
    value: '',
  };
  oldMenMonthEndInput: IFormBaseControl = {
    flexSize: 6,
    controlType: EnumFormBaseContolType.TEXTBOX,
    field: 'oldMenMonthEnd',
    label: EnumTranslateKey.UI_COMPONENT_TITLE_REPORT_VIEW_OLD_MEN_MONTH_END,
    type: 'number',
    value: '',
  };

  // OLD OF WOMEN
  oldWomenStartInput: IFormBaseControl = {
    flexSize: 6,
    controlType: EnumFormBaseContolType.TEXTBOX,
    field: 'oldWomenStart',
    label: EnumTranslateKey.UI_COMPONENT_TITLE_REPORT_VIEW_OLD_WOMEN_START,
    type: 'number',
    value: '',
  };
  oldWoMenYearEndInput: IFormBaseControl = {
    flexSize: 6,
    controlType: EnumFormBaseContolType.TEXTBOX,
    field: 'oldWoMenYearEnd',
    label: EnumTranslateKey.UI_COMPONENT_TITLE_REPORT_VIEW_OLD_WOMEN_YEAR_END,
    type: 'number',
    value: '',
  };
  oldWoMenMonthEndInput: IFormBaseControl = {
    flexSize: 6,
    controlType: EnumFormBaseContolType.TEXTBOX,
    field: 'oldWoMenMonthEnd',
    label: EnumTranslateKey.UI_COMPONENT_TITLE_REPORT_VIEW_OLD_MEN_MONTH_END,
    type: 'number',
    value: '',
  };

  // =================================================================

  // ------------------ STAFF_TO_RETIREMENT_AGE_REPORT ------------------------
  // Men
  menYearAgeInput: IFormBaseControl = {
    flexSize: 6,
    controlType: EnumFormBaseContolType.TEXTBOX,
    field: 'menYearAge',
    label: EnumTranslateKey.UI_COMPONENT_TITLE_REPORT_VIEW_YEAR_AGE,
    type: 'number',
    value: '',
  };
  
  menMonthAgeInput: IFormBaseControl = {
    flexSize: 6,
    controlType: EnumFormBaseContolType.TEXTBOX,
    field: 'menMonthAge',
    label: EnumTranslateKey.UI_COMPONENT_TITLE_REPORT_VIEW_MONTH_AGE,
    type: 'number',
    value: '',
  };

  // Women
  womenYearAgeInput: IFormBaseControl = {
    flexSize: 6,
    controlType: EnumFormBaseContolType.TEXTBOX,
    field: 'womenYearAge',
    label: EnumTranslateKey.UI_COMPONENT_TITLE_REPORT_VIEW_YEAR_AGE,
    type: 'number',
    value: '',
  };
  
  womenMonthAgeInput: IFormBaseControl = {
    flexSize: 6,
    controlType: EnumFormBaseContolType.TEXTBOX,
    field: 'womenMonthAge',
    label: EnumTranslateKey.UI_COMPONENT_TITLE_REPORT_VIEW_MONTH_AGE,
    type: 'number',
    value: '',
  };

  sections: ICoreFormSection[] = [
    {
      rows: [
        [
          this.oldMenStartInput,
          this.oldMenYearEndInput,
          this.oldMenMonthEndInput,
          this.oldWomenStartInput,
          this.oldWoMenYearEndInput,
          this.oldWoMenMonthEndInput,
          //---------
          this.menYearAgeInput,
          this.menMonthAgeInput,
          this.womenYearAgeInput,
          this.womenMonthAgeInput,
        ]
      ]
    }
  ]
  /*******************************/

  // CORE-LIST
  typeReportId!: number;
  typeReportCode!: string;
  typeReportName!: string;
  listTypeReports: ICoreListOption[] = [];
  typeList: any[] = [];
  storeName!: string;
  code!: string;

  /* End Init Variable */

  constructor(
    public override mls: MultiLanguageService,
    private appService: AppService,
    private responseService: ResponseService,
    private alertService: AlertService,
    private authService: AuthService,
    private reportService: ReportService,
    private coreControlService: CoreControlService
  ) {
    super(mls);
    this.shownFrom = "name";
  }

  override ngOnInit(): void {
    this.form = this.coreControlService.toFormGroup(this.sections);
    this.subscriptions.push(
      this.mls.lang$.subscribe(x => this.lang = x)
    )
    this.subscriptions.push(
      this.appService.get(api.XLSX_REPORT_GET_LIST_REPORT).subscribe((x) => {
        if (x.ok && x.status === 200) {
          const body: IFormatedResponse = x.body;
          if (body.statusCode === 200) {

            this.typeList = x.body.innerBody;
            const newGroupOptions: ICoreListOption[] = [];

            (x.body.innerBody as ISysGroup[]).map((x) => {
              newGroupOptions.push({
                value: x.id,
                text: x.name,
              });
            });
            this.listTypeReports = newGroupOptions;
          }
        }
      })
    );

    this.subscriptions.push(
      this.form.get('oldMenStart')?.valueChanges.pipe(distinctUntilChanged()).subscribe(x => {
        if (!!x) {
          this.oldMenStart = x;

        }
      })!
    )
    this.subscriptions.push(
      this.form.get('oldMenYearEnd')?.valueChanges.pipe(distinctUntilChanged()).subscribe(x => {
        if (!!x) {
          this.oldMenYearEnd = x;

        }
      })!
    )
    this.subscriptions.push(
      this.form.get('oldMenMonthEnd')?.valueChanges.pipe(distinctUntilChanged()).subscribe(x => {
        if (!!x) {
          this.oldMenMonthEnd = x;

        }
      })!
    )
    this.subscriptions.push(
      this.form.get('oldWomenStart')?.valueChanges.pipe(distinctUntilChanged()).subscribe(x => {
        if (!!x) {
          this.oldWomenStart = x;

        }
      })!
    )
    this.subscriptions.push(
      this.form.get('oldWoMenYearEnd')?.valueChanges.pipe(distinctUntilChanged()).subscribe(x => {
        if (!!x) {
          this.oldWoMenYearEnd = x;

        }
      })!
    )
    this.subscriptions.push(
      this.form.get('oldWoMenMonthEnd')?.valueChanges.pipe(distinctUntilChanged()).subscribe(x => {
        if (!!x) {
          this.oldWoMenMonthEnd = x;
        }
      })!
    )

    //----------------------------------------------
    this.subscriptions.push(
      this.form.get('menYearAge')?.valueChanges.pipe(distinctUntilChanged()).subscribe(x => {
        if (!!x) {
          this.menYearAge = x;
        }
      })!
    )
    this.subscriptions.push(
      this.form.get('menMonthAge')?.valueChanges.pipe(distinctUntilChanged()).subscribe(x => {
        if (!!x) {
          this.menMonthAge = x;
        }
      })!
    )
    this.subscriptions.push(
      this.form.get('womenYearAge')?.valueChanges.pipe(distinctUntilChanged()).subscribe(x => {
        if (!!x) {
          this.womenYearAge = x;
        }
      })!
    )
    this.subscriptions.push(
      this.form.get('womenMonthAge')?.valueChanges.pipe(distinctUntilChanged()).subscribe(x => {
        if (!!x) {
          this.womenMonthAge = x;
        }
      })!
    )
  }

  ngAfterViewInit(): void {
    this.getListYear();
    if (this.year != null) {
      this.getListPeriod(this.year);
    }


    //Set value Seeker employee create report for BM1, BM2
    // setTimeout(() => {
    //   this.appService.get(api.HU_EMPLOYEE_READ + `?id=${this.authService.data$.value?.employeeId}`).subscribe(x => {
    //     if (!!x) {
    //       this.employeeGetByIdObject$.next(x.body.innerBody)

    //     }
    //   })
    // })
  }


  templateFileName!: string; //= "Report01.xlsx"

  /* Start Init Function */
  // HEADER
  onCorePageHeaderButtonClick(e: ICoreButtonVNS): void {
    switch (e.code) {
      case EnumCoreButtonVNSCode.HEADER_EXPORTEXEL:
        console.log("HEADER_EXPORTEXEL");
        console.log(this.checkFill(), this.countParamCheck());
        if (this.checkFill() != this.countParamCheck()) {
          this.alertService.error(this.mls.trans("Fill Required Feild"), noneAutoClosedAlertOptions)
        }
        else {
          if (!!this.isShowRetire) { // Đoạn này dành riêng cho Store Báo cáo cán bộ dự kiến nghỉ hưu, đừng xóa nhé!!!
            if(this.oldMenStart == null || this.oldMenStart == 0){
              this.alertService.warn(this.mls.trans(EnumTranslateKey.ACCOUNT_NOT_EXITS_EMPLOYEE), alertOptions);
            }
            else if(this.oldMenYearEnd == null || this.oldMenYearEnd == 0){
              this.alertService.warn(this.mls.trans(EnumTranslateKey.ACCOUNT_NOT_EXITS_EMPLOYEE), alertOptions);
            }
            else if(this.oldWomenStart == null || this.oldWomenStart == 0){
              this.alertService.warn(this.mls.trans(EnumTranslateKey.ACCOUNT_NOT_EXITS_EMPLOYEE), alertOptions);
            }
            else if(this.oldWoMenYearEnd == null || this.oldWoMenYearEnd == 0){
              this.alertService.warn(this.mls.trans(EnumTranslateKey.ACCOUNT_NOT_EXITS_EMPLOYEE), alertOptions);
            }
            else {
              this.loading = true;
              this.subscriptions.push(
                this.appService.blobPost(api.XLSX_REPORT_GET_REPORT, {
                  storeName: this.storeName,
                  orgIds: this.listOrgIds,
                  erCode: this.code,
                  year: this.year,
                  employeeDeclare: this.employeeDeclare,
                  employeeRepresentative: this.employeeRepresentative,
                  oldMenStart: this.oldMenStart,
                  oldMenYearEnd: this.oldMenYearEnd,
                  oldMenMonthEnd: this.oldMenMonthEnd,
                  oldWomenStart: this.oldWomenStart,
                  oldWomenYearEnd: this.oldWoMenYearEnd,
                  oldWomenMonthEnd: this.oldWoMenMonthEnd
                }).subscribe(x => {
                  if (x.ok && x.status === 200) {
                    let downloadLink = document.createElement("a");
                    downloadLink.href = window.URL.createObjectURL(new Blob([x.body]))
                    downloadLink.setAttribute("download", this.templateFileName);
                    document.body.appendChild(downloadLink);
                    downloadLink.click();
                  } else {
                    this.alertService.info("Download failed. Please contact your developer team to resolve", noneAutoClosedAlertOptions)
                  }
                  this.loading = false;
                })
              )
            }
          }
          else if (!!this.isShowRetireAge){ // Đoạn này dành riêng cho Store Báo cáo nhân viên cán bộ đến tuổi nghỉ hưu, đừng xóa nhé!!!
            if(this.menYearAge == null || this.menYearAge == 0){
              this.alertService.warn(this.mls.trans(EnumTranslateKey.ACCOUNT_NOT_EXITS_EMPLOYEE), alertOptions);
            }
            else if(this.menMonthAge == null || this.menMonthAge == 0){
              this.alertService.warn(this.mls.trans(EnumTranslateKey.ACCOUNT_NOT_EXITS_EMPLOYEE), alertOptions);
            }
            else if(this.womenYearAge == null || this.womenYearAge == 0){
              this.alertService.warn(this.mls.trans(EnumTranslateKey.ACCOUNT_NOT_EXITS_EMPLOYEE), alertOptions);
            }
            else if(this.womenMonthAge == null || this.womenMonthAge == 0){
              this.alertService.warn(this.mls.trans(EnumTranslateKey.ACCOUNT_NOT_EXITS_EMPLOYEE), alertOptions);
            }
            else {
              this.loading = true;
              this.subscriptions.push(
                this.appService.blobPost(api.XLSX_REPORT_GET_REPORT, {
                  storeName: this.storeName,
                  orgIds: this.listOrgIds,
                  erCode: this.code,
                  menYearAge: this.menYearAge, 
                  menMonthAge: this.menMonthAge, 
                  womenYearAge: this.womenYearAge, 
                  womenMonthAge: this.womenMonthAge, 
                }).subscribe(x => {
                  if (x.ok && x.status === 200) {
                    let downloadLink = document.createElement("a");
                    downloadLink.href = window.URL.createObjectURL(new Blob([x.body]))
                    downloadLink.setAttribute("download", this.templateFileName);
                    document.body.appendChild(downloadLink);
                    downloadLink.click();
                  } else {
                    this.alertService.info("Download failed. Please contact your developer team to resolve", noneAutoClosedAlertOptions)
                  }
                  this.loading = false;
                })
              )
            }
          }
          else {
            this.loading = true;
            this.subscriptions.push(
              this.appService.blobPost(api.XLSX_REPORT_GET_REPORT, {
                storeName: this.storeName,
                orgIds: this.listOrgIds,
                dateStart: this.startDate,
                dateEnd: this.endDate,
                expiredDate: this.expiredDate,
                erCode: this.code,
                year: this.year,
                month: (this.monthValue.split('-').length == 2 ? this.monthValue.split('-')[1] : this.monthDropDown),
                periodId: this.salPeriod,
                employeeDeclare: this.employeeDeclare,
                employeeRepresentative: this.employeeRepresentative
              }).subscribe(x => {
                if (x.ok && x.status === 200) {
                  let downloadLink = document.createElement("a");
                  downloadLink.href = window.URL.createObjectURL(new Blob([x.body]))
                  downloadLink.setAttribute("download", this.templateFileName);
                  document.body.appendChild(downloadLink);
                  downloadLink.click();
                } else {
                  this.alertService.info("Download failed. Please contact your developer team to resolve", noneAutoClosedAlertOptions)
                }
                this.loading = false;
              })
            )
          }

        }
        break;
      default:
        break;
    }
  }

  /*******************************/

  // CORE-ORG_TREE

  /*******************************/

  // FILTER INPUT

  onYearChange(year: number): void {
    if (year != null) {
      if (year.toString().length == 4) {
        this.year = year;
        this.getListPeriod(year);
        //console.log(this.year);
      }
    }
    else {
      console.log(1);
      this.salaryPeridOptions$.next([]);
      this.salaryPeriodGetByIdObject$.next(null);
      this.loading = false;
    }
    this.monthValue = "";
  }

  onSalPeriodChange(salPeriod: number) {
    this.salPeriod = salPeriod;
    console.log(this.salPeriod);
    if (!!salPeriod) {
      let month = this.salaryPeridOptions$.value.filter((x) =>
        x.value == salPeriod
      )[0].code?.toString();
      console.log(month);

      if (!!month) {
        this.monthDropDown = month
      }
    }
  }

  onObjSalaryChange(objSalary: number): void {
    this.objSalary = objSalary;
  }

  onStartDateChange(startDate: Date): void {
    this.startDate = startDate;
  }

  onEndDateChange(endDate: Date): void {
    this.endDate = endDate;
  }

  onExpiredDateChange(expiredDate : Date): void {
    this.expiredDate = expiredDate
  }

  onMonthChange(month: string) {
    // this.month = month.monthIndex+1;
    // this.year = month.year;
    console.log(month, 'onMonthChange');
    this.monthValue = month;
    this.monthValue = this.year.toString() + "-" + this.monthValue.split('-')[1];
    console.log(this.monthValue);
  }

  onEmployeeDeclareChange(name: any) {
    //console.log(e);
    this.employeeDeclare = name;
  }
  onEmployeeRepresentativeChange(name: any) {
    this.employeeRepresentative = name;
  }
  /*******************************/

  // Function for List DropdownLists
  getListYear() {
    this.subscriptions.push(
      this.appService
        .get(api.AT_SALARY_PERIOD_GET_YEAR)
        .subscribe((res: any) => {

          if (!!res.ok && res.status === 200) {
            const body: IFormatedResponse = res.body
            if (body.statusCode === 200 && !!body.innerBody) {
              // ONLY THEN YOU WILL IMPLEMENT YOUR LOGICS
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
          if (body.statusCode === 200) {
            const options: { value: number; text: string; code: string }[] = [];
            body.innerBody.map((get: any) => {
              if (get.month == new Date().getMonth() + 1) {
                this.periodNow = get.id
              }
              options.push({
                value: get.id,
                text: get.name,
                code: get.month,
              });
            });
            this.salaryPeridOptions$.next(options);
            this.salPeriod = this.periodNow;
            this.onSalPeriodChange(this.periodNow);
            console.log(this.periodNow);
          } else {
            //this.responseService.resolve(body)
          }
        } else {
          //this.alertService.error(JSON.stringify(x), alertOptions)
        }
      }
      ))
  }



  /*******************************/

  // CORE-LIST
  onListTypeReportsChange(id: number) {
    this.resetValue();
    this.typeReportId = id;
    const filter = this.typeList.filter(X => X.id === id)
    if (!!filter.length) {
      console.log(filter[0].code + " - " + filter[0].storeName)
      this.typeReportCode = filter[0].code
      this.storeName = filter[0].storeName
      this.code = filter[0].code
      this.templateFileName = filter[0].description + ".xlsx"

    }
    if (filter[0].code == "BIRTHDAY_REPORT") {
      this.resetDisplay();
      this.disableOrgTree = false;
      this.displayStartDate = true;
      this.displayEndDate = true;
    }
    if (filter[0].code == "LABOR_REPORT") {
      this.resetDisplay();
      this.disableOrgTree = false;
      this.displayStartDate = true;
      this.displayEndDate = true;
    }
    if (filter[0].code == "INSURANCE_REPORT") {
      this.resetDisplay();
      this.displayYear = true;
      this.disableOrgTree = false;
      this.displayMonth = true;
    }
    if (filter[0].code == "TRANSFER_PAYROLL_REPORT") {
      this.resetDisplay();
      this.displayYear = true;
      this.displaySalPeriod = true;
      this.disableOrgTree = false;
    }
    if (filter[0].code == "PAYROLL_ALLOWANCE_REPORT") {
      this.resetDisplay();
      this.disableOrgTree = false;
      this.displayYear = true;
      this.displayMonth = true;
    }
    if (filter[0].code == "DOCUMENT_REPORT") {
      this.resetDisplay();
      this.disableOrgTree = false;
      this.displayStartDate = true;
      this.displayEndDate = true;
    }
    if (filter[0].code == "STAFF_EXPECTED_TO_RETIRE_REPORT") {
      this.resetDisplay();
      this.disableOrgTree = false;
      this.displayYear = true;
      this.isShowRetire = true;
    }
    if (filter[0].code == "STAFF_EXPIRE_CONTRACT") {
      this.resetDisplay();
      this.disableOrgTree = false;
      this.displayExpiredDate = true
    }
    if (filter[0].code == "LABOR_REPORT_BY_CONTRACT_TYPE_REPORT") {
      this.resetDisplay();
      this.disableOrgTree = false;
      this.displayStartDate = true;
      this.displayEndDate = true;
    }
    if (filter[0].code == "LABOR_REPORT_BY_AGE_GENDER_LEVEL_REPORT") {
      this.resetDisplay();
      this.disableOrgTree = false;
      this.displayYear = true;
    }
    if (filter[0].code == "PERSONNEL_PLANING_REPORT") {
      this.resetDisplay();
      this.disableOrgTree = false; 
      this.displayYear = true;
    }
    if (filter[0].code == "CONTRACT_EXPIRED_REPORT") {
      this.resetDisplay();
      this.displayYear = true;
      this.disableOrgTree = false;
      this.displayMonth = true;
    } 
    if (filter[0].code == "STAFF_TO_RETIREMENT_AGE_REPORT") {
      this.resetDisplay();
      this.isShowRetireAge = true;
      this.disableOrgTree = false;
    } 
    if (filter[0].code == "MONTHLY_BIRTHDAY_EMPLOYEES_REPORT") {
      this.resetDisplay();
      this.displayYear = true;
      this.disableOrgTree = false;
    } 
  }

  resetValue(): void {
    this.year = (new Date()).getFullYear();
    this.salPeriod = this.periodNow;
    this.objSalary = 0;
    this.listOrgIds = [];
    this.startDate = new Date();
    this.endDate = new Date();
    this.monthValue = "";
    this.monthDropDown = "";
    this.getListPeriod((new Date()).getFullYear())
    this.menYearAge = 0;
    this.menMonthAge = 0;
    this.womenYearAge = 0;
    this.womenMonthAge = 0;
  }

  /* End Init Function */

  checkFill(): number {
    let flagCheck: number = 0;
    if (this.displayYear == true) {
      flagCheck += this.year != null ? 1 : 0;
    }
    if (this.displaySalPeriod == true) {
      flagCheck += this.salPeriod != null ? 1 : 0;
    }
    if (this.displayObjSalary == true) {
      flagCheck += this.objSalary != null ? 1 : 0;
    }
    if (this.disableOrgTree == false) {
      flagCheck += (this.listOrgIds.length != 0) ? 1 : 0;
    }
    if (this.displayStartDate == true) {
      flagCheck += this.startDate != null ? 1 : 0;
    }
    if (this.displayEndDate == true) {
      flagCheck += this.endDate != null ? 1 : 0;
    }
    if (this.displayMonth == true) {
      flagCheck += this.monthValue != null ? 1 : 0;
    }
    return flagCheck;
  }

  countParamCheck(): number {
    let numberParam: number = 0;
    if (this.displayYear == true) {
      numberParam++;
    }
    if (this.displaySalPeriod == true) {
      numberParam++;
    }
    if (this.displayObjSalary == true) {
      numberParam++;
    }
    if (this.disableOrgTree == false) {
      numberParam++;
    }
    if (this.displayStartDate == true) {
      numberParam++;
    }
    if (this.displayEndDate == true) {
      numberParam++;
    }
    if (this.displayMonth == true) {
      numberParam++;
    }
    return numberParam;
  }

  resetDisplay(): void {
    this.displayYear = false;
    this.displayEmployeeFirstName = false;
    this.displayEmployeeSecondName = false;
    this.displayExpiredDate = false;
    this.displaySalPeriod = false;
    this.displayObjSalary = false;
    this.disableOrgTree = true;
    this.displayStartDate = false;
    this.displayEndDate = false;
    this.displayMonth = false;
    this.isShowRetire = false;
    this.isShowRetireAge = false;
  }

}
