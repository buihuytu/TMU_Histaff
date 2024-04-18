import { Injectable } from '@angular/core';
import { CommonHttpRequestService } from 'ngx-histaff-alpha';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class InsRegimesEditService {
  getCode() {
    throw new Error('Method not implemented.');
  }
  constructor(private commonHttpRequestService: CommonHttpRequestService) {
    
  }

  GetInsGroup(): Observable<any> {
    return this.commonHttpRequestService.makeGetRequest('GetInsGroup', '/api/InsRegimes/GetInsGroup');
  }
  GetCalDateType(): Observable<any> {
    return this.commonHttpRequestService.makeGetRequest('GetCalDateType', '/api/InsRegimes/GetCalDateType');
  }
  CreateNewCode(): Observable<any> {
    return this.commonHttpRequestService.makeGetRequest('CreateNewCode', '/api/InsRegimes/CreateNewCode');
  }
  CreateNewCodeInsGroup(): Observable<any> {
    return this.commonHttpRequestService.makeGetRequest('CreateNewCodeInsGroup', '/api/InsGroup/CreateNewCode');
  }
}
