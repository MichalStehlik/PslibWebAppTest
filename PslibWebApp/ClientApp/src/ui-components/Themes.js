const common = {
    space: [0, 4, 8, 12, 16, 32, 64, 128],
    colors: {
        grays: {
            100: '#F6F6F6',
            200: '#F0F0F0',
            300: '#E3E3E3',
            400: '#C0C0C0',
            500: '#A1A1A1',
            600: '#787878',
            700: '#646464',
            800: '#454545',
            900: '#232323',
        },
        white: '#FFFFFF',
        black: '#000000',
        info: {
            default: '#35b6c2',
            light: '#59b9c2',
            dark: '#2a929c'
        },
        primary: {
            default: '#357BC2',
            light: '#4b87c4',
            dark: '#305982',
        },
        danger: {
            default: '#D90000',
            light: '#d92929'
        },
        success: {
            default: '#00AA80',
            light: '#00BB90',
        },
        warning: {
            default: '#ECB100',
            light: '#edbb24',
        },
        default: {
            default: '#ddd',
            light: '#eee',
        },
    },
    radii: {
        none: 0,
        default: '4px'
    }
}

export const lightTheme = {
    ...common,
    colors: {
        ...common.colors,
        body: common.colors.white,
        panel: common.colors.grays[300],
        text: common.colors.black,
    },
    link: '#0072bc',
    hoverLink: '#357BC2',
}
export const darkTheme = {
    ...common,
    colors: {
        ...common.colors,
        body: common.colors.grays[900],
        panel: common.colors.grays[800],
        text: common.colors.white,
    },
    link: '#0072bc',
    hoverLink: '#357BC2',
}