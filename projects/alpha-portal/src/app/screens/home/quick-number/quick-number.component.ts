import { Component, Input } from '@angular/core';
import { EnumTranslateKey } from 'alpha-global-constants';
import { BaseComponent, MultiLanguageService, LayoutService } from 'ngx-histaff-alpha';

@Component({
  selector: 'app-quick-number',
  templateUrl: './quick-number.component.html',
  styleUrl: './quick-number.component.scss'
})
export class QuickNumberComponent extends BaseComponent {
  @Input() cardBackgroundColor!: string;
  @Input() circleBacgroundColor!: string;
  @Input() iconColor!: string;
  @Input() iconPath!: string;
  @Input() cardHeight!: number;
  @Input() circleSize!: number;
  @Input() value!: number;
  @Input() caption!: EnumTranslateKey;

  constructor(
    public override mls: MultiLanguageService,
    public layoutService: LayoutService
    ) {
      super(mls)
  }

}
