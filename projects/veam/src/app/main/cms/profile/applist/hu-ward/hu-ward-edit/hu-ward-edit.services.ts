import { Injectable } from '@angular/core';
import { CommonHttpRequestService } from 'ngx-histaff-alpha';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class HuWWardEditService {
  constructor(
    private commonHttpRequestService: CommonHttpRequestService
  ) {
    
  }

  GetScalesProvince(): Observable<any> {
    return this.commonHttpRequestService.makeGetRequest(
      'getScales',
      '/api/HuDistrict/GetScalesProvince'
    );
  }

  getCode(): Observable<any> {
    return this.commonHttpRequestService.makeGetRequest('getCode', '/api/HuWard/CreateNewCode');
  }

  getAllNation(): Observable<any> {
    return this.commonHttpRequestService.makeGetRequest(
      'getScalesnation',
      '/api/HuProvinceList/GetScalesNation'
    );
  }

  getProvinceById(x: number): Observable<any> {
    return this.commonHttpRequestService.makeGetRequest('getProvinceById',`/api/HuWard/GetScalesProvince?id=${x}`,);
}
}
