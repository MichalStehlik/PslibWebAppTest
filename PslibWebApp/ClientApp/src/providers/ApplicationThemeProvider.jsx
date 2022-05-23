import { lightTheme, darkTheme } from "../ui-components/Themes"
import { useAppContext, THEME_LIGHT } from "./ApplicationProvider"
import { GlobalStyles, FontStyles, ThemeProvider as BaseThemeProvider } from "../ui-components"

const themeSwitcher = (themeString) => {
    switch (themeString) {
        case THEME_LIGHT: return lightTheme;
        default: return darkTheme;
    }
}

export const ApplicationThemeProvider = ({ children }) => {
    const [{ theme }] = useAppContext();
    return (
        <>
            <BaseThemeProvider theme={themeSwitcher(theme)}>
                <FontStyles />
                <GlobalStyles />
                {children}
            </BaseThemeProvider>
        </>
    )
}

export default ApplicationThemeProvider;