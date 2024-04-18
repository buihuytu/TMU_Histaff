import { Injectable } from '@angular/core';
import { CommonHttpRequestService } from 'ngx-histaff-alpha';

@Injectable({
  providedIn: 'root',
})
export class SeDocumentInfoEditService {
  constructor(
    private commonHttpRequestService: CommonHttpRequestService
  ) {
    
  }
  empId!:number;
  isPermissveUpload!: boolean;
}
