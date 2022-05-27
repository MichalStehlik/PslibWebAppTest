import React from "react"
import ReactDOM from "react-dom"
import { useAppContext, DISMISS_MESSAGE } from "../providers/ApplicationProvider";
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
    const [{ messages }, dispatch] = useAppContext();
    return ReactDOM.createPortal(
        <StyledNotificationContainer {...rest} >
            {messages.slice(-5).map((item, index) => (
                <Notification
                    key={index}
                    variant={item.variant}
                    dismissible={item.dismissible}
                    expiration={item.expiration}
                    dismiss={() => dispatch({ type: DISMISS_MESSAGE, id: index })}
                >{item.text}</Notification>
            ))}
        </StyledNotificationContainer>,
        document.querySelector("#notifications")
    );
}

const StyledDismissButton = styled.span`
font-size: 12px;
fill: "white";
margin: 3px;
cursor: default;
position: absolute;
right: .5em;
top: .5em;
padding: .5em;
pointer-events: auto;
`;

const DismissButton = props => {
    return (
        <StyledDismissButton onClick={props.dismiss}>&#10006;</StyledDismissButton>
    );
}

const StyledNotification = styled(Alert)`
    max-width: 430px;
    max-height: 200px;
    padding-right: 3em;
    position: relative;
    animation: ${slideIn} .3s linear;
`;

const Notification = ({ children, dismissible, dismiss, expiration, ...rest }) => (
    <StyledNotification {...rest}>
        {children}
        {(dismissible === true && dismiss) ? <DismissButton dismiss={dismiss} /> : ""}
    </StyledNotification>)

export default NotificationContainer;