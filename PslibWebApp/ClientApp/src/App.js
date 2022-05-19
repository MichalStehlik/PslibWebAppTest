import React from 'react';
import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Test from "./pages/Test";
import NotFound from "./pages/NotFound";
import SignInCallback from "./components/Auth/SignInCallback";
import SignOutCallback from "./components/Auth/SignOutCallback";
import SilentRenewCallback from "./components/Auth/SilentRenewCallback";
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
                <Route path="*" element={<NotFound />} />
            </Routes>
        </>
        );
}

export default App;