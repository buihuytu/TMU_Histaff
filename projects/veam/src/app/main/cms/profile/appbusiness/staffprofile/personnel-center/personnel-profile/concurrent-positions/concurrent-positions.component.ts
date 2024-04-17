import { Component, ViewEncapsulation, OnInit, AfterViewInit, ViewChild, ElementRef, TemplateRef } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { api, EnumTranslateKey } from 'alpha-global-constants';
import { CoreConfirmDialogComponent, BaseComponent, ICorePageListApiDefinition, ICorePageListCRUD, ICoreTableColumnItem, EnumCoreTablePipeType, ICorePageListEditRouting, MultiLanguageService, LayoutService, AlertService, RoutingService, ICoreButtonVNS, EnumCoreButtonVNSCode, alertOptions } from "ngx-histaff-alpha";
import { BehaviorSubject } from "rxjs";
import { PersonnelCenterService } from "../../personnel-center.service";


@Component({
  selector: 'app-concurrent-positions',
  templateUrl: './concurrent-positions.component.html',
  styleUrls: ['./concurrent-positions.component.scss'],
  encapsulation : ViewEncapsulation.Emulated,
  providers : [CoreConfirmDialogComponent]
})
export class ConcurrentPositionsComponent extends BaseComponent implements OnInit,AfterViewInit {

  @ViewChild('container') container!: ElementRef;
  apiDefinition: ICorePageListApiDefinition = {
    queryListRelativePath: api.HU_CONCURRENTLY_QUERRY_LIST,
  }

  avatarTemplate!: TemplateRef<any>;
  // USER TABLE IS THE ONLY TABLE WHICH HAS ID OF TYPE STRING. ALL THE OTHERS MUST HAVE ID OF TYPE NUMBER (bigint/long)
  crud: ICorePageListCRUD = {
    deleteIds: api.HU_CONCURRENTLY_DELETE_IDS,
    toggleApproveIds: api.HU_CONCURRENTLY_APPROVE,
  }
  title = EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_HU_CONCURRENTLY
  outerParam$ = new BehaviorSubject<any>(null);

  columns: ICoreTableColumnItem[] = [
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_COMMON_ID,
      field: 'id',
      hidden: true,
      type: 'string',
      align: 'left',
      width: 0,
    },
    // {
    //   caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_HU_CONCURRENTLY_STATUS,
    //   field: 'isActive',
    //   type: 'string',
    //   align: 'left',
    //   width: 200
    // },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_HU_CONCURRENTLY_ORG_NAME,
      field: 'orgName',
      type: 'string',
      align: 'left',
      width: 250
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_HU_CONCURRENTLY_POSTION_TITLE,
      field: 'positionTitle',
      type: 'string',
      align: 'left',
      width: 250
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_HU_CONCURRENTLY_POSTION_POLITICAL_NAME,
      field: 'positionPoliticalName',
      type: 'string',
      align: 'left',
      width: 200
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_HU_CONCURRENTLY_DECISION_NO,
      field: 'decisionNumber',
      type: 'string',
      align: 'left',
      width: 200
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_HU_CONCURRENTLY_EFFECTIVE_DATE,
      field: 'effectiveDate',
      type: 'string',
      align: 'left',
      width: 200,
      pipe: EnumCoreTablePipeType.DATE

    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_HU_CONCURRENTLY_EXPIRATION_DATE,
      field: 'expirationDate',
      type: 'date',
      align: 'left',
      width: 200,
      pipe: EnumCoreTablePipeType.DATE
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_HU_CONCURRENTLY_STATUS,
      field: 'status',
      type: 'string',
      align: 'left',
      width: 200,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_HU_CONCURRENTLY_SIGNING_DATE,
      field: 'signingDate',
      type: 'date',
      align: 'left',
      width: 200,
      pipe: EnumCoreTablePipeType.DATE,
    },
    {
      caption: EnumTranslateKey.UI_ENTITY_FIELD_CAPTION_HU_CONCURRENTLY_SIGNING_POSITION_EMPLOYEE,
      field: 'signingPositionName',
      type: 'string',
      align: 'center',
      width: 200,
    },
  ]

  editRoute: ICorePageListEditRouting = {
    auxiliary: 'popupAux'
  }
  selectedData: any;
  corePageListInstanceNumber!: number;
  selfResolveCorePageHeaderButtonClick: boolean = false;
  /* End Properties being passed to core-page-type-a */

  constructor(
    public override mls: MultiLanguageService,
    public personnelCenterService: PersonnelCenterService,
    public layoutService: LayoutService,
    public alertService: AlertService,
    public router: Router,
    private route: ActivatedRoute,
    // private coreButtonGroupService : CoreButtonGroupService,
    // private dialogService : DialogService,
    // private coreConfirmDialogComponent : CoreConfirmDialogComponent
    private routingService : RoutingService
  ) {
    super(mls)
    this.corePageListInstanceNumber = new Date().getTime();
  }

  override ngOnInit(): void {
    
    this.subscriptions.push(
      this.mls.lang$.subscribe(x => this.lang = x)
    )
    this.subscriptions.push(
      this.personnelCenterService.employee$.subscribe(x => {
        if (this.outerParam$.value === null) {
          this.outerParam$.next({
            employeeId: x?.id
          })
        } else {
          this.outerParam$.next({
            ...this.outerParam$.value,
            employeeId: x?.id
          })
        }
      }))

      
  }

  onCorePageHeaderButtonClick(e: ICoreButtonVNS) {
    //console.log("StaffProfileComponent onCorePageHeaderButtonClick", e)
    switch (e.code) {
        case EnumCoreButtonVNSCode.HEADER_COPY:
          if(this.selectedData.length > 1){
            this.alertService.error(`${this.mls.trans(EnumTranslateKey.NOT_SELECTED_MORE_THAN_ONE_ROW_FOR_BUTTON_COPY_DATA)}`, alertOptions)
            return;
          }
          this.router.navigate(
            [
              {
                outlets: {
                  corePageListAux: [
                    btoa('0'),
                    { listInstance: this.corePageListInstanceNumber },
                  ],
                },
              },
            ],
            {
              relativeTo: this.route, state: { selectedData: this.selectedData }
            }
          );
        break;
        case EnumCoreButtonVNSCode.HEADER_EDIT:
            debugger
            if(this.selfResolveCorePageHeaderButtonClick){
              this.alertService.warn(`${this.mls.trans(EnumTranslateKey.DATA_FROM_WORKING_NOT_EDIT)}`, alertOptions)
            }
            return
        case EnumCoreButtonVNSCode.HEADER_CREATE:
          console.log("run into here");
          
          break;
      default:
        break;
    }
  }
  onSelectedDataChange(e: any[]) {
    console.log("onSelectedDataChange", e);
    this.selectedData = e;
    this.selectedData.forEach((x : any) => {
      if(x.isFromWorking == true){
        this.selfResolveCorePageHeaderButtonClick = true
      }else {
        this.selfResolveCorePageHeaderButtonClick = false
      }
      return
    })
    // setTimeout(() => {
    //   if (e.length > 1) {
    //     this.coreButtonGroupService.instances[0].mustBeHidden$.next([
    //       EnumCoreButtonVNSCode.HEADER_EDIT,
    //       EnumCoreButtonVNSCode.HEADER_LIQUIDATE_CONTRACT
    //     ])
        
        
    //   } else if(e.length == 1) {
    //     if(e[0].isFromWorking == true) {
    //       this.coreButtonGroupService.instances[0].mustBeHidden$.next([
    //         EnumCoreButtonVNSCode.HEADER_DELETE,
    //         EnumCoreButtonVNSCode.HEADER_EDIT,
    //         EnumCoreButtonVNSCode.HEADER_APPROVE,
    //         EnumCoreButtonVNSCode.HEADER_PENDING_APPROVE
    //       ])
    //     } else {
    //       this.coreButtonGroupService.instances[0].mustBeHidden$.next([])
    //     }
    //   }
       
      
    // })
  }

  // rowDoubleClick(event : any) {
  //   if(event.isFromWorking == true) {
  //     this.selfResolveCorePageHeaderButtonClick = true;
  //     this.alertService.warn(`${this.mls.trans(EnumTranslateKey.DATA_FROM_WORKING_NOT_EDIT)}`, alertOptions)
  //   } else {
  //     this.selfResolveCorePageHeaderButtonClick = false;
  //   }
  // }
  // rowClick(event : any) {
  //   if(event.isFromWorking == true) {
  //     this.selfResolveCorePageHeaderButtonClick = true;
  //     this.alertService.warn(`${this.mls.trans(EnumTranslateKey.DATA_FROM_WORKING_NOT_EDIT)}`, alertOptions)
  //   } else {
  //     this.selfResolveCorePageHeaderButtonClick = false;
  //   }
  // }


  ngAfterViewInit(){
    setTimeout(() => {
      // if(window.innerWidth > 1600){
      //   this.container.nativeElement.style.setProperty(
      //     '--width', '1190px'
      //   );
      // }else{
      //   this.container.nativeElement.style.setProperty(
      //     '--width', '815px'
      //   );
      // }
      const personnelLeftMenu = Number(
        getComputedStyle(document.documentElement)
          .getPropertyValue('--personnel-left-menu')
          .replace('px', '')
      );
      
      const sizeLayoutBlockCellSpacing = Number(
        getComputedStyle(document.documentElement)
          .getPropertyValue('--size-layout-block-cell-spacing')
          .replace('px', '')
      );
      let contentContainerWidth = 0
      this.layoutService.contentContainerWidth$.subscribe(x => {
        if(!!x && x != 500){
          contentContainerWidth = x
          const width = contentContainerWidth - (personnelLeftMenu + sizeLayoutBlockCellSpacing * 6)
          this.container.nativeElement.style.setProperty(
                '--width', width + 'px'
          );
        }
        
      })
    },100);
  }



}
