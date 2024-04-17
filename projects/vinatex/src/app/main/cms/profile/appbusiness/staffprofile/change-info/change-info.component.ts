import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService, AlertService, MultiLanguageService, ResponseService } from 'ngx-histaff-alpha';

@Component({
  selector: 'app-change-info',
  templateUrl: './change-info.component.html',
  styleUrls: ['./change-info.component.scss']
})
export class ChangeInfoComponent implements OnInit {

  
  constructor(
    private appService: AppService,
    private alertService: AlertService,
    private mls: MultiLanguageService,
    private router: Router,
    private responseService: ResponseService,
  ) {

  }

  ngOnInit(): void {
    
  }

}
