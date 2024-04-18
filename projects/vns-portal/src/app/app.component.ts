import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService, AppInitializationService, LayoutService, CheckForUpdateService } from 'ngx-histaff-alpha';
import { Subscription, debounceTime, fromEvent } from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];
  authenticated!: boolean;
  initializing!: boolean;

  resizeStream$ = fromEvent(window, 'resize');

  constructor(
    private authService: AuthService,
    private appInitializationService: AppInitializationService,
    private layoutService: LayoutService,
    private checkForUpdateService: CheckForUpdateService
  ) { }

  initScreen(innerWidth: number, innerHeight: number): void {

    const cellWidth = innerWidth / 16;
    const cellHeight = innerHeight / 12;

    this.layoutService.deviceWidth = innerWidth;
    this.layoutService.deviceHeight = innerHeight;
    this.layoutService.cellWidth = innerWidth / 16;
    this.layoutService.cellHeight = innerHeight / 12;
    this.layoutService.landscapeMode$.next(innerWidth > innerHeight);

    document.documentElement.style.setProperty('--device-width', `${innerWidth}px`)        
    document.documentElement.style.setProperty('--device-height', `${innerHeight}px`)        
    document.documentElement.style.setProperty('--cell-width', `${cellWidth}px`)        
    document.documentElement.style.setProperty('--cell-height', `${cellHeight}px`)        
  }

  ngOnInit(): void {
    this.subscriptions.push(
      this.authService.data$.subscribe(x => this.authenticated = !!x)
    )
    this.subscriptions.push(
      this.appInitializationService.initializing$.subscribe(x => this.initializing = x)
    )
    /* START: Subscription for resize event */
    this.subscriptions.push(
      this.resizeStream$.pipe(
        debounceTime(200)
      ).subscribe((e: any) => {

        this.initScreen(e.target.innerWidth, e.target.innerHeight);

      })
    )
    /* END: Subscription for resize event */
    this.initScreen(window.innerWidth, window.innerHeight);
  }

  ngOnDestroy(): void {
    this.subscriptions.map(x => x?.unsubscribe());
  }
}
