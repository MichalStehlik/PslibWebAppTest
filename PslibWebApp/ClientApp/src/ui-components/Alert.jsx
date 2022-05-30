import styled, { css } from "styled-components"
import { Icon} from ".";

const StyledAlert = styled.div`
    border: 1px solid ${({ theme }) => theme.colors.white}};
    margin: 3px 0;
    padding: .5em;
    border-radius: 4px;
    display: grid;
    grid-template-columns: 3em auto;
    grid-template-rows: auto auto;
    grid-template-areas: "icon header" "icon content";
    gap: .3em;
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

const StyledAlertHeading = styled.header`
    font-weight: 700;
    grid-area: header;
    font-size: 1.2em;
`;
const StyledAlertContent = styled.div`
    grid-area: content;
    & > * {
        padding-top: 0;
        padding-bottom: 0;
    }
`;
const StyledAlertIcon = styled.div`
    grid-area: icon;
    justify-self: center;
    align-self: center;
`;

export const Alert = ({ variant, children, heading, icon, ...rest }) => {
    if (!heading) {
        switch (variant) {
            case "danger": heading = "Chyba"; break;
            case "warning": heading = "Varování"; break;
            case "info": heading = "Informace"; break;
            case "success": heading = "Potvrzení"; break;
            default: heading = "Zpráva"; break;
        }
    }
    if (!icon) {
        switch (variant) {
            case "danger": icon = <Icon icon="cross" size="1.5em" />; break;
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