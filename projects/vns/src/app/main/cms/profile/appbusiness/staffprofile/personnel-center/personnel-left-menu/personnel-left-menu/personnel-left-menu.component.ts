import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Subscription, distinctUntilChanged } from 'rxjs';
import { EnumTranslateKey, api } from 'alpha-global-constants';
import { BaseEditComponent, EnumCoreFileUploaderType, ICorePageEditCRUD, ICoreFormSection, EnumFormBaseContolType, DialogService, MultiLanguageService, RandomAvatarService, AlertService } from 'ngx-histaff-alpha';
import { PersonnelCenterService } from '../../personnel-center.service';


interface IPersonnelLeftMenuItem {
  code: EnumTranslateKey;
  routerLink: string;
}

@Component({
  selector: 'app-personnel-left-menu',
  templateUrl: './personnel-left-menu.component.html',
  styleUrls: ['./personnel-left-menu.component.scss'],
})
export class PersonnelLeftMenuComponent extends BaseEditComponent implements OnInit, AfterViewInit, OnDestroy {

  items: IPersonnelLeftMenuItem[] = [
    {
      code: EnumTranslateKey.UI_PERSONNEL_MENU_ITEM_PROFILE_MANAGEMENT,
      routerLink: "personnel-profile"
    },
    {
      code: EnumTranslateKey.UI_PERSONNEL_MENU_ITEM_WORKING_HISTOTY,
      routerLink: "working-history"
    },
    {
      code: EnumTranslateKey.UI_PERSONNEL_MENU_ITEM_WORKING,
      routerLink: "wage-allowance"
    },
    {
      code: EnumTranslateKey.UI_PERSONNEL_MENU_ITEM_CONTRACT,
      routerLink: "contract"
    },
    {
      code: EnumTranslateKey.UI_PERSONNEL_MENU_ITEM_CERTIFICATE,
      routerLink: "certificate"
    },
    {
      code: EnumTranslateKey.UI_PERSONNEL_MENU_ITEM_COMMEND,
      routerLink: "commend"
    },
    {
      code: EnumTranslateKey.UI_PERSONNEL_MENU_ITEM_DISCIPLINE,
      routerLink: "discipline"
    },
    {
      code: EnumTranslateKey.UI_PERSONNEL_MENU_ITEM_FAMILY,
      routerLink: "family"
    },
    {
      code: EnumTranslateKey.UI_PERSONNEL_MENU_ITEM_TERMINATE,
      routerLink: "terminate"
    },
  ]
  otherName: string = EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_USER_EMPLOYEE_OTHER_NAME;
  gender: string = EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_USER_GENDER;
  birthDay: string = EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_USER_BIRTHDAY;
  workStatusDetail: string = EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_USER_WORK_STATUS_DETAIL;
  workStatus: string = EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_USER_WORK_STATUS;
  code : string = EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_HU_EMPLOYEE_CODE;
  profileCode : string = EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_USER_EMPLOYEE_PROFILE_CODE;


  override form: FormGroup = new FormGroup({
    id: new FormControl(null),
    avatar: new FormControl(''),
    avatarFileData: new FormControl(''),
    avatarFileName: new FormControl(''),
    avatarFileType: new FormControl(''),
  })

  lang!: string;
  loading: boolean = false;
  subsctiptions: Subscription[] = [];
  override entityTable = "HU_EMPLOYEE_CV";

  uploadFileType: EnumCoreFileUploaderType = EnumCoreFileUploaderType.IMAGE_AVATAR;
  fileDataControlName: string = 'avatarFileData';
  fileNameControlName: string = 'avatarFileName';
  fileTypeControlName: string = 'avatarFileType';

  defaultAvatar!: string;

  employee!: any;
  employeeCv!: any;

  crud!: ICorePageEditCRUD;

  sections: ICoreFormSection[] = [
    {
      rows: [
        [
          {
            flexSize: 0,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_COMMON_ID,
            field: 'id',
            value: 0,
            controlType: EnumFormBaseContolType.TEXTBOX,
            type: 'number',
            hidden: true // To hide id field
          },
          {
            flexSize: 12,
            label: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_HU_EMPLOYEE_CV_AVATAR,
            field: 'avatar',
            value: this.employeeCv?.avatar,
            controlType: EnumFormBaseContolType.FILEUPLOADER,
            type: 'text',
            uploadFileType: EnumCoreFileUploaderType.IMAGE_AVATAR,
            fileDataControlName: "avatarFileData",
            fileNameControlName: "avatarFileName",
            fileTypeControlName: "avatarFileType",

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
        ]
      ]
    }
  ]

  @ViewChild('container') container!: ElementRef;

  constructor(
    private fb: FormBuilder,
    public override dialogService: DialogService,
    private mls: MultiLanguageService,
    private randomAvatarService: RandomAvatarService,
    public personnelCenterService: PersonnelCenterService,
    public alertService : AlertService
  ) {
    super(dialogService);
    this.crud = {
      c: api.HU_EMPLOYEE_CV_CREATE,
      r: api.HU_EMPLOYEE_CV_READ,
      u: api.HU_EMPLOYEE_CV_UPDATE,
      d: api.HU_EMPLOYEE_CV_DELETE,
    };
    this.defaultAvatar = this.randomAvatarService.get();
  }

  ngOnInit(): void {
    this.subsctiptions.push(
      this.mls.lang$.subscribe(x => this.lang = x),

    )

    this.subsctiptions.push(
      this.personnelCenterService.employee$.subscribe(x => this.employee = x)
    )
    this.subsctiptions.push(
      this.personnelCenterService.employeeCv$.subscribe(x => {
        this.employeeCv = x
        console.log("employeeCv$ changed to ", x)
        if (!!x) {
          this.form.patchValue({
            id: x.id,
            avatar: x.avatar
          })
        }
      })
    )
    this.subsctiptions.push(
      this.form.get('avatar')?.valueChanges.subscribe(x => {
        this.personnelCenterService.pendingAvatar = x
          setTimeout(() => {
            if (!!x) {
            let request = this.form.getRawValue();
            if(!!request.avatarFileData && !!request.avatarFileName && !!request.avatarFileType){
              this.personnelCenterService.updateAvatarStaffProfile(request).subscribe((rs: any) => {
                if(rs.body.statusCode == 200){
                  this.personnelCenterService.avatar = this.personnelCenterService.pendingAvatar
                  // this.alertService.success(`${this.mls.trans(rs.body.messageCode)}`, alertOptions);
                }
                // else{
                //   // this.alertService.error(`${this.mls.trans(rs.body.messageCode)}`, alertOptions);
                // }
              })
            }else{
              this.personnelCenterService.avatar = this.personnelCenterService.pendingAvatar
            }
            
          }
        }, 500)
      })!
    )


  }

  private resize(): void {
    const appHeaderHeight = Number(getComputedStyle(document.documentElement).getPropertyValue('--size-header-height').replace('px', ''))
    const blockCellSpacing = Number(getComputedStyle(document.documentElement).getPropertyValue('--size-layout-block-cell-spacing').replace('px', ''))
    const corePageListHeaderHeight = Number(getComputedStyle(document.documentElement).getPropertyValue('--size-core-page-header-height').replace('px', ''))
    console.log(appHeaderHeight);
    console.log(blockCellSpacing);
    console.log(corePageListHeaderHeight);

    this.container.nativeElement.style.setProperty('--height', window.innerHeight - appHeaderHeight - 3 * blockCellSpacing - corePageListHeaderHeight + 'px')
  }

  ngAfterViewInit(): void {
    setTimeout(() => this.resize())
    console.log(this.form)
  }

  ngOnDestroy(): void {
    this.subsctiptions.map(x => x?.unsubscribe())
  }

}
