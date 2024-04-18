import { Component, OnInit, AfterViewInit } from "@angular/core";
import { FormGroup, FormControl, FormArray, FormBuilder } from "@angular/forms";
import { EnumTranslateKey, api } from 'alpha-global-constants';
import { StaffProfileComponent, WageComponent, EnumCoreButtonVNSCode, ICoreDropdownOption, EnumCoreOrgTreeaAccessorMode, IInOperator, defaultPaging, IPagination, ICoreTableColumnItem, AppService, ResponseService, AlertService, MultiLanguageService, ICoreButtonVNS, ICoreCommonParamKitEventEmitterData, IFormatedResponse, alertOptions } from "ngx-histaff-alpha";
import { BehaviorSubject, Subscription } from "rxjs";

@Component({
  selector: 'app-dynamic-report',
  templateUrl: './dynamic-report.component.html',
  styleUrls: ['./dynamic-report.component.scss'],
  providers: [
    StaffProfileComponent,
    WageComponent,
  ]
})
export class DynamicReportComponent implements OnInit,AfterViewInit {
  orgIds!: number[];
  title = EnumTranslateKey.UI_COMPONENT_TITLE_DYNAMIC_REPORT
  shownItems :  EnumCoreButtonVNSCode[] = [
    EnumCoreButtonVNSCode.HEADER_DELETE,
    EnumCoreButtonVNSCode.HEADER_EXPORTEXEL,
    EnumCoreButtonVNSCode.HEADER_CREATE,
  ]

  statusOptionsApi: api = api.HU_EMPLOYEE_CV_GET_EMPLOYEE_STATUS_LIST;
  // statusInclusionFor: string = 'workStatusId';
  statusInclusionForLabelKey: EnumTranslateKey = EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_DEMO_ATTACHMENT_STATUS_ID;
  colArrays : any[] = [];
  colArraysBinding : any[] = [];
  lang! : string
  colArraysSelected : any[] = [];
  reportNameToSave : any
  dynamicReportOptions$  =  new BehaviorSubject<ICoreDropdownOption[]>([]);
  dynamicReportGetByIdObject$ = new BehaviorSubject<any>(null);


  options: ICoreDropdownOption[] = [];
  conditionFilterOptions$ = new BehaviorSubject<ICoreDropdownOption[]>([]);
  conditionFilterGetByIdObject$ = new BehaviorSubject<any>(null);

  shownFrom : string = "viewName";
  shownFilterFrom : string = "text";
  dynamicReport: any;
  loading!: boolean;
  prefixTrans!: string;
  treeAccessorMode: EnumCoreOrgTreeaAccessorMode = EnumCoreOrgTreeaAccessorMode.CHECKED;
  checkingResetFlag!: boolean;

  innerBody! : any
  outerInOperators: IInOperator[] = [
    {
      field: 'orgId',
      values: this.orgIds || []
    }
  ]
  subsctiptions: Subscription[] = [];
  currentPage$ = new BehaviorSubject<number>(1);
  pageSize$ = new BehaviorSubject<number>(defaultPaging.take);
  pageCount!: number;
  innerBodyCount$ = new BehaviorSubject<number>(0);
  pagination$ = new BehaviorSubject<IPagination>({
    skip: 0,
    take: defaultPaging.take,
  });
  data : any = []
  columns: ICoreTableColumnItem[] = [
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_COMMON_ID,
      field: 'id',
      hidden: true,
      type: 'string',
      align: 'left',
      width: 200,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_DYNAMIC_REPORT_NAME,
      field: 'reportName',
      type: 'string',
      align: 'left',
      width: 1500,
    },
  ]
  dataSelected: any;
  dataChooseSelected: any;
  countFilter: any;
  buttonItems: EnumCoreButtonVNSCode[] = [
    EnumCoreButtonVNSCode.NONE_HEADER_SEARCH,
    // EnumCoreButtonVNSCode.HEADER_CALCULATE,
  ];
  reportSelected: any;
  filterColSelected: any;
  columnList!: { columnName: string; netType: string }[];
  queryForm: FormGroup = this.fb.group({
    logicalOperator: new FormControl(null),
      filters: new FormArray([])
  });
  heightCoreOrgTree!: number;
  filterFormJsonString!: string;
  filterString!: string;
  id!: number;
  selectedIds: string[] | number[] = [];
  workStatus: string[] = [];
  selectedDataChange: any;
  searchSelected: any;
  search: any;
  // filterStringInput: string;
  

  constructor(
    private staffProfileComponent : StaffProfileComponent,
    private wageComponent : WageComponent,
    private appService : AppService,
    private responseService : ResponseService,
    private alertService : AlertService,
    private mls: MultiLanguageService,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.subsctiptions.push(
      this.mls.lang$.subscribe(x => this.lang = x)
    )
    // this.queryForm = this.fb.group({
    //   id: new FormControl(null),
    //   dataset: new FormControl(""),
    //   columns: new FormArray([]),
    //   filters: new FormGroup({})
    // })

    console.log(window.innerHeight);
    if(window.innerHeight < 800){
      this.heightCoreOrgTree = 550
    }else if(window.innerHeight < 900){
      this.heightCoreOrgTree = 745
    }else{
      this.heightCoreOrgTree = 850
    }

    
    

  }

  onButtonClick(e: ICoreButtonVNS){
    if (e.code === EnumCoreButtonVNSCode.NONE_HEADER_SEARCH) {
      let eventFilterInOperator: IInOperator[] = []; 
      const periodIds: number[] = [];

      const currentOuterInOperators: IInOperator[] = JSON.parse(JSON.stringify(this.outerInOperators));


//--------------------------
      eventFilterInOperator=[
      {          
          field:"periodId",
          values:  periodIds          
      }
    ]
      // lọc những field không trùng với field
      const remainOuterInOperators = currentOuterInOperators.filter(x => !!!(x.field === "periodId" || x.field === "orgId"));       

      const newFilter = remainOuterInOperators.concat(eventFilterInOperator);

      // gán lại filter
      this.outerInOperators = this.outerInOperators.filter(x => !!(x.field === "orgId")).concat(newFilter);
    }
    // if(e.code === EnumCoreButtonVNSCode.HEADER_CALCULATE){
    //   this.calculate()
    // }
  }

  onParamKitValueChange(data: ICoreCommonParamKitEventEmitterData): void {
    this.workStatus = data.value
    
    
  }
  onOrgIdsChange(orgIds: number[]) {

    this.orgIds = orgIds  // array 
    this.outerInOperators = [
      {
        field: 'orgId',
        values: orgIds
      }
    ]
  }
  upItem(item : any){
    if(!this.dataSelected || this.colArrays.indexOf(item) == 0){
      return;
    }
    const fromIndex = this.colArrays.indexOf(item);
    const toIndex = fromIndex - 1;
    const element = this.colArrays.splice(fromIndex, 1)[0]; //delete item old index
    this.colArrays.splice(toIndex, 0, element);//insert item new index
    
  }
  upItemSelected(item : any){
    if(!this.dataChooseSelected || this.colArraysSelected.indexOf(item) == 0){
      return;
    }
    this.checkingResetFlag = !this.checkingResetFlag;
    const fromIndex = this.colArraysSelected.indexOf(item);
    const toIndex = fromIndex - 1;
    const element = this.colArraysSelected.splice(fromIndex, 1)[0]; //delete item old index
    this.colArraysSelected.splice(toIndex, 0, element);//insert item new index
    this.id = 0
  }
  superUpItemSelected(item : any){
    if(!this.dataChooseSelected || this.colArraysSelected.indexOf(item) == 0){
      return;
    }
    this.checkingResetFlag = !this.checkingResetFlag;
    const fromIndex = this.colArraysSelected.indexOf(item);
    const toIndex = 0;
    const element = this.colArraysSelected.splice(fromIndex, 1)[0]; //delete item old index
    this.colArraysSelected.splice(toIndex, 0, element);//insert item new index
    this.id = 0
  }
  downItem(item : any){
    if(!this.dataSelected || this.colArrays.indexOf(item) == this.colArrays.length - 1){
      return;
    }
    
    const fromIndex = this.colArrays.indexOf(item);
    const toIndex = fromIndex + 1;
    const element = this.colArrays.splice(fromIndex, 1)[0]; //delete item old index
    this.colArrays.splice(toIndex, 0, element); //insert item new index

  }
  downItemSelected(item : any){
    if(!this.dataChooseSelected || this.colArraysSelected.indexOf(item) == this.colArraysSelected.length - 1){
      return;
    }
    this.checkingResetFlag = !this.checkingResetFlag;
    const fromIndex = this.colArraysSelected.indexOf(item);
    const toIndex = fromIndex + 1;
    const element = this.colArraysSelected.splice(fromIndex, 1)[0]; //delete item old index
    console.log(this.colArraysSelected);
    this.colArraysSelected.splice(toIndex, 0, element); //insert item new index
    this.id = 0

  }
  superDownItemSelected(item : any){
    if(!this.dataChooseSelected || this.colArraysSelected.indexOf(item) == this.colArraysSelected.length - 1){
      return;
    }
    this.checkingResetFlag = !this.checkingResetFlag;
    const fromIndex = this.colArraysSelected.indexOf(item);
    const toIndex = this.colArraysSelected.length - 1;
    const element = this.colArraysSelected.splice(fromIndex, 1)[0]; //delete item old index
    console.log(this.colArraysSelected);
    this.colArraysSelected.splice(toIndex, 0, element); //insert item new index
    this.id = 0

  }
  rightItem(item : any){

    if(!this.dataSelected || this.colArrays.length == 0){
      return;
    }
    this.checkingResetFlag = !this.checkingResetFlag;

      item.actived = false
      
      
      this.colArraysSelected.push(item)
      
      this.colArrays = this.colArrays.filter(x => x != item)
      this.dataSelected = null
      this.id = 0
  }
  leftItem(item : any){

    

    if(this.colArraysSelected.length == 0 || !this.dataChooseSelected){
      return;
    }
    this.checkingResetFlag = !this.checkingResetFlag;
    this.colArrays.push(item)
    
    this.colArraysSelected = this.colArraysSelected.filter(x => x != item)
    // this.colArraysSelected[0].actived = true;
    // this.dataChooseSelected = this.colArraysSelected[0];
    item.actived = false;
    this.dataChooseSelected = null;
    this.id = 0
  }
  allRightItem(){
    if(this.colArrays.length == 0){
      return;
    }
    this.checkingResetFlag = !this.checkingResetFlag;
    this.dataChooseSelected = this.dataSelected;
    this.dataSelected = null
    this.colArraysSelected = [...this.colArraysSelected, ...this.colArrays];
    this.colArrays = []
    this.id = 0
  }
  allLeftItem(){
    if(this.colArraysSelected.length == 0){
      return;
    }
    this.checkingResetFlag = !this.checkingResetFlag;
    this.dataSelected = this.dataChooseSelected;
    this.dataChooseSelected = null;
    this.colArrays = [...this.colArrays, ...this.colArraysSelected.filter(x => !this.colArrays.includes(x))];
    this.colArraysSelected = [];
    this.id = 0
  }
  ngAfterViewInit(): void {
    this.subsctiptions.push(
      this.appService.get(api.DYNAMIC_REPORT_GET_VIEW_LIST).subscribe(x => {
        if (x.ok && x.status === 200) {
          const body: IFormatedResponse = x.body
          if (body.statusCode === 200) {
            // const options: ICoreDropdownOption[] = [];
              body.innerBody.map((get: any,index : number) => {
                this.options.push({
                  value: index,
                  text: get,
                });
              });
              let optionsBasic = [...this.options]
              console.log(this.options);
              optionsBasic = optionsBasic.map((x: any) => {
                switch(x.text){
                  case "API.Entities.REPORT_DATA_STAFF_PROFILE":
                    this.prefixTrans = 'UI_ENTITY_FIELD_CAPTION_STAFF_PROFILE_'
                    break;
                    
                  default:
                    break;
                }
                return { ...x, text: x.text };
              });
              
            this.dynamicReportOptions$.next(optionsBasic)
          }
        }
        this.loading = false;
      })
    )
    if(this.workStatus.length === 0){
      this.subsctiptions.push(
        this.appService.get(api.HU_EMPLOYEE_CV_GET_EMPLOYEE_STATUS_LIST).subscribe(x => {
          const filter = x.body.innerBody
          for (let i = 0; i < filter.length; i++) {
            let idFilter = filter[i].id.toString();
            this.workStatus.push(idFilter)
          }
        })
      )
    }
    
  }

  onCorePageHeaderButtonClick(e: ICoreButtonVNS): void {
    console.log("e", e)
    switch (e.code) {
      case EnumCoreButtonVNSCode.HEADER_SAVE:
        
        if(!this.reportNameToSave){
          this.alertService.warn(`${this.mls.trans(EnumTranslateKey.REPORT_NAME_NOT_NULL)}`, alertOptions);
          return;
        }
        if(this.colArraysSelected.length == 0){
          this.alertService.warn(`${this.mls.trans(EnumTranslateKey.REPORT_SELECTED_NOT_NULL)}`, alertOptions);
          return;
        }
        console.log(this.queryForm);
        // this.filterStringInput = this.filterString;
        // this.filterString = this.filterStringInput;
        const selectedColumns : any[] = []
        this.colArraysSelected.map(x => {
          selectedColumns.push(x.netType)
        })
        const request = {
          viewName : this.options.filter(x => x.value == this.dynamicReport)[0].text,
          form: JSON.stringify(this.queryForm.value),
          json : this.filterFormJsonString,
          expression : this.filterString,
          reportName : this.reportNameToSave,
          selectedColumns : selectedColumns.join(';'),
          prefixTrans : this.prefixTrans
        }
        this.appService.post(api.CREATE_DYNAMIC_REPORT, request).subscribe((rs : any) => {
          if(!!rs){
            this.appService.get(api.GET_ALL_REPORT_BY_VIEW_NAME + request.viewName).subscribe(x => {
              this.innerBody = x.body.innerBody
            })
          }
          
        })
        break;
      case EnumCoreButtonVNSCode.HEADER_DELETE:
        if(!this.selectedIds || this.selectedIds.length == 0){
          this.alertService.warn(`${this.mls.trans(EnumTranslateKey.HAVE_TO_TICK_ON_ROW_BEFORE_DELETE)}`, alertOptions);
          return;
        }
        // this.selectedIds.map(x => x.toString())
        const viewName = this.options.filter(x => x.value == this.dynamicReport)[0].text;
        const model = {ids : this.selectedIds}
        this.appService.post(api.DELETE_DYNAMIC_REPORT, model).subscribe((x : any) =>{
          if(!!x){
            this.appService.get(api.GET_ALL_REPORT_BY_VIEW_NAME + viewName).subscribe(y => {
              this.innerBody = y.body.innerBody
            })
          }
        })
        break;
        case EnumCoreButtonVNSCode.HEADER_EXPORTEXEL:
          if(!!this.selectedDataChange && this.selectedDataChange.length > 1){
            this.alertService.warn(`${this.mls.trans(EnumTranslateKey.DO_NOT_SELECT_MORE_ONE_TO_EXPORT)}`, alertOptions);
            return;
          }
          if(!!this.id && this.colArraysSelected.length == 0){
            this.alertService.warn(`${this.mls.trans(EnumTranslateKey.REPORT_SELECTED_NOT_NULL)}`, alertOptions);
            return;
          }
          // if(!this.selectedDataChange){
          //   this.alertService.warn(`${this.mls.trans(EnumTranslateKey.HAVE_TO_TICK_ON_ROW_BEFORE_EXPORT)}`, alertOptions);
          //   return;
          // }
          let colArrayChanged : any[] = []
          if(!this.id){
            for (let i = 0; i < this.colArraysSelected.length; i++) {
              const element = this.colArraysSelected[i].netType;
              colArrayChanged.push(element)
            }
          }
          
          const request1 = {
            id : this.id,
            workStatus : this.workStatus,
            orgIds : this.orgIds,
            colArrayChanged : colArrayChanged.join(';'),
            queryForm : JSON.stringify(this.queryForm.value),
            viewName : this.options.filter(x => x.value == this.dynamicReport)[0].text,
            reportName : this.reportNameToSave,
            prefixTrans : this.prefixTrans
          }
          
          if(!this.workStatus || this.workStatus.length == 0){
            this.alertService.warn(`${this.mls.trans(EnumTranslateKey.HAVE_TO_TICK_WORK_STATUS)}`, alertOptions);
            return;
          }
          this.appService.blobPost(api.GET_LIST_BY_CONDITION_TO_EXPORT,request1).subscribe(res => {
            if(!!res){
              const link = window.URL.createObjectURL(res.body);
              this.DownloadFile(link, !this.reportNameToSave ? 'Dynamic.xlsx' : (this.reportNameToSave.replace(/ /g, '-') + '.xlsx'));
            }
          })
          break;
      default:
        break;
    }
  }

  DownloadFile(url: any, fileName: string) {
    var link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
  receiveJsonValue(event : string){
    this.filterFormJsonString = event
    
  }

  receiveExpressionValue(event : string){
    this.filterString = event
  }

  dynamicReportChange(event : any){
    const req = {
      viewName: this.options.filter(x => x.value == event)[0].text
    }
    
    this.subsctiptions.push(
      this.appService.post(api.GET_COLUMN_LIST,req).subscribe((x : any) => {
        if (x.ok && x.status === 200) {
          const body: IFormatedResponse = x.body
          if (body.statusCode === 200) {
            body.innerBody.map((y:any) => {
              y.columnName = this.prefixTrans + y.columnName
            })
            setTimeout(() => {
              this.colArrays = body.innerBody;
              this.colArraysBinding = body.innerBody;
              this.colArrays.forEach(element => {
                element.name = this.mls.trans(element.columnName)
              });
              this.colArraysBinding.forEach(element => {
                element.name = this.mls.trans(element.columnName)
              });
              this.colArrays = this.sortByProperty(this.colArrays,'name')
              this.colArraysBinding = this.sortByProperty(this.colArraysBinding,'name')
            })
          }
        }
      })
    )
    
    this.subsctiptions.push(
      this.appService.get(api.GET_ALL_REPORT_BY_VIEW_NAME + req.viewName).subscribe(x => {
        this.innerBody = x.body.innerBody
      })
    )
  }
  sortByProperty(arr : any[], column : string) {
    // arr = arr.map(x => x.columnName)
    const collator = new Intl.Collator('vi', { sensitivity: 'base' });
  
    return arr.sort((a, b) => collator.compare(a[column], b[column]));
  }

  changeFilter(event : any){
    console.log(event);
  }
  onRowDoubleClick(event : any){

  }
  onSelectedIdsChange(event : any){
    this.selectedIds = event;
  }
  click(event : any,item : any){
    this.dataSelected = item
    item.actived = true;
    this.colArrays.map(x => {
      if(x != item){
        x.actived = false;
      }
    })
    
  }

  clickChoosed(event : any,item : any){
    this.dataChooseSelected = item
    console.log(this.colArraysSelected);
    item.actived = true;
    this.colArraysSelected.map(x => {
      if(x != item){
        x.actived = false;
      }
    })
  }

  sortField(event : any){
    console.log(event);
  }

  sortFieldSelected(event : any){
    console.log(event);
  }

  onSelectedDataChange(event : any){
    if(event.length == 0){
      return;
    }
    this.selectedDataChange = event
    this.id = this.selectedDataChange[0]?.id
    const form = this.createFormGroup(JSON.parse(this.selectedDataChange[0].form))
    this.queryForm = form
    if(!!this.selectedDataChange[0].selectedColumns){
      let nameSelected : any[] = this.selectedDataChange[0].selectedColumns.split(';')
      this.colArraysSelected = []
      let arrayFilter : any[] = Object.assign(this.colArraysBinding)
      nameSelected = nameSelected.map(x => this.prefixTrans + x)
      nameSelected.map(y => {
        this.colArraysBinding.map(x =>{
          if(x.columnName == y){
            this.colArraysSelected.push(x)
            arrayFilter = arrayFilter.filter(k => k != x)
          }
        })
      })
      this.colArrays = Object.assign(arrayFilter)
      this.reportNameToSave = this.selectedDataChange[0].reportName
    } else{
      this.colArraysSelected = []
    }
  }

  onRowClick(event : any){
    if(!!this.selectedDataChange && this.selectedDataChange.length > 0){
      return;
    }
    // this.id = event.id
    const form = this.createFormGroup(JSON.parse(event.form))
    this.queryForm = form
    if(!!event.selectedColumns){
      let nameSelected : any[] = event.selectedColumns.split(';')
      this.colArraysSelected = []
      let arrayFilter : any[] = Object.assign(this.colArraysBinding)
      nameSelected = nameSelected.map(x => this.prefixTrans + x)
      this.colArraysBinding.map(x =>{
        nameSelected.map(y => {
          if(x.columnName == y){
            this.colArraysSelected.push(x)
            arrayFilter = arrayFilter.filter(k => k != x)
          }
        })
      })
      this.colArrays = Object.assign(arrayFilter)
      this.reportNameToSave = event.reportName
    } else{
      this.colArraysSelected = []
    }
  }
  

  createFormGroup(data: any): FormGroup {
    const formGroup: FormGroup = this.fb.group({
      logicalOperator: [data.logicalOperator],
      filters: this.fb.array([]),
    });

    if (data.filters && data.filters.length > 0) {
      const filtersArray = formGroup.get('filters') as FormArray;
      data.filters.forEach((filter: any) => {
        
          if (filter.filters && filter.filters.length > 0) {
            filtersArray.push(this.createFormGroup(filter))
          }else{
            const filterGroup = this.fb.group({
              name: [filter.name],
              type: [filter.type],
              value: [filter.value],
              relationalOperator: [filter.relationalOperator],
            });
            filtersArray.push(filterGroup);
          }
      });
    }
    return formGroup;
  }

  onGetList(){
    
    if(!!this.dynamicReport && this.orgIds.length > 0){
      this.loading = true;
      
    }
  }

}
