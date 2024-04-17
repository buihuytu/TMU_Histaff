import { APP_INITIALIZER, NgModule, isDevMode } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './screens/login/login.component';
import { LayoutComponent } from './layout/layout.component';

import { ServiceWorkerModule } from '@angular/service-worker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AlertComponent, AppInitializationService, CoreConfirmDialogComponent, CoreNavigationTrackerComponent, FullscreenModalLoaderComponent, MapAvatarToServerPipe, NormalizeHumanNamePipe, TableCellPipe, TooltipDirective, TranslatePipe, httpInterceptorProviders } from 'ngx-histaff-alpha';
import { AuthProfileModule } from './components/auth-profile/auth-profile.module';
import { PageNotFoundComponent } from './screens/page-not-found/page-not-found.component';


export function appInitialize(
  appInitializationService: AppInitializationService
) {
  return () => appInitializationService.appInitialize();
}

@NgModule({
  declarations: [
    LoginComponent,
    LayoutComponent,
    AppComponent,
    PageNotFoundComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    RouterModule,
    ReactiveFormsModule,
    HttpClientModule,
    AlertComponent,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    }),
    CoreNavigationTrackerComponent,
    FullscreenModalLoaderComponent,
    TranslatePipe,
    TooltipDirective,
    CoreConfirmDialogComponent,
    MapAvatarToServerPipe,
    NormalizeHumanNamePipe,
    TableCellPipe,
    BrowserAnimationsModule,
    AuthProfileModule
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: appInitialize,
      deps: [AppInitializationService],
      multi: true,
    },
    httpInterceptorProviders,
    //provideClientHydration(),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
