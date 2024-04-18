import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { ITenantUserFormGroup } from './ITenantUserCreateRequest';
import { BaseEditComponent, DialogService, EnumCoreFileUploaderType, EnumCoreFormControlSeekerSourceType, EnumFormBaseContolType, ICoreChecklistOption, ICoreDropdownOption, ICoreFormSection, ICorePageEditCRUD, MultiLanguageService } from 'ngx-histaff-alpha';
import { Validators, FormGroup } from '@angular/forms';
import { Subscription, BehaviorSubject, map } from 'rxjs';
import { UserEditService } from './user-edit.service';
import { EnumTranslateKey, api } from 'alpha-global-constants';

@Component({
  selector: "app-user-edit",
  templateUrl: "./user-edit.component.html",
  styleUrls: ["./user-edit.component.scss"],
})
export class UserEditComponent extends BaseEditComponent implements OnInit, AfterViewInit, OnDestroy {

  override form!: ITenantUserFormGroup

  loading: boolean = false;

  subsctiptions: Subscription[] = [];

  groupOptions$ = new BehaviorSubject<ICoreDropdownOption[]>([]);


  userGroupGetByIdObject$ = new BehaviorSubject<any>(null);
  userGroupGetByIdApi = api.SYS_GROUP_READ;

  employeeGetByIdObject$ = new BehaviorSubject<any>(null);
  employeeGetByIdApi = api.HU_EMPLOYEE_READ;

  workingGetByIdObject$ = new BehaviorSubject<any>(null);
  workingGetByIdApi = api.HU_DECISION_READ;

  orgUnitGetByIdObject$ = new BehaviorSubject<any>(null);
  orgUnitGetByIdApi = api.OM_ORGANIZATION_READ

  /* #region An checklistOptions$ example to use CoreChecklistComponent */
  checklistOptions$ = new BehaviorSubject<ICoreChecklistOption[]>([
    {
      value: 1,
      text: "Option1",

      checked: false
    },
    {
      value: 2,
      text: "Option2",
      checked: false
    },
    {
      value: 3,
      text: "Option3",
      checked: false
    },
  ])
  /* #endregion An checklistOptions$ example to use CoreChecklistComponent */


  /* #region Properties to be passed into core-page-edit */

  override entityTable = "SYS_USER";

  captionCode!: EnumTranslateKey;
  //formComposition!: ICorePageEditColumnComposition[][];
  crud!: ICorePageEditCRUD;

  leftSections: ICoreFormSection[] = [
    {
      rows: [
        [
          {
            flexSize: 0,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_COMMON_ID,
            field: 'id',
            value: 0,
            controlType: EnumFormBaseContolType.TEXTBOX,
            type: 'string',
            hidden: true // To hide id field
          },
          {
            flexSize: 12,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_USER_AVATAR,
            field: 'avatar',
            value: '',
            controlType: EnumFormBaseContolType.FILEUPLOADER,

            /* 
              START: WHEN USING controlType === EnumFormBaseContolType.FILEUPLOADER
              we must pass the three properties bellow:
             */
            uploadFileType: EnumCoreFileUploaderType.IMAGE_AVATAR,
            fileDataControlName: "avatarFileData",
            fileNameControlName: "avatarFileName",
            fileTypeControlName: "avatarFileType",
            verticalMode: true,
            /* END: WHEN USING controlType === EnumFormBaseContolType.FILEUPLOADER */

            type: 'text'
          },
          {
            flexSize: 0,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_USER_AVATAR_FILEDATA,
            field: 'avatarFileData',
            value: "",
            controlType: EnumFormBaseContolType.TEXTBOX,
            type: 'string',
            hidden: true // To hide
          },

          {
            flexSize: 0,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_USER_AVATAR_FILENAME,
            field: 'avatarFileName',
            value: "",
            controlType: EnumFormBaseContolType.TEXTBOX,
            type: 'string',
            hidden: true // To hide
          },
          {
            flexSize: 0,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_USER_AVATAR_FILETYPE,
            field: 'avatarFileType',
            value: "",
            controlType: EnumFormBaseContolType.TEXTBOX,
            type: 'string',
            hidden: true // To hide
          },
        ],
      ]
    },
  ]

  sections: ICoreFormSection[] =
    [
      {
        caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_USER_USER_SECTION,
        rows: [
          [
            {
              flexSize: 6,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_TENANT_GROUP_NAME,
              field: 'groupId',
              value: '',
              controlType: EnumFormBaseContolType.DROPDOWN,
              /* 
                START: WHEN USING controlType === EnumFormBaseContolType.DROPDOWN
                we must pass the three properties bellow:
               */
              getByIdObject$: this.userGroupGetByIdObject$,
              getByIdApi: this.userGroupGetByIdApi,
              shownFrom: 'name',
              dropdownOptions$: this.groupOptions$,
              /* END: WHEN USING controlType === EnumFormBaseContolType.DROPDOWN */

              type: 'number',
              validators: [
                {
                  name: 'required',
                  validator: Validators.required,
                  errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
                },
                {
                  name: 'minLength',
                  validator: Validators.min(1),
                  errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
                }
              ]
            },
          ],
          [
            {
              flexSize: 6,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_USER_USER_NAME,
              field: 'username',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              type: 'text',
              disabled: true,
              validators: [
                {
                  name: 'required',
                  validator: Validators.required,
                  errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
                },
                {
                  name: 'minLength',
                  validator: Validators.minLength(4),
                  errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_MIN_LENGTH,
                }
              ],
            },
            {
              flexSize: 6,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_USER_FULLNAME,
              field: 'fullname',
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
                  validator: Validators.minLength(6),
                  errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_MIN_LENGTH,
                }
              ]
            },
          ],
          [
            {
              flexSize: 6,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_USER_IS_WEBAPP,
              field: 'isWebapp',
              value: false,
              controlType: EnumFormBaseContolType.CHECKBOX,
              type: 'boolean',
            },
            {
              flexSize: 6,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_USER_IS_PORTAL,
              field: 'isPortal',
              value: false,
              controlType: EnumFormBaseContolType.CHECKBOX,
              type: 'boolean',
            },
          ],
          [
            {
              flexSize: 6,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_USER_IS_ADMIN,
              field: 'isAdmin',
              value: false,
              controlType: EnumFormBaseContolType.CHECKBOX,
              type: 'boolean',
              hint: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_USER_IS_ADMIN
            },
          ],
        ]
      },
      {
        caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_USER_EMPLOYEE_SECTION,
        rows: [
          [
            {
              flexSize: 0,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_EMPLOYEE_CODE,
              field: 'employeeCode',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              hidden: true,
            },
            {
              flexSize: 6,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_EMPLOYEE_CODE,
              field: 'employeeId',
              value: '',
              controlType: EnumFormBaseContolType.SEEKER,

              /* 
                START: WHEN USING controlType === EnumFormBaseContolType.SEEKER
                we must pass the three properties bellow:
               */
              seekerSourceType: EnumCoreFormControlSeekerSourceType.EMPLOYEE_SEEK,
              getByIdObject$: this.employeeGetByIdObject$,
              getByIdApi: this.employeeGetByIdApi,
              boundFrom: 'id',
              shownFrom: 'code',
              alsoBindTo: [{ takeFrom: 'code', bindTo: 'employeeCode' }, { takeFrom: 'fullname', bindTo: 'employeeName' }],
              /* END: WHEN USING controlType === EnumFormBaseContolType.SEEKER */

              type: 'number',
              // validators: [
              //   {
              //     name: 'required',
              //     validator: Validators.required,
              //     errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
              //   }
              // ]
            },
            {
              flexSize: 6,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_EMPLOYEE_FULLNAME,
              field: 'employeeName',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              readonly: true, // We will update this field programatically
              type: 'text',
            },
          ],
        ]
      },
      {
        addModeOnly: true,
        rows: [
          [
            {
              flexSize: 6,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_USER_PASSWORD,
              field: 'password',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              type: 'password',
              validators: [
                {
                  name: 'required',
                  validator: Validators.required,
                  errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
                },
                {
                  name: 'minLength',
                  validator: Validators.minLength(6),
                  errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_MIN_LENGTH,
                }
              ]
            },
            {
              flexSize: 6,
              label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_USER_PASSWORD_CONFIRM,
              field: 'passwordConfirm',
              value: '',
              controlType: EnumFormBaseContolType.TEXTBOX,
              type: 'password',
              validators: [
                {
                  name: 'required',
                  validator: Validators.required,
                  errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_REQUIRED,
                },
                {
                  name: 'minLength',
                  validator: Validators.minLength(6),
                  errorMessage: EnumTranslateKey.UI_FORM_CONTROL_ERROR_MIN_LENGTH,
                }
              ]
            },
          ],
        ]
      },
    ];
  constructor(
    public override dialogService: DialogService,
    private userEditService: UserEditService,
    private mls: MultiLanguageService
  ) {

    super(dialogService);

    this.captionCode = EnumTranslateKey.UI_COMPONENT_TITLE_SYS_USER_EDIT;

    this.crud = {
      c: api.SYS_USER_CREATE,
      r: api.SYS_USER_READ,
      u: api.SYS_USER_UPDATE,
      d: api.SYS_USER_DELETE,
    };

  }
  /* #endregion Properties to be passed into core-page-edit */

  ngOnInit(): void {
  }

  /* GET FormGroup Instance */
  onFormCreated(e: FormGroup): void {
    this.form = e as ITenantUserFormGroup;
    console.log("UserEditComponent onFormCreated ", new Date().getTime());

    this.form.get('employeeId')?.valueChanges.subscribe(x => {
      if (!x) {
        this.form.get('employeeCode')?.patchValue(null);
        this.form.get('employeeName')?.patchValue(null);
      }
    })

  }

  /* To allow form to be deactivated */
  onFormReinit(e: string): void {
    this.formInitStringValue = e;

    if(this.form.get('id')?.value === '0' || this.form.get('id')?.value === 0 || this.form.get('id')?.value === null) {
      this.form.get('username')?.enable();
    } else {
      this.form.get('username')?.disable();
    }
    
  }

  ngAfterViewInit(): void {
    console.log("UserEditComponent ngAfterViewInit ", new Date().getTime())
    
    // VỊ TRÍ CHUYỂN CHỖ MỚI 
    
    setTimeout(() => {

      this.loading = true;
     
      this.subsctiptions.push(
        this.userEditService.getUserGroupList()
          .pipe(
            map((x: any) => {
              if (x.ok && x.status === 200) {
                const options: { value: number; text: string; }[] = [];
                x.body.innerBody.map((g: any) => {
                  options.push({
                    value: g.id,
                    text: g.name
                  })
                })
                return options;
              } else {
                return [];
              }
            })
          )
          .subscribe(response => {

            console.log("userEditService.getUserGroupList() response", response)
            this.groupOptions$.next(response);
            this.loading = false;
          })
      )

    })

  }

  ngOnDestroy(): void {
    this.subsctiptions.map(x => x?.unsubscribe())
  }

}
