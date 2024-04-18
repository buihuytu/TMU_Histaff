import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, OnInit, Renderer2, TemplateRef, ViewChild } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EnumTranslateKey, api } from 'alpha-global-constants';
import { AlertService, AppService, BaseComponent, CoreButtonGroupService, CoreButtonGroupVnsComponent, CoreButtonVnsComponent, CoreCheckboxComponent, CoreDropdownComponent, CorePageHeaderComponent, CorePageListComponent, CoreTableComponent, EnumCoreButtonVNSCode, EnumCoreTablePipeType, ICoreButtonVNS, ICoreDropdownOption, ICoreTableColumnItem, IFormatedResponse, ISearchItem, MultiLanguageService, ResponseService, TranslatePipe, alertOptions } from 'ngx-histaff-alpha';
import { BehaviorSubject, Subscription, debounceTime } from 'rxjs';
declare let coreFileUtils: any;
const { blobToBase64 } = coreFileUtils;

@Component({
  selector: 'app-dynamic-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    CorePageHeaderComponent,
    CoreDropdownComponent,
    CoreTableComponent,
    ReactiveFormsModule,
    TranslatePipe,
    CoreButtonGroupVnsComponent,
    CoreCheckboxComponent
  ],
  templateUrl: './dynamic-form.component.html',
  styleUrl: './dynamic-form.component.scss'
})
export class DynamicFormComponent extends BaseComponent implements OnInit,AfterViewInit {
  currentOption: any;
  selectedDatas: any;
  selectedViews: any;
  @ViewChild('fileImport') fileImport!: ElementRef;
  @ViewChild('isHaveFile') isHaveFile!: TemplateRef<any>;
  checkboxTemplate!: TemplateRef<any>;
  searchStream$ = new BehaviorSubject<ISearchItem[]>([]);
  searchStream2$ = new BehaviorSubject<ISearchItem[]>([]);
  sysOtherListCode!: string;
  constructor(
    private appService : AppService,
    private responseService : ResponseService,
    public override mls: MultiLanguageService,
    private alertService : AlertService,
    private router : Router,
    private route: ActivatedRoute,
    private rd : Renderer2,
  ) {
    super(mls);
    
  }

  subsctiptions: Subscription[] = [];

  loading!: boolean;
  fileName!: string;
  dynamicForm: any
  shownItems :  EnumCoreButtonVNSCode[] = [
    EnumCoreButtonVNSCode.HEADER_DELETE,
    EnumCoreButtonVNSCode.HEADER_EXPORTEXEL,
    EnumCoreButtonVNSCode.HEADER_CREATE,
  ]
  // typeId! : number
  title = EnumTranslateKey.SELECT_DYNAMIC_FORM
  dynamicFormOptions$  =  new BehaviorSubject<ICoreDropdownOption[]>([]);
  dynamicFormGetByIdObject$ = new BehaviorSubject<any>(null);
  shownFrom : string = "name";
  dataForms:any
  dataViews:any
  tableName! : string;
  buttonItems: EnumCoreButtonVNSCode[] = [
    EnumCoreButtonVNSCode.NONE_HEADER_IMPORT_OPTION,
  ];
  columnForms: ICoreTableColumnItem[] = [
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_COMMON_ID,
      field: 'id',
      hidden: true,
      type: 'string',
      align: 'left',
      width: 200,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_DYNAMIC_FORM_CODE,
      field: 'code',
      type: 'string',
      align: 'left',
      width: 100,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_DYNAMIC_FORM_NAME,
      field: 'name',
      type: 'string',
      align: 'left',
      width: 300,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_DYNAMIC_FORM_IS_HAVE_FILE,
      field: 'isHaveFile',
      type: 'bool',
      width: 300,
      pipe: EnumCoreTablePipeType.BOOLEAN_TO_TRUE_FALSE,
      align: 'center',
      readonly:true,
      hideSearchBox:true,
      templateRef: this.checkboxTemplate,
    },

    
  ]
  columnViews: ICoreTableColumnItem[] = [
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_COMMON_ID,
      field: 'id',
      hidden: true,
      type: 'string',
      align: 'left',
      width: 200,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_DYNAMIC_FORM_MERGE_FIELD,
      field: 'code',
      type: 'string',
      align: 'left',
      width: 300,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_DYNAMIC_FORM_NOTE,
      field: 'name',
      type: 'string',
      align: 'left',
      width: 300,
      translate:true,
      pipe:EnumCoreTablePipeType.TRANSLATE
    },
  ]

  override ngOnInit(): void {
    this.subscriptions.push(
      this.mls.lang$.subscribe(x => this.lang = x)
    )
    this.subscriptions.push(
      this.searchStream$.pipe(
        debounceTime(500),
      ).subscribe(x => {
        if (x.length != 0) {
          const request = {
            searchRequest : x,
            sysOtherListCode : this.sysOtherListCode
          }

          this.appService.post(api.SEARCH_FOR_TABLE_LEFT_DYNAMIC_FORM,request).subscribe(x => {
            this.dataForms = x.body.innerBody
          })
        }


      })
    )!

    this.subscriptions.push(
      this.searchStream2$.pipe(
        debounceTime(500),
      ).subscribe(x => {
        if (x.length != 0) {
          const request = {
            searchRequest : x,
            sysOtherListCode : this.sysOtherListCode,
            language : this.lang
          }
          this.appService.post(api.SEARCH_FOR_TABLE_RIGHT_DYNAMIC_FORM,request).subscribe(x => {
            this.dataViews = x.body.innerBody
          })
        }


      })
    )!
  }

  browFile(): void {
    this.fileImport.nativeElement.value = null;
    this.fileImport.nativeElement.click();
  }




  onCorePageHeaderButtonClick(e: ICoreButtonVNS): void {
    console.log("e", e)
    switch (e.code) {
      case EnumCoreButtonVNSCode.HEADER_UPLOAD:
      if(this.selectedDatas.length == 0){
        this.alertService.warn(`${this.mls.trans(EnumTranslateKey.REPORT_SELECTED_NOT_NULL)}`, alertOptions);
      } else if(this.selectedDatas.length > 1){
        this.alertService.warn(`${this.mls.trans(EnumTranslateKey.DO_NOT_SELECT_MORE_ONE)}`, alertOptions);
      }

      this.fileImport.nativeElement.value = null;
      this.browFile();

      // this.handleInputFile()
      break;
      case EnumCoreButtonVNSCode.HEADER_DOWNLOAD:
      const request = {
        id : this.selectedDatas[0].id
      }
      this.subscriptions.push(
        this.appService.blobPost(api.GET_FILE_TEMPLATE_DYNAMIC_FORM,request).subscribe(x => {
          if (x.ok && x.status === 200) {
            let downloadLink = document.createElement("a");
            downloadLink.href = window.URL.createObjectURL(new Blob([x.body]))
            downloadLink.setAttribute("download", this.selectedDatas[0].code.toString() + '-' + this.selectedDatas[0].name.toString()+'.doc');
            document.body.appendChild(downloadLink);
            downloadLink.click();
          }
        })
      )
      break;
      default:
      break;
      // case EnumCoreButtonVNSCode.HEADER_EDIT:
      //   this.router.navigate(
      //     ['edit'],
      //     {
      //       relativeTo: this.route.parent, state: {typeId : this.typeId}
      //     }
      //   );
      // break;
    }
      
  }

    // Searching
  onSearching(e: ISearchItem[]): void {
    this.searchStream$.next(e);
  }
  onSearching2(e: ISearchItem[]): void {
    this.searchStream2$.next(e);
  }

  dynamicFormChange(event : any) {
    this.sysOtherListCode = event
    this.currentOption = this.dynamicFormOptions$.value.filter(x => x.value === event)
    switch(this.currentOption[0].value){
      case('PROFILE_INFORMATION_PRINTING_FORM'):
      this.tableName = 'EMPLOYEE';
      // this.typeId = 1
      break;
      case('CONTRACT_INFORMATION_PRINTING_FORM'):
      this.tableName = 'CONTRACT';
      // this.typeId = 2;
      break;
      case('WAGE_INFORMATION_PRINTING_FORM'):
      this.tableName = 'WAGE';
      // this.typeId = 3;
      break;
      case('DECISION_INFORMATION_PRINTING_FORM'):
      this.tableName = 'DECISION';
      // this.typeId = 4;
      break;
      case('TERMINATE_INFORMATION_PRINTING_FORM'):
      this.tableName = 'TERMINATE';
      // this.typeId = 5;
      break;
      case('COMMEND_INFORMATION_PRINTING_FORM'):
      this.tableName = 'COMMEND';
      // this.typeId = 6;
      break;
      case('CONTRACT_APPENDIX_PRINTING_FORM'):
      this.tableName = 'CONTRACT_APPENDIX';
      // this.typeId = 6;
      break;
      default:
      break;
    }
    this.subscriptions.push(
      this.appService.get(api.GET_OTHER_LIST_DYNAMIC_FORM + event).subscribe(x => {
        if(!!x){
          this.dataForms = x.body.innerBody
          this.appService.get(api.DYNAMIC_REPORT_GET_VIEW_LIST_DYNAMIC_FORM + this.tableName).subscribe(y => {
            if(!!y) {
              const req = {
                viewName: y.body.innerBody[0]
              }
              this.subsctiptions.push(
                this.appService.post(api.GET_COLUMN_LIST_DYNAMIC_FORM,req).subscribe((z : any) => {
                  if (z.ok && z.status === 200) {
                    const body: IFormatedResponse = z.body
                    if (body.statusCode === 200) {
                      this.dataViews = body.innerBody
                    }
                  }
                })
              )
            }
          })
          
        }
      })
    )
  }

  inputFile = async (e: any) => {
    const files = e.target.files;
    const file = files[0];
    this.fileName  = this.selectedDatas[0].code.toString() + '-' + this.selectedDatas[0].name.toString() + '.doc';
    const blob = new Blob([file]);
    blobToBase64(blob).then((base64: any) => {
      const request = {
        fileName : this.fileName,
        base64 : base64
      }
      this.subscriptions.push(
        this.appService.post(api.REPLACE_FILE_DYNAMIC_WITH_NAME,request).subscribe(x => {
          if(x.ok && x.status === 200 && x.body.statusCode === 200){
            this.appService.get(api.GET_OTHER_LIST_DYNAMIC_FORM + this.sysOtherListCode).subscribe(x => {
              if(x.ok && x.status === 200 && x.body.statusCode === 200){
                this.dataForms = x.body.innerBody
              }
            })
          }
        })
      )
    })
  }

  onRowClickForms(event : any){

  }
  onRowClickViews(event : any){

  }


  onSelectedDataChangeForms(event : any) {
    this.selectedDatas = event
  }

  onSelectedIdsChangeForms(event : any) {
    this.selectedViews = event
  }
  onSelectedIdsChangeViews(event : any) {

  }
  onSelectedDataChangeViews(event : any) {

  }

  ngAfterViewInit(): void {

    const request : string[] = [ // 0961618993
      "PROFILE_INFORMATION_PRINTING_FORM",
      "DECISION_INFORMATION_PRINTING_FORM",
      "CONTRACT_INFORMATION_PRINTING_FORM",
      "WAGE_INFORMATION_PRINTING_FORM",
    ]
    this.columnForms.filter(c => c.field === 'isHaveFile')[0].templateRef = this.isHaveFile;
    setTimeout(() => {
      this.subsctiptions.push(
        this.appService.get(api.SYS_OTHERLIST_GETOTHERLISTBYTYPE_MULTIPLE).subscribe(x => {
          if(!!x){
            this.dynamicFormOptions$.next(x.body.innerBody)
          }
        })
      )

      this.subscriptions.push(

      )
    })
  }

  onButtonClick(event : any){

  }
}
