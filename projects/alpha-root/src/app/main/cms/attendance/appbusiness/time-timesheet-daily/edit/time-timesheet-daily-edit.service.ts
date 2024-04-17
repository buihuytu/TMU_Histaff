import { Injectable } from '@angular/core';
import { CommonHttpRequestService } from 'ngx-histaff-alpha';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TimeTimesheetDailyEditService {
  constructor(
    private commonHttpRequestService: CommonHttpRequestService
  ) {
    
  }

  geTimeTypeList(): Observable<any> {
    return this.commonHttpRequestService.makeGetRequest(
      'geTimeTypeList',
      '/api/AtShift/GetListSymbol'
    );
  }
}
