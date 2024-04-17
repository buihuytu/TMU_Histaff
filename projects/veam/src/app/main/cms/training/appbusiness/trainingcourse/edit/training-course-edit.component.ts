import { Component } from '@angular/core';

import { TrainingCourseEditService } from './training-course.edit.service';
import { BehaviorSubject, Subscription, distinctUntilChanged, map } from 'rxjs';
import { AppService, BaseEditComponent, DialogService, EnumCoreTablePipeType, EnumFormBaseContolType, ICoreDropdownOption, ICoreFormSection, ICorePageEditCRUD } from 'ngx-histaff-alpha';
import { FormGroup, Validators } from '@angular/forms';
import { EnumTranslateKey, api } from 'alpha-global-constants';


@Component({
  selector: 'app-training-course-edit',
  templateUrl: './training-course-edit.component.html',
  styleUrls: ['./training-course-edit.component.scss'],
})
export class TrainingCourseEditComponent extends BaseEditComponent {
  /* Properties to be passed into core-page-edit */
  override entityTable = 'TR_COURSE';
  subscriptions: Subscription[] = [];
  loading: boolean = false;

  captionCode!: EnumTranslateKey;
  crud!: ICorePageEditCRUD;

  defTimeCourse: string = '';
  defCosts: string = '';

  // TRAIN_FEILD
  trainFeildOptions$ = new BehaviorSubject<ICoreDropdownOption[]>([]);
  trainFeildGetByIdObject$ = new BehaviorSubject<any>(null);
  trainFeildGetByIdApi = api.SYS_OTHERLIST_READ;
   

  sections: ICoreFormSection[] = [
    {
      rows: [
        [
          {
            flexSize: 6,
            label: EnumTranslateKey.UI_LABEL_TRAINING_COURSE_ID,
            field: 'id',
            value: '',
            controlType: EnumFormBaseContolType.TEXTBOX,
            readonly: true,
            hidden: true,
            type: 'text',
          },
        ],
        [
          {
            flexSize: 6,
            label: EnumTranslateKey.UI_LABEL_TRAINING_COURSE_TRAIN_FEILD,  // Lĩnh vực đào tạo
            field: 'trTrainField',
            value: '',
            getByIdObject$: this.trainFeildGetByIdObject$,
            getByIdApi: this.trainFeildGetByIdApi,
            shownFrom: 'name',
            controlType: EnumFormBaseContolType.DROPDOWN,
            dropdownOptions$: this.trainFeildOptions$,
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
            flexSize: 6,
            label: EnumTranslateKey.UI_LABEL_TRAINING_PROFESSIONAL_TRAINNING,//Đào tạo nghiệp vụ chuyên môn
            field: 'professionalTrainning',
            value: '',
            controlType: EnumFormBaseContolType.TEXTBOX,
            readonly: false,
            type: 'text',
          },
        ],
        [
          {
            flexSize: 0,
            label: EnumTranslateKey.UI_LABEL_TRAINING_COURSE_CODE,
            field: 'courseCode',
            value: '',
            controlType: EnumFormBaseContolType.TEXTBOX,
            readonly: false,
            type: 'text',
            disabled: true,
            hidden: true,
          },
          {
            flexSize: 6,
            label: EnumTranslateKey.UI_LABEL_TRAINING_COURSE_NAME,
            field: 'courseName',
            value: '',
            controlType: EnumFormBaseContolType.TEXTBOX,
            readonly: false,
            type: 'text',
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
            label: EnumTranslateKey.UI_LABEL_TRAINING_COURSE_DATE,
            field: 'courseDate',
            value: '',
            controlType: EnumFormBaseContolType.TEXTBOX,
            readonly: false,
            type: 'string',
            validators: [
              {
                name: 'required',
                validator: Validators.required,
                errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
              },
              {
                name: 'min',
                validator: Validators.min(0),
                errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
              },
            ],
          },
        ],
        [
          {
            flexSize: 6,
            label: EnumTranslateKey.UI_LABEL_TRAINING_COURSE_COSTS,
            field: 'costs',
            value: '',
            controlType: EnumFormBaseContolType.CURRENCY,
            pipe: EnumCoreTablePipeType.NUMBER,
            readonly: false,
            type: 'number',
            validators: [
              {
                name: 'required',
                validator: Validators.required,
                errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
              },
              {
                name: 'min',
                validator: Validators.min(0),
                errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
              },
            ],
          },
          {
            flexSize: 6,
            label: EnumTranslateKey.UI_LABEL_TRAINING_COURSE_NOTE,
            field: 'note',
            value: '',
            controlType: EnumFormBaseContolType.TEXTBOX,
            readonly: false,
            type: 'text',
          },
        ]
      ],
    },
  ];

  constructor(
    public override dialogService: DialogService,
    public appService: AppService,
    public trainingCourseEditService: TrainingCourseEditService,
  ) {
    super(dialogService);

    this.captionCode = EnumTranslateKey.UI_COMPONENT_TITLE_TRAINING_COURSE_EDIT;

    this.crud = {
      c: api.TR_COURSE_CREATE,
      r: api.TR_COURSE_READ,
      u: api.TR_COURSE_UPDATE,
      d: api.TR_COURSE_DELETE_IDS,
    };
  }

  getListTrainFeild(){
    this.subscriptions.push(
      this.trainingCourseEditService
        .getALLTrainFeildByKey()
        .pipe(
          map((x: any) => {
            const options: { value: number; text: string; code: string }[] = [];
            x.body.innerBody.map((g: any) => {
              options.push({
                value: g.id,
                text: g.name,
                code: g.code,
              });
            });
            return options;
          })
        )
        .subscribe((response) => {
          this.trainFeildOptions$.next(response);
        })
    );
  }

  /* GET FormGroup Instance */
  onFormCreated(e: FormGroup): void {
    this.form = e;
    const regex: any = /^[0-9]+$/;
    this.subscriptions.push(
      (this.defTimeCourse = this.form.get('courseDate')?.value),
      //check courseDate
      this.form
        .get('courseDate')
        ?.valueChanges.pipe(distinctUntilChanged())
        .subscribe((x) => {
          setTimeout(() => {
            if (regex.test(this.form.get('courseDate')?.value) || this.form.get('courseDate')?.value == '') {
              this.defTimeCourse = this.form.get('courseDate')?.value;
            }
            this.form.get('courseDate')?.setValue(this.defTimeCourse);
          }, 50);
        })!,

      this.trainingCourseEditService
        .CreateNewCode()
        .pipe(
          map((f: any) => {
            let options: string = '';
            options = f.body.innerBody.code;
            return options;
          }),
        )
        .subscribe((response: any) => {
          console.log(this.form.get('courseCode'));
          if (this.form.get('courseCode')?.value == '') this.form.get('courseCode')?.patchValue(response);
        }),
    );

    this.getListTrainFeild();
  }

  /* To allow form to be deactivated */
  onFormReinit(e: string): void {
    this.formInitStringValue = e;
  }

  ngOnInit(): void {
    this.loading = true;
  }
}
