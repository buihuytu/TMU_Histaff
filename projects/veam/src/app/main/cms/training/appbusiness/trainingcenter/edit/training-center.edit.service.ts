import { Injectable } from '@angular/core';
import { CommonHttpRequestService } from 'ngx-histaff-alpha';

@Injectable({
  providedIn: 'root',
})
export class TrainingCenterEditService {
  constructor(private commonHttpRequestService: CommonHttpRequestService) {
    
  }
  // CreateNewCode(): Observable<any> {
  //   return this.commonHttpRequestService.makeGetRequest('CreateNewCode', '/api/TrCenter/CreateNewCode');
  // }
}
