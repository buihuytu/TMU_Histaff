import { Component } from '@angular/core';
import { EnumTranslateKey } from 'alpha-global-constants';
import { CoreButtonGroupService, CorePageListComponent } from 'ngx-histaff-alpha';

@Component({
  selector: 'app-header-button-dropdown-demo',
  standalone: true,
  imports: [
    CorePageListComponent
  ],
  templateUrl: './header-button-dropdown-demo.component.html',
  styleUrl: './header-button-dropdown-demo.component.scss'
})
export class HeaderButtonDropdownDemoComponent {
  title = EnumTranslateKey.UI_COMPONENT_TITLE_DEMO_ATTACHMENT;

  constructor(
    private coreButtonGroupService: CoreButtonGroupService
  ) {
    coreButtonGroupService.headerButtonPrintDropdownOptions$.next([
      {
        childCaptionCode: "childCaptionCode1",
        childCode: "childCode1",
        childIconWrapperClass: "childIconWrapperClass1",
        childIconClass: "childIconClass1"
      },
      {
        childCaptionCode: "childCaptionCode2",
        childCode: "childCode2",
        childIconWrapperClass: "childIconWrapperClass2",
        childIconClass: "childIconClass2"
      },
      {
        childCaptionCode: "childCaptionCode3",
        childCode: "childCode3",
        childIconWrapperClass: "childIconWrapperClass3",
        childIconClass: "childIconClass3"
      }
    ])
  }

  onCorePageHeaderButtonClick(event: any) {
    alert(event.code + " + " + event.childCodeClicked)
  }
}
