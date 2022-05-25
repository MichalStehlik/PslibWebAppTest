import styled from "styled-components"
import { Colors } from ".";

const StyledAlert = styled.div`
    margin: 1px;
    background-color: ${() => Colors.defaultRed};
    padding: .5em;
    color: ${() => Colors.white};
    border-radius: 4px;
`;

export const Alert = ({ variant, children, ...rest }) => (<StyledAlert {...rest} >{ children }</StyledAlert>)

Alert.defaultProps = {
    variant: "default"
}

export default Alert;