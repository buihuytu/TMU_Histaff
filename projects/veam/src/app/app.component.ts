import { Component, OnDestroy, OnInit, ViewChild, TemplateRef } from "@angular/core";
import { AlertService, AppInitializationService, AuthService, alertOptions, noneAutoClosedAlertOptions } from "ngx-histaff-alpha";
import { Subscription } from "rxjs";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit, OnDestroy {

  @ViewChild('animatedText') animatedText!: TemplateRef<any>;

  authenticated!: boolean;

  navigation: any;
  isCorrectDomain!: boolean;
  initializing: boolean = true;

  subscriptions: Subscription[] = []

  constructor(
    private appInitializationService: AppInitializationService,
    private authService: AuthService,
    private alertService: AlertService,
  ) {
    this.subscriptions.push(
      this.appInitializationService.initializing$.subscribe(x => {
        console.log("App initialized...");
        this.initializing = x;
      })
    )
    this.subscriptions.push(
      this.authService.data$.subscribe(x => this.authenticated = !!x )
    )

  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.subscriptions.map(x => {
      if (x) x.unsubscribe()
    })
  }
 
}
