import styled from "styled-components"
import { Colors } from ".";

const StyledButton = styled.button`
    margin: 1px;
    background-color: ${() => Colors.defaultBlue};
    padding: 1em;
    color: white;
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
        background-color: ${() => Colors.lightBlue};
    }
`;

export const Button = ({ variant, ...props }) => (<StyledButton {...props} />)

Button.defaultProps = {
    variant: "default"
}

export default Button;