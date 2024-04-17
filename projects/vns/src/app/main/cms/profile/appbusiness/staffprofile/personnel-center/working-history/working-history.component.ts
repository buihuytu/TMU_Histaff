import { Component, OnInit } from '@angular/core';
import { PersonnelCenterService } from '../personnel-center.service';
import { EnumTranslateKey } from 'alpha-global-constants';

@Component({
  selector: 'app-working-history',
  templateUrl: './working-history.component.html',
  styleUrls: ['./working-history.component.scss']
})
export class WorkingHistoryComponent implements OnInit {

  headers: EnumTranslateKey[] = [
    EnumTranslateKey.UI_WORKING_HISTORY_TAB_INSIDE_COMPANY,
    EnumTranslateKey.UI_WORKING_HISTORY_TAB_OUTSIDE_COMPANY,
  ]

  constructor(
    private personnelCenterService: PersonnelCenterService
  ) { }

  ngOnInit(): void {
    this.personnelCenterService.leftMenuActiveItemIndex = 1
    this.personnelCenterService.tabActiveIndex = 0
    this.personnelCenterService.tabActiveHeader = this.headers[0]    
  }

  onCoreTabsHedaerClick(e: any): void {
    this.personnelCenterService.tabActiveIndex = e.index
    this.personnelCenterService.tabActiveHeader = e.header
  }

}
