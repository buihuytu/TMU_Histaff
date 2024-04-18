import { AfterViewInit, Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { EnumTranslateKey } from 'alpha-global-constants';
import { BaseComponent, MultiLanguageService, OrganizationService, LayoutService, AppService, RecursiveService, RandomAvatarService, AlertService, FileService, ICoreButtonVNS, EnumCoreButtonVNSCode, IFormatedResponse } from 'ngx-histaff-alpha';
import { PersonnelCenterService } from '../../profile/appbusiness/staffprofile/personnel-center/personnel-center.service';
import { Router } from '@angular/router';


declare let html2canvas: any;

export interface IOrgchartHeaderMenuItem {
  id: string;
  title: string;
  icon?: string;
  pictureUri?: string;
  pictureBase64?: string;
  hidden?: boolean;
  url?: string;
  classes?: string;
  exactMatch?: boolean;
  externalUrl?: boolean;
  function?: Function;
  badge?: {
    title?: string;
    translate?: string;
    bg?: string;
    fg?: string;
  };
  parentId?: string;
  children?: IOrgchartHeaderMenuItem[];
  path?: string;
  level?: number;
}

@Component({
  selector: 'app-orgchart',
  templateUrl: './orgchart.component.html',
  styleUrls: ['./orgchart.component.scss']
})
export class OrgchartComponent extends BaseComponent implements OnInit, AfterViewInit {


  @ViewChild('dropdown') dropdown!: ElementRef;

  title: EnumTranslateKey = EnumTranslateKey.UI_COMPONENT_TITLE_ORGCHARTTREE;

  loading: boolean = true;
  linearItems!: any[];
  nestedItems!: any[];
  defaultAvatar!: string;

  width!: number;
  height!: number;
  printArea!: ElementRef;

  showSettings!: boolean;
  showTdvs!: boolean;
  showMasters!: boolean;
  showInterims!: boolean;

  showDissolved!: boolean;

  compactMode!: boolean;

  listenerFn!: () => void;

  constructor(
    public override mls: MultiLanguageService,
    private organizationService: OrganizationService,
    private layoutService: LayoutService,
    private appService: AppService,
    private recursiveService: RecursiveService,
    private ras: RandomAvatarService,
    private renderer: Renderer2,
    private router: Router,
    private personnelCenterService: PersonnelCenterService,
    private alertService: AlertService,
    private fileService: FileService
  ) {
    super(mls);
  }

  override ngOnInit(): void {
    this.subscriptions.push(
      this.mls.lang$.subscribe(x => this.lang = x)
    )
    this.subscriptions.push(
      this.layoutService.contentContainerWidth$.subscribe(x => this.width = x - this.layoutService.basicSpacing * 1)
    )
    this.subscriptions.push(
      this.organizationService.orgTreeDataWithPositions$.subscribe(x => {
        this.nestedItems = x;
        if (!!x.length) this.loading = false;
      })
    )
    this.subscriptions.push(
      this.layoutService.contentContainerHeight$.subscribe(x => this.height = x - this.layoutService.corePageHeaderHeight - this.layoutService.basicSpacing * 2)
    )
    this.compactModeDetect();
  }

  compactModeDetect(): void {
    this.compactMode = !this.showTdvs && !this.showMasters && !this.showInterims;
  }

  onCorePageHedearButtonClick(e: ICoreButtonVNS): void {
    switch (e.code) {
      case EnumCoreButtonVNSCode.HEADER_PRINT:

        this.loading = true;

        setTimeout(() => {
          const printArea = this.printArea.nativeElement;

          html2canvas(printArea, { scale: 1, dpi: 1028 }).then((canvas: any) => {
            this.loading = false;

            canvas.toBlob(function (blob: any) {
              var reader = new FileReader();
              reader.readAsDataURL(blob);
              reader.onloadend = function () {
                let base64data = reader.result;
                var printWindow = window.open('', '', 'height=400,width=800');
                printWindow!.document.write('<html><head><title>DIV Contents</title>');
                printWindow!.document.write('<link rel="stylesheet" href="./orgchart.component.scss" />');
                printWindow!.document.write('<link rel="stylesheet" href="./core-orgchartflex.component.css" />');
                printWindow!.document.write('</head><body >');
                printWindow!.document.write(`<img src="${base64data}" />`);
                printWindow!.document.write('</body></html>');
                printWindow!.document.close();
                printWindow!.print
              }
            });


          })

        })

        break;
      default:
        console.log("OrgchartComponent onCorePageHedearButtonClick", e.code)
        break;
    }
  }

  toggleShowSettings(): void {
    this.showSettings = !this.showSettings
  }

  onPrintAreaRendered(e: ElementRef) {
    this.printArea = e;
  }

  ngAfterViewInit(): void {
    this.listenerFn = this.renderer.listen('window', 'click', (e: Event) => {
      if (this.dropdown && !!!this.dropdown.nativeElement.contains(e.target)) {
        this.showSettings = false;
      }
    });

    setTimeout(() => {
      this.subscriptions.push(
        this.fileService.getBase64Image(this.ras.get()).subscribe(x => {
          if (x.ok && x.status === 200) {
            const body: IFormatedResponse = x.body
            if (body.statusCode === 200) {
              this.defaultAvatar = "data:image/png;base64," + body.innerBody.base64
            }
          }
        })
      )
    })

  }

  onPersonClick(employeeId: number) {
    this.personnelCenterService.employeeCv$.next(null)
    this.personnelCenterService.employee$.next(null)
    this.router.navigate([
      '/cms',
      'profile',
      'business',
      'staffprofile',
      btoa(employeeId.toString()),
      'personnel-profile'
    ])
  }

  override ngOnDestroy(): void {
    this.subscriptions.map(x => x?.unsubscribe())
    if (this.listenerFn) this.listenerFn();
  }

}
