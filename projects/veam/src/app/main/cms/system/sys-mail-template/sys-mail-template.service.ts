
import { Injectable } from '@angular/core';
import { CommonHttpRequestService } from 'ngx-histaff-alpha';
@Injectable({
    providedIn: 'root'
})
export class SysMailTemplateService {
    sysMailTemplateId: number = 0;
    constructor(
        private commonHttpRequestService: CommonHttpRequestService
      ) {
        
      }
}

function InjectTable(arg0: {}): (target: typeof SysMailTemplateService) => void | typeof SysMailTemplateService {
    throw new Error("Function not implemented.");
}
