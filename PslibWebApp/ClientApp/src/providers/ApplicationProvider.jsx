import React, { createContext, useReducer, useContext, useEffect } from "react";
import axios from "axios";
import { useThemeDetector } from "../ui-components";

export const SET_TITLE = "SET_TITLE";
export const SET_THEME = "SET_THEME";
export const SET_DEFAULT_THEME = "SET_DEFAULT_THEME";
export const SET_APPLICATION_BUSY = "SET_APPLICATION_BUSY";
export const SET_APPLICATION_BUSY_MESSAGE = "SET_APPLICATION_BUSY_MESSAGE";
export const SET_APPLICATION_CONFIGURATION = "SET_APPLICATION_CONFIGURATION";

const THEME_STORAGE_ID = "APP_THEME";

export const THEME_LIGHT = "light";
export const THEME_DARK = "dark";
export const THEME_AUTO = "auto";

const getCurrentTheme = () => window.matchMedia("(prefers-color-scheme: dark)").matches;
const getStoredTheme = () => localStorage.getItem(THEME_STORAGE_ID);

const reducer = (state, action) => {
    switch (action.type) {
        case SET_THEME: {
            return { ...state, theme: action.payload };
        }
        case SET_DEFAULT_THEME: {
            return { ...state, defaultTheme: action.payload };
        }
        case SET_TITLE: {
            return { ...state, title: action.payload };
        }
        case SET_APPLICATION_BUSY: {
            return { ...state, applicationBusy: action.payload };
        }
        case SET_APPLICATION_BUSY_MESSAGE: {
            return { ...state, applicationBusyMessage: action.payload };
        }
        case SET_APPLICATION_CONFIGURATION: {
            return { ...state, config: action.payload };
        }
        default: {
            return state;
        }
    }
}

const initialState = {
    title: null,
    theme: (getCurrentTheme() ? THEME_DARK : THEME_LIGHT),
    defaultTheme: getStoredTheme() || THEME_AUTO,
    applicationBusy: false,
    applicationBusyMessage: "",
    config: {}
}

export const ApplicationContext = createContext(initialState);
export const ApplicationConsumer = ApplicationContext.Consumer;

export const ApplicationProvider = props => {
    let darkMode = useThemeDetector();

    const store = useReducer(
        reducer,
        initialState
    );
    const [state, dispatch] = store;
    useEffect(() => {
        dispatch({ type: SET_APPLICATION_BUSY, payload: true });
        axios.get("/api/configuration")
            .then(response => {
                dispatch({ type: SET_APPLICATION_CONFIGURATION, payload: response.data });
            })
        dispatch({ type: SET_APPLICATION_BUSY, payload: false });
    }, [dispatch]);
    useEffect(() => {
        if (state.defaultTheme === THEME_AUTO) {
            dispatch({ type: SET_THEME, payload: (darkMode ? THEME_DARK : THEME_LIGHT) });
        }
        else {
            dispatch({ type: SET_THEME, payload: state.defaultTheme });
        }
    }, [darkMode, dispatch, state.defaultTheme]);
    useEffect(() => {
        localStorage.setItem(THEME_STORAGE_ID, state.defaultTheme);
    }, [state.defaultTheme]);
    return (
        <ApplicationContext.Provider value={store}>
            {props.children}
        </ApplicationContext.Provider>
    );
}
export const useAppContext = () => useContext(ApplicationContext);