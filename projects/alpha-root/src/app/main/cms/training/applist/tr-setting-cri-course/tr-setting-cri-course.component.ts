import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, Input, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EnumTranslateKey, api } from 'alpha-global-constants';
import { BaseComponent, CoreCompositionComponent, CorePageHeaderComponent, CorePageListComponent, CoreStatusStickerComponent, EnumCoreTablePipeType, ICorePageListApiDefinition, ICorePageListCRUD, ICorePageListEditRouting, ICoreTableColumnItem, MultiLanguageService, RandomAvatarService } from 'ngx-histaff-alpha';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-tr-setting-cri-course',
  standalone: true,
  imports: [
    CorePageListComponent,
    CommonModule,
    CorePageHeaderComponent,
    CoreCompositionComponent,
    CoreStatusStickerComponent
  ],
  templateUrl: './tr-setting-cri-course.component.html',
  styleUrl: './tr-setting-cri-course.component.scss'
})
export class TrSettingCriCourseComponent extends BaseComponent implements AfterViewInit {
  @ViewChild('sticker') sticker!: TemplateRef<any>;
  @Input() hideHeader!: boolean;
  
  title = EnumTranslateKey.UI_COMPONENT_TITLE_TR_SETTING_CRI_COURSE
  outerParam$ = new BehaviorSubject<any>(null);


  apiDefinition: ICorePageListApiDefinition = {
    queryListRelativePath: api.TR_SETTING_CRI_COURSE_QUERY_LIST,
  }

  crud: ICorePageListCRUD = {
    deleteIds: api.TR_SETTING_CRI_COURSE_DELETE_IDS,
    //toggleActiveIds: api.TR_SETTING_CRI_COURSE_TOGGLE_ACTIVE_IDS,
  }

  avatarTemplate!: TemplateRef<any>;

  columns: ICoreTableColumnItem[] = [
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_COMMON_ID,
      field: 'id',
      hidden: true,
      type: 'string',
      align: 'left',
      width: 30,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_TR_SETTING_CRI_COURSE_TR_COURSE_NAME,
      field: 'trCourseName',
      type: 'string',
      align: 'center',
      width: 300,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_TR_SETTING_CRI_COURSE_SCALE_POINT,
      field: 'scalePoint',
      type: 'number',
      align: 'center',
      width: 300,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_TR_SETTING_CRI_COURSE_EFFECT_FROM,
      field: 'effectFrom',
      type: 'date',
      pipe: EnumCoreTablePipeType.DATE,
      align: 'center',
      width: 300,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_TR_SETTING_CRI_COURSE_EFFECT_TO,
      field: 'effectTo',
      type: 'date',
      pipe: EnumCoreTablePipeType.DATE,
      align: 'left',
      width: 300,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_TR_SETTING_CRI_COURSE_REMARK,
      field: 'remark',
      type: 'string',
      align: 'left',
      width: 300,
    },
  ]

  defaultAvatar!: string;

  editRoute: ICorePageListEditRouting = {
    auxiliary: 'popupAux'
  }
  /* End Properties being passed to core-page-type-a */

  constructor(
    public override mls: MultiLanguageService,
    private ras: RandomAvatarService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    super(mls);
    this.defaultAvatar = ras.get();
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      const stickerFilter = this.columns.filter(c => c.field === 'status');
      if (!!stickerFilter.length) stickerFilter[0].templateRef = this.sticker;
    })
  }
}
