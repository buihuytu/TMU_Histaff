import { Component, OnInit } from '@angular/core';
import { PersonnelCenterService } from '../personnel-center.service';
@Component({
  selector: 'app-concurrent',
  templateUrl: './concurrent.component.html',
  styleUrls: ['./concurrent.component.scss']
})
export class ConcurrentComponent implements OnInit {

  constructor(private personnelCenterService: PersonnelCenterService) { }

  ngOnInit(): void {
    this.personnelCenterService.leftMenuActiveItemIndex = 7
  }

}
