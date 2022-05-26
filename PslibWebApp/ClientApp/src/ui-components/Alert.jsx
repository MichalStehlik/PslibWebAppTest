import styled from "styled-components"
import { getBackground, getColor, Icon} from ".";

const StyledAlert = styled.div`
    border: 1px solid ${props => (getColor(props.theme, props.variant))};
    margin: 3px 0;
    background-color: ${props => (getBackground(props.theme, props.variant))};
    padding: .5em;
    color: ${props => (getColor(props.theme, props.variant))};
    border-radius: 4px;
    display: grid;
    grid-template-columns: 3em auto;
    grid-template-rows: auto auto;
    grid-template-areas: "icon header" "icon content";
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
const StyledAlertIcon = styled.div`
    grid-area: icon;
    justify-self: center;
    align-self: center;
`;

export const Alert = ({ variant, children, heading, icon, ...rest }) => {
    if (!heading) {
        switch (variant) {
            case "error": heading = "Chyba"; break;
            case "warning": heading = "Varování"; break;
            case "info": heading = "Informace"; break;
            case "success": heading = "Potvrzení"; break;
            default: heading = "Zpráva"; break;
        }
    }
    if (!icon) {
        switch (variant) {
            case "error": icon = <Icon icon="cross" size="1.5em" />; break;
            case "warning": icon = <Icon icon="warning" size="1.5em" />; break;
            case "info": icon = <Icon icon="info" size="1.5em" />; break;
            case "success": icon = <Icon icon="checkmark" size="1.5em" />; break;
            default: icon = null; break;
        }
    }
    return (
        <StyledAlert variant={variant} {...rest}>
            <StyledAlertIcon icon="pencil" size="20" color="white">{ icon }</StyledAlertIcon>
            <StyledAlertHeading>{ heading }</StyledAlertHeading>
            <StyledAlertContent>{children}</StyledAlertContent>
        </StyledAlert>
    );
}

Alert.defaultProps = {
    variant: "default"
}

export default Alert;