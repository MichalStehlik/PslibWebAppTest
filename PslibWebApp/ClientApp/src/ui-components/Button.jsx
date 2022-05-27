import styled from "styled-components"
import { space, layout, color, variant } from 'styled-system'
import { getBackground, getColor, getHoverBackground, getHoverColor } from ".";

const StyledButton = styled.button`
    margin: 1px;
    background-color: ${props => getBackground(props.theme, props.variant)};
    padding: .8em 2em;
    color: ${props => getColor(props.theme, props.variant)};
    text-decoration: none;
    text-transform: uppercase;
    font-size: 12px;
    font-family: 'Open Sans', sans-serif;
    border-radius: 4px;
    text-align: center;
    border: 0;
    cursor: pointer;
    font-weight: bold;
    display: ${props => props.block ? "flex" : "inline-flex"};
    ${space}
    ${layout}
    ${color}
    &:hover {
        background-color: ${props => getHoverBackground(props.theme, props.variant)};
        color: ${props => getHoverColor(props.theme, props.variant)};
    }
`;

export const Button = (props) => (<StyledButton {...props} />)

Button.defaultProps = {
    variant: "default"
}

export default Button;