import { ElementRef, Injectable } from "@angular/core";
import { CommonHttpRequestService } from "ngx-histaff-alpha";

@Injectable({
    providedIn: 'root'
  })
  export class OrganizationLevelService{
    constructor(
        private commonHttpRequestService: CommonHttpRequestService
      ) { 
        
      }
}