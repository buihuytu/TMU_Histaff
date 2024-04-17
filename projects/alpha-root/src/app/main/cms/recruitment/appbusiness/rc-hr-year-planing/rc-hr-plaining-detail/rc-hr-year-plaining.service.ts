import { Injectable } from '@angular/core';
import { CommonHttpRequestService } from 'ngx-histaff-alpha';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RcHrYearPlaningService {
  yearPlaning$ = new BehaviorSubject<any>({});
  constructor(
    private commonHttpRequestService: CommonHttpRequestService
  ) { }


}
