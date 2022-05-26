const WHITE = "white";

const common = {
    space: [0, 4, 8, 16, 32, 64, 128, 256, 512],
}

export const lightTheme = {
    body: "white",
    panel: '#E9E9E9',
    text: '#2b2b2b',
    link: '#0072bc',
    hoverLink: '#357BC2',
    primary: '#357BC2',
    primaryText: WHITE,
    hoverPrimary: '#4b87c4',
    hoverPrimaryText: 'white',
    default: '#ddd',
    defaultText: 'black',
    hoverDefault: '#eee',
    hoverDefaultText: 'black',
    error: '#D90000',
    errorText: WHITE,
    hoverError: '#d92929',
    hoverErrorText: WHITE,
    warning: '#ECB100',
    warningText: WHITE,
    hoverWarning: '#edbb24',
    hoverWarningText: WHITE,
    info: '#35b6c2',
    infoText: WHITE,
    hoverInfo: '#59b9c2',
    hoverInfoText: WHITE,
    success: '#00AA80',
    successText: WHITE,
    hoverSuccess: '#00BB90',
    hoverSuccessText: WHITE,
    ...common
}
export const darkTheme = {
    body: '#2b2b2b',
    panel: '#393939',
    text: WHITE,
    link: '#0072bc',
    primary: '#357BC2',
    primaryText: WHITE,
    hoverPrimary: '#4b87c4',
    hoverPrimaryText: WHITE,
    default: '#555',
    defaultText: WHITE,
    hoverDefault: '#777',
    hoverDefaultText: WHITE,
    error: '#D90000',
    errorText: WHITE,
    hoverError: '#d92929',
    hoverErrorText: WHITE,
    warning: '#ECB100',
    warningText: WHITE,
    hoverWarning: '#edbb24',
    hoverWarningText: WHITE,
    info: '#35b6c2',
    infoText: WHITE,
    hoverInfo: '#59b9c2',
    hoverInfoText: WHITE,
    success: '#00AA80',
    successText: WHITE,
    hoverSuccess: '#00BB90',
    hoverSuccessText: WHITE,
    ...common
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

export const getHoverBackground = (theme, variant) => {
    switch (variant) {
        case "primary":
            return theme.hoverPrimary;
        case "error":
            return theme.hoverError;
        case "warning":
            return theme.hoverWarning;
        case "info":
            return theme.hoverInfo;
        case "success":
            return theme.hoverSuccess;
        default:
            return theme.hoverDefault;
    }
}

export const getHoverColor = (theme, variant) => {
    switch (variant) {
        case "primary":
            return theme.hoverPrimaryText;
        case "error":
            return theme.hoverErrorText;
        case "warning":
            return theme.hoverWarningText;
        case "info":
            return theme.hoverInfoText;
        case "success":
            return theme.hoverSuccessText;
        default:
            return theme.hoverDefaultText;
    }
}