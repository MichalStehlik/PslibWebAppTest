import IcoMoon from "react-icomoon";
import styled from "styled-components"

const iconSet = require("../assets/icons/selection.json")

export const StyledIcon = styled(IcoMoon)`
    transform: translateY(2px);
`;

export const Icon = (props) => <StyledIcon iconSet={iconSet} {...props} />;

export default Icon;