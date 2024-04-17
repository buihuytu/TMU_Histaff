import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { BehaviorSubject, Subscription, from, map } from 'rxjs';

import { SysMailTemplateService } from '../sys-mail-template.service';
import { CorePageEditComponent, CorePageHeaderComponent, CoreCheckboxComponent, CoreDropdownComponent, CoreFormComponent, BaseEditComponent, ICorePageEditCRUD, EnumCorePageEditMode, ICoreDropdownOption,ICoreFormSection, EnumFormBaseContolType, DialogService, AppService, UrlService, IDynamicFormEmitOnFormCreated } from 'ngx-histaff-alpha';
import { EnumTranslateKey, api } from 'alpha-global-constants';

@Component({
  selector: 'app-sys-mail-template-edit',
  standalone: true,
  imports: [
    CorePageEditComponent,
    FormsModule,
    CommonModule,
    CorePageHeaderComponent,
    CoreCheckboxComponent,
    CoreDropdownComponent,
    CKEditorModule,
    CoreFormComponent],
  templateUrl: './sys-mail-template-edit.component.html',
  styleUrl: './sys-mail-template-edit.component.scss'
})
export class SysMailTemplateEditComponent extends BaseEditComponent implements OnInit, OnDestroy, AfterViewInit {

  override entityTable = 'SYS_MAIL_TEMPLATE';
  loading: boolean = false;
  name = 'Angular';
  data: any = ``;
  editor = ClassicEditor;
  captionCode: EnumTranslateKey = EnumTranslateKey.UI_COMPONENT_TITLE_SYS_MAIL_TEMPLATE_EDIT;
  crud!: ICorePageEditCRUD;
  subcriptions: Subscription[] = []
  mode$!: BehaviorSubject<EnumCorePageEditMode>;
  functionalGroupOptions$ = new BehaviorSubject<ICoreDropdownOption[]>([]);
  functionalGroupGetByIdObject$ = new BehaviorSubject<any>(null);
  functionalGroupGetByIdApi = api.SYS_OTHERLIST_TYPE_READ;
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
            readonly: true,
            type: 'number',
            hidden: true,
          },
        ],
        [
          {
            flexSize: 3,
            label: EnumTranslateKey.UI_COMPONENT_TITLE_SYS_MAIL_TEMPLATE_CODE,
            field: 'code',
            value: '',
            controlType: EnumFormBaseContolType.TEXTBOX,
            type: 'string',
          },
          {
            flexSize: 4,
            label: EnumTranslateKey.UI_COMPONENT_TITLE_SYS_MAIL_TEMPLATE_NAME,
            field: 'name',
            value: '',
            controlType: EnumFormBaseContolType.TEXTBOX,
            type: 'string',
          },
          {
            flexSize: 5,
            label: EnumTranslateKey.UI_COMPONENT_TITLE_SYS_MAIL_TEMPLATE_IS_MAIL_CC,
            field: 'isMailCc',
            value: '',
            controlType: EnumFormBaseContolType.CHECKBOX,
            type: 'bool',
          },
        ],
        [
          {
            flexSize: 12,
            label: EnumTranslateKey.UI_COMPONENT_TITLE_SYS_MAIL_TEMPLATE_TITLE,
            field: 'title',
            value: '',
            controlType: EnumFormBaseContolType.TEXTBOX,
            type: 'string',
          },
        ],
        [
          {
            flexSize: 6,
            label: EnumTranslateKey.UI_COMPONENT_TITLE_SYS_MAIL_TEMPLATE_MAIL_CC,
            field: 'mailCc',
            value: '',
            controlType: EnumFormBaseContolType.TEXTBOX,
            type: 'string',
          },
          {
            flexSize: 6,
            label: EnumTranslateKey.UI_COMPONENT_TITLE_SYS_MAIL_TEMPLATE_FUNCTIONAL_GROUP_NAME,
            field: 'functionalGroupId',
            value: '',
            controlType: EnumFormBaseContolType.DROPDOWN,
            dropdownOptions$: this.functionalGroupOptions$,
            getByIdObject$: this.functionalGroupGetByIdObject$,
            getByIdApi: this.functionalGroupGetByIdApi,
            shownFrom: 'name',
            type: 'text',
          },
        ],
        [
          {
            flexSize: 12,
            label: EnumTranslateKey.UI_COMPONENT_TITLE_SYS_MAIL_TEMPLATE_REMARK,
            field: 'remark',
            value: '',
            controlType: EnumFormBaseContolType.TEXTBOX,
            type: 'string',
          },
        ],
        [
          {
            flexSize: 12,
            label: EnumTranslateKey.UI_COMPONENT_TITLE_SYS_MAIL_TEMPLATE_REMARK,
            field: 'content',
            value: '',
            controlType: EnumFormBaseContolType.TEXTBOX,
            type: 'string',
            hidden: true
          },
        ]
      ]
    }
  ]

  constructor(
    public override dialogService: DialogService,
    private appService: AppService,
    private urlService: UrlService,
    private router: Router,
    private route: ActivatedRoute,
    private sysMailTemplateService: SysMailTemplateService
  ) {
    super(dialogService)
  }

  ngOnInit(): void {
    this.subcriptions.push(
      this.appService.get(api.SYS_OTHERLIST_GETOTHERLISTBYTYPE + `FUNCTION_GROUP`)
        .pipe(map((x: any) => {
          // if (x.ok && x.status === 200 && x.body?.statusCode === 200) {
          const options: { value: number; text: string; code: string }[] = [];
          x.body.innerBody.map((y: any) => {
            options.push({
              value: y.id,
              text: y.name,
              code: y.code
            });
          })
          return options;
          // }
        }))
        .subscribe((response) => {
          this.functionalGroupOptions$.next(response)
        })

    )
    if (this.sysMailTemplateService.sysMailTemplateId !== 0) {
      this.subcriptions.push(
        this.appService.get(api.SYS_MAIL_TEMPLATE_READ + `?id=${this.sysMailTemplateService.sysMailTemplateId}`)
          .subscribe((x) => {
            if (x.ok && x.status === 200 && x.body.statusCode === 200) {
              this.form.patchValue(x.body.innerBody);
              this.data = x.body.innerBody.content;
              this.formInitStringValue = JSON.stringify(this.form.getRawValue());
            }
          })
      )
    }

    // this.formInitStringValue = JSON.stringify(this.form.getRawValue());

  }

  onFormCreated(e: IDynamicFormEmitOnFormCreated): void {
    this.form = e.formGroup;

  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.formInitStringValue = JSON.stringify(
        this.form.getRawValue()
      );
    })
  }

  onSubmit(): void {
    if (this.form.get('id')?.value === 0) {
      const request = this.form.getRawValue();
      this.subcriptions.push(
        this.appService.post(api.SYS_MAIL_TEMPLATE_CREATE, request).subscribe(x => {
          if (x.ok && x.status && x.body?.statusCode === 200) {
            this.formInitStringValue = JSON.stringify(
              this.form.getRawValue()
            );
            // this.canDeactivate()
            this.router.navigateByUrl('/cms/system/sys-mail-template')
          }
        })
      )
    }
    else {
      const request = this.form.getRawValue();
      this.subcriptions.push(
        this.appService.post(api.SYS_MAIL_TEMPLATE_UPDATE, request).subscribe(x => {
          if (x.ok && x.status && x.body?.statusCode === 200) {
            this.formInitStringValue = JSON.stringify(
              this.form.getRawValue()
            );
            this.router.navigateByUrl('/cms/system/sys-mail-template')
          }
        })
      )
    }
  }



  onCancel(): void {
    // this.formInitStringValue = JSON.stringify(
    //   this.form.getRawValue()
    // );

    if (!!this.urlService.previousRouteUrl$.value.length) {
      this.router.navigateByUrl(this.urlService.previousRouteUrl$.value);
    } else {
      this.router.navigate(['../'], { relativeTo: this.route });
    }
  }

  onChangeContent($event: any) {
    console.log(this.form);
    this.form.get('content')?.setValue($event.editor.getData())

  }
  ngOnDestroy(): void {
    this.sysMailTemplateService.sysMailTemplateId = 0
  }
}
