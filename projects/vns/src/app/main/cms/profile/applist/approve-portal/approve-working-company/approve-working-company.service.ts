import { Injectable } from "@angular/core";
import { EnumTranslateKey } from 'alpha-global-constants';

@Injectable({ providedIn: 'root' })


export class ApproveWorkingCompanyService {
    tabActiveIndex!: number;
    tabActiveHeader!: EnumTranslateKey;
}
