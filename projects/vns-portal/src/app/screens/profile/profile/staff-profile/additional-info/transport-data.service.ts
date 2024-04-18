import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransportDataService {
  transportData$: any = new BehaviorSubject<any>(0);
  addtionalInfoId = 0;
  constructor() { }
}
