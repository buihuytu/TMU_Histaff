import { Injectable } from '@angular/core';
import { CommonHttpRequestService } from 'ngx-histaff-alpha';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FamilyEditService {

  constructor(
    private commonHttpRequestService: CommonHttpRequestService
  ) { 
    
  }

  GetProvince(url: string): Observable<any> {
    return this.commonHttpRequestService.makeGetRequest('queryList', url);
  }
}
