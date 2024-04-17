import { Component, OnInit } from '@angular/core';
import { EnumTranslateKey } from 'alpha-global-constants';

@Component({
  selector: 'app-locationlist',
  templateUrl: './locationlist.component.html',
  styleUrls: ['./locationlist.component.scss']
})
export class LocationlistComponent implements OnInit {
  title = EnumTranslateKey.UI_COMPONENT_TITLE_STAFF_PROFILE
  tabHeaders: string[] = [
    "Tỉnh thành", "Quận huyện", "Xã phường",
  ]
  constructor() { }

  ngOnInit(): void {
  }
}
