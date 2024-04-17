import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, Subscription, distinctUntilChanged, map } from 'rxjs';
import { EnumTranslateKey, api } from 'alpha-global-constants';
import { BaseEditComponent, ICorePageEditCRUD, ICoreDropdownOption, ICoreFormSection, EnumFormBaseContolType, EnumCoreFormControlSeekerSourceType, DialogService, AppService, AuthService, OrganizationService, CoreFormService, IFormatedResponse, IOrgTreeItem, IEveryTreeStatus } from 'ngx-histaff-alpha';
import { OrganizationStructService } from '../organization-struct.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-organization-struct-edit',
  templateUrl: './organization-struct-edit.component.html',
  styleUrls: ['./organization-struct-edit.component.scss']
})
export class OrganizationStructEditComponent extends BaseEditComponent implements OnInit, OnDestroy, AfterViewInit {
  override entityTable = 'HU_ORGANIZATION';

  loading: boolean = false;

  subsctiptions: Subscription[] = [];

  captionCode!: EnumTranslateKey;
  crud!: ICorePageEditCRUD;

  parentGetByIdObject$ = new BehaviorSubject<any>(null);
  parentGetByIdApi = api.HU_ORGANIZATION_READ;

  companyGetByIdObject$ = new BehaviorSubject<any>(null);
  companyGetByIdApi = api.HU_COMPANY_READ;
  companyOptions$ = new BehaviorSubject<ICoreDropdownOption[]>([]);

  orgLevelGetByIdObject$ = new BehaviorSubject<any>(null);
  orgLevelGetByIdApi = api.HU_ORG_LEVEL_READ;
  orgLevelOptions$ = new BehaviorSubject<ICoreDropdownOption[]>([]);

  posGetByIdObject$ = new BehaviorSubject<any>(null);
  posGetByIdApi = api.HU_POSITION_READ;
  posObjectList$ = new BehaviorSubject<any[]>([]);

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
            hidden: true,
            type: 'text',
          },
        ],
        [
          {
            flexSize: 6,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_HU_ORGANIZATION_NAME,
            field: 'name',
            value: '',
            controlType: EnumFormBaseContolType.TEXTBOX,
            type: 'text',
            validators: [
              {
                name: 'required',
                validator: Validators.required,
                errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
              },
              {
                name: 'minLength',
                validator: Validators.minLength(1),
                errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_MIN_LENGTH,
              },
            ],
          },
          {
            flexSize: 6,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_HU_ORGANIZATION_CODE,
            field: 'code',
            value: '',
            controlType: EnumFormBaseContolType.TEXTBOX,
            type: 'text',
          },
        ],
        [
          {
            flexSize: 6,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_HU_ORGANIZATION_COMPANY_ID,
            field: 'companyId',
            value: '',
            controlType: EnumFormBaseContolType.DROPDOWN,
            getByIdObject$: this.companyGetByIdObject$,
            getByIdApi: this.companyGetByIdApi,
            shownFrom: 'nameVn',
            dropdownOptions$: this.companyOptions$,
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

            /* 
            seekerSourceType: EnumCoreFormControlSeekerSourceType.ORGANIZATION_UNIT_SEEK,
            getByIdObject$: this.orgUnitGetByIdObject$,
            getByIdApi: this.orgUnitGetByIdApi,
            boundFrom: 'id',
            shownFrom: 'name',
            
            type: 'text',
            readonly: true,
            */

            flexSize: 6,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_HU_ORGANIZATION_PARENT_ID,
            field: 'parentId',
            value: null,
            controlType: EnumFormBaseContolType.SEEKER,
            seekerSourceType: EnumCoreFormControlSeekerSourceType.ORGANIZATION_UNIT_SEEK,
            getByIdObject$: this.parentGetByIdObject$,
            getByIdApi: this.parentGetByIdApi,
            boundFrom: 'id',
            shownFrom: 'name',
            readonly: true,
            type: 'number',
          },
        ],
        [
          {
            flexSize: 4,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_HU_ORGANIZATION_FOUNDATION_DATE,
            field: 'foundationDate',
            value: null,
            controlType: EnumFormBaseContolType.DATEPICKER,
            type: 'date',
          },
          {
            flexSize: 4,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_HU_ORGANIZATION_DISSOLVE_DATE,
            field: 'dissolveDate',
            value: null,
            controlType: EnumFormBaseContolType.DATEPICKER,
            type: 'date',
          },
          {
            flexSize: 4,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_HU_ORGANIZATION_ORG_LEVEL_ID,
            field: 'orgLevelId',
            value: '',
            controlType: EnumFormBaseContolType.DROPDOWN,
            getByIdObject$: this.orgLevelGetByIdObject$,
            getByIdApi: this.orgLevelGetByIdApi,
            shownFrom: 'name',
            dropdownOptions$: this.orgLevelOptions$,
            type: 'number',
          },
        ],
        [
          // {
          //   flexSize: 4,
          //   label:
          //     EnumTranslateKey.UI_COMPONENT_LABEL_HU_ORGANIZATION_HEAD_OF_UNIT_NAME,
          //   field: 'headPosId',
          //   value: null,
          //   controlType: EnumFormBaseContolType.SEEKER,
          //   type: 'text',
          //   /*
          //       START: Thay đổi thuộc tính của SEEKER để có SELECTOR:
          //     */
          //   seekerSourceType: EnumCoreFormControlSeekerSourceType.POSITION_SEEK,
          //   objectList$: this.posObjectList$,
          //   getByIdObject$: this.posGetByIdObject$,
          //   getByIdApi: this.posGetByIdApi,
          //   boundFrom: 'id',
          //   shownFrom: 'name',
          //   alsoBindTo: [
          //     { takeFrom: 'masterName', bindTo: 'employeeHeadName' }],
          //   // alsoBindTo: [{ takeFrom: 'positionName', bindTo: 'signPosition' }],
          //   /* END: WHEN USING controlType === EnumFormBaseContolType.SEEKER */
          // },
          {
            flexSize: 4,
            label: EnumTranslateKey.UI_COMPONENT_LABEL_HU_ORGANIZATION_HEAD_OF_UNIT_NAME,
            field: 'headPosName',
            value: '',
            controlType: EnumFormBaseContolType.TEXTBOX,
            type: 'text',
            disabled: true,
          },
          {
            flexSize: 4,
            label: EnumTranslateKey.UI_COMPONENT_LABEL_HU_ORGANIZATION_HEAD_OF_UNIT_EMPLOYEE_NAME,
            field: 'headEmployeeNames',
            value: '',
            controlType: EnumFormBaseContolType.TEXTBOX,
            type: 'text',
            disabled: true,
          },
          {
            flexSize: 4,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_HU_ORGANIZATION_ORG_ORDER_NUM,
            field: 'orderNum',
            value: '',
            controlType: EnumFormBaseContolType.TEXTBOX,
            type: 'number',
          },
        ],
        [
          {
            flexSize: 6,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_HU_ORGANIZATION_ADDRESS,
            field: 'address',
            value: '',
            controlType: EnumFormBaseContolType.TEXTBOX,
            type: 'text',
          },
          {
            flexSize: 6,
            label: EnumTranslateKey.UI_LABEL_TRAINING_CENTER_ATTACHED_FILE,
            field: 'attachedFileBuffer',
            value: '',
            controlType: EnumFormBaseContolType.ATTACHMENT,
            assignTo: 'attachedFile',
            type: 'string',
          },
        ],
        [
          {
            flexSize: 0,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_AT_TERMINAL_STATUS,
            field: 'isActive',
            value: 1,
            controlType: EnumFormBaseContolType.TEXTBOX,
            readonly: false,
            hidden: true,
            type: 'text',
          },
          {
            flexSize: 12,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_HU_ORGANIZATION_ORG_NOTE,
            field: 'note',
            value: '',
            controlType: EnumFormBaseContolType.TEXTAREA,
            textareaRows: 6,
            type: 'text',
          },
        ],
      ],
    },
  ];

  constructor(
    public override dialogService: DialogService,
    private appService: AppService,
    private organizationStructService: OrganizationStructService,
    private authService: AuthService,
    private organizationService: OrganizationService,
    private router: Router,
    private coreFormService: CoreFormService,
  ) {
    super(dialogService);

    this.captionCode = EnumTranslateKey.UI_COMPONENT_TITLE_HU_ORGANIZATION_EDIT;

    this.crud = {
      c: api.HU_ORGANIZATION_CREATE,
      r: api.HU_ORGANIZATION_READ,
      u: api.HU_ORGANIZATION_UPDATE,
      d: api.HU_ORGANIZATION_DELETE,
    };
  }
  ngAfterViewInit(): void {
    console.log(this.organizationStructService.currentOrg);
    if (this.organizationStructService.currentOrg != '0') {
      this.form.get('parentId')?.patchValue(this.organizationStructService.currentOrg);
      this.formInitStringValue = JSON.stringify(this.form.getRawValue());

      this.subsctiptions.push(
        // <== Inner push
        this.appService.get(this.parentGetByIdApi + '?id=' + this.organizationStructService.currentOrg).subscribe((o) => {
          if (o.ok && o.status === 200) {
            const body: IFormatedResponse = o.body;
            if (body.statusCode === 200 && !!body.innerBody) {
              this.parentGetByIdObject$.next(body.innerBody);
            } else {
              //this.responseService.resolve(body);
            }
          }
        }),
      );
    }
  }

  /* Properties to be passed into core-page-edit */

  ngOnInit(): void {
    this.subsctiptions.push(
      this.appService
        .get(api.HU_ORG_LEVEL_READ_ALL)
        .pipe(
          map((x: any) => {
            if (x.ok && x.status === 200) {
              const options: { value: number | null; text: string }[] = [{ value: null, text: '' }];
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
          this.orgLevelOptions$.next(response);
          this.loading = false;
        }),
    );

    this.subsctiptions.push(
      this.appService
        .get(api.HU_COMPANY_READ_ALL)
        .pipe(
          map((x: any) => {
            if (x.ok && x.status === 200) {
              const options: { value: number | null; text: string }[] = [{ value: null, text: '' }];
              x.body.innerBody.map((g: any) => {
                options.push({
                  value: g.id,
                  text: g.nameVn,
                });
              });
              return options;
            } else {
              return [];
            }
          }),
        )
        .subscribe((response) => {
          this.companyOptions$.next(response);
          this.loading = false;
        }),
    );
  }

  onCorePageHeaderButtonClick(e: any): void {}

  /* GET FormGroup Instance */
  onFormCreated(e: FormGroup): void {
    this.form = e;
    //const reg = /[ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂẾưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ]+/;
    // *
    this.form
      .get('name')
      ?.valueChanges.pipe(distinctUntilChanged())
      .subscribe((x) => {
        if (!!x) {
          var codeNew = x
            .split(' ')
            .map((x1: string) => (!isNaN(Number(x1)) ? x1 : x1.charAt(0)))
            .join('')
            .toUpperCase();
          codeNew = codeNew.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, 'a');
          codeNew = codeNew.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, 'e');
          codeNew = codeNew.replace(/I|Í|Ì|Ĩ|Ị/g, 'I');
          codeNew = codeNew.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, 'o');
          codeNew = codeNew.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, 'u');
          codeNew = codeNew.replace(/Y|Ý|Ỳ|Ỹ|Ỵ/g, 'Y');
          codeNew = codeNew.replace(/Đ/g, 'D');
          this.form.get('code')?.setValue(codeNew);
        } else {
          this.form.get('code')?.setValue('');
        }
      })!;

    const regex: any = /^[0-9]+$/;
  }

  /* GET form refference */
  onFormRefCreated(e: any): void {
    this.organizationStructService.currentEditFormRef = e;
  }

  /* To allow form to be deactivated */
  onFormReinit(e: string): void {
    this.formInitStringValue = e;
  }

  onSubmit(payload: any) {
    this.loading = true
    this.subsctiptions.push(
      this.appService.post(JSON.parse(payload).id != '' ? this.crud.u! : this.crud.c!, payload).subscribe((x) => {
        this.loading = false;
        if (x.ok && x.status === 200) {
          const body: IFormatedResponse = x.body;
          if (body.statusCode === 200) {
            this.subsctiptions.push(
              this.appService.get(api.SYS_USER_QUERY_ORG_PERMISSION_LIST).subscribe((x1) => {
                if (x1.ok && x1.status === 200) {
                  const body1: IFormatedResponse = x1.body;
                  if (body1.statusCode === 200) {
                    console.log(body1);
                    // this.authService.data$ change =>> in AppLayoutComponent ==> treeData$ change
                    this.authService.stopSubscription = true;
                    this.authService.data$.next({
                      ...this.authService.data$.value!,
                      orgIds: body1.innerBody,
                    });
                    setTimeout(() => (this.authService.stopSubscription = false));

                    // Update OrganizationService's linerData$ to update UI
                    this.organizationService.linerData$.next(body1.innerBody! as IOrgTreeItem[])
                    // update this.organizationService.orgTreeData$

                    const curentExpandedKeys = this.organizationService.status$.value.expandedKeys;
                    const status: IEveryTreeStatus = {
                      selectedKey: body.innerBody.id.toString(),
                      expandedKeys: JSON.parse(payload).parentId ? [...curentExpandedKeys /*JSON.parse(payload).parentId.toString()*/] : [],
                      activeKeys: [body.innerBody.id.toString()]
                    }
                    
                    this.organizationService.buildTreeData(status);

                    this.formInitStringValue = JSON.stringify(this.form.getRawValue());

                    setTimeout(() => {
                      this.router.navigateByUrl('cms/organize/business/organization-struct/view/' + btoa(body.innerBody.id.toString()));
                    });
                  }
                }
              }),
            );
          }
        }
      }),
    );
  }

  ngOnDestroy(): void {
    this.subsctiptions.map((x) => x?.unsubscribe());
  }
}
