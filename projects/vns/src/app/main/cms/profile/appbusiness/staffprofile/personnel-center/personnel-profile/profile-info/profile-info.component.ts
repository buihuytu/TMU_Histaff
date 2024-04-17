import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ICoreAccordionItem, CorePageEditService, LayoutService, EnumProfileInfoSector } from "ngx-histaff-alpha";
import { PersonnelCenterService } from "../../personnel-center.service";
import { ProfileInfoService } from "./profile-info.service";


@Component({
  selector: 'app-profile-info',
  templateUrl: './profile-info.component.html',
  styleUrls: ['./profile-info.component.scss']
})
export class ProfileInfoComponent implements OnInit {
  @ViewChild('container')container! : ElementRef
  sectors!: ICoreAccordionItem[];
  tabHeight!:number;
  constructor(
    private router: Router, private route: ActivatedRoute,
    private personnelCenterService: PersonnelCenterService,
    private profileInfoService: ProfileInfoService,
    private corePageEditService: CorePageEditService,
    private layoutService: LayoutService,
  ) {
    this.sectors = this.profileInfoService.sectors;
    console.log("this.sectors", this.sectors);

    // Tiến BA yêu cầu ẩn cái thông tin người giới thiệu
    // thì tôi sẽ lọc lại mảng
    this.sectors = this.sectors.filter(x => x.id !== "referrer");
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {

    console.log(window.innerWidth);    
    // let left = Number(
    //   getComputedStyle(document.documentElement)
    //     .getPropertyValue('--personnel-left-menu')
    //     .replace('px', '')
    // );

    // let right = 
    setTimeout(() => {
      // window.innerWidth > 1536 ? this.container.nativeElement.style.setProperty('--profile-info', 1190 + 'px') : this.container.nativeElement.style.setProperty('--profile-info', 815 + 'px')
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
        if(x != 500){
          contentContainerWidth = x
          const width = contentContainerWidth - (personnelLeftMenu + sizeLayoutBlockCellSpacing * 6)
          this.container.nativeElement.style.setProperty(
                '--profile-info', width + 'px'
          );
        }
        
      })
    });
    
  }

  onAccordionItemClick(e: ICoreAccordionItem): void {
  }

  onAccordionItemClickEdit(e: ICoreAccordionItem): void {
    this.corePageEditService.fromUrl = this.router.url;

    let entityId;
    switch (e.id) {
      case EnumProfileInfoSector.BASIC:
        entityId = this.personnelCenterService.employee$.value.id;
        break;
      default:
        entityId = this.personnelCenterService.employeeCv$.value.id
        break;
    }

    this.router.navigate(
      [
        {
          outlets: {
            personnelProfileAux: [e.editPath, btoa(entityId.toString())],
          },
        },
      ],
      { relativeTo: this.route.parent },
    );


  }
  
  getHeight(e:number){
    this.tabHeight =e;
  }
}
