import { useEffect } from "react"
import { lightTheme, darkTheme } from "../ui-components/Themes"
import { useAppContext, THEME_LIGHT } from "./ApplicationProvider"
import { GlobalStyles, FontStyles, ThemeProvider as BaseThemeProvider } from "../ui-components"

const LOCAL_STORAGE_ID = "APP_THEME";

const themeSwitcher = (themeString) => {
    switch (themeString) {
        case THEME_LIGHT: return lightTheme;
        default: return darkTheme;
    }
}

export const ApplicationThemeProvider = ({ children }) => {
    const [{ theme }] = useAppContext();
    useEffect(() => {
        localStorage.setItem(LOCAL_STORAGE_ID, JSON.stringify(theme));
    }, [theme]);
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