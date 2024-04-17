import { Injectable } from '@angular/core';
import { CommonHttpRequestService } from 'ngx-histaff-alpha';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class InsWhereHealEditService {
  constructor(
    private commonHttpRequestService: CommonHttpRequestService
  ) {
    
  }
  getAllProvince(): Observable<any> {
    return this.commonHttpRequestService.makeGetRequest(
      'getAllProvince',
      '/api/InsWhereHealTh/GetAllProvince'
    );
  }
  getALLDistrictByProvinceId(provinceId: any): Observable<any> {
    return this.commonHttpRequestService.makeGetRequest(
      'getALLDistrictByProvinceId',
      `/api/InsWhereHealTh/GetALLDistrictByProvinceId?provinceId=${provinceId}`
    );
  }
}
