import { Injectable } from '@angular/core';
import { api } from 'alpha-global-constants';
import { CommonHttpRequestService } from 'ngx-histaff-alpha';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WorkingBeforeService {
  constructor(private commonHttpRequestService: CommonHttpRequestService) {}

  GetWorkingBeforeByEmployee(id: number): Observable<any> {
    return this.commonHttpRequestService.makeGetRequest(
      'GetWorkingBeforeByEmployee',
      `/api/HuWorkingBefore/GetWorkingBeforeByEmployee?id=${id}`,
    );
  }
  SendRequest(payload: any): Observable<any> {
    return this.commonHttpRequestService.makePostRequest('SendRequest', api.PORTAL_REQUEST_CHANGE_SEND, payload);
  }
}
