import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { api, EnumTranslateKey } from 'alpha-global-constants';
import { BaseEditComponent, EnumCoreButtonVNSCode, ICoreDropdownOption, ICorePageEditCRUD, ICoreFormSection, EnumFormBaseContolType, DialogService, MultiLanguageService, AppService, LayoutService, AuthService, UrlService, IAuthData, IFormatedResponse } from 'ngx-histaff-alpha';
import { BehaviorSubject, Subscription, map } from 'rxjs';

@Component({
  selector: 'app-register-off-edit',
  templateUrl: './register-off-edit.component.html',
  styleUrls: ['./register-off-edit.component.scss']
})
export class RegisterOffEditComponent extends BaseEditComponent implements OnDestroy {

  disableAllButton: EnumCoreButtonVNSCode[] = [];

  leaveDayRemaining!: number;
  leaveDayUsed!: number;

  loading!: boolean;
  shownFrom!: string;

  timeTypeOptions$ = new BehaviorSubject<ICoreDropdownOption[]>([]);
  timeTypeGetByIdObject$ = new BehaviorSubject<any>(null);
  timeTypeGetByIdApi = api.AT_TIME_TYPE_READ;

  eachDay = EnumTranslateKey.UI_COMPONENT_LABEL_REGISTER_LEAVE_IS_DETAIL;
  dayOff = EnumTranslateKey.UI_COMPONENT_LABEL_REGISTER_LEAVE_DETAIL_DAY;
  type = EnumTranslateKey.UI_COMPONENT_LABEL_REGISTER_LEAVE_DETAIL_TYPE;
  totalDayOff = EnumTranslateKey.UI_ENTITY_FIELD_PORTAL_CAPTION_PAYROLL_NOTE_LIST_INCOME;
  workingShift = EnumTranslateKey.UI_COMPONENT_LABEL_REGISTER_LEAVE_DETAIL_SHIFT;
  shiftCode = EnumTranslateKey.UI_COMPONENT_LABEL_REGISTER_LEAVE_DETAIL_SHIFT_CODE

  totalLeaveDay = EnumTranslateKey.UI_COMPONENT_TITLE_TOTAL_LEAVE_DAY_REMAINING;
  totalLeaveDayUse = EnumTranslateKey.UI_COMPONENT_TITLE_TOTAL_LEAVE_DAY_USE;

  isEachDay: boolean = false;
  listDay: string[] = [];
  defaultCode: string = "";
  typeCode: string = "";

  // type off 
  typeOff!: number;
  typeOffOptions$ = new BehaviorSubject<ICoreDropdownOption[]>([]);
  typeOffGetByIdObject$ = new BehaviorSubject<any>(null);
  typeOffGetByIdApi = api.SYS_OTHERLIST_READ

  lang!: string;
  employeeId!: number;
  receiverWorkerOptions$ = new BehaviorSubject<ICoreDropdownOption[]>([]);
  receiverWorkerGetByIdObject$ = new BehaviorSubject<any>(null);
  receiverWorkerGetByIdApi = api.HU_EMPLOYEE_READ;
  crud!: ICorePageEditCRUD;
  override entityTable = "PORTAL_REGISTER_OFF";
  subscriptions: Subscription[] = [];
  landscapeMode: any
  sections: ICoreFormSection[] =
    [
      {
        caption: EnumTranslateKey.UI_COMPONENT_TITLE_AT_REGISTER_LEAVE_EDIT,
        rows: [
          [
            {
              flexSize: 12,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_COMMON_ID,
              field: 'id',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              readonly: true,
              type: 'text',
              hidden: true
            },
            {
              flexSize: 12,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_COMMON_ID,
              field: 'typeCode',
              value: 'OFF',
              controlType: EnumFormBaseContolType.TEXTBOX,
              readonly: true,
              type: 'string',
              hidden: true
            },
            {
              flexSize: 12,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_COMMON_ID,
              field: 'employeeId',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              readonly: true,
              type: 'string',
              hidden: true
            }
          ],
          [
            {
              flexSize: 6,
              label: EnumTranslateKey.UI_COMPONENT_TITLE_AT_REGISTER_OFF_DATE_START,
              field: 'dateStart',
              value: '',
              type: 'date',
              controlType: EnumFormBaseContolType.DATEPICKER,
              validators: [
                {
                  name: 'required',
                  validator: Validators.required,
                  errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
                },
              ],
            },
            {
              flexSize: 6,
              label: EnumTranslateKey.UI_COMPONENT_TITLE_AT_REGISTER_OFF_DATE_END,
              field: 'dateEnd',
              value: '',
              type: 'date',
              controlType: EnumFormBaseContolType.DATEPICKER,
              validators: [
                {
                  name: 'required',
                  validator: Validators.required,
                  errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
                },
              ],
            }
          ],
          [
            {
              flexSize: 6,
              label: EnumTranslateKey.UI_COMPONENT_TITLE_AT_REGISTER_OFF_TIME_TYPE,
              field: 'timeTypeId',
              value: '',
              type: 'string',
              controlType: EnumFormBaseContolType.DROPDOWN,
              shownFrom: 'name',
              dropdownOptions$: this.timeTypeOptions$,
              getByIdObject$: this.timeTypeGetByIdObject$,
              getByIdApi: this.timeTypeGetByIdApi,
              validators: [
                {
                  name: 'required',
                  validator: Validators.required,
                  errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
                },
              ],
            },
            {
              flexSize: 6,
              label: EnumTranslateKey.UI_COMPONENT_TITLE_AT_REGISTER_OFF_APPROVE,
              field: 'receiveWorkerId',
              value: '',
              type: 'string',
              shownFrom: 'name',
              controlType: EnumFormBaseContolType.DROPDOWN,
              dropdownOptions$: this.receiverWorkerOptions$,
              getByIdObject$: this.receiverWorkerGetByIdObject$,
              getByIdApi: this.receiverWorkerGetByIdApi,
            }
          ],
          [
            {
              flexSize: 12,
              label: EnumTranslateKey.UI_COMPONENT_TITLE_AT_REGISTER_OFF_NOTE,
              field: 'note',
              value: '',
              type: 'string',
              controlType: EnumFormBaseContolType.TEXTAREA,
            }
          ],
          [
            {
              flexSize: 4,
              label: EnumTranslateKey.UI_COMPONENT_LABEL_REGISTER_LEAVE_IS_DETAIL,
              field: 'isEachDay',
              value: false,
              controlType: EnumFormBaseContolType.CHECKBOX,
              type: 'boolean',
            },
          ]
        ]
      },
    ];

  constructor(
    public override dialogService: DialogService,
    public mls: MultiLanguageService,
    private appService: AppService,
    private layoutService: LayoutService,
    private authService: AuthService,
    private urlService: UrlService
  ) {

    super(dialogService);
    this.shownFrom = 'name'

    this.crud = {
      c: api.PORTAL_REGISTER_OFF_REGISTER_OFF_DETAIL,
      r: api.PORTAL_REGISTER_OFF_READ,
      u: api.PORTAL_REGISTER_OFF_UPDATE,
      d: api.PORTAL_REGISTER_OFF_DELETE,
    };
    urlService.currentRouteUrl$.next('/register-off/register-off-edit')
    urlService.previousRouteUrl$.next('/register-off')

  }

  ngOnInit(): void {
    this.subscriptions.push(
      this.mls.lang$.subscribe(x => this.lang = x)
    );
    this.subscriptions.push(
      this.layoutService.landscapeMode$.subscribe(x => {
        this.landscapeMode = x;
        console.log(this.landscapeMode)
      })
    )
    this.authService.data$.subscribe((x: IAuthData | null) => this.employeeId = x?.employeeId!);
  }

  ngAfterViewInit(): void {
    this.subscriptions.push(
      this.appService
        .get(api.HU_EMPLOYEE_GET_ALL_IGNORE_CURRENT_USER)
        .subscribe((res: any) => {
          if (!!res.ok && res.status === 200) {
            const body: IFormatedResponse = res.body
            if (body.statusCode === 200 && !!body.innerBody) {
              const options: { value: number | null; text: string; }[] = [];
              res.body.innerBody.map((g: any) => {
                options.push({
                  value: g.id,
                  text: g.name
                })
              })
              this.receiverWorkerOptions$.next(options);
            }
          }
        })
    )

    this.subscriptions.push(
      this.appService
        .get(api.AT_REGISTER_LEAVE_LIST_TYPE_OFF)
        .subscribe((res: any) => {
          if (!!res.ok && res.status === 200) {
            const body: IFormatedResponse = res.body
            if (body.statusCode === 200 && !!body.innerBody) {
              const options: { value: number | null; text: string; }[] = [];
              res.body.innerBody.map((g: any) => {
                options.push({
                  value: g.id,
                  text: g.name
                })
              })
              this.timeTypeOptions$.next(options);
            }
          }
        })
    )!

    this.subscriptions.push(
      this.appService.get(api.PORTAL_REGISTER_OFF_GET_LEAVE_DAY).subscribe(x => {
        if (x.ok && x.status == 200) {
          const body: IFormatedResponse = x.body
          if (body.statusCode === 200) {
            this.leaveDayRemaining = body.innerBody.remainingDay;
            this.leaveDayUsed = body.innerBody.used;
            //console.log(this.leaveDayRemaining, this.leaveDayUsed);
          } else {
            //this.responseService.resolve(body)
          }
        } else {
          //this.alertService.error(JSON.stringify(x), alertOptions)
        }
      })
    )!

    this.subscriptions.push(
      this.appService
      .get(api.SYS_OTHERLIST_GETOTHERLISTBYTYPE + 'TYPE_OFF')
      .subscribe((res: any) => {
        const options: { value: number; text: string; }[] = [];
        res.body.innerBody.map((g: any) => {
          options.push({
            value: g.id,
            text: g.name,
          })
        })
        this.typeOffOptions$.next(options);
        this.loading = false;
      })
    )!
  }

  onFormCreated(e: FormGroup) {
    this.form = e
    this.form.get('employeeId')?.patchValue(this.employeeId);
    const dateStart = this.form.get('dateStart');
    const dateEnd = this.form.get('dateEnd');
    const isDetail = this.form.get('isEachDay');

    const typeId = this.form.get('timeTypeId');

    if (dateStart && dateEnd) {
      this.subscriptions.push(
        dateStart.valueChanges.subscribe((x: any) => {
          if (dateStart.value != null && dateStart.value != "" && dateEnd.value != null && dateEnd.value != "" && isDetail?.value == true  && typeId?.value != null && typeId.value != "") {
            console.log("dateStart.valueChanges");
            const startDateNew = new Date(dateStart?.value.getFullYear(), dateStart?.value.getMonth(), dateStart?.value.getDate(), 12);
            const endDateNew = new Date(dateEnd?.value.getFullYear(), dateEnd?.value.getMonth(), dateEnd?.value.getDate(), 12);
            this.generateSections(startDateNew.toString(), endDateNew.toString());
            this.fillDataSections(startDateNew.toString(), endDateNew.toString());
            this.fillDayManual(startDateNew.toString(), endDateNew.toString());
          }
        }),
        dateEnd.valueChanges.subscribe((x: any) => {
          if (dateEnd.value != null && dateEnd.value != "" && dateStart.value != null && dateStart.value != "" && isDetail?.value == true  && typeId?.value != null && typeId.value != "") {
            const startDateNew = new Date(dateStart?.value.getFullYear(), dateStart?.value.getMonth(), dateStart?.value.getDate(),12);
            const endDateNew = new Date(dateEnd?.value.getFullYear(), dateEnd?.value.getMonth(), dateEnd?.value.getDate(), 12);
            this.generateSections(startDateNew.toString(), endDateNew.toString());
            this.fillDataSections(startDateNew.toString(), endDateNew.toString());
            this.fillDayManual(startDateNew.toString(), endDateNew.toString());
          }
        }),
      );
    }
    if (isDetail) {
      this.subscriptions.push(
        isDetail.valueChanges.subscribe((x: any) => {
          if (x) {
            if (dateStart?.value != null && dateStart?.value != "" && dateEnd?.value != null && dateEnd?.value != ""  && typeId?.value != null && typeId.value != "") {
              const startDateNew = new Date(dateStart?.value.getFullYear(), dateStart?.value.getMonth(), dateStart?.value.getDate(), 12);
              const endDateNew = new Date(dateEnd?.value.getFullYear(), dateEnd?.value.getMonth(), dateEnd?.value.getDate(), 12);
              this.generateSections(startDateNew.toString(), endDateNew.toString());
              this.fillDataSections(startDateNew.toString(), endDateNew.toString());
              this.fillDayManual(startDateNew.toString(), endDateNew.toString());
            }
          }
          else {
            this.sections.splice(1);
          }
        })
      )
    }

    if (typeId) {
      this.subscriptions.push(
        typeId.valueChanges.subscribe((x: any) => {
          this.sections.splice(1);
          if (dateStart?.value != null && dateStart?.value != "" && dateEnd?.value != null && dateEnd?.value != "" && typeId?.value != null && typeId.value != ""&& isDetail?.value == true) {
            const startDateNew = new Date(dateStart?.value.getFullYear(), dateStart?.value.getMonth(), dateStart?.value.getDate(), 12 );
            const endDateNew = new Date(dateEnd?.value.getFullYear(), dateEnd?.value.getMonth(), dateEnd?.value.getDate(), 12);
            this.generateSections(startDateNew.toString(), endDateNew.toString());
            this.fillDataSections(startDateNew.toString(), endDateNew.toString());
            this.fillDayManual(startDateNew.toString(), endDateNew.toString());
          }
        })
      )
    }
  }

  generateSections(dateStart: string, dateEnd: string): void {
    this.sections.splice(1);
    const startDate = new Date(dateStart);
    const endDate = new Date(dateEnd);
    this.sections.push({
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_AT_REGISTER_LEAVE_EDIT_DETAIL,
      rows: [],
    });

    // gen số hàng tương ứng số ngày đăng kí
    let i = 1;
    for (let date = startDate; date <= endDate; date.setDate(date.getDate() + 1)) {
      const control = this.form.get('dateStart' + i);
      if (!control) {
        this.form.addControl('dateStart' + i, new FormControl());
      }

      const controlType = this.form.get('dType' + i);
      if (!controlType) {
        this.form.addControl('dType' + i, new FormControl());
      }

      const controlShiftId = this.form.get('shiftId' + i);
      if (!controlShiftId) {
        this.form.addControl('shiftId' + i, new FormControl());
      }

      const controlShift = this.form.get('shift' + i);
      if (!controlShift) {
        this.form.addControl('shift' + i, new FormControl());
      }

      const controlDay = this.form.get('day' + i);
      if (!controlDay) {
        this.form.addControl('day' + i, new FormControl());
      }

      const controlShiftCode = this.form.get('shiftCode' + i);
      if (!controlShiftCode) {
        this.form.addControl('shiftCode' + i, new FormControl());
      }

      const controlShiftCodeDefault = this.form.get('shiftCodeDefault' + i);
      if (!controlShiftCodeDefault) {
        this.form.addControl('shiftCodeDefault' + i, new FormControl());
      }

      this.sections[1].rows.push(
        [
          // Id Ca làm việc
          {
            label: EnumTranslateKey.UI_COMPONENT_LABEL_REGISTER_LEAVE_DETAIL_SHIFT,
            flexSize: 0,
            field: 'shiftId' + i,
            value: '',
            controlType: EnumFormBaseContolType.TEXTBOX,
            type: 'text',
            hidden: true,
          },
          // Ngày nghỉ
          {
            flexSize: 3,
            label: EnumTranslateKey.UI_COMPONENT_LABEL_REGISTER_LEAVE_DETAIL_DAY,
            field: 'dateStart' + i,
            value: '',
            controlType: EnumFormBaseContolType.DATEPICKER,
            type: 'date'
          },
          // Đầu ca/cuối ca
          {
            flexSize: 2,
            label: EnumTranslateKey.UI_COMPONENT_LABEL_REGISTER_LEAVE_DETAIL_DATE,
            field: 'dType' + i,
            value: '',
            getByIdObject$: this.timeTypeGetByIdObject$,
            getByIdApi: this.typeOffGetByIdApi,
            shownFrom: 'name',
            controlType: EnumFormBaseContolType.DROPDOWN,
            dropdownOptions$: this.typeOffOptions$,
            type: 'number',
            validators: [
              {
                name: 'required',
                validator: Validators.required,
                errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
              }
            ]
          },
          // Số ngày nghỉ
          {
            flexSize: 2,
            label: EnumTranslateKey.UI_COMPONENT_LABEL_REGISTER_LEAVE_DETAIL_DAY,
            field: 'day' + i,
            value: '',
            controlType: EnumFormBaseContolType.TEXTBOX,
            type: 'number',
            disabled: true,
          },
          
          // Ca làm việc
          {
            flexSize: 2,
            label: EnumTranslateKey.UI_COMPONENT_LABEL_REGISTER_LEAVE_DETAIL_SHIFT,
            field: 'shift' + i,
            value: '',
            controlType: EnumFormBaseContolType.TEXTBOX,
            type: 'text',
            disabled: true,
          },
          // Ngày công ca
          {
            flexSize: 3,
            label: EnumTranslateKey.UI_COMPONENT_LABEL_REGISTER_LEAVE_DETAIL_SHIFT_CODE,
            field: 'shiftCode' + i,
            value: '',
            controlType: EnumFormBaseContolType.TEXTBOX,
            type: 'text',
            disabled: true,
          },
          // Code Ca làm việc
          {
            flexSize: 2,
            label: EnumTranslateKey.UI_COMPONENT_LABEL_REGISTER_LEAVE_DETAIL_SHIFT_CODE,
            field: 'shiftCodeDefault' + i,
            value: '',
            controlType: EnumFormBaseContolType.TEXTBOX,
            type: 'text',
            disabled: true,
            hidden: true
          },
        ]
      )


      i = i + 1;
    }
  }

  fillDataSections(dateStart: string, dateEnd: string): void {
    const startDate = new Date(dateStart);
    const endDate = new Date(dateEnd);
    const millisecondsPerDay = 1000 * 60 * 60 * 24;
    const timeDifference = endDate.getTime() - startDate.getTime();
    const numberOfDays = Math.ceil(timeDifference / millisecondsPerDay)+1;  // tổng số ngày đăng ký
    console.log(startDate);
    // điền từng ngày vào ngày đăng kí 
    for (let i = 0; i < numberOfDays; i++) {
      console.log("numberOfDays", i);
      // set date
      const currentDate = new Date(startDate);
      currentDate.setDate(currentDate.getDate() + i);
      const controlShift = this.form.get('shift' + (i + 1));
      const controlShiftId = this.form.get('shiftId' + (i + 1));
      const controlShiftCode = this.form.get('shiftCode' + (i + 1));
      const controlShiftCodeDefault = this.form.get('shiftCodeDefault' + (i + 1));
      const control = this.form.get('dateStart' + (i + 1));
      const dType = this.form.get('dType' + (i + 1));
      if (control && dType) {
        control.setValue(currentDate);
        dType.setValue(null);

        const employeeId = this.form.get('employeeId');
        this.appService
          .post(api.AT_REGISTER_LEAVE_GETSIGN, { employeeId: employeeId?.value, workingday: currentDate })
          .subscribe((res: any) => {
            controlShift?.setValue(res.body.innerBody.name); // tên ca
            // this.defaultCode = res.body.innerBody.code      
            controlShiftCodeDefault?.setValue(res.body.innerBody.code); // mã ca
            controlShiftId?.setValue(res.body.innerBody.id)
            console.log(res.body.innerBody.id);
          });


          control.disable();
      }

      // set ca làm việc
      // lấy ca làm việc theo ngày và id nhân viên

      if (controlShift && controlShiftCode) {
        controlShift.disable();
        
      }

      // disable day
      const controlDay = this.form.get('day' + (i + 1));
      if (controlDay) {
        controlDay.disable();
      }

      // disable shift Code
      const controlshiftCode = this.form.get('shiftCode' + (i + 1));
      if (controlshiftCode) {
        controlshiftCode.disable();
      }
    }
  }

  fillDayManual(dateStart: string, dateEnd: string): void {
    console.log(this.sections);
    const startDate = new Date(dateStart);
    const endDate = new Date(dateEnd);
    const millisecondsPerDay = 1000 * 60 * 60 * 24;
    const timeDifference = endDate.getTime() - startDate.getTime();
    const numberOfDays = Math.ceil(timeDifference / millisecondsPerDay)+1;  // tổng số ngày đăng ký
    
    for (let i = 0; i < numberOfDays; i++) {
      const controlType = this.form.get('dType' + (i + 1)); // loại đầu ca/cuối ca (chi tiết)
      const controlDay = this.form.get('day' + (i + 1));  // số ngày nghỉ (chi tiết)
      const controlShiftCode = this.form.get('shiftCode' + (i + 1));  // ngày công ca (chi tiết)
      const controlShiftCodeDefault = this.form.get('shiftCodeDefault' + (i + 1));
      const controlRegisterType = this.form.get('timeTypeId');  // loại đăng ký (thông tin)

      // lấy code loại đăng ký 
      this.appService
        .get(api.AT_REGISTER_LEAVE_TYPE_OFF_BYID + '?id=' + controlRegisterType?.value)
        .subscribe((res: any) => {
          this.typeCode = res.body.innerBody.code
        });

      
      if (controlType) {
        this.subscriptions.push(
          controlType.valueChanges.subscribe((x: any) => {
            // Nghỉ cả ngày
            if (x == 1125) {
              controlDay?.setValue(1);

              controlShiftCode?.setValue(this.typeCode) // điền vào ngày công ca
            }
            else {
              controlDay?.setValue(0.5);
              // nghỉ sáng
              if (x == 1124) {
                controlShiftCode?.setValue(this.typeCode + '/' + controlShiftCodeDefault?.value)  // điền vào ngày công ca
              }
              // nghỉ chiều
              else {
                controlShiftCode?.setValue(controlShiftCodeDefault?.value + '/' + this.typeCode)  // điền vào ngày công ca
              }
            }

            // xóa lựa chọn
            if (x == null || x == 0) {
              controlDay?.setValue(null);
              controlShiftCode?.setValue(null);
            }
            controlDay?.disable();
            controlShiftCode?.disable();
          }

          )
        )
      }
    }
  }

  onFormReinit(e: string): void {
    this.formInitStringValue = e;
  }

  ngOnDestroy() {
    this.subscriptions.map(x => x?.unsubscribe())
  }
  
}
