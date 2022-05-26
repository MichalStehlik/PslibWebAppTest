import React from "react"
import ReactDOM from "react-dom"
import { useAppContext } from "../providers/ApplicationProvider";
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
    align-items: center;
    justify-content: flex-end;
    overflow: visible;
`;

export const NotificationContainer = ({ variant, children, ...rest }) => {
    const [{ messages }, /*dispatch*/] = useAppContext();
    return ReactDOM.createPortal(
        <StyledNotificationContainer {...rest} >
            {messages.slice(-5).map((item, index) => (
                <Notification key={index} variant={item.variant}>{ item.text }</Notification>
            ))}
        </StyledNotificationContainer>,
        document.querySelector("#notifications")
    );
}

const StyledNotification = styled(Alert)`
    max-width: 430px;
    max-height: 200px;
`;

const Notification = (props) => (<StyledNotification {...props} />)

export default NotificationContainer;