import { Injectable } from '@angular/core';
import { CommonHttpRequestService } from 'ngx-histaff-alpha';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GroupPositionEditService {

  constructor(
    private commonHttpRequestService: CommonHttpRequestService
  ) { 
    
  }

  getGroupPositionCode(): Observable<any> {
    return this.commonHttpRequestService.makeGetRequest('getGroupPositionCode', '/api/HuGroupPosition/CreateCodeAuto');
  }

}
