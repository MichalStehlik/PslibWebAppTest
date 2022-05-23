import React, { createContext, useReducer, useContext, useEffect } from "react";
import axios from "axios";

export const SET_TITLE = "SET_TITLE";
export const ADD_MESSAGE = "ADD_MESSAGE";
export const DISMISS_MESSAGE = "DISMISS_MESSAGE";
export const CLEAR_MESSAGES = "CLEAR_MESSAGES";
export const SET_THEME = "SET_THEME";
export const SET_STORED_THEME = "SET_STORED_THEME";
export const SET_APPLICATION_BUSY = "SET_APPLICATION_BUSY";
export const SET_APPLICATION_BUSY_MESSAGE = "SET_APPLICATION_BUSY_MESSAGE";
export const SET_APPLICATION_CONFIGURATION = "SET_APPLICATION_CONFIGURATION";

const THEME_STORAGE_ID = "APP_THEME";

export const THEME_LIGHT = "light";
export const THEME_DARK = "dark";
export const THEME_AUTO = "auto";

const initialState = {
    title: null,
    messages: [],
    messageCounter: 0,
    theme: null,
    storedTheme: null,
    applicationBusy: false,
    applicationBusyMessage: "",
    config: null
}

const reducer = (state, action) => {
    var newMessages = [...state.messages];
    switch (action.type) {
        case SET_THEME: {
            return { ...state, theme: action.payload };
        }
        case SET_STORED_THEME: {
            return { ...state, storedTheme: action.payload };
        }
        case ADD_MESSAGE: {
            newMessages.push({
                variant: action.variant,
                text: action.text,
                dismissible: action.dismissible === true,
                expiration: action.expiration ? action.expiration : null
            });
            return { ...state, messages: newMessages, messageCounter: newMessages.length };
        }
        case DISMISS_MESSAGE: {
            newMessages.splice(action.id, 1);
            return { ...state, messages: newMessages, messageCounter: newMessages.length };
        }
        case CLEAR_MESSAGES: {
            return { ...state, messages: [], messageCounter: 0 };
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

export const ApplicationContext = createContext(initialState);
export const ApplicationConsumer = ApplicationContext.Consumer;
export const ApplicationProvider = props => {
    useEffect(() => {
        const savedTheme = localStorage.getItem(THEME_STORAGE_ID);
        const initialTheme = JSON.parse(savedTheme) || THEME_AUTO;
        initialState.storedTheme = initialTheme;
        initialState.theme = initialTheme;
    }, []);
    const store = useReducer(
        reducer,
        initialState
    );
    const [, dispatch] = store;
    useEffect(() => {
        dispatch({ type: SET_APPLICATION_BUSY, payload: true });
        axios.get("/api/configuration")
            .then(response => {
                dispatch({ type: SET_APPLICATION_CONFIGURATION, payload: response.data });
            })
        dispatch({ type: SET_APPLICATION_BUSY, payload: false });
    }, [dispatch]);
    return (
        <ApplicationContext.Provider value={store}>
            {props.children}
        </ApplicationContext.Provider>
    );
}
export const useAppContext = () => useContext(ApplicationContext);