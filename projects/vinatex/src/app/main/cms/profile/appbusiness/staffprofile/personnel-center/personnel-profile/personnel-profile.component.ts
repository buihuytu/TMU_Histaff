import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router'

import { PersonnelCenterService } from '../personnel-center.service';
import { EnumTranslateKey } from 'alpha-global-constants';

@Component({
  selector: 'app-personnel-profile',
  templateUrl: './personnel-profile.component.html',
  styleUrls: ['./personnel-profile.component.scss']
})
export class PersonnelProfileComponent implements OnInit {
  headers: EnumTranslateKey[] = [
    EnumTranslateKey.UI_PERSONNEL_PROFILE_TAB_FROFILE_INFO,
    // EnumTranslateKey.UI_PERSONNEL_PROFILE_TAB_CONCURRENT,
    EnumTranslateKey.UI_PERSONNEL_PROFILE_TAB_PAPER,
  ]

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private elementRef : ElementRef,
    private personnelCenterService: PersonnelCenterService
  ) { }

  ngOnInit(): void {
    this.personnelCenterService.leftMenuActiveItemIndex = 0;
    this.personnelCenterService.tabActiveIndex = 0
    this.personnelCenterService.tabActiveHeader = this.headers[0]    
  }

  onCoreTabsHedaerClick(e: any): void {
    this.personnelCenterService.tabActiveIndex = e.index
    this.personnelCenterService.tabActiveHeader = e.header
  }

  ngAfterViewInit(): void {

    console.log(window.innerWidth);
    
    // let left = Number(
    //   getComputedStyle(document.documentElement)
    //     .getPropertyValue('--personnel-left-menu')
    //     .replace('px', '')
    // );

    // let right = 
    setTimeout(() => window.innerWidth > 1536 ? this.elementRef.nativeElement.style.setProperty('--profile-info', 1190 + 'px') : this.elementRef.nativeElement.style.setProperty('--profile-info', 815 + 'px'));
  }

}
