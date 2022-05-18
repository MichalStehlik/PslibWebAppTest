import React from 'react';
import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Test from "./pages/Test";
import NotFound from "./pages/NotFound";

import './custom.css'

export const App = () => {
    return (
        <>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/test">Test</Link></li>
                <li><Link to="/something">Something</Link></li>
                <li><a href="/swagger">Swagger</a></li>
            </ul>
            <Routes>
                <Route index path='/' element={<Home />} />
                <Route path="/test" element={<Test />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </>
        );
}

export default App;