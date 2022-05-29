import styled, { css } from "styled-components"

const StyledButton = styled.button`
    margin: 1px;
    padding: .8em 2em;
    text-decoration: none;
    text-transform: uppercase;
    font-size: 12px;
    font-family: 'Open Sans', sans-serif;
    border-radius: 4px;
    text-align: center;
    border: 0;
    cursor: pointer;
    font-weight: bold;
    display: ${props => props.block ? "block" : "inline-block"};
    ${({ variant }) => {
    switch (variant)
    {
        case "primary": return css`
            background-color: ${({ theme }) => theme.colors.primary.default};
            color:${({ theme }) => theme.colors.white};
            &:hover {
                background-color:${({ theme }) => theme.colors.primary.light}
            }
        `
        case "danger": return css`
            background-color: ${({ theme }) => theme.colors.danger.default};
            color:${({ theme }) => theme.colors.white};
            &:hover {
                background-color:${({ theme }) => theme.colors.danger.light}
            }
        `
        case "success": return css`
            background-color: ${({ theme }) => theme.colors.success.default};
            color:${({ theme }) => theme.colors.white};
            &:hover {
                background-color:${({ theme }) => theme.colors.success.light}
            }
        `
        case "info": return css`
            background-color: ${({ theme }) => theme.colors.info.default};
            color:${({ theme }) => theme.colors.white};
            &:hover {
                background-color:${({ theme }) => theme.colors.info.light}
            }
        `
        case "warning": return css`
            background-color: ${({ theme }) => theme.colors.warning.default};
            color:${({ theme }) => theme.colors.white};
            &:hover {
                background-color:${({ theme }) => theme.colors.warning.light}
            }
        `
        default: return css`
            background-color: ${({ theme }) => theme.colors.default.default};
            color:${({ theme }) => theme.colors.black};
            &:hover {
                background-color:${({ theme }) => theme.colors.default.light}
            }
        `
        }
    }
    }
    background-color: ${props => props.bg};
    color: ${props => props.color};
`;

export const Button = (props) => (<StyledButton {...props} />)

Button.defaultProps = {
    variant: "default"
}

export default Button;