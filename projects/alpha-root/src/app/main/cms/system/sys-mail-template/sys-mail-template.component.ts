import { AfterViewInit, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Router } from '@angular/router';
import { CorePageHeaderComponent, CorePageListComponent, CoreCheckboxComponent, BaseComponent, ICorePageListApiDefinition,ICorePageListEditRouting, ICorePageListCRUD, ICoreTableColumnItem, MultiLanguageService, AppService, AlertService, AuthService, ICoreButtonVNS, EnumCoreButtonVNSCode, alertOptions } from 'ngx-histaff-alpha';
import { BehaviorSubject } from 'rxjs';
import { SysMailTemplateService } from './sys-mail-template.service';
import { EnumTranslateKey, api } from 'alpha-global-constants';


@Component({
  selector: 'app-sys-mail-template',
  standalone: true,
  imports: [CorePageHeaderComponent, CorePageListComponent, CKEditorModule, CoreCheckboxComponent],
  templateUrl: './sys-mail-template.component.html',
  styleUrl: './sys-mail-template.component.scss',

})
export class SysMailTemplateComponent extends BaseComponent implements OnInit, AfterViewInit {
  content!: string;
  name = 'Angular';
  data: any = ``;
  editor = ClassicEditor;
  @ViewChild('isMailCc') isMailCc!: TemplateRef<any>;
  isMailCcTemplate!: TemplateRef<any>;
  title = EnumTranslateKey.UI_COMPONENT_TITLE_SYS_MAIL_TEMPLATE;
  outerParam$ = new BehaviorSubject<any>(null);
  corePageListInstanceNumber!: number;
  selectedIds: any[] = [];
  apiDefinition: ICorePageListApiDefinition = {
    queryListRelativePath: api.SYS_MAIL_TEMPLATE_QUERY_LIST,
  };

  editRoute: ICorePageListEditRouting = {
    auxiliary: 'popupAux',
  };

  crud: ICorePageListCRUD = {
    deleteIds: api.SYS_MAIL_TEMPLATE_DELETE_IDS,
  };

  columns: ICoreTableColumnItem[] = [
    {
      caption: 'ContractType.ID',
      field: 'id',
      hidden: true,
      type: 'number',
      align: 'left',
      width: 200,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_SYS_MAIL_TEMPLATE_CODE,
      field: 'code',
      type: 'string',
      align: 'center',
      width: 130,
    },

    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_SYS_MAIL_TEMPLATE_NAME,
      field: 'name',
      type: 'string',
      align: 'center',
      width: 130,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_SYS_MAIL_TEMPLATE_TITLE,
      field: 'title',
      type: 'string',
      align: 'center',
      width: 150,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_SYS_MAIL_TEMPLATE_FUNCTIONAL_GROUP_NAME,
      field: 'functionalGroupName',
      type: 'string',
      align: 'center',
      width: 130,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_SYS_MAIL_TEMPLATE_MAIL_CC,
      field: 'mailCc',
      type: 'string',
      align: 'center',
      width: 130,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_SYS_MAIL_TEMPLATE_REMARK,
      field: 'remark',
      type: 'string',
      align: 'center',
      width: 130,
    },
    {
      caption: EnumTranslateKey.UI_COMPONENT_TITLE_SYS_MAIL_TEMPLATE_IS_MAIL_CC,
      field: 'isMailCc',
      type: 'string',
      align: 'center',
      width: 130,
      templateRef: this.isMailCcTemplate
    },

  ]
  constructor(public override mls: MultiLanguageService,
    private sysMailTemplateService: SysMailTemplateService,
    private router: Router,
    private route: ActivatedRoute,
    private appService: AppService,
    private alerService: AlertService,
    private authService: AuthService) {
    super(mls);
    this.corePageListInstanceNumber = new Date().getTime();

  }
  ngAfterViewInit(): void {
    setTimeout(() => {
      this.columns.filter((c) => c.field === 'isMailCc')[0].templateRef = this.isMailCc

    })
  }
  onChangeContent($event: any) {
    this.content = $event.editor.getData();
  }

  onClickItem($event: any) {
    this.sysMailTemplateService.sysMailTemplateId = $event.id
    this.subscriptions.push(
      this.appService.get(api.SYS_MAIL_TEMPLATE_READ + `?id=${$event.id}`).subscribe((x) => {
        if (x.ok && x.status === 200 && x.body.statusCode === 200) {
          this.data = x.body.innerBody.content
        }
      })
    )

  }
  onSelectedIdsChange(e: string[] | number[]) {
    this.selectedIds = e
  }
  onCorePageHeaderButtonClick(e: ICoreButtonVNS) {
    switch (e.code) {
      case EnumCoreButtonVNSCode.HEADER_CREATE:
        this.router.navigate([btoa('0'), { listInstance: this.corePageListInstanceNumber }], {
          relativeTo: this.route.parent,
        });
        break;
      case EnumCoreButtonVNSCode.HEADER_EDIT:
        if (this.selectedIds.length > 1) {
          this.alerService.warn(this.mls.trans('SELECT_ONLY_ONE_RECORD_TO_EDIT'), alertOptions)
        }
        else if (this.selectedIds.length === 1) {
          this.router.navigate([btoa('0'), { listInstance: this.corePageListInstanceNumber }], {
            relativeTo: this.route.parent,
          });
        }
        else {
          this.alerService.warn(this.mls.trans('NO_SELECTED_ID_TO_EDIT'), alertOptions)
        }
        break;
      case EnumCoreButtonVNSCode.HEADER_DELETE:
        if (this.selectedIds.length > 0) {
          this.router.navigate(
            [
              {
                outlets: {
                  corePageListAux: [btoa('0'), { listInstance: this.corePageListInstanceNumber }],
                },
              },
            ],
            { relativeTo: this.route },
          );
        }
        else {
          this.alerService.warn(this.mls.trans('NO_SELECTED_ID_TO_EDIT'), alertOptions)
        }
        break;
      case EnumCoreButtonVNSCode.HEADER_SAVE:
        if (this.sysMailTemplateService.sysMailTemplateId !== 0 && this.content != '') {
          this.UpdateDataOnDataTable(this.sysMailTemplateService.sysMailTemplateId, this.content)
        }
        break;
      default:
        break;
    }
  }

  UpdateDataOnDataTable(id: number, content: string) {
    const userId = this.authService.data$.value?.id;
    const request = { id: id, content: content, updatedBy: userId }
    this.appService.post(api.SYS_MAIL_TEMPLATE_UPDATE, request)
      .subscribe(x => {
        if (x.ok && x.status === 200 && x.body?.statusCode === 200) {
          console.log('Success');
          this.sysMailTemplateService.sysMailTemplateId = 0
          content = ''
        }
      })
  }
}
