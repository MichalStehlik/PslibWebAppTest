import React, { useEffect, useState, useCallback } from 'react'
import ReactDOM from "react-dom"
import styled, { keyframes, css } from 'styled-components'

const slideIn = keyframes`
    from {
        transform: translateY(-10rem);
        opacity: 0;
    }

    to {
        transform: translateY(0);
        opacity: 100%;
    }
`;

const slideOut = keyframes`
    from {
        transform: translateY(0);
        opacity: 100%;
    }

    to {
        transform: translateY(-10rem);
        opacity: 0;
    }
`;

const StyledModalOverlay = styled.div`
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    width: 100vw;
    top: ${props => (props.active ? "0" : "100vh")};
    left: 0;
    position: fixed;
    z-index: 10;
    background-color: rgba(0,0,0,.8);
`;

const ModalOverlay = props => {
    const [isActive, setActive] = useState(false);
    const [isChildrenActive, setChildrenActive] = useState(false);
    useEffect(() => {
        if (props.active) {
            setActive(true);
            setChildrenActive(true);
        }
        else {
            setChildrenActive(false);
            let tout = setTimeout(() => { setActive(false); }, 300);
            return () => { clearTimeout(tout); };
        }
    }, [props.active]);
    return (
        <StyledModalOverlay {...props} active={isActive}>
            {React.cloneElement(props.children, { active: isChildrenActive })}
        </StyledModalOverlay>
    );
}

const StyledModalWindow = styled.div`
    overflow: auto;
    background-color: ${props => props.theme.colors.body};
    color: ${props => props.theme.colors.text};
    max-height: 90vh;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    box-sizing: border-box;
    border-radius: 4px;
    animation: ${props => props.active ? slideIn : slideOut} .4s ease-out;
`;

export const ModalFooter = styled.footer`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 4px;
    padding: .5rem;
`;

export const ModalHeader = styled.header`
    padding: .5rem;
`;

export const ModalBody = styled.div`
    margin: .5rem;
    padding: .5rem;
    background-color: black;
    border-radius: 4px;
    ${({ variant }) => {
        switch (variant) {
            case "primary": return css`
            background-color: ${({ theme }) => theme.colors.primary.default};
            color:${({ theme }) => theme.colors.white};
        `
            case "danger": return css`
            background-color: ${({ theme }) => theme.colors.danger.default};
            color:${({ theme }) => theme.colors.white};
        `
            case "success": return css`
            background-color: ${({ theme }) => theme.colors.success.default};
            color:${({ theme }) => theme.colors.white};
        `
            case "info": return css`
            background-color: ${({ theme }) => theme.colors.info.default};
            color:${({ theme }) => theme.colors.white};
        `
            case "warning": return css`
            background-color: ${({ theme }) => theme.colors.warning.default};
            color:${({ theme }) => theme.colors.white};
        `
            default: return css`
            background-color: ${({ theme }) => theme.colors.default.default};
            color:${({ theme }) => theme.colors.black};
        `
        }
    }
    }
`;

StyledModalWindow.defaultProps = {
    variant: "default"
};

export const Modal = ({ active, onDismiss, defaultAction, children, ...rest}) => {
    const keyProcessing = useCallback(e => {
        if (e.key === "Escape") onDismiss();
        if (e.key === "Enter" && defaultAction && (typeof defaultAction === 'function')) defaultAction();
    }, [defaultAction, onDismiss]);
    useEffect(() => {
        document.addEventListener("keydown", keyProcessing, false);
        return () => { document.removeEventListener("keydown", keyProcessing, false); };
    }, [keyProcessing]);
    return ReactDOM.createPortal(
        <ModalOverlay active={active} onClick={onDismiss}>
            <StyledModalWindow {...rest} onClick={e => e.stopPropagation()}>
                { children}
            </StyledModalWindow>
        </ModalOverlay>,
        document.querySelector("#modal")
    );
}

export default Modal;