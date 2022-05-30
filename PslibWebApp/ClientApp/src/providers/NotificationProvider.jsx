import React, { createContext, useState, useContext, useCallback } from "react";

export const NotificationContext = createContext();
export const NotificationConsumer = NotificationContext.Consumer;

export const DEFAULT = "default"
export const INFO = "info"
export const DANGER = "danger"
export const WARNING = "warning"
export const SUCCESS = "success"

export const NotificationProvider = props => {
    const [notifications, setNotifications] = useState([]);
    const addNotification = useCallback((content, variant = DEFAULT, dismissible = true, expiration = null) => {
        let newNotifications = [...notifications];
        newNotifications.push({variant, content, dismissible, expiration});
        setNotifications(newNotifications);
    },[]);
    const removeNotification = (index) => {
        var newNotifications = [...notifications];
        newNotifications.splice(index, 1);
        setNotifications(newNotifications);
    }
    const clearNotifications = () => {
        setNotifications([]);
    }
    return (
        <NotificationContext.Provider value={{ notifications, addNotification, removeNotification, clearNotifications }}>
            {props.children}
        </NotificationContext.Provider>
    );
}

export const useNotificationContext = () => useContext(NotificationContext);

export default useNotificationContext;