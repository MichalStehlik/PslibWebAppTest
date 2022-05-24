import styled from "styled-components"
import Tag from "./Tag"

const StyledButton = styled(Tag)`
    margin: 1px;
    background-color: #0072bc;
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
        background-color: #357BC2;
    }
`;

export const Button = (props) => (<StyledButton {...props} />)

Button.defaultProps = {
    as: "button"
}

export default Button;