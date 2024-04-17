
import { Component } from "@angular/core";
import { ShiftSortComponent } from "../shiftsort.component";
import { AlertService, AppService, BaseEditComponent, CoreFormService, DialogService, EnumCoreFormControlSeekerSourceType, EnumFormBaseContolType, ICoreDropdownOption, ICoreFormSection, ICorePageEditCRUD, ICorePageEditColumnComposition, IFormatedResponse, MultiLanguageService, ResponseService, UrlService,} from "ngx-histaff-alpha";
import { FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { BehaviorSubject, Subscription, map } from "rxjs";
import { ShiftSortService } from "../shiftsort.service";
import { api, EnumTranslateKey } from 'alpha-global-constants';

@Component({
  selector: "app-shiftsort-edit",
  templateUrl: "./shiftsort-edit.component.html",
  styleUrls: ["./shiftsort-edit.component.scss"],
  providers: [
    ShiftSortComponent
  ]
})
export class ShiftSortEditComponent extends BaseEditComponent {
  /* Properties to be passed into core-page-edit */
  override entityTable = "AT_WORKSIGN";

  loading: boolean = false;
  year?: number;
  periodId?: number;
  employeeId?: number;
  startDate!: any;
  endDate!: any;
  shiftId!: number;
  minDate!: Date;
  maxDate!: Date;

  employeeGetByIdObject$ = new BehaviorSubject<any>(null);
  employeeGetByIdApi = api.HU_EMPLOYEE_READ;

  shiftOptions$ = new BehaviorSubject<ICoreDropdownOption[]>([]);
  atShiftGetByIdObject$ = new BehaviorSubject<any>(null);
  atShiftGetByIdApi = api.AT_SHIFT_READ;

  captionCode!: EnumTranslateKey;
  formComposition!: ICorePageEditColumnComposition[][];
  subsctiptions: Subscription[] = [];
  crud!: ICorePageEditCRUD;
  sections!: ICoreFormSection[];

  employeeIds!: number[];

  public preDefinedOuterParam$ = new BehaviorSubject<any>({
    isLeaveWork: false,
  })

  constructor(
    public mls: MultiLanguageService,
    public override dialogService: DialogService,
    private shiftSortService: ShiftSortService,
    private appService: AppService, // CoreService is DEPRECATED!!!
    private coreFormService: CoreFormService,
    private responseService: ResponseService,
    private alertService: AlertService,
    private router: Router,
    private route: ActivatedRoute,
    private urlService: UrlService,
    private shiftSortComponent: ShiftSortComponent
  ) {
    super(dialogService);

    this.captionCode = EnumTranslateKey.UI_COMPONENT_TITLE_AT_SHIFT_SORT;

    this.crud = {
      c: api.AT_SHIFT_SORT_CREATE,
      r: api.AT_SHIFT_SORT_READ,
      u: api.AT_SHIFT_SORT_UPDATE,
      d: api.AT_SHIFT_SORT_DELETE,
    };

    // get year, periodId, employeeSelected, minDate, maxDate from List page
    this.shiftSortService.currentSelectedYear.subscribe(year => this.year = year);

    this.shiftSortService.currentperiodId.subscribe(id => this.periodId = id);
    
    //this.shiftSortService.currentemployeeSelected.subscribe(id => this.employeeId = id);
    this.shiftSortService.currentListEmployeeSelected.subscribe(id => this.employeeId = id[0]);

    this.shiftSortService.currentMinDate.subscribe(date => this.minDate = new Date(new Date(date).setHours(0,0,0,0)));

    this.shiftSortService.currentMaxDate.subscribe(date => this.maxDate = new Date(new Date(date).setHours(23,59,59,999)));
    
    console.log(this.employeeId);
  }

  /* GET FormGroup Instance */
  onFormCreated(e: FormGroup): void {

    this.form = e;
    if (!!!this.periodId || this.periodId === 0) {
      this.subsctiptions.push(
        this.shiftSortService.getCurrentPeriodSalary()
          .pipe(
            map((f: any) => {
              let options: number;
              options = f.body.innerBody.id;
              this.periodId = options;
              console.log(this.periodId);
              return options;
            })
          )
          .subscribe(response => {
            if (this.form.get('periodId')?.value == "")
              this.form.get('periodId')?.patchValue(response);
          })
      )!
    }

    console.log(this.form.get('employeeId')?.patchValue(this.employeeId));

    if (this.employeeId != null) {
      var empsObj = this.coreFormService.getFormBaseControlByName(this.sections, 'employeeIds');
      var empCodeObj = this.coreFormService.getFormBaseControlByName(this.sections, 'employeeCode');
      var employeeNameObj = this.coreFormService.getFormBaseControlByName(this.sections, 'employeeName');
      var orgNameObj = this.coreFormService.getFormBaseControlByName(this.sections, 'orgName');
      var positionNameObj = this.coreFormService.getFormBaseControlByName(this.sections, 'positionName');
      if (empsObj) {
        empsObj.hidden = true;
      }
      if (empCodeObj) {
        empCodeObj.hidden = false;
      }
      if (employeeNameObj) {
        employeeNameObj.hidden = false;
      }
      if (orgNameObj) {
        orgNameObj.hidden = false;
      }
      if (positionNameObj) {
        positionNameObj.hidden = false;
      }
      this.form.get('employeeId')?.patchValue(this.employeeId);
    } else {
      var empCodeObj = this.coreFormService.getFormBaseControlByName(this.sections, 'employeeCode');
      var employeeNameObj = this.coreFormService.getFormBaseControlByName(this.sections, 'employeeName');
      var orgNameObj = this.coreFormService.getFormBaseControlByName(this.sections, 'orgName');
      var positionNameObj = this.coreFormService.getFormBaseControlByName(this.sections, 'positionName');
      if (empCodeObj) {
        empCodeObj.hidden = true;       
      }
      if (employeeNameObj) {
        employeeNameObj.hidden = true;
      }
      if (orgNameObj) {
        orgNameObj.hidden = true;
      }
      if (positionNameObj) {
        positionNameObj.hidden = true;
      }
    }
  }

  /* To allow form to be deactivated */
  onFormReinit(e: string): void {
    this.formInitStringValue = e;
    
    if (this.periodId != 0) {
      if (this.form.get('periodId')?.value == "")
        this.form.get('periodId')?.patchValue(this.periodId);
    }
    if (this.employeeId != 0) {
      if (this.form.get('id')?.value == "")
        this.form.get('id')?.patchValue(this.employeeId);
    }

    console.log(this.form.get('id')!.value);

  }

  ngOnInit(): void {
    this.sections =
    [
      {
        rows: [
          [
            {
              flexSize: 4,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_COMMON_ID,
              field: 'id',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              readonly: true,
              hidden: true,
              type: 'text'
            },
            {
              flexSize: 4,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_COMMON_ID,
              field: 'periodId',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              readonly: true,
              hidden: true,
              type: 'number'
            },
          ],
          [
            {
              flexSize: 3,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_AT_SHIFT_SORT_EMPLOYEE_CODE,
              field: 'employeeCode',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              type: 'text',
              disabled: true,
              validators:[],
            },
            {
              flexSize: 3,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_AT_SHIFT_SORT_EMPLOYEE_NAME,
              field: 'employeeName',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              type: 'text',
              disabled: true,
            },
            {
              flexSize: 3,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_AT_SHIFT_SORT_DEPARTMENT_NAME,
              field: 'orgName',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              type: 'text',
              disabled: true,
            },
            {
              flexSize: 3,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_AT_SHIFT_SORT_POSITION_NAME,
              field: 'positionName',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              type: 'text',
              disabled: true,
            },
          ],
          [
            {
              flexSize: 3,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_AT_SHIFT_SORT_SHIFT,
              field: 'shiftId',
              value: '',
              controlType: EnumFormBaseContolType.DROPDOWN,
              dropdownOptions$: this.shiftOptions$,
              getByIdObject$: this.atShiftGetByIdObject$,
              getByIdApi: this.atShiftGetByIdApi,
              shownFrom: 'name',
              readonly: false,
              type: 'number',
              validators: [
                {
                  name: 'required',
                  validator: Validators.required,
                  errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
                }
              ]
            },
            {
              flexSize: 3,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_AT_SHIFT_DATE_START,
              field: 'startDate',
              value: '',
              controlType: EnumFormBaseContolType.DATEPICKER,
              rangeLimit: {
                minDate: this.minDate,
                maxDate: this.maxDate
              },
              readonly: false,
              type: 'text',
              validators: [
                {
                  name: 'required',
                  validator: Validators.required,
                  errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
                }
              ]
            },
            {
              flexSize: 3,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_AT_SHIFT_DATE_END,
              field: 'endDate',
              value: '',
              controlType: EnumFormBaseContolType.DATEPICKER,
              rangeLimit: {
                minDate: this.minDate,
                maxDate: this.maxDate
              },
              readonly: false,
              type: 'text',
              validators: [
                {
                  name: 'required',
                  validator: Validators.required,
                  errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
                }
              ]
            },
          ],
        ]
      },
      {
        rows: [
          [
            {
              flexSize: 12,
              label: EnumTranslateKey.UI_COMPONENT_TITLE_EMPLOYEE_CHECKER,
              field: 'employeeIds',
              value: [],
              controlType: EnumFormBaseContolType.SEEKER,
              type: 'object',
              /* 
                START: Thay đổi thuộc tính của SEEKER để có SELECTOR:
              */
              seekerSourceType: EnumCoreFormControlSeekerSourceType.EMPLOYEE_SEEK,
              multiMode: true,
              objectList$: new BehaviorSubject<any[]>([]),
              getObjectListFrom: 'employeeList',
              getByIdObject$: this.employeeGetByIdObject$,
              getByIdApi: this.employeeGetByIdApi,
              boundFrom: 'id',
              shownFrom: 'fullname',
              preDefinedOuterParam$: this.preDefinedOuterParam$,
              // alsoBindTo: [{ takeFrom: 'positionName', bindTo: 'signPosition' }],
              /* END: WHEN USING controlType === EnumFormBaseContolType.SEEKER */
            },
            {
              flexSize: 12,
              label: EnumTranslateKey.UI_COMMON_EMPTY_STRING,
              field: 'employeeList',
              value: [],
              controlType: EnumFormBaseContolType.HIDDEN,
              type: 'object',
            },
          ]
        ]
      }
    ];

    console.log("salary period ", this.periodId);
    console.log("employee id ", this.employeeId);
    this.loading = true;
    this.subsctiptions.push(
      this.appService
        .get(api.AT_SHIFT_GETLISTTOIMPORT)
        .subscribe((res: any) => {

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
                  value: g.id,
                  text: g.name
                })
              })
              this.shiftOptions$.next(options);
            }
          }
        })
    )
    if(this.employeeId != 0){
      this.captionCode = EnumTranslateKey.UI_COMPONENT_TITLE_AT_SHIFT_SORT_EDIT;
      this.subsctiptions.push(
        this.appService
          .post(api.AT_SHIFT_SORT_GET_EMP_INFO, {employeeId : this.employeeId})
          .subscribe((res: any) => {
  
            if (!!res.ok && res.status === 200) {
              const body: IFormatedResponse = res.body
              if (body.statusCode === 200 && !!body.innerBody) {
                this.form.get('employeeCode')?.patchValue(body.innerBody.code);
                this.form.get('employeeName')?.patchValue(body.innerBody.name);
                this.form.get('orgName')?.patchValue(body.innerBody.departmentName);
                this.form.get('positionName')?.patchValue(body.innerBody.positionName);
              }
            }
          })
      )
    }
  }

  ngAfterViewInit(): void {
    console.log("min: " + this.minDate);
    console.log("max: " + this.maxDate);
  }

  onEdit(e: FormGroup): void {
    console.log("employeeId ", this.employeeId);
    this.startDate = this.form?.get('startDate')?.value;
    this.endDate = this.form?.get('endDate')?.value;
    this.shiftId = this.form?.get('shiftId')?.value;
    console.log(this.startDate + " " + this.endDate + " " + this.shiftSortComponent.orgId);
    if (!!this.startDate && !!this.endDate) {
      if(this.employeeId != null){
        console.log("update");
        this.loading = true;
        this.subsctiptions.push(
          this.appService.post(api.AT_SHIFT_SORT_UPDATE, { shiftId: this.shiftId, periodId: this.periodId, startDate: this.startDate, endDate: this.endDate, employeeId: this.employeeId }).subscribe(x => {
            if (x.ok && x.status === 200) {
              const body: IFormatedResponse = x.body
              if (body.statusCode === 200) {
                //this.alertService.success(body.messageCode, alertOptions)
                this.router.navigateByUrl(this.urlService.previousRouteUrl$.value);
                this.shiftSortService.changeperiodID(this.periodId == null ? 0 : this.periodId);
              } else {
                //this.responseService.resolve(body)
              }
            } else {
              //this.alertService.error(JSON.stringify(x), alertOptions)
            }
            this.loading = false;
          })
        )
      }
      else{
        console.log("create");
        console.log("create", this.form.getRawValue());
        console.log(this.startDate, this.endDate, this.employeeIds);
        this.loading = true;
        this.subsctiptions.push(
          this.appService.post(api.AT_SHIFT_SORT_CREATE, this.form.getRawValue()).subscribe(x => {
            if (x.ok && x.status === 200) {
              const body: IFormatedResponse = x.body
              if (body.statusCode === 200) {
                //this.alertService.success(body.messageCode, alertOptions)
                this.router.navigateByUrl(this.urlService.previousRouteUrl$.value);
                this.shiftSortService.changeperiodID(this.periodId == null ? 0 : this.periodId);
              } else {
                //this.responseService.resolve(body)
              }
            } else {
              //this.alertService.error(JSON.stringify(x), alertOptions)
            }
            this.loading = false;
          })
        )
      }
    }
  }
}