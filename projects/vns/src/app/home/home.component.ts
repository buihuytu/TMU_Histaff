import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EnumTranslateKey } from 'alpha-global-constants';
import { AppConfigService } from 'ngx-histaff-alpha';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit {

  title: EnumTranslateKey = EnumTranslateKey.UI_COMMON_EMPTY_STRING;

  logo!: string;
  homeBg!: string;

  constructor(
    private router: Router,
    private appConfigService: AppConfigService
    ) { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    //setTimeout(()=> this.router.navigateByUrl("/cms/organize/orgchart-tree"), 2000)
    setTimeout(() => {
      this.homeBg = this.appConfigService.HOME_BACKGROUND_IMAGE;
    })
  }

}
