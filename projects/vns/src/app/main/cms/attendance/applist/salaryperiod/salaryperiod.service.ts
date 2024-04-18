
import { Injectable } from '@angular/core';
import { CommonHttpRequestService } from 'ngx-histaff-alpha';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SalaryPeriodService {
  constructor(
    private commonHttpRequestService: CommonHttpRequestService
  ) {
    
  }
  post(url: string, periodId: any ): Observable<any> {
    return this.commonHttpRequestService.makePostRequest('post', url, periodId);
  }
}
