import React, { createContext, useReducer, useContext, useEffect, useState } from "react";
import { UserManager, WebStorageStateStore, Log as OidcLogger } from "oidc-client-ts";
import { useAppContext, ADD_MESSAGE } from "./ApplicationProvider";
import axios from "axios";

export const SET_CLIENT_CONFIGURATION = "SET_CLIENT_CONFIGURATION";
export const SET_USER_MANAGER = "SET_USER_MANAGER";
export const SET_ACCESS_TOKEN = "SET_ACCESS_TOKEN";
export const CLEAR_ACCESS_TOKEN = "CLEAR_ACCESS_TOKEN";
export const SET_ID_TOKEN = "SET_ID_TOKEN";
export const CLEAR_ID_TOKEN = "CLEAR_ID_TOKEN";
export const USER_EXPIRED = "USER_EXPIRED";
export const USER_FOUND = "USER_FOUND";
export const USER_EXPIRING = "USER_EXPIRING";
export const LOADING_USER = "LOADING_USER";
export const SILENT_RENEW_ERROR = "SILENT_RENEW_ERROR";
export const SESSION_TERMINATED = "SESSION_TERMINATED";
export const LOAD_USER_ERROR = "LOAD_USER_ERROR";
export const USER_SIGNED_OUT = "USER_SIGNED_OUT";
export const SET_THEME = "SET_THEME";
export const SET_ICON = "SET_ICON";

const userStore = window.localStorage;

const parseJwt = token => {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace("-", "+").replace("_", "/");
    return JSON.parse(window.atob(base64));
};

const reducer = (state, action) => {
    switch (action.type) {
        case SET_CLIENT_CONFIGURATION: {
            return { ...state, config: action.payload };
        }
        case LOADING_USER:
            return { ...state, isUserLoading: true }
        case SET_ACCESS_TOKEN:
            return { ...state, accessToken: action.payload }
        case CLEAR_ACCESS_TOKEN:
            return { ...state, accessToken: null }
        case SET_ID_TOKEN:
            return { ...state, idToken: action.payload }
        case CLEAR_ID_TOKEN:
            return { ...state, idToken: null }
        case USER_FOUND:
            return { ...state, idToken: action.idToken, accessToken: action.accessToken, userId: action.userId, profile: action.profile, isUserLoading: false }
        case USER_EXPIRED:
        case LOAD_USER_ERROR:
        case SILENT_RENEW_ERROR:
        case USER_SIGNED_OUT:
        case SESSION_TERMINATED:
            return { ...state, idToken: null, accessToken: null, userId: null, profile: null, isUserLoading: false, profileIcon: null, profileIconType: null }
        case SET_ICON: {
            return { ...state, profileIcon: action.icon, profileIconType: action.iconType };
        }
        case SET_USER_MANAGER:
            return { ...state, userManager: action.payload }
        default: {
            return state;
        }
    }
}

const initialState = {
    userManager: null,
    accessToken: null,
    idToken: null,
    userId: null,
    profile: null,
    isUserLoading: false,
}

export const AuthContext = createContext(initialState);
export const AuthConsumer = AuthContext.Consumer;
export const AuthProvider = props => {
    const [config, setConfig] = useState(null);
    const [, appDispatch] = useAppContext();
    const store = useReducer(
        reducer,
        initialState
    );
    const [, dispatch] = store;
    useEffect(() => {
        axios.get("/api/configuration/oidc")
            .then(response => {
                setConfig(response.data);
            })
    }, []);
    useEffect(() => {
        if (config !== null) {
            let extendedConfig = {
                ...config,
                userStore: new WebStorageStateStore({ store: userStore }),
            }
            let userManager = new UserManager(extendedConfig);
            OidcLogger.setLogger(console);
            OidcLogger.setLevel(OidcLogger.DEBUG);
            userManager.events.addUserLoaded(user => {
                const tokenData = parseJwt(user.access_token);
                dispatch({
                    type: USER_FOUND,
                    accessToken: user.access_token,
                    idToken: user.id_token,
                    userId: tokenData.sub,
                    profile: user.profile
                });
                console.info("Uživatel byl přihlášen");
            });
            userManager.events.addUserUnloaded(() => {
                dispatch({ type: USER_EXPIRED });
                appDispatch({ type: ADD_MESSAGE, variant: "info", text: "Informace o přihlášení jsou neplatné.", dismissible: true, expiration: 3 });
                console.info("Informace o přihlášení jsou neplatné.");
            });
            userManager.events.addAccessTokenExpiring(() => {
                dispatch({ type: USER_EXPIRING });
                appDispatch({ type: ADD_MESSAGE, variant: "info", text: "Platnost přihlášení brzy vyprší.", dismissible: true, expiration: 3 });
                console.info("Platnost přihlášení brzy vyprší.");
            });
            userManager.events.addAccessTokenExpired(() => {
                dispatch({ type: USER_EXPIRED });
                appDispatch({ type: ADD_MESSAGE, variant: "info", text: "Platnost přihlášení vypršela.", dismissible: true, expiration: 3 });
                console.info("Platnost přihlášení vypršela.");
            });
            userManager.events.addSilentRenewError(() => {
                dispatch({ type: SILENT_RENEW_ERROR });
                appDispatch({ type: ADD_MESSAGE, variant: "info", text: "Nepodařilo se obnovit přihlášení.", dismissible: true, expiration: 3 });
                console.info("Nepodařilo se obnovit přihlášení.");
            });
            userManager.events.addUserSignedOut(() => {
                dispatch({ type: USER_EXPIRED });
                appDispatch({ type: ADD_MESSAGE, variant: "info", text: "Uživatel byl odhlášen.", dismissible: true, expiration: 3 });
                console.info("Uživatel byl odhlášen.");
            });
            userManager.getUser()
                .then((user) => {
                    if (user && !user.expired) {
                        let tokenData = parseJwt(user.access_token);
                        dispatch({
                            type: USER_FOUND,
                            accessToken: user.access_token,
                            idToken: user.id_token,
                            userId: tokenData.sub,
                            profile: user.profile
                        });
                    } else if (!user || (user && user.expired)) {
                        dispatch({
                            type: USER_EXPIRED
                        });
                    }
                })
                .catch(() => {
                    appDispatch({ type: ADD_MESSAGE, variant: "error", text: "Při získávání údajů o uživateli došlo k chybě.", dismissible: true, expiration: 3 });
                    dispatch({
                        type: LOAD_USER_ERROR
                    });
                });
            dispatch({ type: SET_USER_MANAGER, payload: userManager });
        }   
    }, [config, dispatch, appDispatch]);
    return (
        <AuthContext.Provider value={store}>
            {props.children}
        </AuthContext.Provider>
    );
}
export const useAuthContext = () => useContext(AuthContext);