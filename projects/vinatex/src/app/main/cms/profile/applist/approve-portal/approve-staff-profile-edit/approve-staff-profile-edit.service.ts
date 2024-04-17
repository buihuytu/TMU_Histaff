import { Injectable } from "@angular/core";
import { EnumTranslateKey } from 'alpha-global-constants';

@Injectable({ providedIn: 'root' })
export class ApproveStaffProfileService {
    tabActiveIndex!: number;
    tabActiveHeader!: EnumTranslateKey;

}
