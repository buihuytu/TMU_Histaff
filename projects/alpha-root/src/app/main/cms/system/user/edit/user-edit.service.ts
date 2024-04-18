import { Injectable } from '@angular/core';
import { api } from 'alpha-global-constants';
import { CommonHttpRequestService } from 'ngx-histaff-alpha';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserEditService {

  constructor(
    private commonHttpRequestService: CommonHttpRequestService
  ) { 
    
  }

  getUserGroupList(): Observable<any> {
    return this.commonHttpRequestService.makeGetRequest('getUserGroupList', api.SYS_GROUP_READ_ALL);
  }

  employeeGetById(id: number): Observable<any> {
    return this.commonHttpRequestService.makeGetRequest('employeeGetById', api.HU_EMPLOYEE_READ + `?id=${id}`);
  }

  orgUnitGetById(id: number): Observable<any> {
    return this.commonHttpRequestService.makeGetRequest('orgUnitGetById', api.OM_ORGANIZATION_READ + `?id=${id}`);
  }

}
