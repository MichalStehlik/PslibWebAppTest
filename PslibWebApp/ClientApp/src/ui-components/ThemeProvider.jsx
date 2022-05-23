import { ThemeProvider as StyledComponentsThemeProvider } from "styled-components"

export const ThemeProvider = ({ children, ...props }) => (
    <StyledComponentsThemeProvider {...props} >
        { children }
    </StyledComponentsThemeProvider>
);

export default ThemeProvider;