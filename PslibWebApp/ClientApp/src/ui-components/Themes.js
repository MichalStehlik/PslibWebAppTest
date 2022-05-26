import { Variant } from "."

const WHITE = "white";
const ACCENT1 = "";

export const lightTheme = {
    body: "white",
    panel: '#E9E9E9',
    text: '#2b2b2b',
    link: '#0072bc',
    hoverLink: '#357BC2',
    primary: '#357BC2',
    primaryText: 'white',
    hoverPrimary: '#3c7ec1',
    hoverPrimaryText: 'white',
    default: '#666',
    defaultText: 'black',
    hoverDefault: '#AAA',
    hoverDefaultText: 'black',
    error: '#D90000',
    errorText: 'white',
    hoverError: '#D90000',
    hoverErrorText: 'white',
    warning: '#ECB100',
    info: '#357BC2',
    infoText: 'white',
    hoverInfo: '#357BB2',
    hoverInfoText: 'white',
    success: '#00AA80',
    successText: 'white',
    hoverSuccess: '#00BB90',
    hoverSuccessText: 'white',
}
export const darkTheme = {
    body: '#2b2b2b',
    panel: '#393939',
    text: 'white',
    link: '#0072bc',
    primary: '#357BC2',
    primaryText: 'white',
    hoverPrimary: '#3c7ec1',
    hoverPrimaryText: 'white',
    default: '#CCC',
    defaultText: 'black',
    hoverDefault: '#AAA',
    hoverDefaultText: 'black',
    error: '#D90000',
    errorText: 'white',
    hoverError: '#D90000',
    hoverErrorText: 'white',
    warning: '#ECB100',
    info: '#357BC2',
    infoText: 'white',
    hoverInfo: '#357BB2',
    hoverInfoText: 'white',
    success: '#00AA80',
}

export const getBackground = (theme, variant) => {
    switch (variant) {
        case "primary":
            return theme.primary;
        case "error":
            return theme.error;
        case "warning":
            return theme.warning;
        case "info":
            return theme.info;
        case "success":
            return theme.success;
        default:
            return theme.default;
    }
}

export const getColor = (theme, variant) => {
    switch (variant) {
        case "primary":
            return theme.primaryText;
        case "error":
            return theme.errorText;
        case "warning":
            return theme.warningText;
        case "info":
            return theme.infoText;
        case "success":
            return theme.successText;
        default:
            return theme.defaultText;
    }
}