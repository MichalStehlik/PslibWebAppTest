import React from "react"
import { Routes, Route } from "react-router-dom"
import { NotificationContainer } from "./components/Notification";

import { MainLayout } from "./pages/Main"
import Test from "./pages/Main/Test"
import Profile from "./pages/Main/Profile"
import Title from "./pages/Main/Title"
import NotFound from "./pages/NotFound"
import { Auth } from "./pages/Auth"
import { SignInCallback, SignOutCallback, SilentRenewCallback } from "./pages/Auth/OAuthCallbacks"

import { ApplicationThemeProvider } from "./providers/ApplicationThemeProvider";

export const App = () => {
    return (
        <ApplicationThemeProvider>
            <NotificationContainer />
            <Routes>
                <Route path="/oidc" element={<Auth />} >
                    <Route path="callback" element={<SignInCallback />} />
                    <Route path="signout-callback" element={<SignOutCallback />} />
                    <Route path="silent-callback" element={<SilentRenewCallback />} />
                </Route>
                <Route path='/' element={<MainLayout />}>
                    <Route index path='/' element={<Title />} />
                    <Route path="/test" element={<Test />} />
                    <Route path="/profile" element={<Profile />} />
                </Route>
                <Route path="*" element={<NotFound />} />
            </Routes>
        </ApplicationThemeProvider>
        );
}

export default App;