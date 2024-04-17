import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ProfileInfoService } from './profile-info.service';
import { ProfileRecruitmentCenterService } from '../../profile-recruitment-center.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ICoreAccordionItem, CorePageEditService, LayoutService, EnumProfileInfoSector } from 'ngx-histaff-alpha';

@Component({
  selector: 'app-profile-info',
  standalone: false,
  templateUrl: './profile-info.component.html',
  styleUrl: './profile-info.component.scss'
})
export class ProfileInfoComponent implements OnInit {
  @ViewChild('container')container! : ElementRef
  sectors!: ICoreAccordionItem[];
  tabHeight!:number;
  constructor(
    private router: Router, 
    private route: ActivatedRoute,
    private profileRecruitmentCenterService: ProfileRecruitmentCenterService,
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
        entityId = this.profileRecruitmentCenterService.candidate$.value.id;
        break;
      default:
        entityId = this.profileRecruitmentCenterService.candidateCv$.value.id
        break;
    }
    this.router.navigate(
      [
        {
          outlets: {
            candidateProfileAux: [e.editPath, btoa(entityId.toString())],
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
