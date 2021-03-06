import styled from "styled-components"

export const Flex = styled.div`
    display: ${props => props.inline ? "inline-flex" : "flex"};
    flex-direction: ${props => props.direction};
    flex-wrap: ${props => props.wrap};
    justify-content: ${props => props.justifyContent};
    align-items: ${props => props.alignItems};
    align-content: ${props => props.alignContent};
    gap: ${props => props.gap};
`;

Flex.defaultProps = {
    as: "div",
    inline: false,
    direction: "row",
    wrap: "nowrap",
    justifyContent: "flex-start",
    alignItems: "stretch",
    alignContent: "normal",
    gap: 0
}

export default Flex;