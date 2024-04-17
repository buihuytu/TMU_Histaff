import { Component, OnDestroy, OnInit } from '@angular/core';
import { Validators, AbstractControl, FormGroup } from '@angular/forms';
import { Subscription, BehaviorSubject, forkJoin } from 'rxjs';
import { EnumTranslateKey, api } from 'alpha-global-constants';
import { FamilyEditService } from '../../../../../../../../profile/appbusiness/family/family-edit/family-edit.service';
import { BaseEditComponent, ICorePageEditCRUD, ICoreDropdownOption, ICoreFormSection, EnumFormBaseContolType, DialogService, AppService } from 'ngx-histaff-alpha';

@Component({
  selector: 'app-info-other-edit',
  standalone: false,
  templateUrl: './info-other-edit.component.html',
  styleUrl: './info-other-edit.component.scss'
})
export class InfoOtherEditComponent extends BaseEditComponent implements OnInit, OnDestroy {
  override entityTable = "RC_CANDIDATE_CV";

  subscriptions: Subscription[] = []
  
  captionCode!: EnumTranslateKey.UI_COMPONENT_TITLE_INFO_OTHER_EDIT;
  crud!: ICorePageEditCRUD;

  reRelationshipOptions$ = new BehaviorSubject<ICoreDropdownOption[]>([]);
  reRelationshipGetById$ = new BehaviorSubject<any>(null);
  reRelationshipGetByIdApi = api.SYS_OTHERLIST_READ;

  healthTypeOptions$ = new BehaviorSubject<ICoreDropdownOption[]>([]);
  healthTypeGetById$ = new BehaviorSubject<any>(null);
  healthTypeGetByIdApi = api.SYS_OTHERLIST_READ;

  apiParams : string[] = [ 'RELATION', 'HEALTH_TYPE' ];
  optionsMap: { [key: string]: BehaviorSubject<any[]> } = {};
  sections: ICoreFormSection[] =
    [
      /* --------------- Thông tin người thân --------------- */
      {
        caption: EnumTranslateKey.UI_COMPONENT_TITLE_PERSONAL_INFORMATION,
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
            // Họ tên người thân - RC_CANDIDATE_CV
            {
              flexSize: 4,
              label: EnumTranslateKey.UI_LABEL_TIME_IMPORT_EMPOYEE_NAME,
              field: 'reName',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              type: 'string',
              validators: [
                {
                  name: 'required',
                  validator: Validators.required,
                  errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
                },
              ]
            },
            // Mối quan hệ - RC_CANDIDATE_CV
            {
              flexSize: 4,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_INS_HEALTH_INSURANCE_FAMILY_MEMBER_RELATIONSHIP,
              field: 'reRelationship',
              value: '',
              controlType: EnumFormBaseContolType.DROPDOWN,
              getByIdObject$: this.reRelationshipGetById$,
              getByIdApi: this.reRelationshipGetByIdApi,
              boundFrom: 'id',
              shownFrom: 'name',
              type: 'number',
              dropdownOptions$: this.reRelationshipOptions$,
              validators: [
                {
                  name: 'required',
                  validator: Validators.required,
                  errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
                },
              ]
            },
            // Số điện thoại - RC_CANDIDATE_CV
            {
              flexSize: 4,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_PHONE_NUMBER,
              field: 'rePhone',
              value: '',
              type: 'string',
              controlType: EnumFormBaseContolType.TEXTBOX,
            },
          ],
          [
            // Địa chỉ - RC_CANDIDATE_CV
            {
              flexSize: 12,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_STAFF_PROFILE_ADDRESS,
              field: 'reAddress',
              value: '',
              type: 'string',
              controlType: EnumFormBaseContolType.TEXTAREA,
            },
          ],
        ]
      },
      /* --------------- Thông tin người giới thiệu --------------- */
      {
        caption: EnumTranslateKey.UI_COMPONENT_TITLE_PERSONAL_INFORMATION,
        rows: [
          [
            // Họ và tên người giới thiệu - RC_CANDIDATE_Cv
            {
              flexSize: 6,
              label: EnumTranslateKey.UI_LABEL_TIME_IMPORT_EMPOYEE_NAME,
              field: 'inName',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              type: 'string',
              validators: [
                {
                  name: 'required',
                  validator: Validators.required,
                  errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
                },
              ]
            },
            // SĐT người giới thiệu - RC_CANDIDATE_CV
            {
              flexSize: 6,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_PHONE_NUMBER,
              field: 'inPhone',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              type: 'string',              
            },
          ],
          [
            // Ghi chú - RC_CANDIDATE_CV
            {
              flexSize: 12,
              label: EnumTranslateKey.UI_COMPONENT_TITLE_TR_PLAN_NOTE,
              field: 'inNote',
              value: '',
              type: 'string',
              controlType: EnumFormBaseContolType.TEXTAREA,
            },
          ],
        ]
      },
      /* --------------- Thông tin người giới thiệu --------------- */
      {
        caption: EnumTranslateKey.UI_COMPONENT_TITLE_PERSONAL_INFORMATION,
        rows: [
          [
            // Chiều cao(cm) - RC_CANDIDATE_CV
            {
              flexSize: 4,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_USER_HEIGHT,
              field: 'height',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              type: 'string'
            },
            // Tai, mũi, họng - RC_CANDIDATE_CV
            {
              flexSize: 4,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_USER_EAR_NOSE_THROAT,
              field: 'earNoseThroat',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              type: 'string',              
            },
            // Cân nặng(kg) - RC_CANDIDATE_CV
            {
              flexSize: 4,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_USER_WEIGHT,
              field: 'weight',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              type: 'string',              
            },
          ],
          [
            // Chiều cao(cm) - RC_CANDIDATE_CV
            {
              flexSize: 4,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_USER_DENTISTRY,
              field: 'dentomaxillofacial',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              type: 'string',
            },
            // Nhóm máu - RC_CANDIDATE_CV
            {
              flexSize: 4,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_USER_BLOODGROUP,
              field: 'bloodGroup',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              type: 'string',              
            },
            // Tim - RC_CANDIDATE_CV
            {
              flexSize: 4,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_USER_HEART,
              field: 'heart',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              type: 'string',              
            },
          ],
          [
            // Huyết áp - RC_CANDIDATE_CV
            {
              flexSize: 4,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_USER_BLOOD_PRESSURE,
              field: 'bloodPressure',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              type: 'string',
            },
           // Phổi và ngực - RC_CANDIDATE_CV
            {
              flexSize: 4,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_USER_LUNGS_AND_CHEST,
              field: 'lungsAndChest',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              type: 'string',              
            },
            // Thị lực mắt trái - RC_CANDIDATE_CV
            {
              flexSize: 4,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_USER_LEFT_EYE,
              field: 'leftEyeVision',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              type: 'string',              
            },
          ],
          [
            // Thị lực mắt phải - RC_CANDIDATE_CV
            {
              flexSize: 4,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_USER_RIGHT_EYE,
              field: 'rightEyeVision',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              type: 'string',
            },
           // Viêm gan B - RC_CANDIDATE_CV
            {
              flexSize: 4,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_USER_HEPATITIS_B,
              field: 'hepatitisB',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              type: 'string',              
            },
            // Da và hoa liễu - RC_CANDIDATE_CV
            {
              flexSize: 4,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_MEMBER_OFFICAL_DATE,
              field: 'leatherVenereal',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              type: 'string',              
            },
          ],
          [
            // Loại sức khỏe - RC_CANDIDATE_CV
            {
              flexSize: 4,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_USER_HEATH_TYPE,
              field: 'healthType',
              value: '',
              controlType: EnumFormBaseContolType.DROPDOWN,
              getByIdObject$: this.healthTypeGetById$,
              getByIdApi: this.healthTypeGetByIdApi,
              boundFrom: 'id',
              shownFrom: 'name',
              type: 'number',
              dropdownOptions$: this.healthTypeOptions$,
              validators: [
                {
                  name: 'required',
                  validator: Validators.required,
                  errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
                },
              ]
            },
          ],
          [
            // Ghi chú - RC_CANDIDATE_CV
            {
              flexSize: 12,
              label: EnumTranslateKey.UI_COMPONENT_TITLE_TR_PLAN_NOTE,
              field: 'noteSk',
              value: '',
              type: 'string',
              controlType: EnumFormBaseContolType.TEXTAREA,
            },
          ],
        ]
      },
    ];

  constructor(
    public override dialogService: DialogService,
    private appService: AppService,
    private familyEditService : FamilyEditService,
  ) {

    super(dialogService);

    this.captionCode = EnumTranslateKey.UI_COMPONENT_TITLE_INFO_OTHER_EDIT;

    this.crud = {
      r: api.RC_CANDIDATE_CV_GET_INFO_OTHER_BY_ID,
      u: api.RC_CANDIDATE_CV_UPDATE_INFO_OTHER,
    };

  }

  getAllValueDropdownSysOrtherList() {
    forkJoin(
      this.apiParams.map((param) =>
        this.appService.get(api.SYS_OTHERLIST_GETOTHERLISTBYTYPE + param)
      )
    ).subscribe((responses) => {
      responses.forEach((item, index) => {
        if (item.body.statusCode == 200 && item.ok == true) {
          const options: { value: number | null; text: string }[] = [];
          item.body.innerBody.map((g: any) => {
            options.push({
              value: g.id,
              text: g.name,
            });
          });
          const param = this.apiParams[index];
          switch (param) {
            case 'RELATION':  // Mối quan hệ
              this.reRelationshipOptions$.next(options);
              break;
            case 'HEALTH_TYPE':  // Loại sức khỏe
              this.healthTypeOptions$.next(options);
              break;
            default:
              break;
          }
        }
      });
    });
  }

  ngOnInit(): void {
  }

  /* GET FormGroup Instance */
  onFormCreated(e: FormGroup): void {
    this.form = e;
    console.log(this.form)
    
  }

  ngAfterViewInit(){
    setTimeout(() => {
      this.getAllValueDropdownSysOrtherList();
    })
  }

  /* To allow form to be deactivated */
  onFormReinit(e: string): void {
    this.formInitStringValue = e;
  }

  ngOnDestroy(): void {
    this.subscriptions.map(x => x?.unsubscribe());
  }
}
