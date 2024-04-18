import { ElementRef, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrganizationStructService {
  
  currentEditFormRef!: ElementRef<any>;
  currentViewFormData: any;
  currentOrgIds$ = new BehaviorSubject<number[]>([]);
  currentOrg!: string;

  constructor() { }
}
