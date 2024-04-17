import { EnumTranslateKey } from 'alpha-global-constants';

export interface IWarningItem {
    id: number;
    label: EnumTranslateKey;
    warningOn: EnumTranslateKey;
    unit: EnumTranslateKey;
    value: number;
    otherListCode: string;
    isActive: boolean;
    isError? : boolean
    errorMessage: EnumTranslateKey
}