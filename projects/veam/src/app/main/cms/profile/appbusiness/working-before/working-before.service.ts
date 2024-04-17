import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IQueryListRequest } from '../../../../../interfaces/IQueryListRequest';
import { CommonHttpRequestService } from '../../../../../services/common-http-request.service';
import { api } from 'alpha-global-constants';

@Injectable({
  providedIn: 'root'
})
export class WorkingBeforeService {

  constructor(
    private commonHttpRequestService: CommonHttpRequestService
  ) { }

}
