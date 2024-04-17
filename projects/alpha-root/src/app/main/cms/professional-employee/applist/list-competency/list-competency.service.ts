import { Injectable } from '@angular/core';
import { EnumTranslateKey } from 'alpha-global-constants';
import { CommonHttpRequestService} from 'ngx-histaff-alpha';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ListCompetencyService {
    public trProgramId$ = new BehaviorSubject<number>(0);
    tabActiveIndex!: number;
    tabActiveHeader!: EnumTranslateKey;

    constructor(
        private commonHttpRequestService: CommonHttpRequestService,
    ) {
        
    }

    getAllGroup(): Observable<any> {
        return this.commonHttpRequestService.makeGetRequest(
            'getAllGroup',
            '/api/HuCompetencyGroup/GetList'
        );
    }

    getAllCompetency(): Observable<any> {
        return this.commonHttpRequestService.makeGetRequest(
            'getAllCompetency',
            '/api/HuCompetency/GetList'
        );
    }

    getAllAspect(): Observable<any> {
        return this.commonHttpRequestService.makeGetRequest(
            'getAllAspect',
            '/api/HuCompetencyAspect/GetList'
        );
    }
}
