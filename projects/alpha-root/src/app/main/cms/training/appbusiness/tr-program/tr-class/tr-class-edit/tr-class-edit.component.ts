import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { CorePageEditComponent, CoreControlComponent, BaseEditComponent, ICorePageEditColumnComposition, ICorePageEditCRUD, ICoreFormSection, EnumFormBaseContolType, DialogService, MultiLanguageService, AppService } from 'ngx-histaff-alpha';

import { Subscription, distinctUntilChanged } from 'rxjs';
import { TrProgramService } from '../../tr-program.service';
import { EnumTranslateKey, api } from 'alpha-global-constants';

@Component({
  selector: 'app-tr-class-edit',
  standalone: true,
  imports: [
    CommonModule,
    CorePageEditComponent,
    FormsModule,
    CoreControlComponent,
  ],
  templateUrl: './tr-class-edit.component.html',
  styleUrl: './tr-class-edit.component.scss'
})
export class TrClassEditComponent extends BaseEditComponent implements OnInit, OnDestroy {
  /* Properties to be passed into core-page-edit */
  override entityTable = "TR_CLASS";
  
  captionCode!: EnumTranslateKey;
  formComposition!: ICorePageEditColumnComposition[][];
  crud!: ICorePageEditCRUD;

  loading: boolean = false;
  subscriptions: Subscription[] = [];


  sections: ICoreFormSection[] =
  [
    {
      rows: [
        [
          {
            flexSize: 0,
            label: EnumTranslateKey.UI_COMPONENT_LABEL_REGISTER_LEAVE_ID,
            field: 'id',
            value: 0,
            controlType: EnumFormBaseContolType.TEXTBOX,
            readonly: true,
            hidden: true,
            type: 'text'
          },
          {
            flexSize: 0,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_COMMON_ID,
            field: 'trProgramId',
            value: '',
            controlType: EnumFormBaseContolType.TEXTBOX,
            readonly: true,
            hidden:true,
            type: 'text'
          },
        ],
        [
          {
            flexSize: 3,
            label: EnumTranslateKey.UI_LABEL_TR_CLASS_CLASS_NAME,
            field: 'name',
            value: '',
            controlType: EnumFormBaseContolType.TEXTBOX,
            type: 'text',
            validators: [
              {
                name: 'required',
                validator: Validators.required,
                errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
              }
            ],
          },
          {
            flexSize: 3,
            label: EnumTranslateKey.UI_LABEL_TR_CLASS_START_DATE,
            field: 'startDate',
            value: null,
            controlType: EnumFormBaseContolType.DATEPICKER,
            type: 'date',
            validators: [
              {
                name: 'required',
                validator: Validators.required,
                errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
              }
            ],
          },
          {
            flexSize: 3,
            label: EnumTranslateKey.UI_LABEL_TR_CLASS_END_DATE,
            field: 'endDate',
            value: null,
            controlType: EnumFormBaseContolType.DATEPICKER,
            type: 'date',
            validators: [
              {
                name: 'required',
                validator: Validators.required,
                errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
              }
            ],
          },
          {
            flexSize: 3,
            label: EnumTranslateKey.UI_LABEL_TR_CLASS_TOTAL_DAY,
            field: 'totalDay',
            value: '',
            controlType: EnumFormBaseContolType.TEXTBOX,
            type: 'text',
            disabled: true,
          },
        ],
        [
          {
            flexSize: 3,
            label: EnumTranslateKey.UI_LABEL_TR_CLASS_TEACHER,
            field: 'teacher',
            value: '',
            controlType: EnumFormBaseContolType.TEXTBOX,
            type: 'text',
            validators: [
              {
                name: 'required',
                validator: Validators.required,
                errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
              }
            ],
          },
          {
            flexSize: 3,
            label: EnumTranslateKey.UI_LABEL_TR_CLASS_TIME_FROM,
            field: 'timeFromStr',
            value: '',
            controlType: EnumFormBaseContolType.TEXTBOX,
            type: 'time',
            validators: [
              {
                name: 'required',
                validator: Validators.required,
                errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
              }
            ],
          },
          {
            flexSize: 3,
            label: EnumTranslateKey.UI_LABEL_TR_CLASS_TIME_TO,
            field: 'timeToStr',
            value: '',
            controlType: EnumFormBaseContolType.TEXTBOX,
            type: 'time',
            validators: [
              {
                name: 'required',
                validator: Validators.required,
                errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
              }
            ],
          },
          {
            flexSize: 3,
            label: EnumTranslateKey.UI_LABEL_TR_CLASS_TOTAL_TIME,
            field: 'totalTimeStr',
            value: '',
            controlType: EnumFormBaseContolType.TEXTBOX,
            type: 'text',
            disabled: true,
          },
        ],
        [
          {
            flexSize: 3,
            label: EnumTranslateKey.UI_LABEL_TR_CLASS_RATIO,
            field: 'ratio',
            value: '',
            controlType: EnumFormBaseContolType.TEXTBOX,
            type: 'text',
            validators: [
              {
                name: 'required',
                validator: Validators.required,
                errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
              }
            ],
          },
          {
            flexSize: 3,
            label: EnumTranslateKey.UI_LABEL_TR_CLASS_ADDRESS,
            field: 'address',
            value: '',
            controlType: EnumFormBaseContolType.TEXTBOX,
            type: 'text',
          },
          {
            flexSize: 3,
            label: EnumTranslateKey.UI_LABEL_TR_CLASS_PROVINCE,
            field: 'provinceId',
            value: '',
            controlType: EnumFormBaseContolType.TEXTBOX,
            type: 'text',
          },
          {
            flexSize: 3,
            label: EnumTranslateKey.UI_LABEL_TR_CLASS_DISTRICT,
            field: 'districtName',
            value: '',
            controlType: EnumFormBaseContolType.TEXTBOX,
            type: 'text',
          },
        ],
        [
          {
            flexSize: 12,
            label: EnumTranslateKey.UI_LABEL_TR_CLASS_NOTE,
            field: 'note',
            value: '',
            controlType: EnumFormBaseContolType.TEXTBOX,
            type: 'text',
          },
        ],
        [
          {
            flexSize: 12,
            label: EnumTranslateKey.UI_LABEL_TR_CLASS_EMAIL_CONTENT,
            field: 'emailContent',
            value: '',
            controlType: EnumFormBaseContolType.TEXTBOX,
            type: 'text',
          },
        ],
      ]
    },
  ];


  calculateTotalDay(): void{
    let startDate = this.form.get('startDate')?.getRawValue();
    let endDate = this.form.get('endDate')?.getRawValue();
    if (
      (startDate != null && endDate != null)
    ) {
      //get totalDay
      
      console.log(startDate + " " + endDate);
      let x =
        Math.ceil(
          (new Date(endDate.toLocaleDateString('en-US')).getTime() -
            new Date(startDate.toLocaleDateString('en-US')).getTime()) /
            (24 * 60 * 60 * 1000)
        ) + 1;
      if (x >= 0) {
        this.form.get('totalDay')?.setValue(x);
      } else this.form.get('totalDay')?.setValue(null);
    }
  }

  calculateTotalTime(): void{
    let timeFrom = this.form.get('timeFromStr')?.getRawValue();
    let timeTo = this.form.get('timeToStr')?.getRawValue();
    let dateTimeFrom = new Date(new Date().setHours(timeFrom.toString().split(':')[0])).setMinutes(timeFrom.toString().split(':')[1]);
    let dateTimeTo = new Date(new Date().setHours(timeTo.toString().split(':')[0])).setMinutes(timeTo.toString().split(':')[1]);
    
    console.log(new Date(dateTimeFrom));
    console.log(new Date(dateTimeTo));
    console.log(dateTimeTo- dateTimeFrom);
    if (
      (timeFrom != '' && timeTo != '' && dateTimeTo - dateTimeFrom > 0)
    ) {
      //get totalTime
      let diff = dateTimeTo - dateTimeFrom;
      let days = Math.floor(diff / (60 * 60 * 24 * 1000));
      let hours = Math.floor(diff / (60 * 60 * 1000)) - (days * 24);
      let minutes = Math.floor(diff / (60 * 1000)) - ((days * 24 * 60) + (hours * 60));
      if (minutes >= 0 && hours >= 0) {
        this.form.get('totalTimeStr')?.setValue(
          (hours.toString().length == 1 ? ("0" + hours) : hours) 
          + ":" + 
          (minutes.toString().length == 1 ? ("0" + minutes) : minutes) 
        );
      } 
      else{
        this.form.get('totalTimeStr')?.setValue('');
      } 
    }
    else{
      this.form.get('totalTimeStr')?.setValue('');
    } 
  }

  createForm(): void{

    this.subscriptions.push(
      this.form
        .get('startDate')
        ?.valueChanges.pipe(distinctUntilChanged())
        .subscribe((x) => {
          this.calculateTotalDay();
          if (this.form.get('endDate')?.value != null) {
            this.form.get('endDate')?.setValue(this.form.get('endDate')?.value);
          }
          // if (this.form.get('fromDate')?.value != null) {
          //   this.form.get('fromDate')?.setValue(this.form.get('fromDate')?.value);
          // }
        })!,

      this.form
        .get('endDate')
        ?.valueChanges.pipe(distinctUntilChanged())
        .subscribe((x) => {
          this.calculateTotalDay();
          if (this.form.get('startDate')?.value != null) {
            this.form
              .get('startDate')
              ?.setValue(this.form.get('startDate')?.value);
          }
          // if (this.form.get('toDate')?.value != null) {
          //   this.form.get('toDate')?.setValue(this.form.get('toDate')?.value);
          // }
        })!,

      this.form
        .get('timeFromStr')
        ?.valueChanges.pipe(distinctUntilChanged())
        .subscribe((x) => {
          this.calculateTotalTime();
          if (this.form.get('timeToStr')?.value != null) {
            this.form.get('timeToStr')?.setValue(this.form.get('timeToStr')?.value);
          }
          // if (this.form.get('fromDate')?.value != null) {
          //   this.form.get('fromDate')?.setValue(this.form.get('fromDate')?.value);
          // }
        })!,

      this.form
        .get('timeToStr')
        ?.valueChanges.pipe(distinctUntilChanged())
        .subscribe((x) => {
          this.calculateTotalTime();
          if (this.form.get('timeFromStr')?.value != null) {
            this.form
              .get('timeFromStr')
              ?.setValue(this.form.get('timeFromStr')?.value);
          }
          // if (this.form.get('toDate')?.value != null) {
          //   this.form.get('toDate')?.setValue(this.form.get('toDate')?.value);
          // }
        })!,
    )
  }

  constructor(
    public override dialogService: DialogService,
    private mls: MultiLanguageService,
    private appService: AppService, // CoreService is DEPRECATED!!!
    private trProgramService: TrProgramService,
    private fb: FormBuilder,
  ) {

    super(dialogService);

    this.captionCode = EnumTranslateKey.UI_COMPONENT_TITLE_TR_CLASS;

    this.crud = {
      c: api.TR_CLASS_CREATE,
      r: api.TR_CLASS_READ,
      u: api.TR_CLASS_UPDATE,
      d: api.TR_CLASS_DELETE,
    };
  }

  ngOnInit(): void {
  }

  /* GET FormGroup Instance */
  onFormCreated(e: FormGroup): void {
    this.form = e;
    if(this.trProgramService.trProgramId$.value != null){
      this.form.get('trProgramId')?.patchValue(this.trProgramService.trProgramId$.value);
    }

    this.createForm();

  }

  /* To allow form to be deactivated */
  onFormReinit(e: string): void {
    this.formInitStringValue = e;
  }

  ngOnDestroy(): void {
    this.subscriptions.map(x => x?.unsubscribe())
  }
}
