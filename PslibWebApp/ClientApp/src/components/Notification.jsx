import React, { useState, useEffect } from "react"
import ReactDOM from "react-dom"
import { useNotificationContext } from "../providers/NotificationProvider";
import styled, { keyframes } from "styled-components"
import { Alert } from "../ui-components"

const slideIn = keyframes`
    from {
        transform: translateX(100%);
    }

    to {
        transform: translateX(0);
    }
`;

const slideOut = keyframes`
    from {
        transform: translateX(0);
    }

    to {
        transform: translateX(100%);
    }
`;

const StyledNotificationContainer = styled.div`
    position: fixed;
    bottom: 16px;
    right: 16px;
    left: 16px;
    z-index: 5;
    flex-direction: column;
    display: flex;
    align-items: flex-end;
    justify-content: flex-end;
    overflow: visible;
    pointer-events: none
`;

export const NotificationContainer = ({ variant, children, ...rest }) => {
    const { notifications } = useNotificationContext();
    return ReactDOM.createPortal(
        <StyledNotificationContainer {...rest} >
            {notifications.slice(-5).map((item, index) => (
                <Notification
                    key={index}
                    index={ index }
                    variant={item.variant}
                    dismissible={item.dismissible}
                    expiration={item.expiration}
                >{item.content}</Notification>
            ))}
        </StyledNotificationContainer>,
        document.querySelector("#notifications")
    );
}

const StyledDismissButton = styled.span`
font-size: 12px;
margin: 3px;
cursor: default;
position: absolute;
right: .5em;
top: .5em;
padding: .5em;
pointer-events: auto;
`;

const StyledNotification = styled(Alert)`
    max-width: 430px;
    max-height: 200px;
    padding-right: 3em;
    position: relative;
    animation: ${props => props.visible ? slideIn : slideOut} .4s ease-out;
`;

const Notification = ({ children, dismissible, expiration, index, ...rest }) => {
    const [isVisible, setIsVisible] = useState(true);
    const { removeNotification } = useNotificationContext();
    useEffect(() => {
        if (!isVisible) {
            const timeoutId = setTimeout(
                () => { removeNotification(index) },
                300);
            return () => {
                clearTimeout(timeoutId);
            };
        }
    },[isVisible, removeNotification, index]);
    return (
        <StyledNotification visible={isVisible} {...rest}>
            {children}
            {(dismissible === true) ? <StyledDismissButton onClick={() => { setIsVisible(false); /*removeNotification(index)*/}}>&#10006;</StyledDismissButton> : ""}
        </StyledNotification>
        ); 
}

export default NotificationContainer;