import { Component, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProfileRecruitmentCenterService } from '../profile-recruitment-center.service';
import { EnumTranslateKey } from 'alpha-global-constants';

@Component({
  selector: 'app-recruitment-profile',
  standalone: false,
  templateUrl: './recruitment-profile.component.html',
  styleUrl: './recruitment-profile.component.scss'
})
export class RecruitmentProfileComponent {
  headers: EnumTranslateKey[] = [
    EnumTranslateKey.UI_PERSONNEL_PROFILE_TAB_FROFILE_INFO,
  ]

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private elementRef : ElementRef,
    private profileRecruitmentCenterService: ProfileRecruitmentCenterService
  ) { }

  ngOnInit(): void {
    this.profileRecruitmentCenterService.leftMenuActiveItemIndex = 0;
    this.profileRecruitmentCenterService.tabActiveIndex = 0
    this.profileRecruitmentCenterService.tabActiveHeader = this.headers[0]    
  }

  onCoreTabsHedaerClick(e: any): void {
    this.profileRecruitmentCenterService.tabActiveIndex = e.index
    this.profileRecruitmentCenterService.tabActiveHeader = e.header
  }

  ngAfterViewInit(): void {

    console.log(window.innerWidth);
    
    setTimeout(() => window.innerWidth > 1536 ? this.elementRef.nativeElement.style.setProperty('--profile-info', 1190 + 'px') : this.elementRef.nativeElement.style.setProperty('--profile-info', 815 + 'px'));
  }
}
