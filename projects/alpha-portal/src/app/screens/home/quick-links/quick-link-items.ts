import { EnumTranslateKey } from 'alpha-global-constants';
import { EnumHomeMenuItemCode } from "../enum-menu-item-code";
import { IHomeMenuItem } from "../menu-items";

/* page => row => item */
export const QUICK_LINK_ITEMS: IHomeMenuItem[] =
    [
        {
            code: EnumHomeMenuItemCode.REGISTER_OFF,
            svg: 'assets/images/home-ver2/01-register.svg',
            captionCode: EnumTranslateKey.PWA_HOME_MENU_ITEM_REGISTER_OFF,
            path: 'register-off',
            color: '#2C71FF',
            backgroundColor: '#ffffff',
            outerBackgroundColor: '#F6F7FB'
        },
        {
            code: EnumHomeMenuItemCode.APPROVE,
            svg: 'assets/images/home-ver2/02-approve.svg',
            captionCode: EnumTranslateKey.PWA_HOME_MENU_ITEM_APPROVE,
            path: 'approve',
            color: '#6347D8',
            backgroundColor: '#ffffff',
            outerBackgroundColor: '#F6F7FB'
        },
        {
            code: EnumHomeMenuItemCode.TIME_TABLE,
            svg: 'assets/images/home-ver2/03-attendance.svg',
            captionCode: EnumTranslateKey.PWA_HOME_MENU_ITEM_TIME_TABLE,
            path: 'time-table',
            color: '#3DC65A',
            backgroundColor: '#ffffff',
            outerBackgroundColor: '#F6F7FB'
        },
        {
            code: EnumHomeMenuItemCode.PAYROLL_NOTE,
            svg: 'assets/images/home-ver2/04-payroll.svg',
            captionCode: EnumTranslateKey.PWA_HOME_MENU_ITEM_PAYROLL_NOTE,
            path: 'payroll-note',
            color: '#FE3E36',
            backgroundColor: '#ffffff',
            outerBackgroundColor: '#F6F7FB'
        },
        {
            code: EnumHomeMenuItemCode.CONTRACT_LIST,
            svg: 'assets/images/home-ver2/05-employees.svg',
            captionCode: EnumTranslateKey.PWA_HOME_MENU_ITEM_CONTRACT_LIST,
            path: 'contract-list',
            color: '#20D6D6',
            backgroundColor: '#ffffff',
            outerBackgroundColor: '#F6F7FB'
        },
        // clone one more
        {
            code: EnumHomeMenuItemCode.REGISTER_OFF,
            svg: 'assets/images/home-ver2/01-register.svg',
            captionCode: EnumTranslateKey.PWA_HOME_MENU_ITEM_REGISTER_OFF,
            path: 'register-off',
            color: '#2C71FF',
            backgroundColor: '#ffffff',
            outerBackgroundColor: '#F6F7FB'
        },
        {
            code: EnumHomeMenuItemCode.APPROVE,
            svg: 'assets/images/home-ver2/02-approve.svg',
            captionCode: EnumTranslateKey.PWA_HOME_MENU_ITEM_APPROVE,
            path: 'approve',
            color: '#6347D8',
            backgroundColor: '#ffffff',
            outerBackgroundColor: '#F6F7FB'
        },
        {
            code: EnumHomeMenuItemCode.TIME_TABLE,
            svg: 'assets/images/home-ver2/03-attendance.svg',
            captionCode: EnumTranslateKey.PWA_HOME_MENU_ITEM_TIME_TABLE,
            path: 'time-table',
            color: '#3DC65A',
            backgroundColor: '#ffffff',
            outerBackgroundColor: '#F6F7FB'
        },
        {
            code: EnumHomeMenuItemCode.PAYROLL_NOTE,
            svg: 'assets/images/home-ver2/04-payroll.svg',
            captionCode: EnumTranslateKey.PWA_HOME_MENU_ITEM_PAYROLL_NOTE,
            path: 'payroll-note',
            color: '#FE3E36',
            backgroundColor: '#ffffff',
            outerBackgroundColor: '#F6F7FB'
        },
        {
            code: EnumHomeMenuItemCode.CONTRACT_LIST,
            svg: 'assets/images/home-ver2/05-employees.svg',
            captionCode: EnumTranslateKey.PWA_HOME_MENU_ITEM_CONTRACT_LIST,
            path: 'contract-list',
            color: '#20D6D6',
            backgroundColor: '#ffffff',
            outerBackgroundColor: '#F6F7FB'
        },
    ]