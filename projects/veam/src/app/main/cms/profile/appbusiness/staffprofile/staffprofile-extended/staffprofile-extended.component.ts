import { NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { EnumTranslateKey } from 'alpha-global-constants';
import { CoreAccordionComponent, CoreButtonGroupVnsComponent, CoreOrgTreeComponent, CorePageEditComponent, CorePageHeaderComponent, CorePageListComponent, EnumCoreTablePipeType, FullscreenModalLoaderComponent, ICoreTableColumnItem, MapAvatarToServerPipe, StaffProfileComponent } from 'ngx-histaff-alpha';

@Component({
  selector: 'app-staffprofile-extended',
  standalone: true,
  imports: [
    CoreOrgTreeComponent,
    StaffProfileComponent,
    CorePageListComponent,
    CorePageHeaderComponent,
    CorePageEditComponent,
    CoreAccordionComponent,
    CoreButtonGroupVnsComponent,
    FullscreenModalLoaderComponent,
    NgIf,
    FormsModule,
    MapAvatarToServerPipe
  ],
  templateUrl: './staffprofile-extended.component.html',
  styleUrl: './staffprofile-extended.component.scss'
})
export class StaffprofileExtendedComponent extends StaffProfileComponent {
  override columns: ICoreTableColumnItem[] = [
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_COMMON_ID,
      field: 'id',
      hidden: true,
      type: 'number',
      align: 'right',
      width: 200,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_COMMON_JOB_ORDER_NUM,
      field: 'jobOrderNum',
      type: 'number',
      align: 'right',
      width: 0,
      hidden: true,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_STAFF_PROFILE_AVATAR, // to be asigned to EnumTranslateKey
      field: 'avatar',
      type: 'string',
      align: 'left',
      hideSearchBox: true,
      width: 80,
      templateRef: this.avatarTemplate,
    },
    {
      caption:
        EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_STAFF_PROFILE_EMPLOYEE_CODE, // to be asigned to EnumTranslateKey
      field: 'code',
      type: 'string',
      align: 'left',
      width: 80,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_STAFF_PROFILE_FULLNAME, // to be asigned to EnumTranslateKey
      field: 'fullname',
      type: 'string',
      align: 'left',
      width: 260,
      pipe: EnumCoreTablePipeType.NORMALIZE_HUMAN_NAME,
    },
    {
      caption:
        EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_SYS_USER_EMPLOYEE_PROFILE_CODE, // to be asigned to EnumTranslateKey
      field: 'profileCode',
      type: 'string',
      align: 'left',
      width: 80,
    },
    {
      caption:
        EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_STAFF_PROFILE_POSITION_NAME, // to be asigned to EnumTranslateKey
      field: 'nameOnProfileEmployee',
      type: 'string',
      align: 'left',
      width: 300,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_STAFF_PROFILE_ORG_NAME, // to be asigned to EnumTranslateKey
      field: 'orgName',
      type: 'string',
      align: 'left',
      width: 200,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_STAFF_WORK_STATUS_NAME, // to be asigned to EnumTranslateKey
      field: 'workStatusName',
      type: 'string',
      align: 'left',
      width: 200,
    },
  ];
}
