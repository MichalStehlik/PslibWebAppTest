import styled from "styled-components"
import { getBackground, getColor } from ".";

const StyledButton = styled.button`
    margin: 1px;
    background-color: ${props => getBackground(props.theme, props.variant)};
    padding: .8em 2em;
    color: ${props => getColor(props.theme, props.variant)};
    text-decoration: none;
    text-transform: uppercase;
    font-size: 12px;
    font-family: "Open Sans";
    border-radius: 4px;
    text-align: center;
    border: 0;
    cursor: pointer;
    font-weight: bold;
    &:hover {
        background-color: ${props => props.theme.hoverDefault};
        color: ${props => props.theme.hoverDefaultText};
    }
`;

export const Button = (props) => (<StyledButton {...props} />)

Button.defaultProps = {
    variant: "default"
}

export default Button;