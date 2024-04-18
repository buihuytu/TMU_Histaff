import { EnumTranslateKey } from 'alpha-global-constants';

export const GRID_ROW_HEIGHT = 44;
export const GRID_NO_AVATAR_ROW_HEIGHT = 36;
export const PIE_COLORS = [
    '#A2D7FE', '#F1C2DB', '#D2D2D2', '#D6ED8B', '#FECB7F', '#FF8D5D', '#B8DEAB', '#F2C1FE', 'FDE980'
]
export const PIE_COLORS_V2 = [
    '#D2D2D2', '#D6ED8B', '#FECB7F', '#FF8D5D', '#B8DEAB', '#F2C1FE', 'FDE980'
]
export const DASHBOARD_BAR_COLOR = '#D2D2D2'
export const DASHBOARD_BAR_SECOND_SERIE = '#FF8D5D'

export const MENU_OPTIONS_PRINT = [
    {
        translateCode: EnumTranslateKey.UI_COMPONENT_TITLE_PRINT_CHART,//'Print chart',
        fileData: 'print',
        border: true,
    },
    {
        translateCode: EnumTranslateKey.UI_COMPONENT_TITLE_PRINT_PNG,//'Download PNG image',
        fileData: 'png',
    },
    {
        translateCode: EnumTranslateKey.UI_COMPONENT_TITLE_PRINT_JPEG,// 'Download JPEG image',
        fileData: 'jpeg',
    },
    {
        translateCode: EnumTranslateKey.UI_COMPONENT_TITLE_PRINT_PDF,// 'Download PDF document',
        fileData: 'pdf',
    },
    {
        translateCode: EnumTranslateKey.UI_COMPONENT_TITLE_PRINT_SVG,//'Download SVG vector image',
        fileData: 'svg',
    },
]