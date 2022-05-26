import styled from "styled-components"
import { getBackground, getColor} from ".";

const StyledAlert = styled.div`
    border: 1px solid ${props => (getColor(props.theme, props.variant))};
    margin: 3px 0;
    background-color: ${props => (getBackground(props.theme, props.variant))};
    padding: .5em;
    color: ${props => (getColor(props.theme, props.variant))};
    border-radius: 4px;
    display: grid;
    grid-template-columns: 3em auto 3em;
    grid-template-rows: auto auto;
    grid-template-areas: "icon header cross" "icon content cross";
    gap: .3em; 
`;

const StyledAlertHeading = styled.header`
    font-weight: 700;
    grid-area: header;
    font-size: 1.2em;
`;
const StyledAlertContent = styled.div`
    grid-area: content;
`;

export const Alert = ({ variant, children, heading, icon, ...rest }) => {
    let headingText;
    switch (variant) {
        case "error": heading = "Chyba"; break;
        case "warning": heading = "Varování"; break;
        case "info": heading = "Informace"; break;
        case "success": heading = "Potvrzení"; break;
        default: heading = "Zpráva"; break;
    }
    return (
        <StyledAlert variant={variant} {...rest}>
            <StyledAlertHeading>{ heading }</StyledAlertHeading>
            <StyledAlertContent>{children}</StyledAlertContent>
        </StyledAlert>
    );
}

Alert.defaultProps = {
    variant: "default"
}

export default Alert;