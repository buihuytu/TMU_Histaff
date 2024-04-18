import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { EnumTranslateKey, api } from 'alpha-global-constants';
import { CorePageEditComponent, BaseEditComponent, ICorePageEditCRUD, ICoreDropdownOption, ICoreFormSection, EnumFormBaseContolType, MultiLanguageService, DialogService, AppService, ICoreListOption, ISysGroup } from 'ngx-histaff-alpha';
import { Subscription, BehaviorSubject } from 'rxjs';


@Component({
  selector: 'app-hu-com-commend-edit',
  standalone: true,
  imports: [CorePageEditComponent,CommonModule],
  templateUrl: './hu-com-commend-edit.component.html',
  styleUrl: './hu-com-commend-edit.component.scss'
})
export class HuComCommendEditComponent extends BaseEditComponent implements OnInit {
  captionCode: EnumTranslateKey = EnumTranslateKey.ADD_GENERAL_INF;
  override entityTable = 'HU_COM_COMMEND';
  subcriptions: Subscription[] = []
  crud!: ICorePageEditCRUD;
  positionDecisionOptions$ = new BehaviorSubject<ICoreDropdownOption[]>([]);
  positionDecisionGetByIdObject$ = new BehaviorSubject<any>(null);
  positionDecisionGetByIdApi = api.SYS_OTHERLIST_READ;

  commendObjOptions$ = new BehaviorSubject<ICoreDropdownOption[]>([]);
  commendObjGetByIdObject$ = new BehaviorSubject<any>(null);
  commendObjGetByIdApi = api.SYS_OTHERLIST_READ;

  rewardOptions$ = new BehaviorSubject<ICoreDropdownOption[]>([]);
  rewardGetByIdObject$ = new BehaviorSubject<any>(null);
  rewardGetByIdApi = api.SYS_OTHERLIST_READ;

  employeeGetByIdObject$ = new BehaviorSubject<any>(null);
  sections: ICoreFormSection[] = [
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
            type: 'text',
            hidden: true,
          },
        ],
        [
          {
            flexSize: 4,
            label: EnumTranslateKey.UI_COMPONENT_TITLE_HU_COM_COMMEND_YEAR,
            field: 'year',
            value: '',
            type: 'text',
            controlType: EnumFormBaseContolType.TEXTBOX,
          },
          {
            flexSize: 4,
            label: EnumTranslateKey.UI_COMPONENT_TITLE_HU_COM_COMMEND_NO,
            field: 'no',
            value: '',
            type: 'text',
            controlType: EnumFormBaseContolType.TEXTBOX,
          },
          {
            flexSize: 4,
            label: EnumTranslateKey.UI_COMPONENT_TITLE_HU_COM_COMMEND_POSITION_DECISION,
            field: 'positionDecision',
            value: '',
            type: 'number',
            controlType: EnumFormBaseContolType.DROPDOWN,
            getByIdObject$: this.positionDecisionGetByIdObject$,
            getByIdApi: this.positionDecisionGetByIdApi,
            shownFrom: 'name',
            dropdownOptions$: this.positionDecisionOptions$,
          },
        ],
        [
          {
            flexSize: 4,
            label: EnumTranslateKey.UI_COMPONENT_TITLE_HU_COM_COMMEND_OBJ,
            field: 'commendObj',
            value: '',
            type: 'number',
            controlType: EnumFormBaseContolType.DROPDOWN,
            getByIdObject$: this.commendObjGetByIdObject$,
            getByIdApi: this.commendObjGetByIdApi,
            shownFrom: 'name',
            dropdownOptions$: this.commendObjOptions$,
          },
          {
            flexSize: 4,
            label: EnumTranslateKey.UI_COMPONENT_TITLE_HU_COM_COMMEND_REWARD,
            field: 'rewardId',
            value: '',
            type: 'number',
            controlType: EnumFormBaseContolType.DROPDOWN,
            getByIdObject$: this.rewardGetByIdObject$,
            getByIdApi: this.rewardGetByIdApi,
            shownFrom: 'name',
            dropdownOptions$: this.rewardOptions$,
          },
          {
            flexSize: 4,
            label: EnumTranslateKey.UI_COMPONENT_TITLE_HU_COM_COMMEND_SIGN_DATE,
            field: 'signDate',
            value: '',
            type: 'text',
            controlType: EnumFormBaseContolType.DATEPICKER,
          },
        ],
        [
          {
            flexSize: 12,
            label: EnumTranslateKey.UI_COMPONENT_TITLE_HU_COM_COMMEND_CONTENT,
            field: 'content',
            value: '',
            type: 'text',
            controlType: EnumFormBaseContolType.TEXTAREA,
          },
        ],
        [
          {
            flexSize: 12,
            label: EnumTranslateKey.UI_COMPONENT_TITLE_HU_COM_COMMEND_NOTE,
            field: 'note',
            value: '',
            type: 'text',
            controlType: EnumFormBaseContolType.TEXTAREA,
          },
        ],
        [
          {
            flexSize: 3,
            label: EnumTranslateKey.UI_LABEL_TRAINING_CENTER_ATTACHED_FILE,
            field: 'attachmentBuffer',
            value: '',
            controlType: EnumFormBaseContolType.ATTACHMENT,
            assignTo: 'attachment',
            type: 'object',
          },
        ],
        
      ]
    },
    // {
    //   rows: [
    //     [
    //       {
    //         flexSize: 12,
    //         label: EnumTranslateKey.UI_COMPONENT_TITLE_EMPLOYEE_CHECKER,
    //         field: 'employeeIds',
    //         value: [],
    //         controlType: EnumFormBaseContolType.SEEKER,
    //         type: 'object',
    //         /* 
    //           START: Thay đổi thuộc tính của SEEKER để có SELECTOR:
    //         */
    //         seekerSourceType: EnumCoreFormControlSeekerSourceType.EMPLOYEE_SEEK,
    //         objectList$: new BehaviorSubject<any[]>([]),
    //         getObjectListFrom: 'employeeList',
    //         getByIdObject$: this.employeeGetByIdObject$,
    //         // getByIdApi: this.employeeGetByIdApi,
    //         boundFrom: 'id',
    //         shownFrom: 'fullname',
    //         // alsoBindTo: [{ takeFrom: 'positionName', bindTo: 'signPosition' }],
    //         /* END: WHEN USING controlType === EnumFormBaseContolType.SEEKER */
    //         validators: [
    //           {
    //             name: 'required',
    //             validator: Validators.required,
    //             errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
    //           }
    //         ]

    //       },
    //       {
    //         flexSize: 12,
    //         label: EnumTranslateKey.UI_COMMON_EMPTY_STRING,
    //         field: 'employeeList',
    //         value: [],
    //         controlType: EnumFormBaseContolType.HIDDEN,
    //         type: 'object'
    //       },
    //     ]
    //   ]
    // }
  ]

  constructor(public mls: MultiLanguageService,
    public override dialogService: DialogService,
    private appService: AppService) {
    super(dialogService)
    this.crud = {
      c: api.HU_COM_COMMEND_CREATE,
      r: api.HU_COM_COMMEND_READ,
      u: api.HU_COM_COMMEND_UPDATE,
      d: api.HU_COM_COMMEND_DELETE_IDS,
    };
  }

  ngOnInit(): void {
    this.subcriptions.push(
      this.appService.get(api.SYS_OTHERLIST_GETOTHERLISTBYTYPE + `POSITION_DECISION`)
        .subscribe((x) => {
          if (x.ok && x.status === 200 && x.body.statusCode === 200) {
            const newOptions: ICoreListOption[] = [];
            (x.body.innerBody as ISysGroup[]).map((y) => {
              newOptions.push({
                value: y.id,
                text: y.name
              });
            });
            this.positionDecisionOptions$.next(newOptions)
          }
        })
    )

    this.subcriptions.push(
      this.appService.get(api.SYS_OTHERLIST_GETOTHERLISTBYTYPE + `DTKT`)
        .subscribe((x) => {
          if (x.ok && x.status === 200 && x.body.statusCode === 200) {
            const newOptions: ICoreListOption[] = [];
            (x.body.innerBody as ISysGroup[]).map((y) => {
              newOptions.push({
                value: y.id,
                text: y.name
              });
            });
            this.commendObjOptions$.next(newOptions)
          }
        })
    )

    this.subcriptions.push(
      this.appService.get(api.SYS_OTHERLIST_GETOTHERLISTBYTYPE + `HTKT`)
        .subscribe((x) => {
          if (x.ok && x.status === 200 && x.body.statusCode === 200) {
            const newOptions: ICoreListOption[] = [];
            (x.body.innerBody as ISysGroup[]).map((y) => {
              newOptions.push({
                value: y.id,
                text: y.name
              });
            });
            this.rewardOptions$.next(newOptions)
          }
        })
    )
  }
  onFormCreated(e: FormGroup): void {
    this.form = e;
  }

  /* To allow form to be deactivated */
  onFormReinit(e: string): void {
    this.formInitStringValue = e;
  }
}
