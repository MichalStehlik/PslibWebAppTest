import React from "react"
import { Routes, Route} from "react-router-dom"
import Home from "./pages/Home"
import Test from "./pages/Test"
import Profile from "./pages/Profile"
import NotFound from "./pages/NotFound"
import { SignInCallback, SignOutCallback, SilentRenewCallback } from "./components/Auth/OAuthCallbacks"
import Navigation from "./components/Navigation"
import { useAppContext } from "./providers/ApplicationProvider"

import { ThemeProvider } from "./ui-components/ThemeProvider";
import { GlobalStyles } from "./ui-components/GlobalStyles";
import { lightTheme, darkTheme } from "./ui-components/Themes"

export const App = () => {
    const [{ theme }] = useAppContext();
    return (
        <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
            <GlobalStyles />
            <Navigation />
            <Routes>
                <Route path="/oidc-callback" element={<SignInCallback />} />
                <Route path="/oidc-signout-callback" element={<SignOutCallback />} />
                <Route path="/oidc-silent-callback" element={<SilentRenewCallback />} />
                <Route index path='/' element={<Home />} />
                <Route path="/test" element={<Test />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </ThemeProvider>
        );
}

export default App;