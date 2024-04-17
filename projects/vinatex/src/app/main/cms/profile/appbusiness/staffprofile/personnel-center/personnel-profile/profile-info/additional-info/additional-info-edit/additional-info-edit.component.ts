import { Component, OnDestroy, OnInit, isDevMode } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { api, EnumTranslateKey } from 'alpha-global-constants';
import { BaseEditComponent, ICoreDropdownOption, ICorePageEditCRUD, ICoreFormSection, EnumFormBaseContolType, DialogService, AppService, IFormatedResponse } from 'ngx-histaff-alpha';
import { Subscription, BehaviorSubject } from 'rxjs';
import { PersonnelCenterService } from '../../../../personnel-center.service';


@Component({
  selector: 'app-additional-info-edit',
  templateUrl: './additional-info-edit.component.html',
  styleUrls: ['./additional-info-edit.component.scss']
})
export class AdditionalInfoEditComponent  extends BaseEditComponent implements OnInit, OnDestroy {
  override entityTable = "HU_EMPLOYEE_CV";

  subscriptions: Subscription[] = []
  orgGetById$ = new BehaviorSubject<any>(null);
  orgGetByIdApi = api.HU_ORGANIZATION_READ;

  positionGetByIdObject$ = new BehaviorSubject<any>(null);
  positionGetByIdApi = api.HU_POSITION_READ;

  insAreaOptions$ =  new BehaviorSubject<ICoreDropdownOption[]>([]);
  insAreaGetByIdObject$ = new BehaviorSubject<any>(null);
  insAreaGetByIdApi = api.SYS_OTHERLIST_READ

  objectEmployeeOptions$ = new BehaviorSubject<ICoreDropdownOption[]>([]);
  objectEmployeeGetByIdObject$ = new BehaviorSubject<any>(null);
  objectEmployeeGetByIdApi = api.HU_FAMILY_TDCM_LIST;
  captionCode!: EnumTranslateKey.UI_COMPONENT_TITLE_ADDITIONAL_INFO_EDIT;
  crud!: ICorePageEditCRUD;

  insWhereHealthOptions$ = new BehaviorSubject<ICoreDropdownOption[]>([]);
  insWhereHealthGetById$ = new BehaviorSubject<any>(null);
  insWhereHealthGetByIdApi = api.INS_WHEREHEALTH_READ;
  sections: ICoreFormSection[] =
    [
      {
        rows: [
          [
            {
              flexSize: 12,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_COMMON_ID,
              field: 'id',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              hidden : true
            },
          ],
          [
            {
              flexSize: 6,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_USER_PASSPORT,
              field: 'passport',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
            },
            {
              flexSize: 6,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_USER_PASSPORT_DATE,
              field: 'passDate',
              value: '',
              controlType: EnumFormBaseContolType.DATEPICKER,
              type:'date'
            }
          ],
          [
            {
              flexSize: 6,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_USER_PASSPORT_DATE_EXPERIOD,
              field: 'passDateExpired',
              value: '',
              controlType: EnumFormBaseContolType.DATEPICKER,
              type:'date'
            },
            {
              flexSize: 6,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_USER_PASSPORT_ADDRESS,
              field: 'passAddress',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
            },
          ],
          [
            {
              flexSize: 6,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_USER_PASSPORT_VISA,
              field: 'visa',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
            },
            {
              flexSize: 6,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_USER_PASSPORT_VISA_DATE,
              field: 'visaDate',
              value: '',
              controlType: EnumFormBaseContolType.DATEPICKER,
              type:'date'
            },
          ],
          [
            {
              flexSize: 6,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_USER_PASSPORT_VISA_DATE_EXPERIOD,
              field: 'visaDateExpired',
              value: '',
              controlType: EnumFormBaseContolType.DATEPICKER,
              type:'date'

            },
            {
              flexSize: 6,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_USER_PASSPORT_VISA_ADDRESS,
              field: 'visaAddress',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
            },
          ],
          [
            {
              flexSize: 6,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_USER_LABOR_BOOK_NUMBER,
              field: 'laborBookNumber',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
            },
            {
              flexSize: 6,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_USER_LABOR_BOOK_DATE,
              field: 'laborBookDate',
              value: '',
              controlType: EnumFormBaseContolType.DATEPICKER,
              type:'date'

            },
          ],
          [
            {
              flexSize: 6,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_USER_LABOR_BOOK_DATE_EXPERIOD,
              field: 'laborBookDateExpired',
              value: '',
              controlType: EnumFormBaseContolType.DATEPICKER,
              type:'date'
            },
          ],
          //   {
          //     flexSize: 6,
          //     label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_USER_LABOR_BOOK_ADDRESS,
          //     field: 'laborBookAddress',
          //     value: '',
          //     controlType: EnumFormBaseContolType.TEXTBOX,
          //   },
          // ],
          // [
          //   {
          //     flexSize: 6,
          //     label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_USER_LABOR_CAREER,
          //     field: 'carrer',
          //     value: '',
          //     controlType: EnumFormBaseContolType.TEXTBOX,
          //   },
            
          // ],
          [
            {
              flexSize: 6,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_USER_INSURENCE_NUMBER,
              field: 'insNumber',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              // BA Tiến yêu cầu bỏ bắt buộc nhập
              // validators: [
              //   {
              //     name: 'required',
              //     validator: Validators.required,
              //     errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
              //   },
              // ],
            },
            {
              flexSize: 6,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_USER_INSURENCE_AREA,
              field: 'insArea',
              value: '',
              controlType: EnumFormBaseContolType.DROPDOWN,
              getByIdObject$: this.insAreaGetByIdObject$,
              getByIdApi: this.insAreaGetByIdApi,
              boundFrom: 'id',
              shownFrom: 'name',
              dropdownOptions$: this.insAreaOptions$,
              type: 'number',
            },
            
          ],
          [
            {
              flexSize: 6,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_USER_INSURENCE_CARD_NUMBER,
              field: 'insCardNumber',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              // validators: [
              //   {
              //     name: 'required',
              //     validator: Validators.required,
              //     errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
              //   },
              // ],
            },
            {
              //Nơi khám chữa bệnh
              flexSize: 6,
              controlType: EnumFormBaseContolType.DROPDOWN,
              field: 'insWhereHealthId',
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_USER_MEDICAL_EXAM_PLACE,
              getByIdObject$: this.insWhereHealthGetById$,
              getByIdApi: this.insWhereHealthGetByIdApi,
              boundFrom: 'id',
              shownFrom: 'nameVn',
              dropdownOptions$: this.insWhereHealthOptions$,
              type: 'number',
              value: '',
            }
          ],
          [
            {
              flexSize: 6,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_USER_FAMILY_NUMBER,
              field: 'familyMember',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
            },
            {
              flexSize: 6,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_USER_FAMILY_MATTER,
              field: 'familyPolicy',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
            },
           
          ],
          [
            {
              flexSize: 6,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_USER_VETERANS,
              field: 'veterans',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
            },
            // {
            //   flexSize: 6,
            //   label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_CREATE_BEFORE_RECUITMENT,
            //   field: 'careerBeforeRecruitment',
            //   value: '',
            //   controlType: EnumFormBaseContolType.TEXTBOX,
            // },
            {
              flexSize: 6,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_USER_TITLE_CONFERRED,
              field: 'titleConferred',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
            },
          ],
          [
            {
              flexSize: 6,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_USER_SOCIAL_THEORY,
              field: 'politicalTheory',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
            },
            {
              flexSize: 6,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_CREATE_SCHOOL_OF_WORK,
              field: 'schoolOfWork',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
            },
          ],
          
        ]
      },
    ];
  constructor(
    public override dialogService: DialogService,
    private personnelCenterService: PersonnelCenterService,
    private appService: AppService
  ) {

    super(dialogService);

    this.captionCode = EnumTranslateKey.UI_COMPONENT_TITLE_ADDITIONAL_INFO_EDIT;

    this.crud = {
      r: api.HU_EMPLOYEE_CV_GET_ADDITIONAL,
      u: api.HU_EMPLOYEE_CV_UPDATE_ADDITIONAL,
    };

  }

  ngOnInit(): void {
    
    // this.subscriptions.push(
    //   this.appService.get(api.SYS_OTHERLIST_GETOTHERLISTBYTYPE + 'TDCM').subscribe(x => {
    //     if (x.ok && x.status === 200) {
    //       const body: IFormatedResponse = x.body;
    //       if (body.statusCode === 200) {
    //         const newObjectEmployeeOptions: ICoreDropdownOption[] = [];
    //         body.innerBody.map((item: any) => {
    //           newObjectEmployeeOptions.push({
    //             value: item.id,
    //             text: item.name
    //           })
    //         });
    //         this.objectEmployeeOptions$.next(newObjectEmployeeOptions);
    //       }
    //     }
    //   })
      
    // )
    
    this.subscriptions.push(
      this.appService.get(api.SYS_OTHERLIST_GETOTHERLISTBYTYPE + 'INS_REGION').subscribe(x => {
        if (x.ok && x.status === 200) {
          const body: IFormatedResponse = x.body;
          if (body.statusCode === 200) {
            const insAreaOptions: ICoreDropdownOption[] = [];
            body.innerBody.map((item: any) => {
              insAreaOptions.push({
                value: item.id,
                text: item.name
              })
            });
            this.insAreaOptions$.next(insAreaOptions);
          }
        }
      })
      
    )
    this.subscriptions.push(
      this.appService.get(api.INS_WHEREHEALTH_READ_ALL).subscribe(x => {
        if (x.ok && x.status === 200) {
          const body: IFormatedResponse = x.body
          if (body.statusCode === 200) {
            const options: { value: number; text: string }[] = [];
            body.innerBody.map((get: any) => {
              options.push({
                value: get.id,
                text: get.nameVn,
              });
            });
            this.insWhereHealthOptions$.next(options);
          } else {
            //this.responseService.resolve(body)
          }
        } else {
          //this.alertService.error(JSON.stringify(x), this.alertOptions)
        }
      }
    ))
  }

  /* GET FormGroup Instance */
  onFormCreated(e: FormGroup): void {
    this.form = e;
  }

  /* To allow form to be deactivated */
  onFormReinit(e: string): void {
    this.formInitStringValue = e;
  }

  ngOnDestroy(): void {
    this.personnelCenterService.reloadFlag$.next(true);
    this.subscriptions.map(x => x?.unsubscribe());
  }

}
