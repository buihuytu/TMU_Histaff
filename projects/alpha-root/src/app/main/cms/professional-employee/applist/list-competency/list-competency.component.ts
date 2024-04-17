import { CommonModule } from '@angular/common';
import { AfterViewInit, Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EnumTranslateKey } from 'alpha-global-constants';
import { CorePageListComponent, CorePageHeaderComponent, CoreCompositionComponent, CoreTabsComponent, BaseComponent, MultiLanguageService, CoreButtonGroupService, EnumCoreButtonVNSCode } from 'ngx-histaff-alpha';
import { BehaviorSubject } from 'rxjs';
import { AspectEditComponent } from './aspect/aspect-edit/aspect-edit.component';
import { AspectComponent } from './aspect/aspect.component';
import { CompetencyDictEditComponent } from './competency-dict/competency-dict-edit/competency-dict-edit.component';
import { CompetencyDictComponent } from './competency-dict/competency-dict.component';
import { CompetencyComponent } from './competency/competency.component';
import { GroupCompetencyEditComponent } from './group-competency/group-competency-edit/group-competency-edit.component';
import { GroupCompetencyComponent } from './group-competency/group-competency.component';
@Component({
  selector: 'app-list-competency',
  standalone: true,
  imports: [
    RouterModule,
    CorePageListComponent,
    CommonModule,
    CorePageHeaderComponent,
    CoreCompositionComponent,
    CoreTabsComponent,
    GroupCompetencyComponent,
    CompetencyDictComponent,
    CompetencyComponent,
    AspectComponent,
    GroupCompetencyEditComponent,
    CompetencyDictEditComponent,
    AspectEditComponent
  ],
  templateUrl: './list-competency.component.html',
  styleUrl: './list-competency.component.scss'
})
export class ListCompetencyComponent extends BaseComponent implements AfterViewInit {
  title: any = EnumTranslateKey.UI_COMPONENT_TITLE_HU_LIST_COMPETENCY;

  headers: EnumTranslateKey[] = [
    EnumTranslateKey.UI_COMPONENT_TITLE_HU_LIST_COMPETENCY_GROUP,
    EnumTranslateKey.UI_COMPONENT_TITLE_HU_LIST_COMPETENCY_COMPETENCY,
    EnumTranslateKey.UI_COMPONENT_TITLE_HU_LIST_COMPETENCY_ASPECT,
    EnumTranslateKey.UI_COMPONENT_TITLE_HU_LIST_COMPETENCY_DICTIONARY,

  ]

  coreTabsHeight: any;
  onCoreTabsHeaderClick($event: Event) {

  }
  constructor(
    public override mls: MultiLanguageService,
    private coreButtonGroupService: CoreButtonGroupService,) {
    super(mls);
  }
  ngAfterViewInit() {
    setTimeout(() => {
      this.coreButtonGroupService.instances.push({
        instanceNumber: new Date().getTime(),
        mustBeHidden$: new BehaviorSubject<EnumCoreButtonVNSCode[]>([]),
      });
    })
  }
}
