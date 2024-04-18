import { Injectable } from '@angular/core';
import { CommonHttpRequestService } from 'ngx-histaff-alpha';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class WorkingService{

  constructor(
    private commonHttpRequestService: CommonHttpRequestService
  ) { 
    
  }
  
  getWorkingByEmployee(employeeId: number): Observable<any> {
    return this.commonHttpRequestService.makeGetRequest('getWorkingByEmployee', '/api/HuWorking/GetWorkingByEmployee?id=' + employeeId);
  }
}
