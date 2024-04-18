import { Injectable } from '@angular/core';
import { CommonHttpRequestService } from 'ngx-histaff-alpha';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReportService {
    
    constructor(
      private commonHttpRequestService: CommonHttpRequestService,
    ){ 
        
    }

    getCurrentPeriodSalary(): Observable<any> {
        return this.commonHttpRequestService.makeGetRequest('getCurrentPeriodSalary', '/api/AtWorksign/GetCurrentPeriodSalary');
    }
}
