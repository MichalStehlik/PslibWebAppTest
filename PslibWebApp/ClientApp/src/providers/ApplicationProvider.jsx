import React, { createContext, useReducer, useContext, useEffect } from "react";
import axios from "axios";
import { useThemeDetector } from "../ui-components";

export const SET_TITLE = "SET_TITLE";
export const SET_THEME = "SET_THEME";
export const SET_DEFAULT_THEME = "SET_DEFAULT_THEME";
export const SET_APPLICATION_BUSY = "SET_APPLICATION_BUSY";
export const SET_APPLICATION_BUSY_MESSAGE = "SET_APPLICATION_BUSY_MESSAGE";
export const SET_APPLICATION_CONFIGURATION = "SET_APPLICATION_CONFIGURATION";
export const ADD_NOTIFICATION = "ADD_NOTIFICATION";
export const DISMISS_NOTIFICATION = "DISMISS_NOTIFICATION";
export const CLEAR_NOTIFICATIONS = "CLEAR_NOTIFICATIONS";

const THEME_STORAGE_ID = "APP_THEME";

export const THEME_LIGHT = "light";
export const THEME_DARK = "dark";
export const THEME_AUTO = "auto";

export const NOTIFICATION_DEFAULT = "default"
export const NOTIFICATION_INFO = "info"
export const NOTIFICATION_DANGER = "danger"
export const NOTIFICATION_WARNING = "warning"
export const NOTIFICATION_SUCCESS = "success"

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
        case ADD_NOTIFICATION: {
            let newNotifications = [...state.notifications];
            newNotifications.push({
                content: action.content,
                variant: action.variant ? action.variant : NOTIFICATION_DEFAULT,
                text: action.text,
                dismissible: action.dismissible === true,
                expiration: action.expiration ? action.expiration : null
            });
            return { ...state, notifications: newNotifications };
        }
        case DISMISS_NOTIFICATION: {
            let newNotifications = [...state.notifications];
            newNotifications.splice(action.index, 1);
            return { ...state, notifications: newNotifications };
        }
        case CLEAR_NOTIFICATIONS: {
            return { ...state, notifications: [] };
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
    config: {},
    notifications: []
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