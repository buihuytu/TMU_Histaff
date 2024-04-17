import { Injectable } from '@angular/core';
import { CommonHttpRequestService } from 'ngx-histaff-alpha';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SeProcessApproveEditService {
  processId!: number | null;
  constructor(
    private commonHttpRequestService: CommonHttpRequestService
  ) { 
    
  }

  getLevelOrder(): Observable<any> {
    return this.commonHttpRequestService.makeGetRequest('getLevelOrder', '/api/SeProcessApprove/GetLevelOrder');
  }

  getListProcess(): Observable<any> {
    return this.commonHttpRequestService.makeGetRequest('getListProcess', '/api/SeProcessApprove/GetListProcess');
  }
}
