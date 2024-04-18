import { Injectable } from '@angular/core';
import { CommonHttpRequestService } from 'ngx-histaff-alpha';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class SalaryLevelEditService {

  constructor(
    private commonHttpRequestService: CommonHttpRequestService
  ) {
    
  }
  getRegionByDateNow(): Observable<any>{
    return this.commonHttpRequestService.makeGetRequest('getRegionByDateNow','/api/InsRegion/GetRegionByDateNow')
  }
}




