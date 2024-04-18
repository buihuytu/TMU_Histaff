import { Component, OnInit } from "@angular/core"
import { EnumTranslateKey } from 'alpha-global-constants'
import { PersonnelCenterService } from "../personnel-center.service"

@Component({
  selector: 'app-contract',
  templateUrl: './contract.component.html',
  styleUrls: ['./contract.component.scss']
})
export class ContractComponent implements OnInit{

  headers: EnumTranslateKey[] = [
    EnumTranslateKey.UI_PERSONNEL_CENTER_TAB_CONTRACTINFO,
    EnumTranslateKey.UI_PERSONNEL_CENTER_TAB_CONTRACTAPPENDIX,
  ]
  constructor(
    private personnelCenterService: PersonnelCenterService
  ) { }
  
  onCoreTabsHedaerClick(e: any): void {
    this.personnelCenterService.tabActiveIndex = e.index
    this.personnelCenterService.tabActiveHeader = e.header
  }
  ngOnInit(): void {
    this.personnelCenterService.leftMenuActiveItemIndex = 3
    this.personnelCenterService.tabActiveIndex = 0
    this.personnelCenterService.tabActiveHeader = this.headers[0]    
  }
}
