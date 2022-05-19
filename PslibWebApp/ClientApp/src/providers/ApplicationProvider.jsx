import React, { createContext, useReducer, useContext, useEffect } from "react";
import axios from "axios";

export const SET_TITLE = "SET_TITLE";
export const ADD_MESSAGE = "ADD_MESSAGE";
export const DISMISS_MESSAGE = "DISMISS_MESSAGE";
export const CLEAR_MESSAGES = "CLEAR_MESSAGES";
export const SET_THEME = "SET_THEME";

const initialState = {
    title: null,
    messages: [],
    messageCounter: 0,
    theme: "light"
}

const reducer = (state, action) => {
    var newMessages = [...state.messages];
    switch (action.type) {
        case SET_THEME: {
            return { ...state, theme: action.theme };
        }
        case ADD_MESSAGE: {
            newMessages.push({
                variant: action.variant,
                text: action.text,
                dismissible: action.dismissible === true,
                expiration: action.expiration ? action.expiration : null
            });
            return { ...state, messages: newMessages, messageCounter: state.messageCounter + 1 };
        }
        case DISMISS_MESSAGE: {
            newMessages.splice(action.id, 1);
            return { ...state, messages: newMessages, messageCounter: state.messageCounter - 1 };
        }
        case CLEAR_MESSAGES: {
            return { ...state, messages: [], messageCounter: 0 };
        }
        case SET_TITLE: {
            return { ...state, title: action.payload };
        }
    }
}

export const ApplicationContext = createContext(initialState);
export const ApplicationConsumer = ApplicationContext.Consumer;
export const ApplicationProvider = props => {
    const store = useReducer(
        reducer,
        initialState
    );
    const [, dispatch] = store;
    return (
        <ApplicationContext.Provider value={store}>
            {props.children}
        </ApplicationContext.Provider>
    );
}
export const useAppContext = () => useContext(ApplicationContext);