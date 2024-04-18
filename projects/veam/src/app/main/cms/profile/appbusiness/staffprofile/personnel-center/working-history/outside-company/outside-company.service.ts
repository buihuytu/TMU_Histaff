import { Injectable } from '@angular/core';
import { CommonHttpRequestService } from 'ngx-histaff-alpha';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class OutsideCompanyService{

  constructor(
    private commonHttpRequestService: CommonHttpRequestService
  ) { 
    
  }
  
  getWorkingBeforeByEmployee(employeeId: number): Observable<any> {
    return this.commonHttpRequestService.makeGetRequest('getWorkingBeforeByEmployee', '/api/HuWorkingBefore/GetWorkingBeforeByEmployee?id=' + employeeId);
  }
}
