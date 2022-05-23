import { useState, useEffect } from "react";

export const useThemeDetector = () => {
    const getCurrentTheme = () => window.matchMedia("(prefers-color-scheme: dark)").matches;
    const [isDarkTheme, setIsDarkTheme] = useState(getCurrentTheme());
    const mediaQueryListener = (e => {
        setIsDarkTheme(e.matches);
    });
    useEffect(() => {
        const darkThemeMq = window.matchMedia("(prefers-color-scheme: dark)");
        darkThemeMq.addListener(mediaQueryListener);
        return () => darkThemeMq.removeListener(mediaQueryListener);
    }, []);
    return isDarkTheme; // boolean
}