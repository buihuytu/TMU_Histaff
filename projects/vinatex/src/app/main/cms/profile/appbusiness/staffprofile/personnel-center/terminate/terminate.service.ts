import { Injectable } from '@angular/core';
import { CommonHttpRequestService } from 'ngx-histaff-alpha';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class TerminateService{

  constructor(
    private commonHttpRequestService: CommonHttpRequestService
  ) { 
    
  }
  
  getTerminateByEmployee(employeeId: number): Observable<any> {
    return this.commonHttpRequestService.makeGetRequest('getTerminateByEmployee', '/api/HuTerminate/GetTerminateByEmployee?id=' + employeeId);
  }
}
