import { Injectable } from '@angular/core';
import { CommonHttpRequestService } from 'ngx-histaff-alpha';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FamilyService{

  constructor(
    private commonHttpRequestService: CommonHttpRequestService
  ) { 
    
  }
  
  getFamilyByEmployee(employeeId: number): Observable<any> {
    return this.commonHttpRequestService.makeGetRequest('getFamilyByEmployee', '/api/HuFamily/GetFamilyByEmployee?id=' + employeeId);
  }
}
