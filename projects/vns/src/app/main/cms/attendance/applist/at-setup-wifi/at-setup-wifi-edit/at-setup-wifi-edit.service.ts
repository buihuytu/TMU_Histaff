import { Injectable } from '@angular/core';
import { CommonHttpRequestService } from 'ngx-histaff-alpha';

@Injectable({
  providedIn: 'root',
})
export class AtSetupWifiEditService {
  
  constructor(private commonHttpRequestService: CommonHttpRequestService) {
    
  }

}
