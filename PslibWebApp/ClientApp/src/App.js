import React from 'react';
import { Routes, Route} from "react-router-dom";
import Home from "./pages/Home";
import Test from "./pages/Test";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import { SignInCallback, SignOutCallback, SilentRenewCallback } from "./components/Auth/OAuthCallbacks";
import Navigation from "./components/Navigation";

import './custom.css'

export const App = () => {
    return (
        <>
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
        </>
        );
}

export default App;