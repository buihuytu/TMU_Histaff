import { ElementRef, Injectable } from '@angular/core';
import { api } from 'alpha-global-constants';
import { CommonHttpRequestService } from 'ngx-histaff-alpha';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrganizationStructService {
  
  currentEditFormRef!: ElementRef<any>;
  currentViewFormData: any;
  currentOrgIds$ = new BehaviorSubject<number[]>([]);
  currentOrg!: string;

  constructor(
    private commonHttpRequestService: CommonHttpRequestService
  ) { }

  getCode(): Observable<any> {
    return this.commonHttpRequestService.makeGetRequest('getCode', api.HU_ORGANIZATION_GET_NEW_CODE);
  }
}
