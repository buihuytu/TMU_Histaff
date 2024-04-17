import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';

import { MultiLanguageService } from '../services/multi-language.service';
import { IFormatedResponse } from '../interfaces/IFormatedResponse';

@Injectable({
  providedIn: 'root'
})
export class MlsResolver implements Resolve<boolean> {

  constructor(private mls: MultiLanguageService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {

    if (!!this.mls.data$) return of(true)

    return new Observable<boolean>(observer => {
      this.mls.readAll().subscribe(x => {
        const body: IFormatedResponse = x.body
        if (body.statusCode === 200) {
          console.log("Language data has been loaded. Navigting to the caller...")
          this.mls.data$.next(body.innerBody);
          observer.next(true);
        }
      })
    })

  }
}
