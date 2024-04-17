import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, Subscription, forkJoin } from 'rxjs';
import { EnumTranslateKey, api } from 'alpha-global-constants';
import { BaseEditComponent, ICoreDropdownOption, ICorePageEditCRUD, ICoreFormSection, EnumFormBaseContolType, EnumCoreFormControlSeekerSourceType, DialogService, AppService, EnumCoreTablePipeType } from 'ngx-histaff-alpha';

@Component({
  selector: 'app-time-explaination-edit',
  templateUrl: './time-explaination-edit.component.html',
  styleUrls: ['./time-explaination-edit.component.scss']
})
export class TimeExplainationEditComponent extends BaseEditComponent implements OnInit, AfterViewInit {
  loading: boolean = false;
  override entityTable = "AT_TIME_EXPLANATION";
  apiParams : string[] = ['TYPE_REGISTER', 'REASON_EXPLAIN'];

  typeRegisterOptions$ = new BehaviorSubject<ICoreDropdownOption[]>([]);
  typeRegisterGetById$ = new BehaviorSubject<any>(null);
  typeRegisterGetByIdApi = api.SYS_OTHERLIST_READ;

  reasonOptions$ = new BehaviorSubject<ICoreDropdownOption[]>([]);
  reasonGetById$ = new BehaviorSubject<any>(null);
  reasonGetByIdApi = api.SYS_OTHERLIST_READ;

  employeeGetByIdObject$ = new BehaviorSubject<any>(null);
  employeeGetByIdApi = api.HU_EMPLOYEE_READ;
  subsctiptions: Subscription[] = [];
  captionCode!: EnumTranslateKey;
  crud!: ICorePageEditCRUD;
  sections: ICoreFormSection[] =
    [
      {
        rows: [
          [
            {
              flexSize: 6,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_COMMON_ID,
              field: 'id',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              readonly: true,
              hidden: true,
              type: 'text'
            },
          ],
          [
            {
              flexSize: 3,
              label: EnumTranslateKey.UI_COMPONENT_LABEL_EXPLAIN_DAY,
              field: 'explanationDay',
              value: '',
              controlType: EnumFormBaseContolType.DATEPICKER,
              type: 'date',
              validators: [
                {
                  name: 'required',
                  validator: Validators.required,
                  errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
                },
              ]
            },
            {
              flexSize: 3,
              label: EnumTranslateKey.UI_COMPONENT_LABEL_SWIPE_IN,
              field: 'swipeInStr',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              type: 'time',
              validators: [
                {
                  name: 'required',
                  validator: Validators.required,
                  errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
                },
              ]
            },
            {
              flexSize: 3,
              label: EnumTranslateKey.UI_COMPONENT_LABEL_SWIPE_OUT,
              field: 'swipeOutStr',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              type: 'time',
              validators: [
                {
                  name: 'required',
                  validator: Validators.required,
                  errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
                },
              ]
            },
            {
              flexSize: 3,
              label: EnumTranslateKey.UI_COMPONENT_LABEL_MINUTES,
              field: 'minutes',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              type: 'number',
              disabled:true
            }
          ],
          [
            {
              flexSize: 3,
              label: EnumTranslateKey.UI_COMPONENT_LABEL_TYPE_REGISTER,
              field: 'typeRegisterId',
              value: '',
              controlType: EnumFormBaseContolType.DROPDOWN,
              shownFrom: 'name',
              dropdownOptions$: this.typeRegisterOptions$,
              type: 'text',
              getByIdObject$: this.typeRegisterGetById$,
              getByIdApi: this.typeRegisterGetByIdApi,
              boundFrom: 'id',
            },
            {
              flexSize: 3,
              label: EnumTranslateKey.UI_COMPONENT_LABEL_REASON,
              field: 'reasonId',
              value: '',
              controlType: EnumFormBaseContolType.DROPDOWN,
              shownFrom: 'name',
              dropdownOptions$: this.reasonOptions$,
              type: 'text',
              getByIdObject$: this.reasonGetById$,
              getByIdApi: this.reasonGetByIdApi,
              boundFrom: 'id',
            },
            {
              flexSize: 3,
              label: EnumTranslateKey.UI_COMPONENT_LABEL_REGISTER_LEAVE_EMPLOYEECODE,
              field: 'employeeId',
              value: '',
              controlType: EnumFormBaseContolType.SEEKER,
              seekerSourceType: EnumCoreFormControlSeekerSourceType.EMPLOYEE_SEEK,
              getByIdObject$: this.employeeGetByIdObject$,
              getByIdApi: this.employeeGetByIdApi,
              boundFrom: 'id',
              shownFrom: 'code',
              // alsoBindTo: [{ takeFrom: 'fullname', bindTo: 'employeeName' },
              // { takeFrom: 'orgName', bindTo: 'orgName' },
              // { takeFrom: 'positionName', bindTo: 'positionName' },],
              type: 'text',
              validators: [
                {
                  name: 'required',
                  validator: Validators.required,
                  errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
                }
              ],
            },
          ],
        ]
      }
    ];

    constructor(
      public override dialogService: DialogService,
      private appService: AppService,
    ) {
  
      super(dialogService);
  
      this.captionCode = EnumTranslateKey.UI_COMPONENT_TITLE_AT_TIME_EXPLANATION;
  
      this.crud = {
        c: api.AT_TIME_EXPLANATION_CREATE,
        r: api.AT_TIME_EXPLANATION_READ,
        u: api.AT_TIME_EXPLANATION_UPDATE,
        d: api.AT_TIME_EXPLANATION_DELETE,
      };
  
    }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.getAllValueDropdown();
    });
  }

  calculator() {
    const swipeIn = this.form.get('swipeInStr')?.value;
    const swipeOut = this.form.get('swipeOutStr')?.value;
    if(swipeIn !== null && swipeIn !== '' && swipeOut !== null && swipeOut !== ''){
      const now =new Date();
      const swipeInFormat = swipeIn.toString().split(':');
      const swipeOutFormat = swipeOut.toString().split(':');
      const swipeInNew = new Date(now.getFullYear(),now.getMonth(),now.getDay(), swipeInFormat[0],swipeInFormat[1])
      const swipeOutNew = new Date(now.getFullYear(),now.getMonth(),now.getDay()+(swipeOutFormat[0]=='00' && swipeInFormat[0]!='00'?1:0), swipeOutFormat[0],swipeOutFormat[1])
      const minutes = (Math.abs(swipeOutNew.getTime() - swipeInNew.getTime())/1000/60);
      this.form.get('minutes')?.setValue(minutes);
    }
  }
  /* To allow form to be deactivated */
  onFormReinit(e: string): void {
    this.formInitStringValue = e;
  }

  getAllValueDropdown() {
    forkJoin(this.apiParams.map(param => this.appService.get(api.SYS_OTHERLIST_GETOTHERLISTBYTYPE + param)))
      .subscribe(responses => {
        responses.forEach((item, index) => {
          if (item.body.statusCode == 200 && item.ok == true) {
            const options: { value: number | null; text: string; }[] = [];
            item.body.innerBody.map((g: any) => {
              options.push({
                value: g.id,
                text: g.name
              });
            });
            const param = this.apiParams[index];
            switch (param) {
              case 'TYPE_REGISTER':
                this.typeRegisterOptions$.next(options);
                break;
              case 'REASON_EXPLAIN':
                this.reasonOptions$.next(options);
                break;
              default:
                break;
            }
          }
        });
      });
  }

  /* GET FormGroup Instance */
  onFormCreated(e: FormGroup): void {
    this.form = e;
    this.subsctiptions.push(
      this.form.get('swipeOutStr')?.valueChanges.subscribe(x => {
        this.calculator();
      })!,
      this.form.get('swipeInStr')?.valueChanges.subscribe(x => {
        this.calculator();
     })!
    )
  }
}
