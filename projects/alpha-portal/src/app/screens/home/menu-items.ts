import { EnumTranslateKey } from 'alpha-global-constants';
import { EnumHomeMenuItemCode } from "./enum-menu-item-code";

export interface IHomeMenuItem {
    code: EnumHomeMenuItemCode,
    svg: string;
    captionCode: EnumTranslateKey;
    path: string;
    color: string;
    backgroundColor: string;
    outerBackgroundColor: string;
}

/* page => row => item */
export const HOME_MENU_ITEMS: IHomeMenuItem[] =
    [
        {
            code: EnumHomeMenuItemCode.REGISTER_OFF,
            svg: 'assets/images/home/register-off.svg',
            captionCode: EnumTranslateKey.PWA_HOME_MENU_ITEM_REGISTER_OFF,
            path: 'register-off',
            color: '#2C71FF',
            backgroundColor: '#ffffff',
            outerBackgroundColor: '#F6F7FB'
        },
        {
            code: EnumHomeMenuItemCode.APPROVE,
            svg: 'assets/images/home/approve.svg',
            captionCode: EnumTranslateKey.PWA_HOME_MENU_ITEM_APPROVE,
            path: 'approve',
            color: '#6347D8',
            backgroundColor: '#ffffff',
            outerBackgroundColor: '#F6F7FB'
        },
        {
            code: EnumHomeMenuItemCode.TIME_TABLE,
            svg: 'assets/images/home/time-table.svg',
            captionCode: EnumTranslateKey.PWA_HOME_MENU_ITEM_TIME_TABLE,
            path: 'time-table',
            color: '#3DC65A',
            backgroundColor: '#ffffff',
            outerBackgroundColor: '#F6F7FB'
        },
        {
            code: EnumHomeMenuItemCode.PAYROLL_NOTE,
            svg: 'assets/images/home/payroll-note.svg',
            captionCode: EnumTranslateKey.PWA_HOME_MENU_ITEM_PAYROLL_NOTE,
            path: 'payroll-note',
            color: '#FE3E36',
            backgroundColor: '#ffffff',
            outerBackgroundColor: '#F6F7FB'
        },
        {
            code: EnumHomeMenuItemCode.PROFILE,
            svg: 'assets/images/home/profile.svg',
            captionCode: EnumTranslateKey.PWA_HOME_MENU_ITEM_PROFILE,
            path: 'profile',
            color: '#FE9400',
            backgroundColor: '#ffffff',
            outerBackgroundColor: '#F6F7FB'
        },
        {
            code: EnumHomeMenuItemCode.CONTRACT_LIST,
            svg: 'assets/images/home/contract-list.svg',
            captionCode: EnumTranslateKey.PWA_HOME_MENU_ITEM_CONTRACT_LIST,
            path: 'contract-list',
            color: '#20D6D6',
            backgroundColor: '#ffffff',
            outerBackgroundColor: '#F6F7FB'
        },

        // tmp clone 1 more page
        {
            code: EnumHomeMenuItemCode.REGISTER_OFF,
            svg: 'assets/images/home/register-off.svg',
            captionCode: EnumTranslateKey.PWA_HOME_MENU_ITEM_REGISTER_OFF,
            path: 'register-off',
            color: '#2C71FF',
            backgroundColor: '#ffffff',
            outerBackgroundColor: '#F6F7FB'
        },
        {
            code: EnumHomeMenuItemCode.APPROVE,
            svg: 'assets/images/home/approve.svg',
            captionCode: EnumTranslateKey.PWA_HOME_MENU_ITEM_APPROVE,
            path: 'approve',
            color: '#6347D8',
            backgroundColor: '#ffffff',
            outerBackgroundColor: '#F6F7FB'
        },
        {
            code: EnumHomeMenuItemCode.TIME_TABLE,
            svg: 'assets/images/home/time-table.svg',
            captionCode: EnumTranslateKey.PWA_HOME_MENU_ITEM_TIME_TABLE,
            path: 'time-table',
            color: '#3DC65A',
            backgroundColor: '#ffffff',
            outerBackgroundColor: '#F6F7FB'
        },
        {
            code: EnumHomeMenuItemCode.PAYROLL_NOTE,
            svg: 'assets/images/home/payroll-note.svg',
            captionCode: EnumTranslateKey.PWA_HOME_MENU_ITEM_PAYROLL_NOTE,
            path: 'payroll-note',
            color: '#FE3E36',
            backgroundColor: '#ffffff',
            outerBackgroundColor: '#F6F7FB'
        },
        {
            code: EnumHomeMenuItemCode.PROFILE,
            svg: 'assets/images/home/profile.svg',
            captionCode: EnumTranslateKey.PWA_HOME_MENU_ITEM_PROFILE,
            path: 'profile',
            color: '#FE9400',
            backgroundColor: '#ffffff',
            outerBackgroundColor: '#F6F7FB'
        },
        {
            code: EnumHomeMenuItemCode.CONTRACT_LIST,
            svg: 'assets/images/home/contract-list.svg',
            captionCode: EnumTranslateKey.PWA_HOME_MENU_ITEM_CONTRACT_LIST,
            path: 'contract-list',
            color: '#20D6D6',
            backgroundColor: '#ffffff',
            outerBackgroundColor: '#F6F7FB'
        },

    ]
