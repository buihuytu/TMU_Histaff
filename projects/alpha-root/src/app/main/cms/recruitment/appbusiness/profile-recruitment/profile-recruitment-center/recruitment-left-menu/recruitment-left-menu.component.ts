import { Component, ElementRef, ViewChild } from '@angular/core';
import { ProfileRecruitmentCenterService } from '../profile-recruitment-center.service';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { EnumTranslateKey, api } from 'alpha-global-constants';
import { BaseEditComponent, EnumCoreFileUploaderType, ICorePageEditCRUD, ICoreFormSection, EnumFormBaseContolType, DialogService, MultiLanguageService, RandomAvatarService, AlertService } from 'ngx-histaff-alpha';
import { Subscription } from 'rxjs';

interface IRecruitmentLeftMenuItem {
  code: EnumTranslateKey;
  routerLink: string;
}

@Component({
  selector: 'app-recruitment-left-menu',
  standalone: false,
  templateUrl: './recruitment-left-menu.component.html',
  styleUrl: './recruitment-left-menu.component.scss'
})
export class RecruitmentLeftMenuComponent extends BaseEditComponent {
  items: IRecruitmentLeftMenuItem[] = [
    {
      code: EnumTranslateKey.UI_PERSONNEL_MENU_ITEM_PROFILE_MANAGEMENT,
      routerLink: "candidate-profile"
    },
    {
      code: EnumTranslateKey.UI_PERSONNEL_MENU_ITEM_WORKING_HISTOTY,
      routerLink: "working-history"
    },
    {
      code: EnumTranslateKey.UI_PERSONNEL_MENU_ITEM_REFERENCE_PERSON,
      routerLink: "reference-person"
    }
  ]

  code : string = EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_RC_RECRUITMENT_CODE;
  rcSourceRecName: string = EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_RC_RECRUITMENT_SOURCE_CANDIDATE;
  orgName: string = EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_STAFF_PROFILE_ORG_NAME;
  genderName: string = EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_USER_GENDER;
  birthDay: string = EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_USER_BIRTHDAY;
  workStatusDetail: string = EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_USER_WORK_STATUS_DETAIL;
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
  override entityTable = "RC_CANDIDATE_CV";

  uploadFileType: EnumCoreFileUploaderType = EnumCoreFileUploaderType.IMAGE_AVATAR;
  fileDataControlName: string = 'avatarFileData';
  fileNameControlName: string = 'avatarFileName';
  fileTypeControlName: string = 'avatarFileType';

  defaultAvatar!: string;

  candidate!: any;
  candidateCv!: any;

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
            value: this.candidateCv?.avatar,
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
    public alertService : AlertService,
    public profileRecruitmentCenterService: ProfileRecruitmentCenterService,
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
