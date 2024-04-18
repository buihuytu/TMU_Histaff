import { Injectable } from "@angular/core";
import { CommonHttpRequestService } from "ngx-histaff-alpha";
import { Observable } from "rxjs";

@Injectable({ providedIn: 'root' })
export class HuFamilyEditService {
  familyId!: number;
  constructor(
    private commonHttpRequestService: CommonHttpRequestService
  ) {
    
  }
 
  getAllHuFamilyEdit(): Observable<any> {
    return this.commonHttpRequestService.makeGetRequest(
      'getAllHuFamilyEdit',
      '/api/ApproveHuFamilyEdit/GetAllHuFamilyEdit',
    );
  }
}