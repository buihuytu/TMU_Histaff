import { Injectable } from '@angular/core';
import { CommonHttpRequestService } from 'ngx-histaff-alpha';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class InsTypeService {
  constructor(
    private commonHttpRequestService: CommonHttpRequestService
  ) {
    
  }

  getListInsType(): Observable<any>{
    return this.commonHttpRequestService.makeGetRequest('getListInsType', '/api/InsType/GetListInsType')
  }
}
