import { Injectable } from '@angular/core';
import { CommonHttpRequestService } from 'ngx-histaff-alpha';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SeDocumentEditService {
  constructor(
    private commonHttpRequestService: CommonHttpRequestService
  ) {
    
  }

  getDucumentType(): Observable<any> {
    return this.commonHttpRequestService.makeGetRequest(
      'getDucumentType',
      '/api/SeDocument/GetDucumentType'
    );
  }

    getCode(): Observable<any> {
    return this.commonHttpRequestService.makeGetRequest('getCode', '/api/SeDocument/GetCode');
  }
}
