import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Validators, FormGroup } from '@angular/forms';
import { BehaviorSubject, Subscription, map } from 'rxjs';

import { SeAuthorizeApproveEditService } from './se-authorize-approve.edit.service';
import { BaseEditComponent,ICoreDropdownOption, ICorePageEditColumnComposition, ICorePageEditCRUD, ICoreFormSection, EnumFormBaseContolType, EnumCoreFormControlSeekerSourceType, DialogService } from 'ngx-histaff-alpha';
import { EnumTranslateKey, api } from 'alpha-global-constants';
@Component({
  selector: 'app-se-authorize-approve-edit',
  templateUrl: './se-authorize-approve-edit.component.html',
  styleUrls: ['./se-authorize-approve-edit.component.scss'],
})
export class SeAuthorizeApproveEditComponent extends BaseEditComponent implements AfterViewInit {
  override entityTable = 'SE_AUTHORIZE_APPROVE';

  subscriptions: Subscription[] = [];
  employeeGetByIdObject$ = new BehaviorSubject<any>(null);
  employeeGetByIdApi = api.HU_EMPLOYEE_READ;
  
  employeeAuthGetByIdObject$ = new BehaviorSubject<any>(null);
  employeeAuthGetByIdApi = api.HU_EMPLOYEE_READ;
  
  loading: boolean = false;

  processOptions$ = new BehaviorSubject<ICoreDropdownOption[]>([]);
  processGetByIdObject$ = new BehaviorSubject<any>(null);
  processGetByIdApi = api.SE_PROCESS_READ;

  levelOrderOptions$ = new BehaviorSubject<ICoreDropdownOption[]>([]);
  levelOrderGetByIdObject$ = new BehaviorSubject<any>(null);
  levelOrderGetByIdApi = api.SE_AUTHORIZE_APPROVE_GET_LEVEL_ORDER_BY_ID;

  captionCode!: EnumTranslateKey;
  formComposition!: ICorePageEditColumnComposition[][];
  crud!: ICorePageEditCRUD;
  sections: ICoreFormSection[] = [
    {
      rows: [
        [
          {
            flexSize: 0,
            label: EnumTranslateKey.UI_LABEL_TRAINING_CENTER_ID,
            value: '',
            controlType: EnumFormBaseContolType.TEXTBOX,
            field: 'id',
            readonly: true,
            hidden: true,
            type: 'text',
          },
          {
            flexSize: 6,
            label: EnumTranslateKey.UI_COMPONENT_LABEL_SE_AUTHORIZE_APPROVE_EMPLOYEE_CODE,
            field: 'employeeId',
            value: '',
            controlType: EnumFormBaseContolType.SEEKER,
            seekerSourceType: EnumCoreFormControlSeekerSourceType.EMPLOYEE_SEEK,
            getByIdObject$: this.employeeGetByIdObject$,
            getByIdApi: this.employeeGetByIdApi,
            boundFrom: 'id',
            shownFrom: 'code',
            alsoBindTo: [{ takeFrom: 'fullname', bindTo: 'employeeName' }],
            /* END: WHEN USING controlType === EnumFormBaseContolType.SEEKER */
            type: 'number',
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
            label: EnumTranslateKey.UI_COMPONENT_LABEL_SE_AUTHORIZE_APPROVE_EMPLOYEE_NAME,
            field: 'employeeName',
            value: '',
            controlType: EnumFormBaseContolType.TEXTBOX,
            readonly: false,
            disabled: true,
            type: 'text',
          },
        ],
        [
          {
            flexSize: 6,
            label: EnumTranslateKey.UI_COMPONENT_LABEL_SE_AUTHORIZE_APPROVE_EMPLOYEE_AUTH_CODE,
            field: 'employeeAuthId',
            value: '',
            controlType: EnumFormBaseContolType.SEEKER,
            seekerSourceType: EnumCoreFormControlSeekerSourceType.EMPLOYEE_SEEK,
            getByIdObject$: this.employeeAuthGetByIdObject$,
            getByIdApi: this.employeeAuthGetByIdApi,
            boundFrom: 'id',
            shownFrom: 'code',
            alsoBindTo: [{ takeFrom: 'fullname', bindTo: 'employeeAuthName' }],
            /* END: WHEN USING controlType === EnumFormBaseContolType.SEEKER */
            type: 'number',
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
            label: EnumTranslateKey.UI_COMPONENT_LABEL_SE_AUTHORIZE_APPROVE_EMPLOYEE_AUTH_NAME,
            field: 'employeeAuthName',
            value: '',
            controlType: EnumFormBaseContolType.TEXTBOX,
            readonly: false,
            disabled: true,
            type: 'text',
          },
        ],
        [
          {
            flexSize: 6,
            label: EnumTranslateKey.UI_COMPONENT_LABEL_SE_AUTHORIZE_APPROVE_PROCESS,
            field: 'processId',
            value: '',
            controlType: EnumFormBaseContolType.DROPDOWN,
            dropdownOptions$: this.processOptions$,
            getByIdObject$: this.processGetByIdObject$,
            getByIdApi: this.processGetByIdApi,
            shownFrom: 'name',
            type: 'number',
          },
          {
            flexSize: 3,
            label: EnumTranslateKey.UI_COMPONENT_LABEL_SE_AUTHORIZE_APPROVE_IS_PER_REPLACE,
            field: 'isPerReplace',
            value: '',
            controlType: EnumFormBaseContolType.CHECKBOX,
            type: 'boolean',
          },
        ],
        [
          {
            flexSize: 6,
            label: EnumTranslateKey.UI_COMPONENT_LABEL_SE_AUTHORIZE_APPROVE_FROM_DATE,
            field: 'fromDate',
            value: '',
            controlType: EnumFormBaseContolType.DATEPICKER,
            type: 'date',
          },
          {
            flexSize: 6,
            label: EnumTranslateKey.UI_COMPONENT_LABEL_SE_AUTHORIZE_APPROVE_TO_DATE,
            field: 'toDate',
            value: '',
            controlType: EnumFormBaseContolType.DATEPICKER,
            type: 'date',
          },
        ],
      ],
    },
  ];

  constructor(public override dialogService: DialogService, private saService: SeAuthorizeApproveEditService) {
    super(dialogService);

    this.captionCode = EnumTranslateKey.UI_COMPONENT_TITLE_SE_AUTHORIZE_APPROVE;

    this.crud = {
      c: api.SE_AUTHORIZE_APPROVE_CREATE,
      r: api.SE_AUTHORIZE_APPROVE_READ,
      u: api.SE_AUTHORIZE_APPROVE_UPDATE,
      d: api.SE_AUTHORIZE_APPROVE_DELETE_IDS,
    };
  }
  ngAfterViewInit(): void {
    this.loading = true;
    this.subscriptions.push(
      this.saService
        .getProcess()
        .pipe(
          map((x: any) => {
            if (x.ok && x.status === 200) {
              const options: { value: number; text: string }[] = [];
              x.body.innerBody.map((g: any) => {
                options.push({
                  value: g.id,
                  text: g.name,
                });
              });
              return options;
            } else {
              return [];
            }
          }),
        )
        .subscribe((response) => {
          this.processOptions$.next(response);
          this.loading = false;
        }),
    );
  }

  /* GET FormGroup Instance */
  onFormCreated(e: FormGroup): void {
    this.form = e;
  }

  /* To allow form to be deactivated */
  onFormReinit(e: string): void {
    this.formInitStringValue = e;
  }
  ngOnInit(): void {}
}
