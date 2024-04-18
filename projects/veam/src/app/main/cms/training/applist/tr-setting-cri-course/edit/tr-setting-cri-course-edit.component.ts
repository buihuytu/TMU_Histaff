import { Component } from '@angular/core';
import { FormGroup, FormsModule, Validators } from '@angular/forms';
import { BehaviorSubject, Subscription, distinctUntilChanged, map } from 'rxjs';
import { TrSettingCriCourseService } from '../tr-setting-cri-course.service';
import { CommonModule } from '@angular/common';
import { CorePageEditComponent, ICoreDropdownOption, ICorePageEditCRUD, ICorePageEditColumnComposition, TranslatePipe,BaseEditComponent, EnumFormBaseContolType, ICoreFormSection, EnumCoreTablePipeType, DialogService, MultiLanguageService, AppService, IFormatedResponse } from 'ngx-histaff-alpha';
import { EnumTranslateKey, api } from 'alpha-global-constants';

@Component({
  selector: 'app-tr-setting-cri-course-edit',
  standalone: true,
  imports: [
    CommonModule,
    CorePageEditComponent,
    TranslatePipe,
    FormsModule
  ],
  templateUrl: './tr-setting-cri-course-edit.component.html',
  styleUrl: './tr-setting-cri-course-edit.component.scss'
})
export class TrSettingCriCourseEditComponent extends BaseEditComponent{
    override entityTable = "TR_SETTING_CRI_COURSE";

    loading: boolean = false;
  
    subsctiptions: Subscription[] = [];
  
    captionCode!: EnumTranslateKey;
    formComposition!: ICorePageEditColumnComposition[][];
    crud!: ICorePageEditCRUD;
    subscriptions: Subscription[] = [];
    
    trCourseIdGetByIdApi = api.TR_COURSE_READ;
    trCourseIdGetByIdObject$ = new BehaviorSubject<any>(null);
    trCourseIdOptions$ = new BehaviorSubject<ICoreDropdownOption[]>([]);
  
    
    trCriteriaGetByIdApi = api.TR_CRITERIA_READ;
    trCriteriaGetByIdObject$ = new BehaviorSubject<any>(null);
    trCriteriaOptions$ = new BehaviorSubject<ICoreDropdownOption[]>([]);

    bufferForm!: FormGroup;
    
    // Chuyển hàm callback thành arrow function. Và đặt định nghĩa này trước khi khai báo phần Sections cho form chính
    // Nếu dùng "onBufferFormCreated(form: FormGroup) {} như cũ thì từ this.appService sẽ bị undefined
    onBufferFormCreated = (form: FormGroup) => {

      this.bufferForm = form;
      this.subscriptions.push( // <== Outer push
        this.bufferForm.get('criteriaId')?.valueChanges.pipe(distinctUntilChanged()).subscribe(x => {
          if (!!x) {
            this.subscriptions.push( // <== Inner push

              this.appService
                .get(api.TR_CRITERIA_READ + '?id=' + x)

                // Api getById này đang vi phạm, không theo chuẩn FormatedResponse. cần sửa để đúng định dạng.

                .subscribe((res: any) => {
                  if (!!res.ok && res.status === 200) {
                    const body: IFormatedResponse = res.body
                    if (body.statusCode === 200 && !!body.innerBody) {
                      this.bufferForm.get('criteriaName')?.setValue(res.body.innerBody.name);
                    }
                  }
                })
            ) // Close inner push

          } else {
            //this.form.get('userName')?.disable()
            //this.form.get('fullname')?.disable()
          }
        })!
      )
    }

    sections: ICoreFormSection[] =
      [
        {
          rows: [
            [
              {
                flexSize: 0,
                label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_COMMON_ID,
                field: 'id',
                value: '',
                controlType: EnumFormBaseContolType.TEXTBOX,
                readonly: true,
                hidden:true,
                type: 'text'
              },
            ],
            [
              {
                flexSize: 6,
                label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_TR_SETTING_CRI_COURSE_TR_COURSE_NAME,
                field: 'trCourseId',
                value: '',
                type: 'string',
                controlType: EnumFormBaseContolType.DROPDOWN,
                getByIdApi: this.trCourseIdGetByIdApi,
                getByIdObject$: this.trCourseIdGetByIdObject$,
                dropdownOptions$: this.trCourseIdOptions$,
                shownFrom: 'name',
                validators: [
                  {
                    name: 'required',
                    validator: Validators.required,
                    errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED
                  }
                ]
              },
              {
                flexSize: 6,
                label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_TR_SETTING_CRI_COURSE_SCALE_POINT,
                field: 'scalePoint',
                value: '',
                type: 'number',
                controlType: EnumFormBaseContolType.CURRENCY,
                pipe: EnumCoreTablePipeType.NUMBER,
              },
            ],
            [
              {
                flexSize: 6,
                label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_TR_SETTING_CRI_COURSE_EFFECT_FROM,
                field: 'effectFrom',
                value: '',
                controlType: EnumFormBaseContolType.DATEPICKER,
                type: 'date',
                validators: [
                    {
                      name: 'required',
                      validator: Validators.required,
                      errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED
                    }
                  ]
              },
              {
                flexSize: 6,
                label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_TR_SETTING_CRI_COURSE_EFFECT_TO,
                field: 'effectTo',
                value: '',
                controlType: EnumFormBaseContolType.DATEPICKER,
                type: 'date',
              },
            ],
            [
              {
                flexSize: 12,
                label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_TR_SETTING_CRI_COURSE_REMARK,
                field: 'remark',
                value: '',
                controlType: EnumFormBaseContolType.TEXTBOX,
                readonly: false,
                type: 'text',
              },
            ], 
          ]
        },  
        {
          caption: EnumTranslateKey.UI_COMPONENT_LABEL_INS_HEALTH_INSURANCE_INFOR_INS,
          rows: [
            [
              {
                flexSize: 12,
                label: EnumTranslateKey.NULL,
                field: 'trSettingCriDetails',
                value: [],
                controlType: EnumFormBaseContolType.GRIDBUFFER,
                type: 'children',
                // When using EnumFormBaseContolType.GRIDBUFFER
                onBufferFormCreated: this.onBufferFormCreated,
                gridBufferFormSections: [
                  {
                    rows: [
                      [
                        {
                          flexSize: 4,
                          label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_TR_SETTING_CRI_DETAIL_CRITERIA_ID,  //   Tên bệnh
                          field: 'criteriaId',
                          value: '',
                          type: 'string',
                          controlType: EnumFormBaseContolType.DROPDOWN,
                          getByIdApi: this.trCriteriaGetByIdApi,
                          getByIdObject$: this.trCriteriaGetByIdObject$,
                          dropdownOptions$: this.trCriteriaOptions$,
                          shownFrom: 'number',
                        },
                        {
                          flexSize: 4,
                          label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_TR_SETTING_CRI_DETAIL_RATIO,  // Số tiền YC bối thường
                          field: 'ratio',
                          value: '',
                          controlType: EnumFormBaseContolType.TEXTBOX,
                          type: 'number',
                        },
                        {
                          flexSize: 4,
                          label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_TR_SETTING_CRI_DETAIL_POINT_MAX,    // Ghi chú
                          field: 'pointMax',
                          value: '',
                          controlType: EnumFormBaseContolType.TEXTBOX,
                          type: 'number',
                        },
                        {
                          flexSize: 3,
                          label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_TR_SETTING_CRI_DETAIL_CRITERIA_ID,
                          field: 'criteriaName',
                          value: '',
                          controlType: EnumFormBaseContolType.TEXTBOX,
                          type: 'text',
                          hidden: true,
                        },
                      ],
                    ]
                  }
                ],
                gridBufferTableColumns: [
                  {
                    caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_WORKING_ALLOW_ID,
                    field: 'id',
                    hidden: true,
                    type: 'string',
                    align: 'left',
                    width: 30,
                  },
                  {
                    caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_WORKING_ALLOW_ALLOWANCE_ID,
                    field: 'criteriaId',
                    type: 'number',
                    align: 'left',
                    hidden: true, // ẩn cột ID này đi (nhưng vẫn phải có vì nó thuộc về Entity của children)
                    width: 30,
                  },
                  {
                    caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_TR_SETTING_CRI_DETAIL_CRITERIA_ID,  //   Tên bệnh
                    field: 'criteriaName', 
                    type: 'string',
                    align: 'left',
                    width: 150 * 2,
                  },
                  {
                    caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_TR_SETTING_CRI_DETAIL_RATIO,  // Số tiền YC bối thường
                    field: 'ratio',
                    type: 'number',
                    align: 'left',
                    width: 100 * 2,
                  },
                  {
                    caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_TR_SETTING_CRI_DETAIL_POINT_MAX,    // Ghi chú
                    field: 'pointMax',  
                    type: 'string',
                    align: 'left',
                    width: 150 * 2,
                  },
                ]
              },
            ]
          ]
        }
      ];
    constructor(
      public override dialogService: DialogService,
      private mls: MultiLanguageService,
      private appService: AppService, // CoreService is DEPRECATED!!!
      private trSettingCriCourseService: TrSettingCriCourseService,
    ) {
  
      super(dialogService);
  
      this.captionCode = EnumTranslateKey.UI_COMPONENT_TITLE_TR_SETTING_CRI_COURSE;
  
      this.crud = {
        c: api.TR_SETTING_CRI_COURSE_CREATE,
        r: api.TR_SETTING_CRI_COURSE_READ,
        u: api.TR_SETTING_CRI_COURSE_UPDATE,
        d: api.TR_SETTING_CRI_COURSE_DELETE,
      };
    }
  
    getListCourse(){
      this.subscriptions.push(
        this.trSettingCriCourseService 
          .getListCourse()
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
            this.trCourseIdOptions$.next(response);
          })
      );
    }

    getListCriteria(){
        this.subscriptions.push(
          this.trSettingCriCourseService 
            .getListCriteria()
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
              this.trCriteriaOptions$.next(response);
            })
        );
      }
  
    /* GET FormGroup Instance */
    onFormCreated(e: FormGroup): void {
      this.form = e;
      this.getListCourse();
      this.getListCriteria();
    }
  
    /* To allow form to be deactivated */
    onFormReinit(e: string): void {
      this.formInitStringValue = e;
    }
  
    ngOnDestroy(): void {
      this.subscriptions.map(x => x?.unsubscribe())
    }
}
