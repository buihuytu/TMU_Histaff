import { Injectable } from '@angular/core';
import { CommonHttpRequestService } from 'ngx-histaff-alpha';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DisciplineService{

  constructor(
    private commonHttpRequestService: CommonHttpRequestService
  ) { 
    
  }
  
  getDisciplineByEmployee(employeeId: number): Observable<any> {
    return this.commonHttpRequestService.makeGetRequest('getDisciplineByEmployee', '/api/HuDiscipline/GetDisciplineByEmployee?id=' + employeeId);
  }
}
