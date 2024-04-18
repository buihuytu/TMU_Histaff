import { Injectable } from '@angular/core';
import { CommonHttpRequestService } from 'ngx-histaff-alpha';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrtherlistEditService {
  typeId!: number | null;

  constructor(
    private commonHttpRequestService: CommonHttpRequestService
  ) {
    
  }

  getScales(): Observable<any> {
    return this.commonHttpRequestService.makeGetRequest(
      'getScales',
      '/api/SysOrtherList/GetScales'
    );
  }
  GetAllGroupOtherListType(): Observable<any> {
    return this.commonHttpRequestService.makeGetRequest(
      'GetAllGroupOtherListType',
      '/api/SysOrtherList/GetAllGroupOtherListType'
    );
  }
}
