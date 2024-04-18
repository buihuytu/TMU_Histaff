import { Component, OnInit } from "@angular/core";
import { EnumTranslateKey } from 'alpha-global-constants';
import { BaseComponent, MultiLanguageService } from "ngx-histaff-alpha";
import { map } from "rxjs";
import { PersonnelCenterService } from "../personnel-center.service";
import { TerminateService } from "./terminate.service";


@Component({
  selector: 'app-terminate',
  templateUrl: './terminate.component.html',
  styleUrls: ['./terminate.component.scss']
})
export class TerminateComponent extends BaseComponent implements OnInit {

  joinDate: EnumTranslateKey = EnumTranslateKey.UI_COMPONENT_LABEL_LEAVEJOB_JOIN_DATE;
  seniority: EnumTranslateKey = EnumTranslateKey.UI_COMPONENT_LABEL_LEAVEJOB_SENIORITY;
  dateStart: EnumTranslateKey = EnumTranslateKey.UI_COMPONENT_LABEL_LEAVEJOB_CONTRACT_DATESTART;
  dateEnd: EnumTranslateKey = EnumTranslateKey.UI_COMPONENT_LABEL_LEAVEJOB_CONTRACT_DATEEND;
  lastDate: EnumTranslateKey = EnumTranslateKey.UI_COMPONENT_LABEL_LEAVEJOB_LASTDATE; 
  effectDate: EnumTranslateKey = EnumTranslateKey.UI_COMPONENT_LABEL_LEAVEJOB_EFFECTDATE;

  headers: EnumTranslateKey = EnumTranslateKey.UI_PERSONNEL_MENU_ITEM_LEAVEJOB;
  members!: any[];

  employee!: any;
  employeeCv!: any;
  
  constructor(
    private terminateService: TerminateService,
    public override mls: MultiLanguageService,
    private personnelCenterService: PersonnelCenterService
  ) {
    super(mls);
  }

  override ngOnInit(): void {
    this.personnelCenterService.leftMenuActiveItemIndex = 8;
    this.personnelCenterService.tabActiveHeader = this.headers;

    this.mls.lang$.subscribe(x => this.lang = x);
    this.subscriptions.push(
      this.personnelCenterService.employee$.subscribe(x => {
        this.employee = x
        this.subscriptions.push(
          this.terminateService.getTerminateByEmployee(x.id)
            .pipe(
              map((members: any) => {
                return members.body.innerBody;
              })
            )
            .subscribe(response => {
              this.members = response;
            })
        )
      })
    )

  }

}
