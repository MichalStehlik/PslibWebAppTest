import { ThemeProvider as StyledComponentsThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from "./Themes"

export const ThemeProvider = ({ children, theme }) => (
    <StyledComponentsThemeProvider theme={theme}>
        { children }
    </StyledComponentsThemeProvider>
);

export default ThemeProvider;