import { Injectable } from '@angular/core';
import { CommonHttpRequestService } from 'ngx-histaff-alpha';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class InsideCompanyService{

  constructor(
    private commonHttpRequestService: CommonHttpRequestService
  ) { 
    
  }
  
  getInsideCompanyByEmployee(employeeId: number): Observable<any> {
    return this.commonHttpRequestService.makeGetRequest('getWorkingBeforeByEmployee', '/api/HuWorking/GetInsideCompanyByEmployee?id=' + employeeId);
  }
}
