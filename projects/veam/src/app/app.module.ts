import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, NgModule, isDevMode } from '@angular/core';
import {
  CommonModule,
  LocationStrategy,
  PathLocationStrategy,
} from '@angular/common';
import { HttpClientModule as HttpModule } from '@angular/common/http';
import { ExtraOptions, Router, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ModalModule, BsModalService } from 'ngx-bootstrap/modal';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutes } from './app.routing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Error404Module } from './main/errors/404/error-404.module';
import { AppLayoutModule } from './layout/applayout/applayout.module';

import { AppComponent } from './app.component';

import { LoginModule } from './auth/login/login.module';
import { ServiceWorkerModule } from '@angular/service-worker';

import { AppInitializationService, FullscreenModalLoaderComponent, AuthService, RequestCache, RequestCacheWithMap, httpInterceptorProviders, AlertComponent, AnimatedTextComponent, ThreedotsComponent } from 'ngx-histaff-alpha';

export function appInitialize(
  appInitializationService: AppInitializationService
) {
  return () => appInitializationService.appInitialize();
}

const extraOptions: ExtraOptions = {
  scrollPositionRestoration: 'enabled',
  anchorScrolling: 'enabled',
  scrollOffset: [0, 155], // 155 can vary
};

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    CommonModule,
    ModalModule,
    RouterModule.forRoot(AppRoutes, extraOptions),
    FormsModule,
    ReactiveFormsModule,
    AlertComponent,
    AnimatedTextComponent,
    ThreedotsComponent,
    FullscreenModalLoaderComponent,
    HttpModule,
    // Common Module
    Error404Module,
    AppLayoutModule,
    // ApplayoutTestModule,
    LoginModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    })
  ],
  declarations: [
    AppComponent,
  ],
  providers: [
    AuthService,
    BsModalService,
    {
      provide: APP_INITIALIZER,
      useFactory: appInitialize,
      deps: [AppInitializationService],
      multi: true,
    },
    { provide: LocationStrategy, useClass: PathLocationStrategy },
    { provide: RequestCache, useClass: RequestCacheWithMap },
    // { provide: ErrorHandler, useClass: AppErrorHandler },
    httpInterceptorProviders,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(router: Router) {
    const replacer = (key: string, value: any) =>
      typeof value === 'function' ? value.name : value;
    console.log('Routes: ', JSON.stringify(router.config, replacer, 2));
  }
}
