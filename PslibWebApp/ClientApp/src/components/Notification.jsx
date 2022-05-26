import React from "react"
import ReactDOM from "react-dom"
import { useAppContext, DISMISS_MESSAGE } from "../providers/ApplicationProvider";
import styled from "styled-components"
import { Alert } from "../ui-components"

const StyledNotificationContainer = styled.div`
    position: fixed;
    bottom: 16px;
    right: 0;
    left: 0;
    z-index: 100;
    flex-direction: column;
    display: flex;
    align-items: flex-end;
    justify-content: flex-end;
    overflow: visible;
    pointer-events: all
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
`;

const Notification = ({ children, dismissible, dismiss, expiration, ...rest }) => (
    <StyledNotification {...rest}>
        {children}
        {(dismissible === true && dismiss) ? <DismissButton dismiss={dismiss} /> : ""}
    </StyledNotification>)

export default NotificationContainer;